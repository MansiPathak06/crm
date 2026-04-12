"use client";

export default function OverviewCards({ projects = [] }) {
  const total     = projects.length;
  const ongoing   = projects.filter(p => p.status === "Ongoing").length;
  const completed = projects.filter(p => p.status === "Completed").length;
  const delayed   = projects.filter(p => p.status === "Delayed").length;

  const cards = [
    {
      title: "Total Projects", count: total,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>),
      bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600", countColor: "text-blue-700",
      trend: "All projects", trendColor: "text-blue-500",
    },
    {
      title: "Ongoing", count: ongoing,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/></svg>),
      bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", countColor: "text-emerald-700",
      trend: "Active now", trendColor: "text-emerald-500",
    },
    {
      title: "Completed", count: completed,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9"/></svg>),
      bg: "bg-violet-50", iconBg: "bg-violet-100", iconColor: "text-violet-600", countColor: "text-violet-700",
      trend: "Delivered", trendColor: "text-violet-500",
    },
    {
      title: "Delayed", count: delayed,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 9v4M12 17h.01" strokeLinecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>),
      bg: "bg-rose-50", iconBg: "bg-rose-100", iconColor: "text-rose-600", countColor: "text-rose-700",
      trend: "Needs attention", trendColor: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.title} className={`${card.bg} rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-white/60 hover:shadow-md transition-shadow duration-200`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{card.title}</span>
            <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-xl`}>{card.icon}</div>
          </div>
          <div className={`text-4xl font-black ${card.countColor} leading-none`}>{card.count}</div>
          <div className={`text-xs font-medium ${card.trendColor}`}>{card.trend}</div>
        </div>
      ))}
    </div>
  );
}