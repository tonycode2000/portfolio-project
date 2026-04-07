import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Code2, Smartphone, Layout, School, CheckCircle2, ArrowRight } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

const ServicesAndProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-24 px-6 ">
      <div className="max-w-6xl mx-auto">
        
        {/* === PART 1: MY SERVICES === */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 font-khmer">
              សេវាកម្ម <span className="text-emerald-500">ជំនាញ</span>
            </h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((s, i) => (
              <div key={i} className="p-8 rounded-4xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="text-white font-bold mb-3 font-khmer">{s.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-khmer">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === PART 2: FEATURED PROJECT (OBE SYSTEM) === */}
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900/20 border border-white/5 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* ផ្នែកអត្ថបទពន្យល់ */}
            <div className="lg:w-1/2">
              <span className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                Featured Project
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-6 mb-4 font-khmer leading-tight">
                Outcome-Based Education <br />
                <span className="text-emerald-500">System (OBE)</span>
              </h2>
              <p className="text-zinc-400 font-khmer text-sm mb-8 leading-relaxed">
                ប្រព័ន្ធគ្រប់គ្រងការសិក្សាបែបឌីជីថល បង្កើតឡើងយ៉ាងពិសេសសម្រាប់ 
                <span className="text-white font-bold"> មហាវិទ្យាល័យវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា នៃសកលវិទ្យាល័យស្វាយរៀង</span>។
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-zinc-300 text-xs font-khmer">ប្តូរការងារពី Excel មកជា Web-based ស្វ័យប្រវត្តិ ១០០%</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-zinc-300 text-xs font-khmer">គ្រប់គ្រង CLOs, PLOs និងការវាយតម្លៃលទ្ធផលសិក្សាសិស្ស</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-zinc-300 text-xs font-khmer">តួនាទីប្រើប្រាស់ច្បាស់លាស់សម្រាប់ Admin, Program Manager, Dean, និងTeacher</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)} 
                className="flex items-center gap-2 text-white font-bold hover:text-emerald-500 transition-colors group uppercase text-xs tracking-widest">
                មើលព័ត៌មានលម្អិត <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* ផ្នែករូបភាព Screenshot (Mockup) */}
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
              <img 
                src="/images/admin_dashboard.png" 
                alt="OBE System Dashboard" 
                className="relative rounded-2xl border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

          </div>
        </div>

      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ProjectDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
    
  );
};

const servicesData = [
  { title: "Web Dev", desc: "React, Next.js, Backend Solutions", icon: <Code2 size={32} className="text-emerald-500" /> },
  { title: "Mobile App", desc: "Flutter Development", icon: <Smartphone size={32} className="text-emerald-500" /> },
  { title: "UI/UX Design", desc: "Modern Interfaces with Figma", icon: <Layout size={32} className="text-emerald-500" /> },
  { title: "OBE Specialist", desc: "Education Management Systems", icon: <School size={32} className="text-emerald-500" /> },
];

export default ServicesAndProject;