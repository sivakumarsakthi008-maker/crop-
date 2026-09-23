import { CropInput, CropProfile } from '../types';
import { recommendBestCrops } from './suitability';

export type MapOverlayMode = 'nutrient-zones' | 'yield-heatmap' | 'soil-health-trend';

export interface FarmZone {
  id: string;
  name: string;
  areaHa: number;
  coordinates: { x: number; y: number; width: number; height: number };
  svgPath?: string;
  soil: {
    N: number;
    P: number;
    K: number;
    ph: number;
    humidity: number;
    temperature: number;
    rainfall: number;
    organicMatterPct: number; // Organic Carbon / Humus %
    soilTexture: string;
    drainageClass: 'Excessive' | 'Well-Drained' | 'Moderate' | 'Poorly-Drained';
  };
  trend: {
    status: 'Improving' | 'Stable' | 'Degrading';
    change5Yr: string;
    erosionRisk: 'Low' | 'Moderate' | 'Severe';
    biologicalActivity: 'Very High' | 'High' | 'Moderate' | 'Low';
    restorationAdvice: string;
  };
}

export interface SoilQualityBreakdown {
  overallScore: number; // 0 - 100
  grade: 'Prime Arable (Class I)' | 'Good Agricultural (Class II)' | 'Moderate Marginal (Class III)' | 'Constrained (Class IV)';
  chemicalScore: number; // NPK balance
  reactionScore: number; // pH neutrality
  organicScore: number; // Humus / carbon
  moistureScore: number; // moisture / drainage
  fertilityClass: 'High Fertility' | 'Medium Fertility' | 'Low Fertility';
  strengths: string[];
  limitations: string[];
}

export interface CropSoilQualityRequirement {
  cropName: string;
  requiredQualityScore: number; // Minimum soil quality score for optimal yield
  currentSoilQualityScore: number; // How current soil scores for this specific crop
  compatibilityPercentage: number;
  status: 'Highly Suitable' | 'Moderately Suitable' | 'Requires Soil Conditioning' | 'Unfavorable';
  idealPhRange: [number, number];
  currentPh: number;
  phStatus: 'optimal' | 'acidic' | 'alkaline';
  soilTypeFit: string;
  nutrientGaps: {
    nutrient: 'Nitrogen' | 'Phosphorus' | 'Potassium';
    currentVal: number;
    requiredVal: number;
    unit: string;
    gapStatus: 'Sufficient' | 'Mild Deficit' | 'Severe Deficit' | 'Surplus';
  }[];
  soilConditioningSteps: string[];
}

