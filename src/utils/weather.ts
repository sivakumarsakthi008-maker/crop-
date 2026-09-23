import { RealtimeWeatherData } from '../types';

export function getWMOWeatherDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 61 && code <= 65) return 'Rain Showers';
  if (code >= 71 && code <= 77) return 'Snow Fall';
  if (code >= 80 && code <= 82) return 'Heavy Rain Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Fair / Variable';
}

export async function fetchLiveWeatherByCoords(lat: number, lon: number, locationName?: string): Promise<RealtimeWeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=precipitation_sum&timezone=auto`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather service responded with status ${res.status}`);
  }
  const data = await res.json();
  const current = data.current || {};
  const daily = data.daily || {};
  
  // Calculate a representative seasonal/monthly precipitation estimate or today's precipitation sum
  const todayRain = (daily.precipitation_sum && daily.precipitation_sum[0]) || current.precipitation || 0;
  // Scaled seasonal estimate: rainfall typically 50-250mm across a crop cycle, so we provide an approximate representative localized rainfall or estimate based on humidity & rain events
  const estimatedRainfall = Number((Math.max(25, Math.min(280, (current.relative_humidity_2m * 1.6) + (todayRain * 12)))).toFixed(1));

  const code = current.weather_code ?? 0;
  const condition = getWMOWeatherDescription(code);

  const locName = locationName || `Lat ${lat.toFixed(2)}°, Lon ${lon.toFixed(2)}°`;

  return {
    locationName: locName,
    latitude: lat,
    longitude: lon,
    temperature: Number((current.temperature_2m ?? 24).toFixed(1)),
    humidity: Number((current.relative_humidity_2m ?? 65).toFixed(1)),
    rainfall: estimatedRainfall,
    conditionText: condition,
    weatherCode: code,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    isLive: true
  };
}

export async function searchLocations(query: string): Promise<Array<{ name: string; country: string; admin1?: string; latitude: number; longitude: number }>> {
  if (!query || query.trim().length < 2) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
  
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map((item: any) => ({
    name: item.name,
    country: item.country || '',
    admin1: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude
  }));
}
