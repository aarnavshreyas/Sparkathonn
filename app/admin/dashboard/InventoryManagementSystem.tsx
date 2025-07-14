import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Upload, Filter, X, AlertTriangle, CheckCircle, XCircle, Calendar, Package, TrendingUp } from 'lucide-react';
// Removed CSS module import

const InventoryManagementSystem = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Organic Cotton Fabric',
      category: 'Textiles',
      stock: 50,
      threshold: 20,
      expiryDate: '2025-08-15',
      ethicalCertified: true,
      documents: [{ name: 'Organic_Certificate.pdf', size: '2.1 MB' }]
    },
    {
      id: 2,
      name: 'Natural Dye - Indigo',
      category: 'Dyes',
      stock: 5,
      threshold: 10,
      expiryDate: '2025-07-20',
      ethicalCertified: true,
      documents: [{ name: 'Khadi_Certificate.pdf', size: '1.8 MB' }]
    },
    {
      id: 3,
      name: 'Bamboo Fiber',
      category: 'Textiles',
      stock: 30,
      threshold: 15,
      expiryDate: '2025-12-01',
      ethicalCertified: false,
      documents: []
    },
    {
      id: 4,
      name: 'Synthetic Thread',
      category: 'Accessories',
      stock: 8,
      threshold: 25,
      expiryDate: '2025-07-18',
      ethicalCertified: false,
      documents: []
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ethicalFilter, setEthicalFilter] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    threshold: '',
    expiryDate: '',
    ethicalCertified: false,
    documents: []
  });

  const categories = [...new Set(items.map(item => item.category))];

  const getItemStatus = (item) => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'spoiled';
    if (daysUntilExpiry <= 7) return 'expiring';
    if (item.stock < item.threshold) return 'low-stock';
    return 'good';
  };

  const getSpoilageStatus = (item) => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'Spoiled';
    if (daysUntilExpiry <= 7) return 'Near Expiry';
    return 'Good';
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesEthical = !ethicalFilter || 
        (ethicalFilter === 'certified' && item.ethicalCertified) ||
        (ethicalFilter === 'not-certified' && !item.ethicalCertified);
      
      const status = getItemStatus(item);
      const matchesStatus = !statusFilter || 
        (statusFilter === 'low-stock' && status === 'low-stock') ||
        (statusFilter === 'expiring' && status === 'expiring') ||
        (statusFilter === 'spoiled' && status === 'spoiled');
      
      return matchesSearch && matchesCategory && matchesEthical && matchesStatus;
    });
  }, [items, searchTerm, categoryFilter, ethicalFilter, statusFilter]);

  const analytics = useMemo(() => {
    const totalProducts = items.length;
    const nearExpiry = items.filter(item => {
      const status = getItemStatus(item);
      return status === 'expiring' || status === 'spoiled';
    }).length;
    const lowStock = items.filter(item => getItemStatus(item) === 'low-stock').length;
    const ethicalCertified = items.filter(item => item.ethicalCertified).length;
    
    return { totalProducts, nearExpiry, lowStock, ethicalCertified };
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id, stock: parseInt(formData.stock), threshold: parseInt(formData.threshold) }
          : item
      ));
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        stock: parseInt(formData.stock),
        threshold: parseInt(formData.threshold)
      };
      setItems([...items, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      stock: '',
      threshold: '',
      expiryDate: '',
      ethicalCertified: false,
      documents: []
    });
    setEditingItem(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      stock: item.stock.toString(),
      threshold: item.threshold.toString(),
      expiryDate: item.expiryDate,
      ethicalCertified: item.ethicalCertified,
      documents: item.documents || []
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB'
    }));
    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments]
    });
  };

  const removeDocument = (index) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index)
    });
  };

  const getRowClassName = (item) => {
    const status = getItemStatus(item);
    switch (status) {
      case 'spoiled': return 'bg-red-50 border-red-200';
      case 'expiring': return 'bg-yellow-50 border-yellow-200';
      case 'low-stock': return 'bg-orange-50 border-orange-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const getStatusBadge = (item) => {
    const status = getItemStatus(item);
    const spoilageStatus = getSpoilageStatus(item);
    
    switch (status) {
      case 'spoiled':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full flex items-center gap-1">
          <XCircle size={12} /> Spoiled
        </span>;
      case 'expiring':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">
          <AlertTriangle size={12} /> Near Expiry
        </span>;
      case 'low-stock':
        return <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full flex items-center gap-1">
          <Package size={12} /> Low Stock
        </span>;
      default:
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1">
          <CheckCircle size={12} /> Good
        </span>;
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="ims min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[var(--card)] rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Inventory Management</h1>
          <p className="text-[var(--muted-foreground)]">Track your products, certifications, and spoilage status</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--card)] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Products</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{analytics.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)]">Near Expiry</p>
                <p className="text-2xl font-bold text-red-600">{analytics.nearExpiry}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)]">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.lowStock}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)]">Ethical Certified</p>
                <p className="text-2xl font-bold text-green-600">{analytics.ethicalCertified}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[var(--card)] rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 flex-1">
              {/* Search */}
              <div className="relative min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                />
              </div>

              {/* Filters */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
              >
                <option value="">All Status</option>
                <option value="low-stock">Low Stock</option>
                <option value="expiring">Expiring Soon</option>
                <option value="spoiled">Spoiled</option>
              </select>

              <select
                value={ethicalFilter}
                onChange={(e) => setEthicalFilter(e.target.value)}
                className="px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)]"
              >
                <option value="">All Ethical Status</option>
                <option value="certified">Certified</option>
                <option value="not-certified">Not Certified</option>
              </select>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg hover:brightness-90 flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-[var(--card)] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--background)]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Ethical</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Documents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--card)] divide-y divide-[var(--border)]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className={`border-l-4 ${getRowClassName(item)}`} style={{ borderColor: 'var(--border)' }}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-[var(--foreground)]">{item.name}</div>
                          {getDaysUntilExpiry(item.expiryDate) <= 7 && getDaysUntilExpiry(item.expiryDate) > 0 && (
                            <div className="text-xs text-[var(--foreground)] flex items-center gap-1">
                              <AlertTriangle size={12} />
                              {getDaysUntilExpiry(item.expiryDate)} days left
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-[var(--muted)] text-[var(--foreground)] rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--foreground)]">{item.stock} units</div>
                      {item.stock < item.threshold && (
                        <div className="text-xs text-[var(--foreground)]">Below threshold ({item.threshold})</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--foreground)] flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.ethicalCertified ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle size={12} /> Certified
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full flex items-center gap-1 w-fit">
                          <XCircle size={12} /> Not Certified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--foreground)]">
                        {item.documents && item.documents.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {item.documents.map((doc, index) => (
                              <div key={index} className="text-xs text-blue-600 flex items-center gap-1">
                                <Upload size={12} />
                                {doc.name}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--muted-foreground)]">No documents</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--card)] rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingItem ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Threshold
                    </label>
                    <input
                      type="number"
                      value={formData.threshold}
                      onChange={(e) => setFormData({...formData, threshold: e.target.value})}
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.ethicalCertified}
                      onChange={(e) => setFormData({...formData, ethicalCertified: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-[var(--border)] rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Ethically Certified
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Documents
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                  />
                  {formData.documents.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-[var(--background)] p-2 rounded">
                          <span className="text-sm text-[var(--foreground)]">{doc.name} ({doc.size})</span>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:brightness-90 transition-colors"
                  >
                    {editingItem ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--card)] rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-[var(--muted-foreground)] mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        /* Force dark theme for InventoryManagementSystem */
        .ims {
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
        /* Enhanced placeholder and text visibility for InventoryManagementSystem */
        .ims input::placeholder,
        .ims textarea::placeholder {
          color: var(--muted-foreground, #888);
          opacity: 1;
        }
        .dark .ims input::placeholder,
        .dark .ims textarea::placeholder {
          color: var(--muted-foreground, #bbb);
          opacity: 1;
        }
        .ims,
        .ims .text-base,
        .ims .text-sm,
        .ims .text-md,
        .ims .text-lg,
        .ims .text-xl,
        .ims .text-2xl,
        .ims .text-3xl,
        .ims .text-4xl,
        .ims .text-5xl,
        .ims .text-6xl {
          color: var(--foreground, #222);
        }
        .dark .ims,
        .dark .ims .text-base,
        .dark .ims .text-sm,
        .dark .ims .text-md,
        .dark .ims .text-lg,
        .dark .ims .text-xl,
        .dark .ims .text-2xl,
        .dark .ims .text-3xl,
        .dark .ims .text-4xl,
        .dark .ims .text-5xl,
        .dark .ims .text-6xl {
          color: var(--foreground, #eee);
        }
        .ims input,
        .ims textarea {
          color: var(--foreground, #222);
          background: var(--input, #fff);
        }
        .dark .ims input,
        .dark .ims textarea {
          color: var(--foreground, #eee);
          background: var(--input, #222);
        }
      `}</style>
    </div>
  );
};

export default InventoryManagementSystem; 