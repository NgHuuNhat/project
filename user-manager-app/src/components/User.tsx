import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { UserType } from '../types/User';
import { Checkbox, Modal } from 'antd';

interface UserProps {
  user: UserType;
  index: number;
  onDelete: (id: string) => void
}

export default function User(props: UserProps) {
  const { user, index, onDelete } = props;
  const { confirm } = Modal;

  const handleDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${user.username}?`,
      icon: <ExclamationCircleOutlined />,
      content: `${user.username} sẽ bị xóa vĩnh viễn.`,
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        onDelete(user.id);
      },
    });
  };

  return (
    <div className='border-bottom my-3 d-flex justify-content-between mx-auto p-1' >
      <div className='d-flex'>
        <div>{index + 1}.</div>
        <div className='mx-2'>{user.username}</div>
      </div>
      <div className='d-flex'>
        <EditOutlined className='mx-1 text-secondary px-2' />
        <DeleteOutlined onClick={handleDelete} className='mx-1 text-danger px-2' />
      </div>
    </div>
  )
}
