"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, ComposedChart, Tooltip } from 'recharts';

// Define Stat type
interface Stat {
  label: string;
  value: string;
  numericValue: number;
  icon: string;
  color: string;
  chartType: 'line' | 'bar' | 'pie' | 'area' | 'radial' | 'composed';
  chartData: unknown[]; // You can further specify this if chartData shape is known per chartType
}

export default function VisualStatisticsSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // Example statistics for a sustainability dashboard
  const statistics: Stat[] = [
    {
      label: "Products Tracked",
      value: "12,500+",
      numericValue: 12500,
      icon: "📦",
      color: "from-green-500 to-emerald-500",
      chartType: "line",
      chartData: [
        { month: 'Jan', value: 8000 },
        { month: 'Feb', value: 9500 },
        { month: 'Mar', value: 11000 },
        { month: 'Apr', value: 12000 },
        { month: 'May', value: 12500 },
      ]
    },
    {
      label: "Returns Managed",
      value: "2,300+",
      numericValue: 2300,
      icon: "♻️",
      color: "from-cyan-500 to-teal-500",
      chartType: "bar",
      chartData: [
        { month: 'Jan', value: 1200 },
        { month: 'Feb', value: 1500 },
        { month: 'Mar', value: 1800 },
        { month: 'Apr', value: 2100 },
        { month: 'May', value: 2300 },
      ]
    },
    {
      label: "CO₂ Saved (kg)",
      value: "8,900",
      numericValue: 8900,
      icon: "🌱",
      color: "from-lime-500 to-green-600",
      chartType: "pie",
      chartData: [
        { name: 'Saved', value: 8900, color: '#22c55e' },
        { name: 'Potential', value: 1100, color: '#a3e635' },
      ]
    },
    {
      label: "Green Certifications",
      value: "120+",
      numericValue: 120,
      icon: "📄",
      color: "from-blue-500 to-indigo-500",
      chartType: "area",
      chartData: [
        { month: 'Jan', value: 80 },
        { month: 'Feb', value: 90 },
        { month: 'Mar', value: 100 },
        { month: 'Apr', value: 110 },
        { month: 'May', value: 120 },
      ]
    },
    {
      label: "Critical Alerts",
      value: "15",
      numericValue: 15,
      icon: "🚨",
      color: "from-orange-500 to-red-500",
      chartType: "radial",
      chartData: [
        { region: 'Low Stock', value: 7, fill: '#f59e42' },
        { region: 'High Spoilage', value: 5, fill: '#ef4444' },
        { region: 'Other', value: 3, fill: '#fbbf24' },
      ]
    },
    {
      label: "Active Admins",
      value: "8",
      numericValue: 8,
      icon: "🧑‍💼",
      color: "from-purple-500 to-pink-500",
      chartType: "composed",
      chartData: [
        { month: 'Jan', admins: 4, activity: 60 },
        { month: 'Feb', admins: 5, activity: 70 },
        { month: 'Mar', admins: 6, activity: 80 },
        { month: 'Apr', admins: 7, activity: 90 },
        { month: 'May', admins: 8, activity: 95 },
      ]
    }
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: unknown[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">{label}</p>
          {payload.map((entry, i) => {
            if (typeof entry === 'object' && entry !== null && 'color' in entry && 'name' in entry && 'value' in entry) {
              const e = entry as { color?: string; name?: string; value?: number };
              return (
                <p key={i} className="text-sm" style={{ color: e.color }}>
                  {e.name}: {e.value?.toLocaleString?.()}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  const renderChart = (stat: Stat) => {
    switch (stat.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={stat.chartData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#1d4ed8' }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={stat.chartData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                animationDuration={2000}
              />
              <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <div className="flex items-center justify-center h-20">
            <ResponsiveContainer width={80} height={80}>
              <PieChart>
                <Pie
                  data={stat.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {stat.chartData.map((entry, i) => {
                    const e = entry as { color: string };
                    return <Cell key={`cell-${i}`} fill={e.color} />;
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={stat.chartData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#areaGradient)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'radial':
        return (
          <div className="flex items-center justify-center h-20">
            <ResponsiveContainer width={80} height={80}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="80%" 
                data={stat.chartData}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={2}
                  fill="#6366f1"
                  animationDuration={2000}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={80}>
            <ComposedChart data={stat.chartData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="activity"
                fill="url(#composedGradient)"
                fillOpacity={0.6}
                stroke="#a21caf"
                strokeWidth={2}
                animationDuration={2000}
              />
              <Line
                type="monotone"
                dataKey="admins"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 3 }}
                yAxisId="right"
                animationDuration={2000}
              />
              <defs>
                <linearGradient id="composedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a21caf" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a21caf" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const getSubtitle = (stat: Stat) => {
    switch (stat.label) {
      case "Products Tracked":
        return "Live inventory updates";
      case "Returns Managed":
        return "Waste & return logs";
      case "CO₂ Saved (kg)":
        return "Sustainability impact";
      case "Green Certifications":
        return "Verified documents";
      case "Critical Alerts":
        return "Low stock & spoilage";
      case "Active Admins":
        return "Team collaboration";
      default:
        return "Real-time data";
    }
  };

  const formatStatValue = (value: number, label: string) => {
    if (label === "CO₂ Saved (kg)") {
      return `${value} kg`;
    } else if (label === "Green Certifications") {
      return `${value} certifications`;
    } else {
      return value.toLocaleString();
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 relative">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,199,98,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neutral-900 via-green-600 to-neutral-900 dark:from-white dark:via-cyan-400 dark:to-white text-transparent bg-clip-text">
            Sustainability Dashboard Statistics
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Monitor your platform&apos;s sustainability performance with live data visualization and comprehensive metrics.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Live</span>
            </div>
            <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
            <span className="text-sm text-neutral-500">Last updated: just now</span>
          </div>
        </div>

        {/* Enhanced statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statistics.map((stat, chartIndex) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-neutral-900/90 shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 ${
                hoveredStat === chartIndex ? 'border-purple-500/50 dark:border-cyan-500/50 shadow-purple-500/20' : ''
              }`}
              onMouseEnter={() => setHoveredStat(chartIndex)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Enhanced gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="relative p-8">
                {/* Enhanced header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <span className="text-2xl filter drop-shadow-sm">{stat.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {getSubtitle(stat)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Enhanced value display */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                      {formatStatValue(stat.numericValue, stat.label)}
                    </span>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        +12%
                      </span>
                    </div>
                  </div>
                </div>
                {/* Enhanced chart with better spacing */}
                <div className="mb-6 bg-neutral-50/50 dark:bg-neutral-800/30 rounded-xl p-4 border border-neutral-200/30 dark:border-neutral-700/30">
                  {renderChart(stat)}
                </div>
                {/* Enhanced progress indicator */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Performance</span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">Excellent</span>
                  </div>
                  <div className="relative h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${stat.color} transition-all duration-2000 ease-out rounded-full`}
                      style={{ width: hoveredStat === chartIndex ? '100%' : '75%' }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Enhanced floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
              <div className="absolute top-1/2 right-8 w-1 h-1 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
        {/* Enhanced footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/70 to-white/50 dark:from-neutral-800/70 dark:to-neutral-800/50 backdrop-blur-xl border border-green-500/30 shadow-lg">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Live Data Stream • Updated every 5 seconds
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            All metrics are processed in real-time from our global infrastructure
          </p>
        </div>
      </div>
    </section>
  );
} 