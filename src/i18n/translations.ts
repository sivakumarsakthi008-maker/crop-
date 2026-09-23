import { kn } from './locales/kn';
import { ml } from './locales/ml';
import { mr } from './locales/mr';
import { bn } from './locales/bn';
import { gu } from './locales/gu';
import { pa } from './locales/pa';

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English (India)', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

export const translations = {
  en: {
    // Header & Navigation
    appName: "Smart Crop Advisor",
    appSubtitle: "Agricultural Soil & Climate Suitability Engine",
    liveFieldPlanning: "Live Field Planning",
    fieldAdvisorTab: "Field Advisor & Planner",
    soilMapTab: "Interactive Soil Map",
    cropCatalog: "Crop Catalog",
    addCustomCrop: "Add Custom Crop",
    language: "Language",
    selectLanguage: "Choose Language",
    openSoilMap: "Open Soil Map View",
    mapBannerTitle: "Explore Interactive Soil Map & Field Parcels",
    mapBannerSub: "Toggle nutrient-rich zones, potential yield heatmaps, and 5-year soil health trends with reverse crop diagnostics.",
    
    // General Actions
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    reset: "Reset Defaults",
    search: "Search",
    all: "All",
    delete: "Delete",
    edit: "Edit",
    viewDetails: "View Details",

    // Input Form & Parameters
    soilNutrientsHeading: "Soil Nutrients & Climate Parameters",
    nitrogen: "Nitrogen (N)",
    nitrogenDesc: "Essential macronutrient for vegetative shoot & leafy biomass growth",
    phosphorus: "Phosphorus (P)",
    phosphorusDesc: "Crucial for root establishment, early energy transfer & blooming",
    potassium: "Potassium (K)",
    potassiumDesc: "Regulates stomatal water balance, disease vigor & fruit quality",
    temperature: "Temperature",
    temperatureDesc: "Air temperature influencing photosynthetic respiration & pollination",
    humidity: "Relative Humidity",
    humidityDesc: "Moisture saturation affecting transpiration & spore germination",
    ph: "Soil pH (Acidity / Alkalinity)",
    phDesc: "Determines biological nutrient solubility and root uptake capacity",
    rainfall: "Rainfall / Water Supply",
    rainfallDesc: "Total water availability over the crop cycle or growing season",
    presets: "Agro-Climatic Presets",
    analyzeButton: "Analyze Crop Suitability",
    analyzing: "Analyzing Agronomic Fit...",
    modeRecommend: "Auto-Recommend Best Crop",
    modeTarget: "Evaluate Specific Target Crop",
    targetCropSelect: "Target Crop to Evaluate",
    customCropTag: "Custom Crop",
    stronglyAcidic: "Strongly Acidic",
    slightlyAcidic: "Slightly Acidic",
    neutralIdeal: "Neutral (Ideal)",
    moderatelyAlkaline: "Moderately Alkaline",
    stronglyAlkaline: "Strongly Alkaline",

    // Ready State & Weather
    readyHeading: "Ready for Crop Suitability Analysis",
    readySubheading: "Adjust your soil NPK, pH, and climate parameters on the left or sync live weather data, then click Analyze Crop Suitability.",
    liveWeather: "Real-Time Weather Data",
    syncWeather: "Apply to Field Form",
    weatherSynced: "Weather Applied",
    weatherLocation: "Field Weather Station",
    searchLocationPlaceholder: "Search field city, district or coordinates...",
    detectGPS: "Detect GPS Location",
    detecting: "Detecting Location...",
    currentLocationWeather: "Current Field Weather",
    weatherFetchError: "Unable to retrieve live weather. Please check connection.",
    fieldCoordinates: "Field Coordinates",
    totalFarmArea: "Total Farm Area",

    // Recommendation Card
    recommendedCrop: "Top Field Recommendation",
    targetCropAssessment: "Target Crop Assessment",
    suitabilityScore: "Suitability Score",
    waterReq: "Water Management",
    growingSeason: "Growing Season & Maturity",
    soilType: "Ideal Soil Type",
    category: "Crop Category",
    topAlternatives: "Top Alternative Crops",
    fitAnalysis: "Soil & Climate Fit Breakdown",
    yieldPotential: "Yield Potential",
    sowingMaturity: "Sowing & Maturity",
    commercialPotential: "Commercial Potential",
    nutrientDemandHeading: "Nutrient Demand & Management",
    companionCropsHeading: "Recommended Companion Crops",
    harvest: "Harvest Window",
    nitrogenRegime: "Nitrogen Regime",
    soilDrainage: "Soil & Drainage",

    // Suitability Levels
    matchExcellent: "Optimal Agronomic Fit",
    matchGood: "Good Commercial Potential",
    matchModerate: "Moderate / Sub-optimal",
    matchPoor: "Severe Limiting Factors",

    // Parameter Fit Analysis
    fitAnalysisTitle: "Soil & Climate Fit Breakdown",
    fitAnalysisSub: "Comparing your field parameters against ideal agronomic thresholds for",
    optimalCount: "Optimal",
    optimalRange: "Optimal Range",
    belowTarget: "Below Target",
    aboveTarget: "Above Target",
    yourField: "Your Field",
    idealCropTarget: "Ideal Crop Target",
    actionableAdvice: "Agronomic Guidance",

    // Soil Nutrient Radar
    radarChartTitle: "Soil NPK Nutrient Radar Profile",
    radarChartSub: "Comparing current soil fertility against optimal requirements for",
    interactiveRadar: "Interactive Radar",
    directValues: "Direct Values (mg/kg)",
    targetFitPct: "Target Fit (%)",
    yourSoil: "Your Soil",
    optimalTargetLabel: "Optimal Target",
    idealBand: "Ideal Band",
    deficiency: "Deficit",
    surplus: "Surplus",
    balanced: "Balanced",
    optimal: "Optimal",
    currentSoilLabel: "Current Soil",
    variance: "Variance",
    soilRatioInsight: "Soil N:P:K Ratio",
    targetRatioForCrop: "Target for",
    dosePerHa: "Recommended Application / Hectare",

    // Fertilizer Calculator
    fertilizerPlanTitle: "Soil-Test Fertilizer Dose Calculator",
    fertilizerPlanSub: "Calculates exact commercial fertilizer quantities to bridge the gap between your soil test and crop requirements.",
    customDoseTag: "Custom Dose",
    bagSizeLabel: "Bag Size",
    farmPlotSize: "Your Farm / Plot Size",
    hectares: "Hectares",
    acres: "Acres",
    nutrientStrategy: "Nutrient Source Strategy",
    strategyUreaDapMop: "Urea + DAP + MOP (Standard High-Analysis Program)",
    strategyUreaSspMop: "Urea + Single Super Phosphate (SSP) + MOP",
    strategyOrganicFym: "Organic Farmyard Manure (FYM) + Bio-Potash Program",
    totalFieldGap: "Total Field Nutrient Gap (Elemental)",
    noDeficitDetected: "Nutrient Balances Optimal - No Deficit Detected",
    balancedSoilMessage: "Your soil currently meets or exceeds nutrient thresholds for this crop. Maintain organic matter with light maintenance compost.",
    totalKgNeeded: "Total Quantity Needed",
    bagsCount: "Bags",
    basalDose: "Basal (At Sowing)",
    topDress1: "1st Top-Dress",
    topDress2: "2nd Top-Dress",
    splitScheduleHeading: "Application Split Schedule & Agronomic Timing",
    atSowingStage: "Basal (At Sowing / Transplanting)",
    vegetativeStage: "Vegetative / Tillering Stage",
    panicleStage: "Panicle / Flowering Stage",
    splitBestPracticeTitle: "Split Application Best Practice",
    splitBestPracticeDesc: "Never apply 100% of nitrogen in one single dose to prevent leaching, volatilization, and seedling scorching. Phosphorus should always be placed into the root zone at sowing.",

    // Pest & Disease Advisory
    pestAlertsTitle: "Pest & Disease Risk Advisory",
    pestAlertsSub: "Epidemiological model cross-referencing field microclimate with pathogen sporulation windows for",
    highRiskThreats: "High-Risk Threat",
    elevatedRisk: "Elevated Risk",
    lowDiseasePressure: "Low Disease Pressure",
    criticalWeatherWindow: "Critical Weather Window for Pathogen Spread",
    elevatedCautionTitle: "Elevated Microclimate Caution",
    optimalDefenseTitle: "Optimal Environmental Defense",
    filterAllThreats: "All Threats",
    filterHighAlert: "High Alert",
    filterFungal: "Fungal & Bacterial",
    filterInsect: "Insect Pests",
    highRisk: "High Alert",
    moderateRisk: "Moderate Caution",
    lowRisk: "Low Threat",
    triggerMatrix: "Epidemiological Trigger Matrix",
    incubationDriver: "Environmental Incubation Driver",
    tempTriggerWindow: "Temperature Trigger Window",
    humidityTriggerWindow: "Relative Humidity Trigger Window",
    whatToLookFor: "What to Look For During Morning Field Scouting",
    preventiveAgro: "Preventive Agronomic & Canopy Hygiene Measures",
    organicControl: "Organic / Bio-Control Protocol",
    chemicalControl: "Targeted Intervention (If ETL Exceeded)",
    yourFieldCurrent: "Your Field",

    // Interactive Soil Map
    soilMapTitle: "Interactive Soil Map & Zone Intelligence",
    soilMapSub: "Toggle fertility overlays, inspect plot-level soil health trends, view crop recommendations by soil quality, and test customized crop compatibility.",
    fieldGeospatial: "Field Geospatial",
    nutrientZones: "Nutrient-Rich Zones",
    yieldHeatmap: "Yield Potential Heatmap",
    soilTrends: "Soil Health Trends",
    activeMapLayer: "Active Map Layer",
    layerNutrientDesc: "Visualizing NPK Macronutrient Concentration & Fertility Index across farm plots",
    layerYieldDesc: "Simulated Harvest Yield Potential (%) calibrated for target crop",
    layerTrendsDesc: "5-Year Soil Organic Carbon, pH Drift, and Erosion Risk Trajectory",
    allNPK: "All NPK",
    clickParcelToInspect: "Click any parcel above to inspect soil intelligence",
    legendOptimal: "High / Optimal",
    legendModerate: "Moderate / Fair",
    legendDeficit: "Deficit / Degrading",
    inspectedParcel: "Inspected Parcel",
    sqiScoreLabel: "Soil Quality Index (SQI)",
    applyPlotSoil: "Apply Plot Soil to Advisor Form",
    recommendedForSoil: "Recommended Crops for this Soil Quality",
    sqiFit: "SQI Fit",
    planThisCrop: "Plan this crop",
    soilQualityFitForCrop: "Soil Quality Fit for Target Crop",
    soilCompatibility: "Soil Compatibility",
    targetPhReq: "Target Soil pH Requirement",
    targetNpkDemand: "Target NPK Demand",
    remediationRoadmap: "Required Soil Conditioning Roadmap",
    soilQualityIndex: "Soil Quality Index",
    improving: "Improving",
    stable: "Stable",
    degrading: "Degrading",
    highFertility: "High Fertility",
    mediumFertility: "Medium Fertility",
    lowFertility: "Low Fertility",
    depletedZone: "Depleted Zone",

    // Crop Catalog & Custom Crop Modals
    catalogTitle: "Crop Library & Custom Crop Catalog",
    catalogSub: "Explore ideal agronomic profiles, add custom regional crops, or evaluate field suitability",
    searchCropsPlaceholder: "Search crops or categories...",
    allCategories: "All Categories",
    idealSoil: "Ideal Soil",
    water: "Water",
    selectForEvaluation: "Select for Evaluation",
    removeCustomCropConfirm: "Are you sure you want to remove this crop from your custom list?",
    addCropTitle: "Add New Custom Crop Profile",
    addCropSub: "Define regional crop requirements to enrich your personalized agro-decision catalog.",
    cropNameLabel: "Crop Name",
    cropCategoryLabel: "Crop Category",
    cropIconLabel: "Crop Icon / Emoji",
    climateParameters: "Climate & Environmental Ranges",
    soilParameters: "Soil & Nutrient Ranges (NPK & pH)",
    agronomicGuidance: "Agronomic Guidance & Yield Potential",
    sowingSeasonLabel: "Sowing Season",
    harvestTimeLabel: "Harvest Duration",
    expectedYieldLabel: "Expected Harvest Yield",
    companionCropsLabel: "Companion Planting",
    cropDescriptionLabel: "Agronomic Notes & Description",
    fillRequiredFields: "Please provide a valid crop name and parameters.",
    saveCropButton: "Save Crop Profile",

    // Agronomic Principles & Footer
    principlesHeading: "Field Agronomy & Soil Management Principles",
    principleNpkTitle: "Balanced Soil Fertility (NPK)",
    principleNpkDesc: "Nitrogen (N) promotes lush green foliage and tillering; Phosphorus (P) fuels vigorous root systems and blooming; Potassium (K) regulates water transpiration and builds crop disease immunity.",
    principlePhTitle: "Soil pH & Nutrient Bioavailability",
    principlePhDesc: "Most agricultural crops thrive between pH 6.0 and 7.2. When soil is overly acidic (<5.8), apply agricultural limestone. For alkaline soils (>7.5), incorporate gypsum, farmyard manure, or elemental sulfur.",
    principleClimateTitle: "Live Climate Synchronization",
    principleClimateDesc: "Connect your field location with live meteorological data. Matching sowing seasons with ambient temperature and rainfall ensures seed germination rates and prevents vegetative stress.",
    footerTagline: "Agronomic Suitability & Real-Time Weather Integration",
    browseCatalogCount: "Browse Crop Catalog"
  },

  ta: {
    // Header & Navigation
    appName: "ஸ்மார்ட் பயிர் வழிகாட்டி",
    appSubtitle: "விவசாய மண் & காலநிலை பொருத்தம் கணிப்பான்",
    liveFieldPlanning: "நேரலை நில திட்டமிடல்",
    fieldAdvisorTab: "பயிர் வழிகாட்டி & திட்டம்",
    soilMapTab: "மண் வரைபட பார்வை",
    cropCatalog: "பயிர் அட்டவணை",
    addCustomCrop: "புதிய பயிர் சேர்",
    language: "மொழி",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    openSoilMap: "மண் வரைபடத்தை திறக்கவும்",
    mapBannerTitle: "ஊடாடும் மண் வரைபடத்தை ஆராயுங்கள்",
    mapBannerSub: "ஊட்டச்சத்து பகுதிகள், சாத்தியமான மகசூல் மற்றும் 5 ஆண்டு மண் மாற்றங்களை கண்டறியவும்.",

    // General Actions
    close: "மூடு",
    save: "சேமி",
    cancel: "ரத்து செய்",
    reset: "இயல்பு நிலைக்கு மீட்டமை",
    search: "தேடு",
    all: "அனைத்தும்",
    delete: "நீக்கு",
    edit: "திருத்து",
    viewDetails: "விவரங்களை பார்",

    // Input Form & Parameters
    soilNutrientsHeading: "மண் சத்துக்கள் & காலநிலை அளவீடுகள்",
    nitrogen: "தழைச்சத்து (N)",
    nitrogenDesc: "செடிகளின் இலை தழைகள் வளர்ச்சிக்கு அவசியமான முதன்மை சத்து",
    phosphorus: "மணிச்சத்து (P)",
    phosphorusDesc: "வேர் வளர்ச்சி, பூக்கள் மலர்தல் மற்றும் விதைகளுக்கு உதவும் சத்து",
    potassium: "சாம்பல் சத்து (K)",
    potassiumDesc: "நோய் எதிர்ப்பு சக்தி, நீர் சமநிலை மற்றும் காய் திரட்சிக்கு தேவை",
    temperature: "வெப்பநிலை",
    temperatureDesc: "பயிர் வளர்ச்சி மற்றும் மகரந்தச் சேர்க்கையை பாதிக்கும் காற்று வெப்பநிலை",
    humidity: "காற்றின் ஈரப்பதம்",
    humidityDesc: "நீராவிப்போக்கு மற்றும் பூஞ்சை வளர்ச்சியை நிர்ணயிக்கும் ஈரப்பதம்",
    ph: "மண் கார அமிலத்தன்மை (pH)",
    phDesc: "மண்ணில் உள்ள சத்துக்களை பயிர்கள் உறிஞ்சும் திறனை நிர்ணயிக்கிறது",
    rainfall: "மழைப்பொழிவு / நீர் அளவு",
    rainfallDesc: "பயிர் காலத்தின் மொத்த நீர் இருப்பு மற்றும் மழைப்பொழிவு",
    presets: "முன்னமைக்கப்பட்ட நில வகைகள்",
    analyzeButton: "பயிர் பொருத்தத்தை பகுப்பாய்வு செய்க",
    analyzing: "பொருத்தத்தை பகுப்பாய்வு செய்கிறது...",
    modeRecommend: "சிறந்த பயிரை தானாக பரிந்துரைக்கவும்",
    modeTarget: "குறிப்பிட்ட பயிரை சோதிக்கவும்",
    targetCropSelect: "மதிப்பிட வேண்டிய பயிர்",
    customCropTag: "தனிப்பயன் பயிர்",
    stronglyAcidic: "அதிக அமிலத்தன்மை",
    slightlyAcidic: "மிதமான அமிலத்தன்மை",
    neutralIdeal: "நடுநிலை (உகந்தது)",
    moderatelyAlkaline: "மிதமான காரத்தன்மை",
    stronglyAlkaline: "அதிக காரத்தன்மை",

    // Ready State & Weather
    readyHeading: "பயிர் பகுப்பாய்வுக்கு தயார்",
    readySubheading: "இடதுபுறத்தில் உங்கள் மண் சத்துக்கள், pH மற்றும் காலநிலை அளவுகளை மாற்றவும் அல்லது நேரலை வானிலையை இணைக்கவும்.",
    liveWeather: "நேரலை நில வானிலை",
    syncWeather: "படிவத்திற்கு வானிலையை சேர்",
    weatherSynced: "வானிலை இணைக்கப்பட்டது",
    weatherLocation: "நில வானிலை மையம்",
    searchLocationPlaceholder: "ஊர், மாவட்டம் அல்லது இடத்தை தேடவும்...",
    detectGPS: "தற்போதைய GPS இருப்பிடத்தை பெறு",
    detecting: "இருப்பிடம் கண்டறியப்படுகிறது...",
    currentLocationWeather: "தற்போதைய நில வானிலை",
    weatherFetchError: "வானிலை தகவலை பெற முடியவில்லை. இணைய இணைப்பை சரிபார்க்கவும்.",
    fieldCoordinates: "நில அமைவிடம்",
    totalFarmArea: "மொத்த நில பரப்பளவு",

    // Recommendation Card
    recommendedCrop: "சிறந்த பயிர் பரிந்துரை",
    targetCropAssessment: "குறிப்பிட்ட பயிர் மதிப்பீடு",
    suitabilityScore: "பொருத்த மதிப்பெண்",
    waterReq: "நீர் மேலாண்மை",
    growingSeason: "வளரும் பருவம் & அறுவடை காலம்",
    soilType: "பொருத்தமான மண் வகை",
    category: "பயிர் வகை",
    topAlternatives: "மாற்று பயிர்கள்",
    fitAnalysis: "மண் மற்றும் காலநிலை மதிப்பீடு",
    yieldPotential: "எதிர்பார்க்கப்படும் மகசூல்",
    sowingMaturity: "விதைப்பு மற்றும் முதிர்வு",
    commercialPotential: "வணிக சாத்தியக்கூறு",
    nutrientDemandHeading: "உர தேவை மற்றும் மேலாண்மை",
    companionCropsHeading: "பரிந்துரைக்கப்படும் ஊடுபயிர்கள்",
    harvest: "அறுவடை காலம்",
    nitrogenRegime: "தழைச்சத்து அட்டவணை",
    soilDrainage: "மண் மற்றும் வடிகால்",

    // Suitability Levels
    matchExcellent: "மிகச் சிறந்த விவசாய பொருத்தம்",
    matchGood: "நல்ல வணிக மகசூல் சாத்தியம்",
    matchModerate: "மிதமான பொருத்தம் / சில வரம்புகள்",
    matchPoor: "குறைந்த பொருத்தம் / சவாலானது",

    // Parameter Fit Analysis
    fitAnalysisTitle: "மண் மற்றும் காலநிலை பொருத்தம்",
    fitAnalysisSub: "உங்கள் நிலத்தின் அளவீடுகள் மற்றும் பயிரின் உகந்த தேவைகளின் ஒப்பீடு:",
    optimalCount: "உகந்தது",
    optimalRange: "உகந்த வரம்பு",
    belowTarget: "தேவைக்கு குறைவு",
    aboveTarget: "தேவைக்கு அதிகம்",
    yourField: "உங்கள் நிலம்",
    idealCropTarget: "பயிருக்கு உகந்தது",
    actionableAdvice: "விவசாய ஆலோசனை",

    // Soil Nutrient Radar
    radarChartTitle: "மண் NPK சத்து சமநிலை வரைபடம்",
    radarChartSub: "உங்கள் நிலத்தின் சத்துக்கள் மற்றும் பயிரின் தேவைகள் ஒப்பீடு:",
    interactiveRadar: "ஊடாடும் வரைபடம்",
    directValues: "நேரடி மதிப்புகள் (mg/kg)",
    targetFitPct: "இலக்கு பொருத்தம் (%)",
    yourSoil: "உங்கள் மண்",
    optimalTargetLabel: "உகந்த இலக்கு",
    idealBand: "உகந்த வரம்பு",
    deficiency: "பற்றாக்குறை",
    surplus: "அதிகப்படியானது",
    balanced: "சமநிலையானது",
    optimal: "உகந்தது",
    currentSoilLabel: "தற்போதைய மண்",
    variance: "வித்தியாசம்",
    soilRatioInsight: "மண் N:P:K விகிதம்",
    targetRatioForCrop: "பயிருக்கான உகந்த விகிதம்",
    dosePerHa: "ஹெக்டேருக்கு பரிந்துரைக்கப்படும் உரம்",

    // Fertilizer Calculator
    fertilizerPlanTitle: "மண் பரிசோதனை உர பரிந்துரை கால்குலேட்டர்",
    fertilizerPlanSub: "உங்கள் மண் பரிசோதனைக்கும் பயிரின் தேவைக்கும் உள்ள இடைவெளியை பூர்த்தி செய்ய தேவையான உர அளவுகளை கணக்கிடுகிறது.",
    customDoseTag: "பரிந்துரைக்கப்பட்ட உரம்",
    bagSizeLabel: "மூட்டை எடை",
    farmPlotSize: "உங்கள் பண்ணை / நில பரப்பளவு",
    hectares: "ஹெக்டேர்",
    acres: "ஏக்கர்",
    nutrientStrategy: "உர மேலாண்மை திட்டம்",
    strategyUreaDapMop: "யூரியா + DAP + பொட்டாஷ் (MOP) திட்டம்",
    strategyUreaSspMop: "யூரியா + சிங்கிள் சூப்பர் பாஸ்பேட் (SSP) + பொட்டாஷ்",
    strategyOrganicFym: "தொழுஉரம் (FYM) + இயற்கை சாம்பல் சத்து திட்டம்",
    totalFieldGap: "மொத்த நில ஊட்டச்சத்து பற்றாக்குறை",
    noDeficitDetected: "மண்ணில் சத்துக்கள் நிறைவாக உள்ளன - பற்றாக்குறை இல்லை",
    balancedSoilMessage: "உங்கள் நிலத்தில் இந்த பயிருக்கு தேவையான சத்துக்கள் போதுமான அளவு உள்ளன. இலகுவான மண்புழு உரம் இட்டு பராமரிக்கவும்.",
    totalKgNeeded: "தேவையான மொத்த அளவு",
    bagsCount: "மூட்டைகள்",
    basalDose: "அடி உரம் (விதைப்பின் போது)",
    topDress1: "முதல் மேலுரம்",
    topDress2: "இரண்டாம் மேலுரம்",
    splitScheduleHeading: "உரமிடும் கால அட்டவணை",
    atSowingStage: "அடி உரம் (விதைப்பு / நடவின் போது)",
    vegetativeStage: "தழைப்பருவம் / தூர்கட்டும் பருவம்",
    panicleStage: "பூக்கும் பருவம் / கதிர் வரும் பருவம்",
    splitBestPracticeTitle: "உர பயன்பாட்டு சிறந்த நடைமுறைகள்",
    splitBestPracticeDesc: "தழைச்சத்தை ஒரே முறையில் முழுமையாக இடக்கூடாது; தூர் கட்டும் மற்றும் பூக்கும் பருவங்களில் பிரித்து இடவும். மணிச்சத்தை விதைப்பின் போதே அடியில் இட வேண்டும்.",

    // Pest & Disease Advisory
    pestAlertsTitle: "பூச்சி & நோய் அபாய எச்சரிக்கை",
    pestAlertsSub: "நிலத்தின் வெப்பநிலை மற்றும் ஈரப்பதத்தை அடிப்படையாகக் கொண்டு நோய்க்கிருமிகள் பரவும் வாய்ப்பு கணிப்பு:",
    highRiskThreats: "தீவிர அபாய எச்சரிக்கை",
    elevatedRisk: "கவனிக்கப்பட வேண்டிய அபாயம்",
    lowDiseasePressure: "நோய் அச்சுறுத்தல் குறைவு",
    criticalWeatherWindow: "நோய்க்கிருமி பரவுவதற்கு சாதகமான காலநிலை சூழல்",
    elevatedCautionTitle: "முன்னெச்சரிக்கை தேவைப்படும் சூழல்",
    optimalDefenseTitle: "பாதுகாப்பான சூழல்",
    filterAllThreats: "அனைத்து அச்சுறுத்தல்கள்",
    filterHighAlert: "அதிதீவிர எச்சரிக்கை",
    filterFungal: "பூஞ்சை & பாக்டீரியா",
    filterInsect: "பூச்சி தாக்குதல்",
    highRisk: "அதிதீவிர எச்சரிக்கை",
    moderateRisk: "மிதமான கவனம்",
    lowRisk: "குறைந்த அபாயம்",
    triggerMatrix: "காலநிலை தூண்டுதல் அட்டவணை",
    incubationDriver: "நோய் தோன்றுவதற்கான முதன்மைக் காரணம்",
    tempTriggerWindow: "வெப்பநிலை ஆபத்து வரம்பு",
    humidityTriggerWindow: "ஈரப்பதம் ஆபத்து வரம்பு",
    whatToLookFor: "காலை கள ஆய்வின் போது கவனிக்க வேண்டிய அறிகுறிகள்",
    preventiveAgro: "தடுப்பு விவசாய முறைகள் & இலைப்பரப்பு சுகாதாரம்",
    organicControl: "இயற்கை & உயிரியல் கட்டுப்பாடு",
    chemicalControl: "இரசாயன தெளிப்பு (பொருளாதார சேத நிலை தாண்டினால்)",
    yourFieldCurrent: "உங்கள் நிலம்",

    // Interactive Soil Map
    soilMapTitle: "ஊடாடும் மண் வரைபடம் & மண்டல ஆய்வு",
    soilMapSub: "சத்துக்கள் நிறைந்த பகுதிகள், மகசூல் வெப்ப வரைபடம் மற்றும் மண் ஆரோக்கிய போக்குகளை எளிதாக பார்வையிடலாம்.",
    fieldGeospatial: "நில இட அமைப்பியல்",
    nutrientZones: "ஊட்டச்சத்து நிறைந்த மண்டலங்கள்",
    yieldHeatmap: "மகசூல் சாத்தியக்கூறு வரைபடம்",
    soilTrends: "மண் ஆரோக்கிய போக்குகள்",
    activeMapLayer: "செயலில் உள்ள வரைபட அடுக்கு",
    layerNutrientDesc: "பண்ணை நிலங்களின் NPK சத்து செறிவு மற்றும் மண் வள குறியீடு",
    layerYieldDesc: "தேர்ந்தெடுக்கப்பட்ட பயிருக்கான மாதிரி மகசூல் சாத்தியம் (%)",
    layerTrendsDesc: "5 ஆண்டு மண் கரிம கரிமம், pH மற்றும் அரிப்பு அபாய மாற்றங்கள்",
    allNPK: "அனைத்து NPK",
    clickParcelToInspect: "மண் வளத்தை ஆய்வு செய்ய ஏதேனும் நிலப்பகுதியை கிளிக் செய்யவும்",
    legendOptimal: "அதிகம் / உகந்தது",
    legendModerate: "நடுத்தரம் / பரவாயில்லை",
    legendDeficit: "பற்றாக்குறை / சீர்கேடு",
    inspectedParcel: "தேர்ந்தெடுக்கப்பட்ட நிலம்",
    sqiScoreLabel: "மண் தர குறியீடு (SQI)",
    applyPlotSoil: "இந்த நிலத்தின் மண்ணை படிவத்திற்கு அனுப்புக",
    recommendedForSoil: "இந்த மண்ணிற்கு பரிந்துரைக்கப்படும் பயிர்கள்",
    sqiFit: "மண் பொருத்தம்",
    planThisCrop: "இந்த பயிரை திட்டமிடு",
    soilQualityFitForCrop: "பயிருக்கான மண் தர பொருத்தம்",
    soilCompatibility: "மண் இணக்கத்தன்மை",
    targetPhReq: "பயிருக்கு தேவையான மண் pH",
    targetNpkDemand: "பயிருக்கு தேவையான NPK அளவு",
    remediationRoadmap: "மண் தர மேம்பாட்டு வழிகாட்டுதல்",
    soilQualityIndex: "மண் தர குறியீடு",
    improving: "மேம்படுகிறது",
    stable: "நிலையானது",
    degrading: "குறைகிறது",
    highFertility: "அதிக வளம்",
    mediumFertility: "நடுத்தர வளம்",
    lowFertility: "குறைந்த வளம்",
    depletedZone: "வளம் குறைந்த பகுதி",

    // Crop Catalog & Custom Crop Modals
    catalogTitle: "பயிர் நூலகம் & அட்டவணை",
    catalogSub: "பயிர்களின் தகவல்களை அறியவும், புதிய மண்டல பயிர்களை சேர்க்கவும்",
    searchCropsPlaceholder: "பயிர் அல்லது வகையை தேடுக...",
    allCategories: "அனைத்து வகைகள்",
    idealSoil: "உகந்த மண்",
    water: "நீர் தேவை",
    selectForEvaluation: "மதிப்பீட்டிற்கு தேர்ந்தெடு",
    removeCustomCropConfirm: "இப்பயிரை உங்கள் தனிப்பயன் பட்டியலிலிருந்து நீக்க விரும்புகிறீர்களா?",
    addCropTitle: "புதிய பயிர் விவரக்குறிப்பை சேர்க்க",
    addCropSub: "உங்கள் பகுதிக்கான பிரத்யேக பயிரின் சத்து மற்றும் காலநிலை தேவைகளை உள்ளிடுக.",
    cropNameLabel: "பயிர் பெயர்",
    cropCategoryLabel: "பயிர் பிரிவு",
    cropIconLabel: "பயிர் சின்னம் / ஈமோஜி",
    climateParameters: "காலநிலை & சுற்றுச்சூழல் தேவைகள்",
    soilParameters: "மண் & ஊட்டச்சத்து வரம்புகள் (NPK & pH)",
    agronomicGuidance: "விவசாய வழிகாட்டுதல் & மகசூல்",
    sowingSeasonLabel: "விதைப்பு பருவம்",
    harvestTimeLabel: "வளரும் காலம் / அறுவடை நாட்கள்",
    expectedYieldLabel: "எதிர்பார்க்கப்படும் மகசூல்",
    companionCropsLabel: "ஊடுபயிர்கள்",
    cropDescriptionLabel: "விவசாய குறிப்புகள் & விளக்கம்",
    fillRequiredFields: "பயிரின் பெயர் மற்றும் அளவீடுகளை சரியாக உள்ளிடவும்.",
    saveCropButton: "பயிரை சேமி",

    // Agronomic Principles & Footer
    principlesHeading: "விவசாய கள மேலாண்மை & மண் கொள்கைகள்",
    principleNpkTitle: "சீரான மண் வளம் (NPK)",
    principleNpkDesc: "தழைச்சத்து (N) செழிப்பான இலை வளர்ச்சிக்கு உதவுகிறது; மணிச்சத்து (P) வலுவான வேர் அமைப்பு மற்றும் பூக்களுக்கு முக்கியம்; சாம்பல் சத்து (K) நீர் சமநிலையை கட்டுப்படுத்தி நோய் எதிர்ப்பு சக்தியை கூட்டுகிறது.",
    principlePhTitle: "மண் pH & ஊட்டச்சத்து உறிஞ்சும் திறன்",
    principlePhDesc: "பெரும்பாலான பயிர்கள் pH 6.0 முதல் 7.2 வரை செழித்து வளரும். அமில மண் (<5.8) எனில் விவசாய சுண்ணாம்பு இடவும்; கார மண் (>7.5) எனில் ஜிப்சம் அல்லது மக்கிய தொழுவுரம் சேர்க்கவும்.",
    principleClimateTitle: "நேரலை காலநிலை ஒத்திசைவு",
    principleClimateDesc: "உங்கள் நில அமைவிடத்தை நேரலை வானிலை தரவுகளுடன் இணைக்கவும். வெப்பநிலை மற்றும் மழைப்பொழிவுக்கு ஏற்ப விதைப்பது முளைப்புத்திறனை உறுதி செய்து பயிர் அழுத்தத்தை குறைக்கும்.",
    footerTagline: "விவசாய பயிர் பொருத்தம் & நேரலை வானிலை ஒருங்கிணைப்பு",
    browseCatalogCount: "பயிர் பட்டியலை காண்க"
  },

  hi: {
    // Header & Navigation
    appName: "स्मार्ट फसल सलाहकार",
    appSubtitle: "कृषि मिट्टी एवं जलवायु उपयुक्तता इंजन",
    liveFieldPlanning: "सजीव खेत नियोजन",
    fieldAdvisorTab: "फसल सलाहकार एवं योजना",
    soilMapTab: "इंटरैक्टिव मिट्टी मानचित्र",
    cropCatalog: "फसल सूची",
    addCustomCrop: "कस्टम फसल जोड़ें",
    language: "भाषा",
    selectLanguage: "भाषा चुनें",
    openSoilMap: "मिट्टी मानचित्र खोलें",
    mapBannerTitle: "इंटरैक्टिव मिट्टी मानचित्र देखें",
    mapBannerSub: "पोषक तत्व क्षेत्रों, संभावित उपज हीटमैप और 5-वर्षीय मिट्टी स्वास्थ्य रुझानों का अन्वेषण करें।",

    // General Actions
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    reset: "डिफ़ॉल्ट पर रीसेट करें",
    search: "खोजें",
    all: "सभी",
    delete: "हटाएं",
    edit: "संपादित करें",
    viewDetails: "विवरण देखें",

    // Input Form & Parameters
    soilNutrientsHeading: "मिट्टी के पोषक तत्व एवं जलवायु कारक",
    nitrogen: "नाइट्रोजन (N)",
    nitrogenDesc: "पौधों की वानस्पतिक वृद्धि और हरी पत्तियों के लिए आवश्यक प्राथमिक पोषक तत्व",
    phosphorus: "फॉस्फोरस (P)",
    phosphorusDesc: "जड़ों के मजबूत विकास, जल्दी ऊर्जा स्थानांतरण और फूल आने के लिए जरूरी",
    potassium: "पोटेशियम (K)",
    potassiumDesc: "रोग प्रतिरोधक क्षमता, जल संतुलन और दानों/फलों की गुणवत्ता बढ़ाता है",
    temperature: "तापमान",
    temperatureDesc: "प्रकाश संश्लेषण और परागण को प्रभावित करने वाला परिवेशी तापमान",
    humidity: "सापेक्ष आर्द्रता",
    humidityDesc: "वाष्पोत्सर्जन और रोगजनक बीजाणु विकास को प्रभावित करने वाली नमी",
    ph: "मिट्टी का pH (अम्लता / क्षारता)",
    phDesc: "मिट्टी में पोषक तत्वों की घुलनशीलता और अवशोषण क्षमता निर्धारित करता है",
    rainfall: "वर्षा / जल आपूर्ति",
    rainfallDesc: "फसल चक्र या मौसम के दौरान कुल उपलब्ध पानी",
    presets: "जलवायु प्रीसेट",
    analyzeButton: "फसल उपयुक्तता का विश्लेषण करें",
    analyzing: "विश्लेषण जारी है...",
    modeRecommend: "सर्वोत्तम फसल की स्वतः अनुशंसा",
    modeTarget: "विशिष्ट लक्षित फसल का मूल्यांकन",
    targetCropSelect: "मूल्यांकन हेतु लक्षित फसल",
    customCropTag: "कस्टम फसल",
    stronglyAcidic: "अत्यधिक अम्लीय",
    slightlyAcidic: "हल्का अम्लीय",
    neutralIdeal: "तटस्थ (आदर्श)",
    moderatelyAlkaline: "मध्यम क्षारीय",
    stronglyAlkaline: "अत्यधिक क्षारीय",

    // Ready State & Weather
    readyHeading: "फसल उपयुक्तता विश्लेषण के लिए तैयार",
    readySubheading: "बाईं ओर अपनी मिट्टी के NPK, pH और जलवायु मान समायोजित करें या लाइव मौसम सिंक करें, फिर उपयुक्तता विश्लेषण पर क्लिक करें।",
    liveWeather: "खेत का लाइव मौसम",
    syncWeather: "खेत फॉर्म में लागू करें",
    weatherSynced: "लाइव मौसम सक्रिय",
    weatherLocation: "खेत मौसम केंद्र",
    searchLocationPlaceholder: "शहर, जिला या निर्देशांक खोजें...",
    detectGPS: "वर्तमान GPS स्थान का पता लगाएं",
    detecting: "स्थान खोजा जा रहा है...",
    currentLocationWeather: "वर्तमान खेत मौसम",
    weatherFetchError: "लाइव मौसम प्राप्त करने में असमर्थ। कृपया कनेक्शन जांचें।",
    fieldCoordinates: "खेत निर्देशांक",
    totalFarmArea: "कुल कृषि क्षेत्र",

    // Recommendation Card
    recommendedCrop: "सर्वोच्च खेत अनुशंसा",
    targetCropAssessment: "लक्षित फसल मूल्यांकन",
    suitabilityScore: "उपयुक्तता स्कोर",
    waterReq: "जल प्रबंधन",
    growingSeason: "फसल मौसम एवं परिपक्वता",
    soilType: "आदर्श मिट्टी का प्रकार",
    category: "फसल श्रेणी",
    topAlternatives: "शीर्ष वैकल्पिक फसलें",
    fitAnalysis: "मिट्टी और जलवायु अनुकूलता विवरण",
    yieldPotential: "उपज क्षमता",
    sowingMaturity: "बुवाई और कटाई अवधि",
    commercialPotential: "व्यावसायिक क्षमता",
    nutrientDemandHeading: "पोषक तत्व मांग एवं प्रबंधन",
    companionCropsHeading: "अनुशंसित सह-फसलें",
    harvest: "कटाई की अवधि",
    nitrogenRegime: "नाइट्रोजन खुराक व्यवस्था",
    soilDrainage: "मिट्टी एवं जल निकासी",

    // Suitability Levels
    matchExcellent: "अत्युत्तम कृषि उपयुक्तता",
    matchGood: "अच्छी व्यावसायिक उपज क्षमता",
    matchModerate: "मध्यम / सीमित उपयुक्तता",
    matchPoor: "गंभीर सीमित कारक / जोखिम",

    // Parameter Fit Analysis
    fitAnalysisTitle: "मिट्टी और जलवायु उपयुक्तता विवरण",
    fitAnalysisSub: "आपके खेत के मापदंडों की आदर्श कृषि सीमाओं से तुलना:",
    optimalCount: "इष्टतम",
    optimalRange: "इष्टतम सीमा",
    belowTarget: "लक्ष्य से कम",
    aboveTarget: "लक्ष्य से अधिक",
    yourField: "आपका खेत",
    idealCropTarget: "आदर्श फसल लक्ष्य",
    actionableAdvice: "कृषि परामर्श",

    // Soil Nutrient Radar
    radarChartTitle: "मिट्टी NPK पोषक तत्व रडार प्रोफ़ाइल",
    radarChartSub: "वर्तमान मिट्टी की उर्वरता और फसल की आवश्यकता की तुलना:",
    interactiveRadar: "इंटरैक्टिव रडार",
    directValues: "प्रत्यक्ष मान (mg/kg)",
    targetFitPct: "लक्ष्य उपयुक्तता (%)",
    yourSoil: "आपकी मिट्टी",
    optimalTargetLabel: "इष्टतम लक्ष्य",
    idealBand: "आदर्श बैंड",
    deficiency: "कमी",
    surplus: "अतिरिक्त",
    balanced: "संतुलित",
    optimal: "इष्टतम",
    currentSoilLabel: "वर्तमान मिट्टी",
    variance: "अंतर",
    soilRatioInsight: "मिट्टी N:P:K अनुपात",
    targetRatioForCrop: "फसल का लक्ष्य अनुपात",
    dosePerHa: "अनुशंसित मात्रा प्रति हेक्टेयर",

    // Fertilizer Calculator
    fertilizerPlanTitle: "मृदा परीक्षण उर्वरक खुराक कैलकुलेटर",
    fertilizerPlanSub: "मिट्टी परीक्षण और फसल की मांग के बीच के अंतर को पाटने के लिए सटीक उर्वरक मात्रा की गणना करता है।",
    customDoseTag: "कस्टम खुराक",
    bagSizeLabel: "बोरी का वजन",
    farmPlotSize: "आपके खेत / भूखंड का आकार",
    hectares: "हेक्टेयर",
    acres: "एकड़",
    nutrientStrategy: "उर्वरक स्रोत रणनीति",
    strategyUreaDapMop: "यूरिया + डीएपी + एमओपी (मानक उर्वरक कार्यक्रम)",
    strategyUreaSspMop: "यूरिया + सिंगल सुपर फॉस्फेट (एसएसपी) + एमओपी",
    strategyOrganicFym: "गोबर की खाद (FYM) + जैविक पोटाश कार्यक्रम",
    totalFieldGap: "कुल खेत पोषक तत्व कमी",
    noDeficitDetected: "पोषक तत्व संतुलित हैं - कोई कमी नहीं पाई गई",
    balancedSoilMessage: "आपकी मिट्टी में वर्तमान में इस फसल के लिए पर्याप्त पोषक तत्व मौजूद हैं। केवल हल्की जैविक खाद से उर्वरता बनाए रखें।",
    totalKgNeeded: "आवश्यक कुल मात्रा",
    bagsCount: "बोरियां",
    basalDose: "आधार खुराक (बुवाई के समय)",
    topDress1: "प्रथम टॉप-ड्रेसिंग",
    topDress2: "द्वितीय टॉप-ड्रेसिंग",
    splitScheduleHeading: "उर्वरक प्रयोग का समय एवं विभाजन सारणी",
    atSowingStage: "आधार खुराक (बुवाई / रोपाई के समय)",
    vegetativeStage: "वानस्पतिक वृद्धि / कल्ले फूटने का समय",
    panicleStage: "फूल आने / दाना भरने की अवस्था",
    splitBestPracticeTitle: "विभाजित उर्वरक प्रयोग के सर्वोत्तम नियम",
    splitBestPracticeDesc: "नाइट्रोजन की पूरी मात्रा कभी एक साथ न डालें; इसे कल्ले फूटने और फूल आने पर विभाजित करके दें। फॉस्फोरस हमेशा बुवाई के समय जड़ों के पास डालें।",

    // Pest & Disease Advisory
    pestAlertsTitle: "कीट एवं रोग जोखिम परामर्श",
    pestAlertsSub: "खेत के तापमान एवं आर्द्रता के आधार पर रोगजनक बीजाणुओं के प्रसार का आकलन:",
    highRiskThreats: "उच्च जोखिम खतरा",
    elevatedRisk: "बढ़ा हुआ जोखिम",
    lowDiseasePressure: "कम रोग दबाव",
    criticalWeatherWindow: "रोग फैलने के लिए अनुकूल मौसम अवधि",
    elevatedCautionTitle: "सजग रहने की सलाह",
    optimalDefenseTitle: "सुरक्षित पर्यावरण रक्षा",
    filterAllThreats: "सभी खतरे",
    filterHighAlert: "उच्च चेतावनी",
    filterFungal: "फफूंद एवं जीवाणु",
    filterInsect: "कीट पतंगे",
    highRisk: "उच्च चेतावनी",
    moderateRisk: "मध्यम सतर्कता",
    lowRisk: "कम जोखिम",
    triggerMatrix: "महामारी विज्ञान ट्रिगर मैट्रिक्स",
    incubationDriver: "पर्यावरणीय संक्रमण कारक",
    tempTriggerWindow: "तापमान ट्रिगर विंडो",
    humidityTriggerWindow: "आर्द्रता ट्रिगर विंडो",
    whatToLookFor: "सुबह खेत निरीक्षण के समय ध्यान देने योग्य लक्षण",
    preventiveAgro: "निवारक कृषि उपाय एवं स्वच्छता",
    organicControl: "जैविक / बायो-कंट्रोल उपचार",
    chemicalControl: "लक्षित रासायनिक उपाय (यदि क्षति सीमा पार हो)",
    yourFieldCurrent: "आपका खेत",

    // Interactive Soil Map
    soilMapTitle: "इंटरैक्टिव मिट्टी मानचित्र एवं ज़ोन बुद्धिमत्ता",
    soilMapSub: "पोषक तत्वों से भरपूर क्षेत्र, उपज हीटमैप और मिट्टी के स्वास्थ्य के रुझान देखें।",
    fieldGeospatial: "खेत स्थानिक विश्लेषण",
    nutrientZones: "पोषक तत्व प्रचुर क्षेत्र",
    yieldHeatmap: "उपज क्षमता हीटमैप",
    soilTrends: "मिट्टी स्वास्थ्य रुझान",
    activeMapLayer: "सक्रिय मानचित्र परत",
    layerNutrientDesc: "खेत भूखंडों में NPK सांद्रता और उर्वरता सूचकांक का दृश्य",
    layerYieldDesc: "लक्षित फसल के लिए अनुकरणीय फसल उपज क्षमता (%)",
    layerTrendsDesc: "5-वर्षीय मिट्टी जैविक कार्बन, pH बदलाव और अपरदन जोखिम",
    allNPK: "सभी NPK",
    clickParcelToInspect: "मिट्टी की जांच करने के लिए किसी भी भूखंड पर क्लिक करें",
    legendOptimal: "उच्च / इष्टतम",
    legendModerate: "मध्यम / सामान्य",
    legendDeficit: "कमी / घटता हुआ",
    inspectedParcel: "निरीक्षित भूखंड",
    sqiScoreLabel: "मृदा गुणवत्ता सूचकांक (SQI)",
    applyPlotSoil: "भूखंड की मिट्टी सलाहकार फॉर्म में लागू करें",
    recommendedForSoil: "इस मिट्टी की गुणवत्ता के लिए अनुशंसित फसलें",
    sqiFit: "SQI उपयुक्तता",
    planThisCrop: "इस फसल की योजना बनाएं",
    soilQualityFitForCrop: "लक्षित फसल के लिए मिट्टी की उपयुक्तता",
    soilCompatibility: "मिट्टी संगतता",
    targetPhReq: "लक्षित मिट्टी pH आवश्यकता",
    targetNpkDemand: "लक्षित NPK मांग",
    remediationRoadmap: "मिट्टी सुधार और उपचार कार्ययोजना",
    soilQualityIndex: "मृदा गुणवत्ता सूचकांक",
    improving: "सुधर रहा है",
    stable: "स्थिर",
    degrading: "घट रहा है",
    highFertility: "उच्च उर्वरता",
    mediumFertility: "मध्यम उर्वरता",
    lowFertility: "निम्न उर्वरता",
    depletedZone: "क्षीण क्षेत्र",

    // Crop Catalog & Custom Crop Modals
    catalogTitle: "फसल पुस्तकालय एवं कस्टम फसल कैटलॉग",
    catalogSub: "आदर्श कृषि प्रोफाइल का अन्वेषण करें, कस्टम क्षेत्रीय फसलें जोड़ें",
    searchCropsPlaceholder: "फसल या श्रेणी खोजें...",
    allCategories: "सभी श्रेणियां",
    idealSoil: "आदर्श मिट्टी",
    water: "जल आवश्यकता",
    selectForEvaluation: "मूल्यांकन हेतु चुनें",
    removeCustomCropConfirm: "क्या आप वाकई इस फसल को अपनी कस्टम सूची से हटाना चाहते हैं?",
    addCropTitle: "नई कस्टम फसल प्रोफ़ाइल जोड़ें",
    addCropSub: "अपने व्यक्तिगत कृषि कैटलॉग को समृद्ध करने के लिए क्षेत्रीय फसल मापदंड परिभाषित करें।",
    cropNameLabel: "फसल का नाम",
    cropCategoryLabel: "फसल श्रेणी",
    cropIconLabel: "फसल प्रतीक / इमोजी",
    climateParameters: "जलवायु एवं पर्यावरणीय आवश्यकताएं",
    soilParameters: "मिट्टी एवं पोषक तत्व सीमाएं (NPK & pH)",
    agronomicGuidance: "कृषि मार्गदर्शन एवं उपज क्षमता",
    sowingSeasonLabel: "बुवाई का मौसम",
    harvestTimeLabel: "परिपक्वता / कटाई के दिन",
    expectedYieldLabel: "अपेक्षित उपज",
    companionCropsLabel: "सह-फसलें",
    cropDescriptionLabel: "कृषि विवरण एवं नोट्स",
    fillRequiredFields: "कृपया फसल का नाम और आवश्यक पैरामीटर सही भरें।",
    saveCropButton: "फसल प्रोफ़ाइल सहेजें",

    // Agronomic Principles & Footer
    principlesHeading: "खेत कृषि विज्ञान एवं मिट्टी प्रबंधन सिद्धांत",
    principleNpkTitle: "संतुलित मिट्टी उर्वरता (NPK)",
    principleNpkDesc: "नाइट्रोजन (N) पत्तियों और तनों की हरी वृद्धि बढ़ाता है; फास्फोरस (P) मजबूत जड़ों और फूलों को ऊर्जा देता है; पोटाश (K) जल संतुलन बनाए रखता है और रोग प्रतिरोधक क्षमता बढ़ाता है।",
    principlePhTitle: "मिट्टी का pH एवं पोषक तत्व जैव-उपलब्धता",
    principlePhDesc: "अधिकांश फसलें pH 6.0 से 7.2 के बीच उत्तम उपज देती हैं। अम्लीय मिट्टी (<5.8) में कृषि चूना डालें; क्षारीय मिट्टी (>7.5) में जिप्सम या सड़ी गोबर खाद मिलाएं।",
    principleClimateTitle: "सजीव जलवायु समन्वय",
    principleClimateDesc: "अपने खेत को वास्तविक समय के मौसम से जोड़ें। स्थानीय तापमान और वर्षा के अनुसार बुवाई करने से अंकुरण दर बढ़ती है और फसल तनाव से बचती है।",
    footerTagline: "कृषि उपयुक्तता एवं वास्तविक समय मौसम एकीकरण",
    browseCatalogCount: "फसल सूची देखें"
  },

  te: {
    // Header & Navigation
    appName: "స్మార్ట్ పంట సలహాదారు",
    appSubtitle: "వ్యవసాయ నేల & వాతావరణ అనుకూలత ఇంజిన్",
    liveFieldPlanning: "ప్రత్యక్ష పొలం ప్రణాళిక",
    fieldAdvisorTab: "పంట సలహాదారు & ప్రణాళిక",
    soilMapTab: "ఇంటరాక్టివ్ నేల మ్యాప్",
    cropCatalog: "పంటల సూచిక",
    addCustomCrop: "కస్టమ్ పంటను జోడించండి",
    language: "భాష",
    selectLanguage: "భాషను ఎంచుకోండి",
    openSoilMap: "నేల మ్యాప్‌ను తెరవండి",
    mapBannerTitle: "ఇంటరాక్టివ్ నేల మ్యాప్‌ను అన్వేషించండి",
    mapBannerSub: "పోషక మండలాలు, దిగుబడి హీట్‌మ్యాప్ మరియు 5 సంవత్సరాల నేల మార్పులను చూడండి.",

    // General Actions
    close: "మూసివేయి",
    save: "సేవ్ చేయి",
    cancel: "రద్దు చేయి",
    reset: "రీసెట్ చేయండి",
    search: "వెతకండి",
    all: "అన్నీ",
    delete: "తొలగించు",
    edit: "సవరించు",
    viewDetails: "వివరాలు చూడండి",

    // Input Form & Parameters
    soilNutrientsHeading: "నేల పోషకాలు & వాతావరణ అంశాలు",
    nitrogen: "నత్రజని (N)",
    nitrogenDesc: "మొక్కల ఆకులు మరియు కొమ్మల ఏపుగా పెరగడానికి అవసరమైన ప్రధాన పోషకం",
    phosphorus: "భాస్వరం (P)",
    phosphorusDesc: "వేర్లు దృఢంగా ఏర్పడటానికి, పూత మరియు గింజ కట్టడానికి అవసరం",
    potassium: "పొటాషియం (K)",
    potassiumDesc: "రోగనిరోధక శక్తి, నీటి సమతుల్యత మరియు దిగుబడి నాణ్యతను పెంచుతుంది",
    temperature: "ఉష్ణోగ్రత",
    temperatureDesc: "కిరణజన్య సంయోగక్రియ మరియు పరాగసంపర్కాన్ని ప్రభావితం చేసే వాతావరణం",
    humidity: "గాలిలో తేమ శాతం",
    humidityDesc: "భాష్పోత్సేకం మరియు తెగుళ్ల వ్యాప్తికి కారణమయ్యే గాలి తేమ",
    ph: "నేల pH (ఆమ్ల / క్షార స్థాయి)",
    phDesc: "నేలలోని పోషకాలను వేర్లు గ్రహించే సామర్థ్యాన్ని నిర్ణయిస్తుంది",
    rainfall: "వర్షపాతం / నీటి లభ్యత",
    rainfallDesc: "పంట కాలంలో లభించే మొత్తం వర్షపాతం మరియు నీరు",
    presets: "వాతావరణ ముందస్తు సెట్టింగ్‌లు",
    analyzeButton: "పంట అనుకూలతను విశ్లేషించండి",
    analyzing: "విశ్లేషణ జరుగుతోంది...",
    modeRecommend: "ఉత్తమ పంటను స్వయంచాలకంగా సిఫార్సు చేయండి",
    modeTarget: "నిర్దిష్ట పంటను పరీక్షించండి",
    targetCropSelect: "లక్ష్య పంట",
    customCropTag: "కస్టమ్ పంట",
    stronglyAcidic: "తీవ్ర ఆమ్లత్వం",
    slightlyAcidic: "కొద్దిగా ఆమ్లత్వం",
    neutralIdeal: "తటస్థం (అనుకూలమైనది)",
    moderatelyAlkaline: "మితమైన క్షారత్వం",
    stronglyAlkaline: "తీవ్ర క్షారత్వం",

    // Ready State & Weather
    readyHeading: "పంట విశ్లేషణకు సిద్ధంగా ఉంది",
    readySubheading: "ఎడమవైపు మీ నేల NPK, pH మరియు వాతావరణ పారామితులను సర్దుబాటు చేయండి లేదా ప్రత్యక్ష వాతావరణాన్ని సమకాలీకరించండి.",
    liveWeather: "ప్రత్యక్ష వాతావరణం",
    syncWeather: "ఫారమ్‌కు వర్తింపజేయండి",
    weatherSynced: "వాతావరణం అనుసంధానించబడింది",
    weatherLocation: "వాతావరణ కేంద్రం",
    searchLocationPlaceholder: "గ్రామం, పట్టణం లేదా స్థలాన్ని శోధించండి...",
    detectGPS: "ప్రస్తుత GPS స్థానాన్ని గుర్తించండి",
    detecting: "స్థానాన్ని గుర్తిస్తోంది...",
    currentLocationWeather: "ప్రస్తుత పొలం వాతావరణం",
    weatherFetchError: "ప్రత్యక్ష వాతావరణ సమాచారం పొందలేకపోయాము. ఇంటర్నెట్ సరిచూసుకోండి.",
    fieldCoordinates: "పొలం అక్షాంశ రేఖాంశాలు",
    totalFarmArea: "మొత్తం పొలం విస్తీర్ణం",

    // Recommendation Card
    recommendedCrop: "ఉత్తమ పంట సిఫార్సు",
    targetCropAssessment: "లక్ష్య పంట మూల్యాంకనం",
    suitabilityScore: "అనుకూలత స్కోర్",
    waterReq: "నీటి నిర్వహణ",
    growingSeason: "పంట కాలం & కోత సమయం",
    soilType: "అనువైన నేల రకం",
    category: "పంట వర్గం",
    topAlternatives: "ప్రత్యామ్నాయ పంటలు",
    fitAnalysis: "నేల మరియు వాతావరణ విశ్లేషణ",
    yieldPotential: "దిగుబడి సంభావ్యత",
    sowingMaturity: "విత్తే కాలం మరియు కోత కాలం",
    commercialPotential: "వాణిజ్య సంభావ్యత",
    nutrientDemandHeading: "ఎరువుల అవసరాలు మరియు నిర్వహణ",
    companionCropsHeading: "సిఫార్సు చేయబడిన అంతరపంటలు",
    harvest: "కోత కాలం",
    nitrogenRegime: "నత్రజని వినియోగ పద్ధతి",
    soilDrainage: "నేల మరియు నీటి పారుదల",

    // Suitability Levels
    matchExcellent: "అత్యుత్తమ వ్యవసాయ అనుకూలత",
    matchGood: "మంచి వాణిజ్య దిగుబడి అవకాశం",
    matchModerate: "మధ్యస్థ అనుకూలత / పరిమితులు",
    matchPoor: "తక్కువ అనుకూలత / నష్టభయం",

    // Parameter Fit Analysis
    fitAnalysisTitle: "నేల మరియు వాతావరణ అనుకూలత విశ్లేషణ",
    fitAnalysisSub: "మీ పొలం కొలమానాలను ఆదర్శ వ్యవసాయ స్థాయిలతో పోల్చడం:",
    optimalCount: "అనుకూలం",
    optimalRange: "అనుకూల పరిధి",
    belowTarget: "లక్ష్యం కంటే తక్కువ",
    aboveTarget: "లక్ష్యం కంటే ఎక్కువ",
    yourField: "మీ పొలం",
    idealCropTarget: "పంటకు ఆదర్శ స్థాయి",
    actionableAdvice: "వ్యవసాయ సలహా",

    // Soil Nutrient Radar
    radarChartTitle: "నేల NPK పోషకాల సమతుల్యత చార్ట్",
    radarChartSub: "మీ నేల పోషకాలను పంట అవసరాలతో పోల్చడం:",
    interactiveRadar: "ఇంటరాక్టివ్ చార్ట్",
    directValues: "నేరుగా విలువలు (mg/kg)",
    targetFitPct: "లక్ష్య అనుకూలత (%)",
    yourSoil: "మీ నేల",
    optimalTargetLabel: "ఆదర్శ లక్ష్యం",
    idealBand: "ఆదర్శ పరిధి",
    deficiency: "లోపం",
    surplus: "అధికం",
    balanced: "సమతుల్యం",
    optimal: "ఉత్తమం",
    currentSoilLabel: "ప్రస్తుత నేల",
    variance: "వ్యత్యాసం",
    soilRatioInsight: "నేల N:P:K నిష్పత్తి",
    targetRatioForCrop: "పంటకు ఆదర్శ నిష్పత్తి",
    dosePerHa: "హెక్టారుకు సిఫార్సు చేయబడిన మోతాదు",

    // Fertilizer Calculator
    fertilizerPlanTitle: "నేల పరీక్ష ఎరువుల మోతాదు కాలిక్యులేటర్",
    fertilizerPlanSub: "నేల పరీక్ష ఫలితాలు మరియు పంట అవసరాల మధ్య లోపాన్ని పూడ్చడానికి అవసరమైన ఖచ్చితమైన ఎరువుల పరిమాణాన్ని లెక్కిస్తుంది.",
    customDoseTag: "ఖచ్చితమైన మోతాదు",
    bagSizeLabel: "సంచి బరువు",
    farmPlotSize: "మీ పొలం విస్తీర్ణం",
    hectares: "హెక్టార్లు",
    acres: "ఎకరాలు",
    nutrientStrategy: "ఎరువుల యాజమాన్య పద్ధతి",
    strategyUreaDapMop: "యూరియా + DAP + పొటాష్ (MOP) పద్ధతి",
    strategyUreaSspMop: "యూరియా + సింగిల్ సూపర్ ఫాస్ఫేట్ (SSP) + పొటాష్",
    strategyOrganicFym: "పశువుల ఎరువు (FYM) + సేంద్రీయ పొటాష్ పద్ధతి",
    totalFieldGap: "మొత్తం పొలం పోషకాల లోపం",
    noDeficitDetected: "నేలలో పోషకాలు పుష్కలంగా ఉన్నాయి - లోపం లేదు",
    balancedSoilMessage: "మీ నేలలో ఈ పంటకు అవసరమైన పోషకాలు తగినంతగా ఉన్నాయి. తక్కువ మొత్తంలో సేంద్రీయ ఎరువులతో నేలను సంరక్షించండి.",
    totalKgNeeded: "మొత్తం అవసరమైన పరిమాణం",
    bagsCount: "సంచులు",
    basalDose: "ఆఖరి దుక్కిలో (విత్తే సమయంలో)",
    topDress1: "మొదటి దఫా ఎరువు",
    topDress2: "రెండవ దఫా ఎరువు",
    splitScheduleHeading: "ఎరువుల వినియోగ కాలపట్టిక",
    atSowingStage: "ఆఖరి దుక్కిలో (విత్తేటప్పుడు / నాటేటప్పుడు)",
    vegetativeStage: "పైరు ఏపుగా పెరిగే దశ / పిలకల దశ",
    panicleStage: "పూత మరియు కంకి దశ",
    splitBestPracticeTitle: "విడతలవారీగా ఎరువులు వాడే ఉత్తమ పద్ధతులు",
    splitBestPracticeDesc: "నత్రజనిని ఎప్పుడూ ఒకేసారి పూర్తిగా వేయకూడదు; పిలకల దశ మరియు పూత దశల్లో విభజించి వేయాలి. భాస్వరాన్ని విత్తే సమయంలోనే మొదట్లోనే వేయాలి.",

    // Pest & Disease Advisory
    pestAlertsTitle: "పురుగులు & తెగుళ్ల హెచ్చరిక సలహాదారు",
    pestAlertsSub: "మీ పొలం వాతావరణ పరిస్థితుల ఆధారంగా తెగుళ్లు వ్యాపించే ప్రమాదాన్ని అంచనా వేయడం:",
    highRiskThreats: "అధిక ప్రమాద హెచ్చరిక",
    elevatedRisk: "పెరిగిన ప్రమాదం",
    lowDiseasePressure: "తెగుళ్ల ముప్పు తక్కువ",
    criticalWeatherWindow: "తెగుళ్లు వేగంగా వ్యాపించే అనుకూల వాతావరణం",
    elevatedCautionTitle: "ముందస్తు జాగ్రత్త అవసరం",
    optimalDefenseTitle: "సురక్షిత వాతావరణ రక్షణ",
    filterAllThreats: "అన్ని ముప్పులు",
    filterHighAlert: "అధిక హెచ్చరిక",
    filterFungal: "శిలీంధ్రాలు & బాక్టీరియా",
    filterInsect: "కీటకాలు / పురుగులు",
    highRisk: "అధిక హెచ్చరిక",
    moderateRisk: "మధ్యస్థ జాగ్రత్త",
    lowRisk: "తక్కువ ముప్పు",
    triggerMatrix: "వ్యాధి వ్యాప్తి విశ్లేషణ పట్టిక",
    incubationDriver: "వ్యాధి వ్యాప్తికి కారణమయ్యే అంశాలు",
    tempTriggerWindow: "ప్రమాదకర ఉష్ణోగ్రత పరిధి",
    humidityTriggerWindow: "ప్రమాదకర తేమ పరిధి",
    whatToLookFor: "ఉదయం పొలంలో గమనించాల్సిన తెగులు లక్షణాలు",
    preventiveAgro: "నివారణ చర్యలు & పొలం పరిశుభ్రత",
    organicControl: "సేంద్రీయ / జీవ నియంత్రణ విధానాలు",
    chemicalControl: "రసాయన నివారణ చర్యలు (హాని స్థాయి దాటితేనే)",
    yourFieldCurrent: "మీ పొలం",

    // Interactive Soil Map
    soilMapTitle: "ఇంటరాక్టివ్ నేల మ్యాప్ & మండల విశ్లేషణ",
    soilMapSub: "పోషకాల మండలాలు, దిగుబడి హీట్‌మ్యాప్ మరియు నేల ఆరోగ్య ధోరణులను పరిశీలించండి.",
    fieldGeospatial: "పొలం భౌగోళిక విశ్లేషణ",
    nutrientZones: "పోషకాలు సమృద్ధిగా ఉన్న మండలాలు",
    yieldHeatmap: "దిగుబడి సంభావ్యత హీట్‌మ్యాప్",
    soilTrends: "నేల ఆరోగ్య ధోరణులు",
    activeMapLayer: "ప్రస్తుత మ్యాప్ లేయర్",
    layerNutrientDesc: "పొలాల్లో NPK పోషకాల సాంద్రత మరియు సారవంతత సూచిక",
    layerYieldDesc: "ఎంచుకున్న పంటకు అంచనా వేసిన దిగుబడి శాతం (%)",
    layerTrendsDesc: "5 సంవత్సరాల నేల సేంద్రీయ కర్బనం, pH మరియు కోత ప్రమాద మార్పులు",
    allNPK: "అన్ని NPK",
    clickParcelToInspect: "నేల నాణ్యతను పరీక్షించడానికి ఏదైనా భూభాగాన్ని క్లిక్ చేయండి",
    legendOptimal: "ఎక్కువ / ఉత్తమం",
    legendModerate: "మధ్యస్థం / సాధారణం",
    legendDeficit: "లోపం / క్షీణిస్తున్నది",
    inspectedParcel: "పరిశీలించిన భూభాగం",
    sqiScoreLabel: "నేల నాణ్యత సూచిక (SQI)",
    applyPlotSoil: "ఈ నేల విలువలను ఫారమ్‌కు వర్తింపజేయండి",
    recommendedForSoil: "ఈ నేలకు సరిపడే సిఫార్సు పంటలు",
    sqiFit: "SQI అనుకూలత",
    planThisCrop: "ఈ పంటను ప్రణాళిక చేయండి",
    soilQualityFitForCrop: "పంటకు నేల నాణ్యత అనుకూలత",
    soilCompatibility: "నేల అనుకూలత",
    targetPhReq: "పంటకు కావలసిన నేల pH",
    targetNpkDemand: "పంటకు కావలసిన NPK అవసరం",
    remediationRoadmap: "నేల నాణ్యత మెరుగుదల చర్యలు",
    soilQualityIndex: "నేల నాణ్యత సూచిక",
    improving: "మెరుగుపడుతోంది",
    stable: "స్థిరంగా ఉంది",
    degrading: "తగ్గుతోంది",
    highFertility: "అధిక సారవంతం",
    mediumFertility: "మధ్యస్థ సారవంతం",
    lowFertility: "తక్కువ సారవంతం",
    depletedZone: "సారం కోల్పోయిన నేల",

    // Crop Catalog & Custom Crop Modals
    catalogTitle: "పంటల సూచిక & గ్రంథాలయం",
    catalogSub: "పంటల వివరాలను తెలుసుకోండి, కొత్త ప్రాంతీయ పంటలను జోడించండి",
    searchCropsPlaceholder: "పంట లేదా రకాన్ని శోధించండి...",
    allCategories: "అన్ని వర్గాలు",
    idealSoil: "అనువైన నేల",
    water: "నీటి అవసరం",
    selectForEvaluation: "మూల్యాంకనం కోసం ఎంచుకోండి",
    removeCustomCropConfirm: "ఈ పంటను మీ కస్టమ్ జాబితా నుండి తొలగించాలనుకుంటున్నారా?",
    addCropTitle: "కొత్త పంట ప్రొఫైల్‌ను జోడించండి",
    addCropSub: "మీ ప్రాంతీయ పంట అవసరాలను జోడించి మీ వ్యవసాయ జాబితాను మెరుగుపరచండి.",
    cropNameLabel: "పంట పేరు",
    cropCategoryLabel: "పంట వర్గం",
    cropIconLabel: "పంట చిహ్నం / ఎమోజి",
    climateParameters: "వాతావరణ & పర్యావరణ పరిధులు",
    soilParameters: "నేల & పోషక పరిధులు (NPK & pH)",
    agronomicGuidance: "వ్యవసాయ సలహాలు & దిగుబడి",
    sowingSeasonLabel: "విత్తే కాలం",
    harvestTimeLabel: "పంట కాల వ్యవధి (రోజులు)",
    expectedYieldLabel: "ఆశించే దిగుబడి",
    companionCropsLabel: "అంతర పంటలు",
    cropDescriptionLabel: "వ్యవసాయ వివరణ & గమనికలు",
    fillRequiredFields: "దయచేసి పంట పేరు మరియు అవసరమైన విలువలను సరిగ్గా పూరించండి.",
    saveCropButton: "పంట వివరాలను సేవ్ చేయి",

    // Agronomic Principles & Footer
    principlesHeading: "పొల వ్యవసాయ శాస్త్రం & నేల నిర్వహణ సూత్రాలు",
    principleNpkTitle: "సమతుల్య నేల సారాంశం (NPK)",
    principleNpkDesc: "నత్రజని (N) ఏపుగా పెరిగే ఆకుల అభివృద్ధికి తోడ్పడుతుంది; భాస్వరం (P) బలమైన వేర్లు మరియు పూతకు దోహదపడుతుంది; పొటాష్ (K) నీటి సమతుల్యత మరియు తెగుళ్ళ నిరోధక శక్తిని పెంచుతుంది.",
    principlePhTitle: "నేల pH & పోషకాల శోషణ సామర్థ్యం",
    principlePhDesc: "చాలా పంటలు 6.0 నుండి 7.2 pH మధ్య ఏపుగా పెరుగుతాయి. ఆమ్ల నేలల్లో (<5.8) సున్నం వేయండి; క్షార నేలల్లో (>7.5) జిప్సం లేదా పశువుల ఎరువును కలపండి.",
    principleClimateTitle: "ప్రత్యక్ష వాతావరణ అనుసంధానం",
    principleClimateDesc: "మీ పొలాన్ని ప్రత్యక్ష వాతావరణ డేటాతో అనుసంధానించండి. ఉష్ణోగ్రత మరియు వర్షపాతానికి అనుగుణంగా విత్తడం ద్వారా మొలక శాతం పెరిగి పంట ఒత్తిడి తగ్గుతుంది.",
    footerTagline: "వ్యవసాయ అనుకూలత & ప్రత్యక్ష వాతావరణ సమగ్రత",
    browseCatalogCount: "పంటల సూచికను చూడండి"
  },

  kn,
  ml,
  mr,
  bn,
  gu,
  pa
};

