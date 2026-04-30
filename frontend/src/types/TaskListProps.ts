import type { Task } from "./Task";

export interface TaskListProps {
    tasks: Task[],
    deleteTask: (id: number) => void,
    updateTask: (id: number, newStatus: string) => void
}