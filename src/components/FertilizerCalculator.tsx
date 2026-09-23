import React, { useState, useMemo } from 'react';
import { CropInput, CropProfile } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Calculator,
  Layers,
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Package,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';

interface FertilizerCalculatorProps {
  input: CropInput;
  profile: CropProfile;
}

type FertilizerStrategy = 'urea-dap-mop' | 'urea-ssp-mop' | 'organic-fym';
type AreaUnit = 'hectares' | 'acres';

export const FertilizerCalculator: React.FC<FertilizerCalculatorProps> = ({ input, profile }) => {
  const { t, localizeCropName } = useTranslation();
  const [areaSize, setAreaSize] = useState<number>(1.0);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('hectares');
  const [strategy, setStrategy] = useState<FertilizerStrategy>('urea-dap-mop');
  const [bagWeightKg, setBagWeightKg] = useState<number>(50); // 50kg standard bag
  const [showScheduleDetails, setShowScheduleDetails] = useState<boolean>(true);


  // Convert area to hectares for calculation (1 hectare = 2.47105 acres)
  const areaInHectares = areaUnit === 'hectares' ? areaSize : areaSize / 2.47105;

  // 1 mg/kg (ppm) in top 15cm soil layer ≈ 2.0 kg/ha of elemental nutrient
  const soilConversionFactor = 2.0;

  // Calculate Soil-Test Deficits per hectare (kg/ha)
  const targetN_kgHa = profile.mean.N * soilConversionFactor;
  const targetP_kgHa = profile.mean.P * soilConversionFactor;
  const targetK_kgHa = profile.mean.K * soilConversionFactor;

  const currentN_kgHa = input.N * soilConversionFactor;
  const currentP_kgHa = input.P * soilConversionFactor;
  const currentK_kgHa = input.K * soilConversionFactor;

  const deficitN_kgHa = Math.max(0, targetN_kgHa - currentN_kgHa);
  const deficitP_kgHa = Math.max(0, targetP_kgHa - currentP_kgHa);
  const deficitK_kgHa = Math.max(0, targetK_kgHa - currentK_kgHa);

  // Total field deficit
  const totalFieldDeficitN = deficitN_kgHa * areaInHectares;
  const totalFieldDeficitP = deficitP_kgHa * areaInHectares;
  const totalFieldDeficitK = deficitK_kgHa * areaInHectares;

  // Fertilizer Quantities Calculation
  const calculation = useMemo(() => {
    if (strategy === 'urea-dap-mop') {
      // 1. DAP (18% N, 46% P2O5): used to meet P deficit
      // P deficit (kg) -> DAP required = P / 0.46
      const dapKg = deficitP_kgHa > 0 ? (totalFieldDeficitP / 0.46) : 0;
      const nSuppliedByDap = dapKg * 0.18;

      // 2. Urea (46% N): meet remaining N deficit
      const remainingDeficitN = Math.max(0, totalFieldDeficitN - nSuppliedByDap);
      const ureaKg = remainingDeficitN > 0 ? (remainingDeficitN / 0.46) : 0;

      // 3. MOP (60% K2O): meet K deficit
      const mopKg = deficitK_kgHa > 0 ? (totalFieldDeficitK / 0.60) : 0;

      return [
        {
          id: 'urea',
          name: 'Urea',
          formula: '46-0-0',
          nutrient: 'Nitrogen (N)',
          totalKg: Math.round(ureaKg),
          bags: (ureaKg / bagWeightKg).toFixed(1),
          // Recommended split schedule: 30% basal, 40% tillering, 30% flowering
          basalKg: Math.round(ureaKg * 0.30),
          topDress1Kg: Math.round(ureaKg * 0.40),
          topDress2Kg: Math.round(ureaKg * 0.30),
          color: 'emerald',
          description: 'High-analysis nitrogen fertilizer promoting vegetative foliage & tillering'
        },
        {
          id: 'dap',
          name: 'DAP (Di-ammonium Phosphate)',
          formula: '18-46-0',
          nutrient: 'Phosphorus (P) + starter N',
          totalKg: Math.round(dapKg),
          bags: (dapKg / bagWeightKg).toFixed(1),
          // 100% basal applied at sowing/transplanting
          basalKg: Math.round(dapKg),
          topDress1Kg: 0,
          topDress2Kg: 0,
          color: 'indigo',
          description: 'Essential for root architecture, seed setting & early seedling establishment'
        },
        {
          id: 'mop',
          name: 'MOP (Muriate of Potash)',
          formula: '0-0-60',
          nutrient: 'Potassium (K)',
          totalKg: Math.round(mopKg),
          bags: (mopKg / bagWeightKg).toFixed(1),
          // 50% basal, 50% at panicle/flowering stage
          basalKg: Math.round(mopKg * 0.50),
          topDress1Kg: 0,
          topDress2Kg: Math.round(mopKg * 0.50),
          color: 'amber',
          description: 'Builds stalk strength, disease tolerance & fruit/grain filling'
        }
      ];
    } else if (strategy === 'urea-ssp-mop') {
      // SSP: 16% P2O5 (also contains 11% Sulfur and 19% Calcium)
      const sspKg = deficitP_kgHa > 0 ? (totalFieldDeficitP / 0.16) : 0;
      const ureaKg = totalFieldDeficitN > 0 ? (totalFieldDeficitN / 0.46) : 0;
      const mopKg = deficitK_kgHa > 0 ? (totalFieldDeficitK / 0.60) : 0;

      return [
        {
          id: 'urea',
          name: 'Urea',
          formula: '46-0-0',
          nutrient: 'Nitrogen (N)',
          totalKg: Math.round(ureaKg),
          bags: (ureaKg / bagWeightKg).toFixed(1),
          basalKg: Math.round(ureaKg * 0.33),
          topDress1Kg: Math.round(ureaKg * 0.33),
          topDress2Kg: Math.round(ureaKg * 0.34),
          color: 'emerald',
          description: 'Provides soluble nitrogen for rapid foliage expansion'
        },
        {
          id: 'ssp',
          name: 'SSP (Single Super Phosphate)',
          formula: '0-16-0 + 11% S',
          nutrient: 'Phosphorus (P) + Calcium + Sulfur',
          totalKg: Math.round(sspKg),
          bags: (sspKg / bagWeightKg).toFixed(1),
          basalKg: Math.round(sspKg),
          topDress1Kg: 0,
          topDress2Kg: 0,
          color: 'indigo',
          description: 'Includes sulfur and calcium, ideal for oilseeds, pulses and sulfur-deficient fields'
        },
        {
          id: 'mop',
          name: 'MOP (Muriate of Potash)',
          formula: '0-0-60',
          nutrient: 'Potassium (K)',
          totalKg: Math.round(mopKg),
          bags: (mopKg / bagWeightKg).toFixed(1),
          basalKg: Math.round(mopKg * 0.50),
          topDress1Kg: 0,
          topDress2Kg: Math.round(mopKg * 0.50),
          color: 'amber',
          description: 'Regulates water transpiration and stomatal conductance'
        }
      ];
    } else {
      // Organic FYM & Bio-Fertilizer Option
      // FYM (Farmyard Manure): ~0.5% N, 0.2% P, 0.5% K
      // 1 ton FYM gives ~5kg N, 2kg P, 5kg K
      const maxDeficit = Math.max(totalFieldDeficitN, totalFieldDeficitP * 2.5, totalFieldDeficitK);
      const fymTons = maxDeficit > 0 ? Math.max(2, Math.round((maxDeficit / 5) * 10) / 10) : 2;
      const rockPhosphateKg = deficitP_kgHa > 0 ? Math.round(totalFieldDeficitP / 0.20) : 0;
      const woodAshKg = deficitK_kgHa > 0 ? Math.round(totalFieldDeficitK / 0.08) : 0;

      return [
        {
          id: 'fym',
          name: 'Well-Decomposed Farmyard Manure (FYM)',
          formula: '0.5-0.2-0.5 + Organic Carbon',
          nutrient: 'Humus + Balanced NPK Micro-flora',
          totalKg: Math.round(fymTons * 1000),
          bags: `${fymTons} Metric Tons`,
          basalKg: Math.round(fymTons * 1000),
          topDress1Kg: 0,
          topDress2Kg: 0,
          color: 'emerald',
          description: 'Improves soil water-holding capacity, microbial diversity & cation exchange capacity'
        },
        {
          id: 'rock_phosphate',
          name: 'Rock Phosphate / Bone Meal',
          formula: '20% Slow-Release P2O5',
          nutrient: 'Organic Phosphorus',
          totalKg: rockPhosphateKg,
          bags: (rockPhosphateKg / bagWeightKg).toFixed(1),
          basalKg: rockPhosphateKg,
          topDress1Kg: 0,
          topDress2Kg: 0,
          color: 'indigo',
          description: 'Natural mineral phosphorus for sustained long-term root mycorrhizae'
        },
        {
          id: 'wood_ash',
          name: 'Wood Ash / Bio-Potash',
          formula: 'Organic K2O + Micronutrients',
          nutrient: 'Potassium & Trace Minerals',
          totalKg: woodAshKg,
          bags: (woodAshKg / bagWeightKg).toFixed(1),
          basalKg: Math.round(woodAshKg * 0.6),
          topDress1Kg: Math.round(woodAshKg * 0.4),
          topDress2Kg: 0,
          color: 'amber',
          description: 'Rich in potassium carbonate and trace minerals for fruit firmness'
        }
      ];
    }
  }, [strategy, totalFieldDeficitN, totalFieldDeficitP, totalFieldDeficitK, bagWeightKg]);

  const hasDeficits = totalFieldDeficitN > 0 || totalFieldDeficitP > 0 || totalFieldDeficitK > 0;

  return (
    <div
      id="fertilizer-calculator-card"
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Calculator className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              {t('fertilizerPlanTitle')}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800">
              {t('customDoseTag')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('fertilizerPlanSub')}{' '}
            <strong className="text-emerald-700 font-semibold">{localizeCropName(profile.name)}</strong> ({t('optimalTargetLabel')}).
          </p>
        </div>

        {/* Bag size selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-slate-500 text-[11px] font-medium">{t('bagSizeLabel')}:</span>
          <select
            id="fertilizer-bag-size-select"
            value={bagWeightKg}
            onChange={(e) => setBagWeightKg(Number(e.target.value))}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-xs focus:ring-2 focus:ring-emerald-500"
          >
            <option value={50}>50 kg {t('bagsCount')}</option>
            <option value={45}>45 kg {t('bagsCount')}</option>
            <option value={25}>25 kg {t('bagsCount')}</option>
          </select>
        </div>
      </div>

      {/* Field Size & Carrier Program Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
        
        {/* Field Area Input */}
        <div className="sm:col-span-6 space-y-1.5">
          <label htmlFor="field-area-input" className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>{t('farmPlotSize')}</span>
            <span className="text-[11px] font-normal text-slate-500">
              ≈ {areaInHectares.toFixed(2)} ha ({(areaInHectares * 2.471).toFixed(2)} ac)
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="field-area-input"
              type="number"
              min="0.1"
              max="500"
              step="0.1"
              value={areaSize}
              onChange={(e) => setAreaSize(Math.max(0.1, Number(e.target.value)))}
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
            />
            <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-white text-xs font-semibold">
              <button
                type="button"
                id="btn-unit-ha"
                onClick={() => setAreaUnit('hectares')}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  areaUnit === 'hectares'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('hectares')}
              </button>
              <button
                type="button"
                id="btn-unit-ac"
                onClick={() => setAreaUnit('acres')}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  areaUnit === 'acres'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('acres')}
              </button>
            </div>
          </div>
        </div>

        {/* Fertilizer Package Strategy */}
        <div className="sm:col-span-6 space-y-1.5">
          <label htmlFor="fertilizer-strategy-select" className="text-xs font-bold text-slate-700 block">
            {t('nutrientStrategy')}
          </label>
          <select
            id="fertilizer-strategy-select"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as FertilizerStrategy)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          >
            <option value="urea-dap-mop">{t('strategyUreaDapMop')}</option>
            <option value="urea-ssp-mop">{t('strategyUreaSspMop')}</option>
            <option value="organic-fym">{t('strategyOrganicFym')}</option>
          </select>
        </div>

      </div>

      {/* Soil Gap Visual Meter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>{t('totalFieldGap')}</span>
          <span className="text-[11px] font-normal text-slate-500">
            {t('dosePerHa')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Nitrogen Gap */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{t('nitrogen')} (N)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                deficitN_kgHa > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {deficitN_kgHa > 0 ? `-${Math.round(deficitN_kgHa)} kg/ha` : t('balanced')}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
              <span>{t('yourSoil')}: {Math.round(currentN_kgHa)} kg/ha</span>
              <span>{t('optimalTargetLabel')}: {Math.round(targetN_kgHa)} kg/ha</span>
            </div>
          </div>

          {/* Phosphorus Gap */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{t('phosphorus')} (P)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                deficitP_kgHa > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {deficitP_kgHa > 0 ? `-${Math.round(deficitP_kgHa)} kg/ha` : t('balanced')}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
              <span>{t('yourSoil')}: {Math.round(currentP_kgHa)} kg/ha</span>
              <span>{t('optimalTargetLabel')}: {Math.round(targetP_kgHa)} kg/ha</span>
            </div>
          </div>

          {/* Potassium Gap */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{t('potassium')} (K)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                deficitK_kgHa > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {deficitK_kgHa > 0 ? `-${Math.round(deficitK_kgHa)} kg/ha` : t('balanced')}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
              <span>{t('yourSoil')}: {Math.round(currentK_kgHa)} kg/ha</span>
              <span>{t('optimalTargetLabel')}: {Math.round(targetK_kgHa)} kg/ha</span>
            </div>
          </div>

        </div>
      </div>

      {/* Calculated Fertilizer Quantities Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t('totalKgNeeded')} — {areaSize} {areaUnit === 'hectares' ? t('hectares') : t('acres')}
          </span>
          <span className="text-xs text-emerald-700 font-semibold">
            {localizeCropName(profile.name)} ({t('customDoseTag')})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {calculation.map((fert) => (
            <div
              key={fert.id}
              id={`fertilizer-card-${fert.id}`}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{fert.name}</h4>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {fert.formula}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-emerald-700 block">
                      {fert.totalKg.toLocaleString()} <span className="text-xs font-medium">kg</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      ≈ {fert.bags} {strategy === 'organic-fym' && fert.id === 'fym' ? '' : t('bagsCount')}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  {fert.description}
                </p>
              </div>

              {/* Split Dose Micro-Table */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {t('splitScheduleHeading')}
                </div>
                <div className="grid grid-cols-3 gap-1 text-center font-mono">
                  <div className="p-1 rounded bg-slate-50">
                    <span className="text-[9px] text-slate-400 block font-sans">{t('basalDose')}</span>
                    <span className="font-bold text-slate-800">{fert.basalKg} kg</span>
                  </div>
                  <div className="p-1 rounded bg-slate-50">
                    <span className="text-[9px] text-slate-400 block font-sans">{t('topDress1')}</span>
                    <span className="font-bold text-slate-800">{fert.topDress1Kg} kg</span>
                  </div>
                  <div className="p-1 rounded bg-slate-50">
                    <span className="text-[9px] text-slate-400 block font-sans">{t('topDress2')}</span>
                    <span className="font-bold text-slate-800">{fert.topDress2Kg} kg</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Field Application Timing & Agronomic Protocol */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <button
          type="button"
          id="btn-toggle-fertilizer-schedule"
          onClick={() => setShowScheduleDetails(!showScheduleDetails)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{t('splitScheduleHeading')}</span>
          </div>
          {showScheduleDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showScheduleDetails && (
          <div className="mt-3 pt-3 border-t border-slate-200/70 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
              <span className="font-bold text-emerald-800 block mb-1">
                {t('atSowingStage')}
              </span>
              <p className="text-[11px] leading-relaxed">
                Incorporate all Phosphatic fertilizers (DAP/SSP), half of Potash (MOP), and ~25–33% of Nitrogen at 5–7 cm depth during the final land preparation or furrow opening to feed initial seedling roots.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
              <span className="font-bold text-emerald-800 block mb-1">
                {t('vegetativeStage')}
              </span>
              <p className="text-[11px] leading-relaxed">
                Apply first top-dressing of Urea (~25–35 days after sowing/planting). Ensure adequate soil moisture or irrigate within 24 hours to prevent ammonia volatilization.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
              <span className="font-bold text-emerald-800 block mb-1">
                {t('panicleStage')}
              </span>
              <p className="text-[11px] leading-relaxed">
                Apply final top-dressing of Urea and remaining MOP. Potassium at this reproductive juncture facilitates starch grain filling, enhances test weight, and prevents lodging.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Nitrogen Best Practice Note */}
      {profile.nitrogenAdvice && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{t('nutrientDemandHeading')} {localizeCropName(profile.name)}: </span>
            <span>{profile.nitrogenAdvice}</span>
          </div>
        </div>
      )}

    </div>
  );
};
