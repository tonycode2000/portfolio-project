import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Gamepad2, Plane, Coffee, BookOpen, Music } from 'lucide-react';

const interests = [
  { icon: <Camera size={24} />, label: "ថតរូប", desc: "Street Photography" },
  { icon: <Gamepad2 size={24} />, label: "ហ្គេម", desc: "Strategy & RPG" },
  { icon: <Plane size={24} />, label: "ដើរកម្សាន្ត", desc: "Nature & Mountains" },
  { icon: <Coffee size={24} />, label: "កាហ្វេ", desc: "Espresso Lover" },
  { icon: <BookOpen size={24} />, label: "អានសៀវភៅ", desc: "Self-Improvement" },
  { icon: <Music size={24} />, label: "តន្ត្រី", desc: "Lofi & Jazz" },
];

const Interests = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase font-khmer">
            អ្វីដែលខ្ញុំ <span className="text-emerald-500">ចូលចិត្ត</span>
          </h2>
          <p className="text-zinc-500 text-xs mt-3 uppercase tracking-[0.3em]">Personal Side</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {interests.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-6 rounded-4xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center group hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-white text-sm font-bold font-khmer mb-1">{item.label}</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;