import React from 'react'
import Todo from './Todo';

interface TodoListProps {
    todos: Todo[];
    toggleComplete: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, newTask: string) => void;
}

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}


export default function TodoList({ todos, toggleComplete, removeTodo, editTodo }: TodoListProps) {
    return (
        <div className='my-3 px-1 rounded'>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                />
            ))}
        </div>
    )
}
