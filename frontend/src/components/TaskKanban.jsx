// components/TaskKanban.jsx
export default function TaskKanban({ tasks }) {
  const columns = {
    Pending: tasks.filter(t => t.status === 'Pending'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    Completed: tasks.filter(t => t.status === 'Completed'),
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {Object.entries(columns).map(([status, tasks]) => (
        <div key={status} className="min-w-[320px] flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${
              status === 'Completed' ? 'bg-green-500' :
              status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
            }`} />
            <h3 className="font-semibold text-gray-900">{status}</h3>
            <span className="ml-auto text-sm text-gray-500">({tasks.length})</span>
          </div>
          <div className="space-y-3 flex-1">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer group">
                <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{task.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{task.assignedTo}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}