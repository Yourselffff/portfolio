import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { sections } from '../data';

export default function Home() {
    const intro = sections.find(s => s.id === 'intro') || {};
    const about = sections.find(s => s.id === 'about') || {};
    const timeline = sections.find(s => s.id === 'timeline') || {};
    const contact = sections.find(s => s.id === 'contact') || {};

    // 1. Mouse Parallax Logic
    // We track mouse position relative to the window center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Create a smooth spring animation for the tracking
    const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate distance from center (Example: -500 to 500)
        x.set(clientX - centerX);
        y.set(clientY - centerY);
    };

    // Parallax Transforms
    const planetX = useTransform(mouseXSpring, [-500, 500], [20, -20]); // Moves opposite to mouse (Depth effect)
    const planetY = useTransform(mouseYSpring, [-500, 500], [20, -20]);
    const textX = useTransform(mouseXSpring, [-500, 500], [-10, 10]); // Moves with mouse slightly

    // 2. Scroll Logic
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    if (!intro.id) {
        return <div className="min-h-screen text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div ref={containerRef} className="min-h-screen relative" onMouseMove={handleMouseMove}>

            {/* Hero Section (Intro) - NOW REACTIVE TO MOUSE */}
            <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
                    <motion.div
                        style={{ x: textX, y: planetY }}
                        className="flex-1 text-center md:text-left mb-12 md:mb-0"
                    >
                        <h2 className="text-cyan-400 font-bold mb-4 tracking-widest uppercase">{intro.subtitle}</h2>
                        <h1 className="text-6xl md:text-8xl font-black font-header mb-6 text-white drop-shadow-lg">{intro.title}</h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">{intro.description}</p>
                    </motion.div>

                    <motion.div
                        className="flex-1 flex justify-center"
                        style={{ x: planetX, y: planetY, rotate }}
                    >
                        <div className="relative">
                            <img src={intro.planet} alt="Earth" className="planet-img w-[300px] md:w-[600px] object-contain drop-shadow-2xl" />
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            {about.id && (
                <section id="about" className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                        <motion.div
                            style={{ rotate: useTransform(scrollYProgress, [0.1, 0.4], [0, -90]) }}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex justify-center"
                        >
                            <img src={about.planet} alt="Mars" className="planet-img w-[300px] md:w-[500px] object-contain" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <h2 className="text-red-400 font-bold mb-2 uppercase">{about.subtitle}</h2>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-header">{about.title}</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">{about.description}</p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Experience Section (Horizontal Scroll "Apple Style") */}
            {timeline.id && (
                <TimelineSection timeline={timeline} />
            )}

            {/* Contact Footer */}
            {contact.id && (
                <footer id="contact" className="py-24 border-t border-white/5 relative overflow-hidden">
                    <motion.div
                        style={{ rotate: useTransform(scrollYProgress, [0.8, 1], [0, 45]) }}
                        className="absolute bottom-[-20%] left-[-10%] opacity-20 pointer-events-none"
                    >
                        <img src={contact.planet} alt="Earth" className="w-[600px] h-[600px] object-contain blur-md" />
                    </motion.div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl font-bold text-white font-header mb-8">{contact.title}</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">{contact.description}</p>

                        <div className="flex justify-center gap-6 flex-wrap">
                            {contact.links && contact.links.map(link => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.1, backgroundColor: '#fff', color: '#000' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold transition-all flex items-center gap-2"
                                >
                                    {link.icon} {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}

const TimelineSection = ({ timeline }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map vertical scroll (0 to 1) to horizontal movement (0% to -X%)
    // Adjust -55% based on number of items to ensure we see the last one
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} id="timeline" className="relative h-[300vh] bg-black/10">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Section Header (Fixed or moving slowly) */}
                <div className="container mx-auto px-6 mb-12 relative z-20">
                    <h2 className="text-orange-400 font-bold mb-2 uppercase tracking-widest">{timeline.subtitle}</h2>
                    <h2 className="text-5xl md:text-7xl font-bold text-white font-header">{timeline.title}</h2>
                    <p className="text-white/50 mt-4 max-w-md">Défilez vers le bas pour explorer mon parcours temporel →</p>
                </div>

                {/* Horizontal Scrolling Cards */}
                <motion.div style={{ x }} className="flex gap-12 px-24 w-max items-center">
                    {timeline.items && timeline.items.map((item, idx) => (
                        <div key={idx} className="group relative w-[500px] h-[400px] flex-shrink-0 perspective-1000">
                            <div className="w-full h-full bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-orange-500/30 hover:scale-105 shadow-2xl">

                                {/* Year Badge */}
                                <div className="absolute -top-6 -left-6 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black text-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] z-10">
                                    {item.year}
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{item.role}</h3>
                                    <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent mb-6" />
                                    <p className="text-lg text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className="text-orange-400 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1} / 0{timeline.items.length}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent -z-10" />
            </div>
        </section>
    );
};
