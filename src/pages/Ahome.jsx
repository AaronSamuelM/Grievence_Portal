import { useReducer, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { Download, Search, Filter, PlusCircle } from "lucide-react";

const initialState = {
  tasks: [
    { id: 1, title: "Fix road damage", status: "active" },
    { id: 2, title: "Install street lights", status: "assigned" },
    { id: 3, title: "Water supply issue", status: "assigned" },
  ],
  search: "",
  filter: "all",
  live: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, status: t.status === "active" ? "assigned" : "active" } : t
        ),
      };
    case "SEARCH":
      return { ...state, search: action.payload };
    case "FILTER":
      return { ...state, filter: action.payload };
    case "TOGGLE_LIVE":
      return { ...state, live: !state.live };
    default:
      return state;
  }
}

const COLORS = ["#8884d8", "#82ca9d"];

export default function Ahome() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Live updates simulation
  useEffect(() => {
    if (!state.live) return;
    const interval = setInterval(() => {
      const newTask = {
        id: Date.now(),
        title: "New Grievance " + Date.now(),
        status: Math.random() > 0.5 ? "active" : "assigned",
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
    }, 10000);
    return () => clearInterval(interval);
  }, [state.live]);

  const filteredTasks = state.tasks.filter((task) => {
    return (
      (state.filter === "all" || task.status === state.filter) &&
      task.title.toLowerCase().includes(state.search.toLowerCase())
    );
  });

  const data = [
    { name: "Active", value: state.tasks.filter((t) => t.status === "active").length },
    { name: "Assigned", value: state.tasks.filter((t) => t.status === "assigned").length },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Admin Dashboard</h1>

        {/* Top controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            onChange={(e) => dispatch({ type: "FILTER", payload: e.target.value })}
            className="p-2 border rounded-lg"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="assigned">Assigned</option>
          </select>
          <button
            onClick={() => dispatch({ type: "TOGGLE_LIVE" })}
            className={`px-4 py-2 rounded-lg ${state.live ? "bg-green-600" : "bg-red-600"} text-white`}
          >
            {state.live ? "Live Updates On" : "Live Updates Off"}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
            <PlusCircle size={18} /> New Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Active Tasks</h2>
            <p className="text-4xl font-bold text-green-600">
              {data.find((d) => d.name === "Active")?.value}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Assigned Tasks</h2>
            <p className="text-4xl font-bold text-blue-600">
              {data.find((d) => d.name === "Assigned")?.value}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Total Tasks</h2>
            <p className="text-4xl font-bold text-purple-600">{state.tasks.length}</p>
          </motion.div>
        </div>

        {/* Chart + Task list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Task Analytics</h2>
            <PieChart width={300} height={300}>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tasks</h2>
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {filteredTasks.map((task) => (
                <motion.li
                  key={task.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                >
                  <span className="text-gray-800 dark:text-gray-200">{task.title}</span>
                  <button
                    onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
                    className={`px-3 py-1 text-sm rounded-lg ${task.status === "active"
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white"
                      }`}
                  >
                    {task.status}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
