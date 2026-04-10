"use client";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { SOURCE_ICONS, ACTIVITY_FEED, STATUSES } from "../LeadData";

const ACTIVITY_ICONS = {
  call:    { icon: "📞", color: "bg-blue-100 text-blue-600" },
  email:   { icon: "📧", color: "bg-purple-100 text-purple-600" },
  meeting: { icon: "🤝", color: "bg-green-100 text-green-600" },
  note:    { icon: "📝", color: "bg-yellow-100 text-yellow-600" },
  status:  { icon: "🔄", color: "bg-orange-100 text-orange-600" },
};

const TASKS = [
  { task: "Send follow-up email", due: "Tomorrow",    done: false },
  { task: "Schedule demo call",   due: "In 3 days",   done: false },
  { task: "Share proposal PDF",   due: "Last week",   done: true  },
];

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function LeadDrawer({ lead, onClose, onEdit }) {
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState(TASKS);

  if (!lead) return null;

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[420px] bg-white shadow-2xl flex flex-col overflow-hidden"
        style={{ borderRadius: "20px 0 0 20px" }}>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-bold text-gray-800 truncate">{lead.name}</h2>
              <StatusBadge status={lead.status} />
            </div>
            <p className="text-xs text-gray-500">{lead.company} · {SOURCE_ICONS[lead.source]} {lead.source}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button onClick={() => onEdit(lead)} className="p-2 rounded-xl hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: "Deal Value", value: `₹${(lead.value/1000).toFixed(0)}k`, icon: "💰", color: "bg-green-50 text-green-700" },
              { label: "Created",    value: formatDate(lead.date).split(" ").slice(0,2).join(" "), icon: "📅", color: "bg-blue-50 text-blue-700" },
              { label: "Agent",      value: lead.assigned.split(" ")[0], icon: "👤", color: "bg-purple-50 text-purple-700" },
            ].map(s => (
              <div key={s.label} className={`${s.color} rounded-xl p-2.5 text-center`}>
                <div className="text-lg mb-1">{s.icon}</div>
                <p className="text-[11px] font-bold">{s.value}</p>
                <p className="text-[9px] opacity-70">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <Section title="Contact Details">
            <div className="flex flex-col gap-2">
              {[
                { icon: "📧", label: "Email", val: lead.email, href: `mailto:${lead.email}` },
                { icon: "📞", label: "Phone", val: lead.phone, href: `tel:${lead.phone}` },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                  <span className="text-base">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400">{c.label}</p>
                    <a href={c.href} className="text-xs text-blue-500 hover:underline font-medium truncate block">{c.val}</a>
                  </div>
                  <div className="flex gap-1">
                    <a href={c.href} className="p-1.5 rounded-lg bg-white border border-gray-200 hover:border-green-300 hover:text-green-600 text-gray-400 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Notes */}
          <Section title="Notes">
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-2">
              <p className="text-xs text-gray-700">{lead.notes || "No notes yet."}</p>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 h-8 px-3 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Add a note..."
                value={note} onChange={e => setNote(e.target.value)}
              />
              <button onClick={() => setNote("")} disabled={!note.trim()} className="px-3 h-8 rounded-xl bg-green-500 text-white text-xs font-semibold disabled:opacity-40 hover:bg-green-600 transition-colors">
                Save
              </button>
            </div>
          </Section>

          {/* Tasks */}
          <Section title="Tasks">
            <div className="flex flex-col gap-2">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2">
                  <button onClick={() => setTasks(ts => ts.map((x, j) => j === i ? { ...x, done: !x.done } : x))}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${t.done ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                    {t.done && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>{t.task}</p>
                    <p className="text-[10px] text-gray-400">{t.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Activity Timeline */}
          <Section title="Activity Timeline">
            <div className="relative">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-100" />
              <div className="flex flex-col gap-3">
                {ACTIVITY_FEED.map((a, i) => {
                  const cfg = ACTIVITY_ICONS[a.type];
                  return (
                    <div key={i} className="flex items-start gap-3 pl-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] z-10 ${cfg.color}`}>{cfg.icon}</div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-xs font-medium text-gray-700">{a.label}</p>
                        <p className="text-[10px] text-gray-400">{a.user} · {a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
          <a href={`mailto:${lead.email}`} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <span>📧</span> Email
          </a>
          <a href={`tel:${lead.phone}`} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <span>📞</span> Call
          </a>
          <button onClick={() => onEdit(lead)} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            Edit Lead
          </button>
        </div>
      </div>
    </>
  );
}