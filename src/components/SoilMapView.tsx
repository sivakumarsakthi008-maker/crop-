import React, { useState, useMemo } from 'react';
import { CropInput, CropProfile, PredictionResult } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import {
  FARM_ZONES,
  FarmZone,
  MapOverlayMode,
  calculateSoilQualityIndex,
  evaluateSoilQualityForCrop,
  calculateZoneYieldPotential
} from '../utils/soilQuality';
import { recommendBestCrops } from '../utils/suitability';
import {
  MapPin,
  Layers,
  TrendingUp,
  Activity,
  Sparkles,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  Droplets,
  Thermometer,
  ShieldCheck,
  Compass,
  ArrowRight,
  Info,
  Beaker,
  Check,
  ChevronRight
} from 'lucide-react';

interface SoilMapViewProps {
  currentFormInput: CropInput;
  activeCropProfile?: CropProfile;
  availableCrops: CropProfile[];
  onApplyZoneToInputs: (zoneInput: CropInput) => void;
  onSelectCropForAdvisor: (cropName: string) => void;
}

export const SoilMapView: React.FC<SoilMapViewProps> = ({
  currentFormInput,
  activeCropProfile,
  availableCrops,
  onApplyZoneToInputs,
  onSelectCropForAdvisor
}) => {
  const { t, localizeCropName, localizeCategory } = useTranslation();
  const [overlayMode, setOverlayMode] = useState<MapOverlayMode>('nutrient-zones');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-north');
  const [targetCropName, setTargetCropName] = useState<string>(activeCropProfile?.name || 'Rice');
  const [activeNutrientFilter, setActiveNutrientFilter] = useState<'all' | 'N' | 'P' | 'K'>('all');


  // Selected Zone
  const selectedZone = useMemo(() => {
    return FARM_ZONES.find((z) => z.id === selectedZoneId) || FARM_ZONES[0];
  }, [selectedZoneId]);

  // Selected Target/Customized Crop Profile
  const selectedTargetCrop = useMemo(() => {
    return availableCrops.find((c) => c.name === targetCropName) || availableCrops[0];
  }, [availableCrops, targetCropName]);

  // 1. Soil Quality Breakdown for Selected Zone
  const selectedZoneSQI = useMemo(() => {
    return calculateSoilQualityIndex(
      selectedZone.soil.N,
      selectedZone.soil.P,
      selectedZone.soil.K,
      selectedZone.soil.ph,
      selectedZone.soil.organicMatterPct,
      selectedZone.soil.humidity
    );
  }, [selectedZone]);

  // 2. Top Recommended Crops based on Selected Zone Soil Quality
  const zoneCropRecommendations = useMemo(() => {
    const input: CropInput = {
      N: selectedZone.soil.N,
      P: selectedZone.soil.P,
      K: selectedZone.soil.K,
      temperature: selectedZone.soil.temperature,
      humidity: selectedZone.soil.humidity,
      ph: selectedZone.soil.ph,
      rainfall: selectedZone.soil.rainfall
    };
    return recommendBestCrops(input);
  }, [selectedZone]);

  // 3. Soil Quality Required for the Selected/Customized Crop vs Selected Zone
  const cropSoilRequirements = useMemo(() => {
    const input: CropInput = {
      N: selectedZone.soil.N,
      P: selectedZone.soil.P,
      K: selectedZone.soil.K,
      temperature: selectedZone.soil.temperature,
      humidity: selectedZone.soil.humidity,
      ph: selectedZone.soil.ph,
      rainfall: selectedZone.soil.rainfall
    };
    return evaluateSoilQualityForCrop(selectedTargetCrop, input, selectedZone.soil.organicMatterPct);
  }, [selectedTargetCrop, selectedZone]);

  // Zone Color Helper for Map Overlays
  const getZoneOverlayStyle = (zone: FarmZone) => {
    const sqi = calculateSoilQualityIndex(
      zone.soil.N,
      zone.soil.P,
      zone.soil.K,
      zone.soil.ph,
      zone.soil.organicMatterPct,
      zone.soil.humidity
    );

    if (overlayMode === 'nutrient-zones') {
      let val = sqi.chemicalScore;
      if (activeNutrientFilter === 'N') val = Math.min(100, Math.round((zone.soil.N / 120) * 100));
      if (activeNutrientFilter === 'P') val = Math.min(100, Math.round((zone.soil.P / 65) * 100));
      if (activeNutrientFilter === 'K') val = Math.min(100, Math.round((zone.soil.K / 70) * 100));

      if (val >= 80) return { fill: '#10b981', fillOpacity: 0.85, stroke: '#047857', badge: t('highFertility'), color: 'emerald' };
      if (val >= 60) return { fill: '#84cc16', fillOpacity: 0.80, stroke: '#65a30d', badge: t('mediumFertility'), color: 'lime' };
      if (val >= 45) return { fill: '#f59e0b', fillOpacity: 0.75, stroke: '#d97706', badge: t('legendModerate'), color: 'amber' };
      return { fill: '#ef4444', fillOpacity: 0.75, stroke: '#b91c1c', badge: t('depletedZone'), color: 'rose' };
    }

    if (overlayMode === 'yield-heatmap') {
      const y = calculateZoneYieldPotential(zone, selectedTargetCrop);
      if (y.yieldPercentage >= 88) return { fill: '#059669', fillOpacity: 0.90, stroke: '#065f46', badge: `${y.yieldPercentage}% ${t('legendOptimal')}`, color: 'emerald' };
      if (y.yieldPercentage >= 75) return { fill: '#10b981', fillOpacity: 0.80, stroke: '#047857', badge: `${y.yieldPercentage}% ${t('legendOptimal')}`, color: 'teal' };
      if (y.yieldPercentage >= 60) return { fill: '#f59e0b', fillOpacity: 0.80, stroke: '#d97706', badge: `${y.yieldPercentage}% ${t('legendModerate')}`, color: 'amber' };
      return { fill: '#f43f5e', fillOpacity: 0.80, stroke: '#e11d48', badge: `${y.yieldPercentage}% ${t('legendDeficit')}`, color: 'rose' };
    }

    // soil-health-trend
    if (zone.trend.status === 'Improving') {
      return { fill: '#0d9488', fillOpacity: 0.85, stroke: '#115e59', badge: `${t('improving')} (+Trend)`, color: 'teal' };
    }
    if (zone.trend.status === 'Stable') {
      return { fill: '#3b82f6', fillOpacity: 0.80, stroke: '#1d4ed8', badge: `${t('stable')} Baseline`, color: 'blue' };
    }
    return { fill: '#f97316', fillOpacity: 0.80, stroke: '#c2410c', badge: `${t('degrading')} (Action Needed)`, color: 'orange' };
  };

  return (
    <div id="soil-map-view-card" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Top Controls Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('soilMapTitle')}
            </h2>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-200">
              {t('fieldGeospatial')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('soilMapSub')}
          </p>
        </div>

        {/* Overlay Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            id="map-overlay-nutrients"
            onClick={() => setOverlayMode('nutrient-zones')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              overlayMode === 'nutrient-zones'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('nutrientZones')}</span>
          </button>

          <button
            type="button"
            id="map-overlay-yield"
            onClick={() => setOverlayMode('yield-heatmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              overlayMode === 'yield-heatmap'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t('yieldHeatmap')}</span>
          </button>

          <button
            type="button"
            id="map-overlay-trends"
            onClick={() => setOverlayMode('soil-health-trend')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              overlayMode === 'soil-health-trend'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('soilTrends')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Filters & Active Overlay Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">{t('activeMapLayer')}:</span>
          {overlayMode === 'nutrient-zones' && (
            <span className="text-slate-600">
              {t('layerNutrientDesc')}
            </span>
          )}
          {overlayMode === 'yield-heatmap' && (
            <span className="text-slate-600">
              {t('layerYieldDesc')} (<strong className="text-emerald-700">{localizeCropName(selectedTargetCrop.name)}</strong>)
            </span>
          )}
          {overlayMode === 'soil-health-trend' && (
            <span className="text-slate-600">
              {t('layerTrendsDesc')}
            </span>
          )}
        </div>

        {overlayMode === 'nutrient-zones' && (
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">NPK:</span>
            {(['all', 'N', 'P', 'K'] as const).map((nutrient) => (
              <button
                key={nutrient}
                type="button"
                id={`nutrient-filter-${nutrient.toLowerCase()}`}
                onClick={() => setActiveNutrientFilter(nutrient)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  activeNutrientFilter === nutrient
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {nutrient === 'all' ? t('allNPK') : nutrient}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Map & Parcel Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map Canvas / SVG Parcel Matrix */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-3">
          <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-inner overflow-hidden">
            
            {/* Map Top Bar */}
            <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[11px]">{t('fieldCoordinates')}: 11.0168° N, 76.9558° E</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{t('totalFarmArea')}: 26.5 {t('hectares')}</span>
            </div>

            {/* Interactive SVG Cadastral Plot Grid */}
            <div className="w-full aspect-16/10 sm:aspect-16/9 relative my-2">
              <svg
                viewBox="0 0 960 410"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
              >
                {/* Background Landscape Texture */}
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="960" height="410" fill="#0f172a" />
                <rect width="960" height="410" fill="url(#grid-pattern)" />

                {/* Irrigation Canal / Contour River Line */}
                <path
                  d="M 10 195 Q 320 200 480 185 T 950 195"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="6"
                  strokeDasharray="8 4"
                  opacity="0.5"
                />

                {/* Render Farm Parcels */}
                {FARM_ZONES.map((zone) => {
                  const style = getZoneOverlayStyle(zone);
                  const isSelected = selectedZone.id === zone.id;
                  const { x, y, width, height } = zone.coordinates;
                  const yPotential = calculateZoneYieldPotential(zone, selectedTargetCrop);

                  return (
                    <g
                      key={zone.id}
                      id={`map-zone-${zone.id}`}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      {/* Parcel Shape */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="14"
                        ry="14"
                        fill={style.fill}
                        fillOpacity={isSelected ? 0.95 : style.fillOpacity}
                        stroke={isSelected ? '#ffffff' : style.stroke}
                        strokeWidth={isSelected ? 3.5 : 2}
                        className="transition duration-200 hover:brightness-110"
                        style={{
                          filter: isSelected ? 'drop-shadow(0 0 12px rgba(255,255,255,0.4))' : undefined
                        }}
                      />

                      {/* Zone Name Label */}
                      <text
                        x={x + 14}
                        y={y + 24}
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        fontFamily="system-ui"
                      >
                        {zone.name.split(':')[0]}
                      </text>

                      {/* Zone Area & Soil Type */}
                      <text
                        x={x + 14}
                        y={y + 42}
                        fill="#f1f5f9"
                        fontSize="10"
                        fontFamily="system-ui"
                        opacity="0.9"
                      >
                        {zone.areaHa} ha • {zone.soil.soilTexture}
                      </text>

                      {/* Dynamic Overlay Metrics Badge on Plot */}
                      {overlayMode === 'nutrient-zones' && (
                        <g>
                          <rect
                            x={x + 14}
                            y={y + 56}
                            width={width - 28}
                            height="42"
                            rx="8"
                            fill="rgba(0, 0, 0, 0.45)"
                          />
                          <text
                            x={x + 22}
                            y={y + 73}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            N:{zone.soil.N} P:{zone.soil.P} K:{zone.soil.K}
                          </text>
                          <text
                            x={x + 22}
                            y={y + 89}
                            fill="#a7f3d0"
                            fontSize="10"
                            fontFamily="system-ui"
                          >
                            pH: {zone.soil.ph} • OM: {zone.soil.organicMatterPct}%
                          </text>
                        </g>
                      )}

                      {overlayMode === 'yield-heatmap' && (
                        <g>
                          <rect
                            x={x + 14}
                            y={y + 56}
                            width={width - 28}
                            height="42"
                            rx="8"
                            fill="rgba(0, 0, 0, 0.45)"
                          />
                          <text
                            x={x + 22}
                            y={y + 73}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            Potential: {yPotential.yieldPercentage}% ({yPotential.estimatedYieldTonHa})
                          </text>
                          <text
                            x={x + 22}
                            y={y + 89}
                            fill="#fef08a"
                            fontSize="10"
                            fontFamily="system-ui"
                          >
                            Fit: {yPotential.rating} for {selectedTargetCrop.name}
                          </text>
                        </g>
                      )}

                      {overlayMode === 'soil-health-trend' && (
                        <g>
                          <rect
                            x={x + 14}
                            y={y + 56}
                            width={width - 28}
                            height="42"
                            rx="8"
                            fill="rgba(0, 0, 0, 0.45)"
                          />
                          <text
                            x={x + 22}
                            y={y + 73}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="system-ui"
                          >
                            Trend: {zone.trend.status} ({zone.trend.erosionRisk} Erosion)
                          </text>
                          <text
                            x={x + 22}
                            y={y + 89}
                            fill="#e2e8f0"
                            fontSize="9"
                            fontFamily="system-ui"
                          >
                            Microbes: {zone.trend.biologicalActivity}
                          </text>
                        </g>
                      )}

                      {/* Selected Pin Icon */}
                      {isSelected && (
                        <circle
                          cx={x + width - 20}
                          cy={y + 20}
                          r="7"
                          fill="#ffffff"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">{t('clickParcelToInspect')}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{t('legendOptimal')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>{t('legendModerate')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>{t('legendDeficit')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Parcel Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {FARM_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                id={`btn-select-${zone.id}`}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedZone.id === zone.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span>{zone.name.split(':')[0]}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Inspection Drawer: Soil Quality & Crop Recommendations */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-4">
          
          {/* Active Zone Soil Quality Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t('inspectedParcel')}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {selectedZone.name}
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedZone.areaHa} ha • {selectedZone.soil.soilTexture} • {selectedZone.soil.drainageClass}
                </span>
              </div>

              {/* Overall Soil Quality Score */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  SQI: {selectedZoneSQI.overallScore}/100
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                  {selectedZoneSQI.grade.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Micro Soil Parameters Grid */}
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[9px] text-slate-400 block font-sans">N</span>
                <span className="font-extrabold text-slate-900">{selectedZone.soil.N}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[9px] text-slate-400 block font-sans">P</span>
                <span className="font-extrabold text-slate-900">{selectedZone.soil.P}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[9px] text-slate-400 block font-sans">K</span>
                <span className="font-extrabold text-slate-900">{selectedZone.soil.K}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[9px] text-slate-400 block font-sans">pH</span>
                <span className="font-extrabold text-emerald-700">{selectedZone.soil.ph}</span>
              </div>
            </div>

            {/* 1-Click Load into Advisor */}
            <button
              type="button"
              id="btn-apply-zone-inputs"
              onClick={() => {
                onApplyZoneToInputs({
                  N: selectedZone.soil.N,
                  P: selectedZone.soil.P,
                  K: selectedZone.soil.K,
                  temperature: selectedZone.soil.temperature,
                  humidity: selectedZone.soil.humidity,
                  ph: selectedZone.soil.ph,
                  rainfall: selectedZone.soil.rainfall
                });
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t('applyPlotSoil')}</span>
            </button>
          </div>

          {/* SECTION A: Recommended Crop based on Soil Quality */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t('recommendedForSoil')}
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold">
                {t('sqiFit')}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Based on the nutrient balance, pH ({selectedZone.soil.ph}), and organic carbon of {selectedZone.name.split(':')[0]}:
            </p>

            <div className="space-y-2">
              {zoneCropRecommendations.top_alternatives.slice(0, 3).map((crop, idx) => (
                <div
                  key={crop.crop}
                  className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 hover:border-emerald-300 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{localizeCropName(crop.crop)}</h5>
                      <span className="text-[10px] text-slate-500">{crop.category ? localizeCategory(crop.category) : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      {crop.confidence}% {t('suitabilityScore')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectCropForAdvisor(crop.crop)}
                      className="p-1 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700"
                      title={t('planThisCrop')}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B: Soil Quality based on Customized / Target Crop */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Beaker className="w-4 h-4 text-indigo-700" />
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  {t('soilQualityFitForCrop')}
                </h4>
              </div>

              {/* Crop Selector dropdown */}
              <select
                id="soil-quality-target-crop-select"
                value={targetCropName}
                onChange={(e) => setTargetCropName(e.target.value)}
                className="text-xs font-bold px-2 py-1 rounded-lg border border-indigo-200 bg-white text-indigo-900 focus:ring-2 focus:ring-indigo-500"
              >
                {availableCrops.map((c) => (
                  <option key={c.name} value={c.name}>
                    {localizeCropName(c.name)} {c.isCustom ? `(${t('customCropTag')})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-lg bg-white border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {localizeCropName(selectedTargetCrop.name)} {t('soilCompatibility')}:
                </span>
                <span className="font-mono font-black text-indigo-700">
                  {cropSoilRequirements.compatibilityPercentage}% ({cropSoilRequirements.status})
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    cropSoilRequirements.compatibilityPercentage >= 80
                      ? 'bg-emerald-500'
                      : cropSoilRequirements.compatibilityPercentage >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${cropSoilRequirements.compatibilityPercentage}%` }}
                />
              </div>

              {/* Specific Soil Gaps for this Crop */}
              <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                <div className="flex justify-between">
                  <span>{t('targetPhReq')}:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedTargetCrop.ideal.ph[0]} – {selectedTargetCrop.ideal.ph[1]} ({t('yourField')} {selectedZone.soil.ph})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('targetNpkDemand')}:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedTargetCrop.ideal.N[0]}N • {selectedTargetCrop.ideal.P[0]}P • {selectedTargetCrop.ideal.K[0]}K
                  </span>
                </div>
              </div>
            </div>

            {/* Soil Remediation Steps to suit this Crop */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block">
                {t('remediationRoadmap')}:
              </span>
              <ul className="space-y-1">
                {cropSoilRequirements.soilConditioningSteps.slice(0, 2).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-snug">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
