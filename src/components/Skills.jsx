"use client"
import React, { useEffect, useState, memo, useMemo } from 'react';

const iconComponents = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  java: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="#E76F00" className="w-full h-full">
        <path d="M14.33 19.5c-2.42 0-4.57-.48-4.57-1.12 0-.43.97-.81 2.39-1.01l.16-.02-.15-.07c-2.31-1.07-5.06-1.52-5.06-3.84 0-1.89 1.4-3.55 3.39-4.22l.54-.18-.36-.4c-1.3-1.46-1.31-3.13-.01-4.32.22-.19.46-.35.73-.48l.45-.2-.33-.36C10.74 2.5 10.32 1.4 10.78.6c.07-.12.2-.2.34-.2.43 0 1.25.66 1.63 1.96.22.75.22 1.63.02 2.47l-.05.21.18.1c1.38.74 2.33 1.79 2.5 2.82.04.28.05.57.02.86l-.03.27.21.17c1.32 1.03 2 2.37 2 3.86 0 2.36-2.58 3.52-4.14 4.02l-.16.05.14.05c1.65.6 2.84 1.34 2.84 2.25 0 1.02-2.3 2.01-6.17 2.01zm-3.66-3.32l.33.01c2.19.1 4.14.49 4.14 1.12 0 .39-1.04.81-3.03.95-1.52.11-2.91.06-3.7-.1-.13-.03-.21-.1-.21-.18 0-.39 1.05-.83 2.47-1.8zm1.6-9.52c-.15 0-.3.02-.45.06-1.25.32-2.18 1.43-2.18 2.62 0 1.54 1.7 2.19 3.5 3.03l.36.16c1.32-.42 3.42-1.2 3.42-3.14 0-.88-.41-1.72-1.14-2.2-.42-.27-.97-.53-1.51-.53zm-.95-4.1c-.2.53-.18 1.15.07 1.83.22.61.58 1.15 1.02 1.56.04-.6-.02-1.2-.18-1.78-.3-.99-.71-1.51-.91-1.61z" />
      </svg>
    ),
    color: '#E76F00'
  },
  c: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="#A8B9CC" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c2.45 0 4.64 1.11 6.1 2.87l-1.57 1.57c-1.11-1.5-2.73-2.44-4.53-2.44-3.31 0-6 2.69-6 6s2.69 6 6 6c1.8 0 3.42-.94 4.53-2.44l1.57 1.57c-1.46 1.76-3.65 2.87-6.1 2.87z" />
      </svg>
    ),
    color: '#00599C'
  },
  cpp: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="#00599C" className="w-full h-full">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2.5 14.5a4.5 4.5 0 1 1 0-9 1 1 0 0 1 0 2 2.5 2.5 0 1 0 0 5 1 1 0 0 1 0 2zM15 11h1V9h1v2h1v1h-1v2h-1v-2h-1v-1zm4 0h1V9h1v2h1v1h-1v2h-1v-2h-1v-1z"/>
      </svg>
    ),
    color: '#00599C'
  },
  csharp: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="#239120" className="w-full h-full">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.1 14.2l-3.3-3.3 1.1-1.1 2.2 2.2 4.4-4.4 1.1 1.1-5.5 5.5z"/>
        <text x="6" y="15" fill="white" fontSize="10" fontWeight="bold">#</text>
      </svg>
    ),
    color: '#239120'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  }
};

const SkillIcon = memo(({ type }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});

const skillsConfig = [
  { id: 'html', orbitRadius: 100, size: 40, speed: 1, iconType: 'html', phaseShift: 0, label: 'HTML5' },
  { id: 'css', orbitRadius: 100, size: 45, speed: 1, iconType: 'css', phaseShift: (2 * Math.PI) / 3, label: 'CSS3' },
  { id: 'javascript', orbitRadius: 100, size: 40, speed: 1, iconType: 'javascript', phaseShift: (4 * Math.PI) / 3, label: 'JavaScript' },
  { id: 'react', orbitRadius: 180, size: 50, speed: -0.6, iconType: 'react', phaseShift: 0, label: 'React' },
  { id: 'node', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'node', phaseShift: (2 * Math.PI) / 3, label: 'Node.js' },
  { id: 'tailwind', orbitRadius: 180, size: 40, speed: -0.6, iconType: 'tailwind', phaseShift: (4 * Math.PI) / 3, label: 'Tailwind CSS' },
  { id: 'java', orbitRadius: 260, size: 50, speed: 0.5, iconType: 'java', phaseShift: 0, label: 'Java' },
  { id: 'c', orbitRadius: 260, size: 50, speed: 0.5, iconType: 'c', phaseShift: (Math.PI) / 2, label: 'C Language' },
  { id: 'cpp', orbitRadius: 260, size: 50, speed: 0.5, iconType: 'cpp', phaseShift: Math.PI, label: 'C++' },
  { id: 'csharp', orbitRadius: 260, size: 50, speed: 0.5, iconType: 'csharp', phaseShift: (3 * Math.PI) / 2, label: 'C#' },
];

const OrbitingSkill = memo(({ config, angle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 30 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-2.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer 
        ${isHovered ? 'scale-125 bg-zinc-800/70 border-emerald-500/50' : 'bg-zinc-900/40 border-white/10'} 
        backdrop-blur-md border shadow-xl`}
        style={{ 
          boxShadow: isHovered 
            ? `0 0 30px ${iconComponents[iconType]?.color}40, inset 0 0 10px ${iconComponents[iconType]?.color}20` 
            : 'inset 0 0 5px rgba(255,255,255,0.05)' 
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-zinc-900/90 backdrop-blur-sm rounded-lg text-[10px] text-white font-bold whitespace-nowrap tracking-widest uppercase shadow-xl animate-in fade-in zoom-in-95 duration-300">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});

const GlowingOrbitPath = memo(({ radius, animationDelay = 0 }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <div
        className="absolute inset-0 rounded-full border border-emerald-500/10"
        style={{
          background: `radial-gradient(circle, transparent 70%, rgba(16, 185, 129, 0.05) 100%)`,
          boxShadow: `inset 0 0 30px rgba(16, 185, 129, 0.1)`,
          animation: 'pulse 6s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
    </div>
  );
});

const Starfield = memo(() => {
  const numStars = 50;
  const stars = useMemo(() => {
    return Array.from({ length: numStars }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2}px`,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, [numStars]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle opacity-60"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
            boxShadow: '0 0 5px #fff',
          }}
        />
      ))}
    </div>
  );
});

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let frameId;
    let lastTime = performance.now();
    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prev => prev + deltaTime);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  return (
    <section id="skills" className="py-24 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.2]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <Starfield />
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-white mb-16 font-khmer text-center relative z-10">
        ជំនាញ <span className="text-emerald-500">បច្ចេកទេស</span>
      </h2>

      <div 
        className="w-87.5 h-87.5 md:w-150 md:h-150 flex items-center justify-center relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-28 h-28 bg-zinc-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-full flex items-center justify-center z-10 relative shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl animate-pulse"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>

        <GlowingOrbitPath radius={100} animationDelay={0} />
        <GlowingOrbitPath radius={180} animationDelay={1} />
        <GlowingOrbitPath radius={260} animationDelay={2} />

        {skillsConfig.map((config) => (
          <OrbitingSkill key={config.id} config={config} angle={time * config.speed + (config.phaseShift || 0)} />
        ))}
      </div>
    </section>
  );
}