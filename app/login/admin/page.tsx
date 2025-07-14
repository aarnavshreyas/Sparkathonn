"use client";
import { useState } from "react";
import { Leaf, Shield, TrendingUp, Globe, ChevronRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement> | undefined) {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user?.email === ADMIN_EMAIL) {
      router.push("/admin/dashboard");
    } else if (!error) {
      setError("You are not authorized as admin.");
      await supabase.auth.signOut();
    } else {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary)] rounded-2xl mb-6 shadow-2xl">
            <Leaf className="w-10 h-10 text-[var(--primary-foreground)]" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            Sustainable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"> Admin</span>
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">Inventory & Return Management Dashboard</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[var(--card)] backdrop-blur-sm rounded-lg p-3 border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:scale-105">
            <Shield className="w-6 h-6 text-[var(--primary)] mb-2 mx-auto" />
            <p className="text-xs text-[var(--muted-foreground)] text-center">Secure Access</p>
          </div>
          <div className="bg-[var(--card)] backdrop-blur-sm rounded-lg p-3 border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:scale-105">
            <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2 mx-auto" />
            <p className="text-xs text-[var(--muted-foreground)] text-center">Analytics</p>
          </div>
          <div className="bg-[var(--card)] backdrop-blur-sm rounded-lg p-3 border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:scale-105">
            <Globe className="w-6 h-6 text-[var(--accent)] mb-2 mx-auto" />
            <p className="text-xs text-[var(--muted-foreground)] text-center">Sustainability</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--card)] backdrop-blur-xl rounded-2xl p-8 border border-[var(--border)] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sustainable.com"
                required
                className="w-full px-4 py-3 bg-[var(--input)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-[var(--input)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[var(--destructive)]/20 border border-[var(--destructive)]/50 rounded-lg p-3 text-[var(--destructive-foreground)] text-sm animate-pulse">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--primary-foreground)] mr-3"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg border border-[var(--border)]">
            <p className="text-xs text-[var(--muted-foreground)] text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-[var(--muted-foreground)] text-center space-y-1">
              <p>Email: admin@sustainable.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-[var(--muted-foreground)]">
            Powered by sustainable technology •{" "}
            <span className="text-[var(--primary)]">Carbon neutral operations</span>
          </p>
        </div>
      </div>
    </div>
  );
} 