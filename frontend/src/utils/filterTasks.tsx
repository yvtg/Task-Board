import type { Task } from "../types/Task";

export const filterTasks = (tasks: Task[], query: string, statusFilter: string) => {
  return tasks.filter(task => {
    const matchSearch =
      task.title
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      task.status === statusFilter;

    return matchSearch && matchStatus;
  });
};