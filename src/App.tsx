import React, { useState, useEffect, useMemo } from 'react';
import { CropInput, PredictionResult, ClimatePreset, RealtimeWeatherData, CropProfile } from './types';
import { recommendBestCrops, evaluateTargetCrop } from './utils/suitability';
import { evaluatePestAndDiseaseRisks } from './utils/pestRiskEngine';
import { CLIMATE_PRESETS, PARAM_LIMITS, getAllCrops } from './data/crops';
import { Header } from './components/Header';
import { RealtimeWeatherBar } from './components/RealtimeWeatherBar';
import { InputForm } from './components/InputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { PestDiseaseRiskAlerts } from './components/PestDiseaseRiskAlerts';
import { SoilNutrientRadarChart } from './components/SoilNutrientRadarChart';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { AlternativesList } from './components/AlternativesList';
import { ParameterFitAnalysis } from './components/ParameterFitAnalysis';
import { CropCatalogModal } from './components/CropCatalogModal';
import { AddCustomCropModal } from './components/AddCustomCropModal';
import { SoilMapView } from './components/SoilMapView';
import { useTranslation } from './i18n/LanguageContext';
import { Sprout, Leaf, Droplets, Sun, Sparkles, Plus, BookOpen, Compass, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

const DEFAULT_INPUT: CropInput = {
  N: 90,
  P: 45,
  K: 40,
  temperature: 24.0,
  humidity: 82.0,
  ph: 6.5,
  rainfall: 240.0
};

export default function App() {
  const { t } = useTranslation();
  const [values, setValues] = useState<CropInput>(DEFAULT_INPUT);
  const [mode, setMode] = useState<'recommend' | 'target'>('recommend');
  const [selectedTargetCrop, setSelectedTargetCrop] = useState<string>('Rice');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string | null>('monsoon-paddy');

  // Real-time weather state
  const [weather, setWeather] = useState<RealtimeWeatherData | null>(null);
  const [isWeatherApplied, setIsWeatherApplied] = useState<boolean>(false);

  // Modals
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState<boolean>(false);
  const [catalogRefresh, setCatalogRefresh] = useState<number>(0);

  // Available crops list
  const [availableCrops, setAvailableCrops] = useState<CropProfile[]>(() => Object.values(getAllCrops()));

  // Active view navigation
  const [activeTab, setActiveTab] = useState<'advisor' | 'soil-map'>('advisor');

  // Epidemiological pest & disease risk evaluation
  const pestRiskSummary = useMemo(() => {
    if (!result) return null;
    return evaluatePestAndDiseaseRisks(result.recommended_crop, values.temperature, values.humidity);
  }, [result, values.temperature, values.humidity]);

  // Refresh available crops when catalog or custom crops change
  const refreshCropsList = () => {
    const list = Object.values(getAllCrops());
    setAvailableCrops(list);
    setCatalogRefresh(prev => prev + 1);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      refreshCropsList();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Compute recommendation or evaluation
  const runEvaluation = (input: CropInput, currentMode: 'recommend' | 'target', targetCrop: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (currentMode === 'target') {
        const res = evaluateTargetCrop(input, targetCrop);
        setResult(res);
      } else {
        const res = recommendBestCrops(input);
        setResult(res);
      }
      setIsLoading(false);
    }, 180);
  };

  // Initial calculation on mount
  useEffect(() => {
    runEvaluation(DEFAULT_INPUT, 'recommend', 'Rice');
  }, []);

  const handleInputChange = (key: keyof CropInput, val: number) => {
    setActivePresetId(null);
    if (key === 'temperature' || key === 'humidity' || key === 'rainfall') {
      setIsWeatherApplied(false);
    }
    const updated = { ...values, [key]: val };
    setValues(updated);
  };

  const handleApplyPreset = (preset: ClimatePreset) => {
    setActivePresetId(preset.id);
    setIsWeatherApplied(false);
    setValues(preset.values);
    runEvaluation(preset.values, mode, selectedTargetCrop);
  };

  const handleApplyWeather = (liveWeather: RealtimeWeatherData) => {
    const updated: CropInput = {
      ...values,
      temperature: liveWeather.temperature,
      humidity: liveWeather.humidity,
      rainfall: liveWeather.rainfall
    };
    setValues(updated);
    setIsWeatherApplied(true);
    setActivePresetId(null);
    runEvaluation(updated, mode, selectedTargetCrop);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runEvaluation(values, mode, selectedTargetCrop);
  };

  const handleReset = () => {
    setActivePresetId('monsoon-paddy');
    setIsWeatherApplied(false);
    setValues(DEFAULT_INPUT);
    runEvaluation(DEFAULT_INPUT, mode, selectedTargetCrop);
  };

  const handleModeChange = (newMode: 'recommend' | 'target') => {
    setMode(newMode);
    runEvaluation(values, newMode, selectedTargetCrop);
  };

  const handleSelectTargetCrop = (cropName: string) => {
    setSelectedTargetCrop(cropName);
    setMode('target');
    runEvaluation(values, 'target', cropName);
  };

  const handleCropAdded = (newCrop: CropProfile) => {
    refreshCropsList();
    setSelectedTargetCrop(newCrop.name);
    setMode('target');
    runEvaluation(values, 'target', newCrop.name);
  };

  const handleApplyZoneSoil = (zoneInput: CropInput) => {
    setValues(zoneInput);
    setActivePresetId(null);
    setIsWeatherApplied(false);
    setActiveTab('advisor');
    runEvaluation(zoneInput, mode, selectedTargetCrop);
  };

  const handleSelectCropFromMap = (cropName: string) => {
    setSelectedTargetCrop(cropName);
    setMode('target');
    setActiveTab('advisor');
    runEvaluation(values, 'target', cropName);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header */}
      <Header
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenAddCrop={() => setIsAddCropOpen(true)}
        cropCount={availableCrops.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6">
        
        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center justify-center p-1 bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold">
          <button
            type="button"
            id="mobile-tab-advisor"
            onClick={() => setActiveTab('advisor')}
            className={`flex-1 py-1.5 rounded-lg text-center transition ${
              activeTab === 'advisor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            {t('fieldAdvisorTab')}
          </button>
          <button
            type="button"
            id="mobile-tab-soil-map"
            onClick={() => setActiveTab('soil-map')}
            className={`flex-1 py-1.5 rounded-lg text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'soil-map'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('soilMapTab')}</span>
          </button>
        </div>

        {/* View Switcher: Soil Map View vs Field Advisor */}
        {activeTab === 'soil-map' ? (
          <SoilMapView
            currentFormInput={values}
            activeCropProfile={result?.profile}
            availableCrops={availableCrops}
            onApplyZoneToInputs={handleApplyZoneSoil}
            onSelectCropForAdvisor={handleSelectCropFromMap}
          />
        ) : (
          <>
            {/* Real-Time Live Weather Bar */}
            <RealtimeWeatherBar
              weather={weather}
              onWeatherUpdate={setWeather}
              onApplyToInputs={handleApplyWeather}
              isApplied={isWeatherApplied}
            />

            {/* Quick Soil Map Invitation Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xs border border-emerald-900/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none text-white">
                    {t('mapBannerTitle')}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    {t('mapBannerSub')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="btn-quick-open-soil-map"
                onClick={() => setActiveTab('soil-map')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-xs whitespace-nowrap self-end sm:self-auto"
              >
                <span>{t('openSoilMap')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Input Form & Crop Selector */}
              <div className="lg:col-span-5 xl:col-span-5">
                <InputForm
                  inputs={values}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  onSelectPreset={handleApplyPreset}
                  isLoading={isLoading}
                  onReset={handleReset}
                  activePresetId={activePresetId || undefined}
                  isWeatherApplied={isWeatherApplied}
                  mode={mode}
                  onModeChange={handleModeChange}
                  selectedTargetCrop={selectedTargetCrop}
                  onSelectTargetCrop={handleSelectTargetCrop}
                  availableCrops={availableCrops}
                />
              </div>

              {/* Right Column: Output Results */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                {result ? (
                  <>
                    {/* Hero Recommendation Card */}
                    <RecommendationCard result={result} />

                    {/* Pest & Disease Risk Notification Advisory */}
                    {pestRiskSummary && (
                      <PestDiseaseRiskAlerts
                        summary={pestRiskSummary}
                        isLiveWeather={isWeatherApplied}
                      />
                    )}

                    {/* Soil NPK Radar Chart */}
                    {result.profile && (
                      <SoilNutrientRadarChart
                        input={values}
                        profile={result.profile}
                      />
                    )}

                    {/* Soil-Test Fertilizer Gap Calculator */}
                    {result.profile && (
                      <FertilizerCalculator
                        input={values}
                        profile={result.profile}
                      />
                    )}

                    {/* Alternative Crop Matches */}
                    <AlternativesList
                      alternatives={result.top_alternatives}
                      onSelectCrop={handleSelectTargetCrop}
                    />

                    {/* Soil & Climate Fit Breakdown */}
                    <ParameterFitAnalysis
                      comparisons={result.comparisons}
                      cropName={result.recommended_crop}
                    />
                  </>
                ) : (
                  <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center shadow-xs">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <Sprout className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">{t('readyHeading')}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                      {t('readySubheading')}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </>
        )}

        {/* Agricultural Best Practice Guides */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            {t('principlesHeading')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t('principleNpkTitle')}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('principleNpkDesc')}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{t('principlePhTitle')}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('principlePhDesc')}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{t('principleClimateTitle')}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('principleClimateDesc')}
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">{t('appName')}</span>
            <span>•</span>
            <span>{t('footerTagline')}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCatalogOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              {t('browseCatalogCount')} ({availableCrops.length})
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsAddCropOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              + {t('addCustomCrop')}
            </button>
          </div>
        </div>
      </footer>

      {/* Crop Catalog Modal */}
      <CropCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectTargetCrop={handleSelectTargetCrop}
        onOpenAddModal={() => {
          setIsCatalogOpen(false);
          setIsAddCropOpen(true);
        }}
        refreshTrigger={catalogRefresh}
      />

      {/* Add Custom Crop Modal */}
      <AddCustomCropModal
        isOpen={isAddCropOpen}
        onClose={() => setIsAddCropOpen(false)}
        onCropAdded={handleCropAdded}
      />

    </div>
  );
}
