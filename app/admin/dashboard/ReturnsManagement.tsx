import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, FileText, TrendingUp, Package, AlertCircle, Recycle, Warehouse } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Types for trends data
interface DestinationData {
  name: string;
  value: number;
  color: string;
}
interface ReasonData {
  reason: string;
  count: number;
}
interface TrendData {
  date: string;
  quantity: number;
}
interface Trends {
  totalReturns: number;
  compostPercentage: number;
  warehousePercentage: number;
  supplierPercentage: number;
  destinationData: DestinationData[];
  reasonData: ReasonData[];
  trendData: TrendData[];
}

// Type for a return item
interface ReturnItem {
  id: string;
  productName: string;
  quantity: string;
  reason: string;
  destination: string;
  dateReturned: string;
  complaintId?: string;
  governmentRecord?: string;
}

const ReturnsManagement = () => {
  // Mock trends data (replace with real data as needed)
  const trends: Trends = {
    totalReturns: 120,
    compostPercentage: 35,
    warehousePercentage: 45,
    supplierPercentage: 20,
    destinationData: [
      { name: 'Compost', value: 42, color: 'oklch(0.7058 0.0777 302.0489)' },
      { name: 'Warehouse', value: 54, color: 'oklch(0.7321 0.0749 169.8670)' },
      { name: 'Supplier', value: 24, color: 'oklch(0.8540 0.0882 76.8292)' },
    ],
    reasonData: [
      { reason: 'Expired', count: 40 },
      { reason: 'Damaged', count: 30 },
      { reason: 'Customer Complaint', count: 25 },
      { reason: 'Others', count: 25 },
    ],
    trendData: [
      { date: '2024-06-01', quantity: 5 },
      { date: '2024-06-02', quantity: 8 },
      { date: '2024-06-03', quantity: 12 },
      { date: '2024-06-04', quantity: 7 },
      { date: '2024-06-05', quantity: 15 },
      { date: '2024-06-06', quantity: 10 },
      { date: '2024-06-07', quantity: 18 },
      { date: '2024-06-08', quantity: 20 },
      { date: '2024-06-09', quantity: 25 },
      { date: '2024-06-10', quantity: 10 },
    ],
  };
  const [showTrends, setShowTrends] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReturn, setEditingReturn] = useState<ReturnItem | null>(null);
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [formData, setFormData] = useState<Omit<ReturnItem, 'id'>>({
    productName: '',
    quantity: '',
    reason: '',
    destination: '',
    dateReturned: new Date().toISOString().split('T')[0],
    complaintId: '',
    governmentRecord: ''
  });
  const reasons = ['Expired', 'Damaged', 'Customer Complaint', 'Others'];
  const destinations = ['Warehouse', 'Compost', 'Supplier'];
  const products = [
    'Organic Apples', 'Fresh Spinach', 'Canned Beans', 'Milk Cartons',
    'Bread Loaves', 'Chicken Breast', 'Yogurt Cups', 'Bananas'
  ];
  // Filtered returns logic
  const filteredReturns = useMemo(() => {
    return returns.filter((item) => {
      const matchesSearch =
        !searchTerm || item.productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesReason = !reasonFilter || item.reason === reasonFilter;
      const matchesDestination = !destinationFilter || item.destination === destinationFilter;
      const matchesStartDate = !dateRange.start || item.dateReturned >= dateRange.start;
      const matchesEndDate = !dateRange.end || item.dateReturned <= dateRange.end;
      return (
        matchesSearch &&
        matchesReason &&
        matchesDestination &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [returns, searchTerm, reasonFilter, destinationFilter, dateRange]);

  // Handler functions
  function handleEdit(returnItem: ReturnItem) {
    setEditingReturn(returnItem);
    // Remove id from returnItem for formData, ensure complaintId and governmentRecord are always strings
    const { complaintId, governmentRecord, ...rest } = returnItem;
    setFormData({
      ...rest,
      complaintId: complaintId ?? '',
      governmentRecord: governmentRecord ?? '',
    });
    setShowAddForm(true);
  }

  function handleDelete(id: string) {
    setReturns((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit() {
    if (!formData.productName || !formData.quantity || !formData.reason || !formData.destination || !formData.dateReturned) {
      alert('Please fill all required fields.');
      return;
    }
    if (editingReturn) {
      setReturns((prev) =>
        prev.map((item) =>
          item.id === editingReturn.id ? { ...formData, id: editingReturn.id } : item
        )
      );
    } else {
      setReturns((prev) => [
        ...prev,
        { ...formData, id: Math.random().toString(36).substr(2, 9) },
      ]);
    }
    resetForm();
  }

  function resetForm() {
    setShowAddForm(false);
    setEditingReturn(null);
    setFormData({
      productName: '',
      quantity: '',
      reason: '',
      destination: '',
      dateReturned: new Date().toISOString().split('T')[0],
      complaintId: '',
      governmentRecord: ''
    });
  }
  return (
    <div className="rms max-w-7xl mx-auto p-6 bg-[var(--background)] min-h-screen">
      <div className="bg-[var(--card)] rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Returns Management</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Track and manage product returns</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTrends(!showTrends)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--muted)] text-[var(--primary)] rounded-lg hover:brightness-110 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                {showTrends ? 'Hide Trends' : 'View Trends'}
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:brightness-90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Return
              </button>
            </div>
          </div>
        </div>

        {/* Trends Section */}
        {showTrends && (
          <div className="border-b border-[var(--border)] px-6 py-4 bg-[var(--background)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Return Trends & Analytics</h2>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--muted-foreground)]" />
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">Total Returns</span>
                </div>
                <div className="text-2xl font-bold text-[var(--foreground)] mt-2">{trends.totalReturns}</div>
              </div>
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">To Compost</span>
                </div>
                <div className="text-2xl font-bold text-green-400 mt-2">{trends.compostPercentage}%</div>
              </div>
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">To Warehouse</span>
                </div>
                <div className="text-2xl font-bold text-blue-400 mt-2">{trends.warehousePercentage}%</div>
              </div>
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">To Supplier</span>
                </div>
                <div className="text-2xl font-bold text-orange-400 mt-2">{trends.supplierPercentage}%</div>
              </div>
            </div>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Destination Distribution Pie Chart */}
              <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Returns by Destination</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trends.destinationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trends.destinationData.map((entry: DestinationData, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Items']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Reason Distribution Bar Chart */}
              <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Returns by Reason</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trends.reasonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="reason" 
                      tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: 'var(--muted-foreground)' }} />
                    <Tooltip formatter={(value) => [value, 'Items']} contentStyle={{ background: 'var(--card)', color: 'var(--foreground)' }} />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Daily Returns Trend Line Chart */}
            <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Daily Returns Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends.trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [value, 'Items Returned']}
                    contentStyle={{ background: 'var(--card)', color: 'var(--foreground)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="quantity" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="border-b border-[var(--border)] px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
              />
            </div>
            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
            >
              <option value="">All Reasons</option>
              {reasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
            >
              <option value="">All Destinations</option>
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
              placeholder="End Date"
            />
            <button
              onClick={() => {
                setSearchTerm('');
                setReasonFilter('');
                setDestinationFilter('');
                setDateRange({ start: '', end: '' });
              }}
              className="px-4 py-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Returns Table */}
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Product Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Reason</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Destination</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Date Returned</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Complaint ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Gov Record</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((returnItem: ReturnItem) => (
                  <tr key={returnItem.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]">
                    <td className="py-3 px-4 font-medium text-[var(--foreground)]">{returnItem.productName}</td>
                    <td className="py-3 px-4 text-[var(--foreground)]">{returnItem.quantity}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        returnItem.reason === 'Expired' ? 'bg-red-900 text-red-200' :
                        returnItem.reason === 'Damaged' ? 'bg-orange-900 text-orange-200' :
                        returnItem.reason === 'Customer Complaint' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-[var(--muted)] text-[var(--foreground)]'
                      }`}>
                        {returnItem.reason}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        returnItem.destination === 'Compost' ? 'bg-green-900 text-green-200' :
                        returnItem.destination === 'Warehouse' ? 'bg-blue-900 text-blue-200' :
                        'bg-purple-900 text-purple-200'
                      }`}>
                        {returnItem.destination}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--foreground)]">{returnItem.dateReturned}</td>
                    <td className="py-3 px-4 text-[var(--foreground)]">{returnItem.complaintId || '-'}</td>
                    <td className="py-3 px-4">
                      {returnItem.governmentRecord ? (
                        <div className="flex items-center gap-1 text-blue-400">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{returnItem.governmentRecord}</span>
                        </div>
                      ) : (
                        <span className="text-[var(--muted-foreground)]">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(returnItem)}
                          className="p-1 text-blue-400 hover:bg-blue-900 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(returnItem.id)}
                          className="p-1 text-red-400 hover:bg-red-900 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredReturns.length === 0 && (
              <div className="text-center py-8 text-[var(--muted-foreground)]">
                No returns found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add/Edit Return Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-[var(--border)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {editingReturn ? 'Edit Return Record' : 'Add Return Record'}
              </h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Product</label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  required
                >
                  <option value="">Select a product...</option>
                  {products.map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Quantity Returned</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Reason for Return</label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  required
                >
                  <option value="">Select a reason...</option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Return Destination</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  required
                >
                  <option value="">Select destination...</option>
                  {destinations.map(dest => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Date Returned</label>
                <input
                  type="date"
                  value={formData.dateReturned}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateReturned: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Complaint ID (Optional)</label>
                <input
                  type="text"
                  value={formData.complaintId}
                  onChange={(e) => setFormData(prev => ({ ...prev, complaintId: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  placeholder="e.g., COMP-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Government Record (Optional)</label>
                <input
                  type="text"
                  value={formData.governmentRecord}
                  onChange={(e) => setFormData(prev => ({ ...prev, governmentRecord: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
                  placeholder="e.g., GOV-2024-001.pdf"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:brightness-90 transition-colors"
                >
                  {editingReturn ? 'Update Return' : 'Add Return'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:brightness-110 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        /* Force dark theme for ReturnsManagement */
        .rms {
          --background: oklch(0.2166 0.0215 292.8474);
          --foreground: oklch(0.9053 0.0245 293.5570);
          --card: oklch(0.2544 0.0301 292.7315);
          --card-foreground: oklch(0.9053 0.0245 293.5570);
          --popover: oklch(0.2544 0.0301 292.7315);
          --popover-foreground: oklch(0.9053 0.0245 293.5570);
          --primary: oklch(0.7058 0.0777 302.0489);
          --primary-foreground: oklch(0.2166 0.0215 292.8474);
          --secondary: oklch(0.4604 0.0472 295.5578);
          --secondary-foreground: oklch(0.9053 0.0245 293.5570);
          --muted: oklch(0.2560 0.0320 294.8380);
          --muted-foreground: oklch(0.6974 0.0282 300.0614);
          --accent: oklch(0.3181 0.0321 308.6149);
          --accent-foreground: oklch(0.8391 0.0692 2.6681);
          --destructive: oklch(0.6875 0.1420 21.4566);
          --destructive-foreground: oklch(0.2166 0.0215 292.8474);
          --border: oklch(0.3063 0.0359 293.3367);
          --input: oklch(0.2847 0.0346 291.2726);
          --ring: oklch(0.7058 0.0777 302.0489);
          --chart-1: oklch(0.7058 0.0777 302.0489);
          --chart-2: oklch(0.8391 0.0692 2.6681);
          --chart-3: oklch(0.7321 0.0749 169.8670);
          --chart-4: oklch(0.8540 0.0882 76.8292);
          --chart-5: oklch(0.7857 0.0645 258.0839);
          --sidebar: oklch(0.1985 0.0200 293.6639);
          --sidebar-foreground: oklch(0.9053 0.0245 293.5570);
          --sidebar-primary: oklch(0.7058 0.0777 302.0489);
          --sidebar-primary-foreground: oklch(0.2166 0.0215 292.8474);
          --sidebar-accent: oklch(0.3181 0.0321 308.6149);
          --sidebar-accent-foreground: oklch(0.8391 0.0692 2.6681);
          --sidebar-border: oklch(0.2847 0.0346 291.2726);
          --sidebar-ring: oklch(0.7058 0.0777 302.0489);
          --font-sans: Geist, sans-serif;
          --font-serif: "Lora", Georgia, serif;
          --font-mono: "Fira Code", "Courier New", monospace;
          --radius: 0.5rem;
          --shadow-2xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
          --shadow-xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
          --shadow-sm: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
          --shadow: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
          --shadow-md: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 2px 4px 0px hsl(0 0% 0% / 0.06);
          --shadow-lg: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 4px 6px 0px hsl(0 0% 0% / 0.06);
          --shadow-xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 8px 10px 0px hsl(0 0% 0% / 0.06);
          --shadow-2xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.15);
        }
      `}</style>
    </div>
  );
};

export default ReturnsManagement; 