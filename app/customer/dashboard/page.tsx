'use client';

import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  RotateCcw, 
  Award, 
  Bell, 
  Search, 
  Filter,
  Recycle,
  User,
  ChevronRight,
  Eye,
  Download,
  Star,
  Globe,
  Target
} from 'lucide-react';
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState(3);
  const [profileName, setProfileName] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', data.user.id)
          .single();
        setProfileName(profileData?.name || null);
      }
    });
  }, []);

  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login/customer');
  }

  // Sample data
  const sustainabilityScore = 87;
  const carbonSaved = 245;
  const returnRate = 3.2;
  const ecoPoints = 1250;

  const recentOrders = [
    { id: 'ORD001', product: 'Organic Cotton T-Shirt', date: '2024-07-12', status: 'Delivered', sustainability: 'Certified Organic' },
    { id: 'ORD002', product: 'Bamboo Phone Case', date: '2024-07-10', status: 'Shipped', sustainability: 'Eco-Friendly' },
    { id: 'ORD003', product: 'Recycled Notebook', date: '2024-07-08', status: 'Processing', sustainability: 'Recycled Material' }
  ];

  const sustainabilityMetrics = [
    { label: 'Carbon Footprint Reduced', value: `${carbonSaved} kg CO₂`, icon: Leaf, color: 'text-green-400' },
    { label: 'Sustainable Products', value: '23/25', icon: Award, color: 'text-blue-400' },
    { label: 'Return Rate', value: `${returnRate}%`, icon: RotateCcw, color: 'text-purple-400' },
    { label: 'Eco Points Earned', value: ecoPoints, icon: Star, color: 'text-yellow-400' }
  ];

  // Area chart mock data
  const areaChartData = [
    { date: 'Jun 1', visitors: 400, baseline: 200 },
    { date: 'Jun 3', visitors: 700, baseline: 400 },
    { date: 'Jun 5', visitors: 600, baseline: 350 },
    { date: 'Jun 7', visitors: 900, baseline: 500 },
    { date: 'Jun 9', visitors: 800, baseline: 400 },
    { date: 'Jun 12', visitors: 1100, baseline: 600 },
    { date: 'Jun 14', visitors: 950, baseline: 500 },
    { date: 'Jun 16', visitors: 1200, baseline: 700 },
    { date: 'Jun 18', visitors: 1000, baseline: 600 },
    { date: 'Jun 21', visitors: 1300, baseline: 800 },
    { date: 'Jun 24', visitors: 1150, baseline: 700 },
  ];

  // Pie and bar chart mock data
  const pieData = [
    { name: 'Eco Products', value: 23, color: 'var(--chart-1)' },
    { name: 'Returns', value: 8, color: 'var(--chart-2)' },
    { name: 'Rewards', value: 3, color: 'var(--chart-3)' },
    { name: 'Pending', value: 2, color: 'var(--chart-4)' },
  ];
  const barData = [
    { name: 'Organic', value: 12, color: 'var(--chart-1)' },
    { name: 'Recycled', value: 7, color: 'var(--chart-2)' },
    { name: 'Bamboo', value: 4, color: 'var(--chart-3)' },
    { name: 'Compostable', value: 3, color: 'var(--chart-4)' },
    { name: 'Other', value: 2, color: 'var(--chart-5)' },
  ];

  type TabButtonProps = {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  };
  const TabButton = ({ id, label, isActive, onClick }: TabButtonProps) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
      }`}
    >
      {label}
    </button>
  );

  type MetricCardProps = {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string;
  };
  const MetricCard = ({ icon: Icon, label, value, color }: MetricCardProps) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  type Order = {
    id: string;
    product: string;
    date: string;
    status: string;
    sustainability: string;
  };
  type OrderCardProps = {
    order: Order;
  };
  const OrderCard = ({ order }: OrderCardProps) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-white">{order.product}</h4>
          <p className="text-sm text-gray-400">Order #{order.id}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {order.status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{order.date}</span>
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
          {order.sustainability}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  EcoTrack
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-1 ml-8">
                <TabButton 
                  id="overview" 
                  label="Overview" 
                  isActive={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                />
                <TabButton 
                  id="orders" 
                  label="My Orders" 
                  isActive={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                />
                <TabButton 
                  id="returns" 
                  label="Returns" 
                  isActive={activeTab === 'returns'}
                  onClick={() => setActiveTab('returns')}
                />
                <TabButton 
                  id="sustainability" 
                  label="Sustainability" 
                  isActive={activeTab === 'sustainability'}
                  onClick={() => setActiveTab('sustainability')}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400 hover:text-green-400 transition-colors cursor-pointer" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {profileName ? profileName : 'Customer'}!</h1>
                  <p className="text-gray-400">Track your sustainable shopping journey and environmental impact</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">{sustainabilityScore}%</div>
                  <div className="text-sm text-gray-400">Sustainability Score</div>
                </div>
              </div>
            </div>

            {/* Total Visitors Area Chart */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex flex-col mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-semibold text-white">Total Visitors</span>
                  <div className="text-sm text-gray-400">Total for the last 3 months</div>
                </div>
                {/* You can add chart tab buttons here if needed */}
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ReAreaChart data={areaChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#a3a3a3" fontSize={12} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#232136', border: 'none', borderRadius: 8, color: '#fff' }} />
                    <Area type="monotone" dataKey="baseline" stroke="#a3e635" fill="url(#colorBaseline)" strokeWidth={2} />
                    <Area type="monotone" dataKey="visitors" stroke="#38bdf8" fill="url(#colorVisitors)" strokeWidth={3} />
                  </ReAreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabbed Document Table Section */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                {['Outline', 'Past Performance', 'Key Personnel', 'Focus Documents'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-1 ${
                      activeTab === tab ? 'bg-blue-400/20 text-blue-200' : 'hover:bg-gray-800 text-gray-400'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <div className="flex-1" />
                <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-gray-800 text-gray-400">
                  <span>Customize Columns</span>
                </button>
              </div>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Document</th>
                    <th className="px-4 py-2 text-left font-semibold">Type</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                    <th className="px-4 py-2 text-left font-semibold">Last Updated</th>
                    <th className="px-4 py-2 text-left font-semibold">Reviewer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { doc: 'Order Invoice', type: 'PDF', status: 'Available', updated: '2024-07-12', reviewer: 'Alex Kim' },
                    { doc: 'Return Receipt', type: 'PDF', status: 'Available', updated: '2024-07-10', reviewer: 'Priya S.' },
                    { doc: 'Sustainability Report', type: 'Report', status: 'Pending', updated: '2024-07-08', reviewer: 'Rahul M.' },
                    { doc: 'Eco Points Statement', type: 'Statement', status: 'Available', updated: '2024-07-05', reviewer: 'Ayesha K.' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-2 font-medium text-white">
                        <span className="inline-block align-middle mr-2 cursor-move">⋮⋮</span>
                        <input type="checkbox" className="mr-2 align-middle" />
                        {row.doc}
                      </td>
                      <td className="px-4 py-2">
                        <span className="px-3 py-1 rounded-lg bg-gray-800 text-blue-200 text-xs font-semibold">{row.type}</span>
                      </td>
                      <td className="px-4 py-2 text-white">{row.status}</td>
                      <td className="px-4 py-2 text-white">{row.updated}</td>
                      <td className="px-4 py-2 text-white">{row.reviewer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pie and Bar Chart Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Pie Chart Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex flex-col items-center justify-center">
                <span className="text-base font-semibold text-white mb-1">Sustainability Breakdown</span>
                <span className="text-sm text-gray-400 mb-4">Your activity by category</span>
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
                <div className="mt-4 text-sm font-semibold text-white">Eco-friendly actions up <span className="text-green-400">+8%</span> this month</div>
                <div className="text-xs text-gray-400">Based on your last 6 months</div>
              </div>
              {/* Bar Chart Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex flex-col items-center justify-center">
                <span className="text-base font-semibold text-white mb-1">Product Types</span>
                <span className="text-sm text-gray-400 mb-4">Breakdown by material</span>
                <BarChart width={260} height={160} data={barData} layout="vertical" barCategoryGap={16}>
                  <Bar dataKey="value" radius={8}>
                    {barData.map((entry, idx) => (
                      <Cell key={`cell-bar-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" fontSize={14} width={80} />
                  <XAxis type="number" hide />
                </BarChart>
                <div className="mt-4 text-sm font-semibold text-white">Most popular: <span className="text-blue-400">Organic</span></div>
                <div className="text-xs text-gray-400">Updated monthly</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainabilityMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Recent Orders</h3>
                  <button className="text-green-400 hover:text-green-300 transition-colors">
                    View All <ChevronRight className="w-4 h-4 inline" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-6">Sustainability Insights</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Carbon Neutral Goal</div>
                      <div className="text-sm text-gray-400">85% towards monthly target</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Waste Reduction</div>
                      <div className="text-sm text-gray-400">12 kg plastic avoided this month</div>
                      <div className="text-xs text-green-400 mt-1">↑ 23% from last month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Eco Achievements</div>
                      <div className="text-sm text-gray-400">Green Champion badge earned</div>
                      <div className="text-xs text-purple-400 mt-1">3 more badges available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Orders</h2>
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <select className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-sm">
                  <option>All Orders</option>
                  <option>Delivered</option>
                  <option>Shipped</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentOrders.map((order, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <OrderCard order={order} />
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button className="text-green-400 hover:text-green-300 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Return Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                Request Return
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Return Statistics</h3>
                  <RotateCcw className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Returns</span>
                    <span className="text-white font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Return Rate</span>
                    <span className="text-green-400 font-semibold">{returnRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Eco Impact</span>
                    <span className="text-blue-400 font-semibold">+15 points</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="font-semibold mb-4">Recent Returns</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <div className="font-medium">Organic Cotton Shirt</div>
                      <div className="text-sm text-gray-400">Returned to supplier for recycling</div>
                    </div>
                    <span className="text-green-400 text-sm">Processed</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <div className="font-medium">Bamboo Water Bottle</div>
                      <div className="text-sm text-gray-400">Defective - sent for composting</div>
                    </div>
                    <span className="text-yellow-400 text-sm">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sustainability' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sustainability Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-6">Environmental Impact</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{carbonSaved} kg</div>
                    <div className="text-gray-400">CO₂ Saved This Year</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                      <div className="text-2xl font-bold text-blue-400">23</div>
                      <div className="text-sm text-gray-400">Eco Products</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                      <div className="text-2xl font-bold text-purple-400">156</div>
                      <div className="text-sm text-gray-400">Trees Saved</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-6">Eco Achievements</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Green Champion</div>
                      <div className="text-sm text-gray-400">50+ sustainable purchases</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Carbon Neutral</div>
                      <div className="text-sm text-gray-400">Offset 200kg CO₂</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Waste Warrior</div>
                      <div className="text-sm text-gray-400">Zero waste for 30 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;