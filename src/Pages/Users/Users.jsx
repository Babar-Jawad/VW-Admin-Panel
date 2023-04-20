import React from "react";
import "./Users.css";
import axios from "axios";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await axios.get("http://localhost:4000/admin/getAllUsers");
      setUsers(users.data);
    };
    getAllUsers();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/admin/deleteUser/${id}`)
      .then((res) => {
        toast.error(res.data, {
          position: "bottom-center",
          autoClose: 4500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div style={{ paddingTop: "4rem" }}>
      <h1 className="title">All Registered Users</h1>
      <ToastContainer />
      {users ? (
        <div className="Table">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="left">User Email</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {users.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.createdAt ? row.createdAt : "Not given"}
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <span className="status">Active</span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <div className="btn">
                        <div className="edit-btn">
                          <EditIcon />
                        </div>
                        <div className="dlt-btn" onClick={() => handleDelete(row._id)}>
                          <DeleteIcon />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <span style={{ fontSize: "20px" }}>Loading....</span>
      )}
    </div>
  );
};

export default Users;
