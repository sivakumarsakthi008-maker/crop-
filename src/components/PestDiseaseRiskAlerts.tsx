import React, { useState } from 'react';
import { PestRiskSummary, EvaluatedPestRisk, RiskLevel } from '../utils/pestRiskEngine';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Bug,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Thermometer,
  Droplets,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Biohazard,
  Sprout,
  Pill,
  Leaf
} from 'lucide-react';

interface PestDiseaseRiskAlertsProps {
  summary: PestRiskSummary;
  isLiveWeather?: boolean;
}

export const PestDiseaseRiskAlerts: React.FC<PestDiseaseRiskAlertsProps> = ({ summary, isLiveWeather }) => {
  const { t, localizeCropName } = useTranslation();
  const [filterType, setFilterType] = useState<'all' | 'high' | 'fungal' | 'insect'>('all');
  const [expandedThreatId, setExpandedThreatId] = useState<string | null>(
    summary.highRiskCount > 0 && summary.dominantThreat ? summary.dominantThreat.threat.id : null
  );

  const { evaluatedThreats, highRiskCount, moderateRiskCount, cropName, temperature, humidity } = summary;

  const filteredThreats = evaluatedThreats.filter((item) => {
    if (filterType === 'high') return item.riskLevel === 'High';
    if (filterType === 'fungal') return item.threat.type === 'fungal' || item.threat.type === 'bacterial';
    if (filterType === 'insect') return item.threat.type === 'insect';
    return true;
  });

  const getRiskBadge = (level: RiskLevel) => {
    if (level === 'High') {
      return {
        label: t('highRisk'),
        bg: 'bg-rose-100 text-rose-800 border-rose-200',
        dot: 'bg-rose-500 animate-pulse',
        icon: AlertTriangle
      };
    }
    if (level === 'Moderate') {
      return {
        label: t('moderateRisk'),
        bg: 'bg-amber-100 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        icon: AlertTriangle
      };
    }
    return {
      label: t('lowRisk'),
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: ShieldCheck
    };
  };

  return (
    <div
      id="pest-disease-risk-container"
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Bug className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              {t('pestAlertsTitle')}
            </h3>
            {highRiskCount > 0 ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                {highRiskCount} {t('highRiskThreats')}
              </span>
            ) : moderateRiskCount > 0 ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {moderateRiskCount} {t('elevatedRisk')}
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {t('lowDiseasePressure')}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('pestAlertsSub')}{' '}
            <strong className="text-emerald-700 font-semibold">{localizeCropName(cropName)}</strong> ({temperature}°C, {humidity}% RH).
          </p>
        </div>

        {/* Live Weather Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
            <Thermometer className="w-3.5 h-3.5 text-rose-500" />
            <span>{temperature}°C</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>{humidity}% RH</span>
          </div>
        </div>
      </div>

      {/* Primary Alert Banner */}
      {highRiskCount > 0 ? (
        <div className="p-4 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-950 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-rose-900 text-sm">
              {t('criticalWeatherWindow')}
            </h4>
            <p className="text-rose-800 leading-relaxed">
              Ambient temperature ({temperature}°C) and relative humidity ({humidity}%) closely match the incubation window for{' '}
              <strong>{summary.dominantThreat?.threat.name}</strong>. Field scouting and prophylactic organic bio-washes are strongly recommended before canopy spore colonization sets in.
            </p>
          </div>
        </div>
      ) : moderateRiskCount > 0 ? (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-amber-900 text-sm">
              {t('elevatedCautionTitle')}
            </h4>
            <p className="text-amber-800 leading-relaxed">
              Conditions are approaching trigger ranges for certain crop pests. Inspect lower canopy leaves, leaf undersides, and nursery beds during early morning scouting.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-xs text-emerald-900">
            <strong>{t('optimalDefenseTitle')}:</strong> Current weather levels do not favor widespread fungal germination or pest flare-ups for {localizeCropName(cropName)}. Maintain standard cultural hygiene.
          </p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          id="pest-filter-all"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
            filterType === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('filterAllThreats')} ({evaluatedThreats.length})
        </button>
        {highRiskCount > 0 && (
          <button
            type="button"
            id="pest-filter-high"
            onClick={() => setFilterType('high')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              filterType === 'high'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {t('filterHighAlert')} ({highRiskCount})
          </button>
        )}
        <button
          type="button"
          id="pest-filter-fungal"
          onClick={() => setFilterType('fungal')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
            filterType === 'fungal'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('filterFungal')}
        </button>
        <button
          type="button"
          id="pest-filter-insect"
          onClick={() => setFilterType('insect')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
            filterType === 'insect'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('filterInsect')}
        </button>
      </div>

      {/* Evaluated Threats List */}
      <div className="space-y-3">
        {filteredThreats.map((item) => {
          const { threat, riskLevel, riskScore, environmentalTriggerDiagnosis } = item;
          const badge = getRiskBadge(riskLevel);
          const isExpanded = expandedThreatId === threat.id;

          return (
            <div
              key={threat.id}
              id={`threat-card-${threat.id}`}
              className={`rounded-xl border transition duration-200 ${
                riskLevel === 'High'
                  ? 'border-rose-300 bg-rose-50/20 shadow-xs'
                  : riskLevel === 'Moderate'
                  ? 'border-amber-200 bg-amber-50/15'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Header / Summary Row */}
              <div
                onClick={() => setExpandedThreatId(isExpanded ? null : threat.id)}
                className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      {threat.name}
                    </span>
                    <span className="italic text-slate-500 text-xs">
                      ({threat.scientificName})
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wide">
                      {threat.type}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-1">
                    {environmentalTriggerDiagnosis}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                  {/* Climate Danger Range Badges */}
                  <div className="hidden md:flex items-center gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      T: {threat.tempRange[0]}–{threat.tempRange[1]}°C
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      RH: {threat.humidityRange[0]}–{threat.humidityRange[1]}%
                    </span>
                  </div>

                  {/* Risk Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label} ({riskScore}%)
                  </span>

                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Diagnostic & IPM Protocol */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100/90 space-y-4">
                  
                  {/* Microclimate Trigger Analysis */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                    <span className="font-bold text-slate-800 block uppercase tracking-wider text-[10px]">
                      {t('triggerMatrix')}
                    </span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      <strong>{t('incubationDriver')}:</strong> {threat.primaryTrigger}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 text-[10px] block font-sans">{t('tempTriggerWindow')}</span>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="font-bold text-slate-800">{threat.tempRange[0]} – {threat.tempRange[1]} °C</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
                            temperature >= threat.tempRange[0] && temperature <= threat.tempRange[1]
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {t('yourFieldCurrent')}: {temperature}°C
                          </span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 text-[10px] block font-sans">{t('humidityTriggerWindow')}</span>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="font-bold text-slate-800">{threat.humidityRange[0]} – {threat.humidityRange[1]} %</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
                            humidity >= threat.humidityRange[0] && humidity <= threat.humidityRange[1]
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {t('yourFieldCurrent')}: {humidity}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Early Symptoms to Scout */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-slate-600" />
                      {t('whatToLookFor')}
                    </span>
                    <ul className="space-y-1 pl-1">
                      {threat.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600 text-[11px] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preventive Agronomic Controls */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      {t('preventiveAgro')}
                    </span>
                    <ul className="space-y-1 pl-1">
                      {threat.preventiveMeasures.map((measure, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600 text-[11px] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integrated Pest Management (IPM) Interventions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    
                    {/* Organic / Bio-control */}
                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                        <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t('organicControl')}</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        {threat.organicControl}
                      </p>
                    </div>

                    {/* Chemical Intervention */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                        <Pill className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{t('chemicalControl')}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-mono">
                        {threat.chemicalControl}
                      </p>
                    </div>

                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
