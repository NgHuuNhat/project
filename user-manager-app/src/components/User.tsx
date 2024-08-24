import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { UserType } from '../types/User';
import { Avatar, Modal } from 'antd';

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
      <div className='d-flex align-items-center'>
        <div>{index + 1}.</div>
        <div className='ms-2'>
          {user.avatar ? (
            <Avatar
              size="large"
              src={user.avatar}
            />
          ) : (
            <Avatar
              size="large"
              icon={<UserOutlined />}
            />
          )}
        </div>
        <div className='ms-3'>{user.username}</div>
        <div className='ms-3 d-none d-md-block'>{user.phone}</div>
      </div>
      <div className='d-flex'>
        <EditOutlined className='mx-1 text-secondary px-2' />
        <DeleteOutlined onClick={handleDelete} className='mx-1 text-danger px-2' />
      </div>
    </div>
  )
}
