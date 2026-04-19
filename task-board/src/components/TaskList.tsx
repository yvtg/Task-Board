import TaskItem from "./TaskItem";

export default function TaskList({tasks, deleteTask, updateStatus}){

    return (
        <ul className="flex flex-wrap gap-4 justify-center w-auto rounded-box shadow-md p-4 mx-12">
            {tasks.map( task => (
                <TaskItem 
                    key = {task.id}
                    task = {task}
                    deleteTask={deleteTask}
                    updateStatus={updateStatus}
                />
            ))}

        </ul>
    );
}