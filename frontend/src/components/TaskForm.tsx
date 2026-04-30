import { useState } from "react";

export default function  TaskForm({addTask}: {addTask: (title: string) => void}) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        if (!title.trim()) return;

        addTask(title);

        setTitle("");
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