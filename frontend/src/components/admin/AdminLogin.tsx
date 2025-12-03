"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    if (!data?.session) {
      setError("Unable to start a session. Please try again.");
      setIsSubmitting(false);
      return;
    }

    onLogin();
    setIsSubmitting(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email to receive a reset link.");
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage("Reset link sent. Check your inbox.");
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
          {message && (
            <div className="text-emerald-600 text-sm font-semibold bg-emerald-50 p-3 rounded-lg">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Login to Dashboard"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-slate-600 text-sm font-semibold hover:text-slate-900 transition flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" /> Forgot password?
          </button>
        </form>

        <button
          type="button"
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
