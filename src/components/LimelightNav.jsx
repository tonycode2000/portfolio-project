import React, { useState, useRef, useEffect, cloneElement } from 'react';
// Import icons ពី lucide-react (ត្រូវប្រាកដថាបានដំឡើង npm install lucide-react)
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Mail 
} from 'lucide-react';

// ទិន្នន័យ Nav Links របស់អ្នក
export const navLinks = [
  { name: "Home", href: "#home", icon: <Home /> },
  { name: "អំពីខ្ញុំ", href: "#about", icon: <User /> },
  { name: "ជំនាញ", href: "#skills", icon: <Code2 /> },
  { name: "គម្រោង", href: "#projects", icon: <Briefcase /> },
  { name: "បទពិសោធន៍", href: "#experience", icon: <GraduationCap /> },
  { name: "ទំនាក់ទំនង", href: "#contact", icon: <Mail /> },
];

export const LimelightNav = ({
  items = navLinks,
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  const updateLimelight = () => {
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) setIsReady(true);
    }
  };

  useEffect(() => {
    // ចាំឱ្យ Font និង Layout រៀបចំរួចរាល់សិន (សំខាន់សម្រាប់ Font ខ្មែរ)
    const timer = setTimeout(updateLimelight, 100);
    window.addEventListener('resize', updateLimelight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLimelight);
    };
  }, [activeIndex]);

  const handleItemClick = (index, onClick) => {
    setActiveIndex(index);
    onTabChange?.(index);
    onClick?.();
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-1000 w-max max-w-[95vw]">
      <nav className={`relative inline-flex items-center h-16 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-3 shadow-2xl ${className}`}>
        
        {items.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            ref={el => navItemRefs.current[index] = el}
            className={`relative z-20 flex h-full flex-col items-center justify-center px-4 md:px-6 transition-all duration-300 no-underline group ${
                activeIndex === index ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-200'
            }`}
            onClick={() => handleItemClick(index, link.onClick)}
          >
            {/* បង្ហាញ Icon */}
            {link.icon && cloneElement(link.icon, {
              className: `w-5 h-5 mb-1 transition-transform duration-300 ${
                activeIndex === index ? 'scale-110' : 'scale-100'
              }`,
              strokeWidth: 2.5
            })}
            
            {/* បង្ហាញឈ្មោះជាភាសាខ្មែរ */}
            <span className={`text-[10px] md:text-xs font-bold transition-opacity duration-300 ${
              activeIndex === index ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
            }`}>
              {link.name}
            </span>
          </a>
        ))}

        {/* Limelight Effect */}
        <div 
          ref={limelightRef}
          className={`absolute top-0 z-10 w-14 h-0.75 rounded-full bg-emerald-400 shadow-[0_0_20px_#10b981] ${
            isReady ? 'transition-[left] duration-500 cubic-bezier(0.25, 1, 0.5, 1)' : 'opacity-0'
          }`}
          style={{ left: '0px' }}
        >
          {/* ពន្លឺបាញ់ចុះក្រោម (Light Beam) */}
          <div className="absolute left-[-50%] top-0 w-[200%] h-24 [clip-path:polygon(25%_100%,45%_0,55%_0,75%_100%)] bg-linear-to-b from-emerald-400/25 to-transparent pointer-events-none" />
        </div>
      </nav>
    </div>
  );
};