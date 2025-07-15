"use client";
import React, { useState } from "react";
import {
  User,
  Bell,
  Sun,
  Moon,
  Plus,
  Home,
  BarChart2,
  Layers,
  FileText,
  BookOpen,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import InventoryManagementSystem from './InventoryManagementSystem';
import ReturnsManagement from './ReturnsManagement';

const sidebarNav = [
  { label: "Dashboard", icon: Home },
  { label: "Inventory", icon: Layers },
  { label: "Return Module", icon: BarChart2 },
];
const sidebarDocs = [
  { label: "Data Library", icon: BookOpen },
  { label: "Reports", icon: FileText },
  { label: "Word Assistant", icon: MessageSquare },
  { label: "More", icon: MoreHorizontal },
];

export default function AdminDashboard() {
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");
  const router = useRouter();
  // Dashboard metric cards
  const cards = [
    {
      title: "Product Stock",
      value: "12,500",
      trend: "-2.1%",
      subtext: "Current in-stock items",
      subdesc: "Live inventory count",
    },
    {
      title: "Spoilage",
      value: "320",
      trend: "+8.4%",
      subtext: "Spoiled/expired this month",
      subdesc: "Monitor expiry & waste",
    },
    {
      title: "Carbon Footprint",
      value: "8,900 kg CO₂",
      trend: "-1.2%",
      subtext: "This year",
      subdesc: "Sustainability impact",
    },
    {
      title: "Critical Alerts",
      value: "5",
      trend: "+2",
      subtext: "Low stock, high spoilage",
      subdesc: "Action required",
    },
  ];

  // Area chart: Stock & Spoilage Over Time with tabs
  const areaChartTabs = ['Last 3 months', 'Last 30 days', 'Last 7 days'] as const;
  type AreaTab = typeof areaChartTabs[number];
  const [areaTab, setAreaTab] = useState<AreaTab>('Last 3 months');
  const areaChartDataMap: Record<AreaTab, { date: string; stock: number; spoilage: number }[]> = {
    'Last 3 months': [
      { date: 'Jun 1', stock: 400, spoilage: 200 },
      { date: 'Jun 2', stock: 900, spoilage: 400 },
      { date: 'Jun 3', stock: 600, spoilage: 300 },
      { date: 'Jun 4', stock: 1200, spoilage: 600 },
      { date: 'Jun 5', stock: 800, spoilage: 400 },
      { date: 'Jun 6', stock: 1500, spoilage: 700 },
      { date: 'Jun 7', stock: 950, spoilage: 500 },
      { date: 'Jun 8', stock: 1200, spoilage: 600 },
      { date: 'Jun 9', stock: 1000, spoilage: 400 },
      { date: 'Jun 10', stock: 1300, spoilage: 700 },
      { date: 'Jun 12', stock: 1150, spoilage: 500 },
      { date: 'Jun 14', stock: 1200, spoilage: 600 },
      { date: 'Jun 16', stock: 1000, spoilage: 400 },
      { date: 'Jun 18', stock: 1300, spoilage: 700 },
      { date: 'Jun 21', stock: 1150, spoilage: 500 },
      { date: 'Jun 24', stock: 1400, spoilage: 800 },
      { date: 'Jun 27', stock: 950, spoilage: 400 },
      { date: 'Jun 30', stock: 1200, spoilage: 600 },
    ],
    'Last 30 days': [
      { date: 'Jun 1', stock: 300, spoilage: 150 },
      { date: 'Jun 3', stock: 700, spoilage: 300 },
      { date: 'Jun 5', stock: 500, spoilage: 200 },
      { date: 'Jun 7', stock: 1000, spoilage: 500 },
      { date: 'Jun 9', stock: 800, spoilage: 350 },
      { date: 'Jun 12', stock: 1100, spoilage: 450 },
      { date: 'Jun 14', stock: 900, spoilage: 300 },
      { date: 'Jun 16', stock: 1200, spoilage: 500 },
      { date: 'Jun 18', stock: 1000, spoilage: 350 },
      { date: 'Jun 21', stock: 1300, spoilage: 600 },
      { date: 'Jun 24', stock: 1150, spoilage: 400 },
      { date: 'Jun 27', stock: 950, spoilage: 250 },
      { date: 'Jun 30', stock: 1200, spoilage: 500 },
    ],
    'Last 7 days': [
      { date: 'Jun 24', stock: 400, spoilage: 200 },
      { date: 'Jun 25', stock: 900, spoilage: 400 },
      { date: 'Jun 26', stock: 600, spoilage: 300 },
      { date: 'Jun 27', stock: 1200, spoilage: 600 },
      { date: 'Jun 28', stock: 800, spoilage: 400 },
      { date: 'Jun 29', stock: 1500, spoilage: 700 },
      { date: 'Jun 30', stock: 950, spoilage: 500 },
    ],
  };
  const areaChartData = areaChartDataMap[areaTab];

  // Pie chart: Stock by category
  const pieData = [
    { name: 'Certified', value: 8000, color: 'var(--chart-1)' },
    { name: 'Not Certified', value: 4500, color: 'var(--chart-2)' },
  ];
  // Bar chart: Returns by destination
  const barData = [
    { name: 'Warehouse', value: 120, color: 'var(--chart-1)' },
    { name: 'Compost', value: 80, color: 'var(--chart-3)' },
    { name: 'Supplier', value: 60, color: 'var(--chart-4)' },
    { name: 'Complaint', value: 15, color: 'var(--chart-5)' },
  ];

  // Alerts
  const alerts = [
    { type: 'Low Stock', message: 'Organic Rice below threshold', color: 'text-yellow-400' },
    { type: 'High Spoilage', message: 'Bamboo Toothbrushes expiring soon', color: 'text-red-400' },
    { type: 'Certification Expiry', message: 'Khadi Cert. expiring in 5 days', color: 'text-blue-400' },
    { type: 'Return Surge', message: 'Returns up 15% this week', color: 'text-purple-400' },
    { type: 'Complaint', message: 'Damaged goods complaint filed', color: 'text-orange-400' },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login/admin');
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-neutral-900 border-r border-neutral-800 p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-2">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Sustainability Admin</span>
        </div>
        <button className="flex items-center gap-2 bg-purple-600/20 text-purple-300 px-3 py-2 rounded-lg font-medium mb-6">
          <Plus className="w-4 h-4" /> Quick Create
        </button>
        <nav className="flex-1">
          <ul className="space-y-1 mb-6">
            {sidebarNav.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex items-center w-full px-3 py-2 rounded-lg gap-2 text-sm font-medium transition-colors ${
                    activeSidebar === item.label
                      ? "bg-blue-600/30 text-blue-100"
                      : "hover:bg-neutral-800 text-neutral-300"
                  }`}
                  onClick={() => {
                    setActiveSidebar(item.label);
                    if (item.label === "Inventory") {
                      if (typeof window !== 'undefined') {
                        document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xs text-neutral-500 mb-2 mt-8">Documents</div>
          <ul className="space-y-1">
            {sidebarDocs.map((item) => (
              <li key={item.label}>
                <button className="flex items-center w-full px-3 py-2 rounded-lg gap-2 text-sm font-medium hover:bg-neutral-800 text-neutral-300">
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800 bg-neutral-950/80 sticky top-0 z-10">
          <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Sustainable Inventory Dashboard</span>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5 text-neutral-400" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
            </button>
            <button
              className="rounded-full p-2 hover:bg-neutral-800 transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-neutral-400" />}
            </button>
            <button className="rounded-full p-2 hover:bg-neutral-800 transition-colors">
              <User className="w-5 h-5 text-neutral-400" />
            </button>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSidebar === "Dashboard" && (
            <>
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card) => (
                  <button
                    key={card.title}
                    className="bg-neutral-900 rounded-xl p-6 flex flex-col gap-2 border border-neutral-800 hover:border-blue-400 transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => alert(`Go to details for ${card.title}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-400 font-medium">{card.title}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-blue-300 font-semibold">{card.trend}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{card.value}</div>
                    <div className="text-sm text-neutral-300">{card.subtext}</div>
                    <div className="text-xs text-neutral-500">{card.subdesc}</div>
                  </button>
                ))}
              </div>

              {/* Area Chart: Stock & Spoilage Over Time */}
              <div
                className="block w-full bg-[#19182a] rounded-2xl p-8 border border-[#232136] mb-8 shadow-lg hover:border-pink-400 transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-pink-400"
                tabIndex={0}
                role="button"
                onClick={() => alert('Go to Stock & Spoilage details')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">Stock & Spoilage Over Time</span>
                    <div className="text-lg text-gray-400 font-medium">Total for the {areaTab.toLowerCase()}</div>
                  </div>
                  <div className="flex gap-2">
                    {areaChartTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          areaTab === tab
                            ? 'bg-[#2d253f] text-pink-200 shadow border border-pink-400'
                            : 'bg-transparent text-gray-300 hover:bg-[#232136] border border-transparent'
                        }`}
                        onClick={e => { e.stopPropagation(); setAreaTab(tab); }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-80 w-full pointer-events-none">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7}/>
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="spoilageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f5d0fe" stopOpacity={0.5}/>
                          <stop offset="100%" stopColor="#f5d0fe" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#b0aecd" fontSize={14} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ background: '#232136', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 600 }} labelStyle={{ color: '#f5d0fe' }} />
                      <Area
                        type="monotone"
                        dataKey="stock"
                        stroke="#a78bfa"
                        fill="url(#stockGradient)"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{ r: 6, fill: '#a78bfa', stroke: '#fff', strokeWidth: 2 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="spoilage"
                        stroke="#f5d0fe"
                        fill="url(#spoilageGradient)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5, fill: '#f5d0fe', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie and Bar Chart Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Pie Chart: Stock by Certification */}
                <button
                  className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 flex flex-col items-center justify-center hover:border-blue-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => alert('Go to Stock by Certification details')}
                >
                  <span className="text-base font-semibold text-white mb-1">Stock by Certification</span>
                  <span className="text-sm text-neutral-400 mb-4">Certified vs Not Certified</span>
                  <PieChart width={220} height={200}>
                    <Pie
                      data={pieData}
                      cx={110}
                      cy={100}
                      innerRadius={50}
                      outerRadius={80}
                      fill="var(--chart-1)"
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <text x={110} y={100} textAnchor="middle" dominantBaseline="middle" fontSize={28} fill="var(--foreground)">
                      36
                    </text>
                    <text x={110} y={120} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="var(--muted-foreground)">
                      Total
                    </text>
                  </PieChart>
                  <div className="mt-4 text-sm font-semibold text-white">Certified: <span className="text-green-400">8,000</span></div>
                  <div className="text-xs text-neutral-400">Updated live</div>
                </button>
                {/* Bar Chart: Returns by Destination */}
                <button
                  className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 flex flex-col items-center justify-center hover:border-green-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={() => alert('Go to Returns by Destination details')}
                >
                  <span className="text-base font-semibold text-white mb-1">Returns by Destination</span>
                  <span className="text-sm text-neutral-400 mb-4">Warehouse, Compost, Supplier, Complaint</span>
                  <BarChart width={260} height={160} data={barData} layout="vertical" barCategoryGap={16}>
                    <Bar dataKey="value" radius={8}>
                      {barData.map((entry, idx) => (
                        <Cell key={`cell-bar-${idx}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" fontSize={14} width={80} />
                    <XAxis type="number" hide />
                  </BarChart>
                  <div className="mt-4 text-sm font-semibold text-white">Most: <span className="text-blue-400">Warehouse</span></div>
                  <div className="text-xs text-neutral-400">Updated monthly</div>
                </button>
              </div>

              {/* Critical Alerts Section */}
              <button
                className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 mb-8 w-full text-left hover:border-yellow-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => alert('Go to Critical Alerts details')}
              >
                <span className="text-lg font-semibold text-white mb-4 block">Critical Alerts</span>
                <ul className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${alert.color} inline-block`} />
                      <span className="font-medium text-white">{alert.type}:</span>
                      <span className="text-gray-300">{alert.message}</span>
                    </li>
                  ))}
                </ul>
              </button>
            </>
          )}
          {activeSidebar === "Inventory" && (
            <section className="w-full">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">Inventory Management</h2>
              <p className="text-base text-[var(--muted-foreground)] max-w-2xl mb-4">
                Monitor your organization’s inventory health in real time. Track stock levels, expiry dates, spoilage, and ethical sourcing tags. Upload and verify certifications (like Khadi or Govt. docs) to ensure compliance and transparency. Color-coded indicators help you quickly spot issues and take action for a more sustainable operation.
              </p>
              <InventoryManagementSystem />
            </section>
          )}
          {activeSidebar === "Return Module" && (
            <section className="w-full">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">Return Module</h2>
              <p className="text-base text-[var(--muted-foreground)] max-w-2xl mb-4">
                Track and manage returned products efficiently. Log quantities, reasons for return, and destinations (warehouse, compost, supplier). Register government complaints for damaged goods and categorize waste impact to support sustainability and compliance efforts.
              </p>
              <ReturnsManagement />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}