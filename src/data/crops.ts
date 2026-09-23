import { CropProfile, ClimatePreset, CropFeatureKey } from '../types';

export const PARAM_LIMITS: Record<CropFeatureKey, { min: number; max: number; unit: string; step: number; label: string; icon: string }> = {
  N: { min: 0, max: 140, unit: 'mg/kg', step: 1, label: 'Nitrogen (N)', icon: 'leaf' },
  P: { min: 5, max: 145, unit: 'mg/kg', step: 1, label: 'Phosphorus (P)', icon: 'sparkles' },
  K: { min: 5, max: 205, unit: 'mg/kg', step: 1, label: 'Potassium (K)', icon: 'flame' },
  temperature: { min: 8.0, max: 45.0, unit: '°C', step: 0.1, label: 'Temperature', icon: 'thermometer' },
  humidity: { min: 10.0, max: 100.0, unit: '%', step: 0.1, label: 'Relative Humidity', icon: 'droplets' },
  ph: { min: 3.5, max: 9.5, unit: 'pH', step: 0.1, label: 'Soil pH', icon: 'flask-conical' },
  rainfall: { min: 20.0, max: 300.0, unit: 'mm', step: 0.1, label: 'Rainfall / Water', icon: 'cloud-rain' }
};

export const DEFAULT_CROP_PROFILES: Record<string, CropProfile> = {
  "Rice": {
    name: "Rice",
    category: "Cereal & Staple Grain",
    icon: "🌾",
    ideal: {
      N: [80, 105],
      P: [35, 55],
      K: [32, 48],
      temperature: [20.0, 27.5],
      humidity: [78.0, 88.0],
      ph: [6.0, 7.2],
      rainfall: [200.0, 280.0]
    },
    mean: { N: 90, P: 45, K: 40, temperature: 24.0, humidity: 82.0, ph: 6.5, rainfall: 240.0 },
    std: { N: 8, P: 6, K: 5, temperature: 2.5, humidity: 4.0, ph: 0.4, rainfall: 25.0 },
    description: "Major staple grain that thrives in warm climates, flooded field basins, and abundant moisture.",
    soilType: "Clayey loam or heavy alluvial soil with low water drainage",
    sowingSeason: "Monsoon / Kharif (June – July)",
    harvestTime: "110 – 140 days post-transplanting",
    waterManagement: "Maintain 3–5 cm shallow standing water during tillering; drain 10 days before harvest.",
    nitrogenAdvice: "Apply nitrogen in 3 split doses: 50% basal, 25% at tillering, 25% at panicle initiation.",
    expectedYield: "3.5 – 5.5 tons per hectare",
    companionCrops: "Azolla fern, legumes in rotation, duckweed"
  },
  "Maize": {
    name: "Maize (Corn)",
    category: "Cereal & Forage Crop",
    icon: "🌽",
    ideal: {
      N: [68, 95],
      P: [40, 58],
      K: [14, 26],
      temperature: [21.0, 28.5],
      humidity: [58.0, 74.0],
      ph: [5.8, 7.4],
      rainfall: [65.0, 110.0]
    },
    mean: { N: 80, P: 48, K: 20, temperature: 24.0, humidity: 65.0, ph: 6.5, rainfall: 85.0 },
    std: { N: 10, P: 6, K: 4, temperature: 3.0, humidity: 6.0, ph: 0.5, rainfall: 15.0 },
    description: "High-yielding versatile cereal requiring strong sun, fertile soil, and steady mid-season watering.",
    soilType: "Well-aerated deep fertile sandy loam to silt loam",
    sowingSeason: "Spring / Early Summer (May – June)",
    harvestTime: "90 – 120 days",
    waterManagement: "Critical watering periods are knee-high growth, tasseling, and cob filling.",
    nitrogenAdvice: "Heavy feeder; top-dress with nitrogen when plants reach 30-45 cm in height.",
    expectedYield: "4.0 – 7.0 tons per hectare",
    companionCrops: "Beans, squash, pumpkin (Three Sisters polyculture)"
  },
  "Chickpea": {
    name: "Chickpea (Gram)",
    category: "Pulse & Protein Legume",
    icon: "🧆",
    ideal: {
      N: [30, 52],
      P: [58, 80],
      K: [70, 92],
      temperature: [16.5, 22.0],
      humidity: [12.0, 22.0],
      ph: [6.8, 8.0],
      rainfall: [68.0, 95.0]
    },
    mean: { N: 40, P: 68, K: 80, temperature: 19.0, humidity: 17.0, ph: 7.3, rainfall: 80.0 },
    std: { N: 6, P: 8, K: 8, temperature: 2.0, humidity: 3.0, ph: 0.4, rainfall: 10.0 },
    description: "Cool-season dryland crop that enriches soil through natural nitrogen fixation in low humidity.",
    soilType: "Well-drained light black soil or sandy-clay loam",
    sowingSeason: "Post-monsoon / Winter (October – November)",
    harvestTime: "100 – 125 days",
    waterManagement: "Sensitive to waterlogging; 1–2 light irrigations at pre-flowering and pod development.",
    nitrogenAdvice: "Requires minimal synthetic nitrogen; inoculate seeds with Rhizobium culture.",
    expectedYield: "1.2 – 2.2 tons per hectare",
    companionCrops: "Mustard, barley, linseed, wheat"
  },
  "Kidney Beans": {
    name: "Kidney Beans",
    category: "Nutritious Protein Pulse",
    icon: "🫘",
    ideal: {
      N: [18, 34],
      P: [55, 75],
      K: [14, 26],
      temperature: [18.0, 24.5],
      humidity: [52.0, 68.0],
      ph: [5.2, 6.2],
      rainfall: [100.0, 140.0]
    },
    mean: { N: 25, P: 65, K: 20, temperature: 21.0, humidity: 60.0, ph: 5.7, rainfall: 120.0 },
    std: { N: 5, P: 8, K: 3, temperature: 2.5, humidity: 5.0, ph: 0.3, rainfall: 15.0 },
    description: "Cool-climate legume that flourishes in temperate moisture with mild, slightly acidic soils.",
    soilType: "Rich friable loam with balanced organic matter and good drainage",
    sowingSeason: "Spring / Late Summer",
    harvestTime: "85 – 110 days",
    waterManagement: "Keep soil evenly moist, especially during flowering; avoid wetting upper leaves.",
    nitrogenAdvice: "Provide moderate starter phosphorus; benefits from symbiotic nitrogen fixation.",
    expectedYield: "1.5 – 2.8 tons per hectare",
    companionCrops: "Corn, cucumbers, rosemary, celery"
  },
  "Pigeonpeas": {
    name: "Pigeonpeas (Arhar / Toor)",
    category: "Drought-Tolerant Legume",
    icon: "🌱",
    ideal: {
      N: [14, 28],
      P: [58, 78],
      K: [14, 26],
      temperature: [24.0, 33.0],
      humidity: [48.0, 64.0],
      ph: [5.2, 6.6],
      rainfall: [120.0, 180.0]
    },
    mean: { N: 20, P: 68, K: 20, temperature: 28.0, humidity: 55.0, ph: 5.8, rainfall: 150.0 },
    std: { N: 4, P: 7, K: 3, temperature: 3.5, humidity: 6.0, ph: 0.4, rainfall: 20.0 },
    description: "Hardy, deep-rooting legume that thrives under high heat, breaking hardpan and restoring soil.",
    soilType: "Deep loamy or black soil with good internal drainage",
    sowingSeason: "Early Monsoon (June – July)",
    harvestTime: "150 – 190 days",
    waterManagement: "Drought-tolerant once established; irrigate during flowering if dry spell exceeds 3 weeks.",
    nitrogenAdvice: "Needs phosphorus and sulfur; nitrogen is self-sufficient via root nodules.",
    expectedYield: "1.2 – 2.0 tons per hectare",
    companionCrops: "Sorghum, pearl millet, cotton"
  },
  "Cotton": {
    name: "Cotton",
    category: "Fiber & Cash Crop",
    icon: "☁️",
    ideal: {
      N: [105, 135],
      P: [40, 56],
      K: [14, 26],
      temperature: [22.0, 28.5],
      humidity: [72.0, 85.0],
      ph: [6.2, 7.5],
      rainfall: [65.0, 100.0]
    },
    mean: { N: 120, P: 48, K: 20, temperature: 25.0, humidity: 80.0, ph: 6.8, rainfall: 80.0 },
    std: { N: 10, P: 6, K: 3, temperature: 2.0, humidity: 5.0, ph: 0.4, rainfall: 12.0 },
    description: "High-value commercial fiber crop demanding warm sunny days, moderate rain, and rich fertility.",
    soilType: "Deep moisture-retentive black cotton soil (vertisol) or fertile loam",
    sowingSeason: "Late Spring / Kharif (May – June)",
    harvestTime: "150 – 180 days across multiple pickings",
    waterManagement: "Avoid water stress during square formation and boll development; keep dry at boll opening.",
    nitrogenAdvice: "Split nitrogen applications to prevent excessive leafy growth over boll setting.",
    expectedYield: "2.0 – 3.2 tons of seed cotton per hectare",
    companionCrops: "Cowpea, marigold (nematode control), sunflower"
  },
  "Coffee": {
    name: "Coffee",
    category: "Highland Plantation Crop",
    icon: "☕",
    ideal: {
      N: [85, 115],
      P: [22, 38],
      K: [24, 38],
      temperature: [22.0, 28.0],
      humidity: [55.0, 70.0],
      ph: [6.2, 7.4],
      rainfall: [140.0, 210.0]
    },
    mean: { N: 100, P: 30, K: 30, temperature: 25.0, humidity: 62.0, ph: 6.8, rainfall: 175.0 },
    std: { N: 8, P: 5, K: 5, temperature: 2.0, humidity: 5.0, ph: 0.3, rainfall: 20.0 },
    description: "Valuable perennial shrub thriving on sheltered hillslopes under canopy shade and humid air.",
    soilType: "Deep, porous volcanic loam or friable clay loam rich in humus",
    sowingSeason: "Monsoon onset (June – August)",
    harvestTime: "Annual winter harvest (November – February)",
    waterManagement: "Rainfall or sprinkler irrigation followed by dry spell to trigger blossom emergence.",
    nitrogenAdvice: "Balanced N-P-K (15-15-15) supplemented with organic compost mulch.",
    expectedYield: "1.0 – 2.2 tons of green coffee per hectare",
    companionCrops: "Shade trees (Silver Oak, Erythrina), black pepper vines, citrus"
  },
  "Jute": {
    name: "Jute (Golden Fiber)",
    category: "Natural Fiber Crop",
    icon: "🌾",
    ideal: {
      N: [68, 92],
      P: [38, 54],
      K: [32, 48],
      temperature: [22.5, 28.0],
      humidity: [74.0, 86.0],
      ph: [6.2, 7.2],
      rainfall: [145.0, 205.0]
    },
    mean: { N: 80, P: 46, K: 40, temperature: 25.0, humidity: 80.0, ph: 6.7, rainfall: 175.0 },
    std: { N: 8, P: 5, K: 5, temperature: 2.0, humidity: 4.0, ph: 0.4, rainfall: 18.0 },
    description: "Fast-growing bast fiber plant that thrives in warm, humid river deltas with abundant rainfall.",
    soilType: "Rich alluvial silt deposited by floodwaters",
    sowingSeason: "Pre-monsoon (March – May)",
    harvestTime: "120 – 140 days at 50% flowering",
    waterManagement: "Requires plenty of moisture for rapid stem elongation; followed by clean water for retting.",
    nitrogenAdvice: "Apply nitrogen in 2 doses for tall, uniform, fiber-rich stems.",
    expectedYield: "2.5 – 3.8 tons of dry fiber per hectare",
    companionCrops: "Rice in rotation, green manure crops"
  },
  "Coconut": {
    name: "Coconut",
    category: "Tropical Plantation Palm",
    icon: "🥥",
    ideal: {
      N: [12, 32],
      P: [10, 26],
      K: [22, 38],
      temperature: [24.0, 31.0],
      humidity: [90.0, 99.0],
      ph: [5.5, 6.8],
      rainfall: [140.0, 220.0]
    },
    mean: { N: 22, P: 18, K: 30, temperature: 27.0, humidity: 95.0, ph: 6.0, rainfall: 180.0 },
    std: { N: 5, P: 4, K: 5, temperature: 2.0, humidity: 3.0, ph: 0.3, rainfall: 22.0 },
    description: "Iconic tropical coastal palm requiring sea breezes, steady humid warmth, and high sunlight.",
    soilType: "Deep sandy loam, coastal sand, or alluvial loam with high water table",
    sowingSeason: "Monsoon onset (May – June)",
    harvestTime: "Continuous harvest every 30 – 45 days once mature (year 5+)",
    waterManagement: "Drip irrigation of 40–50 liters per palm daily during dry periods.",
    nitrogenAdvice: "High potassium requirement (MOP); annual basin application with neem cake.",
    expectedYield: "80 – 120 nuts per palm annually",
    companionCrops: "Cocoa, banana, ginger, turmeric, pineapple (multitier cropping)"
  },
  "Papaya": {
    name: "Papaya",
    category: "Tropical Fruit Crop",
    icon: "🥭",
    ideal: {
      N: [38, 62],
      P: [48, 72],
      K: [40, 60],
      temperature: [28.0, 38.0],
      humidity: [86.0, 96.0],
      ph: [6.2, 7.2],
      rainfall: [130.0, 190.0]
    },
    mean: { N: 50, P: 60, K: 50, temperature: 34.0, humidity: 92.0, ph: 6.7, rainfall: 160.0 },
    std: { N: 8, P: 7, K: 6, temperature: 3.0, humidity: 3.0, ph: 0.3, rainfall: 20.0 },
    description: "Rapid-growing herbaceous fruit tree delivering high returns in tropical, frost-free weather.",
    soilType: "Well-drained rich sandy loam; highly susceptible to root rot in waterlogged soils",
    sowingSeason: "Spring / Monsoon (February – March, June – July)",
    harvestTime: "9 – 11 months from planting",
    waterManagement: "Ring irrigation without wetting tree trunk; stop excess water during fruit ripening.",
    nitrogenAdvice: "Monthly light feeding with balanced NPK and organic manures.",
    expectedYield: "40 – 70 tons per hectare",
    companionCrops: "Short-duration vegetables (onion, cabbage, beans) during juvenile phase"
  },
  "Orange": {
    name: "Orange (Citrus)",
    category: "Subtropical Citrus Fruit",
    icon: "🍊",
    ideal: {
      N: [10, 30],
      P: [10, 26],
      K: [4, 16],
      temperature: [18.0, 27.0],
      humidity: [86.0, 96.0],
      ph: [6.2, 7.4],
      rainfall: [85.0, 135.0]
    },
    mean: { N: 20, P: 18, K: 10, temperature: 23.0, humidity: 92.0, ph: 6.8, rainfall: 110.0 },
    std: { N: 5, P: 4, K: 3, temperature: 3.0, humidity: 3.0, ph: 0.4, rainfall: 12.0 },
    description: "Premium citrus fruit demanding sun-drenched days, mild winters, and sweet, fertile soils.",
    soilType: "Deep, well-drained loamy soil with water table at least 2 meters deep",
    sowingSeason: "Monsoon onset (July – August)",
    harvestTime: "Winter harvest (December – February)",
    waterManagement: "Irrigate at 7–10 day intervals; withhold water 3 weeks prior to flowering to induce bloom.",
    nitrogenAdvice: "Apply nitrogen and micronutrients (Zinc, Iron, Boron) via foliar sprays.",
    expectedYield: "15 – 25 tons per hectare",
    companionCrops: "Leguminous cover crops, marigold, lavender"
  },
  "Apple": {
    name: "Apple",
    category: "Temperate Deciduous Fruit",
    icon: "🍎",
    ideal: {
      N: [15, 35],
      P: [115, 150],
      K: [185, 215],
      temperature: [18.0, 26.0],
      humidity: [86.0, 96.0],
      ph: [5.5, 6.6],
      rainfall: [90.0, 140.0]
    },
    mean: { N: 25, P: 135, K: 200, temperature: 22.0, humidity: 92.0, ph: 6.0, rainfall: 115.0 },
    std: { N: 5, P: 10, K: 8, temperature: 2.0, humidity: 3.0, ph: 0.3, rainfall: 12.0 },
    description: "Classic temperate orchard crop requiring winter chilling hours, rich potassium, and gentle summers.",
    soilType: "Deep, well-drained loam or sandy-clay loam rich in organic humus",
    sowingSeason: "Dormant winter planting (December – February)",
    harvestTime: "Late summer to autumn (August – October)",
    waterManagement: "Critical during fruit sizing; drip irrigation ensures uniform fruit diameter.",
    nitrogenAdvice: "High phosphorus and potassium for fruit color and storage firmess.",
    expectedYield: "18 – 30 tons per hectare",
    companionCrops: "White clover, chives, nasturtium (deter woolly aphids)"
  },
  "Watermelon": {
    name: "Watermelon",
    category: "Warm-Season Vine Fruit",
    icon: "🍉",
    ideal: {
      N: [85, 115],
      P: [10, 26],
      K: [40, 60],
      temperature: [22.0, 30.0],
      humidity: [78.0, 90.0],
      ph: [6.0, 7.0],
      rainfall: [35.0, 65.0]
    },
    mean: { N: 100, P: 18, K: 50, temperature: 26.0, humidity: 85.0, ph: 6.5, rainfall: 50.0 },
    std: { N: 8, P: 4, K: 5, temperature: 2.0, humidity: 4.0, ph: 0.3, rainfall: 8.0 },
    description: "Thriving in warm sunny conditions with sandy soils, requiring dry warmth during harvest ripening.",
    soilType: "Sandy or sandy loam with excellent sun exposure and warm drainage",
    sowingSeason: "Late Winter / Early Summer (January – March)",
    harvestTime: "75 – 95 days",
    waterManagement: "Frequent light irrigation during vine run; reduce water 10 days before harvest for higher brix.",
    nitrogenAdvice: "Apply nitrogen early for vine growth; switch to potassium when flowers appear.",
    expectedYield: "25 – 45 tons per hectare",
    companionCrops: "Radish, oregano, marigold, corn (windbreak)"
  },
  "Muskmelon": {
    name: "Muskmelon (Cantaloupe)",
    category: "Sweet Arid Melon",
    icon: "🍈",
    ideal: {
      N: [88, 112],
      P: [12, 25],
      K: [42, 58],
      temperature: [25.5, 31.0],
      humidity: [88.0, 96.0],
      ph: [6.0, 6.9],
      rainfall: [18.0, 32.0]
    },
    mean: { N: 100, P: 18, K: 50, temperature: 28.0, humidity: 92.0, ph: 6.4, rainfall: 25.0 },
    std: { N: 8, P: 4, K: 5, temperature: 2.0, humidity: 3.0, ph: 0.3, rainfall: 5.0 },
    description: "Demands dry, low-rain environments with intense warmth to build aroma and natural sugar sweetness.",
    soilType: "Light sandy loam with neutral pH and rapid drainage",
    sowingSeason: "Early Spring (February – March)",
    harvestTime: "70 – 85 days",
    waterManagement: "Avoid sprinkler watering; irrigate in furrows to keep fruit and leaves dry.",
    nitrogenAdvice: "Avoid excess nitrogen late in season as it delays ripening and reduces sweetness.",
    expectedYield: "15 – 25 tons per hectare",
    companionCrops: "Corn, beans, sunflowers"
  }
};

