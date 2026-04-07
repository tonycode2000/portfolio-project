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

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            My <span className="text-emerald-400">Experience</span>
          </h2>
          <p className="text-zinc-400 text-lg font-khmer">បទពិសោធន៍ការងារ និងការសិក្សាកន្លងមក</p>
        </motion.div>

        <CardStack 
          items={experienceData} 
          cardWidth={500} 
          cardHeight={300}
          autoAdvance={true}
        />
      </div>
    </section>
  );
};

// --- CardStack Component (Modified for JS & Style) ---
export function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.5,
  spreadDeg = 35,
  perspectivePx = 1100,
  depthPx = 120,
  tiltXDeg = 10,
  activeLiftPx = 25,
  activeScale = 1.05,
  inactiveScale = 0.9,
  springStiffness = 250,
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
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  return (
    <div className={cn("w-full", className)} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="relative w-full outline-none" style={{ height: cardHeight + 100 }} tabIndex={0}>
        
        {/* Background Glows */}
        <div className="absolute inset-x-0 top-0 mx-auto h-64 w-[60%] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: `${perspectivePx}px` }}>
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 8;
              const z = -abs * depthPx;
              const isActive = off === 0;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "absolute rounded-4xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-900/90 backdrop-blur-xl transition-colors duration-500",
                    isActive ? "cursor-default border-emerald-500/40" : "cursor-pointer grayscale hover:grayscale-0"
                  )}
                  style={{ width: cardWidth, height: cardHeight, zIndex: 100 - abs, transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, x, y: y + 50, scale: inactiveScale }}
                  animate={{ opacity: 1, x, y: y + (isActive ? -activeLiftPx : 0), rotateZ, rotateX: isActive ? 0 : tiltXDeg, scale: isActive ? activeScale : inactiveScale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                >
                  <div className="h-full w-full" style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}>
                     <ExperienceCardContent item={item} isActive={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={cn("h-1.5 rounded-full transition-all duration-300", 
                  idx === active ? "w-6 bg-emerald-500" : "w-1.5 bg-zinc-600")}
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
    <div className="relative h-full w-full flex flex-col md:flex-row overflow-hidden">
      {/* Image half */}
      <div className="h-1/2 md:h-full md:w-1/2 relative overflow-hidden">
        <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent md:bg-linear-to-r" />
      </div>

      {/* Text half */}
      <div className="h-1/2 md:h-full md:w-1/2 p-6 flex flex-col justify-center bg-zinc-900/50">
        <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Briefcase size={14} />
          {item.tag}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
        <p className="text-zinc-400 text-sm font-khmer line-clamp-3">{item.description}</p>
        
        {isActive && (
           <motion.a 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            href={item.href} 
            className="mt-4 inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline"
           >
            លម្អិតបន្ថែម <SquareArrowOutUpRight size={14} />
           </motion.a>
        )}
      </div>
    </div>
  );
}

export default Experience;