import React, { useState } from 'react';
import { CropInput, CropProfile } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Sparkles, Leaf, Flame, ShieldAlert, CheckCircle2, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface SoilNutrientRadarChartProps {
  input: CropInput;
  profile: CropProfile;
}

export const SoilNutrientRadarChart: React.FC<SoilNutrientRadarChartProps> = ({ input, profile }) => {
  const { t, localizeCropName } = useTranslation();
  const [viewMode, setViewMode] = useState<'actual' | 'normalized'>('actual');

  // Actual NPK values comparison
  const rawChartData = [
    {
      nutrient: `${t('nitrogen')} (N)`,
      short: 'N',
      currentSoil: input.N,
      optimalTarget: profile.mean.N,
      idealMin: profile.ideal.N[0],
      idealMax: profile.ideal.N[1],
      unit: 'mg/kg'
    },
    {
      nutrient: `${t('phosphorus')} (P)`,
      short: 'P',
      currentSoil: input.P,
      optimalTarget: profile.mean.P,
      idealMin: profile.ideal.P[0],
      idealMax: profile.ideal.P[1],
      unit: 'mg/kg'
    },
    {
      nutrient: `${t('potassium')} (K)`,
      short: 'K',
      currentSoil: input.K,
      optimalTarget: profile.mean.K,
      idealMin: profile.ideal.K[0],
      idealMax: profile.ideal.K[1],
      unit: 'mg/kg'
    }
  ];

  // Normalized % of optimal target (100% = exact target)
  const normalizedChartData = rawChartData.map((item) => {
    const target = item.optimalTarget || 1;
    const currentPercent = Math.min(180, Math.round((item.currentSoil / target) * 100));
    const minPercent = Math.round((item.idealMin / target) * 100);
    const maxPercent = Math.round((item.idealMax / target) * 100);

    return {
      nutrient: item.nutrient,
      short: item.short,
      currentSoil: currentPercent,
      optimalTarget: 100,
      idealMin: minPercent,
      idealMax: maxPercent,
      unit: '%'
    };
  });

  const chartData = viewMode === 'actual' ? rawChartData : normalizedChartData;

  const getNutrientStatus = (val: number, min: number, max: number) => {
    if (val < min) {
      return { status: t('deficiency'), color: 'text-amber-700 bg-amber-50 border-amber-200', icon: ArrowDownRight };
    }
    if (val > max) {
      return { status: t('surplus'), color: 'text-rose-700 bg-rose-50 border-rose-200', icon: ArrowUpRight };
    }
    return { status: t('optimal'), color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2 };
  };

  return (
    <div
      id="soil-nutrient-radar-container"
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t('radarChartTitle')}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {t('interactiveRadar')}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t('radarChartSub')}{' '}
            <strong className="text-emerald-700 font-bold">{localizeCropName(profile.name)}</strong>
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            id="radar-btn-actual"
            onClick={() => setViewMode('actual')}
            className={`px-2.5 py-1 rounded-lg transition ${
              viewMode === 'actual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('directValues')}
          </button>
          <button
            type="button"
            id="radar-btn-normalized"
            onClick={() => setViewMode('normalized')}
            className={`px-2.5 py-1 rounded-lg transition ${
              viewMode === 'normalized'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('targetFitPct')}
          </button>
        </div>
      </div>

      {/* Main Radar Display & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
        
        {/* Radar Chart */}
        <div className="md:col-span-7 h-64 sm:h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="nutrient"
                tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 'auto']}
                tick={{ fill: '#94a3b8', fontSize: 9 }}
              />
              
              {/* Target / Optimal Requirement Radar */}
              <Radar
                name={`${localizeCropName(profile.name)} ${t('optimalTargetLabel')}`}
                dataKey="optimalTarget"
                stroke="#6366f1"
                fill="#818cf8"
                fillOpacity={0.25}
                strokeWidth={2}
                strokeDasharray="4 4"
              />

              {/* Current Field Soil Radar */}
              <Radar
                name={t('yourSoil')}
                dataKey="currentSoil"
                stroke="#059669"
                fill="#10b981"
                fillOpacity={0.45}
                strokeWidth={2.5}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <p className="font-bold text-emerald-300">{data.nutrient}</p>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>{t('yourSoil')}:</span>
                          <span className="font-mono font-bold text-white">
                            {data.currentSoil} {data.unit}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>{t('optimalTargetLabel')}:</span>
                          <span className="font-mono font-bold text-indigo-300">
                            {data.optimalTarget} {data.unit}
                          </span>
                        </div>
                        {viewMode === 'actual' && (
                          <div className="flex justify-between gap-4 text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                            <span>{t('idealBand')}:</span>
                            <span className="font-mono">
                              {data.idealMin} – {data.idealMax} mg/kg
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* NPK Analytical Breakdown Badges */}
        <div className="md:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            {t('nutrientDemandHeading')}
          </div>

          {rawChartData.map((item) => {
            const statusInfo = getNutrientStatus(item.currentSoil, item.idealMin, item.idealMax);
            const StatusIcon = statusInfo.icon;
            const diff = item.currentSoil - item.optimalTarget;

            return (
              <div
                key={item.short}
                id={`nutrient-card-${item.short.toLowerCase()}`}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {item.short === 'N' && <Leaf className="w-3.5 h-3.5 text-emerald-600" />}
                    {item.short === 'P' && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                    {item.short === 'K' && <Flame className="w-3.5 h-3.5 text-orange-600" />}
                    <span className="text-xs font-bold text-slate-800">{item.nutrient}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.color}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('currentSoilLabel')}</span>
                    <span className="font-mono font-extrabold text-slate-900">
                      {item.currentSoil} <span className="text-[10px] font-normal text-slate-500">mg/kg</span>
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('optimalTargetLabel')}</span>
                    <span className="font-mono font-bold text-indigo-700">
                      {item.optimalTarget} <span className="text-[10px] font-normal text-slate-500">mg/kg</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('variance')}</span>
                    <span
                      className={`font-mono font-bold text-[11px] ${
                        diff === 0 ? 'text-slate-600' : diff > 0 ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      {diff > 0 ? `+${diff}` : diff} mg/kg
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Soil Ratio Insight */}
          <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-950 flex items-start gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t('soilRatioInsight')}: </span>
              <span className="font-mono font-semibold">
                {(input.N / (input.K || 1)).toFixed(1)} : {(input.P / (input.K || 1)).toFixed(1)} : 1
              </span>
              <span className="block text-indigo-800 text-[10px] mt-0.5">
                {t('targetRatioForCrop')} {localizeCropName(profile.name)}:{' '}
                <span className="font-mono font-medium">
                  {(profile.mean.N / (profile.mean.K || 1)).toFixed(1)} :{' '}
                  {(profile.mean.P / (profile.mean.K || 1)).toFixed(1)} : 1
                </span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
