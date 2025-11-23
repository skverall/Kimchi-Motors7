"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MouseTrackingGlowProps {
    containerRef?: React.RefObject<HTMLElement | null>;
}

export const MouseTrackingGlow: React.FC<MouseTrackingGlowProps> = ({ containerRef }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Firefly effect: Instant follow (stiff spring or direct)
    // User asked for "without delay", so we use a very stiff spring or direct value.
    // A very stiff spring feels "instant" but smooths out micro-jitters.
    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Entrance animation state
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash on mobile

    useEffect(() => {
        // Check if device is mobile/touch
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouch || isSmallScreen);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            } else {
                mouseX.set(e.pageX);
                mouseY.set(e.pageY);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isVisible) setIsVisible(true);

            if (e.touches.length > 0) {
                const touch = e.touches[0];
                if (containerRef?.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    mouseX.set(touch.clientX - rect.left);
                    mouseY.set(touch.clientY - rect.top);
                } else {
                    mouseX.set(touch.pageX);
                    mouseY.set(touch.pageY);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [mouseX, mouseY, containerRef, isVisible, isMobile]);

    if (isMobile) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Moving Blob - Follows Mouse - Firefly Style */}
            <motion.div
                className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full mix-blend-screen blur-[60px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    // Brighter, multi-colored gradient
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(26, 74, 255, 0.4) 30%, rgba(147, 51, 234, 0.2) 60%, rgba(26, 74, 255, 0) 80%)",
                }}
            />
        </div>
    );
};
