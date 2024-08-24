import { useEffect, useState } from "react";
import User from "./User";
import { UserType } from "../types/User";
import { deleteUser, getUsers } from "../services/api";
import { Input } from "antd";

export default function UsersList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(false);
      setError(null);
      try {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);
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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <div className='sticky-top bg-white'>
        <h3 className='py-3 text-center'>Users Manager App</h3>
        <div className="d-flex pb-3">
          <Input
            type="text"
            placeholder="Tìm kiếm user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button className="border-0 rounded ms-1 col-2 col-md-1"><i className="fa-solid fa-plus"></i></button>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 && !loading && !error && <p>No users found</p>}
      {users.length > 0 && (
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
    </div>
  )
}
