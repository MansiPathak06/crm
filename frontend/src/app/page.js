"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Overview";
import Profile from "@/components/Profile";

// ── Lead Management ──
import LeadManagement from "@/components/LeadManagement";

// ── Vendor Management ──
import VendorManagement from "@/components/VendorManagement";

// ── Task Management ──
import TaskManagement from "@/components/TaskManagementContent";

// ── Payment & Expenses ──
import PaymentExpenses from "@/components/PaymentExpenses";

// ── Site Uploads ──
import SiteUploads from "@/components/SiteUploads";

// ── Team Management ──
import TeamManagement from "@/components/TeamManagement";

// ── Project Management components ──
import OverviewCards from "@/components/OverviewCards";
import ProjectTable from "@/components/ProjectTable";
import AddProjectModal from "@/components/AddProjectModal";
import Filters from "@/components/Filters";
import RecentActivity from "@/components/RecentActivity";

// ─────────────────────────────────────────
// Project Management Data
// ─────────────────────────────────────────


// ─────────────────────────────────────────
// Page Meta
// ─────────────────────────────────────────
const pageMeta = {
  Dashboard:            { title: "Dashboard",            subtitle: "All details about your selling products are here..." },
  "Lead Management":    { title: "Lead Management",      subtitle: "Track and manage all your leads in one place..." },
  "Project Management": { title: "Project Management",   subtitle: "Oversee all your ongoing and upcoming projects..." },
  "Task Management":    { title: "Task Management",      subtitle: "Assign, track and complete tasks efficiently..." },
  "Vendor Management":  { title: "Vendor Management",    subtitle: "Manage your vendors and supplier relationships..." },
  "Payment & Expenses": { title: "Payment & Expenses",   subtitle: "Track all payments and expense records..." },
  "Site Uploads":       { title: "Site Uploads",         subtitle: "Upload and manage images and videos for your sites..." },
  "Team Management":    { title: "Team Management",      subtitle: "Manage your team members and their roles..." },
};

// ─────────────────────────────────────────
// Project Management Section
// ─────────────────────────────────────────
function ProjectManagementContent() {
 const [projects, setProjects] = useState([]);
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
    <div className="w-full space-y-6">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"
        }`}>
          {toast.msg}
        </div>
      )}

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

      <OverviewCards />

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
        <div className="xl:col-span-1">
         <RecentActivity activities={[]} />
        </div>
      </div>

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
  const isLeadManagement    = activeItem === "Lead Management";
  const isVendorManagement  = activeItem === "Vendor Management";
  const isTaskManagement    = activeItem === "Task Management";
  const isPaymentExpenses   = activeItem === "Payment & Expenses";
  const isSiteUploads       = activeItem === "Site Uploads";
  const isTeamManagement    = activeItem === "Team Management";

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header title={meta.title} subtitle={meta.subtitle} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex flex-1 overflow-y-auto bg-[#f7fdf9]">

          {isProjectManagement ? (
            <div className="flex-1 p-6">
              <ProjectManagementContent />
            </div>

          ) : isLeadManagement ? (
            <div className="flex-1 p-6">
              <LeadManagement />
            </div>

          ) : isVendorManagement ? (
            <div className="flex-1 p-6">
              <VendorManagement />
            </div>

          ) : isTaskManagement ? (
            <div className="flex-1 p-6">
              <TaskManagement />
            </div>

          ) : isPaymentExpenses ? (
            <div className="flex-1 p-6">
              <PaymentExpenses />
            </div>

          ) : isSiteUploads ? (
            <div className="flex-1 p-6">
              <SiteUploads />
            </div>

          ) : isTeamManagement ? (
            <div className="flex-1 p-6">
              <TeamManagement />
            </div>

          ) : (
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