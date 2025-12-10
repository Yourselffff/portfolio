import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../data';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = sections.find(s => s.id === 'projects');
    const veille = sections.find(s => s.id === 'veille');

    // Combine both projects and veille for a "Work" page, or keep them separate sections
    // User wants "Projets et Skill dans des pages differentes" -> Projects page

    return (
        <div className="page-container relative pt-24 pb-12 px-4 md:px-12 min-h-screen">

            {/* Projects Section */}
            <div className="max-w-7xl mx-auto mb-24">
                <Header title={projects.title} subtitle={projects.subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.items.map((item, idx) => (
                        <ProjectCard key={idx} item={item} color={projects.color} setModal={setSelectedProject} />
                    ))}
                </div>
            </div>

            {/* Veille Section */}
            <div className="max-w-7xl mx-auto">
                <Header title={veille.title} subtitle={veille.subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {veille.items.map((item, idx) => (
                        <ProjectCard key={idx} item={item} color={veille.color} setModal={setSelectedProject} isVeille={true} />
                    ))}
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedProject && (
                    <Modal item={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

const Header = ({ title, subtitle }) => (
    <div className="mb-12 border-l-4 border-white/20 pl-6">
        <h3 className="text-xl uppercase tracking-widest text-white/60 mb-2 font-header">{subtitle}</h3>
        <h2 className="text-4xl md:text-5xl font-bold font-header text-white">{title}</h2>
    </div>
);

const ProjectCard = ({ item, color, setModal, isVeille = false }) => (
    <motion.div
        layoutId={`card-${item.title}`}
        onClick={() => setModal({ ...item, color })}
        className="group relative bg-[#101018] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
    >
        <div className={`h-2 w-full`} style={{ background: color }}></div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white font-header group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <span className="text-xs font-mono text-white/50 border border-white/10 px-2 py-1 rounded">{item.tech}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {item.desc}
            </p>
            <div className="mt-6 flex items-center text-sm font-bold" style={{ color: color }}>
                Voir Détails <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
        </div>
    </motion.div>
);

const Modal = ({ item, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            layoutId={`card-${item.title}`}
            className="bg-[#1a1a24] w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
        >
            <div className={`h-2 w-full`} style={{ background: item.color || '#fff' }}></div>
            <div className="p-8 md:p-12 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>

                <h2 className="text-3xl font-bold mb-2 font-header" style={{ color: item.color || '#fff' }}>{item.title}</h2>
                <div className="text-white/60 font-mono mb-8">{item.tech}</div>

                <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-line text-gray-300">
                        {item.longDesc || item.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    </motion.div>
);
