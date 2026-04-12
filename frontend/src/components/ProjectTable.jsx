"use client";
import ProjectCard from "../components/ProjectCard";

const statusConfig = {
  Ongoing:   { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  Completed: { dot: "bg-violet-500",  badge: "bg-violet-100 text-violet-700"  },
  Delayed:   { dot: "bg-rose-500",    badge: "bg-rose-100 text-rose-700"      },
};

const barColor = {
  Ongoing:   "bg-emerald-500",
  Completed: "bg-violet-500",
  Delayed:   "bg-rose-500",
};

function ProgressBar({ value, status }) {
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${barColor[status]} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{value}%</span>
    </div>
  );
}

export default function ProjectTable({ projects, onView, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Project Name", "Location", "Status", "Budget", "Start Date", "End Date", "Progress", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map((p, i) => {
              const cfg = statusConfig[p.status];
              return (
                <tr key={p.id ?? i} className={`hover:bg-gray-50/70 transition-colors duration-150 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900 leading-snug">{p.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">#{String(p.id).padStart(4, "0")}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-400 shrink-0">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                      </svg>
                      <span className="text-sm">{p.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{p.budget}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{p.startDate}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{p.endDate}</td>
                  <td className="px-5 py-4"><ProgressBar value={p.progress} status={p.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onView(p)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="View">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button onClick={() => onEdit(p)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button onClick={() => onDelete(p.id)} className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg transition" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium">No projects found</p>
            <p className="text-xs mt-1">Add your first project using the button above</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p,i) => (
          <ProjectCard key={p.id?? i} project={p} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {projects.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-400">
            <p className="font-medium">No projects found</p>
          </div>
        )}
      </div>
    </>
  );
}