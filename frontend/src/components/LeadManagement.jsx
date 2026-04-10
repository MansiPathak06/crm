"use client";
import { useState, useMemo } from "react";
import { INITIAL_LEADS } from "./LeadData";
import SummaryCards from "./LeadComponents/SummaryCard";
import FilterBar    from "./LeadComponents/FilterBar";
import LeadsTable   from "./LeadComponents/LeadsTable";
import KanbanBoard  from "./LeadComponents/KanbanBoard";
import LeadModal    from "./LeadComponents/LeadModel";
import LeadDrawer   from "./LeadComponents/LeadDrawer";
import StatusBadge  from "./LeadComponents/StatusBadge";

const defaultFilters = { search: "", status: "", source: "", assigned: "", dateFrom: "" };
let nextId = INITIAL_LEADS.length + 1;

export default function LeadManagement() {
  const [leads,    setLeads]    = useState(INITIAL_LEADS);
  const [filters,  setFilters]  = useState(defaultFilters);
  const [view,     setView]     = useState("table");   // "table" | "kanban"
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);      // lead being edited
  const [selected, setSelected] = useState(null);      // lead in drawer

  // ── Filtering ──────────────────────────────────────────────────────────────
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

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleSave = (form) => {
    if (editing) {
      setLeads(ls => ls.map(l => l.id === editing.id ? { ...l, ...form } : l));
      if (selected?.id === editing.id) setSelected(prev => ({ ...prev, ...form }));
    } else {
      const lead = { ...form, id: nextId++, date: new Date().toISOString().slice(0, 10) };
      setLeads(ls => [lead, ...ls]);
    }
    setEditing(null);
    setModal(false);
  };

  const handleEdit = (lead) => { setEditing(lead); setModal(true); if (selected) setSelected(null); };
  const handleDelete = (id)  => { setLeads(ls => ls.filter(l => l.id !== id)); if (selected?.id === id) setSelected(null); };
  const handleAdd = ()       => { setEditing(null); setModal(true); };

  return (
    <div className="w-full font-sans">
      {/* ── Page title bar ── */}
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

      {/* ── Summary cards ── */}
      <SummaryCards leads={leads} />

      {/* ── Filters + view toggle + add button ── */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onAddLead={handleAdd}
        view={view}
        setView={setView}
      />

      {/* ── Main content ── */}
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
          setLeads={setLeads}
          onSelect={setSelected}
        />
      )}

      {/* ── Add/Edit Modal ── */}
      <LeadModal
        isOpen={modal}
        onClose={() => { setModal(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />

      {/* ── Details Drawer ── */}
      <LeadDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onEdit={handleEdit}
      />
    </div>
  );
}