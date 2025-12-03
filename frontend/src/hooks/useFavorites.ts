"use client";

import { useState, useEffect } from "react";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("km_favorites");
        if (stored) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const toggleFavorite = (carId: string) => {
        setFavorites((prev) => {
            const newFavorites = prev.includes(carId)
                ? prev.filter((id) => id !== carId)
                : [...prev, carId];

            localStorage.setItem("km_favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (carId: string) => favorites.includes(carId);

    return { favorites, toggleFavorite, isFavorite };
};
