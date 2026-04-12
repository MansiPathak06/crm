"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

// ─────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────
const INITIAL_PAYMENTS = [
  { id: 1, title: "Cement & Steel Supply", vendor: "ABC Supplies", project: "Skyline Tower Phase 2", type: "Material Costs", amount: 480000, status: "Paid", date: "2024-01-10", dueDate: "2024-01-15" },
  { id: 2, title: "Worker Wages - Jan", vendor: "Internal", project: "Green Valley Residency", type: "Worker Salaries", amount: 120000, status: "Paid", date: "2024-01-31", dueDate: "2024-01-31" },
  { id: 3, title: "Logistics & Transport", vendor: "Fast Logistics", project: "Riverside Bridge Project", type: "Vendor Payments", amount: 95000, status: "Pending", date: "2024-02-05", dueDate: "2024-02-20" },
  { id: 4, title: "Electrical Equipment", vendor: "Tech Solutions", project: "Metro Rail Depot", type: "Material Costs", amount: 320000, status: "Overdue", date: "2024-01-20", dueDate: "2024-02-01" },
  { id: 5, title: "Site Inspection Fee", vendor: "Elite Services", project: "Corporate Hub Annex", type: "Project Expenses", amount: 45000, status: "Paid", date: "2024-02-10", dueDate: "2024-02-10" },
  { id: 6, title: "Worker Wages - Feb", vendor: "Internal", project: "Central Mall Expansion", type: "Worker Salaries", amount: 135000, status: "Pending", date: "2024-02-29", dueDate: "2024-02-29" },
  { id: 7, title: "Sand & Aggregate Supply", vendor: "Paper & Co.", project: "NH-48 Highway Widening", type: "Material Costs", amount: 210000, status: "Paid", date: "2024-01-25", dueDate: "2024-02-05" },
  { id: 8, title: "Consultant Fee", vendor: "Elite Services", project: "Techpark Phase 3", type: "Vendor Payments", amount: 75000, status: "Overdue", date: "2024-01-15", dueDate: "2024-01-30" },
  { id: 9, title: "Green Transport Contract", vendor: "Green Transport", project: "Lakeview Villas", type: "Vendor Payments", amount: 55000, status: "Paid", date: "2024-02-01", dueDate: "2024-02-10" },
  { id: 10, title: "Worker Wages - Mar", vendor: "Internal", project: "Old Town Heritage Restoration", type: "Worker Salaries", amount: 98000, status: "Pending", date: "2024-03-31", dueDate: "2024-03-31" },
  { id: 11, title: "Solar Panel Equipment", vendor: "Cloud Experts", project: "Solar Farm Grid", type: "Material Costs", amount: 560000, status: "Paid", date: "2022-06-01", dueDate: "2022-06-15" },
  { id: 12, title: "Safety Audit Services", vendor: "Elite Consulting", project: "Metro Rail Depot", type: "Project Expenses", amount: 38000, status: "Overdue", date: "2024-02-10", dueDate: "2024-02-20" },
];

const TYPE_COLORS = {
  "Vendor Payments": "#6366f1",
  "Worker Salaries": "#f59e0b",
  "Material Costs": "#10b981",
  "Project Expenses": "#f43f5e",
};

const STATUS_STYLES = {
  Paid: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-yellow-100 text-yellow-700 ring-yellow-600/20",
  Overdue: "bg-rose-100 text-rose-700 ring-rose-600/20",
};

const TYPE_STYLES = {
  "Vendor Payments": "bg-indigo-100 text-indigo-700",
  "Worker Salaries": "bg-amber-100 text-amber-700",
  "Material Costs": "bg-emerald-100 text-emerald-700",
  "Project Expenses": "bg-rose-100 text-rose-700",
};