const STORAGE_KEY = 'smart_crop_custom_profiles';

export function getCustomCrops(): CropProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load custom crops:', e);
    return [];
  }
}

export function saveCustomCrop(crop: CropProfile): void {
  try {
    const existing = getCustomCrops();
    const filtered = existing.filter(c => c.name.toLowerCase() !== crop.name.toLowerCase());
    filtered.push({ ...crop, isCustom: true });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to save custom crop:', e);
  }
}

export function deleteCustomCrop(name: string): void {
  try {
    const existing = getCustomCrops();
    const updated = existing.filter(c => c.name.toLowerCase() !== name.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete custom crop:', e);
  }
}

export function getAllCrops(): Record<string, CropProfile> {
  const custom = getCustomCrops();
  const all = { ...DEFAULT_CROP_PROFILES };
  for (const c of custom) {
    all[c.name] = c;
  }
  return all;
}

export const CLIMATE_PRESETS: ClimatePreset[] = [
  {
    id: 'monsoon-paddy',
    title: 'Monsoon / Wet Basin',
    subtitle: 'High rain (240mm), humid (82%), rich alluvial soil',
    icon: '🌾',
    values: { N: 90, P: 45, K: 40, temperature: 24.0, humidity: 82.0, ph: 6.5, rainfall: 240.0 }
  },
  {
    id: 'arid-dryland',
    title: 'Arid / Dryland',
    subtitle: 'Dry atmosphere (17% hum), alkaline soil, mild winter',
    icon: '☀️',
    values: { N: 40, P: 68, K: 80, temperature: 19.0, humidity: 17.0, ph: 7.3, rainfall: 80.0 }
  },
  {
    id: 'temperate-orchard',
    title: 'Hill Orchard / Temperate',
    subtitle: 'High P (135) & K (200), cool air, acidic loam',
    icon: '🍎',
    values: { N: 25, P: 135, K: 200, temperature: 22.0, humidity: 92.0, ph: 6.0, rainfall: 115.0 }
  },
  {
    id: 'tropical-coastal',
    title: 'Tropical Coastal',
    subtitle: 'Sandy soil, ocean humidity (95%), warm breezes',
    icon: '🥥',
    values: { N: 22, P: 18, K: 30, temperature: 27.0, humidity: 95.0, ph: 6.0, rainfall: 180.0 }
  },
  {
    id: 'cash-crop-cotton',
    title: 'Warm Summer Cash Crop',
    subtitle: 'High N (120), black clay soil, warm sun (25°C)',
    icon: '☁️',
    values: { N: 120, P: 48, K: 20, temperature: 25.0, humidity: 80.0, ph: 6.8, rainfall: 80.0 }
  },
  {
    id: 'sweet-vine-melon',
    title: 'Dry Summer Vine / Melon',
    subtitle: 'Low rain (25mm), warm heat (28°C), sandy beds',
    icon: '🍉',
    values: { N: 100, P: 18, K: 50, temperature: 28.0, humidity: 90.0, ph: 6.5, rainfall: 35.0 }
  }
];
