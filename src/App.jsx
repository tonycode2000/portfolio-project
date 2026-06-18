import React from 'react';
import { motion } from 'framer-motion';
import Projects from './components/ProjectCard'; 
import AnoAI from './components/AnoAI';
import { LimelightNav } from './components/LimelightNav';
import { SocialConnect } from './components/SocialConnect';
import AboutMe from './components/AboutMe';
import OrbitingSkills from './components/Skills';
import Experience from './components/Experience';
import { Hero } from './components/Hero';
import TeamSphere from './components/TeamGalaxy';
import Interests from './components/Interests';
import ServicesAndProject from './components/ServicesAndProject';
import { FAQ } from './components/FAQ';

function App() {
  return (
    <div className="min-h-screen text-white selection:bg-emerald-500/30 relative bg-zinc-950">
      <AnoAI />
      <div className="relative z-10">
        <LimelightNav />
        <main>
          {/* Hero Section */}
          {/* កែសម្រួល៖ បន្ថែម pt-32 និង pb-20 ដើម្បីកុំឱ្យបាំងជាមួយ Navbar លើ Mobile */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            
            {/* Glow Background - Responsive Size */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-150 md:h-150 bg-emerald-500/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: [
                    "0 0 0px rgba(16, 185, 129, 0)",
                    "0 0 10px rgba(16, 185, 129, 0.5)",
                    "0 0 0px rgba(16, 185, 129, 0)"
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  y: { duration: 0.2 },
                  textShadow: { 
                    duration: 1.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="text-emerald-400 font-medium tracking-[0.2em] md:tracking-widest mb-4 uppercase text-[10px] md:text-sm drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"
              >
                Welcome to my portfolio
              </motion.p>
              
              {/* កែសម្រួល៖ ទំហំអក្សរពី text-4xl (Mobile) ដល់ text-7xl (Desktop) */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] md:leading-tight px-2"
              >
                សួស្តី!ខ្ញុំតូនីជា <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  អ្នក Developer កម្មវិធី
                </span>
              </motion.h1>

              {/* កែសម្រួល៖ ទំហំអក្សរអធិប្បាយ និងកម្រិត Max-width */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-xl text-zinc-400 mb-10 max-w-70 sm:max-w-2xl mx-auto leading-relaxed font-khmer px-4"
              >
                ខ្ញុំចូលចិត្តបង្កើតគេហទំព័រដែលស្រស់ស្អាត ដំណើរការលឿន និងផ្តល់បទពិសោធន៍ល្អដល់អ្នកប្រើប្រាស់។
              </motion.p>

              {/* កែសម្រួល៖ ប៊ូតុងរៀបជាជួរឈរលើ Mobile (flex-col) និងជួរដេកលើ Desktop (sm:flex-row) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
              >
                <a href="#projects" className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-black font-black rounded-full hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all text-sm md:text-base text-center shadow-lg shadow-emerald-500/20">
                  មើលស្នាដៃរបស់ខ្ញុំ
                </a>
                <a href="#contact" className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white font-black rounded-full border border-zinc-800 hover:bg-zinc-800 active:scale-95 transition-all text-sm md:text-base text-center">
                  ទាក់ទងមកខ្ញុំ
                </a>
              </motion.div>
            </div>
          </section>

          {/* Sections ផ្សេងៗរក្សាទុកដដែល */}
          <Hero />
          <Interests/>
          <AboutMe />
          <ServicesAndProject/>
          <OrbitingSkills />
          <Experience />
          {/* <Projects /> */}
          <FAQ />
          <SocialConnect />
          <TeamSphere />
        </main>

        {/* Footer Responsive Spacing */}
        <footer className="py-12 px-6 text-center border-t border-white/5 bg-zinc-950/50 backdrop-blur-sm">
          <p className="text-zinc-500 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-khmer leading-loose">
            © 2026 រចនាដោយ <span className="text-emerald-500 font-bold">ANTONY</span> <br className="sm:hidden" /> 
            <span className="hidden sm:inline"> • </span> Svay Rieng University
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;