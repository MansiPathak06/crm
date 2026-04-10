"use client";
import { useState, useMemo } from "react";
// NEW (shared components folder)
import OverviewCards from "../components/OverviewCards";
import ProjectTable from "../components/ProjectTable";
import AddProjectModal from "../components/AddProjectModal";
import Filters from "../components/Filters";
import RecentActivity from "../components/RecentActivity";
const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "Skyline Tower Phase 2",
    location: "Mumbai, MH",
    status: "Ongoing",
    budget: "₹2,40,00,000",
    startDate: "Jan 10, 2024",
    endDate: "Dec 30, 2024",
    progress: 68,
  },
  {
    id: 2,
    name: "Green Valley Residency",
    location: "Pune, MH",
    status: "Ongoing",
    budget: "₹72,00,000",
    startDate: "Mar 1, 2024",
    endDate: "Feb 28, 2025",
    progress: 41,
  },
  {
    id: 3,
    name: "Riverside Bridge Project",
    location: "Nashik, MH",
    status: "Delayed",
    budget: "₹1,80,00,000",
    startDate: "Nov 5, 2023",
    endDate: "Aug 31, 2024",
    progress: 29,
  },
  {
    id: 4,
    name: "Metro Rail Depot",
    location: "Nagpur, MH",
    status: "Ongoing",
    budget: "₹5,60,00,000",
    startDate: "Feb 15, 2024",
    endDate: "Jan 15, 2026",
    progress: 55,
  },
  {
    id: 5,
    name: "Corporate Hub Annex",
    location: "Hyderabad, TS",
    status: "Completed",
    budget: "₹95,00,000",
    startDate: "Apr 1, 2023",
    endDate: "Mar 31, 2024",
    progress: 100,
  },
  {
    id: 6,
    name: "Central Mall Expansion",
    location: "Bengaluru, KA",
    status: "Ongoing",
    budget: "₹3,20,00,000",
    startDate: "Jun 1, 2024",
    endDate: "May 31, 2025",
    progress: 78,
  },
  {
    id: 7,
    name: "NH-48 Highway Widening",
    location: "Delhi–Gurugram",
    status: "Delayed",
    budget: "₹8,50,00,000",
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    progress: 47,
  },
  {
    id: 8,
    name: "Lakeview Villas",
    location: "Udaipur, RJ",
    status: "Completed",
    budget: "₹1,10,00,000",
    startDate: "Sep 1, 2022",
    endDate: "Aug 31, 2023",
    progress: 100,
  },
  {
    id: 9,
    name: "Techpark Phase 3",
    location: "Chennai, TN",
    status: "Ongoing",
    budget: "₹4,15,00,000",
    startDate: "Jul 15, 2024",
    endDate: "Jun 30, 2026",
    progress: 22,
  },
  {
    id: 10,
    name: "Old Town Heritage Restoration",
    location: "Jaipur, RJ",
    status: "Delayed",
    budget: "₹60,00,000",
    startDate: "Mar 1, 2023",
    endDate: "Feb 28, 2024",
    progress: 34,
  },
  {
    id: 11,
    name: "Solar Farm Grid",
    location: "Rajkot, GJ",
    status: "Completed",
    budget: "₹2,00,00,000",
    startDate: "Jan 1, 2022",
    endDate: "Dec 31, 2022",
    progress: 100,
  },
];

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || p.status === filter;
      return matchSearch && matchFilter;
    });
  }, [projects, search, filter]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast("Project created successfully!");
  };

  const handleView = (p) => showToast(`Viewing: ${p.name}`, "info");
  const handleEdit = (p) => showToast(`Edit opened for: ${p.name}`, "info");

  return (
    <div className="min-h-screen bg-gray-50/70 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"
          }`}
        >
          {toast.type === "success" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
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
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 self-start sm:self-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Add New Project
          </button>
        </div>

        {/* Overview Cards */}
        <OverviewCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Projects Section — 3/4 width on xl */}
          <div className="xl:col-span-3 space-y-4">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 max-w-lg">
                <Filters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
              </div>
              <div className="text-sm text-gray-400 font-medium shrink-0">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
              </div>
            </div>

            {/* Project Table / Cards */}
            <ProjectTable projects={filteredProjects} onView={handleView} onEdit={handleEdit} />
          </div>

          {/* Recent Activity — 1/4 width on xl */}
          <div className="xl:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}