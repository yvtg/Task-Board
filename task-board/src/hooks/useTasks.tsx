import { useState } from "react";
import { initialTasks } from "../data/data";

export const useTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (title: string, status: string) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      status,
    };

    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  const updateStatus = (
    id: number,
    newStatus: string
  ) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateStatus,
  };
};