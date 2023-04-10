import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

import { useEffect, useState } from "react";
import axios from "axios";
import BasicModal from "../Modal/Modal";

// const makeStyle = (status) => {
//   if (status === "Approved") {
//     return {
//       background: "rgb(145 254 159 / 47%)",
//       color: "green",
//     };
//   } else if (status === "Pending") {
//     return {
//       background: "#ffadad8f",
//       color: "red",
//     };
//   } else {
//     return {
//       background: "#59bfff",
//       color: "white",
//     };
//   }
// };

export default function BasicTable() {
  const [users, setUsers] = useState(null);
  const [flag, setFlag] = useState(false);
  const [img, setImg] = useState("");

  const handleModalClick = (img) => {
    setImg(img);
    setFlag(!flag);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const users_ = await axios.get(
        "http://localhost:4000/admin/getAll_Users_For_Adv_role"
      );
      setUsers(users_.data);
    };
    getAllUsers();
  }, []);

  return (
    <div className="Table">
      {flag && <BasicModal handleModalClick={handleModalClick} img={img} />}
      <h3>Recent Requests for advocate Role</h3>
      {users ? (
        <div className="Table">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">User Email</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Image</TableCell>
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
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.createdAt ? row.createdAt : "Not given"}
                    </TableCell>
                    <TableCell align="left">
                      <img
                        src={row.image_url}
                        style={{
                          height: "50px",
                          width: "100px",
                          cursor: "pointer",
                        }}
                        alt=""
                        onClick={() => handleModalClick(row.image_url)}
                      />
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <span className="adv_status">Pending</span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <div className="btn">
                        <div className="edit-btn">Accept</div>
                        <div className="dlt-btn">Reject</div>
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
}