export type TranslationKey = keyof typeof translations.en;

/**
 * Localized Crop Names
 */
/**
 * Localized Crop Names
 */
export const CROP_LOCALIZED_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  "Rice": {
    en: "Rice",
    hi: "चावल / धान (Rice)",
    ta: "அரிசி / நெல் (Rice)",
    te: "వరి / బియ్యం (Rice)",
    kn: "ಭತ್ತ / ಅಕ್ಕಿ (Rice)",
    ml: "നെല്ല് / അരി (Rice)",
    mr: "भात / तांदूळ (Rice)",
    bn: "ধান / চাল (Rice)",
    gu: "ડાંગર / ચોખા (Rice)",
    pa: "ਝੋਨਾ / ਚਾਵਲ (Rice)"
  },
  "Maize": {
    en: "Maize (Corn)",
    hi: "मक्का (Corn)",
    ta: "மக்காச்சோளம் (Maize)",
    te: "మొక్కజొన్న (Maize)",
    kn: "ಮುಸುಕಿನ ಜೋಳ (Maize)",
    ml: "മക്കച്ചോളം (Maize)",
    mr: "मका (Maize)",
    bn: "ভুট্টা (Maize)",
    gu: "મકાઈ (Maize)",
    pa: "ਮੱਕੀ (Maize)"
  },
  "Chickpea": {
    en: "Chickpea (Gram)",
    hi: "चना (Chickpea)",
    ta: "கொண்டைக்கடலை (Chickpea)",
    te: "శనగలు (Chickpea)",
    kn: "ಕಡಲೆ (Chickpea)",
    ml: "കടല (Chickpea)",
    mr: "हरभरा / चणा (Chickpea)",
    bn: "ছোলা (Chickpea)",
    gu: "ચણા (Chickpea)",
    pa: "ਛੋਲੇ (Chickpea)"
  },
  "Kidneybeans": {
    en: "Kidney Beans (Rajma)",
    hi: "राजमा (Kidney Beans)",
    ta: "ராஜ்மா (Kidney Beans)",
    te: "రాజ్మా (Kidney Beans)",
    kn: "ರಾಜ್ಮಾ (Kidney Beans)",
    ml: "രാജ്മ (Kidney Beans)",
    mr: "राजमा (Kidney Beans)",
    bn: "রাজমা (Kidney Beans)",
    gu: "રાજમા (Kidney Beans)",
    pa: "ਰਾਜਮਾਂਹ (Kidney Beans)"
  },
  "Pigeonpeas": {
    en: "Pigeon Peas (Tur)",
    hi: "अरहर / तुअर (Pigeon Peas)",
    ta: "துவரை (Pigeon Peas)",
    te: "కందులు (Pigeon Peas)",
    kn: "ತೊಗರಿ (Pigeon Peas)",
    ml: "തുവര (Pigeon Peas)",
    mr: "तूर (Pigeon Peas)",
    bn: "অড়হর (Pigeon Peas)",
    gu: "તુવેર (Pigeon Peas)",
    pa: "ਤੂਰ / ਅਰਹਰ (Pigeon Peas)"
  },
  "Mothbeans": {
    en: "Moth Beans",
    hi: "मोठ दाल (Moth Beans)",
    ta: "நரிப்பயறு (Moth Beans)",
    te: "కుంకుమ పెసలు (Moth Beans)",
    kn: "ಮಡಿಕೆ ಕಾಳು (Moth Beans)",
    ml: "മോത്ത് പയർ (Moth Beans)",
    mr: "मटकी (Moth Beans)",
    bn: "মট কলাই (Moth Beans)",
    gu: "મઠ (Moth Beans)",
    pa: "ਮੋਠ (Moth Beans)"
  },
  "Mungbean": {
    en: "Mung Bean (Green Gram)",
    hi: "मूंग (Green Gram)",
    ta: "பாசிப்பயறு (Mung Bean)",
    te: "పెసలు (Mung Bean)",
    kn: "ಹೆಸರು ಕಾಳು (Mung Bean)",
    ml: "ചെറുപയർ (Mung Bean)",
    mr: "मूग (Mung Bean)",
    bn: "মুগ ডাল (Mung Bean)",
    gu: "મગ (Mung Bean)",
    pa: "ਮੂੰਗੀ (Mung Bean)"
  },
  "Blackgram": {
    en: "Black Gram (Urad)",
    hi: "उड़द (Black Gram)",
    ta: "உளுந்து (Black Gram)",
    te: "మినుములు (Black Gram)",
    kn: "ಉದ್ದು (Black Gram)",
    ml: "ഉഴുന്ന് (Black Gram)",
    mr: "उडीद (Black Gram)",
    bn: "মাষকলাই / বিউলি (Black Gram)",
    gu: "અડદ (Black Gram)",
    pa: "ਮਾਂਹ (Black Gram)"
  },
  "Lentil": {
    en: "Lentil (Masoor)",
    hi: "मसूर (Lentil)",
    ta: "மசூர் பருப்பு (Lentil)",
    te: "మైసూర్ పప్పు (Lentil)",
    kn: "ಮಸೂರ ಬೇಳೆ (Lentil)",
    ml: "മസൂർ പരിപ്പ് (Lentil)",
    mr: "मसूर (Lentil)",
    bn: "মসুর ডাল (Lentil)",
    gu: "મસૂર (Lentil)",
    pa: "ਮਸਰ (Lentil)"
  },
  "Pomegranate": {
    en: "Pomegranate",
    hi: "अनार (Pomegranate)",
    ta: "மாதுளை (Pomegranate)",
    te: "దానిమ్మ (Pomegranate)",
    kn: "ದಾಳಿಂಬೆ (Pomegranate)",
    ml: "മാതളനാരങ്ങ (Pomegranate)",
    mr: "डाळिंब (Pomegranate)",
    bn: "বেদানা / ডালিম (Pomegranate)",
    gu: "દાડમ (Pomegranate)",
    pa: "ਅਨਾਰ (Pomegranate)"
  },
  "Banana": {
    en: "Banana",
    hi: "केला (Banana)",
    ta: "வாழை (Banana)",
    te: "అరటి (Banana)",
    kn: "ಬಾಳೆಹಣ್ಣು (Banana)",
    ml: "വാഴപ്പഴം (Banana)",
    mr: "केळी (Banana)",
    bn: "কলা (Banana)",
    gu: "કેળાં (Banana)",
    pa: "ਕੇਲਾ (Banana)"
  },
  "Mango": {
    en: "Mango",
    hi: "आम (Mango)",
    ta: "மாம்பழம் (Mango)",
    te: "మామిడి (Mango)",
    kn: "ಮಾವಿನಹಣ್ಣು (Mango)",
    ml: "മാമ്പഴം (Mango)",
    mr: "आंबा (Mango)",
    bn: "আম (Mango)",
    gu: "કેરી (Mango)",
    pa: "ਅੰਬ (Mango)"
  },
  "Grapes": {
    en: "Grapes",
    hi: "अंगूर (Grapes)",
    ta: "திராட்சை (Grapes)",
    te: "ద్రాక్ష (Grapes)",
    kn: "ದ್ರಾಕ್ಷಿ (Grapes)",
    ml: "മുന്തിരി (Grapes)",
    mr: "द्राक्षे (Grapes)",
    bn: "আঙুর (Grapes)",
    gu: "દ્રાક્ષ (Grapes)",
    pa: "ਅੰਗੂਰ (Grapes)"
  },
  "Watermelon": {
    en: "Watermelon",
    hi: "तरबूज (Watermelon)",
    ta: "தர்பூசணி (Watermelon)",
    te: "పుచ్చకాయ (Watermelon)",
    kn: "ಕಲ್ಲಂಗಡಿ (Watermelon)",
    ml: "തണ്ണിമത്തൻ (Watermelon)",
    mr: "कलिंगड (Watermelon)",
    bn: "তরমুজ (Watermelon)",
    gu: "તરબૂચ (Watermelon)",
    pa: "ਤਰਬੂਜ਼ (Watermelon)"
  },
  "Muskmelon": {
    en: "Muskmelon",
    hi: "खरबूजा (Muskmelon)",
    ta: "முலாம் பழம் (Muskmelon)",
    te: "ఖర్బూజ (Muskmelon)",
    kn: "ಖರಬೂಜ (Muskmelon)",
    ml: "തൈര്ക്കുമ്പളം (Muskmelon)",
    mr: "खरबूज (Muskmelon)",
    bn: "খরমুজা (Muskmelon)",
    gu: "ટેટી (Muskmelon)",
    pa: "ਖ਼ਰਬੂਜ਼ਾ (Muskmelon)"
  },
  "Apple": {
    en: "Apple",
    hi: "सेब (Apple)",
    ta: "ஆப்பிள் (Apple)",
    te: "ఆపిల్ (Apple)",
    kn: "ಸೇಬು (Apple)",
    ml: "ആപ്പിൾ (Apple)",
    mr: "सफरचंद (Apple)",
    bn: "আপেল (Apple)",
    gu: "સફરજન (Apple)",
    pa: "ਸੇਬ (Apple)"
  },
  "Orange": {
    en: "Orange",
    hi: "संतरा (Orange)",
    ta: "ஆரஞ்சு (Orange)",
    te: "నారింజ (Orange)",
    kn: "ಕಿತ್ತಳೆ (Orange)",
    ml: "ഓറഞ്ച് (Orange)",
    mr: "संत्री (Orange)",
    bn: "কমলালেবু (Orange)",
    gu: "સંતરા (Orange)",
    pa: "ਸੰਤਰਾ (Orange)"
  },
  "Papaya": {
    en: "Papaya",
    hi: "पपीता (Papaya)",
    ta: "பப்பாளி (Papaya)",
    te: "బొప్పాయి (Papaya)",
    kn: "ಪರಂಗಿ / ಪಪ್ಪಾಯ (Papaya)",
    ml: "പപ്പായ (Papaya)",
    mr: "पपई (Papaya)",
    bn: "পেঁপে (Papaya)",
    gu: "પપૈયું (Papaya)",
    pa: "ਪਪੀਤਾ (Papaya)"
  },
  "Coconut": {
    en: "Coconut",
    hi: "नारियल (Coconut)",
    ta: "தென்னை (Coconut)",
    te: "కొబ్బరి (Coconut)",
    kn: "ತೆಂಗು (Coconut)",
    ml: "തേങ്ങ (Coconut)",
    mr: "नारळ (Coconut)",
    bn: "নারকেল (Coconut)",
    gu: "નાળિયેર (Coconut)",
    pa: "ਨਾਰੀਅਲ (Coconut)"
  },
  "Cotton": {
    en: "Cotton",
    hi: "कपास (Cotton)",
    ta: "பருத்தி (Cotton)",
    te: "పత్తి (Cotton)",
    kn: "ಹತ್ತಿ (Cotton)",
    ml: "പരുത്തി (Cotton)",
    mr: "कापूस (Cotton)",
    bn: "তুলা (Cotton)",
    gu: "કપાસ (Cotton)",
    pa: "ਕਪਾਹ (Cotton)"
  },
  "Jute": {
    en: "Jute",
    hi: "पटसन / जूट (Jute)",
    ta: "சணல் (Jute)",
    te: "జనపనార (Jute)",
    kn: "ಸೆಣಬು (Jute)",
    ml: "ചണം (Jute)",
    mr: "ताग (Jute)",
    bn: "পাট (Jute)",
    gu: "શણ (Jute)",
    pa: "ਸਣ (Jute)"
  },
  "Coffee": {
    en: "Coffee",
    hi: "कॉफी (Coffee)",
    ta: "காபி (Coffee)",
    te: "కాఫీ (Coffee)",
    kn: "ಕಾಫಿ (Coffee)",
    ml: "കാപ്പി (Coffee)",
    mr: "कॉफी (Coffee)",
    bn: "কফি (Coffee)",
    gu: "કોફી (Coffee)",
    pa: "ਕੌਫ਼ੀ (Coffee)"
  }
};

