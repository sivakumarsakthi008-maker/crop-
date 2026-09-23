import React from 'react';
import { Sprout, Plus, BookOpen, CloudSun } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onOpenCatalog: () => void;
  onOpenAddCrop: () => void;
  cropCount: number;
  activeTab: 'advisor' | 'soil-map';
  onTabChange: (tab: 'advisor' | 'soil-map') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCatalog,
  onOpenAddCrop,
  cropCount,
  activeTab,
  onTabChange
}) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 flex-shrink-0">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
                {t('appName')}
              </h1>
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                <CloudSun className="w-3 h-3 text-emerald-600" />
                {t('liveFieldPlanning')}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Center View Switcher */}
        <div className="hidden md:flex items-center p-1 bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold">
          <button
            type="button"
            id="nav-tab-advisor"
            onClick={() => onTabChange('advisor')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'advisor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('fieldAdvisorTab')}
          </button>
          <button
            type="button"
            id="nav-tab-soil-map"
            onClick={() => onTabChange('soil-map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'soil-map'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{t('soilMapTab')}</span>
          </button>
        </div>

        {/* Action Controls & Language Changer */}
        <div className="flex items-center gap-2">
          
          {/* Language Changer Dropdown */}
          <LanguageSelector />

          <button
            type="button"
            id="btn-open-catalog"
            onClick={onOpenCatalog}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 text-xs font-semibold transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>{t('cropCatalog')} ({cropCount})</span>
          </button>

          <button
            type="button"
            id="btn-add-crop"
            onClick={onOpenAddCrop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{t('addCustomCrop')}</span>
            <span className="xs:hidden">{t('addCustomCrop').slice(0, 10)}...</span>
          </button>

        </div>

      </div>
    </header>
  );
};
