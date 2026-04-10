"use client";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { SOURCE_ICONS } from "../LeadData";

function Avatar({ name }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-orange-100 text-orange-700", "bg-pink-100 text-pink-700"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${color} mr-1.5 flex-shrink-0`}>{initials}</span>
  );
}

const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const formatValue = (v) => `₹${(v / 1000).toFixed(0)}k`;

export default function LeadsTable({ leads, onSelect, onEdit, onDelete }) {
  const [sort, setSort] = useState({ col: "date", dir: "desc" });

  const toggle = (col) => setSort(s => ({ col, dir: s.col === col && s.dir === "asc" ? "desc" : "asc" }));

  const sorted = [...leads].sort((a, b) => {
    let av = a[sort.col], bv = b[sort.col];
    if (sort.col === "date") { av = new Date(av); bv = new Date(bv); }
    if (av < bv) return sort.dir === "asc" ? -1 : 1;
    if (av > bv) return sort.dir === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => (
    <svg className={`w-3 h-3 ml-1 inline ${sort.col === col ? "text-green-500" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sort.col === col && sort.dir === "desc" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
    </svg>
  );

  const th = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap cursor-pointer hover:text-gray-700 select-none";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className={th} onClick={() => toggle("name")}>Lead Name <SortIcon col="name" /></th>
              <th className={th} onClick={() => toggle("company")}>Company <SortIcon col="company" /></th>
              <th className={th}>Contact</th>
              <th className={th} onClick={() => toggle("source")}>Source <SortIcon col="source" /></th>
              <th className={th} onClick={() => toggle("status")}>Status <SortIcon col="status" /></th>
              <th className={th} onClick={() => toggle("value")}>Value <SortIcon col="value" /></th>
              <th className={th} onClick={() => toggle("assigned")}>Assigned <SortIcon col="assigned" /></th>
              <th className={th} onClick={() => toggle("date")}>Date <SortIcon col="date" /></th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr><td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No leads found</td></tr>
            )}
            {sorted.map((lead, i) => (
              <tr key={lead.id}
                onClick={() => onSelect(lead)}
                className="border-b border-gray-50 hover:bg-green-50/40 transition-colors duration-100 cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={lead.name} />
                    <span className="font-medium text-gray-800 text-xs group-hover:text-green-700 transition-colors">{lead.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{lead.company}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="text-[11px] text-blue-500 hover:underline">{lead.email}</a>
                    <span className="text-[11px] text-gray-400">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[11px] text-gray-600 flex items-center gap-1">
                    <span>{SOURCE_ICONS[lead.source]}</span> {lead.source}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                <td className="px-4 py-3 text-xs font-semibold text-gray-700">{formatValue(lead.value)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-[11px] text-gray-600">
                    <Avatar name={lead.assigned} />{lead.assigned.split(" ")[0]}
                  </div>
                </td>
                <td className="px-4 py-3 text-[11px] text-gray-500 whitespace-nowrap">{formatDate(lead.date)}</td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button onClick={() => onSelect(lead)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                    <button onClick={() => onEdit(lead)} className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </button>
                    <button onClick={() => onDelete(lead.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">Showing <span className="font-semibold text-gray-600">{sorted.length}</span> leads</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>Total pipeline value:</span>
          <span className="font-bold text-green-600">₹{(sorted.reduce((s, l) => s + l.value, 0) / 100000).toFixed(1)}L</span>
        </div>
      </div>
    </div>
  );
}