import React, { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../features/userManagementAction";
import { clearErrors, clearMessage } from "../../features/userManagementSlice";
import UpdateUser from "./UpdateUser";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";

export default function UsersList() {
  const dispatch = useDispatch();
  const { users, error, message, loading } = useSelector((state) => state.userManagement);

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
      dispatch(deleteUser(id));
    }
  };

  // 🔹 Show loader while fetching or deleting
  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <UpdateUser open={open} handleClose={handleClose} user={selectedUser} />
      )}
    </div>
  );
}
