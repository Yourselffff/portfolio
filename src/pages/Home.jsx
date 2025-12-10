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

            {/* Experience Section (3D Space Warp Timeline) */}
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
        <section ref={targetRef} id="timeline" className="relative h-[500vh] bg-[#050505]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">

                {/* Space Warp Lines / Stars Background */}
                <WarpBackground scrollYProgress={scrollYProgress} />

                {/* Main Title appearing first */}
                <motion.div
                    style={{
                        z: useTransform(scrollYProgress, [0, 0.2], [0, 1000]),
                        opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                        scale: useTransform(scrollYProgress, [0, 0.2], [1, 3])
                    }}
                    className="absolute z-50 text-center pointer-events-none"
                >
                    <h2 className="text-orange-500 font-bold mb-4 uppercase tracking-[0.5em] text-xl md:text-2xl">{timeline.subtitle}</h2>
                    <h2 className="text-6xl md:text-9xl font-black text-white font-header drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">{timeline.title}</h2>
                    <p className="text-white/60 mt-8 text-xl">Accrochez-vous, passage en hyper-espace.</p>
                </motion.div>

                {/* 3D Timeline Items */}
                {timeline.items && timeline.items.map((item, idx) => {
                    // Calculate scroll ranges for each item
                    // Spread them out over the 0.2 to 1.0 range
                    const startRange = 0.15 + (idx * 0.15);
                    const endRange = startRange + 0.35;
                    // Clamp endRange to 1

                    return (
                        <TimelineItem3D
                            key={idx}
                            item={item}
                            range={[startRange, Math.min(endRange, 1)]}
                            scrollYProgress={scrollYProgress}
                            total={timeline.items.length}
                            index={idx}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const TimelineItem3D = ({ item, range, scrollYProgress, index }) => {
    // Z-Axis movement: Start far away (-2000px), move past camera (1000px)
    const z = useTransform(scrollYProgress, range, [-2000, 1000]);

    // Fade in when appearing, fade out when too close
    const opacity = useTransform(scrollYProgress, [range[0], range[0] + 0.05, range[1] - 0.1, range[1]], [0, 1, 1, 0]);

    // Randomize slight positioning for "floating" feel, but keep legible
    const xOffset = index % 2 === 0 ? "-25%" : "25%";
    const rotZ = index % 2 === 0 ? -2 : 2;

    return (
        <motion.div
            style={{ z, opacity, x: xOffset, rotateZ: rotZ }}
            className="absolute flex flex-col items-center justify-center p-8 md:p-12 w-[85vw] md:w-[600px] border border-white/20 bg-black/60 backdrop-blur-xl rounded-3xl shadow-[0_0_100px_rgba(249,115,22,0.15)] will-change-transform transform-gpu"
        >
            <div className="absolute -top-6 md:-top-10 bg-orange-500 text-black font-black text-2xl md:text-4xl px-4 md:px-6 py-2 md:py-4 rounded-full shadow-[0_0_30px_#f97316]">
                {item.year}
            </div>

            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 text-center mt-4 md:mt-6">{item.role}</h3>

            <p className="text-gray-300 text-base md:text-2xl text-center leading-relaxed font-light">
                {item.desc}
            </p>

            <div className="mt-6 md:mt-8 flex gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-orange-500 animate-pulse delay-75" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse delay-150" />
            </div>
        </motion.div>
    )
}

const WarpBackground = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    return (
        <motion.div
            style={{ scale, opacity }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:50px_50px] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f97316_2px,_transparent_2px)] bg-[length:150px_150px] opacity-10" />
        </motion.div>
    );
}
