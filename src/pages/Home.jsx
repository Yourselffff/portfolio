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

            {/* Experience Section (Vertical Warp Beam) */}
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
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={targetRef} id="timeline" className="relative py-32 bg-[#050505]">

            {/* Header */}
            <div className="container mx-auto px-6 mb-24 text-center relative z-20">
                <h2 className="text-orange-400 font-bold mb-4 uppercase tracking-[0.2em]">{timeline.subtitle}</h2>
                <h2 className="text-5xl md:text-7xl font-bold text-white font-header drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{timeline.title}</h2>
                <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">Une ascension constante à travers les technologies et les défis.</p>
            </div>

            <div className="container mx-auto px-6 relative">

                {/* Central Beam Container */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-white/10 rounded-full h-full overflow-hidden">
                    {/* Filling Beam */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="w-full h-full bg-gradient-to-b from-orange-400 via-orange-500 to-red-600 shadow-[0_0_20px_#f97316]"
                    />
                </div>

                {/* Items */}
                <div className="space-y-24 md:space-y-32">
                    {timeline.items && timeline.items.map((item, idx) => (
                        <TimelineItem key={idx} item={item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item, idx }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const x = useTransform(scrollYProgress, [0.2, 0.5], [idx % 2 === 0 ? -50 : 50, 0]);

    // On mobile, everything is left aligned to the beam (beam is at left: 20px)
    // On desktop, beam is center, so we alternate left/right.
    const isEven = idx % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x }}
            className={`relative flex flex-col md:flex-row items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Spacer for Desktop Alignment */}
            <div className="hidden md:block flex-1" />

            {/* Central Node on the Beam */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-black border-2 border-orange-500 rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_15px_orange] mt-8 md:mt-0" />

            {/* Content Card */}
            <div className="flex-1 w-full pl-16 md:pl-16 md:pr-0">
                <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,140,0,0.05)" }}
                    className={`relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]`}
                >
                    {/* Glowing Corner */}
                    <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col gap-4 relative z-10">
                        <span className="inline-block bg-orange-500/10 text-orange-400 font-bold px-4 py-1 rounded-full text-sm w-fit border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                            {item.year}
                        </span>

                        <h3 className="text-3xl font-bold text-white leading-tight">
                            {item.role}
                        </h3>

                        <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-transparent" />

                        <p className="text-gray-400 text-lg leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
