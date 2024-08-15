import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Input } from 'antd';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

export default function Index() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const addTodo = (task: string) => {
        const newTodo = { id: Date.now(), task, completed: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        console.log("add")
    };

    const toggleComplete = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        console.log("completed")
    };

    const removeTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        console.log("remove")
    };

    const editTodo = (id: number, newTask: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task: newTask } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        console.log("edit")
    }

    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className='d-flex flex-column' style={{height: '100vh'}}>
                <div className="container col-md-6 flex-grow-1">
                    <div className='sticky-top bg-white'>
                        <h3 className='py-3 text-center'>Todo List</h3>
                        <Input
                            className='mb-3'
                            type="text"
                            placeholder="Tìm kiếm công việc..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <TodoForm addTodo={addTodo} />
                    </div>
                    <TodoList todos={filteredTodos} toggleComplete={toggleComplete} removeTodo={removeTodo} editTodo={editTodo} />
                </div>
                <footer className='w-100 py-3 bg-light'>
                    <p className='mb-0 text-center' style={{ fontSize: '12px' }}>nhat200901@gmail.com</p>
                </footer>
            </section>
        </>
    );
}
