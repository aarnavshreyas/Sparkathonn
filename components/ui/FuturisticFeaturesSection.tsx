"use client";

import React, { useState } from 'react';

export default function FuturisticFeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Sustainable Inventory Management",
      description: "Track stock, expiry, spoilage, and ethical sourcing with real-time updates and color-coded tags. Promote green certifications and ethical sourcing.",
      icon: "📦",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Return & Waste Tracking",
      description: "Log product returns, categorize waste, and monitor environmental impact. Classify returns by destination and register complaints for damaged goods.",
      icon: "♻️",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      title: "Carbon Footprint Analytics",
      description: "Visualize your organization's carbon footprint and get alerts for critical sustainability metrics. Make data-driven decisions for a greener future.",
      icon: "🌱",
      gradient: "from-lime-500 to-green-600"
    },
    {
      title: "Green Certifications Upload",
      description: "Upload and verify certifications like Khadi or government docs to promote ethical sourcing and compliance.",
      icon: "📄",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Role-based Dashboards",
      description: "Separate dashboards for admins and customers, each with tailored features and access. Admins manage, customers view sustainability impact.",
      icon: "🧑‍💼",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Smart Alerts & Insights",
      description: "Get real-time alerts for low stock, high spoilage, and other critical events. Actionable insights help you stay ahead.",
      icon: "🚨",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping opacity-60"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80 text-transparent bg-clip-text">
          Platform Features for Sustainable Management
        </h2>
        
        <div className="text-center mb-12">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Empower your organization with tools to track inventory, manage returns, monitor carbon footprint, and promote ethical sourcing—all in one dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl bg-white/80 dark:bg-neutral-900/80 shadow-lg p-6 border border-black/10 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-cyan-500/20 ${
                hoveredIndex === idx ? 'border-purple-500/50 dark:border-cyan-500/50' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Floating icon */}
              <div className="relative mb-4">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <span className="text-2xl filter drop-shadow-lg">{feature.icon}</span>
                </div>
                
                {/* Animated particles around icon */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
              </div>

              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80 text-transparent bg-clip-text group-hover:from-purple-600 group-hover:to-cyan-600 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-500">
                {feature.title}
              </h3>
              
              <p className="text-neutral-700 dark:text-neutral-200 text-base leading-relaxed group-hover:text-neutral-800 dark:group-hover:text-neutral-100 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Animated corner accents */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Floating action indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
            <span>Hover to explore features</span>
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 