import type { Task } from "./Task";

export interface TaskItemProps {
    task: Task,
    deleteTask: (id: number) => void,
    updateTask: (id: number, newStatus: string) => void
}