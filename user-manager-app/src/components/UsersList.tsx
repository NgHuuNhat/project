import { useEffect, useState } from "react";
import User from "./User";
import { UserType } from "../types/User";
import { createUser, deleteUser, getUsers } from "../services/api";
import { Input, Modal, Form, Radio, DatePicker, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function UsersList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [showNoUsersFound, setShowNoUsersFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(false);
      setError(null);
      try {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setShowNoUsersFound(true);
        } else {
          setShowNoUsersFound(false);

        }
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    } catch (error) {
      setError('Failed to delete user');
    }
  }

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const isUsernameTaken = users.some(user => user.username === values.username);
      if (isUsernameTaken) {
        message.error('Username đã được sử dụng!');
        return;
      }

      await createUser({ ...values, id: new Date().getTime().toString() });
      setUsers(prevUsers => [...prevUsers, { ...values, id: new Date().getTime().toString() }]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('Thêm user thành công');
    } catch (error) {
      message.error('Thêm user thất bại!');
    }
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <div className='bg-white'>
        <h3 className='py-3 text-center'>Users Manager App</h3>
        <div className="d-flex pb-3">
          <Input
            type="text"
            placeholder="Tìm kiếm user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button onClick={handleAddUser} className="border-0 rounded ms-1 col-2 col-md-1"><i className="fa-solid fa-plus"></i></button>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showNoUsersFound && !loading && !error && <p>No users found</p>}
      {users && users.length > 0 && !loading && !error && (
        <div className='my-3 px-1 rounded'>
          {filteredUsers.map((user, index) => (
            <User
              key={user.id}
              user={user}
              index={index}
              onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal
        className="top-0"
        title="Thêm user mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginTop: '10px' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: 'USER' }} // Role mặc định là USER
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng nhập confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Radio.Group>
              <Radio value="USER">User</Radio>
              <Radio value="ADMIN">Admin</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>


  )
}
