import React from 'react';
import { CropInput, ClimatePreset, CropProfile } from '../types';
import { PARAM_LIMITS, CLIMATE_PRESETS } from '../data/crops';
import { useTranslation } from '../i18n/LanguageContext';
import { Leaf, Sparkles, Flame, Thermometer, Droplets, FlaskConical, CloudRain, RotateCcw, CheckCircle2, Compass, Target } from 'lucide-react';

interface InputFormProps {
  inputs: CropInput;
  onChange: (key: keyof CropInput, value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSelectPreset: (preset: ClimatePreset) => void;
  isLoading: boolean;
  onReset: () => void;
  activePresetId?: string;
  isWeatherApplied: boolean;
  mode: 'recommend' | 'target';
  onModeChange: (mode: 'recommend' | 'target') => void;
  selectedTargetCrop: string;
  onSelectTargetCrop: (cropName: string) => void;
  availableCrops: CropProfile[];
}

export const InputForm: React.FC<InputFormProps> = ({
  inputs,
  onChange,
  onSubmit,
  onSelectPreset,
  isLoading,
  onReset,
  activePresetId,
  isWeatherApplied,
  mode,
  onModeChange,
  selectedTargetCrop,
  onSelectTargetCrop,
  availableCrops
}) => {
  const { t, localizeCropName, localizeCategory, localizePreset } = useTranslation();

  const getIcon = (key: keyof CropInput) => {
    switch (key) {
      case 'N': return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'P': return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'K': return <Flame className="w-4 h-4 text-orange-600" />;
      case 'temperature': return <Thermometer className="w-4 h-4 text-rose-500" />;
      case 'humidity': return <Droplets className="w-4 h-4 text-sky-500" />;
      case 'ph': return <FlaskConical className="w-4 h-4 text-purple-500" />;
      case 'rainfall': return <CloudRain className="w-4 h-4 text-blue-600" />;
    }
  };

  const getParamLabel = (key: keyof CropInput) => {
    switch (key) {
      case 'N': return t('nitrogen');
      case 'P': return t('phosphorus');
      case 'K': return t('potassium');
      case 'temperature': return t('temperature');
      case 'humidity': return t('humidity');
      case 'ph': return t('ph');
      case 'rainfall': return t('rainfall');
      default: return '';
    }
  };

  const getPhStatus = (ph: number) => {
    if (ph < 5.5) return t('stronglyAcidic');
    if (ph < 6.5) return t('slightlyAcidic');
    if (ph <= 7.3) return t('neutralIdeal');
    if (ph <= 8.2) return t('moderatelyAlkaline');
    return t('stronglyAlkaline');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => onModeChange('recommend')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'recommend'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('modeRecommend')}</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('target')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'target'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('modeTarget')}</span>
          </button>
        </div>

        {/* Target Crop Selector dropdown when in target mode */}
        {mode === 'target' && (
          <div className="mb-5 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                <span>{t('targetCropSelect')}</span>
              </label>
              <span className="text-[11px] text-emerald-700 font-medium">
                {availableCrops.length} crops available
              </span>
            </div>
            <select
              value={selectedTargetCrop}
              onChange={(e) => onSelectTargetCrop(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-emerald-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {availableCrops.map(c => (
                <option key={c.name} value={c.name}>
                  {c.icon} {localizeCropName(c.name)} — ({localizeCategory(c.category)}){c.isCustom ? ` [${t('customCropTag')}]` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Presets Quick Selector */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('presets')}
            </span>
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('reset')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CLIMATE_PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              const localized = localizePreset(preset.id, preset.title, preset.subtitle);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`p-2 rounded-xl text-left border transition text-xs flex items-center gap-2 ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-base">{preset.icon}</span>
                  <span className="truncate">{localized.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Section 1: Soil Nutrients */}
          <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. {t('soilNutrientsHeading')}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Available mg/kg</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['N', 'P', 'K'] as const).map((key) => {
                const limits = PARAM_LIMITS[key];
                const value = inputs[key];
                return (
                  <div key={key} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {getIcon(key)}
                        <span className="text-xs font-bold text-slate-700">{getParamLabel(key)}</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-slate-900">
                        {value} <span className="text-[10px] font-normal text-slate-500">{limits.unit}</span>
                      </span>
                    </div>

                    <input
                      type="range"
                      min={limits.min}
                      max={limits.max}
                      step={limits.step}
                      value={value}
                      onChange={(e) => onChange(key, Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />

                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                      <span>{limits.min}</span>
                      <span>{limits.max}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Soil pH */}
          <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {getIcon('ph')}
                <span className="text-xs font-bold text-slate-800">{t('ph')}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-extrabold text-slate-900 mr-2">
                  {inputs.ph} pH
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {getPhStatus(inputs.ph)}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={PARAM_LIMITS.ph.min}
              max={PARAM_LIMITS.ph.max}
              step={PARAM_LIMITS.ph.step}
              value={inputs.ph}
              onChange={(e) => onChange('ph', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />

            <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
              <span>3.5 (Acidic)</span>
              <span>7.0 (Neutral)</span>
              <span>9.5 (Alkaline)</span>
            </div>
          </div>

          {/* Section 3: Weather & Climate */}
          <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. {t('liveWeather')}
              </span>
              {isWeatherApplied && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> {t('weatherSynced')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['temperature', 'humidity', 'rainfall'] as const).map((key) => {
                const limits = PARAM_LIMITS[key];
                const value = inputs[key];
                return (
                  <div key={key} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {getIcon(key)}
                        <span className="text-xs font-bold text-slate-700">{getParamLabel(key)}</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-slate-900">
                        {value} <span className="text-[10px] font-normal text-slate-500">{limits.unit}</span>
                      </span>
                    </div>

                    <input
                      type="range"
                      min={limits.min}
                      max={limits.max}
                      step={limits.step}
                      value={value}
                      onChange={(e) => onChange(key, Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />

                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                      <span>{limits.min}</span>
                      <span>{limits.max}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              id="btn-analyze-crop"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('analyzing')}</span>
                </>
              ) : mode === 'target' ? (
                <>
                  <Target className="w-4 h-4" />
                  <span>{t('analyzeButton')}: {localizeCropName(selectedTargetCrop)}</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>{t('analyzeButton')}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
