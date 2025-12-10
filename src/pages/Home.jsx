import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { sections } from '../data';

export default function Home() {
    const intro = sections.find(s => s.id === 'intro') || {};
    const about = sections.find(s => s.id === 'about') || {};
    const timeline = sections.find(s => s.id === 'timeline') || {};
    const contact = sections.find(s => s.id === 'contact') || {};

    // 1. Mouse Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        x.set(clientX - centerX);
        y.set(clientY - centerY);
    };

    // Parallax Transforms
    const planetX = useTransform(mouseXSpring, [-500, 500], [20, -20]);
    const planetY = useTransform(mouseYSpring, [-500, 500], [20, -20]);
    const textX = useTransform(mouseXSpring, [-500, 500], [-10, 10]);

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

            {/* Hero Section (Intro) */}
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

            {/* Experience Section (Tunnel/Stargate Effect) */}
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
        offset: ["start start", "end end"]
    });

    return (
        <section ref={targetRef} id="timeline" className="relative h-[400vh] bg-black z-40">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Tunnel Effect */}
                <TunnelBackground scrollYProgress={scrollYProgress} />

                {/* Title */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                        scale: useTransform(scrollYProgress, [0, 0.15], [1, 2])
                    }}
                    className="absolute z-50 text-center pointer-events-none"
                >
                    <h2 className="text-orange-500 font-bold mb-4 uppercase tracking-[0.5em] text-xl">{timeline.subtitle}</h2>
                    <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl">{timeline.title}</h2>
                </motion.div>

                {/* Cards zooming in */}
                {timeline.items && timeline.items.map((item, idx) => (
                    <TunnelItem
                        key={idx}
                        item={item}
                        index={idx}
                        total={timeline.items.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
};

const TunnelItem = ({ item, index, total, scrollYProgress }) => {
    // Calculate trigger points
    const stepSize = 0.8 / total;
    const start = 0.1 + (index * stepSize);
    const end = start + stepSize + 0.1;

    // Scale from 0 (background) to 1 (foreground) then 3 (past)
    const scale = useTransform(scrollYProgress, [start, end], [0.2, 2]);
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, end], ["30%", "-10%"]); // Slight Upward motion to simulate "passing under" or "into"

    return (
        <motion.div
            style={{ scale, opacity, y }}
            className="absolute p-8 md:p-12 w-[90vw] md:w-[800px] border border-orange-500/20 bg-black/80 backdrop-blur-md rounded-3xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(249,115,22,0.1)] origin-center z-40"
        >
            <div className="bg-orange-500 text-black font-bold px-6 py-2 rounded-full mb-6">
                {item.year}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">{item.role}</h3>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{item.desc}</p>
        </motion.div>
    );
};

const TunnelBackground = ({ scrollYProgress }) => {
    // Simple radial gradient pulsing
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 4]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
                style={{ scale, rotate }}
                className="absolute inset-[-50%] w-[200%] h-[200%] flex items-center justify-center opacity-30"
            >
                <div className="absolute w-[80vw] h-[80vw] border-[1px] border-orange-900/30 rounded-full scale-[2]" />
                <div className="absolute w-[60vw] h-[60vw] border-[2px] border-orange-800/30 rounded-full scale-[1.5]" />
                <div className="absolute w-[40vw] h-[40vw] border-[3px] border-orange-600/30 rounded-full" />
                <div className="absolute w-[20vw] h-[20vw] border-[4px] border-orange-500/20 rounded-full scale-[0.5]" />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_80%)]" />
        </div>
    );
};
