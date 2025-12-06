"use client";

import { ChevronRight } from "lucide-react";
import type { CarItem } from "@/types/car";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { useRef, useEffect } from "react";

interface MostWantedMarqueeProps {
  cars: CarItem[];
  onClick: (car: CarItem) => void;
}

export const MostWantedMarquee: React.FC<MostWantedMarqueeProps> = ({
  cars,
  onClick,
}) => {
  if (!cars.length) return null;

  // We need enough duplicates to ensure seamless looping.
  // If we have few cars, we might need more than 2 copies.
  // Let's use 4 copies to be safe for wide screens.
  const extendedCars = [...cars, ...cars, ...cars, ...cars];

  return (
    <section className="py-10 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-400">
          Most Wanted
        </h2>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          Premium inventory in motion
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      <InteractiveMarquee>
        {extendedCars.map((car, idx) => (
          <button
            key={`${car.make}-${car.model}-${idx}`}
            type="button"
            onClick={() => onClick(car)}
            className="min-w-[260px] bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-4 hover:bg-white/10 hover:border-white/30 transition-colors cursor-pointer mx-3 select-none text-left"
          >
            <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
              <img
                src={car.imageVersion && car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${car.imageVersion}` : car.image || ""}
                alt={car.model}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {car.make}
              </div>
              <div className="text-sm font-semibold text-white truncate">
                {car.model}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                ${car.price.toLocaleString()}{car.priceAed && car.priceAed > 0 ? ` / AED ${car.priceAed.toLocaleString()}` : ''} · {car.year}
              </div>
            </div>
          </button>
        ))}
      </InteractiveMarquee>
    </section>
  );
};

const InteractiveMarquee = ({ children }: { children: React.ReactNode }) => {
  const baseVelocity = -0.5; // Base speed
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const velocity = useMotionValue(baseVelocity);

  // We need to measure the content width to know when to wrap
  const contentWidth = useRef(0);

  useEffect(() => {
    if (contentRef.current) {
      contentWidth.current = contentRef.current.scrollWidth;
    }
  }, [children]);

  // Interaction logic
  const isDragging = useRef(false);
  const shouldBlockClick = useRef(false);

  const handlePanStart = () => {
    isDragging.current = true;
    // Don't stop immediately, let it slide a bit or just stop?
    // Stopping feels more responsive for "grabbing".
    velocity.set(0);
  };

  const handlePan = (_event: PointerEvent, info: PanInfo) => {
    // When dragging, we move x directly by the delta
    x.set(x.get() + info.delta.x);
    velocity.set(info.delta.x);
  };

  const handlePanEnd = (_event: PointerEvent, info: PanInfo) => {
    isDragging.current = false;

    // If we moved significantly, block the subsequent click
    const moveDistance = Math.sqrt(info.offset.x * info.offset.x + info.offset.y * info.offset.y);
    if (moveDistance > 5) {
      shouldBlockClick.current = true;
      setTimeout(() => {
        shouldBlockClick.current = false;
      }, 100);
    }

    // Apply inertia - reduce the divisor to make it fling further/smoother
    const endVelocity = info.velocity.x / 40;
    velocity.set(endVelocity);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (shouldBlockClick.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Decay velocity back to baseVelocity
      const currentVel = velocity.get();
      let newVel = currentVel;

      if (currentVel !== baseVelocity) {
        const decay = 0.05; // Adjust for responsiveness
        newVel = currentVel + (baseVelocity - currentVel) * decay;

        // Snap to base velocity if close enough
        if (Math.abs(newVel - baseVelocity) < 0.01) {
          newVel = baseVelocity;
        }
      }

      velocity.set(newVel);

      // Apply movement
      // Use newVel directly. Delta is time in ms since last frame.
      // 16.6ms is one frame at 60fps.
      // Normalizing by 16 ensures consistent speed across refresh rates.
      // Capping delta to prevent huge jumps if tab was inactive
      const safeDelta = Math.min(delta, 32);
      const moveBy = newVel * (safeDelta / 16);
      let currentX = x.get() + moveBy;

      // Wrap logic
      if (contentWidth.current > 0) {
        const quarterWidth = contentWidth.current / 4;

        // Ensure we wrap seamlessly
        // If we've scrolled past the first set (moved left beyond -quarterWidth)
        if (currentX <= -quarterWidth) {
          // Reset to 0 (or add quarterWidth to keep momentum)
          // Adding quarterWidth keeps the exact position relative to the pattern
          currentX += quarterWidth;
        }
        // If we've scrolled past the start (moved right beyond 0)
        else if (currentX > 0) {
          currentX -= quarterWidth;
        }
      }

      x.set(currentX);
    }
  });

  return (
    <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef}>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max will-change-transform" // Optimized for GPU
        style={{ x }}
        ref={contentRef}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onClickCapture={handleClickCapture}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MostWantedMarquee;
