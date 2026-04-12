"use client";
import { useState, useMemo, useEffect } from "react";
import SummaryCards from "./LeadComponents/SummaryCard";
import FilterBar    from "./LeadComponents/FilterBar";
import LeadsTable   from "./LeadComponents/LeadsTable";
import KanbanBoard  from "./LeadComponents/KanbanBoard";
import LeadModal    from "./LeadComponents/LeadModel";
import LeadDrawer   from "./LeadComponents/LeadDrawer";

const API_BASE = "http://localhost:5000/api/leads";

const defaultFilters = { search: "", status: "", source: "", assigned: "", dateFrom: "" };

export default function LeadManagement() {
  const [leads,    setLeads]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filters,  setFilters]  = useState(defaultFilters);
  const [view,     setView]     = useState("table");
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast,    setToast]    = useState(null);
  const [users, setUsers] = useState([]);

  // ── Fetch all leads on mount ────────────
  useEffect(() => { fetchLeads(); }, []);

  useEffect(() => {
  fetchLeads();
  fetchUsers();
}, []);
const fetchUsers = async () => {
  try {
    const res  = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    // Only active employees, extract names
    const names = data
      .filter(e => e.status === "Active")
      .map(e => e.name);
    setUsers(names);
  } catch {
    setUsers([]); // fallback to empty
  }
};

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res  = await fetch(API_BASE);
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load leads. Is the server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Filtering ───────────────────────────
  const filtered = useMemo(() => {
    return leads.filter(l => {
      const q = filters.search.toLowerCase();
      if (q && !l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q)) return false;
      if (filters.status   && l.status   !== filters.status)   return false;
      if (filters.source   && l.source   !== filters.source)   return false;
      if (filters.assigned && l.assigned !== filters.assigned) return false;
      if (filters.dateFrom && new Date(l.date) < new Date(filters.dateFrom)) return false;
      return true;
    });
  }, [leads, filters]);

  // ── Save (create or update) ─────────────
  const handleSave = async (form) => {
    try {
      const isEdit = !!editing;
      const url    = isEdit ? `${API_BASE}/${editing.id}` : API_BASE;
      const method = isEdit ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) { showToast(data.error || "Failed to save lead", "error"); return; }

      if (isEdit) {
        setLeads(ls => ls.map(l => l.id === data.id ? data : l));
        if (selected?.id === data.id) setSelected(data);
        showToast("Lead updated successfully!");
      } else {
        setLeads(ls => [data, ...ls]);
        showToast("Lead added successfully!");
      }

      setEditing(null);
      setModal(false);
    } catch {
      showToast("Network error. Check your backend server.", "error");
    }
  };

  // ── Delete ──────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) { showToast("Failed to delete lead", "error"); return; }
      setLeads(ls => ls.filter(l => l.id !== id));
      if (selected?.id === id) setSelected(null);
      showToast("Lead removed!", "info");
    } catch {
      showToast("Network error.", "error");
    }
  };

  // ── Kanban drag-drop status change ──────
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res  = await fetch(`${API_BASE}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) { showToast("Failed to update status", "error"); return; }
      setLeads(ls => ls.map(l => l.id === id ? data : l));
    } catch {
      showToast("Network error.", "error");
    }
  };

  const handleEdit   = (lead) => { setEditing(lead); setModal(true); if (selected) setSelected(null); };
  const handleAdd    = ()     => { setEditing(null); setModal(true); };

  return (
    <div className="w-full font-sans">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-blue-500"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Page title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-800 leading-tight">Lead Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track, manage and convert your leads efficiently.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
            {filtered.length} / {leads.length} leads
          </span>
          {Object.values(filters).some(Boolean) && (
            <button onClick={() => setFilters(defaultFilters)} className="text-xs text-red-500 bg-red-50 rounded-full px-3 py-1 hover:bg-red-100 transition-colors">
              Clear filters ×
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse text-sm">Loading leads...</div>
      ) : (
        <>
          <SummaryCards leads={leads} />

          <FilterBar
            filters={filters}
            setFilters={setFilters}
            onAddLead={handleAdd}
            view={view}
            setView={setView}
            assignees={users}
          />

          {view === "table" ? (
            <LeadsTable
              leads={filtered}
              onSelect={setSelected}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <KanbanBoard
              leads={filtered}
              onStatusChange={handleStatusChange}
              onSelect={setSelected}
            />
          )}
        </>
      )}

      <LeadModal
        isOpen={modal}
        onClose={() => { setModal(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        assignees={users}
      />

      <LeadDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onEdit={handleEdit}
      />
    </div>
  );
}