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

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Calculate position relative to the container
                // We use clientX/Y - rect.left/top to get position within the container
                // But we need to account for scroll if we used pageX/Y. 
                // clientX - rect.left is exactly the x coordinate within the container (visible part).
                // But if the container is scrolled?
                // rect.left/top changes with scroll. clientX/Y changes with mouse.
                // This gives the correct position relative to the container's top-left corner *currently on screen*.
                // Since we use absolute positioning inside the container, we want coordinates relative to the container's origin.
                // If the container is `relative`, `absolute` children are positioned relative to it.
                // So `left: x` means x pixels from the left edge of the container.
                // `e.clientX - rect.left` is exactly that.
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            } else {
                // We need to account for the container's position if we want it strictly relative, 
                // but for "Hero at top", pageX/Y is fine relative to document.
                // Actually, to be safe and simple for a Hero section component:
                // We will use clientX/Y but render it Fixed? 
                // User said "specifically in that area". 
                // If I use absolute inside Hero, and Hero moves on scroll, I want the glow to be under the mouse.
                // If I scroll, the mouse stays fixed on screen, but the Hero moves up.
                // So the glow should move up with the Hero? No, the glow should be under the mouse.
                // So if I scroll, the glow should effectively move "down" relative to the Hero to stay under the mouse?
                // This implies the glow position should be `scrollTop + clientY`.
                // Which is `pageY`.
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
    }, [mouseX, mouseY, containerRef, isVisible]);

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
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(26, 74, 255, 0.6) 30%, rgba(147, 51, 234, 0.4) 60%, rgba(26, 74, 255, 0) 80%)",
                }}
            />
        </div>
    );
};
