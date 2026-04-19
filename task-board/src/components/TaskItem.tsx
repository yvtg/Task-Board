
export default function TaskItem({task, deleteTask, updateStatus}){
    return (
        <div className="grid grid-cols-[2fr_1fr_auto] items-center w-full gap-2">
            {
                task.status === "done" 
                ? <span className="px-4 break-all min-w-0"><del>{task.title}</del></span>
                : <span className="px-4 break-all min-w-0">{task.title}</span>

            }

            <select className="border px-4  py-1 rounded" value={task.status} onChange={e => updateStatus(task.id, e.target.value)}>
                <option value="todo">Todo</option>
                <option value="in-progress"  >In-progess</option>
                <option value="done">Done</option>
            </select>

            <button onClick={() => {deleteTask(task.id)}}
                    className="text-red-500 hover:text-red-900 px-4 justify-self-end cursor-pointer"
                > X </button>
        </div>
    );
}