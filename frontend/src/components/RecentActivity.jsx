"use client";

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 text-base">Recent Activity</h2>
        <button className="text-xs text-emerald-600 font-semibold hover:underline">View all</button>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-100" />

        <div className="space-y-5">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-400 pl-2">No recent activity yet.</p>
          ) : (
            activities.map((act, i) => (
              <div key={act.id ?? i} className="flex items-start gap-4 relative">
                <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center text-sm shrink-0 z-10 shadow-sm`}>
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0 pt-1.5">
                  <p className="text-sm text-gray-700 leading-snug">{act.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}