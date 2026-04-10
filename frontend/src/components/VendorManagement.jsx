// components/VendorManagement.jsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle,
  Clock,
  Archive,
  Package,
  Briefcase,
  Truck,
  Activity,
  Users,
  UserCheck,
  UserX,
  UserMinus,
  DollarSign,
  Building,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Mock Data ---
const MOCK_VENDORS = [
  {
    id: '1',
    name: 'ABC Supplies',
    company: 'ABC Supply Co.',
    contactPerson: 'John Doe',
    email: 'john@abcsupplies.com',
    phone: '(555) 123-4567',
    category: 'Supplies',
    status: 'Active',
    location: 'Mumbai, MH',
    createdDate: '2023-01-15',
    notes: 'Reliable supplier for office materials.',
    totalSpend: 12500,
    transactionHistory: [
      { id: 't1', date: '2024-01-10', amount: 2500, description: 'Office supplies order' },
      { id: 't2', date: '2024-02-15', amount: 10000, description: 'Bulk purchase' }
    ]
  },
  {
    id: '2',
    name: 'Fast Logistics',
    company: 'FastLogistics Inc.',
    contactPerson: 'Sarah Lee',
    email: 'sarah@fastlogistics.com',
    phone: '(555) 987-6543',
    category: 'Logistics',
    status: 'Active',
    location: 'Pune, MH',
    createdDate: '2023-05-20',
    totalSpend: 45200,
    transactionHistory: [{ id: 't3', date: '2024-01-20', amount: 45200, description: 'Annual shipping contract' }]
  },
  {
    id: '3',
    name: 'Tech Solutions',
    company: 'Tech Solutions Ltd.',
    contactPerson: 'Mike Chen',
    email: 'mike@techsolutions.com',
    phone: '(555) 456-7890',
    category: 'Technology',
    status: 'Pending',
    location: 'Bengaluru, KA',
    createdDate: '2024-02-10',
    notes: 'Pending background check.',
  },
  {
    id: '4',
    name: 'Elite Services',
    company: 'Elite Consulting Group',
    contactPerson: 'Emma Wilson',
    email: 'emma@elite.com',
    phone: '(555) 234-5678',
    category: 'Consulting',
    status: 'Inactive',
    location: 'Delhi',
    createdDate: '2022-11-05',
  },
  {
    id: '5',
    name: 'Green Transport',
    company: 'Green Transport LLC',
    contactPerson: 'Robert Brown',
    email: 'robert@greentransport.com',
    phone: '(555) 876-5432',
    category: 'Logistics',
    status: 'Active',
    location: 'Chennai, TN',
    createdDate: '2023-09-12',
    totalSpend: 18750,
  },
  {
    id: '6',
    name: 'Paper & Co.',
    company: 'Paper and Co.',
    contactPerson: 'Lisa Adams',
    email: 'lisa@paperco.com',
    phone: '(555) 345-6789',
    category: 'Supplies',
    status: 'Active',
    location: 'Hyderabad, TS',
    createdDate: '2023-11-01',
  },
  {
    id: '7',
    name: 'Cloud Experts',
    company: 'Cloud Experts Inc.',
    contactPerson: 'David Kim',
    email: 'david@cloudexperts.com',
    phone: '(555) 654-3210',
    category: 'Technology',
    status: 'Pending',
    location: 'Pune, MH',
    createdDate: '2024-03-18',
  }
];

