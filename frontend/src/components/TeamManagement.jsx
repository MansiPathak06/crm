"use client";

import { useState, useMemo } from "react";

// ─────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────
const INITIAL_EMPLOYEES = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@managency.com", phone: "9876543210", role: "Admin", department: "Management", project: "All Projects", status: "Active", joinDate: "2021-03-15", salary: 85000, avatar: "RK" },
  { id: 2, name: "Priya Sharma", email: "priya@managency.com", phone: "9876543211", role: "Project Manager", department: "Operations", project: "Skyline Tower Phase 2", status: "Active", joinDate: "2022-01-10", salary: 65000, avatar: "PS" },
  { id: 3, name: "Suresh Patil", email: "suresh@managency.com", phone: "9876543212", role: "Site Engineer", department: "Engineering", project: "Riverside Bridge Project", status: "Active", joinDate: "2022-06-20", salary: 48000, avatar: "SP" },
  { id: 4, name: "Meena Joshi", email: "meena@managency.com", phone: "9876543213", role: "Accountant", department: "Finance", project: "All Projects", status: "Active", joinDate: "2021-11-05", salary: 52000, avatar: "MJ" },
  { id: 5, name: "Deepak Rao", email: "deepak@managency.com", phone: "9876543214", role: "Worker", department: "Construction", project: "Metro Rail Depot", status: "Active", joinDate: "2023-02-14", salary: 22000, avatar: "DR" },
  { id: 6, name: "Anita Shah", email: "anita@managency.com", phone: "9876543215", role: "Site Engineer", department: "Engineering", project: "Green Valley Residency", status: "Active", joinDate: "2022-09-01", salary: 46000, avatar: "AS" },
  { id: 7, name: "Vikram Singh", email: "vikram@managency.com", phone: "9876543216", role: "Vendor", department: "Procurement", project: "NH-48 Highway Widening", status: "Inactive", joinDate: "2023-04-10", salary: 35000, avatar: "VS" },
  { id: 8, name: "Kavita Nair", email: "kavita@managency.com", phone: "9876543217", role: "Project Manager", department: "Operations", project: "Central Mall Expansion", status: "Active", joinDate: "2021-07-22", salary: 63000, avatar: "KN" },
  { id: 9, name: "Amit Verma", email: "amit@managency.com", phone: "9876543218", role: "Worker", department: "Construction", project: "Techpark Phase 3", status: "Active", joinDate: "2023-08-15", salary: 20000, avatar: "AV" },
  { id: 10, name: "Ravi Gupta", email: "ravi@managency.com", phone: "9876543219", role: "Accountant", department: "Finance", project: "All Projects", status: "Inactive", joinDate: "2022-03-30", salary: 50000, avatar: "RG" },
  { id: 11, name: "Sunita Mehta", email: "sunita@managency.com", phone: "9876543220", role: "Admin", department: "Management", project: "All Projects", status: "Active", joinDate: "2020-12-01", salary: 80000, avatar: "SM" },
  { id: 12, name: "Harish Pandey", email: "harish@managency.com", phone: "9876543221", role: "Vendor", department: "Procurement", project: "Solar Farm Grid", status: "Active", joinDate: "2023-01-18", salary: 32000, avatar: "HP" },
];

const ROLES = ["Admin", "Project Manager", "Site Engineer", "Worker", "Accountant", "Vendor"];
const DEPARTMENTS = ["Management", "Operations", "Engineering", "Finance", "Construction", "Procurement"];
const PROJECTS = ["All Projects", "Skyline Tower Phase 2", "Green Valley Residency", "Riverside Bridge Project", "Metro Rail Depot", "Central Mall Expansion", "NH-48 Highway Widening", "Techpark Phase 3", "Solar Farm Grid"];

