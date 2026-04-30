import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { taskApi } from "../services/taskApi";

export const useTasks = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void taskApi
      .getAll()
      .then((data) => setTasks(data))
      .catch((err) => {
        console.log(err);
      });
  }, [])

  // ADD TASK
  const addTask = async (title: string) => {
    try {
      const newTask = await taskApi.create(title)
      setTasks(prev => [...prev, newTask])
    } catch (err) {
      console.log(err)
    }
  };

  // DELETE TASK
  const deleteTask = async (id: number) => {
    try {
      await taskApi.delete(id)
      setTasks(prev =>
        prev.filter(task => task.id !== id)
      )
    } catch (err) {
      console.log(err)
    }
  };

  const updateTask = async (id: number, data: Task) => {
    try {
      const updatedTask = await taskApi.update(id, data)

      setTasks(prev => 
        prev.map(task => 
          task.id === id ? updatedTask : task
        )
      )
    } catch (err) {
      console.log(err)
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  };
};