// Interactive Farm Parcels Dataset
export const FARM_ZONES: FarmZone[] = [
  {
    id: 'zone-north',
    name: 'Plot A: North Alluvial Basin',
    areaHa: 4.5,
    coordinates: { x: 30, y: 30, width: 280, height: 160 },
    soil: {
      N: 110,
      P: 55,
      K: 48,
      ph: 6.6,
      humidity: 84,
      temperature: 24.5,
      rainfall: 220,
      organicMatterPct: 2.8,
      soilTexture: 'Silty Clay Loam',
      drainageClass: 'Moderate'
    },
    trend: {
      status: 'Improving',
      change5Yr: '+14% Organic Carbon through cover cropping & legume rotation',
      erosionRisk: 'Low',
      biologicalActivity: 'Very High',
      restorationAdvice: 'Maintain no-till mulching to preserve rich alluvial structure.'
    }
  },
  {
    id: 'zone-central',
    name: 'Plot B: Central Terrace Valley',
    areaHa: 6.2,
    coordinates: { x: 330, y: 30, width: 290, height: 160 },
    soil: {
      N: 88,
      P: 42,
      K: 40,
      ph: 6.4,
      humidity: 78,
      temperature: 25.0,
      rainfall: 190,
      organicMatterPct: 2.1,
      soilTexture: 'Medium Loam',
      drainageClass: 'Well-Drained'
    },
    trend: {
      status: 'Stable',
      change5Yr: 'Consistent NPK balance maintained over last 3 seasons',
      erosionRisk: 'Low',
      biologicalActivity: 'High',
      restorationAdvice: 'Incorporate green manure during off-season to build nitrogen reserve.'
    }
  },
  {
    id: 'zone-east-ridge',
    name: 'Plot C: East Ridge Slope',
    areaHa: 3.8,
    coordinates: { x: 640, y: 30, width: 290, height: 160 },
    soil: {
      N: 42,
      P: 22,
      K: 28,
      ph: 5.4,
      humidity: 62,
      temperature: 26.2,
      rainfall: 130,
      organicMatterPct: 1.2,
      soilTexture: 'Coarse Sandy Loam',
      drainageClass: 'Excessive'
    },
    trend: {
      status: 'Degrading',
      change5Yr: '-8% topsoil loss due to monsoon runoff on slope gradient',
      erosionRisk: 'Severe',
      biologicalActivity: 'Moderate',
      restorationAdvice: 'Contour bunding and vetiver grass hedgerows needed to halt erosion.'
    }
  },
  {
    id: 'zone-south-delta',
    name: 'Plot D: South Delta Flats',
    areaHa: 5.0,
    coordinates: { x: 30, y: 210, width: 280, height: 170 },
    soil: {
      N: 125,
      P: 68,
      K: 52,
      ph: 7.1,
      humidity: 88,
      temperature: 27.0,
      rainfall: 250,
      organicMatterPct: 3.4,
      soilTexture: 'Deep River Loam',
      drainageClass: 'Moderate'
    },
    trend: {
      status: 'Improving',
      change5Yr: '+20% microbial biomass after bio-char incorporation',
      erosionRisk: 'Low',
      biologicalActivity: 'Very High',
      restorationAdvice: 'Prime fertile zone. Ideal for high-yielding commercial rotation.'
    }
  },
  {
    id: 'zone-west-meadow',
    name: 'Plot E: West Meadow Basin',
    areaHa: 4.1,
    coordinates: { x: 330, y: 210, width: 290, height: 170 },
    soil: {
      N: 65,
      P: 38,
      K: 32,
      ph: 6.2,
      humidity: 74,
      temperature: 25.5,
      rainfall: 160,
      organicMatterPct: 1.8,
      soilTexture: 'Clayey Loam',
      drainageClass: 'Moderate'
    },
    trend: {
      status: 'Stable',
      change5Yr: 'Moderate fertility with slight compaction in subsoil',
      erosionRisk: 'Moderate',
      biologicalActivity: 'Moderate',
      restorationAdvice: 'Deep chisel plowing to break plow-pan and aerate root zone.'
    }
  },
  {
    id: 'zone-riparian',
    name: 'Plot F: Riparian Buffer Meadow',
    areaHa: 2.9,
    coordinates: { x: 640, y: 210, width: 290, height: 170 },
    soil: {
      N: 78,
      P: 48,
      K: 65,
      ph: 6.8,
      humidity: 82,
      temperature: 24.0,
      rainfall: 210,
      organicMatterPct: 2.6,
      soilTexture: 'Silt Loam with Humus',
      drainageClass: 'Well-Drained'
    },
    trend: {
      status: 'Improving',
      change5Yr: 'Natural regeneration from adjacent perennial wetland buffer',
      erosionRisk: 'Low',
      biologicalActivity: 'Very High',
      restorationAdvice: 'Excellent soil biodiversity. Practice minimal chemical interference.'
    }
  }
];

// Calculate Comprehensive Soil Quality Index (SQI)
export function calculateSoilQualityIndex(
  N: number,
  P: number,
  K: number,
  ph: number,
  organicMatterPct: number = 2.0,
  humidity: number = 70
): SoilQualityBreakdown {
  // 1. Chemical Nutrient Balance (0 - 100)
  // Optimal agronomic bounds: N: 70-120, P: 35-65, K: 35-70
  const nScore = N >= 80 && N <= 120 ? 100 : N < 80 ? (N / 80) * 85 : Math.max(60, 100 - (N - 120) * 0.5);
  const pScore = P >= 40 && P <= 70 ? 100 : P < 40 ? (P / 40) * 85 : Math.max(60, 100 - (P - 70) * 0.5);
  const kScore = K >= 35 && K <= 75 ? 100 : K < 35 ? (K / 35) * 85 : Math.max(60, 100 - (K - 75) * 0.5);
  const chemicalScore = Math.round((nScore * 0.35) + (pScore * 0.35) + (kScore * 0.30));

  // 2. Soil Reaction (pH) Neutrality (0 - 100)
  // Ideal: 6.2 - 7.2 (100%), Tolerant: 5.5 - 6.2 and 7.2 - 7.8
  let reactionScore = 100;
  if (ph >= 6.2 && ph <= 7.2) {
    reactionScore = 100;
  } else if (ph < 6.2) {
    reactionScore = Math.max(20, Math.round(100 - (6.2 - ph) * 38));
  } else {
    reactionScore = Math.max(20, Math.round(100 - (ph - 7.2) * 35));
  }

  // 3. Organic Matter / Humus Score (0 - 100)
  // Ideal: > 2.5% organic matter
  const organicScore = Math.min(100, Math.round((organicMatterPct / 2.5) * 100));

  // 4. Moisture Retention Score (0 - 100)
  const moistureScore = humidity >= 60 && humidity <= 85 ? 95 : humidity < 60 ? (humidity / 60) * 80 : 80;

  // Composite Weighting
  const overallScore = Math.round(
    chemicalScore * 0.40 +
    reactionScore * 0.25 +
    organicScore * 0.20 +
    moistureScore * 0.15
  );

  let grade: SoilQualityBreakdown['grade'] = 'Good Agricultural (Class II)';
  if (overallScore >= 85) grade = 'Prime Arable (Class I)';
  else if (overallScore >= 70) grade = 'Good Agricultural (Class II)';
  else if (overallScore >= 50) grade = 'Moderate Marginal (Class III)';
  else grade = 'Constrained (Class IV)';

  const fertilityClass: SoilQualityBreakdown['fertilityClass'] =
    overallScore >= 80 ? 'High Fertility' : overallScore >= 60 ? 'Medium Fertility' : 'Low Fertility';

  const strengths: string[] = [];
  const limitations: string[] = [];

  if (chemicalScore >= 80) strengths.push('Abundant and balanced NPK macronutrient reserves');
  else limitations.push('Sub-optimal macronutrient availability; requires fertilizer balancing');

  if (reactionScore >= 85) strengths.push(`Optimal soil pH (${ph.toFixed(1)}) for maximum nutrient uptake`);
  else if (ph < 6.0) limitations.push(`Acidic soil reaction (pH ${ph.toFixed(1)}) may cause aluminum toxicity & lock phosphorus`);
  else limitations.push(`Alkaline soil reaction (pH ${ph.toFixed(1)}) limits micronutrient availability (Zinc, Iron)`);

  if (organicScore >= 80) strengths.push(`Rich organic carbon content (${organicMatterPct}% OM) fostering healthy microbiome`);
  else limitations.push('Low organic matter reserves (<2.0%); requires compost/FYM application');

  return {
    overallScore,
    grade,
    chemicalScore,
    reactionScore,
    organicScore,
    moistureScore,
    fertilityClass,
    strengths,
    limitations
  };
}

