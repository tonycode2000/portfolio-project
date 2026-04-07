import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "តើអ្នកទទួលធ្វើគម្រោងម្នាក់ឯង ឬជាក្រុម?",
    answer: "ខ្ញុំអាចធ្វើការបានទាំងម្នាក់ឯងសម្រាប់គម្រោងតូចៗ និងជាក្រុម (Team Galaxy) សម្រាប់គម្រោងធំៗដូចជាប្រព័ន្ធគ្រប់គ្រងសាលារៀន ឬអាជីវកម្មខ្នាតធំ ដើម្បីធានាបាននូវគុណភាព និងល្បឿនការងារ។"
  },
  {
    question: "តើគម្រោងមួយប្រើពេលយូរប៉ុណ្ណាដើម្បីបញ្ចប់?",
    answer: "រយៈពេលអាស្រ័យលើទំហំការងារ។ ឧទាហរណ៍៖ គេហទំព័រ Landing Page អាចប្រើពេល ១-២ សប្តាហ៍ ចំណែកឯប្រព័ន្ធគ្រប់គ្រងស្មុគស្មាញ (ដូចជា OBE System) អាចប្រើពេលពី ១ ទៅ ៣ ខែ។"
  },
  {
    question: "តើអ្នកមានសេវាកម្មថែទាំ (Maintenance) ក្រោយបញ្ចប់គម្រោងដែរឬទេ?",
    answer: "បាទ! ខ្ញុំផ្ដល់ការគាំទ្របច្ចេកទេស និងការថែទាំដោយឥតគិតថ្លៃក្នុងរយៈពេល ១ ខែដំបូង ដើម្បីធានាថាប្រព័ន្ធដើរបានរលូន និងមិនមានកំហុសបច្ចេកទេស។"
  },
  {
    question: "តើខ្ញុំអាចទាក់ទងពិភាក្សាគម្រោងដោយមិនគិតថ្លៃបានទេ?",
    answer: "ពិតជាបាន! អ្នកអាចផ្ញើសារមកខ្ញុំតាមរយៈ Telegram ឬបំពេញ Form ខាងក្រោម ដើម្បីរៀបចំការជួបពិភាក្សាពីតម្រូវការ និងថវិកាសម្រាប់គម្រោងរបស់អ្នក។"
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-sm md:text-base font-bold font-khmer transition-colors ${isOpen ? 'text-emerald-400' : 'text-zinc-300 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-emerald-500 text-black rotate-0' : 'bg-zinc-900 text-zinc-500 rotate-90'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-500 text-sm font-khmer leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-khmer">
            សំណួរដែល <span className="text-emerald-500">សួរញឹកញាប់</span>
          </h2>
          <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-[0.4em] font-bold">Frequently Asked Questions</p>
        </div>

        <div className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] px-8 md:px-12 backdrop-blur-xl shadow-2xl shadow-emerald-500/5">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-600 text-xs font-khmer italic">
            នៅមានសំណួរផ្សេងទៀតមែនទេ? <a href="#contact" className="text-emerald-500 font-bold hover:underline ml-1">ផ្ញើសារមកខ្ញុំឥឡូវនេះ</a>
          </p>
        </div>
      </div>
    </section>
  );
};