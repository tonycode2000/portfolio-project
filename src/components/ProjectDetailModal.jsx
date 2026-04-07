import { X, ExternalLink, ShieldCheck, Zap, Database,ShieldAlert,MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProjectDetailModal = ({ isOpen, onClose }) => {
    const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-4xl rounded-[2.5rem] relative overflow-hidden my-auto">
        
        {/* ប៊ូតុងបិទ */}
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white z-20">
          <X size={28} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* រូបភាព Preview ធំ */}
          <div className="md:w-3/5 bg-[#0a0a0a] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
            <div className="relative w-full group">
                {/* ពន្លឺ Glow នៅពីក្រោយរូបភាព */}
                <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <img 
                src="/images/admin_dashboard.png" 
                alt="OBE Dashboard Preview" 
                className="relative w-full h-auto rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]" 
                style={{ 
                    aspectRatio: '16/9', // កំណត់ឱ្យវាចេញរាងចតុកោណទ្រវែង
                    objectPosition: 'top' // បង្ហាញពីផ្នែកខាងលើនៃ Dashboard ចុះមក
                }} 
                />
            </div>
            </div>

          {/* ព័ត៌មានលម្អិត */}
          <div className="md:w-1/2 p-8 md:p-12 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter font-khmer">
              OBE <span className="text-emerald-500">System</span>
            </h3>
            
            <p className="text-zinc-400 text-sm leading-relaxed font-khmer">
              ប្រព័ន្ធនេះត្រូវបានឌីហ្សាញឡើងដើម្បីកាត់បន្ថយការប្រើប្រាស់ក្រដាស និង Excel ដែលមានភាពស្មុគស្មាញ។ វាជួយឱ្យការតាមដានគុណភាពអប់រំកាន់តែមានតម្លាភាព។
            </p>

            {/* មុខងារបច្ចេកទេស */}
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <ShieldCheck className="text-emerald-500" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Security</h4>
                  <p className="text-zinc-500 text-[10px]">សុវត្ថិភាពទិន្នន័យសិស្ស និងគ្រូខ្ពស់</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Database className="text-emerald-500" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Data Mapping</h4>
                  <p className="text-zinc-500 text-[10px]">ភ្ជាប់ទំនាក់ទំនង CLOs និង PLOs ស្វ័យប្រវត្តិ</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setShowSecurityAlert(true)}
                className="flex-1 py-4 bg-emerald-500 text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
                <ExternalLink size={16} /> Live Demo
              </button>

              <AnimatePresence>
                {showSecurityAlert && (
                    <div className="fixed inset-0 z-110 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-4xl p-8 relative shadow-2xl"
                    >
                        {/* ប៊ូតុងបិទ */}
                        <button 
                        onClick={() => setShowSecurityAlert(false)}
                        className="absolute top-5 right-5 text-zinc-500 hover:text-white"
                        >
                        <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-5">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                            <ShieldAlert size={32} />
                        </div>

                        <h3 className="text-white font-black uppercase tracking-widest text-sm">សេចក្តីជូនដំណឹង</h3>
                        
                        <p className="text-zinc-400 font-khmer text-sm leading-relaxed">
                            ដើម្បីសុវត្ថិភាពទិន្នន័យសាលា ការចូលប្រើប្រាស់ Demo ត្រូវបានកំណត់។ <br />
                            <span className="text-emerald-400 font-bold">សូមទាក់ទងមកខ្ញុំផ្ទាល់</span> ដើម្បីទទួលបានគណនីសាកល្បង។
                        </p>

                        <div className="w-full pt-2 flex gap-3">
                            <button 
                            onClick={() => setShowSecurityAlert(false)}
                            className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-zinc-700 transition-all"
                            >
                            យល់ព្រម
                            </button>
                            <a 
                            href="#contact" 
                            onClick={() => {
                                setShowSecurityAlert(false);
                                onClose(); // បិទទាំង Project Modal ដើម
                            }}
                            className="flex-1 py-3 bg-emerald-500 text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                            >
                            <MessageCircle size={14} /> ទាក់ទងខ្ញុំ
                            </a>
                        </div>
                        </div>
                    </motion.div>
                    </div>
                )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal