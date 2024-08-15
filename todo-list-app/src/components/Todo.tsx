import { Checkbox, Modal  } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';

interface TodoProps {
    todo: Todo;
    toggleComplete: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, newTask: string) => void;
}

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

export default function Todo({ todo, toggleComplete, removeTodo, editTodo }: TodoProps) {

    const { confirm } = Modal;

    const handleRemoveClick = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa mục này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Mục này sẽ bị xóa vĩnh viễn.',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                removeTodo(todo.id);
            },
        });
    };

    const handleEditClick = () => {
        const newTask = prompt("Chỉnh sửa công việc:", todo.task);
        if (newTask !== null && newTask.trim() !== "") {
            editTodo(todo.id, newTask);
        }
    }

    return (
        <div className='border-bottom my-3 d-flex justify-content-between mx-auto p-1' style={{ textDecoration: todo.completed ? "line-through" : "" }}>
            <div className='d-flex'>
                <Checkbox className='border-0 rounded' onClick={() => toggleComplete(todo.id)} checked={todo.completed}></Checkbox>
                <div className='mx-2'>{todo.task}</div>
            </div>
            <div className='d-flex'>
                <EditOutlined onClick={handleEditClick} className='mx-1 text-secondary px-2' />
                <DeleteOutlined onClick={handleRemoveClick} className='mx-1 text-danger px-2' />
            </div>
        </div>
    )
}