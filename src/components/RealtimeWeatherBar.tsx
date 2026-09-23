import React, { useState, useEffect } from 'react';
import { RealtimeWeatherData } from '../types';
import { fetchLiveWeatherByCoords, searchLocations } from '../utils/weather';
import { useTranslation } from '../i18n/LanguageContext';
import { MapPin, Navigation, Search, Check, RefreshCw, AlertTriangle, CloudSun, Thermometer, Droplets, CloudRain } from 'lucide-react';

interface RealtimeWeatherBarProps {
  weather: RealtimeWeatherData | null;
  onWeatherUpdate: (weather: RealtimeWeatherData) => void;
  onApplyToInputs: (weather: RealtimeWeatherData) => void;
  isApplied: boolean;
}

export const RealtimeWeatherBar: React.FC<RealtimeWeatherBarProps> = ({
  weather,
  onWeatherUpdate,
  onApplyToInputs,
  isApplied
}) => {
  const { t } = useTranslation();
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<{ name: string; country: string; admin1?: string; latitude: number; longitude: number }>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initial default location (e.g. Sacramento Central Valley / Agricultural hub)
  useEffect(() => {
    if (!weather) {
      fetchLiveWeatherByCoords(38.58, -121.49, 'Central Valley / Sacramento, USA')
        .then(data => onWeatherUpdate(data))
        .catch(() => {});
    }
  }, [weather, onWeatherUpdate]);

  const handleUseCurrentLocation = () => {
    setErrorMsg(null);
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const liveData = await fetchLiveWeatherByCoords(lat, lon, 'Your Current Location');
          onWeatherUpdate(liveData);
          setIsLocating(false);
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to fetch weather for your location.');
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg('Location access was denied. You can search your city/region below.');
        } else {
          setErrorMsg('Unable to detect location. Please search for your city or region.');
        }
      },
      { timeout: 10000 }
    );
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      setIsSearching(true);
      try {
        const results = await searchLocations(val);
        setSearchResults(results);
        setIsSearchOpen(true);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectLocation = async (loc: { name: string; country: string; admin1?: string; latitude: number; longitude: number }) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setErrorMsg(null);
    setIsLocating(true);
    try {
      const fullLabel = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
      const liveData = await fetchLiveWeatherByCoords(loc.latitude, loc.longitude, fullLabel);
      onWeatherUpdate(liveData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch weather for selected location.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleRefresh = async () => {
    if (!weather) return;
    setIsLocating(true);
    try {
      const liveData = await fetchLiveWeatherByCoords(weather.latitude, weather.longitude, weather.locationName);
      onWeatherUpdate(liveData);
    } catch {
      // Keep old weather
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800/40 relative overflow-hidden">
      
      {/* Background glow styling */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Location & Real-Time Header */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {t('liveWeather')}
            </span>
            {weather && (
              <span className="text-[11px] text-slate-300">
                Updated {weather.lastUpdated}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <h3 className="text-lg font-extrabold tracking-tight text-white truncate max-w-md">
              {weather ? weather.locationName : 'Detecting Location...'}
            </h3>
            {weather && (
              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh Live Weather"
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300 flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-amber-300 inline" />
            <span>Condition: <strong className="text-white">{weather?.conditionText || 'Syncing...'}</strong></span>
          </p>
        </div>

        {/* Center: Live Climate Telemetry Badges */}
        {weather && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="flex flex-col items-center justify-center px-2 py-1">
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('temperature')}</span>
              </div>
              <span className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                {weather.temperature}°C
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 py-1 border-x border-white/10">
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('humidity')}</span>
              </div>
              <span className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                {weather.humidity}%
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 py-1">
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <CloudRain className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t('rainfall')}</span>
              </div>
              <span className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                {weather.rainfall} mm
              </span>
            </div>
          </div>
        )}

        {/* Right: Actions (Location GPS, Search & Apply) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
          
          {/* Location button */}
          <button
            type="button"
            id="btn-use-location"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 text-emerald-400 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? t('detecting') : t('detectGPS')}</span>
          </button>

          {/* Search box dropdown */}
          <div className="relative">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-2.5 py-1.5 focus-within:bg-white/20 focus-within:border-emerald-400 transition">
              <Search className="w-3.5 h-3.5 text-slate-300 mr-1.5 flex-shrink-0" />
              <input
                type="text"
                placeholder={t('searchLocationPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchResults.length > 0 && setIsSearchOpen(true)}
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-36 sm:w-44"
              />
            </div>

            {/* Dropdown list */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 text-xs text-slate-200 divide-y divide-slate-800">
                {searchResults.map((loc, idx) => (
                  <button
                    key={`${loc.name}-${loc.latitude}-${idx}`}
                    type="button"
                    onClick={() => handleSelectLocation(loc)}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-900/60 hover:text-white transition flex flex-col"
                  >
                    <span className="font-semibold text-white truncate">{loc.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply to field inputs button */}
          {weather && (
            <button
              type="button"
              id="btn-apply-weather"
              onClick={() => onApplyToInputs(weather)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 ${
                isApplied
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 font-extrabold'
              }`}
            >
              {isApplied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>{t('weatherSynced')}</span>
                </>
              ) : (
                <>
                  <CloudSun className="w-3.5 h-3.5" />
                  <span>{t('syncWeather')}</span>
                </>
              )}
            </button>
          )}

        </div>

      </div>

      {errorMsg && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

    </div>
  );
};
