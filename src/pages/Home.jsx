import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { sections } from '../data';

// Reuse the Section component layout for Intro and Experience but simplified
// We will manually render them here instead of mapping to have control over order/layout

export default function Home() {
    const intro = sections.find(s => s.id === 'intro');
    const about = sections.find(s => s.id === 'about');
    const timeline = sections.find(s => s.id === 'timeline');
    const contact = sections.find(s => s.id === 'contact');

    return (
        <div className="min-h-screen">
            {/* Hero Section (Intro) */}
            <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex-1 text-center md:text-left mb-12 md:mb-0"
                    >
                        <h2 className="text-cyan-400 font-bold mb-4 tracking-widest uppercase">{intro.subtitle}</h2>
                        <h1 className="text-6xl md:text-8xl font-black font-header mb-6 text-white">{intro.title}</h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">{intro.description}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="flex-1 flex justify-center"
                    >
                        <div className="relative">
                            <img src={intro.planet} alt="Earth" className="w-[300px] md:w-[500px] animate-spin-slow object-contain" />
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 flex justify-center"
                    >
                        <img src={about.planet} alt="Mars" className="w-[300px] md:w-[400px] object-contain" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-red-400 font-bold mb-2 uppercase">{about.subtitle}</h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-header">{about.title}</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">{about.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section (Timeline) */}
            <section id="timeline" className="py-24 bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-orange-400 font-bold mb-2 uppercase">{timeline.subtitle}</h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-header">{timeline.title}</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {timeline.items.map((item, idx) => (
                            <div key={idx} className="relative pl-8 pb-12 border-l border-white/10 last:pb-0 last:border-0">
                                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_orange]" />
                                <span className="text-orange-400 font-bold text-sm mb-1 block">{item.year}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Footer */}
            <footer id="contact" className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white font-header mb-8">{contact.title}</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">{contact.description}</p>

                    <div className="flex justify-center gap-6 flex-wrap">
                        {contact.links.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-transform hover:-translate-y-1 flex items-center gap-2"
                            >
                                {link.icon} {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
