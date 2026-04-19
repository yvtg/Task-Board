import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskLists from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";
import { filterTasks } from "./utils/filterTasks";

function App() {

  const {
    tasks,
    addTask,
    deleteTask,
    updateStatus
  } = useTasks();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const filteredTasks = filterTasks(
    tasks,
    query,
    statusFilter
  );

  return(
    <div className="min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-center text-lg font-bold text-amber-600">Task board</div>
        <div className="flex">
          <SearchBar setQuery={setQuery} />
          <FilterBar setStatusFilter={setStatusFilter} />
        </div>
        <TaskForm addTask={addTask} />
        <TaskLists tasks={filteredTasks} deleteTask={deleteTask} updateStatus={updateStatus}  />
      </div>
    </div>
  );
}

export default App;