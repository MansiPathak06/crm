// components/TodayTasks.jsx
export default function TodayTasks({ title, tasks, highlightRed = false }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className={`text-lg font-semibold mb-4 ${highlightRed ? 'text-red-800' : 'text-gray-900'}`}>
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className={`p-3 rounded-xl border-l-4 ${highlightRed ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
            <div className="font-medium text-sm text-gray-900 mb-1">{task.name}</div>
            <div className="text-xs text-gray-600">{task.assignedTo} - {task.project}</div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );
}