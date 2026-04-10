"use client";

const statusConfig = {
  Ongoing: { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  Completed: { dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700", bar: "bg-violet-500" },
  Delayed: { dot: "bg-rose-500", badge: "bg-rose-100 text-rose-700", bar: "bg-rose-500" },
};

export default function ProjectCard({ project, onView, onEdit }) {
  const cfg = statusConfig[project.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{project.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {project.location}
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {project.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium">Progress</span>
          <span className="text-xs font-bold text-gray-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${cfg.bar} transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Budget</p>
          <p className="text-sm font-bold text-gray-800">{project.budget}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onView(project)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
          >
            View
          </button>
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}