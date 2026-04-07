import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { navLinks } from '../data/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar, activeSection }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Overlay (ផ្ទៃខាងក្រោយងងឹត) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-60 lg:hidden"
          />

          {/* 2. Sidebar Panel */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-70 sm:w-[320px] bg-zinc-950 border-r border-zinc-800/50 z-70 lg:hidden flex flex-col shadow-2xl shadow-emerald-500/10"
          >
            
            {/* Header: Logo & Close Button */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
                  T
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">Tony Phan</h1>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Full-Stack Dev</p>
                </div>
              </div>
              
              <button 
                onClick={toggleSidebar} 
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all active:scale-90"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-8 overflow-y-auto scrollbar-hide">
              <ul className="space-y-3">
                {navLinks?.map((link, index) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={toggleSidebar}
                        className={`group flex items-center gap-4 px-4 py-4 rounded-2xl font-khmer text-sm font-medium transition-all active:scale-95 ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                        }`}
                      >
                        {/* Dot Indicator for Active Link */}
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-emerald-400 scale-100' : 'bg-transparent scale-0'}`} />
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer Action */}
            <div className="p-6 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl">
              <a 
                href="#contact" 
                onClick={toggleSidebar}
                className="flex justify-center items-center w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] active:scale-95 font-khmer"
              >
                ទាក់ទងខ្ញុំ (Hire Me)
              </a>
              <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase tracking-tighter">
                © 2026 Tony Phan • Portfolio
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;