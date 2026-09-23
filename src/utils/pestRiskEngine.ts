import { PEST_DISEASE_DATABASE, GENERIC_CROP_THREATS, PestDiseaseItem } from '../data/pestDiseaseData';

export type RiskLevel = 'High' | 'Moderate' | 'Low';

export interface EvaluatedPestRisk {
  threat: PestDiseaseItem;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  tempFit: 'optimal' | 'approaching' | 'unfavorable';
  humidityFit: 'optimal' | 'approaching' | 'unfavorable';
  environmentalTriggerDiagnosis: string;
}

export interface PestRiskSummary {
  cropName: string;
  temperature: number;
  humidity: number;
  evaluatedThreats: EvaluatedPestRisk[];
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  dominantThreat?: EvaluatedPestRisk;
}

function calculateDimensionFit(val: number, min: number, max: number): { score: number; fit: 'optimal' | 'approaching' | 'unfavorable' } {
  if (val >= min && val <= max) {
    const center = (min + max) / 2;
    const radius = Math.max(1, (max - min) / 2);
    const distFromCenter = Math.abs(val - center);
    // 0.85 to 1.0 within range
    const score = 1.0 - (distFromCenter / radius) * 0.15;
    return { score, fit: 'optimal' };
  }

  // Check if approaching (within 15% margin)
  const margin = Math.max(2, (max - min) * 0.25);
  if (val < min && (min - val) <= margin) {
    const ratio = (min - val) / margin;
    return { score: 0.55 * (1.0 - ratio), fit: 'approaching' };
  } else if (val > max && (val - max) <= margin) {
    const ratio = (val - max) / margin;
    return { score: 0.55 * (1.0 - ratio), fit: 'approaching' };
  }

  return { score: 0.1, fit: 'unfavorable' };
}

export function evaluatePestAndDiseaseRisks(
  cropName: string,
  temperature: number,
  humidity: number
): PestRiskSummary {
  // Get crop specific threats or fallback to generic
  const cropThreats = PEST_DISEASE_DATABASE[cropName] || [];
  const allCandidateThreats = cropThreats.length > 0 ? [...cropThreats] : [...GENERIC_CROP_THREATS];

  const evaluatedThreats: EvaluatedPestRisk[] = allCandidateThreats.map((threat) => {
    const [tMin, tMax] = threat.tempRange;
    const [hMin, hMax] = threat.humidityRange;

    const tEval = calculateDimensionFit(temperature, tMin, tMax);
    const hEval = calculateDimensionFit(humidity, hMin, hMax);

    // Fungal diseases usually depend heavily on humidity; insects depend heavily on temperature
    const isFungal = threat.type === 'fungal';
    const weightT = isFungal ? 0.45 : 0.55;
    const weightH = isFungal ? 0.55 : 0.45;

    const combinedScore = (tEval.score * weightT) + (hEval.score * weightH);
    const riskScore = Math.min(100, Math.round(combinedScore * 100));

    let riskLevel: RiskLevel = 'Low';
    if (tEval.fit === 'optimal' && hEval.fit === 'optimal') {
      riskLevel = 'High';
    } else if (tEval.fit === 'optimal' && hEval.fit === 'approaching') {
      riskLevel = 'Moderate';
    } else if (hEval.fit === 'optimal' && tEval.fit === 'approaching') {
      riskLevel = 'Moderate';
    } else if (riskScore >= 65) {
      riskLevel = 'Moderate';
    }

    // Build specific natural-language diagnosis
    let environmentalTriggerDiagnosis = '';
    if (riskLevel === 'High') {
      environmentalTriggerDiagnosis = `CRITICAL ALERT: Current temperature (${temperature}°C) and relative humidity (${humidity}%) align directly with the optimal pathogen sporulation and incubation threshold (${tMin}-${tMax}°C, ${hMin}-${hMax}% RH).`;
    } else if (riskLevel === 'Moderate') {
      if (tEval.fit === 'optimal') {
        environmentalTriggerDiagnosis = `ELEVATED CAUTION: Temperature (${temperature}°C) is in the danger zone (${tMin}-${tMax}°C); humidity (${humidity}%) is approaching trigger conditions.`;
      } else {
        environmentalTriggerDiagnosis = `ELEVATED CAUTION: Relative humidity (${humidity}%) is elevated (${hMin}-${hMax}% RH); monitoring field canopy microclimate recommended.`;
      }
    } else {
      environmentalTriggerDiagnosis = `LOW THREAT: Ambient climate (${temperature}°C, ${humidity}% RH) is currently outside the pathogen proliferation parameters.`;
    }

    return {
      threat,
      riskLevel,
      riskScore,
      tempFit: tEval.fit,
      humidityFit: hEval.fit,
      environmentalTriggerDiagnosis
    };
  });

  // Sort: High risk first, then Moderate, then Low
  const priorityOrder: Record<RiskLevel, number> = { High: 3, Moderate: 2, Low: 1 };
  evaluatedThreats.sort((a, b) => {
    if (priorityOrder[b.riskLevel] !== priorityOrder[a.riskLevel]) {
      return priorityOrder[b.riskLevel] - priorityOrder[a.riskLevel];
    }
    return b.riskScore - a.riskScore;
  });

  const highRiskCount = evaluatedThreats.filter(t => t.riskLevel === 'High').length;
  const moderateRiskCount = evaluatedThreats.filter(t => t.riskLevel === 'Moderate').length;
  const lowRiskCount = evaluatedThreats.filter(t => t.riskLevel === 'Low').length;

  return {
    cropName,
    temperature,
    humidity,
    evaluatedThreats,
    highRiskCount,
    moderateRiskCount,
    lowRiskCount,
    dominantThreat: evaluatedThreats[0]
  };
}
