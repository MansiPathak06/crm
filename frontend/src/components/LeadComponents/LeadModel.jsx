"use client";
import { useState, useEffect } from "react";
import { STATUSES, SOURCES } from "../LeadData";
// remove USERS from import

const empty = { name: "", email: "", phone: "", company: "", source: "Website", status: "New", assigned: "Aarav Shah", notes: "", value: "" };

export default function LeadModal({ isOpen, onClose, onSave, initial, assignees }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ ...initial, value: initial.value ? String(initial.value) : "" });
    else setForm(empty);
    setErrors({});
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.company.trim()) e.company = "Company is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, value: Number(form.value) || 0 });
    onClose();
  };

  const inputClass = (k) => `w-full h-9 px-3 rounded-xl border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${errors[k] ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`;
  const label = (text, k) => (
    <div>
      <label className="block text-[11px] font-semibold text-gray-600 mb-1">{text}{["name","email","company"].includes(k) && <span className="text-red-400 ml-0.5">*</span>}</label>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">{initial ? "Edit Lead" : "Add New Lead"}</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{initial ? "Update lead information" : "Fill in the details below"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="px-6 py-4 flex flex-col gap-4">
          {/* Name + Company */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              {label("Full Name", "name")}
              <input className={inputClass("name")} placeholder="Arjun Kapoor" value={form.name} onChange={e => set("name", e.target.value)} />
              {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
            </div>
            <div>
              {label("Company", "company")}
              <input className={inputClass("company")} placeholder="TechSpark Pvt Ltd" value={form.company} onChange={e => set("company", e.target.value)} />
              {errors.company && <p className="text-[10px] text-red-500 mt-0.5">{errors.company}</p>}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              {label("Email", "email")}
              <input className={inputClass("email")} type="email" placeholder="arjun@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
              {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
            </div>
            <div>
              {label("Phone", "phone")}
              <input className={inputClass("phone")} placeholder="+91 98200 00000" value={form.phone} onChange={e => set("phone", e.target.value)} />
            </div>
          </div>

          {/* Source + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              {label("Source", "source")}
              <select className={inputClass("source")} value={form.source} onChange={e => set("source", e.target.value)}>
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              {label("Status", "status")}
              <select className={inputClass("status")} value={form.status} onChange={e => set("status", e.target.value)}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Assign + Value */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              {label("Assign To", "assigned")}
              <select className={inputClass("assigned")} value={form.assigned} onChange={e => set("assigned", e.target.value)}>
               {assignees.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              {label("Deal Value (₹)", "value")}
              <input className={inputClass("value")} type="number" placeholder="100000" value={form.value} onChange={e => set("value", e.target.value)} />
            </div>
          </div>

          {/* Notes */}
          <div>
            {label("Notes", "notes")}
            <textarea className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none transition-colors" rows={3} placeholder="Additional notes about this lead..." value={form.notes} onChange={e => set("notes", e.target.value)} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 h-9 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="px-5 h-9 rounded-xl bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-green-200 transition-all duration-150">
            {initial ? "Save Changes" : "Add Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}