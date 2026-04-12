"use client";

import { useState, useMemo } from "react";
import TaskTable from "@/components/TaskTable";
import TodayTasks from "@/components/TodayTasks";

const INITIAL_TASKS = [
  { id: 1, name: "Foundation Inspection", assignedTo: "Ravi Kumar", project: "Skyline Tower Phase 2", priority: "High", status: "In Progress", deadline: "Apr 15, 2024", progress: 60, overdue: false },
  { id: 2, name: "Electrical Wiring - Floor 3", assignedTo: "Anita Shah", project: "Green Valley Residency", priority: "Medium", status: "Pending", deadline: "Apr 10, 2024", progress: 20, overdue: true },
  { id: 3, name: "Concrete Pouring", assignedTo: "Suresh Patil", project: "Riverside Bridge Project", priority: "High", status: "In Progress", deadline: "Apr 20, 2024", progress: 45, overdue: false },
  { id: 4, name: "Site Safety Audit", assignedTo: "Meena Joshi", project: "Metro Rail Depot", priority: "High", status: "Completed", deadline: "Mar 30, 2024", progress: 100, overdue: false },
  { id: 5, name: "Material Procurement", assignedTo: "Deepak Rao", project: "Central Mall Expansion", priority: "Medium", status: "In Progress", deadline: "Apr 25, 2024", progress: 70, overdue: false },
  { id: 6, name: "Plumbing Installation", assignedTo: "Priya Nair", project: "Lakeview Villas", priority: "Low", status: "Completed", deadline: "Mar 15, 2024", progress: 100, overdue: false },
  { id: 7, name: "Roof Sealing", assignedTo: "Amit Verma", project: "Techpark Phase 3", priority: "Medium", status: "Pending", deadline: "Apr 8, 2024", progress: 10, overdue: true },
  { id: 8, name: "Interior Painting", assignedTo: "Kavita Singh", project: "Corporate Hub Annex", priority: "Low", status: "In Progress", deadline: "Apr 30, 2024", progress: 35, overdue: false },
];

const SUMMARY_CARDS = [
  { label: "Total Tasks", key: "total", color: "blue" },
  { label: "In Progress", key: "inProgress", color: "emerald" },
  { label: "Completed", key: "completed", color: "violet" },
  { label: "Overdue", key: "overdue", color: "rose" },
];

export default function TaskManagementContent() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
        t.project.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || t.status === statusFilter;
      const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    overdue: tasks.filter((t) => t.overdue).length,
  };

  const todayTasks = tasks.filter((t) => t.status !== "Completed");
  const overdueTasks = tasks.filter((t) => t.overdue);

  return (
    <div className="w-full space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.key} className={`bg-${card.color}-50 rounded-2xl p-5 border border-white/60 shadow-sm`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{card.label}</p>
            <p className={`text-4xl font-black text-${card.color}-700 mt-2`}>{stats[card.key]}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks, assignee, project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {["All", "In Progress", "Pending", "Completed"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {["All", "High", "Medium", "Low"].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <div className="text-sm text-gray-400 font-medium self-center shrink-0">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <TaskTable tasks={filteredTasks} />
      </div>

      {/* Today's Tasks + Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayTasks title="Today's Tasks" tasks={todayTasks} />
        <TodayTasks title="Overdue Tasks" tasks={overdueTasks} highlightRed={true} />
      </div>

    </div>
  );
}