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
    <div className="min-h-screen text-white selection:bg-emerald-500/30 relative">
      <AnoAI />
      <div className="relative z-10">
        <LimelightNav />
        <main>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            
            {/* បន្ថែម Glow បន្តិចនៅកណ្តាល ដើម្បីឱ្យស៊ីគ្នាជាមួយ Shader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

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
                  // ចលនាឡើងលើ
                  opacity: { duration: 0.5 },
                  y: { duration: 0.2 },
                  // ចលនា Glow រត់រហូតមិនឈប់ (Infinite)
                  textShadow: { 
                    duration: 1.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="text-emerald-400 font-medium tracking-widest mb-4 uppercase text-sm drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"
              >
                Welcome to my portfolio
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              >
                សួស្តី! ខ្ញុំតូនីជា <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  Developer
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
              >
                ខ្ញុំចូលចិត្តបង្កើតគេហទំព័រដែលស្រស់ស្អាត ដំណើរការលឿន និងផ្តល់បទពិសោធន៍ល្អដល់អ្នកប្រើប្រាស់។
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all">
                  មើលស្នាដៃរបស់ខ្ញុំ
                </a>
                <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-bold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all">
                  ទាក់ទងមកខ្ញុំ
                </a>
              </motion.div>
            </div>
          </section>
          <Hero />
          <Interests/>
          <AboutMe />
          <ServicesAndProject/>
          <OrbitingSkills />
          <Experience />
          <Projects />
          <FAQ />
          <SocialConnect />
          
          <TeamSphere />
        </main>
        <footer className="py-12 text-center border-t border-white/5 bg-zinc-950/50 backdrop-blur-sm">
          <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-khmer">
            © 2026 រចនាដោយ<span className="text-emerald-500 font-bold">ANTONY</span> • Svay Rieng University
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;