"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft, Check, Loader2, Lock } from "lucide-react";

type Status = "verifying" | "ready" | "complete" | "idle";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const initialCode = searchParams.get("code");
  const [status, setStatus] = useState<Status>(initialCode ? "verifying" : "ready");

  // Exchange code from the email link for a session
  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      return;
    }

    const exchange = async () => {
      setStatus("verifying");
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        setError("Reset link is invalid or has expired. Please request a new one.");
        setStatus("idle");
        return;
      }
      setStatus("ready");
    };

    exchange();
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("verifying");
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setStatus("ready");
      return;
    }

    setStatus("complete");
    setTimeout(() => router.push("/?view=admin"), 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 text-white rounded-lg p-3">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Reset password</h1>
            <p className="text-sm text-slate-500">Set a new password to access your profile.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="Enter a strong password"
              disabled={status === "verifying"}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-blue-600 transition"
              placeholder="Repeat your password"
              disabled={status === "verifying"}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={status === "verifying"}
          >
            {status === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {status === "verifying" ? "Saving..." : "Update password"}
          </button>
        </form>

        {status === "complete" && (
          <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4" /> Password updated. Redirecting to login...
          </div>
        )}

        <button
          type="button"
          onClick={() => router.push("/?view=admin")}
          className="mt-6 text-slate-500 text-sm font-semibold hover:text-slate-900 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </button>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
