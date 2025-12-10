import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { sections } from '../data';

export default function Skills() {
    const skillSection = sections.find(s => s.id === 'skills');

    return (
        <div className="page-container relative pt-24 pb-12 px-4 md:px-12 min-h-screen">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-cyan-400 font-header text-xl tracking-widest uppercase mb-2"
                >
                    {skillSection.subtitle}
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 font-header"
                >
                    {skillSection.title}
                </motion.h1>
            </div>

            {/* Skills Grid - Spotlight Effect */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillSection.categories.map((cat, categoryIndex) => (
                    <SpotlightCard key={categoryIndex} delay={categoryIndex * 0.1}>
                        <h3 className="text-xl font-bold text-yellow-400 mb-6 font-header border-b border-white/10 pb-2 relative z-10">
                            {cat.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {cat.skills.map((skill, skillIndex) => (
                                <motion.span
                                    key={skillIndex}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(250, 204, 21, 0.2)" }}
                                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white transition-colors cursor-none border border-white/5"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </SpotlightCard>
                ))}
            </div>

            {/* Floating Orbs Background */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-yellow-500/10 blur-[100px]"
                        style={{
                            width: Math.random() * 400 + 200,
                            height: Math.random() * 400 + 200,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function SpotlightCard({ children, delay }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative border border-white/10 bg-white/5 rounded-xl px-8 py-10 overflow-hidden"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255, 255, 255, 0.15),
                        transparent 80%
                        )
                    `,
                }}
            />
            {children}
        </motion.div>
    );
}
