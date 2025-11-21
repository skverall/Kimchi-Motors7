"use client";

import { useState } from "react";
import type { CarItem } from "@/components/cars/CarCard";

interface AdminDashboardProps {
  cars: CarItem[];
  onAdd: (car: Omit<CarItem, "id">) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, onAdd, onDelete, onLogout }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  // formData и JSX 1:1 из main
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* верхняя панель, таблица машин, модалка добавления */}
    </div>
  );
};

export default AdminDashboard;

