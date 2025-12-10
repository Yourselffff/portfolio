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

            {/* Experience Section (Persistent Vertical Laser-Line Timeline) */}
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
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Animate the line filling up as we scroll
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={ref} id="timeline" className="relative py-32 bg-black overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a1a1a_0%,_#000000_100%)] pointer-events-none" />
            <div className="absolute top-0 left-[21px] md:left-1/2 md:-translate-x-1/2 w-[1px] h-full bg-orange-500/10" /> {/* Guiding line trace */}

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-orange-500 font-bold mb-4 uppercase tracking-[0.3em] text-lg">{timeline.subtitle}</h2>
                        <h2 className="text-5xl md:text-7xl font-black text-white">{timeline.title}</h2>
                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                            {timeline.description}
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* The Laser Line */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-red-600 shadow-[0_0_15px_#f97316] md:-translate-x-1/2 rounded-full"
                    />

                    {/* Timeline Items */}
                    <div className="space-y-24">
                        {timeline.items && timeline.items.map((item, idx) => (
                            <TimelineItem
                                key={idx}
                                item={item}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Spacer for layout balance on Desktop */}
            <div className="hidden md:block flex-1" />

            {/* Central Dot */}
            <div className="absolute left-[13px] md:left-1/2 w-4 h-4 bg-black border-[3px] border-orange-500 rounded-full md:-translate-x-1/2 z-20 shadow-[0_0_10px_#f97316] mt-8 md:mt-8 shrink-0" />

            {/* Card */}
            <div className="flex-1 w-full pl-16 md:pl-0 md:px-16 pt-2">
                <motion.div
                    whileHover={{ y: -5, backgroundColor: "rgba(255,100,0,0.05)" }}
                    className="group relative bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl md:rounded-3xl hover:border-orange-500/50 transition-all duration-300 shadow-xl"
                >
                    {/* Year Badge */}
                    <div className="absolute -top-4 right-8 bg-orange-600 text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg shadow-orange-900/40">
                        {item.year}
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {item.role}
                    </h3>

                    <div className="h-0.5 w-12 bg-orange-500/30 mb-4 group-hover:w-24 group-hover:bg-orange-500 transition-all duration-500" />

                    <p className="text-gray-400 text-lg leading-relaxed">
                        {item.desc}
                    </p>

                    {/* Decorative glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl md:rounded-3xl pointer-events-none" />
                </motion.div>
            </div>
        </motion.div>
    );
};
