import React, { useState } from 'react';
import { CropProfile } from '../types';
import { getAllCrops, deleteCustomCrop } from '../data/crops';
import { useTranslation } from '../i18n/LanguageContext';
import { X, Plus, Trash2, Sprout, Search, ArrowRight, CheckCircle, Droplet, Calendar, TrendingUp } from 'lucide-react';

interface CropCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTargetCrop: (cropName: string) => void;
  onOpenAddModal: () => void;
  refreshTrigger: number;
}

export const CropCatalogModal: React.FC<CropCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectTargetCrop,
  onOpenAddModal,
  refreshTrigger
}) => {
  const { t, localizeCropName, localizeCategory } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const allCropsObj = getAllCrops();
  const allCropsList = Object.values(allCropsObj);

  const categories = ['All', ...Array.from(new Set(allCropsList.map(c => c.category)))];

  const filteredCrops = allCropsList.filter(crop => {
    const locName = localizeCropName(crop.name);
    const locCat = localizeCategory(crop.category);
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
                          locName.toLowerCase().includes(search.toLowerCase()) ||
                          crop.category.toLowerCase().includes(search.toLowerCase()) ||
                          locCat.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (cropName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove ${localizeCropName(cropName)} from your custom crops?`)) {
      deleteCustomCrop(cropName);
      // Trigger update
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{t('cropCatalog')}</h3>
              <p className="text-xs text-slate-400">
                {t('catalogSub')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addCustomCrop')}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('searchCropsPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' ? t('all') : localizeCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Crops List Grid */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCrops.map(crop => {
              return (
                <div
                  key={crop.name}
                  className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-emerald-400 hover:shadow-md transition duration-150 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 bg-slate-50 rounded-xl border border-slate-100">{crop.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                              {localizeCropName(crop.name)}
                            </h4>
                            {crop.isCustom && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                                {t('customCropTag')}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{localizeCategory(crop.category)}</span>
                        </div>
                      </div>

                      {crop.isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(crop.name, e)}
                          title="Delete Custom Crop"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {crop.description}
                    </p>

                    {/* Requirements pills */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block font-semibold">{t('soilParameters')}</span>
                        <span className="font-mono font-bold text-slate-700">
                          {crop.ideal.N[0]}-{crop.ideal.N[1]} / {crop.ideal.P[0]}-{crop.ideal.P[1]} / {crop.ideal.K[0]}-{crop.ideal.K[1]}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block font-semibold">{t('climateParameters')}</span>
                        <span className="font-mono font-bold text-slate-700">
                          {crop.ideal.temperature[0]}-{crop.ideal.temperature[1]}°C • {crop.ideal.ph[0]}-{crop.ideal.ph[1]} pH
                        </span>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block font-semibold">{t('rainfall')}</span>
                        <span className="font-mono font-bold text-slate-700">
                          {crop.ideal.rainfall[0]}–{crop.ideal.rainfall[1]} mm
                        </span>
                      </div>
                    </div>

                    {/* Key Agronomy facts */}
                    <div className="mt-3 text-xs text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span><strong>{t('growingSeason')}:</strong> {crop.sowingSeason} ({crop.harvestTime})</span>
                      </div>
                      {crop.expectedYield && (
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span><strong>{t('yieldPotential')}:</strong> {crop.expectedYield}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Select button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTargetCrop(crop.name);
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>{t('selectForEvaluation')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredCrops.length === 0 && (
            <div className="text-center py-12">
              <Sprout className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No crops found matching "{search}"</p>
              <button
                type="button"
                onClick={onOpenAddModal}
                className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                {t('addCustomCrop')}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
