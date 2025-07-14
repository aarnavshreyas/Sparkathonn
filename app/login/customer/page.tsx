"use client";
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// Add Particle type
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const CustomerLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  });
  const [error, setError] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const router = useRouter();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      if (!formData.agreeToTerms) {
        setError('Please agree to the terms and conditions');
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (!error && data.user) {
        await supabase.from("profiles").insert([{ id: data.user.id, name: formData.name }]);
        setIsSignUp(false);
        setFormData({ email: '', password: '', confirmPassword: '', name: '', agreeToTerms: false });
        setError("Sign up successful! Please log in.");
      } else if (error) {
        setError(error.message);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
      if (!error) {
        router.push("/customer/dashboard");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary)] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-[var(--secondary)] rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[var(--accent)] rounded-full opacity-25 animate-ping"></div>
        {/* Animated Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `translate(-50%, -50%)`,
              animation: `float ${3 + particle.id % 3}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-[var(--card)] bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[var(--border)]">
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text drop-shadow-lg"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}
              >
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="mt-2 text-base text-[var(--muted-foreground)]">
                {isSignUp ? 'Join our community and start your journey' : 'Sign in to your account'}
              </p>
              <p
                className="mt-4 text-lg max-w-2xl mx-auto text-center text-[var(--primary)] font-semibold drop-shadow"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
              >
                Track inventory, manage returns, and reduce your carbon footprint — all from one powerful dashboard.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-[var(--input)] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--input)] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 bg-[var(--input)] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-[var(--input)] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              )}

              {isSignUp && (
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-[var(--border)] text-[var(--primary)] shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)] focus:ring-opacity-50"
                    required
                  />
                  <label className="ml-3 text-sm text-[var(--muted-foreground)] leading-5">
                    I agree to the{' '}
                    <a href="#" className="text-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-[var(--border)] text-[var(--primary)] shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)] focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-[var(--muted-foreground)]">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {error && <div className="bg-[var(--destructive)]/20 border border-[var(--destructive)]/50 rounded-lg p-3 text-[var(--destructive-foreground)] text-sm animate-pulse">{error}</div>}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-lg shadow-lg hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-8 text-center">
              <p className="text-[var(--muted-foreground)]">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                  className="ml-2 text-[var(--primary)] hover:text-[var(--primary-foreground)] font-semibold transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-[var(--muted-foreground)]">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-[var(--border)] rounded-lg shadow-sm bg-[var(--muted)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted-foreground)]/10 transition-all duration-300">
                  <span>Google</span>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-[var(--border)] rounded-lg shadow-sm bg-[var(--muted)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted-foreground)]/10 transition-all duration-300">
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default CustomerLoginPage; 