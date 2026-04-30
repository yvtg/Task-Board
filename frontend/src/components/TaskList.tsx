import type { TaskListProps } from "../types/TaskListProps";
import TaskItem from "./TaskItem";

export default function TaskList({tasks, deleteTask, updateTask}: TaskListProps){

    return (
        <ul className="flex flex-wrap gap-4 justify-center w-auto rounded-box shadow-md p-4 mx-12">
            {tasks.map( task => (
                <TaskItem 
                    key = {task.id}
                    task = {task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            ))}

        </ul>
    );
}