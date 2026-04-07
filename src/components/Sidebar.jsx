import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { navLinks } from '../data/navigation';

// ទទួលយក activeSection ពី Navbar
const Sidebar = ({ isOpen, toggleSidebar, activeSection }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-70 bg-zinc-950 border-r border-zinc-800/50 z-70 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0 shadow-2xl shadow-emerald-900/20' : '-translate-x-full'}`}>
        
        <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
              K
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">YourName</h1>
              <p className="text-emerald-400 text-xs font-medium">Developer</p>
            </div>
          </div>
          
          <button 
            onClick={toggleSidebar} 
            className="p-2 -mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks?.map((link) => {
              // កាត់យកតែឈ្មោះ id ដើម្បីប្រៀបធៀបជាមួយ activeSection
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                    onClick={toggleSidebar}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-zinc-800/50">
          <a 
            href="#contact" 
            onClick={toggleSidebar}
            className="flex justify-center items-center w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            ទាក់ទងខ្ញុំ (Hire Me)
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;