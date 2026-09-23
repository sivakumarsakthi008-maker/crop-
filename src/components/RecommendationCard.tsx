import React from 'react';
import { PredictionResult } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { Calendar, Droplets, Leaf, Sprout, TrendingUp, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecommendationCardProps {
  result: PredictionResult;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ result }) => {
  const { t, localizeCropName, localizeCategory } = useTranslation();
  const profile = result.profile;
  const cropName = result.recommended_crop;
  const matchScore = result.confidence;

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        text: t('legendOptimal'),
        sub: 'Optimal growth conditions met'
      };
    }
    if (score >= 60) {
      return {
        bg: 'bg-teal-50 text-teal-800 border-teal-300',
        text: t('legendModerate'),
        sub: 'Good fit with minor nutrient/water adjustments'
      };
    }
    return {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      text: t('legendDeficit'),
      sub: 'Requires soil amendment & climate management'
    };
  };

  const badge = getScoreBadge(matchScore);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden relative">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl p-3 bg-emerald-50 rounded-2xl border border-emerald-100/80 flex items-center justify-center">
            {profile?.icon || '🌱'}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {result.targetCropMode ? t('modeTarget') : t('recommendedCrop')}
              </span>
              {profile?.isCustom && (
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-purple-100 text-purple-700">
                  {t('customCropTag')}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {localizeCropName(cropName)}
            </h2>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              {localizeCategory(profile?.category || 'Agricultural Crop')}
            </p>
          </div>
        </div>

        {/* Suitability Score Pill */}
        <div className={`px-4 py-2.5 rounded-2xl border ${badge.bg} flex flex-col items-end sm:min-w-44`}>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono">{matchScore.toFixed(1)}%</span>
            <span className="text-xs font-bold uppercase">{t('suitabilityScore')}</span>
          </div>
          <span className="text-[11px] font-semibold">{badge.text}</span>
        </div>
      </div>

      {/* Crop Description */}
      {profile?.description && (
        <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
          {profile.description}
        </p>
      )}

      {/* Practical Agronomic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        
        {/* Sowing & Harvest */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('growingSeason')}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900">{profile?.sowingSeason || 'Varies by region'}</p>
          <span className="text-[11px] text-slate-500 block mt-0.5">Harvest: {profile?.harvestTime || '90-120 days'}</span>
        </div>

        {/* Soil Requirements */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('soilType')}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 truncate" title={profile?.soilType}>
            {profile?.soilType || 'Loam or well-drained soil'}
          </p>
          <span className="text-[11px] text-slate-500 block mt-0.5">Ideal pH: {profile?.ideal.ph[0]} – {profile?.ideal.ph[1]}</span>
        </div>

        {/* Water & Irrigation */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span>{t('waterReq')}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 truncate" title={profile?.waterManagement}>
            {profile?.waterManagement || 'Standard field irrigation'}
          </p>
          <span className="text-[11px] text-slate-500 block mt-0.5">Rainfall: {profile?.ideal.rainfall[0]} – {profile?.ideal.rainfall[1]} mm</span>
        </div>

        {/* Expected Yield */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('yieldPotential')}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900">{profile?.expectedYield || '2.5 – 4.5 tons/ha'}</p>
          <span className="text-[11px] text-slate-500 block mt-0.5">{t('commercialPotential')}</span>
        </div>

      </div>

      {/* Nutrient Fertilizer Advice Box */}
      {profile?.nitrogenAdvice && (
        <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-start gap-2.5">
          <Leaf className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-emerald-950">{t('nutrientDemandHeading')}: </span>
            <span className="text-emerald-900">{profile.nitrogenAdvice}</span>
            {profile.companionCrops && (
              <span className="block text-emerald-800 mt-1">
                <strong>{t('companionCropsHeading')}:</strong> {profile.companionCrops}
              </span>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
