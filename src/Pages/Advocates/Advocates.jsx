import React from "react";
import "./Advocates.css";
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
import UpdateAdvModal from "../../components/UpdateAdvModal/UpdateAdvModal";
import { ToastContainer, toast } from "react-toastify";

const Advocates = () => {
  const [advocates, setAdvocates] = useState(null);

  const [updateModal, setUpdateModal] = useState(false);
  //for modal
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getAllAdvocates = async () => {
      const advocates = await axios.get(
        "http://localhost:4000/admin/getAllAdvocates"
      );
      setAdvocates(advocates.data);
    };
    getAllAdvocates();
  }, []);

  const handleUpdate = (em) => {
    setUpdateModal(true);
    setEmail(em);
  };

  const handleDelete = (email) => {
    axios
      .post(`http://localhost:4000/admin/deleteAdv`, { email })
      .then((res) => {
        toast.error(res.data.success, {
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
      <ToastContainer />
      <h1 className="title">All Registered Advocated</h1>
      {advocates ? (
        <div className="Table">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>License #.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Contact #</TableCell>
                  <TableCell align="left">Area</TableCell>
                  <TableCell align="left">Experience</TableCell>
                  <TableCell align="left">Specialist</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {advocates.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={
                          row.profile_photo !== "Unavailable"
                            ? row.profile_photo
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        }
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "100px",
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.license}
                    </TableCell>
                    <TableCell align="left">
                      {row.name ? row.name : "Dummy"}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.contact}</TableCell>
                    <TableCell align="left">{row.area}</TableCell>
                    <TableCell align="left">{row.experience}</TableCell>
                    <TableCell align="left">{row.interest}</TableCell>
                    <TableCell align="left" className="Details">
                      <span className="status">Active</span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <div className="btn">
                        <div
                          className="edit-btn"
                          onClick={() => handleUpdate(row.email)}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="dlt-btn"
                          onClick={() => handleDelete(row.email)}
                        >
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
      {updateModal && (
        <UpdateAdvModal
          open={open}
          setUpdateModal={setUpdateModal}
          email={email}
        />
      )}
    </div>
  );
};

export default Advocates;
