import { CropInput, PredictionResult } from '../types';
import { recommendBestCrops, evaluateTargetCrop } from './suitability';

export { recommendBestCrops, evaluateTargetCrop };

export function predictCropKNN(input: CropInput): PredictionResult {
  return recommendBestCrops(input);
}
