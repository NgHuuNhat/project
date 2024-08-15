import React, { useState } from 'react'
import { Input } from 'antd';

interface TodoFormProps {
    addTodo: (task: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {

    const [task, setTask] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            addTodo(task);
            setTask("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center w-100'>
            <Input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Thêm công việc..."
            />
            <button type='submit' className='my-2 my-md-0 ms-2 border-0 px-4 rounded btn btn-light' style={{outline: 'none'}}>Thêm</button>

        </form>
    )
}
