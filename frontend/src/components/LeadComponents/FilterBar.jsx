"use client";
import { STATUSES, SOURCES, USERS } from "../LeadData";

export default function FilterBar({ filters, setFilters, onAddLead, view, setView }) {
  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const selectClass = "h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-gray-300 transition-colors cursor-pointer shadow-sm";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={e => set("search", e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-xl border border-gray-200 bg-white text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        />
      </div>

      {/* Status */}
      <select className={selectClass} value={filters.status} onChange={e => set("status", e.target.value)}>
        <option value="">All Status</option>
        {STATUSES.map(s => <option key={s}>{s}</option>)}
      </select>

      {/* Source */}
      <select className={selectClass} value={filters.source} onChange={e => set("source", e.target.value)}>
        <option value="">All Sources</option>
        {SOURCES.map(s => <option key={s}>{s}</option>)}
      </select>

      {/* Assigned */}
      <select className={selectClass} value={filters.assigned} onChange={e => set("assigned", e.target.value)}>
        <option value="">All Agents</option>
        {USERS.map(u => <option key={u}>{u}</option>)}
      </select>

      {/* Date from */}
      <input type="date" className={selectClass} value={filters.dateFrom} onChange={e => set("dateFrom", e.target.value)} />

      {/* View toggle */}
      <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-1 ml-auto">
        {[
          { id: "table",  icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18"/></svg> },
          { id: "kanban", icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"/></svg> },
        ].map(v => (
          <button key={v.id} onClick={() => setView(v.id)}
            className={`p-2 rounded-lg transition-all duration-150 ${view === v.id ? "bg-white text-green-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
            {v.icon}
          </button>
        ))}
      </div>

      {/* Add Lead */}
      <button onClick={onAddLead}
        className="flex items-center gap-1.5 px-4 h-9 rounded-xl bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-green-200 transition-all duration-150">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add Lead
      </button>
    </div>
  );
}