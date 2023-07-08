import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "./UpdateModal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({ open, setUpdateModal, email }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.post(
        "http://localhost:4000/admin/getUserForUpdation",
        {
          email,
        }
      );
      setUserName(user.data.name);
      setUserEmail(user.data.email);
    };
    getUser();
  }, []);

  const handleClose = () => {
    setUpdateModal(false);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:4000/admin/updateUser", {
        email,
        userName,
        userEmail,
      })
      .then(function (response) {
        toast.success(response.data.success, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setUpdateModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
              fontSize: "35px",
              cursor: "pointer",
              backgroundColor: "white",
              padding: "7px",
            }}
            onClick={handleClose}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User Data
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={userName}
                onChange={handleNameChange}
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>

            <div class="form-group">
              <input type="submit" onClick={handleFormSubmit} value="Submit" />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
