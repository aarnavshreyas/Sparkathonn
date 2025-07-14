"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Users, Package, BarChart3, Recycle, Shield, Clock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function EnhancedDemoSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [demoStats, setDemoStats] = useState({
    products: 1247,
    returns: 89,
    sustainability: 94.2
  });

  const demoSteps = [
    {
      title: "Inventory Management",
      description: "Track products, monitor spoilage, and manage certifications in real-time",
      icon: <Package className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      action: "Add Product",
      preview: "See how easy it is to add new inventory items"
    },
    {
      title: "Returns Processing",
      description: "Log returns, categorize reasons, and track sustainability impact",
      icon: <Recycle className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      action: "Log Return",
      preview: "Experience streamlined return management"
    },
    {
      title: "Analytics Dashboard",
      description: "View real-time metrics, sustainability reports, and customer impact",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      action: "View Analytics",
      preview: "Explore comprehensive data visualization"
    },
    {
      title: "Customer Portal",
      description: "Check personal sustainability metrics and environmental impact",
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      action: "Customer View",
      preview: "See your environmental contribution"
    }
  ];

  const keyFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance",
      stat: "99.9% uptime"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Real-time Updates",
      description: "Live data synchronization across all devices",
      stat: "< 50ms latency"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Smart Analytics",
      description: "AI-powered insights and predictions",
      stat: "95% accuracy"
    }
  ];

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStats(prev => ({
        products: prev.products + Math.floor(Math.random() * 3),
        returns: prev.returns + Math.floor(Math.random() * 2),
        sustainability: Math.min(100, prev.sustainability + Math.random() * 0.1)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through demo steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 px-0 md:px-0 relative overflow-hidden">
      {/* Animated background - match the rest of the site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>
      <div className="relative z-10 w-full px-4 md:px-8">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neutral-900 via-purple-600 to-neutral-900 dark:from-white dark:via-cyan-400 dark:to-white text-transparent bg-clip-text">
            Experience the Future of Inventory Management
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
            Don't just read about it—see how our platform transforms the way you manage inventory, 
            track returns, and measure sustainability impact.
          </p>
          {/* Live demo stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {demoStats.products.toLocaleString()} Products Tracked
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-green-200/50 dark:border-green-700/50">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {demoStats.returns} Returns Processed Today
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-purple-200/50 dark:border-purple-700/50">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {demoStats.sustainability.toFixed(1)}% Sustainability Score
              </span>
            </div>
          </div>
        </div>
        {/* Interactive demo showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Demo preview */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Live Demo Preview
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              {/* Interactive demo steps */}
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                      activeStep === index
                        ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 shadow-lg'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg ${
                        activeStep === index ? 'scale-110' : ''
                      } transition-transform duration-300`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {step.description}
                        </p>
                      </div>
                      {activeStep === index && (
                        <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                          <Play className="w-4 h-4" />
                          <span className="text-sm font-medium">Active</span>
                        </div>
                      )}
                    </div>
                    {activeStep === index && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                          {step.preview}
                        </p>
                        <button className="inline-flex items-center space-x-2 bg-white dark:bg-neutral-800 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors">
                          <span>{step.action}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Call to action */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Join thousands of companies already using our platform to revolutionize 
                  their inventory management and sustainability practices.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Full access to all features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Setup in under 5 minutes</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <a
                    href="/login"
                    className="group inline-flex items-center space-x-3 w-full bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Play className="w-6 h-6" />
                    <span>Start Free Demo</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300">
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Key features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  hoveredFeature === index ? 'scale-105 shadow-xl' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                      {feature.description}
                    </p>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg px-3 py-1 inline-block">
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        {feature.stat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Final CTA */}
        <div className="text-center">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
            Don't just take our word for it. Experience the difference yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/login"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-6 h-6" />
              <span>Try Demo Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              or watch a 2-minute walkthrough
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 