/**
 * Localized Crop Categories
 */
export const CATEGORY_LOCALIZED_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  "Cereal & Staple Grain": {
    en: "Cereal & Staple Grain",
    hi: "अनाज एवं मुख्य खाद्यान्न",
    ta: "தானியம் & பிரதான உணவு",
    te: "తృణధాన్యాలు & ప్రధాన ఆహారం",
    kn: "ಧಾನ್ಯ ಮತ್ತು ಪ್ರಮುಖ ಆಹಾರ",
    ml: "ധാന്യങ്ങളും പ്രധാന വിളകളും",
    mr: "तृणधान्य व प्रमुख अन्न",
    bn: "দানাশস্য ও প্রধান খাদ্য",
    gu: "ધાન્ય અને મુખ્ય અન્ન",
    pa: "ਅਨਾਜ ਅਤੇ ਮੁੱਖ ਖੁਰਾਕ"
  },
  "Cereal & Forage Crop": {
    en: "Cereal & Forage Crop",
    hi: "अनाज एवं चारा फसल",
    ta: "தானியம் & தீவனப் பயிர்",
    te: "ధాన్యం & పశుగ్రాసం",
    kn: "ಧಾನ್ಯ ಮತ್ತು ಮೇವಿನ ಬೆಳೆ",
    ml: "ധാന്യങ്ങളും തീറ്റപ്പുല്ല് വിളകളും",
    mr: "तृणधान्य व चारा पीक",
    bn: "দানাশস্য ও পশুখাদ্য ফসল",
    gu: "ધાન્ય અને ઘાસચારો પાક",
    pa: "ਅਨਾਜ ਅਤੇ ਚਾਰਾ ਫ਼ਸਲ"
  },
  "Pulse & Grain Legume": {
    en: "Pulse & Grain Legume",
    hi: "दलहन एवं दालें",
    ta: "பருப்பு & பயறு வகை",
    te: "పప్పుధాన్యాలు",
    kn: "ದ್ವಿದಳ ಧಾನ್ಯ ಮತ್ತು ಕಾಳುಗಳು",
    ml: "പയറുവർഗ്ഗങ്ങളും ധാന്യ പയറുകളും",
    mr: "कठोळ व डाळी",
    bn: "ডাল ও শিমজাতীয় ফসল",
    gu: "કઠોળ અને દાળ",
    pa: "ਦਾਲਾਂ ਅਤੇ ਫ਼ਲੀਦਾਰ ਫ਼ਸਲਾਂ"
  },
  "Fruit & Horticultural Crop": {
    en: "Fruit & Horticultural Crop",
    hi: "फल एवं बागवानी फसल",
    ta: "பழம் & தோட்டக்கலை பயிர்",
    te: "పండ్లు & ఉద్యానవన పంట",
    kn: "ಹಣ್ಣು ಮತ್ತು ತೋಟಗಾರಿಕಾ ಬೆಳೆ",
    ml: "പഴങ്ങളും തോട്ടവിളകളും",
    mr: "फळे व फलोत्पादन पीक",
    bn: "ফল ও উদ্যানজাত ফসল",
    gu: "ફળ અને બાગાયતી પાક",
    pa: "ਫ਼ਲ ਅਤੇ ਬਾਗ਼ਬਾਨੀ ਫ਼ਸਲ"
  },
  "Commercial Cash Crop": {
    en: "Commercial Cash Crop",
    hi: "व्यावसायिक नकदी फसल",
    ta: "வணிகப் பணப்பயிர்",
    te: "వాణిజ్య నగదు పంట",
    kn: "ವಾಣಿಜ್ಯ ನಗದು ಬೆಳೆ",
    ml: "വാണിജ്യ നാണ്യവിള",
    mr: "व्यावसायिक नगदी पीक",
    bn: "বাণিজ্যিক অর্থকরী ফসল",
    gu: "રોકડિયો / વ્યાપારી પાક",
    pa: "ਵਪਾਰਕ ਨਕਦੀ ਫ਼ਸਲ"
  },
  "Plantation & Beverage Crop": {
    en: "Plantation & Beverage Crop",
    hi: "बागान एवं पेय फसल",
    ta: "தோட்டப்பயிர் & பானப்பயிர்",
    te: "తోటపంట & పానీయాల పంట",
    kn: "ತೋಟದ ಮತ್ತು ಪಾನೀಯ ಬೆಳೆ",
    ml: "തോട്ടവിളകളും പാനീയ വിളകളും",
    mr: "मळा व पेय पीक",
    bn: "বাগান ও পানীয় ফসল",
    gu: "બાગાયતી અને પીણાં પાક",
    pa: "ਬਾਗ਼ਬਾਨੀ ਅਤੇ ਪੀਣਯੋਗ ਫ਼ਸਲ"
  }
};

