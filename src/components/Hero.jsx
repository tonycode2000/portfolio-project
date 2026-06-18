"use client";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Send, Eye } from "lucide-react";

// --- ប៊ូតុង Animated Download CV (ថ្មី) ---
const DownloadCVButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    // ល្បែងទាញយក File ពិតប្រាកដ
    const link = document.createElement('a');
    link.href = '/cv/PHAN_TONY.pdf';
    link.download = 'PHAN_TONY-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Animation រយៈពេល ៣.៥ វិនាទី
    setTimeout(() => setIsDownloading(false), 3500);
  };

  return (
    <motion.button
      onClick={handleDownload}
      className={`relative flex items-center border rounded-2xl overflow-hidden transition-all bg-zinc-900/50 
        ${isDownloading ? 'cursor-wait border-emerald-500' : 'cursor-pointer border-white/10 hover:border-emerald-500'}`}
      animate={{ width: isDownloading ? 56 : 180 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{ minWidth: isDownloading ? '56px' : '180px', height: 56 }}
    >
      {/* Circle Progress & Spinner */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div
            className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full m-auto z-20"
            animate={{
              rotate: 360,
              x: [0, 20, 0, -20, 0],
              y: [0, -20, 0, 20, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="h-full w-14 rounded-2xl bg-emerald-500 flex justify-center items-center relative z-10"
        animate={isDownloading ? { scale: [0.9, 1, 0.9] } : {}}
        transition={{ duration: 1, repeat: isDownloading ? Infinity : 0 }}
      >
        {/* Progress Bar (Vertical Fill) */}
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-emerald-700 rounded-2xl"
          initial={{ height: '0%' }}
          animate={isDownloading ? { height: '100%' } : { height: '0%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          style={{ zIndex: 1 }}
        />
        {!isDownloading ? (
          <FileDown size={18} className="text-black z-20" />
        ) : (
          <div className="w-3 h-3 bg-white rounded-sm z-20" />
        )}
      </motion.div>

      <AnimatePresence>
        {!isDownloading && (
          <motion.span
            className="ml-4 text-emerald-400 text-[11px] font-black uppercase tracking-widest z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Download CV
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// --- Hero Component របស់អ្នក ---
const myItems = [
  { num: "01", name: "Web Developer", clipId: "clip-original", image: "/images/profile.png" },
  { num: "02", name: "UI/UX Designer", clipId: "clip-hexagons", image: "/images/profile1.png" },
  { num: "03", name: "Tech Enthusiast", clipId: "clip-pixels", image: "/images/profile2.jpg" }
];

export const Hero = ({ items = myItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const mainGroupRef = useRef(null);
  const masterTl = useRef(null);

  const createLoop = (index) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;
    if (masterTl.current) masterTl.current.kill();
    if (imageRef.current) imageRef.current.setAttribute("xlink:href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    gsap.set(".path", { scale: 0, transformOrigin: "50% 50%" });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(selector, { scale: 1, duration: 0.8, stagger: { amount: 0.4, from: "random" }, ease: "expo.out" })
      .to(selector, { scale: 1.05, duration: 1.5, yoyo: true, repeat: 1, ease: "sine.inOut", stagger: { amount: 0.2, from: "center" } })
      .to(selector, { scale: 0, duration: 0.6, stagger: { amount: 0.3, from: "edges" }, ease: "expo.in" });
    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => createLoop(0), containerRef);
    return () => ctx.revert();
  }, []);

  const handleItemHover = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-screen px-6 py-12 md:px-24 overflow-hidden bg-transparent">
      
      <div className="z-20 w-full md:w-1/2 flex flex-col justify-center">
        <nav className="mb-12">
          <ul className="flex flex-col gap-8 md:gap-12">
            {items.map((item, index) => (
              <li key={item.num} onMouseEnter={() => handleItemHover(index)} className="group cursor-pointer">
                <div className="flex items-start gap-6">
                  <span className={`text-xl md:text-2xl font-black transition-all duration-500 mt-2 ${activeIndex === index ? "text-emerald-500 scale-125" : "text-zinc-700"}`}>
                    {item.num}
                  </span>
                  <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700 ${
                    activeIndex === index ? "text-white opacity-100 translate-x-4" : "text-transparent stroke-zinc-800 [text-stroke:1px_#27272a] [-webkit-text-stroke:1px_#27272a] opacity-30 translate-x-0"
                  }`}>
                    {item.name.split(' ')[0]}<br />
                    <span className={activeIndex === index ? "text-emerald-500" : ""}>{item.name.split(' ')[1]}</span>
                  </h2>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🌟 ប៊ូតុងសកម្មភាព (Update ជាមួយ Animated Download) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-4"
        >
          {/* Hire Me */}
          <a href="#contact" className="px-8 py-4.5 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] text-[11px] uppercase tracking-widest flex items-center gap-2">
            <Send size={16} /> Hire Me
          </a>

          {/* View CV */}
          <a href="/cv/PHAN-Tony.pdf" target="_blank" rel="noreferrer" className="px-8 py-4.5 bg-zinc-900 border border-white/5 text-white font-bold rounded-2xl hover:border-emerald-500 transition-all text-[11px] uppercase tracking-widest flex items-center gap-2">
            <Eye size={16} className="text-emerald-500" /> View CV
          </a>
          
          {/* Animated Download CV */}
          <DownloadCVButton />
        </motion.div>
      </div>

      {/* ផ្នែករូបភាពខាងស្តាំ */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
        <svg viewBox="0 0 500 500" className="w-full max-w-112.5 h-auto z-10 drop-shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <defs>
            <clipPath id="clip-original">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>
            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="20" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="20" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="20" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="20" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="20" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="20" />
            </clipPath>
            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect key={i} className="path" x={(i % 3) * 160 + 20} y={Math.floor(i / 3) * 160 + 20} width="140" height="140" rx="12" />
              ))}
            </clipPath>
          </defs>
          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image ref={imageRef} xlinkHref={items[0].image} width="500" height="500" preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>
      </div>
    </div>
  );
};