// ─────────────────────────────────────────
// Add Payment Modal
// ─────────────────────────────────────────
function AddPaymentModal({ open, onClose, onAdd }) {
  const defaultForm = {
    title: "", vendor: "", project: "", type: "Vendor Payments",
    amount: "", status: "Pending", date: "", dueDate: "",
  };
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.vendor.trim()) e.vendor = "Vendor is required";
    if (!form.project.trim()) e.project = "Project is required";
    if (!form.amount || isNaN(form.amount)) e.amount = "Valid amount is required";
    if (!form.date) e.date = "Date is required";
    if (!form.dueDate) e.dueDate = "Due date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ ...form, id: Date.now(), amount: Number(form.amount) });
    setForm(defaultForm);
    setErrors({});
    onClose();
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  const inputCls = (key) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
      errors[key] ? "border-rose-400 bg-rose-50" : "border-gray-200 bg-gray-50 focus:bg-white"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">Add Payment</h2>
              <p className="text-emerald-100 text-sm">Record a new payment or expense</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Title</label>
            <input type="text" placeholder="e.g. Cement Supply Payment" className={inputCls("title")} {...field("title")} />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Vendor</label>
              <input type="text" placeholder="e.g. ABC Supplies" className={inputCls("vendor")} {...field("vendor")} />
              {errors.vendor && <p className="text-xs text-rose-500 mt-1">{errors.vendor}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Project</label>
              <input type="text" placeholder="e.g. Skyline Tower" className={inputCls("project")} {...field("project")} />
              {errors.project && <p className="text-xs text-rose-500 mt-1">{errors.project}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Type</label>
              <select className={inputCls("type")} {...field("type")}>
                {["Vendor Payments", "Worker Salaries", "Material Costs", "Project Expenses"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Status</label>
              <select className={inputCls("status")} {...field("status")}>
                {["Pending", "Paid", "Overdue"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Amount (₹)</label>
            <input type="number" placeholder="e.g. 50000" className={inputCls("amount")} {...field("amount")} />
            {errors.amount && <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Payment Date</label>
              <input type="date" className={inputCls("date")} {...field("date")} />
              {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Due Date</label>
              <input type="date" className={inputCls("dueDate")} {...field("dueDate")} />
              {errors.dueDate && <p className="text-xs text-rose-500 mt-1">{errors.dueDate}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition">
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────
export default function PaymentExpenses() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = (payment) => {
    setPayments((prev) => [payment, ...prev]);
    showToast("Payment added successfully!");
  };

  const handleDelete = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
    showToast("Payment deleted!", "info");
  };

  // Filtered payments
  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.vendor.toLowerCase().includes(search.toLowerCase()) ||
        p.project.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchType = typeFilter === "All" || p.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [payments, search, statusFilter, typeFilter]);

  // Summary stats
  const stats = {
    total: payments.reduce((s, p) => s + p.amount, 0),
    paid: payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0),
    pending: payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0),
    overdue: payments.filter((p) => p.status === "Overdue").reduce((s, p) => s + p.amount, 0),
  };

  // Bar chart data — monthly
  const barData = [
    { month: "Oct", amount: 320000 },
    { month: "Nov", amount: 480000 },
    { month: "Dec", amount: 210000 },
    { month: "Jan", amount: 815000 },
    { month: "Feb", amount: 388000 },
    { month: "Mar", amount: 98000 },
  ];

  // Pie chart data — by type
  const pieData = Object.entries(
    payments.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + p.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  const summaryCards = [
    { label: "Total Expenses", value: fmt(stats.total), bg: "bg-blue-50", color: "text-blue-700", icon: "💰" },
    { label: "Paid", value: fmt(stats.paid), bg: "bg-emerald-50", color: "text-emerald-700", icon: "✅" },
    { label: "Pending", value: fmt(stats.pending), bg: "bg-amber-50", color: "text-amber-700", icon: "🕐" },
    { label: "Overdue", value: fmt(stats.overdue), bg: "bg-rose-50", color: "text-rose-700", icon: "⚠️" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className={`${card.bg} rounded-2xl p-5 shadow-sm border border-white/60`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{card.label}</span>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Expenses by Type</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={TYPE_COLORS[entry.name] || "#94a3b8"} />
                ))}
              </Pie>
              <Legend formatter={(v) => <span className="text-xs text-gray-600">{v}</span>} />
              <Tooltip formatter={(v) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, vendor, project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {["All", "Paid", "Pending", "Overdue"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {["All", "Vendor Payments", "Worker Salaries", "Material Costs", "Project Expenses"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="text-sm text-gray-400 font-medium self-center shrink-0">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Title", "Vendor", "Project", "Type", "Amount", "Status", "Date", "Due Date", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p, i) => (
                <tr key={p.id} className={`hover:bg-gray-50/70 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                  <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{p.title}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{p.vendor}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap max-w-[160px] truncate">{p.project}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_STYLES[p.type]}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">{fmt(p.amount)}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{new Date(p.date).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={p.status === "Overdue" ? "text-rose-600 font-semibold" : "text-gray-500"}>
                      {new Date(p.dueDate).toLocaleDateString("en-IN")}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="font-medium">No payments found</p>
            </div>
          )}
        </div>
      </div>

      <AddPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}