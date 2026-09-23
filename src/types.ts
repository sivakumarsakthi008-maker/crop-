export type CropFeatureKey = 'N' | 'P' | 'K' | 'temperature' | 'humidity' | 'ph' | 'rainfall';

export interface CropInput {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropProfile {
  name: string;
  category: string;
  icon: string;
  ideal: {
    N: [number, number];
    P: [number, number];
    K: [number, number];
    temperature: [number, number];
    humidity: [number, number];
    ph: [number, number];
    rainfall: [number, number];
  };
  mean: Record<CropFeatureKey, number>;
  std: Record<CropFeatureKey, number>;
  description: string;
  soilType: string;
  sowingSeason: string;
  harvestTime: string;
  waterManagement: string;
  nitrogenAdvice: string;
  expectedYield?: string;
  companionCrops?: string;
  isCustom?: boolean;
}

export interface PredictionAlternative {
  crop: string;
  confidence: number;
  category?: string;
  icon?: string;
}

export interface FeatureComparison {
  key: CropFeatureKey;
  label: string;
  userValue: number;
  idealMin: number;
  idealMax: number;
  unit: string;
  status: 'optimal' | 'low' | 'high';
  advice: string;
}

export interface PredictionResult {
  recommended_crop: string;
  confidence: number;
  top_alternatives: PredictionAlternative[];
  profile?: CropProfile;
  comparisons: FeatureComparison[];
  source: 'suitability-engine' | 'target-evaluation';
  targetCropMode?: boolean;
}

export interface ClimatePreset {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  values: CropInput;
}

export interface RealtimeWeatherData {
  locationName: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  conditionText: string;
  weatherCode: number;
  lastUpdated: string;
  isLive: boolean;
}