const ROLE_STYLES = {
  "Admin":           { badge: "bg-purple-100 text-purple-700", dot: "bg-purple-500", avatar: "bg-purple-500" },
  "Project Manager": { badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-500",   avatar: "bg-blue-500" },
  "Site Engineer":   { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", avatar: "bg-emerald-500" },
  "Worker":          { badge: "bg-amber-100 text-amber-700",   dot: "bg-amber-500",  avatar: "bg-amber-500" },
  "Accountant":      { badge: "bg-teal-100 text-teal-700",     dot: "bg-teal-500",   avatar: "bg-teal-500" },
  "Vendor":          { badge: "bg-rose-100 text-rose-700",     dot: "bg-rose-500",   avatar: "bg-rose-500" },
};

const STATUS_STYLES = {
  Active:   "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  Inactive: "bg-gray-100 text-gray-500 ring-gray-400/20",
};

// ─────────────────────────────────────────
// Add / Edit Modal
// ─────────────────────────────────────────
const DEFAULT_FORM = {
  name: "", email: "", phone: "", role: "Worker",
  department: "Construction", project: "All Projects",
  status: "Active", joinDate: "", salary: "",
};

function EmployeeModal({ open, onClose, onSave, editData }) {
  const [form, setForm] = useState(editData || DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  // Sync when editData changes
  useState(() => { if (editData) setForm(editData); }, [editData]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.joinDate)     e.joinDate = "Join date is required";
    if (!form.salary || isNaN(form.salary)) e.salary = "Valid salary is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({
      ...form,
      salary: Number(form.salary),
      avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      id: editData?.id || Date.now(),
    });
    setForm(DEFAULT_FORM);
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">{editData ? "Edit Employee" : "Add Employee"}</h2>
            <p className="text-emerald-100 text-sm">{editData ? "Update employee details" : "Add a new team member"}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
            <input type="text" placeholder="e.g. Rajesh Kumar" className={inputCls("name")} {...field("name")} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" placeholder="email@company.com" className={inputCls("email")} {...field("email")} />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone</label>
              <input type="tel" placeholder="9876543210" className={inputCls("phone")} {...field("phone")} />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Role</label>
              <select className={inputCls("role")} {...field("role")}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Department</label>
              <select className={inputCls("department")} {...field("department")}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Assigned Project</label>
            <select className={inputCls("project")} {...field("project")}>
              {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Status</label>
              <select className={inputCls("status")} {...field("status")}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Salary (₹)</label>
              <input type="number" placeholder="e.g. 45000" className={inputCls("salary")} {...field("salary")} />
              {errors.salary && <p className="text-xs text-rose-500 mt-1">{errors.salary}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Join Date</label>
            <input type="date" className={inputCls("joinDate")} {...field("joinDate")} />
            {errors.joinDate && <p className="text-xs text-rose-500 mt-1">{errors.joinDate}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition">
            {editData ? "Save Changes" : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────
export default function TeamManagement() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (emp) => {
    if (editData) {
      setEmployees((prev) => prev.map((e) => e.id === emp.id ? emp : e));
      showToast("Employee updated successfully!");
    } else {
      setEmployees((prev) => [emp, ...prev]);
      showToast("Employee added successfully!");
    }
    setEditData(null);
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast("Employee removed!", "info");
  };

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.project.toLowerCase().includes(search.toLowerCase());
      const matchRole   = roleFilter === "All"   || e.role === roleFilter;
      const matchDept   = deptFilter === "All"   || e.department === deptFilter;
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      return matchSearch && matchRole && matchDept && matchStatus;
    });
  }, [employees, search, roleFilter, deptFilter, statusFilter]);

  // Stats
  const stats = {
    total:    employees.length,
    active:   employees.filter((e) => e.status === "Active").length,
    inactive: employees.filter((e) => e.status === "Inactive").length,
    byRole:   ROLES.reduce((acc, r) => ({ ...acc, [r]: employees.filter((e) => e.role === r).length }), {}),
  };

  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

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
          onClick={() => { setEditData(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Total Team</span>
            <span className="text-xl">👥</span>
          </div>
          <p className="text-4xl font-black text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Active</span>
            <span className="text-xl">✅</span>
          </div>
          <p className="text-4xl font-black text-emerald-700">{stats.active}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Inactive</span>
            <span className="text-xl">💤</span>
          </div>
          <p className="text-4xl font-black text-gray-500">{stats.inactive}</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-5 shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Departments</span>
            <span className="text-xl">🏢</span>
          </div>
          <p className="text-4xl font-black text-purple-700">{DEPARTMENTS.length}</p>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Team by Role</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROLES.map((role) => {
            const style = ROLE_STYLES[role];
            return (
              <div key={role} className={`rounded-xl p-3 text-center ${style.badge} bg-opacity-60`}>
                <p className="text-2xl font-black">{stats.byRole[role] || 0}</p>
                <p className="text-xs font-semibold mt-0.5 leading-tight">{role}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search name, email, project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <option value="All">All Roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="text-sm text-gray-400 font-medium self-center shrink-0">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Employee", "Role", "Department", "Project", "Salary", "Status", "Join Date", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((emp, i) => {
                const roleStyle = ROLE_STYLES[emp.role];
                return (
                  <tr key={emp.id} className={`hover:bg-gray-50/70 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    {/* Employee */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${roleStyle.avatar} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleStyle.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${roleStyle.dot}`} />
                        {emp.role}
                      </span>
                    </td>
                    {/* Department */}
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{emp.department}</td>
                    {/* Project */}
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap max-w-[160px] truncate">{emp.project}</td>
                    {/* Salary */}
                    <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{fmt(emp.salary)}</td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[emp.status]}`}>
                        {emp.status}
                      </span>
                    </td>
                    {/* Join Date */}
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(emp.joinDate).toLocaleDateString("en-IN")}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(emp)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(emp.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="font-medium">No employees found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <EmployeeModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}