import React from 'react';
import { PredictionAlternative } from '../types';
import { getAllCrops } from '../data/crops';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowRight, Check } from 'lucide-react';

interface AlternativesListProps {
  alternatives: PredictionAlternative[];
  onSelectCrop?: (cropName: string) => void;
}

export const AlternativesList: React.FC<AlternativesListProps> = ({ alternatives, onSelectCrop }) => {
  const { t, localizeCropName, localizeCategory } = useTranslation();
  const allCrops = getAllCrops();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t('topAlternatives')}
          </h4>
          <p className="text-[11px] text-slate-500">
            {t('suitabilityScore')}
          </p>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">{t('soilCompatibility')}</span>
      </div>

      <div className="space-y-2.5">
        {alternatives.map((alt, index) => {
          const isTop = index === 0;
          const cropData = allCrops[alt.crop];
          return (
            <div
              key={alt.crop}
              onClick={() => onSelectCrop && onSelectCrop(alt.crop)}
              className={`p-3 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                isTop
                  ? 'bg-emerald-50/70 border-emerald-300/80 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isTop ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {index + 1}
                </span>

                <span className="text-2xl">{cropData?.icon || alt.icon || '🌱'}</span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{localizeCropName(alt.crop)}</span>
                    {isTop && (
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        {t('matchExcellent')}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {localizeCategory(cropData?.category || alt.category || 'Agricultural Crop')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span
                    className={`text-sm font-mono font-bold ${
                      isTop ? 'text-emerald-700' : 'text-slate-700'
                    }`}
                  >
                    {alt.confidence.toFixed(1)}%
                  </span>
                  <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? 'bg-emerald-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, alt.confidence))}%` }}
                    ></div>
                  </div>
                </div>

                {onSelectCrop && (
                  <button
                    type="button"
                    title={`${t('planThisCrop')} ${localizeCropName(alt.crop)}`}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
