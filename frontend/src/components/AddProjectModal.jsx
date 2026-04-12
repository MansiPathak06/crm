"use client";
import { useState, useEffect } from "react";

const defaultForm = {
  name: "", location: "", budget: "", startDate: "", endDate: "", status: "Ongoing", progress: 0,
};

export default function AddProjectModal({ open, onClose, onAdd, editData }) {
  const [form,   setForm]   = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        name:      editData.name      || "",
        location:  editData.location  || "",
        budget:    editData.budgetRaw ? String(editData.budgetRaw) : "",
        startDate: editData.startDateRaw || "",
        endDate:   editData.endDateRaw   || "",
        status:    editData.status    || "Ongoing",
        progress:  editData.progress  ?? 0,
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editData, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name      = "Project name is required";
    if (!form.location.trim()) e.location  = "Location is required";
    if (!form.budget)          e.budget    = "Budget is required";
    if (!form.startDate)       e.startDate = "Start date is required";
    if (!form.endDate)         e.endDate   = "End date is required";
    return e;
  };

const handleSubmit = () => {
  const e = validate();
  if (Object.keys(e).length) { setErrors(e); return; }
  onAdd({
    name:      form.name,
    location:  form.location,
    budget:    Number(form.budget),
    startDate: form.startDate,
    endDate:   form.endDate,
    status:    form.status,
    progress:  Number(form.progress) || 0,
  });
  onClose(); // ← only this line added
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
              <h2 className="text-white font-bold text-lg">{editData ? "Edit Project" : "New Project"}</h2>
              <p className="text-emerald-100 text-sm">{editData ? "Update project details" : "Fill in the details to create a project"}</p>
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
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Project Name</label>
            <input type="text" placeholder="e.g. Skyline Tower Phase 2" className={inputCls("name")} {...field("name")} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Location</label>
            <input type="text" placeholder="e.g. Mumbai, Maharashtra" className={inputCls("location")} {...field("location")} />
            {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Budget (₹)</label>
            <input type="number" placeholder="e.g. 5000000" className={inputCls("budget")} {...field("budget")} />
            {errors.budget && <p className="text-xs text-rose-500 mt-1">{errors.budget}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Status</label>
              <select className={inputCls("status")} {...field("status")}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Progress (%)</label>
              <input type="number" min="0" max="100" placeholder="0" className={inputCls("progress")} {...field("progress")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Start Date</label>
              <input type="date" className={inputCls("startDate")} {...field("startDate")} />
              {errors.startDate && <p className="text-xs text-rose-500 mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">End Date</label>
              <input type="date" className={inputCls("endDate")} {...field("endDate")} />
              {errors.endDate && <p className="text-xs text-rose-500 mt-1">{errors.endDate}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition">
            {editData ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}