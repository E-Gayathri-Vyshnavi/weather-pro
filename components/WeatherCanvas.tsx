"use client";
import { motion } from "framer-motion";

export default function WeatherCanvas({ condition }: { condition: string }) {
  const mode = condition.toLowerCase();
  
  // Weather Condition Logic
  const isRainy = mode.includes("rain") || mode.includes("drizzle") || mode.includes("thunderstorm");
  const isCloudy = mode.includes("cloud");
  const isHazy = mode.includes("haze") || mode.includes("mist") || mode.includes("fog");

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900 transition-colors duration-1000">
      {/* Background Gradient Layer */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isRainy ? "bg-gradient-to-b from-slate-900 to-blue-900" : 
        isHazy ? "bg-gradient-to-b from-slate-700 to-orange-900/30" :
        isCloudy ? "bg-gradient-to-b from-blue-800 to-slate-600" :
        "bg-gradient-to-b from-sky-400 to-blue-600"
      }`} />

      {/* Rain Drop Animation - Only triggers on Rainy weather */}
      {isRainy && [...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-14 bg-white/30"
          initial={{ top: -100, left: `${Math.random() * 100}%` }}
          animate={{ top: "110%" }}
          transition={{ 
            duration: Math.random() * 0.5 + 0.5, 
            repeat: Infinity, 
            delay: Math.random(), 
            ease: "linear" 
          }}
        />
      ))}

      {/* Subtle Cloud Drift - For cloudy or hazy weather */}
      {(isCloudy || isHazy) && (
        <motion.div 
          className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}