// Reverse Diagnosis: Evaluate Soil Quality for a given customized or selected crop
export function evaluateSoilQualityForCrop(
  crop: CropProfile,
  soil: CropInput,
  organicMatterPct: number = 2.2
): CropSoilQualityRequirement {
  // Baseline Soil Quality Index of current soil
  const baseSqi = calculateSoilQualityIndex(soil.N, soil.P, soil.K, soil.ph, organicMatterPct, soil.humidity);

  // Check pH fit
  const [minPh, maxPh] = crop.ideal.ph;
  let phStatus: CropSoilQualityRequirement['phStatus'] = 'optimal';
  if (soil.ph < minPh) phStatus = 'acidic';
  else if (soil.ph > maxPh) phStatus = 'alkaline';

  // Check NPK gaps against crop's ideal
  const nutrientGaps: CropSoilQualityRequirement['nutrientGaps'] = [
    {
      nutrient: 'Nitrogen',
      currentVal: soil.N,
      requiredVal: crop.mean.N,
      unit: 'mg/kg',
      gapStatus:
        soil.N >= crop.ideal.N[0] && soil.N <= crop.ideal.N[1]
          ? 'Sufficient'
          : soil.N < crop.ideal.N[0]
          ? crop.ideal.N[0] - soil.N > 30
            ? 'Severe Deficit'
            : 'Mild Deficit'
          : 'Surplus'
    },
    {
      nutrient: 'Phosphorus',
      currentVal: soil.P,
      requiredVal: crop.mean.P,
      unit: 'mg/kg',
      gapStatus:
        soil.P >= crop.ideal.P[0] && soil.P <= crop.ideal.P[1]
          ? 'Sufficient'
          : soil.P < crop.ideal.P[0]
          ? crop.ideal.P[0] - soil.P > 25
            ? 'Severe Deficit'
            : 'Mild Deficit'
          : 'Surplus'
    },
    {
      nutrient: 'Potassium',
      currentVal: soil.K,
      requiredVal: crop.mean.K,
      unit: 'mg/kg',
      gapStatus:
        soil.K >= crop.ideal.K[0] && soil.K <= crop.ideal.K[1]
          ? 'Sufficient'
          : soil.K < crop.ideal.K[0]
          ? crop.ideal.K[0] - soil.K > 25
            ? 'Severe Deficit'
            : 'Mild Deficit'
          : 'Surplus'
    }
  ];

  // Calculate crop-specific soil quality alignment
  let penalty = 0;
  if (phStatus !== 'optimal') {
    const diff = phStatus === 'acidic' ? minPh - soil.ph : soil.ph - maxPh;
    penalty += Math.min(35, Math.round(diff * 25));
  }
  nutrientGaps.forEach(g => {
    if (g.gapStatus === 'Severe Deficit') penalty += 18;
    else if (g.gapStatus === 'Mild Deficit') penalty += 9;
  });

  const compatibilityPercentage = Math.max(15, Math.min(99, 100 - penalty));
  const currentSoilQualityScore = Math.round((baseSqi.overallScore * 0.5) + (compatibilityPercentage * 0.5));

  let status: CropSoilQualityRequirement['status'] = 'Highly Suitable';
  if (compatibilityPercentage >= 85) status = 'Highly Suitable';
  else if (compatibilityPercentage >= 70) status = 'Moderately Suitable';
  else if (compatibilityPercentage >= 50) status = 'Requires Soil Conditioning';
  else status = 'Unfavorable';

  // Tailored Conditioning Steps
  const soilConditioningSteps: string[] = [];

  if (phStatus === 'acidic') {
    soilConditioningSteps.push(
      `Raise Soil pH: Apply agricultural lime (CaCO3) or dolomite at 1.5 - 2.5 tons/ha to elevate pH from ${soil.ph} to optimal range (${minPh} - ${maxPh}).`
    );
  } else if (phStatus === 'alkaline') {
    soilConditioningSteps.push(
      `Lower Soil Alkalinity: Apply agricultural gypsum (CaSO4) or elemental sulfur at 1.0 - 2.0 tons/ha to bring pH down towards ${maxPh}.`
    );
  }

  nutrientGaps.forEach(g => {
    if (g.gapStatus === 'Severe Deficit' || g.gapStatus === 'Mild Deficit') {
      const deficit = g.requiredVal - g.currentVal;
      if (g.nutrient === 'Nitrogen') {
        soilConditioningSteps.push(
          `Replenish Nitrogen: Apply ${Math.round(deficit * 2.2)} kg/ha of Urea or integrate legume green manure (Sesbania/Sunnhemp).`
        );
      } else if (g.nutrient === 'Phosphorus') {
        soilConditioningSteps.push(
          `Boost Phosphorus: Apply ${Math.round(deficit * 2.2)} kg/ha of DAP or Single Super Phosphate (SSP) placed 5cm below the seed line.`
        );
      } else if (g.nutrient === 'Potassium') {
        soilConditioningSteps.push(
          `Potassium Top-Up: Apply ${Math.round(deficit * 1.8)} kg/ha of Muriate of Potash (MOP) to build stalk strength and disease resistance.`
        );
      }
    }
  });

  if (organicMatterPct < 2.0) {
    soilConditioningSteps.push(
      'Enhance Organic Microbial Activity: Incorporate 5-8 metric tons/ha of well-rotted farmyard manure (FYM) or vermicompost to boost soil cation exchange capacity (CEC).'
    );
  }

  return {
    cropName: crop.name,
    requiredQualityScore: 80,
    currentSoilQualityScore,
    compatibilityPercentage,
    status,
    idealPhRange: [minPh, maxPh],
    currentPh: soil.ph,
    phStatus,
    soilTypeFit: crop.soilType || 'Loamy soil',
    nutrientGaps,
    soilConditioningSteps: soilConditioningSteps.length > 0 ? soilConditioningSteps : [
      'Current soil quality is well-balanced for this crop. Follow standard basal fertilizer splits at sowing.'
    ]
  };
}

