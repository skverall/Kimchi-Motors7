"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";

interface DualRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    className?: string;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
    min,
    max,
    step = 1,
    value,
    onChange,
    className = "",
}) => {
    const [minVal, setMinVal] = useState(value[0]);
    const [maxVal, setMaxVal] = useState(value[1]);
    const minValRef = useRef(value[0]);
    const maxValRef = useRef(value[1]);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Update state when props change
    useEffect(() => {
        setMinVal(value[0]);
        setMaxVal(value[1]);
        minValRef.current = value[0];
        maxValRef.current = value[1];
    }, [value]);

    return (
        <div className={`relative w-full py-4 ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - step);
                    setMinVal(value);
                    minValRef.current = value;
                    onChange([value, maxVal]);
                }}
                className="thumb thumb--left pointer-events-none absolute h-0 w-full outline-none z-30"
                style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + step);
                    setMaxVal(value);
                    maxValRef.current = value;
                    onChange([minVal, value]);
                }}
                className="thumb thumb--right pointer-events-none absolute h-0 w-full outline-none z-40"
            />

            <div className="relative w-full px-3">
                <div className="absolute h-1.5 w-full rounded bg-slate-600 z-10 left-0"></div>
                <div
                    ref={range}
                    className="absolute h-1.5 rounded bg-blue-500 z-20"
                ></div>
            </div>

            <div className="flex justify-between mt-4">
                <div className="bg-slate-800/50 px-3 py-1 rounded text-xs font-medium text-slate-300 border border-slate-700">
                    {minVal.toLocaleString()}
                </div>
                <div className="bg-slate-800/50 px-3 py-1 rounded text-xs font-medium text-slate-300 border border-slate-700">
                    {maxVal.toLocaleString()}
                </div>
            </div>

            <style jsx>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: auto;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          cursor: pointer;
          margin-top: -10px;
        }
        .thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};
