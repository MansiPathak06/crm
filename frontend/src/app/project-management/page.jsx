"use client";
import { useState, useMemo, useEffect } from "react";
import OverviewCards    from "../components/OverviewCards";
import ProjectTable     from "../components/ProjectTable";
import AddProjectModal  from "../components/AddProjectModal";
import Filters          from "../components/Filters";
import RecentActivity   from "../components/RecentActivity";

const API_BASE = "http://localhost:5000/api/projects";

export default function ProjectManagementPage() {
  const [projects,   setProjects]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("All");
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editData,   setEditData]   = useState(null);
  const [toast,      setToast]      = useState(null);

  // ── Fetch all projects on mount ─────────
  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res  = await fetch(API_BASE);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load projects. Is the server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Filter ──────────────────────────────
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || p.status === filter;
      return matchSearch && matchFilter;
    });
  }, [projects, search, filter]);

  // ── Add or Edit ─────────────────────────
  const handleAdd = async (formData) => {
    try {
      const isEdit = !!editData;
      const url    = isEdit ? `${API_BASE}/${editData.id}` : API_BASE;
      const method = isEdit ? "PUT" : "POST";
       console.log("Sending to backend:", url, method, formData);

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
       console.log("Backend response:", res.status, data); 

      if (!res.ok) { showToast(data.error || "Failed to save project", "error"); return; }

     console.log("Response status:", res.status);
console.log("Response data:", data);

if (isEdit) {
  setProjects((prev) => prev.map((p) => p.id === data.id ? data : p));
  showToast("Project updated successfully!");
} else {
  setProjects((prev) => [data, ...prev]);
  showToast("Project created successfully!");
}

      setEditData(null);
      setModalOpen(false);
    } catch {
      showToast("Network error. Check your backend server.", "error");
    }
  };

  // ── Delete ──────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) { showToast("Failed to delete project", "error"); return; }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted!", "info");
    } catch {
      showToast("Network error.", "error");
    }
  };

  const handleEdit = (p) => { setEditData(p); setModalOpen(true); };
  const handleView = (p) => showToast(`Viewing: ${p.name}`, "info");

  return (
    <div className="min-h-screen bg-gray-50/70 font-sans">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-blue-500"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-600 rounded-xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
                  <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
                  <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
                </svg>
              </span>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Project Management</h1>
            </div>
            <p className="text-sm text-gray-500 ml-10">Oversee all your ongoing and upcoming construction projects</p>
          </div>
          <button
            onClick={() => { setEditData(null); setModalOpen(true); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 self-start sm:self-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Add New Project
          </button>
        </div>

        {/* Overview Cards — computed from live data */}
        <OverviewCards projects={projects} />

        {/* Main Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse text-sm">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 max-w-lg">
                  <Filters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
                </div>
                <div className="text-sm text-gray-400 font-medium shrink-0">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
                </div>
              </div>
              <ProjectTable projects={filteredProjects} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <div className="xl:col-span-1">
             <RecentActivity activities={yourActivitiesArray} />
            </div>
          </div>
        )}
      </div>

      <AddProjectModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onAdd={handleAdd}
        editData={editData}
      />
    </div>
  );
}