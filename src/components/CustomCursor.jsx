import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <motion.div
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 99999,
                pointerEvents: 'none',
            }}
        >
            {/* Main Cursor Dot */}
            <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            {/* Trailing Ring */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border border-cyan-400/50 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}
