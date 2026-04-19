export const filterTasks = (tasks, query, statusFilter) => {
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