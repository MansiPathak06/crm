"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Overview";
import Profile from "@/components/Profile";

<<<<<<< HEAD
// ── Lead Management ──
import LeadManagement from "@/components/LeadManagement";

=======
>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
// ── Project Management components ──
import OverviewCards from "@/components/OverviewCards";
import ProjectTable from "@/components/ProjectTable";
import AddProjectModal from "@/components/AddProjectModal";
import Filters from "@/components/Filters";
import RecentActivity from "@/components/RecentActivity";

<<<<<<< HEAD
// ─────────────────────────────────────────
// Project Management Data
// ─────────────────────────────────────────
const INITIAL_PROJECTS = [
  { id: 1,  name: "Skyline Tower Phase 2",        location: "Mumbai, MH",      status: "Ongoing",   budget: "₹2,40,00,000", startDate: "Jan 10, 2024", endDate: "Dec 30, 2024", progress: 68  },
  { id: 2,  name: "Green Valley Residency",        location: "Pune, MH",        status: "Ongoing",   budget: "₹72,00,000",   startDate: "Mar 1, 2024",  endDate: "Feb 28, 2025", progress: 41  },
  { id: 3,  name: "Riverside Bridge Project",      location: "Nashik, MH",      status: "Delayed",   budget: "₹1,80,00,000", startDate: "Nov 5, 2023",  endDate: "Aug 31, 2024", progress: 29  },
  { id: 4,  name: "Metro Rail Depot",              location: "Nagpur, MH",      status: "Ongoing",   budget: "₹5,60,00,000", startDate: "Feb 15, 2024", endDate: "Jan 15, 2026", progress: 55  },
  { id: 5,  name: "Corporate Hub Annex",           location: "Hyderabad, TS",   status: "Completed", budget: "₹95,00,000",   startDate: "Apr 1, 2023",  endDate: "Mar 31, 2024", progress: 100 },
  { id: 6,  name: "Central Mall Expansion",        location: "Bengaluru, KA",   status: "Ongoing",   budget: "₹3,20,00,000", startDate: "Jun 1, 2024",  endDate: "May 31, 2025", progress: 78  },
  { id: 7,  name: "NH-48 Highway Widening",        location: "Delhi–Gurugram",  status: "Delayed",   budget: "₹8,50,00,000", startDate: "Jan 1, 2023",  endDate: "Dec 31, 2023", progress: 47  },
  { id: 8,  name: "Lakeview Villas",               location: "Udaipur, RJ",     status: "Completed", budget: "₹1,10,00,000", startDate: "Sep 1, 2022",  endDate: "Aug 31, 2023", progress: 100 },
  { id: 9,  name: "Techpark Phase 3",              location: "Chennai, TN",     status: "Ongoing",   budget: "₹4,15,00,000", startDate: "Jul 15, 2024", endDate: "Jun 30, 2026", progress: 22  },
  { id: 10, name: "Old Town Heritage Restoration", location: "Jaipur, RJ",      status: "Delayed",   budget: "₹60,00,000",   startDate: "Mar 1, 2023",  endDate: "Feb 28, 2024", progress: 34  },
  { id: 11, name: "Solar Farm Grid",               location: "Rajkot, GJ",      status: "Completed", budget: "₹2,00,00,000", startDate: "Jan 1, 2022",  endDate: "Dec 31, 2022", progress: 100 },
];

// ─────────────────────────────────────────
// Page Meta
// ─────────────────────────────────────────
=======
// ── Project Management data & logic ──
import { useState as useLocalState, useMemo } from "react";

const INITIAL_PROJECTS = [
  { id: 1, name: "Skyline Tower Phase 2", location: "Mumbai, MH", status: "Ongoing", budget: "₹2,40,00,000", startDate: "Jan 10, 2024", endDate: "Dec 30, 2024", progress: 68 },
  { id: 2, name: "Green Valley Residency", location: "Pune, MH", status: "Ongoing", budget: "₹72,00,000", startDate: "Mar 1, 2024", endDate: "Feb 28, 2025", progress: 41 },
  { id: 3, name: "Riverside Bridge Project", location: "Nashik, MH", status: "Delayed", budget: "₹1,80,00,000", startDate: "Nov 5, 2023", endDate: "Aug 31, 2024", progress: 29 },
  { id: 4, name: "Metro Rail Depot", location: "Nagpur, MH", status: "Ongoing", budget: "₹5,60,00,000", startDate: "Feb 15, 2024", endDate: "Jan 15, 2026", progress: 55 },
  { id: 5, name: "Corporate Hub Annex", location: "Hyderabad, TS", status: "Completed", budget: "₹95,00,000", startDate: "Apr 1, 2023", endDate: "Mar 31, 2024", progress: 100 },
  { id: 6, name: "Central Mall Expansion", location: "Bengaluru, KA", status: "Ongoing", budget: "₹3,20,00,000", startDate: "Jun 1, 2024", endDate: "May 31, 2025", progress: 78 },
  { id: 7, name: "NH-48 Highway Widening", location: "Delhi–Gurugram", status: "Delayed", budget: "₹8,50,00,000", startDate: "Jan 1, 2023", endDate: "Dec 31, 2023", progress: 47 },
  { id: 8, name: "Lakeview Villas", location: "Udaipur, RJ", status: "Completed", budget: "₹1,10,00,000", startDate: "Sep 1, 2022", endDate: "Aug 31, 2023", progress: 100 },
  { id: 9, name: "Techpark Phase 3", location: "Chennai, TN", status: "Ongoing", budget: "₹4,15,00,000", startDate: "Jul 15, 2024", endDate: "Jun 30, 2026", progress: 22 },
  { id: 10, name: "Old Town Heritage Restoration", location: "Jaipur, RJ", status: "Delayed", budget: "₹60,00,000", startDate: "Mar 1, 2023", endDate: "Feb 28, 2024", progress: 34 },
  { id: 11, name: "Solar Farm Grid", location: "Rajkot, GJ", status: "Completed", budget: "₹2,00,00,000", startDate: "Jan 1, 2022", endDate: "Dec 31, 2022", progress: 100 },
];

