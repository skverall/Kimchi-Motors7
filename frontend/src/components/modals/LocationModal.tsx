"use client";

import { useState } from "react";
import { X, Globe, MapPin, Phone, Clock } from "lucide-react";
import { SHOWROOM_LOCATIONS } from "@/constants/locations";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(SHOWROOM_LOCATIONS[0]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Полный JSX взят из main, верстка 1:1, обрезан здесь для краткости */}
    </div>
  );
};

export default LocationModal;

