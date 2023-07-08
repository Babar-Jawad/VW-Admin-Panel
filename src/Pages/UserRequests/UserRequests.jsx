import React from "react";
import "./UserRequests.css";

import axios from "axios";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";

const UserRequests = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAllRequests = async () => {
      const requests = await axios.get(
        "http://localhost:4000/admin/getRequests"
      );
      setData(requests.data);
    };
    getAllRequests();
  }, []);
  return (
    <div style={{ paddingTop: "4rem" }}>
      <h1 className="title">All user requests</h1>
      <ToastContainer />
      {data ? (
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
                  <TableCell align="left">Message</TableCell>

                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.message}</TableCell>
                    <TableCell align="left" className="Details">
                      <Button variant="contained" color="success">
                        <a
                          href={`mailto:${row.email}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Reply
                        </a>
                      </Button>
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

export default UserRequests;
