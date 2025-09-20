import { useState, useEffect } from "react";
import axios from "axios";
import CustomModal from "../../../components/CustomModal";
import CreateUser from "./CreateUser";
import { API_BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import ChangeStatus from "./ChangeStatus";

const Users = () => {
  const [visible, setVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user`);
      setUsers(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    }
  };

  // Create/Edit user Handlers
  const handleOpenAdd = () => {
    setVisible(true);
    setIsEdit(false);
    setSelectedUser(null);
  };

  const handleOpenEdit = (data) => {
    setIsEdit(true);
    setVisible(true);
    setSelectedUser(data);
  };

  const handleClose = () => {
    setVisible(false);
    setIsEdit(false);
    setSelectedUser(null);
  };

  // Change Status Handlers
  const handleStatusOpen = (data) => {
    setStatusVisible(true);
    setSelectedUser(data);
  };

  const handleStatusClose = () => {
    setStatusVisible(false);
    setSelectedUser([]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      {/* Create/Update Modal */}
      <CustomModal
        open={visible}
        handleClose={handleClose}
        title={isEdit ? "Edit User" : "Create User"}
      >
        <CreateUser
          handleClose={handleClose}
          isEdit={isEdit}
          refreshUsers={fetchUsers}
          selectedUser={selectedUser}
        />
      </CustomModal>

      {/* Change Status Modal */}
      <CustomModal
        open={statusVisible}
        handleClose={handleStatusClose}
        title="Change Status"
      >
        <ChangeStatus
          handleClose={handleStatusClose}
          refreshUsers={fetchUsers}
          selectedUser={selectedUser}
        />
      </CustomModal>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-amber-800">Users</h2>
        <button
          onClick={handleOpenAdd}
          className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
        >
          + Create User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded border shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-amber-100 text-amber-800">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Mobile</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.user_id} className="hover:bg-amber-50">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleStatusOpen(user)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border px-4 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
