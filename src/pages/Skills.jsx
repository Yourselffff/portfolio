import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { sections } from '../data';

export default function Skills() {
    // Filter only the skills section
    const skillSection = sections.find(s => s.id === 'skills');

    // Custom animation for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

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

            {/* Skills Grid - New Layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillSection.categories.map((cat, categoryIndex) => (
                    <motion.div
                        key={categoryIndex}
                        custom={categoryIndex}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-xl font-bold text-yellow-400 mb-6 font-header border-b border-white/10 pb-2">
                            {cat.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-yellow-400/20 hover:text-yellow-300 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Decorative Planet - Different position/style */}
            <motion.div
                className="fixed -bottom-32 -right-32 -z-10 opacity-30 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
            >
                <img src={skillSection.planet} alt="planet" className="w-[600px] h-[600px] object-cover" />
            </motion.div>
        </div>
    );
}
