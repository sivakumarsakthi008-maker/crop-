import { CropInput, CropFeatureKey, PredictionResult, FeatureComparison, PredictionAlternative, CropProfile } from '../types';
import { getAllCrops, PARAM_LIMITS } from '../data/crops';

const FEATURE_KEYS: CropFeatureKey[] = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];

const FEATURE_WEIGHTS: Record<CropFeatureKey, number> = {
  N: 1.0,
  P: 1.0,
  K: 1.0,
  temperature: 1.2,
  humidity: 1.0,
  ph: 1.4, // pH is vital for nutrient uptake
  rainfall: 1.2
};

function generateFeatureAdvice(key: CropFeatureKey, status: 'optimal' | 'low' | 'high', userVal: number, idealMin: number, idealMax: number): string {
  if (status === 'optimal') {
    switch (key) {
      case 'N': return 'Nitrogen is in the ideal range for strong vegetative development.';
      case 'P': return 'Phosphorus is well-balanced for robust root establishment.';
      case 'K': return 'Potassium is optimal for disease resistance and fruit/grain filling.';
      case 'ph': return 'Soil pH is in the sweet spot for maximum nutrient bioavailability.';
      case 'temperature': return 'Current temperature aligns well with the crop thermal window.';
      case 'humidity': return 'Relative humidity supports healthy transpiration.';
      case 'rainfall': return 'Water and rainfall levels match crop water requirements.';
    }
  }

  if (status === 'low') {
    switch (key) {
      case 'N': return `Nitrogen is below ideal (${userVal} < ${idealMin} mg/kg). Add urea, well-rotted manure, or compost.`;
      case 'P': return `Phosphorus is low (${userVal} < ${idealMin} mg/kg). Apply DAP, rock phosphate, or bone meal.`;
      case 'K': return `Potassium is low (${userVal} < ${idealMin} mg/kg). Apply Muriate of Potash (MOP) or wood ash.`;
      case 'ph': return `Soil is too acidic (pH ${userVal} < ${idealMin}). Apply agricultural lime (calcium carbonate) to raise pH.`;
      case 'temperature': return `Temperature (${userVal}°C) is cooler than ideal (${idealMin}°C). Consider mulching or delayed planting.`;
      case 'humidity': return `Atmosphere is dry (${userVal}% < ${idealMin}%). Mulch soil to conserve root moisture.`;
      case 'rainfall': return `Water supply (${userVal} mm) is deficient. Supplemental drip or furrow irrigation recommended.`;
    }
  }

  // status === 'high'
  switch (key) {
    case 'N': return `Nitrogen is surplus (${userVal} > ${idealMax} mg/kg). Withhold nitrogen fertilizer to prevent lodging/pests.`;
    case 'P': return `Phosphorus is abundant (${userVal} > ${idealMax} mg/kg). Avoid adding phosphate fertilizers.`;
    case 'K': return `Potassium is in surplus (${userVal} > ${idealMax} mg/kg). No additional potash needed.`;
    case 'ph': return `Soil is too alkaline (pH ${userVal} > ${idealMax}). Incorporate gypsum, organic peat, or elemental sulfur.`;
    case 'temperature': return `Temperature (${userVal}°C) is hot (${idealMax}°C max). Provide shade netting or light misting.`;
    case 'humidity': return `High humidity (${userVal}% > ${idealMax}%). Ensure good row aeration to prevent fungal foliage issues.`;
    case 'rainfall': return `High precipitation (${userVal} mm > ${idealMax} mm). Ensure good field drainage to avoid waterlogging.`;
  }
}

/**
 * Calculates suitability score (0 - 100%) for a specific crop profile against field inputs.
 */
export function evaluateCropSuitability(input: CropInput, profile: CropProfile): { score: number; comparisons: FeatureComparison[] } {
  let weightedScoreSum = 0;
  let totalWeight = 0;

  const comparisons: FeatureComparison[] = FEATURE_KEYS.map(key => {
    const userVal = input[key];
    const limits = PARAM_LIMITS[key];
    const [idealMin, idealMax] = profile.ideal[key];
    const weight = FEATURE_WEIGHTS[key];
    totalWeight += weight;

    let status: 'optimal' | 'low' | 'high' = 'optimal';
    let dimScore = 100;

    if (userVal < idealMin) {
      status = 'low';
      const tolerance = Math.max(1, profile.std[key] * 2.2);
      const diff = idealMin - userVal;
      dimScore = Math.max(10, 100 - (diff / tolerance) * 60);
    } else if (userVal > idealMax) {
      status = 'high';
      const tolerance = Math.max(1, profile.std[key] * 2.2);
      const diff = userVal - idealMax;
      dimScore = Math.max(10, 100 - (diff / tolerance) * 60);
    }

    weightedScoreSum += dimScore * weight;

    const advice = generateFeatureAdvice(key, status, userVal, idealMin, idealMax);

    return {
      key,
      label: limits.label,
      userValue: userVal,
      idealMin,
      idealMax,
      unit: limits.unit,
      status,
      advice
    };
  });

  const overallScore = Math.round((weightedScoreSum / totalWeight) * 10) / 10;
  return { score: overallScore, comparisons };
}

/**
 * Evaluates all available crops (including custom added crops) to recommend the best match and top alternatives.
 */
export function recommendBestCrops(input: CropInput): PredictionResult {
  const allCrops = getAllCrops();
  const cropNames = Object.keys(allCrops);

  const scoredCrops = cropNames.map(name => {
    const profile = allCrops[name];
    const evalResult = evaluateCropSuitability(input, profile);
    return {
      crop: name,
      score: evalResult.score,
      profile,
      comparisons: evalResult.comparisons
    };
  });

  // Sort descending by suitability score
  scoredCrops.sort((a, b) => b.score - a.score);

  const topMatch = scoredCrops[0];

  const alternatives: PredictionAlternative[] = scoredCrops.slice(0, 4).map(item => ({
    crop: item.crop,
    confidence: item.score,
    category: item.profile.category,
    icon: item.profile.icon
  }));

  return {
    recommended_crop: topMatch.crop,
    confidence: topMatch.score,
    top_alternatives: alternatives,
    profile: topMatch.profile,
    comparisons: topMatch.comparisons,
    source: 'suitability-engine',
    targetCropMode: false
  };
}

/**
 * Evaluates a user-targeted crop specifically.
 */
export function evaluateTargetCrop(input: CropInput, cropName: string): PredictionResult {
  const allCrops = getAllCrops();
  const profile = allCrops[cropName] || allCrops['Rice'];
  const { score, comparisons } = evaluateCropSuitability(input, profile);

  // Compute other crops as alternatives for comparison
  const otherScored = Object.keys(allCrops)
    .filter(name => name !== profile.name)
    .map(name => {
      const p = allCrops[name];
      const res = evaluateCropSuitability(input, p);
      return {
        crop: name,
        confidence: res.score,
        category: p.category,
        icon: p.icon
      };
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const alternatives: PredictionAlternative[] = [
    { crop: profile.name, confidence: score, category: profile.category, icon: profile.icon },
    ...otherScored
  ];

  return {
    recommended_crop: profile.name,
    confidence: score,
    top_alternatives: alternatives,
    profile,
    comparisons,
    source: 'target-evaluation',
    targetCropMode: true
  };
}
