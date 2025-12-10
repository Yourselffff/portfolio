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

            {/* Experience Section (Tunnel/Stargate Effect - REFINED) */}
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

                {/* Title - Fades out quickly */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
                        scale: useTransform(scrollYProgress, [0, 0.1], [1, 1.5]),
                        y: useTransform(scrollYProgress, [0, 0.1], [0, -100])
                    }}
                    className="absolute z-50 text-center pointer-events-none"
                >
                    <h2 className="text-orange-500 font-bold mb-4 uppercase tracking-[0.5em] text-xl">{timeline.subtitle}</h2>
                    <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{timeline.title}</h2>
                </motion.div>

                {/* Cards zooming in One by One */}
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
    // Smoother non-overlapping ranges
    // We have 4 items usually. Range 0.1 to 0.9.
    const step = 0.8 / total;
    const start = 0.1 + (index * step);
    const end = start + step;

    // Animation: Start small/transparent -> Grow/Visible -> Fly past/Fade
    const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.5, 1, 1.5]);
    const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, end], ["100px", "-100px"]); // Moves up slightly as it comes forward
    const blur = useTransform(scrollYProgress, [start, (start + end) / 2, end], ["blur(10px)", "blur(0px)", "blur(10px)"]);

    return (
        <motion.div
            style={{ scale, opacity, y, filter: blur }}
            className="absolute p-8 md:p-12 w-[85vw] md:w-[700px] border border-orange-500/30 bg-[#111] rounded-3xl flex flex-col items-center text-center shadow-[0_0_60px_rgba(249,115,22,0.2)] z-40"
        >
            <div className="bg-orange-600 text-white font-bold px-6 py-2 rounded-full mb-6 shadow-lg">
                {item.year}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md leading-tight">{item.role}</h3>
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light">{item.desc}</p>
        </motion.div>
    );
};

const TunnelBackground = ({ scrollYProgress }) => {
    // Rotating Tunnel
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
            <motion.div
                style={{ rotate, scale }}
                className="absolute inset-[-50%] w-[200%] h-[200%] flex items-center justify-center opacity-20"
            >
                {/* Concentric Circles simulating a tunnel */}
                <div className="absolute w-[90vw] h-[90vw] border-[1px] border-orange-500/20 rounded-full" />
                <div className="absolute w-[70vw] h-[70vw] border-[2px] border-orange-500/20 rounded-full" />
                <div className="absolute w-[50vw] h-[50vw] border-[4px] border-orange-600/20 rounded-full" />
                <div className="absolute w-[30vw] h-[30vw] border-[8px] border-orange-700/20 rounded-full" />
            </motion.div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)]" />
        </div>
    );
};
