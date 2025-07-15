'use client';
import React from 'react';
import { Leaf, Shield, Globe, Zap, Droplets, Wind } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Maya Chen",
    role: "Marine Biologist",
    text: "This platform revolutionized how we track coral reef recovery. The AI-powered insights helped us restore 40% more marine habitats this year.",
    icon: Droplets,
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    name: "Alex Rodriguez",
    role: "Forest Conservation Lead",
    text: "The real-time deforestation alerts saved over 10,000 acres of rainforest. It&apos;s like having a guardian angel for our planet.",
    icon: Leaf,
    gradient: "from-green-400 to-emerald-600"
  },
  {
    name: "Sarah Kim",
    role: "Climate Research Director",
    text: "The predictive modeling capabilities are unprecedented. We can now anticipate environmental changes months in advance.",
    icon: Globe,
    gradient: "from-purple-400 to-indigo-600"
  },
  {
    name: "James Thompson",
    role: "Renewable Energy Consultant",
    text: "The energy optimization algorithms increased our solar farm efficiency by 35%. Clean energy has never been more accessible.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-600"
  },
  {
    name: "Dr. Priya Patel",
    role: "Wildlife Protection Officer",
    text: "The AI-powered anti-poaching system reduced illegal activities by 70%. Technology is truly protecting our endangered species.",
    icon: Shield,
    gradient: "from-rose-400 to-pink-600"
  },
  {
    name: "Michael Zhang",
    role: "Air Quality Specialist",
    text: "The atmospheric monitoring network helped us reduce urban pollution by 25%. The future of clean air is here.",
    icon: Wind,
    gradient: "from-teal-400 to-cyan-600"
  }
];

export default function FuturisticTestimonials() {
  return (
    <section className="w-full py-20 px-0 md:px-0 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 dark:from-green-400/10 dark:via-blue-400/10 dark:to-purple-400/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4 md:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 mb-6">
          <Globe className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">Conservation Champions</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          Voices from the Future
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Discover how cutting-edge conservation technology is transforming our planet&apos;s future
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 md:px-8">
        {testimonials.map((testimonial, index) => {
          const IconComponent = testimonial.icon;
          return (
            <div
              key={testimonial.name}
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/20 dark:border-neutral-700/30 p-8 hover:transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-20`}></div>
              </div>

              {/* Icon */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r ${testimonial.gradient} p-4 mb-6 mx-auto shadow-lg`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                  {testimonial.name}
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wide">
                  {testimonial.role}
                </p>
                <blockquote className="text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </blockquote>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`}></div>
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full px-4 md:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">500K+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Acres Protected</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Prediction Accuracy</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">200+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Research Partners</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
} 