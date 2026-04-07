import React from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import { GlowCard } from './GlowCard';

const ProjectCard = () => {
  return (
    <section id="projects" className="py-24 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">My <span className="text-emerald-400">Projects</span></h2>
          <p className="text-zinc-400 text-lg font-khmer">ស្នាដៃមួយចំនួនដែលខ្ញុំបានបង្កើតកន្លងមក</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard glowColor="green" className="h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-zinc-800 m-2 rounded-2xl">
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src={`https://grainy-gradients.vercel.app/noise.svg`} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20" 
                    alt="noise" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-zinc-700 uppercase tracking-widest">
                    {project.title.split(' ')[0]}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed font-khmer">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold bg-white/5 text-emerald-400/80 px-2.5 py-1 rounded-md border border-white/5 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" rel="noreferrer"
                        className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black text-center py-2 rounded-xl text-sm font-bold transition-all border border-emerald-500/20"
                      >
                        Demo
                      </a>
                    )}
                    <a 
                      href={project.githubUrl} 
                      target="_blank" rel="noreferrer"
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white text-center py-2 rounded-xl text-sm font-bold transition-all border border-white/10"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;