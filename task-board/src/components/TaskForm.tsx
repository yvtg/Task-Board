import { useState } from "react";

export default function  TaskForm({addTask}: {addTask: (title: string, status: string) => void}) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("todo");

    const handleSubmit = e => {
        e.preventDefault();

        if (!title.trim()) return;

        addTask(title, status);

        setTitle("");
        setStatus("todo");
    };
    
    return (
        <form className="flex justify-baseline p-6"
            onSubmit={handleSubmit}>
            <input 
                className="border p-2"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add task here..."
            />

        </form>
    );
}