export interface PestDiseaseItem {
  id: string;
  name: string;
  scientificName: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'insect';
  crop: string;
  tempRange: [number, number]; // [min °C, max °C]
  humidityRange: [number, number]; // [min %, max %]
  primaryTrigger: string;
  symptoms: string[];
  preventiveMeasures: string[];
  organicControl: string;
  chemicalControl: string;
  severity: 'critical' | 'moderate' | 'mild';
}

export const PEST_DISEASE_DATABASE: Record<string, PestDiseaseItem[]> = {
  "Rice": [
    {
      id: "rice-blast",
      name: "Rice Blast",
      scientificName: "Magnaporthe oryzae",
      type: "fungal",
      crop: "Rice",
      tempRange: [20.0, 28.0],
      humidityRange: [82.0, 100.0],
      primaryTrigger: "Cool nights with dew deposition followed by overcast days with high relative humidity (>85%).",
      symptoms: [
        "Spindle-shaped elliptical lesions with grayish centers and dark reddish-brown margins on leaves",
        "Neck rot causing panicle breakage and chaffy, empty grains",
        "Rapid spread across dense vegetative canopies with high nitrogen"
      ],
      preventiveMeasures: [
        "Avoid excessive nitrogen fertilization; split doses with potassium",
        "Ensure field aeration and maintain proper seedling spacing (20cm × 15cm)",
        "Treat seeds with carbendazim or bio-agent prior to nursery sowing"
      ],
      organicControl: "Foliar spray of Pseudomonas fluorescens (0.5%) or Neem seed kernel extract (NSKE 5%)",
      chemicalControl: "Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 mL/L at initial spotting",
      severity: "critical"
    },
    {
      id: "rice-bacterial-blight",
      name: "Bacterial Leaf Blight (BLB)",
      scientificName: "Xanthomonas oryzae pv. oryzae",
      type: "bacterial",
      crop: "Rice",
      tempRange: [25.0, 34.0],
      humidityRange: [75.0, 95.0],
      primaryTrigger: "Warm temperatures (25-34°C) combined with high humidity, monsoon winds, and rain storms.",
      symptoms: [
        "Water-soaked lesions starting from leaf tips and margins, progressing into wavy yellow stripes",
        "Milky bacterial exudate droplets visible on lesions during early humid mornings",
        "Kresek phase causing seedling wilting and complete plant death"
      ],
      preventiveMeasures: [
        "Drain excess standing water during rainstorms; avoid clipping seedling tips at transplanting",
        "Balance potassium application to strengthen cell walls against bacterial penetration",
        "Eradicate weed hosts and volunteer rice along irrigation bunds"
      ],
      organicControl: "Fresh cow dung supernatant spray (2%) or copper hydroxide bio-protective wash",
      chemicalControl: "Streptocycline (100 ppm) mixed with Copper Oxychloride 50% WP @ 2.5 g/L",
      severity: "critical"
    },
    {
      id: "rice-bph",
      name: "Brown Planthopper (BPH)",
      scientificName: "Nilaparvata lugens",
      type: "insect",
      crop: "Rice",
      tempRange: [24.0, 32.0],
      humidityRange: [78.0, 95.0],
      primaryTrigger: "High humidity within dense tiller microclimate and persistent warm tropical temperatures.",
      symptoms: [
        "Circular yellow patches in field known as 'Hopper Burn' turning into dry circular straw patches",
        "Large colonies of brown nymphs and macropterous adults feeding at base of tillers above water level",
        "Sooty mold development on honeydew exudate"
      ],
      preventiveMeasures: [
        "Provide alleyways (30 cm every 2-3 meters) for sunlight and air circulation within canopy",
        "Practice alternate wetting and drying (AWD) rather than continuous stagnant ponding",
        "Conserve natural predators: Mirid bugs (Cyrtorhinus lividipennis) and Lycosa wolf spiders"
      ],
      organicControl: "Spray Beauveria bassiana (1×10⁸ CFU/g) @ 5 g/L or 3% Neem oil directly at tiller base",
      chemicalControl: "Pymetrozine 50% WDG @ 0.6 g/L or Triflumezopyrim 10% SC @ 0.5 mL/L",
      severity: "critical"
    }
  ],

  "Maize (Corn)": [
    {
      id: "maize-faw",
      name: "Fall Armyworm (FAW)",
      scientificName: "Spodoptera frugiperda",
      type: "insect",
      crop: "Maize (Corn)",
      tempRange: [22.0, 35.0],
      humidityRange: [50.0, 85.0],
      primaryTrigger: "Warm daytime temperatures (25-35°C) promoting rapid nocturnal moth oviposition.",
      symptoms: [
        "Window-pane feeding on whorl leaves with characteristic coarse sawdust-like frass deposits",
        "Inverted 'Y' mark on dark caterpillar head capsule and 4 square dots on 8th abdominal segment",
        "Boring directly into developing corn ears and tassels"
      ],
      preventiveMeasures: [
        "Install pheromone traps @ 5 per acre to monitor adult moth flights",
        "Intercrop with legumes (cowpea or desmodium) and push-pull silverleaf strips",
        "Hand-pick egg masses and crush early instar caterpillars"
      ],
      organicControl: "Apply dry sand mixed with wood ash (9:1) directly into leaf whorls; spray Bacillus thuringiensis (Bt) kurstaki @ 2 g/L",
      chemicalControl: "Emamectin benzoate 5% SG @ 0.4 g/L or Chlorantraniliprole 18.5% SC @ 0.4 mL/L directed into whorl",
      severity: "critical"
    },
    {
      id: "maize-turcicum",
      name: "Northern Corn Leaf Blight",
      scientificName: "Exserohilum turcicum",
      type: "fungal",
      crop: "Maize (Corn)",
      tempRange: [18.0, 27.0],
      humidityRange: [78.0, 95.0],
      primaryTrigger: "Moderate temperatures (18-27°C) accompanied by extended periods of leaf wetness and high humidity.",
      symptoms: [
        "Large cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) parallel to leaf veins",
        "Dark velvety fungal sporulation on lesion surface during moist weather",
        "Premature leaf drying leading to stunted cob filling"
      ],
      preventiveMeasures: [
        "Plant resistant hybrids with robust multi-gene resistance",
        "Plow under infected crop residues to break overwintering chlamydospores",
        "Avoid overhead sprinkler irrigation late in the evening"
      ],
      organicControl: "Foliar application of Trichoderma harzianum @ 5 g/L with cow urine solution (5%)",
      chemicalControl: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L or Mancozeb 75% WP @ 2.5 g/L",
      severity: "moderate"
    }
  ],

  "Cotton": [
    {
      id: "cotton-pink-bollworm",
      name: "Pink Bollworm",
      scientificName: "Pectinophora gossypiella",
      type: "insect",
      crop: "Cotton",
      tempRange: [24.0, 35.0],
      humidityRange: [60.0, 85.0],
      primaryTrigger: "Warm nights with moderate-to-high humidity during squaring and green boll formation.",
      symptoms: [
        "'Rosette flowers' that fail to open due to petal web spinning by young larvae",
        "Punctured young green bolls with invisible entry holes that heal over",
        "Stained lint and hollowed seeds leading to premature shedding or improper boll opening"
      ],
      preventiveMeasures: [
        "Deploy delta pheromone traps (Gossyplure) @ 8-10 traps/ha for mass trapping and ETL monitoring",
        "Avoid late-season crop ratooning; ensure clean termination of cotton season",
        "Release Trichogramma bactrae parasitoids @ 150,000/ha at weekly intervals"
      ],
      organicControl: "Spray Neem oil 1500 ppm @ 3 mL/L or Beauveria bassiana suspension",
      chemicalControl: "Profenofos 50% EC @ 2 mL/L or Spinetoram 11.7% SC @ 1 mL/L upon ETL breach (8 moths/trap/night)",
      severity: "critical"
    },
    {
      id: "cotton-whitefly",
      name: "Cotton Whitefly",
      scientificName: "Bemisia tabaci",
      type: "insect",
      crop: "Cotton",
      tempRange: [28.0, 38.0],
      humidityRange: [45.0, 75.0],
      primaryTrigger: "Hot and dry-to-moderate humid conditions causing exponential nymph multiplication.",
      symptoms: [
        "Curling, yellowing, and downward cupping of upper leaves due to sap draining",
        "Sticky honeydew excretion fostering black sooty mold and lowering lint grade",
        "Transmission of Cotton Leaf Curl Virus (CLCuV)"
      ],
      preventiveMeasures: [
        "Install yellow sticky traps @ 20/acre to trap winged adults",
        "Avoid excessive synthetic nitrogen applications which stimulate succulent vegetative shoots",
        "Grow barrier crops like maize, pearl millet, or sorghum around the field border"
      ],
      organicControl: "Spray 5% Neem Seed Kernel Extract (NSKE) or Lecanicillium lecanii @ 5 g/L",
      chemicalControl: "Diafenthiuron 50% WP @ 1.2 g/L or Pyriproxyfen 10% EC @ 2 mL/L",
      severity: "critical"
    }
  ],

  "Chickpea (Gram)": [
    {
      id: "chickpea-ascochyta",
      name: "Ascochyta Blight",
      scientificName: "Ascochyta rabiei",
      type: "fungal",
      crop: "Chickpea (Gram)",
      tempRange: [15.0, 22.0],
      humidityRange: [75.0, 95.0],
      primaryTrigger: "Cool, cloudy, and damp weather (15-20°C) with persistent winter drizzle or heavy fog.",
      symptoms: [
        "Circular brown lesions on leaflets and pods with concentric rings of dark pycnidia",
        "Stem girdling causing terminal branch breakage and patch-wise field lodging",
        "Deep seed lesions causing shriveled discolored grain"
      ],
      preventiveMeasures: [
        "Use certified disease-free seeds treated with Trichoderma or thiram + carbendazim",
        "Practice wide row spacing (45 cm) for canopy sun penetration and fast drying",
        "3-year crop rotation with non-host cereals (wheat, barley)"
      ],
      organicControl: "Seed priming with Trichoderma asperellum followed by bio-fungicide foliar spray",
      chemicalControl: "Chlorothalonil 75% WP @ 2 g/L or Azoxystrobin 23% SC @ 1 mL/L upon first spotting",
      severity: "critical"
    },
    {
      id: "chickpea-pod-borer",
      name: "Gram Pod Borer",
      scientificName: "Helicoverpa armigera",
      type: "insect",
      crop: "Chickpea (Gram)",
      tempRange: [20.0, 32.0],
      humidityRange: [40.0, 80.0],
      primaryTrigger: "Warm sunshine following cool winter triggering peak adult moth emergence during pod setting.",
      symptoms: [
        "Defoliation of tender leaflets and flower buds in early vegetative stages",
        "Neat circular entry holes in pods with larva feeding with half its body inside the pod",
        "Empty severed pods on the soil surface"
      ],
      preventiveMeasures: [
        "Erect bird perches (T-shaped bamboo poles) @ 20/acre for predatory birds (drongos, egrets)",
        "Intercrop with coriander, mustard, or marigold as trap crops",
        "Install Helilure pheromone traps @ 5/ha for monitoring"
      ],
      organicControl: "Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 250 LE/ha with 0.1% jaggery",
      chemicalControl: "Indoxacarb 14.5% SC @ 1 mL/L or Chlorantraniliprole 18.5% SC @ 0.3 mL/L",
      severity: "critical"
    }
  ],

  "Apple": [
    {
      id: "apple-scab",
      name: "Apple Scab",
      scientificName: "Venturia inaequalis",
      type: "fungal",
      crop: "Apple",
      tempRange: [14.0, 22.0],
      humidityRange: [82.0, 100.0],
      primaryTrigger: "Prolonged leaf wetness periods (>9 hours) at cool spring temperatures (15-20°C).",
      symptoms: [
        "Olive-green to velvety brown velvety spots on young leaves causing deformation",
        "Scabby, corky, cracked blemishes on fruit rind leading to fruit dwarfing and drop",
        "Premature orchard defoliation weakening tree vigor for the next season"
      ],
      preventiveMeasures: [
        "Apply 5% urea spray on fallen leaves in autumn to accelerate leaf decomposition and destroy pseudothecia",
        "Prune tree canopy annually to facilitate rapid wind drying of foliage",
        "Follow Mills Infection Period table to time protective spray intervals"
      ],
      organicControl: "Sulfur 80% WDG @ 3 g/L or Copper oxychloride during silver tip to green tip stage",
      chemicalControl: "Difenoconazole 25% EC @ 0.5 mL/L or Dodine 65% WP @ 1 g/L after infection rains",
      severity: "critical"
    },
    {
      id: "apple-powdery-mildew",
      name: "Apple Powdery Mildew",
      scientificName: "Podosphaera leucotricha",
      type: "fungal",
      crop: "Apple",
      tempRange: [18.0, 26.0],
      humidityRange: [65.0, 85.0],
      primaryTrigger: "Warm, dry-to-moderate humid days (19-25°C) with high nocturnal humidity without rain wash.",
      symptoms: [
        "Whitish-gray talcum-like powdery coating on young shoot tips and leaves",
        "Leaves become narrow, distorted, curled, and brittle ('silver tip syndrome')",
        "Net-like russeting on fruit skin reducing export grade"
      ],
      preventiveMeasures: [
        "Prune out infected overwintered white shoots ('flag shoots') during winter dormancy",
        "Maintain balanced nitrogen fertilization to avoid excessive succulent terminal growth",
        "Plant resistant cultivars where scab and mildew pressure is consistently high"
      ],
      organicControl: "Wettable sulfur @ 2.5 g/L or potassium bicarbonate (0.5%) spray",
      chemicalControl: "Penconazole 10% EC @ 0.5 mL/L or Kresoxim-methyl 44.3% SC @ 0.7 mL/L",
      severity: "moderate"
    }
  ],

  "Coffee": [
    {
      id: "coffee-leaf-rust",
      name: "Coffee Leaf Rust",
      scientificName: "Hemileia vastatrix",
      type: "fungal",
      crop: "Coffee",
      tempRange: [21.0, 27.0],
      humidityRange: [80.0, 98.0],
      primaryTrigger: "Warm daytime temperatures (21-26°C) accompanied by free moisture droplets on leaf underside.",
      symptoms: [
        "Yellow-orange powdery pustules on the lower leaf surface releasing mass urediniospores",
        "Corresponding chlorotic pale yellow spots on upper leaf surface",
        "Severe premature defoliation leading to branch dieback ('dieback disease')"
      ],
      preventiveMeasures: [
        "Regulate shade tree canopy (two-tier shade) to reduce excessive dew dripping",
        "Apply pre-monsoon and post-monsoon protective Bordeaux mixture (0.5% - 1.0%)",
        "Prune unproductive and crisscross branches to enhance air flow"
      ],
      organicControl: "Bordeaux mixture 0.5% (Copper sulfate + quicklime) thoroughly coating leaf undersides",
      chemicalControl: "Hexaconazole 5% EC @ 2 mL/L or Epoxiconazole 12.5% SC @ 1 mL/L during rust emergence",
      severity: "critical"
    },
    {
      id: "coffee-berry-borer",
      name: "Coffee Berry Borer (CBB)",
      scientificName: "Hypothenemus hampei",
      type: "insect",
      crop: "Coffee",
      tempRange: [22.0, 30.0],
      humidityRange: [70.0, 92.0],
      primaryTrigger: "Warm and humid tropical shade canopy promoting adult female beetle boring into pinhead berries.",
      symptoms: [
        "Tiny entry hole (about 1 mm) near the tip or navel of coffee berries",
        "Internal gallery burrowing inside the coffee bean destroying bean weight and quality",
        "Premature drop of green berries and rotting of harvest beans"
      ],
      preventiveMeasures: [
        "Practice 'clean harvesting' by picking all left-over and dropped berries from the ground",
        "Install Brocap ethanol-methanol pheromone traps @ 20-25 traps/ha",
        "Maintain optimal shade density to keep orchard floor ventilated"
      ],
      organicControl: "Spray entomopathogenic fungus Beauveria bassiana @ 5 g/L at peak beetle flight",
      chemicalControl: "Chlorpyrifos 20% EC @ 2.5 mL/L or Cyantraniliprole 10% OD during early berry stage",
      severity: "critical"
    }
  ],

  "Papaya": [
    {
      id: "papaya-anthracnose",
      name: "Papaya Anthracnose",
      scientificName: "Colletotrichum gloeosporioides",
      type: "fungal",
      crop: "Papaya",
      tempRange: [25.0, 33.0],
      humidityRange: [80.0, 98.0],
      primaryTrigger: "High humidity (>80%) combined with tropical warmth (26-32°C) and splashing rains.",
      symptoms: [
        "Small circular water-soaked sunken spots on fruit skin expanding into dark saucer-shaped lesions",
        "Pinkish orange gelatinous spore masses in the center of lesions under humid air",
        "Internal flesh rot causing rapid spoilage during transport and storage"
      ],
      preventiveMeasures: [
        "Avoid fruit skin abrasions during harvest; handle with soft gloves",
        "Field sanitation: remove and bury diseased mummified fruits and old leaves",
        "Pre-harvest spray program during warm rainy spells"
      ],
      organicControl: "Post-harvest hot water dip (48°C for 20 minutes) or Trichoderma viride foliar wash",
      chemicalControl: "Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 mL/L prior to fruit maturity",
      severity: "moderate"
    }
  ],

  "Watermelon": [
    {
      id: "watermelon-downy-mildew",
      name: "Downy Mildew",
      scientificName: "Pseudoperonospora cubensis",
      type: "fungal",
      crop: "Watermelon",
      tempRange: [20.0, 28.0],
      humidityRange: [85.0, 100.0],
      primaryTrigger: "High humidity (>85%), persistent morning dew, and moderate day temperatures (20-28°C).",
      symptoms: [
        "Angular chlorotic yellow lesions on the upper leaf surface bounded by veins",
        "Purplish to dark gray velvety downy fungal growth on the underside of corresponding lesions",
        "Rapid leaf scorching giving the vine a frost-burned or scorched appearance"
      ],
      preventiveMeasures: [
        "Use drip irrigation rather than overhead sprinklers to keep vine foliage dry",
        "Wider row spacing and training vines on raised beds with silver-black plastic mulch",
        "Avoid working in field while vines are wet with morning dew"
      ],
      organicControl: "Foliar application of Copper Hydroxide (2 g/L) or Bacillus subtilis bio-fungicide",
      chemicalControl: "Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Cymoxanil + Mancozeb @ 2 g/L",
      severity: "critical"
    }
  ]
};

