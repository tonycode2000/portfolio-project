import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import { X, Linkedin, Github } from 'lucide-react';

const TeamSphere = () => {
  // --- ការកំណត់ (Configurations) ---
  const containerSize = 600;      // ទំហំផ្ទៃបង្ហាញ
  const sphereRadius = 220;       // កាំនៃរង្វង់ស្វ៊ែរ
  const autoRotateSpeed = 0.4;    // ល្បឿនវិលស្វ័យប្រវត្តិ
  const baseImageScale = 0.25;    // ទំហំរូបភាពធៀបនឹង container

  // --- ទិន្នន័យក្រុមការងារ ---
  const images = useMemo(() => [
    { id: "1", src: "/images/profile.png", alt: "Antony", title: "Antony", role: "Full-Stack Developer" },
    { id: "2", src: "/images/img12.JPG", alt: "Sophea", title: "A", role: "UI/UX Designer" },
    { id: "3", src: "/images/img2.jpg", alt: "Sok", title: "B", role: "UI/UX Designer" },
    { id: "4", src: "/images/img3.jpg", alt: "Meymey", title: "C", role: "UI/UX Designer" },
    { id: "5", src: "/images/img4.jpg", alt: "kaka", title: "D", role: "UI/UX Designer" },
    { id: "6", src: "/images/img5.jpg", alt: "Thyda", title: "E", role: "UI/UX Designer" },
    { id: "7", src: "/images/img6.jpg", alt: "Sarath", title: "F", role: "UI/UX Designer" },
    { id: "8", src: "/images/img7.jpg", alt: "Dara", title: "Dara", role: "Backend Dev" },
    { id: "9", src: "/images/img8.jpg", alt: "Borith", title: "Borith", role: "Mobile Dev" },
    { id: "10", src: "/images/img9.JPG", alt: "Kagna", title: "Kagna", role: "Project Manager" },
    { id: "11", src: "/images/img10.JPG", alt: "Member 6", title: "Sokha", role: "Developer" },
    { id: "13", src: "/images/img13.JPG", alt: "Member 7", title: "Vannak", role: "Designer" },
    { id: "14", src: "/images/img14.JPG", alt: "Member 7", title: "Vannak", role: "Designer" },
  ], []);

  // --- States ---
  const [rotation, setRotation] = useState({ x: 15, y: 15 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  // --- គណនាទីតាំងរូបភាពលើស្វ៊ែរ (Fibonacci Sphere) ---
  const spherePositions = useMemo(() => {
    const pos = [];
    const count = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;
      pos.push({
        theta: (azimuth * 180) / Math.PI,
        phi: (inclination * 180) / Math.PI,
        radius: sphereRadius
      });
    }
    return pos;
  }, [images.length, sphereRadius]);

  // --- គណនាទីតាំងក្នុងលំហ 3D (World Positions) ---
  const worldPositions = useMemo(() => {
    return spherePositions.map((pos) => {
      const thetaRad = (pos.theta * Math.PI) / 180;
      const phiRad = (pos.phi * Math.PI) / 180;
      const rotXRad = (rotation.x * Math.PI) / 180;
      const rotYRad = (rotation.y * Math.PI) / 180;

      // ទីតាំងដំបូង
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      // បង្វិលតាមអ័ក្ស Y (Horizontal)
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      
      // បង្វិលតាមអ័ក្ស X (Vertical)
      const y2 = y * Math.cos(rotXRad) - z1 * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z1 * Math.cos(rotXRad);

      // កំណត់ទំហំ Scale តាមរយៈជម្រៅ Z (ជិតធំ ឆ្ងាយតូច)
      const scale = (z2 + sphereRadius) / (2 * sphereRadius);
      const finalScale = 0.4 + scale * 0.6;

      return {
        x: x1, y: y2, z: z2,
        scale: finalScale,
        zIndex: Math.round(1000 + z2),
        isVisible: z2 > -sphereRadius * 0.9,
        fadeOpacity: Math.max(0.1, (z2 + sphereRadius) / (2 * sphereRadius))
      };
    });
  }, [spherePositions, rotation, sphereRadius]);

  // --- ចលនាវិលស្វ័យប្រវត្តិ ---
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setRotation(prev => ({ ...prev, y: (prev.y + autoRotateSpeed) % 360 }));
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [isDragging]);

  // --- ការបញ្ជាដោយ Mouse/Touch ---
  const onMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setRotation(prev => ({ 
        x: prev.x - dy * 0.2, 
        y: prev.y + dx * 0.2 
      }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="team" className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-20">
      
      {/* ចំណងជើង (Title) */}
      <div className="absolute top-8 text-center z-20 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-khmer">
          ក្រុមការងារ <span className="text-emerald-500">របស់យើង</span>
        </h2>
        {/* <p className="text-zinc-500 text-xs mt-2 tracking-[0.4em] uppercase font-bold italic">
          Tech Universe
        </p> */}
      </div>

      {/* Sphere Container */}
      <div 
        className="relative cursor-grab active:cursor-grabbing"
        style={{ 
          width: containerSize, 
          height: containerSize, 
          perspective: '1200px' 
        }}
        onMouseDown={onMouseDown}
      >
        {images.map((member, i) => {
          const pos = worldPositions[i];
          if (!pos || !pos.isVisible) return null;
          
          const isHovered = hoveredIndex === i;
          const size = containerSize * baseImageScale * pos.scale;

          return (
            <div
              key={member.id}
              className="absolute transition-transform duration-300 ease-out"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedMember(member)}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                zIndex: pos.zIndex,
                width: size,
                height: size,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
                opacity: pos.fadeOpacity,
              }}
            >
              {/* កាតរូបភាព (Card UI) */}
              <div 
                className={`w-full h-full rounded-2xl p-1 bg-zinc-900/90 backdrop-blur-md border transition-all duration-500
                  ${isHovered 
                    ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] -translate-y-2' 
                    : 'border-white/10'
                  }`}
              >
                <img 
                  src={member.src} 
                  alt={member.title} 
                  className="w-full h-[75%] object-cover rounded-xl pointer-events-none" 
                />
                <div className="text-center mt-1">
                   <p className="text-[10px] font-bold text-white truncate px-1 uppercase">{member.title}</p>
                   <p className="text-[7px] text-emerald-500 font-black uppercase tracking-tighter">{member.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ផ្ទាំងពន្យល់រូបភាពធំ (Modal) */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" 
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-zinc-900 border border-white/10 p-6 rounded-[2.5rem] max-w-sm w-full relative shadow-2xl scale-in-center"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMember(null)} 
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 border-4 border-emerald-500/20 shadow-emerald-500/10 shadow-xl">
              <img src={selectedMember.src} alt={selectedMember.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{selectedMember.title}</h3>
              <p className="text-emerald-500 font-bold text-sm mb-6 uppercase tracking-widest">{selectedMember.role}</p>
              
              {/* <div className="flex gap-3 justify-center">
                <button className="p-3 rounded-2xl bg-zinc-800 text-white hover:bg-emerald-600 transition-all shadow-lg"><Linkedin size={20} /></button>
                <button className="p-3 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-all shadow-lg"><Github size={20} /></button>
                <button className="flex-1 rounded-2xl bg-emerald-500 text-black font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-emerald-500/20 shadow-lg">Portfolio</button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {/* ព័ត៌មានជំនួយខាងក្រោម */}
      {/* <div className="absolute bottom-10 text-white/20 text-[9px] uppercase tracking-[0.5em] pointer-events-none hidden md:block">
        Drag to Orbit • Click to View • Scroll to Zoom
      </div> */}

    </section>
  );
};

export default TeamSphere;