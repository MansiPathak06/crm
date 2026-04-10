// components/TaskManagementContent.jsx
'use client';

import { useState, useMemo } from 'react';
import OverviewCards from './OverviewCards';
import TaskTable from './TaskTable';
import TaskKanban from './TaskKanban';
import AddTaskModal from './AddTaskModal';
import Filters from './Filters';
import TodayTasks from './TodayTasks';

const TASKS_DATA = [
  {
    id: 1,
    name: 'Foundation Pouring - Site A',
    assignedTo: 'John Doe (Foreman)',
    project: 'Skyline Tower Phase 2',
    priority: 'High',
    status: 'In Progress',
    deadline: '2026-04-15',
    progress: 75,
    overdue: false,
  },
  {
    id: 2,
    name: 'Steel Framework Delivery',
    assignedTo: 'Jane Smith (Supervisor)',
    project: 'Green Valley Residency',
    priority: 'Medium',
    status: 'Pending',
    deadline: '2026-04-12',
    progress: 0,
    overdue: true,
  },
  {
    id: 3,
    name: 'Electrical Rough-In Complete',
    assignedTo: 'Mike Johnson (Electrician)',
    project: 'Corporate Hub Annex',
    priority: 'Low',
    status: 'Completed',
    deadline: '2026-04-08',
    progress: 100,
    overdue: false,
  },
  {
    id: 4,
    name: 'Plumbing First Floor',
    assignedTo: 'Sarah Wilson (Plumber)',
    project: 'NH-48 Highway Widening',
    priority: 'High',
    status: 'In Progress',
    deadline: '2026-04-20',
    progress: 40,
    overdue: false,
  },
  {
    id: 5,
    name: 'Roof Truss Installation',
    assignedTo: 'Tom Brown (Carpenter)',
    project: 'Lakeview Villas',
    priority: 'Medium',
    status: 'Pending',
    deadline: '2026-04-18',
    progress: 10,
    overdue: false,
  },
  {
    id: 6,
    name: 'Exterior Painting Complete',
    assignedTo: 'Lisa Davis (Painter)',
    project: 'Old Town Heritage Restoration',
    priority: 'High',
    status: 'Completed',
    deadline: '2026-04-10',
    progress: 100,
    overdue: false,
  },
];

const WORKERS = [
  'John Doe (Foreman)', 'Jane Smith (Supervisor)', 'Mike Johnson (Electrician)', 
  'Sarah Wilson (Plumber)', 'Tom Brown (Carpenter)', 'Lisa Davis (Painter)',
  'Robert Clark (Mason)', 'Emily White (Engineer)'
];

const PROJECTS = [
  'Skyline Tower Phase 2', 'Green Valley Residency', 'Corporate Hub Annex', 
  'NH-48 Highway Widening', 'Lakeview Villas', 'Old Town Heritage Restoration'
];

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

export default function TaskManagementContent() {
  const [tasks, setTasks] = useState(TASKS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', project: '' });

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (filters.search) {
      result = result.filter(task => 
        task.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status) result = result.filter(task => task.status === filters.status);
    if (filters.priority) result = result.filter(task => task.priority === filters.priority);
    if (filters.project) result = result.filter(task => task.project === filters.project);
    return result;
  }, [tasks, filters]);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
  };

  const today = '2026-04-10';
  const todayTasks = tasks.filter(task => task.deadline === today);
  const overdueTasks = tasks.filter(task => task.overdue);

  return (
    <div className="w-full space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Task Management</h1>
          <p className="text-gray-600">Assign, track and complete construction tasks efficiently</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 ml-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Overview Cards */}
      <OverviewCards
        total={totalTasks}
        pending={pendingTasks}
        inProgress={inProgressTasks}
        completed={completedTasks}
      />

      {/* Filters */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        workers={WORKERS}
        projects={PROJECTS}
        priorities={PRIORITIES}
        statuses={STATUSES}
      />

      {/* Today Tasks & Overdue */}
      <div className="grid md:grid-cols-2 gap-6">
        <TodayTasks title="Today's Tasks" tasks={todayTasks} />
        <TodayTasks title="Overdue Tasks" tasks={overdueTasks} highlightRed />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Task List</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <TaskTable tasks={filteredTasks} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kanban Board</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-4 h-[600px]">
            <TaskKanban tasks={filteredTasks} />
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        workers={WORKERS}
        projects={PROJECTS}
        priorities={PRIORITIES}
        statuses={STATUSES}
      />
    </div>
  );
}