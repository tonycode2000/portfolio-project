import { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SocialConnect = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // សម្រាប់ឆែកទម្រង់អ៊ីមែល

    if (!data.user_name.value.trim()) {
      errors.user_name = "សូមបញ្ចូលឈ្មោះរបស់អ្នក";
    }
    
    if (!data.user_email.value.trim()) {
      errors.user_email = "សូមបញ្ចូលអ៊ីមែល";
    } else if (!emailRegex.test(data.user_email.value)) {
      errors.user_email = "ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវឡើយ (ឧទាហរណ៍: name@mail.com)";
    }

    if (!data.message.value.trim()) {
      errors.message = "សូមសរសេរសារខ្លះមកកាន់ខ្ញុំ";
    } else if (data.message.value.length < 10) {
      errors.message = "សារត្រូវមានយ៉ាងហោចណាស់ ១០ តួអក្សរ";
    }

    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(e.target);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }
    setErrors({});
    setStatus("កំពុងផ្ញើ...");

    const SERVICE_ID = "service_0z8ty68"; 
    const TEMPLATE_ID = "template_3vq13mh";
    const PUBLIC_KEY = "Ddi3pkAaMxvQ6LXdH";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus("រួចរាល់! សាររបស់អ្នកត្រូវបានផ្ញើ។");
          e.target.reset(); // លុបអត្ថបទក្នុង Form ចេញក្រោយផ្ញើរួច
      }, (error) => {
          console.log(error.text);
          setStatus("បរាជ័យ! សូមព្យាយាមម្តងទៀត។");
      });
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* ផ្នែកខាងឆ្វេង: អត្ថបទ និង Social Icons */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            តោះ! <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">ភ្ជាប់ទំនាក់ទំនង</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-12 font-khmer"
          >
            មានគម្រោងចង់ពិភាក្សា ឬចង់សហការការងារជាមួយខ្ញុំមែនទេ? អ្នកអាចផ្ញើសារមកខ្ញុំដោយផ្ទាល់ ឬតាមរយៈបណ្ដាញសង្គមខាងក្រោម។
          </motion.p>

          {/* Social Icons Grid */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <SocialIcon 
              href="https://www.facebook.com/to.ny.429226" 
              label="Facebook" 
              color="hover:bg-blue-600" 
              icon={<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>} 
            />
            <SocialIcon 
              href="https://github.com/dashboard" 
              label="GitHub" 
              color="hover:bg-zinc-800" 
              icon={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>} 
            />
            <SocialIcon 
              href="https://www.linkedin.com/in/phan-tony-846002342/" 
              label="LinkedIn" 
              color="hover:bg-blue-700" 
              icon={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>} 
            />
            <SocialIcon 
              href="https://t.me/deAntonyBlenkov369" 
              label="Telegram" 
              color="hover:bg-sky-500" 
              icon={<><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>} 
            />
            <SocialIcon 
              href="https://wa.me/855977592822" 
              label="WhatsApp" 
              color="hover:bg-green-500" 
              icon={
                <path 
                  fill="currentColor"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.543 4.191 1.577 6.023L0 24l6.105-1.602a11.845 11.845 0 005.937 1.633h.005c6.631 0 12.028-5.391 12.031-12.028a11.85 11.85 0 00-3.527-8.515z"
                />
              } 
            />
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10"
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2 ml-1">ឈ្មោះរបស់អ្នក</label>
              <input
                name="user_name" 
                type="text"
                placeholder="បញ្ចូលឈ្មោះ..."
                className={`w-full px-6 py-4 bg-black/40 border rounded-2xl text-white outline-none transition-all placeholder:text-zinc-800
                  ${errors.user_name ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              />
              {errors.user_name && <p className="text-red-500 text-[10px] ml-2 font-bold italic">{errors.user_name}</p>}
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2 ml-1">អ៊ីមែល</label>
              <input
                name="user_email"
                type="text" // ប្តូរជា text ដើម្បីឱ្យ Validation របស់យើងធ្វើការងារជំនួស Browser
                placeholder="example@mail.com"
                className={`w-full px-6 py-4 bg-black/40 border rounded-2xl text-white outline-none transition-all placeholder:text-zinc-800
                  ${errors.user_email ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              />
              {errors.user_email && <p className="text-red-500 text-[10px] ml-2 font-bold italic">{errors.user_email}</p>}
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2 ml-1">សាររបស់អ្នក</label>
              <textarea
                name="message"
                rows="4"
                placeholder="សរសេរសារនៅទីនេះ..."
                className={`w-full px-6 py-4 bg-black/40 border rounded-3xl text-white outline-none transition-all placeholder:text-zinc-800 resize-none
                  ${errors.message ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-[10px] ml-2 font-bold italic">{errors.message}</p>}
            </div>
            {status && (
              <p className={`text-center text-xs font-bold tracking-wide ${status.includes('✅') ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {status}
              </p>
            )}
            <button
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              ផ្ញើសារឥឡូវនេះ
            </button>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .social-icon-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #a1a1aa;
        }
        .social-link:hover .icon-box {
          transform: translateY(-8px) rotate(8deg);
          color: white;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
        .social-link:hover span {
          color: white;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

// Helper Component សម្រាប់ Social Icons
const SocialIcon = ({ href, icon, label, color }) => (
  <a href={href} target="_blank" rel="noreferrer" className="social-link group flex flex-col items-center gap-2 no-underline">
    <div className={`icon-box ${color}`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </div>
    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest opacity-60 transition-opacity">
      {label}
    </span>
  </a>
);

export { SocialConnect };