// Generic baseline pests/diseases for crops without a specialized entry
export const GENERIC_CROP_THREATS: PestDiseaseItem[] = [
  {
    id: "general-powdery-mildew",
    name: "Powdery Mildew",
    scientificName: "Erysiphe / Leveillula spp.",
    type: "fungal",
    crop: "General Crops",
    tempRange: [20.0, 30.0],
    humidityRange: [60.0, 85.0],
    primaryTrigger: "Warm daytime temperatures with high nocturnal humidity without leaf wetness.",
    symptoms: [
      "White powdery spots on upper leaf surfaces and young shoots",
      "Yellowing and premature shedding of photosynthetic leaves",
      "Stunted growth and sun-scald on exposed fruits"
    ],
    preventiveMeasures: [
      "Improve air circulation and canopy thinning",
      "Avoid excess nitrogen fertilizer"
    ],
    organicControl: "Potassium bicarbonate spray or wettable sulfur (0.2%)",
    chemicalControl: "Difenoconazole or Hexaconazole at initial appearance",
    severity: "moderate"
  },
  {
    id: "general-aphids",
    name: "Aphids & Sucking Pests",
    scientificName: "Aphis spp.",
    type: "insect",
    crop: "General Crops",
    tempRange: [22.0, 32.0],
    humidityRange: [50.0, 80.0],
    primaryTrigger: "Warm temperatures promoting rapid clonal parthenogenesis reproduction.",
    symptoms: [
      "Curled tender leaves and stunted shoot terminals",
      "Honeydew secretion attracting ants and black sooty mold",
      "Transmission of plant virus diseases"
    ],
    preventiveMeasures: [
      "Yellow sticky traps @ 15-20/acre",
      "Encourage ladybird beetles and hoverfly larvae"
    ],
    organicControl: "5% Neem seed kernel extract (NSKE) or potassium soap spray",
    chemicalControl: "Imidacloprid 17.8% SL @ 0.3 mL/L or Acetamiprid 20% SP @ 0.4 g/L",
    severity: "moderate"
  },
  {
    id: "general-root-rot",
    name: "Damping-off & Root Rot",
    scientificName: "Pythium / Rhizoctonia / Phytophthora spp.",
    type: "fungal",
    crop: "General Crops",
    tempRange: [22.0, 32.0],
    humidityRange: [85.0, 100.0],
    primaryTrigger: "Excessive moisture, waterlogged heavy soils, and warm soil temperatures.",
    symptoms: [
      "Water-soaked collar rot at soil line causing collapse of young seedlings",
      "Brownish-black root decay and foul rotting smell",
      "Yellowing, wilting, and poor anchorage of mature plants"
    ],
    preventiveMeasures: [
      "Provide field drainage channels to prevent water stagnation",
      "Raise planting beds by 15-20 cm in heavy soils",
      "Seed treatment with bio-control agents"
    ],
    organicControl: "Soil drenching with Trichoderma viride enriched in farmyard manure",
    chemicalControl: "Soil drench with Copper Oxychloride 50% WP @ 3 g/L or Metalaxyl @ 2 g/L",
    severity: "critical"
  }
];