// --- Helper Components ---
const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-700 ring-green-600/20',
    Inactive: 'bg-gray-50 text-gray-600 ring-gray-500/20',
    Pending: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
  };
  const icons = {
    Active: <CheckCircle className="w-3 h-3 mr-1" />,
    Inactive: <Archive className="w-3 h-3 mr-1" />,
    Pending: <Clock className="w-3 h-3 mr-1" />
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const CategoryIcon = ({ category }) => {
  const icons = {
    Supplies: <Package className="w-4 h-4" />,
    Services: <Briefcase className="w-4 h-4" />,
    Logistics: <Truck className="w-4 h-4" />,
    Technology: <Activity className="w-4 h-4" />,
    Consulting: <Users className="w-4 h-4" />
  };
  return (
    <div className="p-1 rounded-md bg-gray-100 text-gray-600">
      {icons[category]}
    </div>
  );
};

// --- Tabs Component ---
const VendorTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All Vendors', icon: <Users className="w-4 h-4" /> },
    { id: 'active', label: 'Active', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'inactive', label: 'Inactive', icon: <UserX className="w-4 h-4" /> }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.id
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- Vendor Table Component ---
const VendorTable = ({ vendors, onView, onEdit, onDelete }) => {
  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-900">No vendors found</h3>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Vendor Name', 'Company', 'Contact Person', 'Email', 'Phone', 'Category', 'Status', 'Location', 'Created Date', 'Actions'].map((head) => (
              <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CategoryIcon category={vendor.category} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contactPerson}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CategoryIcon category={vendor.category} />
                  <span className="ml-2 text-sm text-gray-500">{vendor.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={vendor.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(vendor.createdDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(vendor)}
                    className="text-gray-400 hover:text-green-600 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(vendor)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit vendor"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(vendor.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete vendor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
};

// --- Add Vendor Modal ---
const AddVendorModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '', company: '', contactPerson: '', email: '', phone: '', 
    category: 'Supplies',
    status: 'Pending', 
    location: '', notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, createdDate: new Date().toISOString().split('T')[0] });
    onClose();
    setFormData({ 
      name: '', company: '', contactPerson: '', email: '', phone: '', 
      category: 'Supplies', status: 'Pending', location: '', notes: '' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-medium text-gray-900">Add New Vendor</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vendor Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company *</label>
                  <input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
                  <input type="text" required value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                    <option value="Supplies">Supplies</option>
                    <option value="Services">Services</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Technology">Technology</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location *</label>
                  <input type="text" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea rows={2} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" 
                  className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Vendor Details Drawer ---
const VendorDetailsDrawer = ({ vendor, isOpen, onClose }) => {
  if (!isOpen || !vendor) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <h2 className="text-lg font-medium text-gray-900">Vendor Details</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 px-4 py-6 sm:px-6 space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                    <p className="text-base font-semibold text-gray-900">{vendor.name}</p>
                    <p className="text-sm text-gray-500">{vendor.company}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Contact Person</p>
                        <p className="text-sm text-gray-900">{vendor.contactPerson}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{vendor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm text-gray-900">{vendor.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm text-gray-900">{vendor.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Vendor Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <div className="flex items-center mt-1">
                        <CategoryIcon category={vendor.category} />
                        <span className="ml-2 text-sm text-gray-900">{vendor.category}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="mt-1">
                        <StatusBadge status={vendor.status} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created Date</p>
                      <p className="text-sm text-gray-900">{new Date(vendor.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {vendor.totalSpend && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Financial</h3>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium">Total Spend</p>
                      <p className="text-2xl font-bold text-green-700">${vendor.totalSpend.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {vendor.transactionHistory && vendor.transactionHistory.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Transactions</h3>
                    <div className="space-y-2">
                      {vendor.transactionHistory.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-xs font-medium text-gray-900">{tx.date}</p>
                            <p className="text-xs text-gray-500">{tx.description}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">${tx.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {vendor.notes && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{vendor.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button key={pageNum} onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    pageNum === currentPage
                      ? 'z-10 bg-green-50 border-green-500 text-green-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}>
                  {pageNum}
                </button>
              );
            })}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// --- Summary Cards Component ---
const SummaryCards = ({ stats }) => {
  const cards = [
    { label: 'Total Vendors', value: stats.total, icon: Users, color: 'green' },
    { label: 'Active', value: stats.active, icon: UserCheck, color: 'green' },
    { label: 'Inactive', value: stats.inactive, icon: UserX, color: 'gray' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
    { label: 'Total Spend', value: `$${stats.totalSpend.toLocaleString()}`, icon: DollarSign, color: 'green' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className={`p-2 bg-${card.color}-50 rounded-lg`}>
              <card.icon className={`w-6 h-6 text-${card.color}-600`} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main Vendor Management Component ---
export default function VendorManagement() {
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const itemsPerPage = 5;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Get unique locations for filter dropdown
  const uniqueLocations = useMemo(() => 
    Array.from(new Set(vendors.map(v => v.location.split(',').pop()?.trim() || v.location))),
    [vendors]
  );

  // Apply filters and tab selection
  const filteredVendors = useMemo(() => {
    let filtered = vendors;
    
    // Apply tab filter first
    if (activeTab === 'active') {
      filtered = filtered.filter(v => v.status === 'Active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter(v => v.status === 'Inactive');
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter (if not already filtered by tab)
    if (statusFilter !== 'all' && activeTab === 'all') {
      filtered = filtered.filter(v => v.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(v => v.category === categoryFilter);
    }
    
    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(v => {
        const vendorCity = v.location.split(',').pop()?.trim() || v.location;
        return vendorCity === locationFilter;
      });
    }
    
    return filtered;
  }, [vendors, searchTerm, statusFilter, categoryFilter, locationFilter, activeTab]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Summary stats
  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'Active').length,
    inactive: vendors.filter(v => v.status === 'Inactive').length,
    pending: vendors.filter(v => v.status === 'Pending').length,
    totalSpend: vendors.reduce((sum, v) => sum + (v.totalSpend || 0), 0)
  };

  const handleAddVendor = (newVendor) => {
    const vendorWithId = { ...newVendor, id: (vendors.length + 1).toString() };
    setVendors([...vendors, vendorWithId]);
    showToast('Vendor created successfully!');
  };

  const handleEditVendor = (vendor) => {
    showToast(`Edit opened for: ${vendor.name}`, 'info');
  };

  const handleDeleteVendor = (id) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
      showToast('Vendor deleted successfully!');
    }
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsDrawerOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    // Reset status filter when changing tabs to avoid confusion
    if (tab !== 'all') {
      setStatusFilter('all');
    }
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = ['Name', 'Company', 'Contact Person', 'Email', 'Phone', 'Category', 'Status', 'Location', 'Created Date'];
    const csvData = filteredVendors.map(v => [
      v.name, v.company, v.contactPerson, v.email, v.phone, v.category, v.status, v.location, v.createdDate
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vendors_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Export completed!');
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header with Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add New Vendor
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards stats={stats} />

      {/* Tabs */}
      <VendorTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, company, or email..." 
              value={searchTerm} 
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              value={statusFilter} 
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} 
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              disabled={activeTab !== 'all'}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            <select 
              value={categoryFilter} 
              onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }} 
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Supplies">Supplies</option>
              <option value="Services">Services</option>
              <option value="Logistics">Logistics</option>
              <option value="Technology">Technology</option>
              <option value="Consulting">Consulting</option>
            </select>
            <select 
              value={locationFilter} 
              onChange={e => { setLocationFilter(e.target.value); setCurrentPage(1); }} 
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <button 
              onClick={handleExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-1" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <VendorTable 
          vendors={paginatedVendors}
          onView={handleViewDetails}
          onEdit={handleEditVendor}
          onDelete={handleDeleteVendor}
        />
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals and Drawers */}
      <AddVendorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddVendor} 
      />
      <VendorDetailsDrawer 
        vendor={selectedVendor} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}