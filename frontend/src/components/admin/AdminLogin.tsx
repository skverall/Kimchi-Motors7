"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "password") {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Полный JSX 1:1 из main: карточка логина, KM, кнопка back, поля */}
    </div>
  );
};

export default AdminLogin;

