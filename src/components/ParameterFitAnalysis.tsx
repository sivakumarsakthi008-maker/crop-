import React from 'react';
import { FeatureComparison } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { Check, AlertCircle, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface ParameterFitAnalysisProps {
  comparisons: FeatureComparison[];
  cropName: string;
}

export const ParameterFitAnalysis: React.FC<ParameterFitAnalysisProps> = ({ comparisons, cropName }) => {
  const { t, localizeCropName } = useTranslation();

  const getLocalizedLabel = (key: string, defaultLabel: string) => {
    switch (key) {
      case 'N': return `${t('nitrogen')} (N)`;
      case 'P': return `${t('phosphorus')} (P)`;
      case 'K': return `${t('potassium')} (K)`;
      case 'temperature': return t('temperature');
      case 'humidity': return t('humidity');
      case 'ph': return t('ph');
      case 'rainfall': return t('rainfall');
      default: return defaultLabel;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t('fitAnalysisTitle')}
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t('fitAnalysisSub')} <span className="font-bold text-emerald-700">{localizeCropName(cropName)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {comparisons.filter(c => c.status === 'optimal').length} / {comparisons.length} {t('optimalCount')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {comparisons.map((item) => {
          let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          let StatusIcon = Check;
          let statusText = t('optimalRange');

          if (item.status === 'low') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
            StatusIcon = ArrowDownRight;
            statusText = t('belowTarget');
          } else if (item.status === 'high') {
            badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
            StatusIcon = ArrowUpRight;
            statusText = t('aboveTarget');
          }

          return (
            <div
              key={item.key}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">{getLocalizedLabel(item.key, item.label)}</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusText}
                  </span>
                </div>

                <div className="flex items-baseline justify-between py-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('yourField')}</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {item.userValue} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('idealCropTarget')}</span>
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      {item.idealMin} – {item.idealMax} {item.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actionable farming tip for this parameter */}
              {item.advice && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 flex items-start gap-1.5 leading-tight">
                  <Info className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item.advice}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
