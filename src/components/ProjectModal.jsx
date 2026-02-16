import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Layers, Target, Zap, Award } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-primary border border-secondary w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl pointer-events-auto relative flex flex-col md:flex-row"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-accent hover:text-white transition-colors z-20 backdrop-blur-md"
                aria-label="Close project details"
              >
                <X size={24} />
              </button>

              {/* Image / Visual Side */}
              <div className="w-full md:w-5/12 bg-secondary/30 relative flex flex-col overflow-hidden">
                {project.thumbnail || (project.screenshots && project.screenshots.length > 0) ? (
                  <div className="h-full w-full relative">
                    <img 
                      src={project.thumbnail || project.screenshots[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <h3 className="text-2xl font-bold text-text mb-2">{project.title}</h3>
                      <p className="text-text-muted font-mono text-sm">{project.role}</p>
                    </div>
                    {/* Screenshot Gallery Indicator */}
                    {project.screenshots && project.screenshots.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-mono">
                        {project.screenshots.length} screenshots
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-64 md:h-full w-full bg-gradient-to-br from-accent/10 to-primary flex items-center justify-center p-8 relative overflow-hidden">
                    {/* Abstract Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                    
                    <div className="z-10 text-center">
                      <Layers size={64} className="text-accent mx-auto mb-4 opacity-50" />
                      <h3 className="text-2xl font-bold text-text mb-2">{project.title}</h3>
                      <p className="text-text-muted font-mono text-sm">{project.role}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Details Side */}
              <div className="w-full md:w-7/12 p-8 overflow-y-auto max-h-[60vh] md:max-h-full bg-primary custom-scrollbar">
                <div className="mb-8">
                  <div className="flex items-center gap-3 text-accent font-mono text-xs mb-3">
                    <span className="px-2 py-1 bg-accent/10 rounded">FEATURED PROJECT</span>
                    <span>•</span>
                    <span>2023</span>
                  </div>
                  <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-text mb-4">{project.title}</h2>
                  <p id="project-modal-description" className="text-text-muted text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Problem & Solution Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-secondary/10 p-5 rounded-xl border border-secondary/50">
                      <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                        <Target size={20} className="text-red-400" /> The Problem
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">{project.problem || "Information not available."}</p>
                    </div>
                    <div className="bg-secondary/10 p-5 rounded-xl border border-secondary/50">
                      <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" /> The Solution
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">{project.solution || "Information not available."}</p>
                    </div>
                  </div>

                  {/* Challenges & Outcomes */}
                  <div className="bg-gradient-to-br from-secondary/20 to-primary p-6 rounded-xl border border-accent/20">
                     <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                        <Award size={20} className="text-green-400" /> Key Outcomes & Challenges
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-text-muted text-sm mb-1 uppercase tracking-wider text-xs">Impact</h4>
                          <p className="text-text text-sm">{project.outcomes || "Information not available."}</p>
                        </div>
                        <div className="h-px bg-secondary/50 w-full"></div>
                        <div>
                          <h4 className="font-bold text-text-muted text-sm mb-1 uppercase tracking-wider text-xs">Technical Challenges</h4>
                          <p className="text-text-muted text-sm italic">"{project.challenges || "Information not available."}"</p>
                        </div>
                      </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-bold text-text mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-secondary text-accent rounded-full text-xs font-mono border border-accent/20 hover:bg-accent/10 transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 sticky bottom-0 bg-primary pb-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 font-bold group"
                    >
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                      View Code
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-accent text-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-300 font-bold group"
                    >
                      <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
