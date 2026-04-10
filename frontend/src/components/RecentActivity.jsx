"use client";

const activities = [
  {
    id: 1,
    icon: "✅",
    iconBg: "bg-emerald-100",
    message: "Skyline Tower Phase 1 marked as Completed",
    time: "2 hours ago",
    color: "text-emerald-600",
  },
  {
    id: 2,
    icon: "💰",
    iconBg: "bg-blue-100",
    message: "Budget updated for Green Valley Residency — ₹72L",
    time: "5 hours ago",
    color: "text-blue-600",
  },
  {
    id: 3,
    icon: "⚠️",
    iconBg: "bg-rose-100",
    message: "Riverside Bridge Project flagged as Delayed",
    time: "Yesterday, 3:40 PM",
    color: "text-rose-600",
  },
  {
    id: 4,
    icon: "👷",
    iconBg: "bg-amber-100",
    message: "12 new workers assigned to Metro Rail Depot",
    time: "Yesterday, 11:00 AM",
    color: "text-amber-600",
  },
  {
    id: 5,
    icon: "📋",
    iconBg: "bg-violet-100",
    message: "New project added: Corporate Hub, Pune",
    time: "2 days ago",
    color: "text-violet-600",
  },
  {
    id: 6,
    icon: "📈",
    iconBg: "bg-teal-100",
    message: "Progress updated: Central Mall at 78% completion",
    time: "3 days ago",
    color: "text-teal-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 text-base">Recent Activity</h2>
        <button className="text-xs text-emerald-600 font-semibold hover:underline">View all</button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-100" />

        <div className="space-y-5">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-4 relative">
              <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center text-sm shrink-0 z-10 shadow-sm`}>
                {act.icon}
              </div>
              <div className="flex-1 min-w-0 pt-1.5">
                <p className="text-sm text-gray-700 leading-snug">{act.message}</p>
                <p className="text-xs text-gray-400 mt-1">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}