// Calculate Potential Yield for a given zone based on crop fit
export function calculateZoneYieldPotential(
  zone: FarmZone,
  cropProfile?: CropProfile
): { yieldPercentage: number; estimatedYieldTonHa: string; rating: 'Optimal' | 'High' | 'Moderate' | 'Marginal' } {
  const sqi = calculateSoilQualityIndex(
    zone.soil.N,
    zone.soil.P,
    zone.soil.K,
    zone.soil.ph,
    zone.soil.organicMatterPct,
    zone.soil.humidity
  );

  let yieldPercentage = sqi.overallScore;
  if (cropProfile) {
    const rec = evaluateSoilQualityForCrop(cropProfile, zone.soil, zone.soil.organicMatterPct);
    yieldPercentage = Math.round((sqi.overallScore * 0.4) + (rec.compatibilityPercentage * 0.6));
  }

  let rating: 'Optimal' | 'High' | 'Moderate' | 'Marginal' = 'High';
  if (yieldPercentage >= 88) rating = 'Optimal';
  else if (yieldPercentage >= 75) rating = 'High';
  else if (yieldPercentage >= 60) rating = 'Moderate';
  else rating = 'Marginal';

  // Estimate yield output
  const baseYield = cropProfile?.category === 'Cereals & Grains' ? 5.5 : cropProfile?.category === 'Fruits' ? 18.0 : 3.5;
  const yieldEst = (baseYield * (yieldPercentage / 100)).toFixed(1);

  return {
    yieldPercentage,
    estimatedYieldTonHa: `${yieldEst} t/ha`,
    rating
  };
}
