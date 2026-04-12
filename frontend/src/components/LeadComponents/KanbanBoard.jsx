"use client";
import { useState, useRef } from "react";
import { STATUS_CONFIG, SOURCE_ICONS } from "../LeadData";
import StatusBadge from "./StatusBadge";

const COLUMN_ORDER = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

const colHeaderClass = {
  New:       "bg-blue-500",
  Contacted: "bg-yellow-500",
  Qualified: "bg-purple-500",
  Proposal:  "bg-orange-500",
  Won:       "bg-green-500",
  Lost:      "bg-red-400",
};

function LeadCard({ lead, onSelect, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(lead)}
      onClick={() => onSelect(lead)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{lead.name}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{lead.company}</p>
        </div>
        <span className="text-sm">{SOURCE_ICONS[lead.source]}</span>
      </div>
      <p className="text-[10px] text-gray-500 mb-2 truncate">{lead.email}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-green-600">₹{(lead.value / 1000).toFixed(0)}k</span>
        <span className="text-[10px] text-gray-400">{lead.assigned.split(" ")[0]}</span>
      </div>
    </div>
  );
}

// KEY CHANGE: replaced setLeads prop with onStatusChange(id, newStatus)
export default function KanbanBoard({ leads, onStatusChange, onSelect }) {
  const dragLead = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const grouped = COLUMN_ORDER.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s);
    return acc;
  }, {});

  const handleDrop = (status) => {
    if (dragLead.current && dragLead.current.status !== status) {
      onStatusChange(dragLead.current.id, status);  // ← API call via parent
    }
    setDragOver(null);
    dragLead.current = null;
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: "60vh" }}>
      {COLUMN_ORDER.map(col => {
        const cfg      = STATUS_CONFIG[col];
        const colLeads = grouped[col] || [];
        const total    = colLeads.reduce((s, l) => s + l.value, 0);
        return (
          <div
            key={col}
            onDragOver={e => { e.preventDefault(); setDragOver(col); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(col)}
            className={`flex-shrink-0 w-56 flex flex-col rounded-2xl transition-all duration-150 ${dragOver === col ? "ring-2 ring-green-400 ring-offset-1" : ""}`}
          >
            <div className={`${colHeaderClass[col]} rounded-t-2xl px-3 py-2.5 flex items-center justify-between`}>
              <span className="text-white text-xs font-bold">{col}</span>
              <span className="bg-white/30 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{colLeads.length}</span>
            </div>
            <div className={`${cfg.bg} px-3 py-1.5 flex items-center justify-between border-x border-white/50`}>
              <span className={`text-[10px] font-semibold ${cfg.text}`}>₹{(total / 1000).toFixed(0)}k pipeline</span>
            </div>
            <div className={`flex-1 ${cfg.bg} border border-t-0 ${cfg.border} rounded-b-2xl p-2 flex flex-col gap-2 min-h-[200px]`}>
              {colLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onSelect={onSelect} onDragStart={l => { dragLead.current = l; }} />
              ))}
              {colLeads.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[10px] text-gray-400 text-center">Drop leads here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}