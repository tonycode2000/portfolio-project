"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight, Briefcase } from "lucide-react";

// --- Helper Functions ---
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function wrapIndex(n, len) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

// --- Main Experience Component ---
const Experience = () => {
  const experienceData = [
    {
      id: 1,
      title: "Full-Stack Developer",
      tag: "Freelance",
      description: "បង្កើត Web-based OBE system សម្រាប់សាកលវិទ្យាល័យស្វាយរៀង ដោយជំនួសការប្រើប្រាស់ Excel manual process។",
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      href: "#"
    },
    {
      id: 2,
      title: "Web Development Intern",
      tag: "Startup Tech",
      description: "ចូលរួមក្នុងការអភិវឌ្ឍន៍ Frontend UI ដោយប្រើប្រាស់ React និង Tailwind CSS សម្រាប់គម្រោងពាណិជ្ជកម្ម។",
      imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      href: "#"
    },
    {
      id: 3,
      title: "C# Course Assistant",
      tag: "Education",
      description: "ជួយរៀបចំ Course Learning Outcomes (CLOs) និងបង្រៀនមូលដ្ឋានគ្រឹះ programming ដល់និស្សិតជំនាន់ក្រោយ។",
      imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      href: "#"
    }
  ];

  // 🌟 បន្ថែម Hook ដើម្បីស្ទង់ទំហំអេក្រង់ (Responsive Logic)
  const [dimensions, setDimensions] = React.useState({ width: 500, height: 320 });

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        setDimensions({ width: window.innerWidth - 48, height: 450 });
      } else if (window.innerWidth < 1024) { // Tablet
        setDimensions({ width: 450, height: 300 });
      } else { // Desktop
        setDimensions({ width: 520, height: 320 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            My <span className="text-emerald-400">Experience</span>
          </h2>
          <p className="text-zinc-400 text-lg font-khmer">បទពិសោធន៍ការងារ និងការសិក្សាកន្លងមក</p>
        </motion.div>

        <CardStack 
          items={experienceData} 
          cardWidth={dimensions.width} 
          cardHeight={dimensions.height}
          autoAdvance={true}
        />
      </div>
    </section>
  );
};

// --- CardStack Component ---
export function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 3, // កាត់បន្ថយចំនួនកាតមើលឃើញដើម្បីកុំឱ្យញ៉េរញ៉ៃលើ Mobile
  cardWidth,
  cardHeight,
  overlap = 0.6,
  spreadDeg = 15, // បន្ថយមុំបង្វិលដើម្បីឱ្យមើលទៅស្អាតលើអេក្រង់តូច
  perspectivePx = 1000,
  depthPx = 100,
  tiltXDeg = 5,
  activeLiftPx = 20,
  activeScale = 1,
  inactiveScale = 0.85,
  springStiffness = 200,
  springDamping = 25,
  loop = true,
  autoAdvance = false,
  intervalMs = 4000,
  pauseOnHover = true,
  showDots = true,
  className,
}) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;
    const id = setInterval(() => {
      setActive((a) => wrapIndex(a + 1, len));
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoAdvance, hovering, len, active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  // 🌟 កែសម្រួល Spacing ឱ្យសមស្របតាមអេក្រង់
  const cardSpacing = cardWidth < 400 ? 20 : Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  return (
    <div className={cn("w-full select-none", className)} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="relative w-full flex justify-center items-center" style={{ height: cardHeight + 60 }}>
        
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: `${perspectivePx}px` }}>
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 6;
              const z = -abs * depthPx;
              const isActive = off === 0;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "absolute rounded-4xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-900/95 backdrop-blur-xl",
                    isActive ? "z-50 border-emerald-500/50" : "z-0 opacity-40"
                  )}
                  style={{ width: cardWidth, height: cardHeight, transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, x, scale: inactiveScale }}
                  animate={{ 
                    opacity: 1, 
                    x, 
                    y: isActive ? -activeLiftPx : y, 
                    rotateZ, 
                    rotateX: isActive ? 0 : tiltXDeg, 
                    scale: isActive ? activeScale : inactiveScale,
                    filter: isActive ? "grayscale(0%)" : "grayscale(100%)"
                  }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                >
                   <ExperienceCardContent item={item} isActive={isActive} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2 p-2 bg-zinc-900/50 rounded-full border border-white/5">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={cn("h-1.5 transition-all duration-500 rounded-full", 
                  idx === active ? "w-8 bg-emerald-500" : "w-2 bg-zinc-700")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExperienceCardContent({ item, isActive }) {
  return (
    <div className="relative h-full w-full flex flex-col sm:flex-row overflow-hidden group">
      {/* Image Section */}
      <div className="h-2/5 sm:h-full sm:w-1/2 relative">
        <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent sm:bg-linear-to-r" />
      </div>

      {/* Content Section */}
      <div className="h-3/5 sm:h-full sm:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-zinc-900/40">
        <div className="flex items-center gap-2 mb-3 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <Briefcase size={14} strokeWidth={3} />
          {item.tag}
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight font-khmer">
          {item.title}
        </h3>
        <p className="text-zinc-400 text-sm font-khmer leading-relaxed line-clamp-4 md:line-clamp-none">
          {item.description}
        </p>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <a 
                href={item.href} 
                className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest hover:text-emerald-300 transition-colors border-b border-emerald-500/20 pb-1"
              >
                លម្អិតបន្ថែម <SquareArrowOutUpRight size={14} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Experience;