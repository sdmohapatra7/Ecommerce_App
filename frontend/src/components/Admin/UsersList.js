import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../features/userManagementAction";
import { clearErrors, clearMessage } from "../../features/userManagementSlice";
import UpdateUser from "./UpdateUser";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import "./UsersList.css";

export default function UsersList() {
  const dispatch = useDispatch();
  const { users, error, message, loading } = useSelector(
    (state) => state.userManagement
  );

  const [selectedUser, setSelectedUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)).then(() => {
        dispatch(getAllUsers()); // refresh list
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="usersListTable">
      <h2>Users List</h2>
      {users?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={
                      user.role === "admin" ? "adminRole" : "userRole"
                    }
                  >
                    {user.role}
                  </span>
                </td>
                <td className="actionsCell">
                  <button className="editBtn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {selectedUser && (
        <UpdateUser open={open} handleClose={handleClose} user={selectedUser} />
      )}
    </div>
  );
}
