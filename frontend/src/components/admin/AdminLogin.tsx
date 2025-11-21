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
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-black text-sm">KM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-slate-900">
              KIMCHI<span className="text-blue-600">MOTORS</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">
              Admin Portal
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            Login to Dashboard
          </button>
        </form>

        <button
          onClick={onBack}
          className="w-full mt-4 text-slate-500 text-sm font-semibold hover:text-slate-900 transition flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </button>
      </div>
    </div>
  );


};

export default AdminLogin;
