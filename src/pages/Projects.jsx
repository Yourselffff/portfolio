import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sections } from '../data';

// 3D Tilt Card Component
const TiltCard = ({ item, color, setModal, isVeille = false }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17deg", "-17deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17deg", "17deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setModal({ ...item, color })}
            className="group tilt-card transform-style-3d"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d"
                }}
                className="tilt-card-content"
            >
                <div>
                    <div className="w-12 h-1 rounded mb-4" style={{ background: color, boxShadow: `0 0 20px ${color}` }} />
                    <h3 className="text-2xl font-bold font-header mb-2 tilt-card-title">{item.title}</h3>
                    <span className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded inline-block mb-4">{item.tech}</span>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.desc}
                    </p>
                </div>

                <div className="flex items-center text-sm font-bold" style={{ color: color }}>
                    Voir Détails <span className="ml-2 transition-transform" style={{ display: 'inline-block', transition: 'transform 0.3s' }}>→</span>
                </div>
            </div>

            {/* Holographic Gradient Overlay */}
            <div className="tilt-card-overlay" />
        </motion.div>
    );
};

// ... Rest of the file handling Modal etc. ...
// We need to re-implement the full page structure

import { AnimatePresence } from 'framer-motion';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = sections.find(s => s.id === 'projects');
    const veille = sections.find(s => s.id === 'veille');

    return (
        <div className="page-container relative pt-24 pb-12 px-4 md:px-12 min-h-screen perspective-1000">

            {/* Projects Section */}
            <div className="max-w-7xl mx-auto mb-24">
                <Header title={projects.title} subtitle={projects.subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.items.map((item, idx) => (
                        <TiltCard key={idx} item={item} color={projects.color} setModal={setSelectedProject} />
                    ))}
                </div>
            </div>

            {/* Veille Section */}
            <div className="max-w-7xl mx-auto">
                <Header title={veille.title} subtitle={veille.subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {veille.items.map((item, idx) => (
                        <TiltCard key={idx} item={item} color={veille.color} setModal={setSelectedProject} isVeille={true} />
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

const Modal = ({ item, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-auto"
        onClick={onClose}
    >
        <motion.div
            layoutId={`card-${item.title}`} // Note: layoutId disabled for tilt card simple transition standard
            className="bg-[#1a1a24] w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.8, rotateX: 20 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
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
