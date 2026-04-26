"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Wind, Droplets, Thermometer, MapPin, Navigation } from "lucide-react";
import WeatherCanvas from "../components/WeatherCanvas";
import { WeatherData } from "../types/weather";

export default function WeatherPage() {
  const [city, setCity] = useState("Ongole");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!city) return;
    setLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      setWeather(res.data);
    } catch (err) {
      alert("City not found.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationAndWeather = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
        setWeather(res.data);
        setCity(res.data.name);
        setLoading(false);
      }, () => { fetchWeather(); });
    } else { fetchWeather(); }
  };

  useEffect(() => { fetchLocationAndWeather(); }, []);

  return (
    // THE FIX: 'flex items-center justify-center' centers the card vertically and horizontally
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 md:p-10 text-white overflow-hidden">
      
      {weather && <WeatherCanvas condition={weather.weather[0].main} />}
      
      {/* THE CARD: 'max-w-md' ensures the search bar and text don't stretch across the whole screen */}
      <div className="z-10 w-full max-w-md bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center">
        
        {/* Centered Search Bar */}
        <form onSubmit={fetchWeather} className="relative w-full mb-8 group">
          <button 
            type="button"
            onClick={fetchLocationAndWeather}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white z-20"
          >
            <Navigation size={18} />
          </button>
          
          <input 
            type="text" 
            value={city}
            placeholder="Search city..."
            className="w-full bg-white/10 border border-white/5 rounded-full py-4 pl-12 pr-12 text-white placeholder-white/30 focus:ring-2 focus:ring-white/20 outline-none transition-all"
            onChange={(e) => setCity(e.target.value)}
          />
          
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white z-20">
            <Search size={20} />
          </button>
        </form>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white mb-4"></div>
             <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold text-center">Syncing Data</p>
          </div>
        ) : weather && (
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin size={16} className="text-sky-400" />
              <h1 className="text-3xl font-black tracking-tight uppercase italic">{weather.name}</h1>
            </div>
            
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
              alt="icon"
              className="mx-auto w-32 h-32 drop-shadow-2xl"
            />

            <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/60 mb-6">
              {weather.weather[0].description}
            </p>
            
            <div className="text-[7rem] font-black leading-none mb-10 tracking-tighter bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
              {Math.round(weather.main.temp)}°
            </div>
            
            {/* Grid for Humidity, Wind, etc. */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-8 w-full">
              <div className="flex flex-col items-center">
                <Thermometer className="mb-2 text-sky-300 opacity-60" size={20} />
                <span className="text-[8px] uppercase tracking-widest opacity-40">Feels</span>
                <p className="text-lg font-bold">{Math.round(weather.main.feels_like)}°</p>
              </div>
              <div className="flex flex-col items-center border-x border-white/5">
                <Droplets className="mb-2 text-blue-300 opacity-60" size={20} />
                <span className="text-[8px] uppercase tracking-widest opacity-40">Humidity</span>
                <p className="text-lg font-bold">{weather.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="mb-2 text-emerald-300 opacity-60" size={20} />
                <span className="text-[8px] uppercase tracking-widest opacity-40">Wind</span>
                <p className="text-lg font-bold">{weather.wind.speed}<span className="text-[10px] ml-0.5">m/s</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}