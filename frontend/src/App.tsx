import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskLists from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";
import { filterTasks } from "./utils/filterTasks";
import type { Task } from "./types/Task";

function App() {

  const {
    tasks,
    addTask,
    deleteTask,
    updateTask
  } = useTasks();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const filteredTasks = filterTasks(
    tasks,
    query,
    statusFilter
  );

  const handleUpdateTaskStatus = (id: number, newStatus: string) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const updatedTask: Task = {
      ...currentTask,
      status: newStatus,
    };

    updateTask(id, updatedTask);
  };

  return(
    <div className="min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-center text-lg font-bold text-amber-600">Task board</div>
        <div className="flex">
          <SearchBar setQuery={setQuery} />
          <FilterBar setStatusFilter={setStatusFilter} />
        </div>
        <TaskForm addTask={addTask} />
        <TaskLists tasks={filteredTasks} deleteTask={deleteTask} updateTask={handleUpdateTaskStatus}  />
      </div>
    </div>
  );
}

export default App;