/**
 * Localized Climate Presets
 */
export const PRESET_LOCALIZED: Record<string, Record<SupportedLanguage, { title: string; subtitle: string }>> = {
  'monsoon-paddy': {
    en: {
      title: 'Monsoon / Wet Basin',
      subtitle: 'High rain (240mm), humid (82%), rich alluvial soil'
    },
    hi: {
      title: 'मानसून / आर्द्र तराई बेसिन',
      subtitle: 'भारी वर्षा (240mm), उच्च आर्द्रता (82%), समृद्ध जलोढ़ मिट्टी'
    },
    ta: {
      title: 'பருவமழை / ஆற்றுப்படுகை நிலம்',
      subtitle: 'அதிக மழை (240 மி.மீ), ஈரப்பதம் (82%), வளமான வண்டல் மண்'
    },
    te: {
      title: 'వర్షాకాలం / డెల్టా పరివాహక ప్రాంతం',
      subtitle: 'ఎక్కువ వర్షం (240mm), తేమ (82%), సారవంతమైన ఒండ్రు నేల'
    },
    kn: {
      title: 'ಮುಂಗಾರು ಮಳೆ / ಜಲಾನಯನ ಪ್ರದೇಶ',
      subtitle: 'ಹೆಚ್ಚು ಮಳೆ (240mm), ತೇವಾಂಶ (82%), ಫಲವತ್ತಾದ ಮೆಕ್ಕಲು ಮಣ್ಣು'
    },
    ml: {
      title: 'കാലവർഷം / തണ്ണീർത്തട പ്രദേശം',
      subtitle: 'കൂടിയ മഴ (240mm), ഉയർന്ന ഈർപ്പം (82%), എക്കൽ മണ്ണ്'
    },
    mr: {
      title: 'पावसाळा / पाणथळ खोरे',
      subtitle: 'मुसळधार पाऊस (240mm), दमट हवामान (82%), गाळाची माती'
    },
    bn: {
      title: 'বর্ষাকাল / প্লাবন অববাহিকা',
      subtitle: 'ভারী বৃষ্টি (240mm), আর্দ্র (82%), উর্বর পলিমাটি'
    },
    gu: {
      title: 'ચોમાસું / જળપ્લાવિત તટપ્રદેશ',
      subtitle: 'ભારે વરસાદ (240mm), ભેજ (82%), ફળદ્રુપ કાંપની જમીન'
    },
    pa: {
      title: 'ਮਾਨਸੂਨ / ਨਮੀ ਵਾਲਾ ਮੈਦਾਨ',
      subtitle: 'ਭਾਰੀ ਮੀਂਹ (240mm), ਨਮੀ (82%), ਉਪਜਾਊ ਜਲੋੜ ਮਿੱਟੀ'
    }
  },
  'arid-dryland': {
    en: {
      title: 'Arid / Dryland',
      subtitle: 'Dry atmosphere (17% hum), alkaline soil, mild winter'
    },
    hi: {
      title: 'शुष्क / बंजर शुष्कभूमि',
      subtitle: 'शुष्क वायु (17% आर्द्रता), क्षारीय मिट्टी, हल्की सर्दियां'
    },
    ta: {
      title: 'வறண்ட நிலம் / மானாவாரி',
      subtitle: 'குறைந்த ஈரப்பதம் (17%), கார மண், மிதமான குளிர்'
    },
    te: {
      title: 'శుష్క / మెట్ట ప్రాంతం',
      subtitle: 'పొడి వాతావరణం (17% తేమ), క్షార నేల, తేలికపాటి చలి'
    },
    kn: {
      title: 'ಶುಷ್ಕ / ಒಣಭೂಮಿ ಪ್ರದೇಶ',
      subtitle: 'ಒಣ ಹವೆ (17% ತೇವಾಂಶ), ಕ್ಷಾರೀಯ ಮಣ್ಣು, ಸಾಧಾರಣ ಚಳಿ'
    },
    ml: {
      title: 'വരണ്ട പ്രദേശം / മെട്ടഭൂമി',
      subtitle: 'കുറഞ്ഞ ഈർപ്പം (17%), ക്ഷാര മണ്ണ്, മിതമായ ശീതകാലം'
    },
    mr: {
      title: 'कोरडवाहू / दुष्काळी भाग',
      subtitle: 'कोरडे हवामान (17% आर्द्रता), विम्लधर्मी माती, सौम्य हिवाळा'
    },
    bn: {
      title: 'শুষ্ক / অনুর্বর শুষ্কভূমি',
      subtitle: 'শুষ্ক বাতাস (17% আর্দ্রতা), ক্ষারীয় মাটি, হালকা শীত'
    },
    gu: {
      title: 'સૂકી / અર્ધ-શુષ્ક જમીન',
      subtitle: 'સૂકું વાતાવરણ (17% ભેજ), આલ્કલાઇન જમીન, હળવો શિયાળો'
    },
    pa: {
      title: 'ਖੁਸ਼ਕ / ਬਰਾਨੀ ਇਲਾਕਾ',
      subtitle: 'ਖੁਸ਼ਕ ਹਵਾ (17% ਨਮੀ), ਖਾਰੀ ਮਿੱਟੀ, ਹਲਕੀ ਸਰਦੀ'
    }
  },
  'temperate-orchard': {
    en: {
      title: 'Hill Orchard / Temperate',
      subtitle: 'High P (135) & K (200), cool air, acidic loam'
    },
    hi: {
      title: 'पहाड़ी बाग / शीतोष्ण क्षेत्र',
      subtitle: 'उच्च P (135) एवं K (200), ठंडी हवा, अम्लीय दोमट मिट्टी'
    },
    ta: {
      title: 'மலைத் தோட்டம் / மிதவெப்ப மண்டலம்',
      subtitle: 'அதிக P (135) & K (200), குளிர்ந்த காற்று, அமில வண்டல் மண்'
    },
    te: {
      title: 'కొండ ప్రాంత తోటలు / సమశీతోష్ణ',
      subtitle: 'ఎక్కువ P (135) & K (200), చల్లని గాలి, ఆమ్ల నేల'
    },
    kn: {
      title: 'ಬೆಟ್ಟಗುಡ್ಡದ ತೋಟ / ಸಮಶೀತೋಷ್ಣ',
      subtitle: 'ಹೆಚ್ಚು P (135) ಮತ್ತು K (200), ತಂಪಾದ ಹವೆ, ಆಮ್ಲೀಯ ಮಣ್ಣು'
    },
    ml: {
      title: 'മലയോര തോട്ടം / സമശീതോഷ്ണം',
      subtitle: 'ഉയർന്ന P (135) & K (200), തണുത്ത കാറ്റ്, അമ്ല മണ്ണ്'
    },
    mr: {
      title: 'पर्वतीय फळबाग / समशीतोष्ण',
      subtitle: 'जास्त P (135) व K (200), थंड हवा, आम्लयुक्त माती'
    },
    bn: {
      title: 'পাহাড়ি বাগান / নাতিশীতোষ্ণ',
      subtitle: 'উচ্চ P (135) ও K (200), ঠাণ্ডা বাতাস, অম্লীয় দোআঁশ মাটি'
    },
    gu: {
      title: 'પહાડી બગીચો / સમશીતોષ્ણ',
      subtitle: 'વધુ P (135) અને K (200), ઠંડી હવા, એસિડિક ગોરાડુ જમીન'
    },
    pa: {
      title: 'ਪਹਾੜੀ ਬਾਗ਼ / ਸ਼ਾਂਤ ਮੌਸਮ',
      subtitle: 'ਵੱਧ P (135) ਅਤੇ K (200), ਠੰਢੀ ਹਵਾ, ਤੇਜ਼ਾਬੀ ਦੋਮਟ ਮਿੱਟੀ'
    }
  },
  'tropical-coastal': {
    en: {
      title: 'Tropical Coastal',
      subtitle: 'Sandy soil, ocean humidity (95%), warm breezes'
    },
    hi: {
      title: 'उष्णकटिबंधीय तटीय क्षेत्र',
      subtitle: 'रेतीली मिट्टी, समुद्री आर्द्रता (95%), गर्म समुद्री हवाएं'
    },
    ta: {
      title: 'வெப்பமண்டல கடற்கரை',
      subtitle: 'மணற்பாங்கான மண், கடல் ஈரப்பதம் (95%), வெப்ப காற்று'
    },
    te: {
      title: 'తీరప్రాంత మండలం',
      subtitle: 'ఇసుక నేల, సముద్రపు తేమ (95%), వెచ్చని గాలులు'
    },
    kn: {
      title: 'ಕರಾವಳಿ / ಉಷ್ಣವಲಯ ಕಡಲತೀರ',
      subtitle: 'ಮರಳು ಮಣ್ಣು, ಸಮುದ್ರದ ತೇವಾಂಶ (95%), ಬೆಚ್ಚನೆಯ ಗಾಳಿ'
    },
    ml: {
      title: 'തീരദേശ കാലാവസ്ഥ',
      subtitle: 'മണൽ മണ്ണ്, ഉയർന്ന സമുദ്ര ഈർപ്പം (95%), ചൂടുള്ള കാറ്റ്'
    },
    mr: {
      title: 'उष्णकटिबंधीय किनारी भाग',
      subtitle: 'रेताड माती, सागरी आर्द्रता (95%), उबदार वारे'
    },
    bn: {
      title: 'গ্রীষ্মমণ্ডলীয় উপকূলীয় অঞ্চল',
      subtitle: 'বেলেমাটি, সামুদ্রিক আর্দ্রতা (95%), উষ্ণ বাতাস'
    },
    gu: {
      title: 'દરિયાકાંઠાનો વિસ્તાર',
      subtitle: 'રેતાળ જમીન, દરિયાઈ ભેજ (95%), હૂંફાળો પવન'
    },
    pa: {
      title: 'ਤੱਟਵਰਤੀ / ਗਰਮ ਇਲਾਕਾ',
      subtitle: 'ਰੇਤਲੀ ਮਿੱਟੀ, ਸਮੁੰਦਰੀ ਨਮੀ (95%), ਨਿੱਘੀ ਹਵਾ'
    }
  },
  'cash-crop-cotton': {
    en: {
      title: 'Warm Summer Cash Crop',
      subtitle: 'High N (120), black clay soil, warm sun (25°C)'
    },
    hi: {
      title: 'ग्रीष्मकालीन नकदी फसल',
      subtitle: 'उच्च N (120), काली चिकनी मिट्टी, तेज धूप (25°C)'
    },
    ta: {
      title: 'கோடைகால பணப்பயிர்',
      subtitle: 'அதிக தழைச்சத்து (120), கரிசல் மண், வெப்ப வெயில் (25°C)'
    },
    te: {
      title: 'వేసవి నగదు పంట',
      subtitle: 'ఎక్కువ N (120), నల్లరేగడి నేల, వెచ్చని ఎండ (25°C)'
    },
    kn: {
      title: 'ಬೇಸಿಗೆಯ ವಾಣಿಜ್ಯ ಬೆಳೆ',
      subtitle: 'ಹೆಚ್ಚು ಸಾರಜನಕ N (120), ಕಪ್ಪು ಜೇಡಿಮಣ್ಣು, ಬಿಸಿಲು (25°C)'
    },
    ml: {
      title: 'വേനൽക്കാല നാണ്യവിള',
      subtitle: 'ഉയർന്ന നൈട്രജൻ N (120), കറുത്ത കളിമണ്ണ്, സൂര്യപ്രകാശം (25°C)'
    },
    mr: {
      title: 'उन्हाळी नगदी पीक',
      subtitle: 'जास्त नत्र N (120), काळी चिकण माती, ऊन (25°C)'
    },
    bn: {
      title: 'গ্রীষ্মকালীন অর্থকরী ফসল',
      subtitle: 'উচ্চ নাইট্রোজেন N (120), কালো এঁটেল মাটি, রোদ (25°C)'
    },
    gu: {
      title: 'ઉનાળુ રોકડિયો પાક',
      subtitle: 'વધુ નાઇટ્રોજન N (120), કાળી માટી, સારો તડકો (25°C)'
    },
    pa: {
      title: 'ਗਰਮੀਆਂ ਦੀ ਨਕਦੀ ਫ਼ਸਲ',
      subtitle: 'ਵੱਧ ਨਾਈਟ੍ਰੋਜਨ N (120), ਕਾਲੀ ਚੀਕਣੀ ਮਿੱਟੀ, ਧੁੱਪ (25°C)'
    }
  },
  'sweet-vine-melon': {
    en: {
      title: 'Dry Summer Vine / Melon',
      subtitle: 'Low rain (25mm), warm heat (28°C), sandy beds'
    },
    hi: {
      title: 'शुष्क ग्रीष्मकालीन बेल / तरबूज',
      subtitle: 'कम वर्षा (25mm), तेज गर्मी (28°C), रेतीली क्यारियां'
    },
    ta: {
      title: 'கோடை கொடி / பழப்பயிர்',
      subtitle: 'குறைந்த மழை (25 மி.மீ), அதிக வெப்பம் (28°C), மணல் படுகை'
    },
    te: {
      title: 'వేసవి తీగ పంటలు / పుచ్చకాయ',
      subtitle: 'తక్కువ వర్షం (25mm), ఎక్కువ వేడి (28°C), ఇసుక నేలలు'
    },
    kn: {
      title: 'ಬೇಸಿಗೆಯ ಬಳ್ಳಿ / ಕಲ್ಲಂಗಡಿ ಬೆಳೆ',
      subtitle: 'ಕಡಿಮೆ ಮಳೆ (25mm), ತಾಪಮಾನ (28°C), ಮರಳು ಮಣ್ಣು'
    },
    ml: {
      title: 'വേനൽക്കാല വള്ളിച്ചെടികൾ / തണ്ണിമത്തൻ',
      subtitle: 'കുറഞ്ഞ മഴ (25mm), ചൂട് (28°C), മണൽത്തട്ടുകൾ'
    },
    mr: {
      title: 'उन्हाळी वेलवर्गीय / कलिंगड',
      subtitle: 'कमी पाऊस (25mm), उष्ण हवा (28°C), रेताड वाफे'
    },
    bn: {
      title: 'গ্রীষ্মকালীন লতানো / তরমুজ',
      subtitle: 'কম বৃষ্টি (25mm), গরম আবহাওয়া (28°C), বেলে জমি'
    },
    gu: {
      title: 'ઉનાળુ વેલાવાળા / તરબૂચ',
      subtitle: 'ઓછો વરસાદ (25mm), ગરમી (28°C), રેતાળ કયારીઓ'
    },
    pa: {
      title: 'ਗਰਮੀਆਂ ਦੀਆਂ ਵੇਲਾਂ / ਤਰਬੂਜ਼',
      subtitle: 'ਘੱਟ ਮੀਂਹ (25mm), ਗਰਮ ਮੌਸਮ (28°C), ਰੇਤਲੇ ਕਿਆਰੇ'
    }
  }
};

export function getLocalizedCropName(name: string, lang: SupportedLanguage): string {
  if (CROP_LOCALIZED_NAMES[name] && CROP_LOCALIZED_NAMES[name][lang]) {
    return CROP_LOCALIZED_NAMES[name][lang];
  }
  // If crop name contains parens e.g. "Maize (Corn)"
  const cleanName = name.split(' (')[0];
  if (CROP_LOCALIZED_NAMES[cleanName] && CROP_LOCALIZED_NAMES[cleanName][lang]) {
    return CROP_LOCALIZED_NAMES[cleanName][lang];
  }
  return name;
}

export function getLocalizedCategory(category: string, lang: SupportedLanguage): string {
  if (CATEGORY_LOCALIZED_NAMES[category] && CATEGORY_LOCALIZED_NAMES[category][lang]) {
    return CATEGORY_LOCALIZED_NAMES[category][lang];
  }
  return category;
}

export function getLocalizedPreset(presetId: string, lang: SupportedLanguage, defaultTitle: string, defaultSub: string) {
  if (PRESET_LOCALIZED[presetId] && PRESET_LOCALIZED[presetId][lang]) {
    return PRESET_LOCALIZED[presetId][lang];
  }
  return { title: defaultTitle, subtitle: defaultSub };
}
