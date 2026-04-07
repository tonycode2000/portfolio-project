"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const TextHoverEffect = ({ text, duration, className }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#10b981" /> {/* Emerald */}
              <stop offset="25%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#06b6d4" /> {/* Cyan */}
              <stop offset="75%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#10b981" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-800 font-black text-7xl"
        style={{ opacity: hovered ? 0.7 : 0.2 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-emerald-500 font-black text-7xl"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-black text-7xl"
      >
        {text}
      </text>
    </svg>
  );
};

// --- About Me Section Component ---
const AboutMe = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-5xl px-6">
        {/* អក្សរធំៗដែលមាន Effect Hover */}
        <div className="h-50 md:h-75 w-full">
          <TextHoverEffect text="TONY" />
        </div>

        {/* ខ្លឹមសារ About Me */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-emerald-400 font-khmer">តើខ្ញុំជានរណា?</h3>
            <p className="text-zinc-400 leading-relaxed font-khmer text-lg">
              ខ្ញុំគឺជា Full-Stack Developer ម្នាក់ដែលមានចំណូលចិត្តក្នុងការបង្កើតគេហទំព័រដែលទំនើប និងមានប្រសិទ្ធភាព។ 
              ខ្ញុំចូលចិត្តរៀនបច្ចេកវិទ្យាថ្មីៗ និងដោះស្រាយបញ្ហាស្មុគស្មាញតាមរយៈការសរសេរកូដ។
            </p>
            <div className="flex gap-4">
               <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm">Frontend</div>
               <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-sm">Backend</div>
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-400 text-sm">UI/UX</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5"
          >
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-zinc-300">ឈ្មោះ៖ <strong>Phan Tony</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-zinc-300">បទពិសោធន៍៖ <strong>១ ឆ្នាំ+</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-zinc-300">ទីតាំង៖ <strong>ខេត្តស្វាយរៀង, កម្ពុជា</strong></span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;