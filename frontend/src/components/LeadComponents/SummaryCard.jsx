"use client";
import { useMemo } from "react";
import { INITIAL_LEADS } from "../LeadData";

const cards = (leads) => {
  const total      = leads.length;
  const newLeads   = leads.filter(l => l.status === "New").length;
  const converted  = leads.filter(l => l.status === "Won").length;
  const lost       = leads.filter(l => l.status === "Lost").length;
  const rate       = total ? ((converted / total) * 100).toFixed(1) : 0;
  return [
    { label: "Total Leads",      value: total,      icon: "👥", color: "from-slate-50 to-slate-100", accent: "text-slate-700", tag: "+12% this month", tagColor: "text-green-600 bg-green-50" },
    { label: "New This Week",    value: newLeads,   icon: "✨", color: "from-blue-50 to-blue-100",   accent: "text-blue-700",  tag: "Since Monday",     tagColor: "text-blue-600 bg-blue-50"  },
    { label: "Converted",        value: converted,  icon: "🏆", color: "from-green-50 to-green-100", accent: "text-green-700", tag: "All time wins",    tagColor: "text-green-600 bg-green-50"},
    { label: "Lost Leads",       value: lost,       icon: "❌", color: "from-red-50 to-red-100",     accent: "text-red-700",   tag: "Review needed",    tagColor: "text-red-600 bg-red-50"   },
    { label: "Conversion Rate",  value: `${rate}%`, icon: "📈", color: "from-orange-50 to-orange-100",accent:"text-orange-700",tag: "vs 18% last mo",   tagColor: "text-orange-600 bg-orange-50"},
  ];
};

export default function SummaryCards({ leads }) {
  const data = useMemo(() => cards(leads), [leads]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {data.map((c) => (
        <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-2xl p-4 border border-white/80 shadow-sm hover:shadow-md transition-all duration-200 group cursor-default`}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">{c.icon}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tagColor}`}>{c.tag}</span>
          </div>
          <p className={`text-3xl font-bold ${c.accent} leading-none mb-1 group-hover:scale-105 transition-transform duration-200`}>{c.value}</p>
          <p className="text-xs text-gray-500 font-medium">{c.label}</p>
        </div>
      ))}
    </div>
  );
}