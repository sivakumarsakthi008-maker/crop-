import React, { useState } from 'react';
import { CropProfile } from '../types';
import { saveCustomCrop } from '../data/crops';
import { useTranslation } from '../i18n/LanguageContext';
import { X, Plus, Sparkles, Sprout, Check } from 'lucide-react';

interface AddCustomCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropAdded: (newCrop: CropProfile) => void;
}

const CATEGORIES = [
  'Cereal & Grain',
  'Vegetable Crop',
  'Fruit Crop',
  'Pulse & Legume',
  'Cash & Fiber Crop',
  'Oilseed Crop',
  'Spices & Condiments',
  'Plantation Crop'
];

const EMOJIS = ['🌱', '🍅', '🥔', '🥕', '🧄', '🧅', '🍓', '🍇', '🌻', '🌾', '🌽', '🫘', '🥦', '🌶️', '🥑', '🍍', '🌿', '🪵'];

export const AddCustomCropModal: React.FC<AddCustomCropModalProps> = ({
  isOpen,
  onClose,
  onCropAdded
}) => {
  const { t, localizeCategory } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [icon, setIcon] = useState('🍅');
  const [nMin, setNMin] = useState(60);
  const [nMax, setNMax] = useState(90);
  const [pMin, setPMin] = useState(40);
  const [pMax, setPMax] = useState(65);
  const [kMin, setKMin] = useState(30);
  const [kMax, setKMax] = useState(55);
  const [tempMin, setTempMin] = useState(20.0);
  const [tempMax, setTempMax] = useState(30.0);
  const [humidMin, setHumidMin] = useState(50.0);
  const [humidMax, setHumidMax] = useState(75.0);
  const [phMin, setPhMin] = useState(6.0);
  const [phMax, setPhMax] = useState(7.0);
  const [rainMin, setRainMin] = useState(60.0);
  const [rainMax, setRainMax] = useState(120.0);
  const [sowingSeason, setSowingSeason] = useState('Spring / Post-frost');
  const [harvestTime, setHarvestTime] = useState('75 – 95 days');
  const [soilType, setSoilType] = useState('Fertile, loose loam with high organic matter');
  const [waterManagement, setWaterManagement] = useState('Consistent moisture; drip irrigation recommended.');
  const [nitrogenAdvice, setNitrogenAdvice] = useState('Balanced fertilizer; side-dress before flowering.');
  const [expectedYield, setExpectedYield] = useState('20 – 35 tons/hectare');
  const [companionCrops, setCompanionCrops] = useState('Basil, marigold, carrots');
  const [description, setDescription] = useState('High-value crop requiring sunny days and well-aerated soil.');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(t('fillRequiredFields'));
      return;
    }

    if (nMin > nMax || pMin > pMax || kMin > kMax || tempMin > tempMax || humidMin > humidMax || phMin > phMax || rainMin > rainMax) {
      setError(t('fillRequiredFields'));
      return;
    }

    const meanN = Math.round((nMin + nMax) / 2);
    const meanP = Math.round((pMin + pMax) / 2);
    const meanK = Math.round((kMin + kMax) / 2);
    const meanTemp = Number(((tempMin + tempMax) / 2).toFixed(1));
    const meanHumid = Number(((humidMin + humidMax) / 2).toFixed(1));
    const meanPh = Number(((phMin + phMax) / 2).toFixed(1));
    const meanRain = Number(((rainMin + rainMax) / 2).toFixed(1));

    const newProfile: CropProfile = {
      name: name.trim(),
      category,
      icon,
      ideal: {
        N: [nMin, nMax],
        P: [pMin, pMax],
        K: [kMin, kMax],
        temperature: [tempMin, tempMax],
        humidity: [humidMin, humidMax],
        ph: [phMin, phMax],
        rainfall: [rainMin, rainMax]
      },
      mean: {
        N: meanN,
        P: meanP,
        K: meanK,
        temperature: meanTemp,
        humidity: meanHumid,
        ph: meanPh,
        rainfall: meanRain
      },
      std: {
        N: Math.max(3, (nMax - nMin) / 3),
        P: Math.max(3, (pMax - pMin) / 3),
        K: Math.max(3, (kMax - kMin) / 3),
        temperature: Math.max(1.5, (tempMax - tempMin) / 3),
        humidity: Math.max(3, (humidMax - humidMin) / 3),
        ph: Math.max(0.3, (phMax - phMin) / 3),
        rainfall: Math.max(8, (rainMax - rainMin) / 3)
      },
      description: description.trim() || `Locally customized crop profile for ${name}.`,
      soilType,
      sowingSeason,
      harvestTime,
      waterManagement,
      nitrogenAdvice,
      expectedYield,
      companionCrops,
      isCustom: true
    };

    saveCustomCrop(newProfile);
    onCropAdded(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">{t('addCropTitle')}</h3>
              <p className="text-xs text-slate-400">{t('addCropSub')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">1. {t('cropCatalog')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('cropNameLabel')} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomato, Soybean, Sunflower..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('category')}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{localizeCategory(cat)}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('cropIconLabel')}</label>
                <div className="flex items-center gap-1">
                  <span className="text-2xl p-1 bg-slate-100 rounded-lg">{icon}</span>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="text-xs rounded-lg border border-slate-300 p-1.5 bg-white"
                  >
                    {EMOJIS.map(em => <option key={em} value={em}>{em}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Soil Nutrients Range */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">2. {t('soilParameters')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">{t('nitrogen')} (N)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={nMin}
                    onChange={(e) => setNMin(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Min"
                  />
                  <span className="text-slate-400">–</span>
                  <input
                    type="number"
                    value={nMax}
                    onChange={(e) => setNMax(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">{t('phosphorus')} (P)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pMin}
                    onChange={(e) => setPMin(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Min"
                  />
                  <span className="text-slate-400">–</span>
                  <input
                    type="number"
                    value={pMax}
                    onChange={(e) => setPMax(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">{t('potassium')} (K)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kMin}
                    onChange={(e) => setKMin(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Min"
                  />
                  <span className="text-slate-400">–</span>
                  <input
                    type="number"
                    value={kMax}
                    onChange={(e) => setKMax(Number(e.target.value))}
                    className="w-full p-1.5 text-xs text-center border rounded-lg bg-white"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Climate Requirements */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">3. {t('climateParameters')}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">{t('temperature')} (°C)</span>
                <div className="flex items-center gap-1">
                  <input type="number" step="0.1" value={tempMin} onChange={e => setTempMin(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                  <span>-</span>
                  <input type="number" step="0.1" value={tempMax} onChange={e => setTempMax(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">{t('humidity')} (%)</span>
                <div className="flex items-center gap-1">
                  <input type="number" step="0.1" value={humidMin} onChange={e => setHumidMin(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                  <span>-</span>
                  <input type="number" step="0.1" value={humidMax} onChange={e => setHumidMax(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">{t('ph')}</span>
                <div className="flex items-center gap-1">
                  <input type="number" step="0.1" value={phMin} onChange={e => setPhMin(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                  <span>-</span>
                  <input type="number" step="0.1" value={phMax} onChange={e => setPhMax(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">{t('rainfall')} (mm)</span>
                <div className="flex items-center gap-1">
                  <input type="number" step="1" value={rainMin} onChange={e => setRainMin(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                  <span>-</span>
                  <input type="number" step="1" value={rainMax} onChange={e => setRainMax(Number(e.target.value))} className="w-full p-1 text-xs text-center border rounded bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Practical Farming Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">4. {t('agronomicGuidance')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('growingSeason')}</label>
                <input
                  type="text"
                  value={sowingSeason}
                  onChange={(e) => setSowingSeason(e.target.value)}
                  placeholder="e.g. Spring, Monsoon, Kharif"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('harvestTimeLabel')}</label>
                <input
                  type="text"
                  value={harvestTime}
                  onChange={(e) => setHarvestTime(e.target.value)}
                  placeholder="e.g. 90 – 120 days"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('yieldPotential')}</label>
                <input
                  type="text"
                  value={expectedYield}
                  onChange={(e) => setExpectedYield(e.target.value)}
                  placeholder="e.g. 3.0 – 5.0 tons/ha"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('companionCropsLabel')}</label>
                <input
                  type="text"
                  value={companionCrops}
                  onChange={(e) => setCompanionCrops(e.target.value)}
                  placeholder="e.g. Beans, marigold, corn"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('waterReq')}</label>
                <input
                  type="text"
                  value={waterManagement}
                  onChange={(e) => setWaterManagement(e.target.value)}
                  placeholder="Irrigation schedule, critical watering stages..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('nutrientDemandHeading')}</label>
                <input
                  type="text"
                  value={nitrogenAdvice}
                  onChange={(e) => setNitrogenAdvice(e.target.value)}
                  placeholder="Fertilizer split, organic manure tips..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <Check className="w-4 h-4" />
              <span>{t('saveCropButton')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
