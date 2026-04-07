import React, { useEffect, useRef } from 'react';

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 140, spread: 200 }, // ស៊ីជាមួយ Emerald
  emerald: { base: 160, spread: 150 },
  red: { base: 0, spread: 200 },
};

const GlowCard = ({ children, className = '', glowColor = 'emerald' }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue;

  const styles = {
    '--base': base,
    '--spread': spread,
    '--radius': '24',
    '--border': '2',
    '--backdrop': 'rgba(24, 24, 27, 0.4)',
    '--size': '250',
    '--border-size': 'calc(var(--border) * 1px)',
    '--spotlight-size': 'calc(var(--size) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue) 80% 60% / 0.1), transparent)`,
    backgroundAttachment: 'fixed',
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={styles}
      className={`relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p- overflow-hidden ${className}`}
    >
      <div data-glow className="pointer-events-none absolute inset-0 opacity-100"></div>
      {children}
    </div>
  );
};

export { GlowCard };