>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
const pageMeta = {
  Dashboard:            { title: "Dashboard",           subtitle: "All details about your selling products are here..."      },
  "Lead Management":    { title: "Lead Management",     subtitle: "Track and manage all your leads in one place..."          },
  "Project Management": { title: "Project Management",  subtitle: "Oversee all your ongoing and upcoming projects..."        },
  "Task Management":    { title: "Task Management",     subtitle: "Assign, track and complete tasks efficiently..."          },
  "Vendor Management":  { title: "Vendor Management",   subtitle: "Manage your vendors and supplier relationships..."        },
  "Payment & Expenses": { title: "Payment & Expenses",  subtitle: "Track all payments and expense records..."               },
  "Site Uploads":       { title: "Site Uploads",        subtitle: "Upload and manage images and videos for your sites..."   },
};

// ─────────────────────────────────────────
<<<<<<< HEAD
// Project Management Section
// ─────────────────────────────────────────
function ProjectManagementContent() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast]       = useState(null);
=======
// Project Management Page (inline section)
// ─────────────────────────────────────────
function ProjectManagementContent() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f

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

<<<<<<< HEAD
  const handleAdd  = (newProject) => { setProjects((prev) => [newProject, ...prev]); showToast("Project created successfully!"); };
=======
  const handleAdd = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast("Project created successfully!");
  };

>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
  const handleView = (p) => showToast(`Viewing: ${p.name}`, "info");
  const handleEdit = (p) => showToast(`Edit opened for: ${p.name}`, "info");

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {toast && (
<<<<<<< HEAD
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"}`}>
=======
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"
          }`}
        >
>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
          {toast.msg}
        </div>
      )}

<<<<<<< HEAD
      {/* Add Button */}
=======
      {/* Top Row: Add Button */}
>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add New Project
        </button>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Filters + Table + Activity */}
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
          <ProjectTable projects={filteredProjects} onView={handleView} onEdit={handleEdit} />
        </div>
<<<<<<< HEAD
=======

>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
        <div className="xl:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Modal */}
      <AddProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}

// ─────────────────────────────────────────
// Root Page
// ─────────────────────────────────────────
const Page = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const meta = pageMeta[activeItem] || pageMeta["Dashboard"];

  const isProjectManagement = activeItem === "Project Management";
<<<<<<< HEAD
  const isLeadManagement    = activeItem === "Lead Management";

  // Pages that use full-width layout (no Profile sidebar)
  const isFullWidth = isProjectManagement || isLeadManagement;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header title={meta.title} subtitle={meta.subtitle} />

=======

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header title={meta.title} subtitle={meta.subtitle} />

>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        {/* MAIN AREA */}
        <div className="flex flex-1 overflow-y-auto bg-[#f7fdf9]">

          {/* ── Project Management ── */}
          {isProjectManagement ? (
            <div className="flex-1 p-6">
              <ProjectManagementContent />
            </div>

<<<<<<< HEAD
          /* ── Lead Management ── */
          ) : isLeadManagement ? (
            <div className="flex-1 p-6">
              <LeadManagement />
            </div>

          /* ── Dashboard + Profile (default) ── */
          ) : (
=======
          ) : (
            /* ── All other pages (Dashboard default) ── */
>>>>>>> adcccca6545a73c6b7dd43e321a17cb5c598937f
            <div className="flex flex-1 items-start p-6 gap-6">
              <div className="flex-1">
                <Dashboard />
              </div>
              <div className="w-[300px] flex-shrink-0 self-start sticky top-6">
                <Profile />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Page;