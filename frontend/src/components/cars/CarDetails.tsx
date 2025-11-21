"use client";

import { ArrowRight, Gauge, Fuel, Settings } from "lucide-react";
import type { CarItem } from "./CarCard";

interface CarDetailsProps {
  car: CarItem;
  onBack: () => void;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack }) => (
  <div className="min-h-screen bg-white animate-fade-in">
    {/* Полный JSX 1:1 из main: верхний бар Back to Inventory, блок с картинками и правой панелью */}
  </div>
);

export default CarDetails;

