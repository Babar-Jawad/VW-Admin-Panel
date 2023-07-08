import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "./UpdateAdvModal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateAdvModal({ open, setUpdateModal, email }) {
  const [license, setLicense] = useState(null);
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState(null);
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState(null);
  const [speciality, setSpeciality] = useState("null");

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.post(
        "http://localhost:4000/admin/getAdvocateForUpdation",
        {
          email,
        }
      );
      setLicense(user.data.license);
      setUsername(user.data.name);
      setUserEmail(user.data.email);
      setGender(user.data.gender);
      setContact(user.data.contact);
      setArea(user.data.area);
      setExperience(user.data.experience);
      setSpeciality(user.data.interest);
    };
    getUser();
  }, []);

  const handleClose = () => {
    setUpdateModal(false);
  };

  const handleLicenseChange = (e) => {
    setLicense(e.target.value);
  };
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };
  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:4000/admin/updateAdvocate", {
        email,
        license,
        userName,
        userEmail,
        gender,
        contact,
        area,
        experience,
        speciality,
      })
      .then(function (response) {
        // toast.success(response.data.success, {
        //   position: "bottom-center",
        //   autoClose: 3500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });

        alert(response.data.success);

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
            Update Advocate Data
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="number">License #:</label>
                  <input
                    type="number"
                    id="license"
                    name="license"
                    required
                    value={license}
                    onChange={handleLicenseChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="name">Gender:</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    required
                    value={gender}
                    onChange={handleGenderChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="contact">Contact:</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    value={contact}
                    onChange={handleContactChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="area">Area:</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    required
                    value={area}
                    onChange={handleAreaChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="experience">Experience:</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    required
                    value={experience}
                    onChange={handleExperienceChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div class="form-group">
                  <label for="speciality">Speciality:</label>
                  <input
                    type="text"
                    id="speciality"
                    name="speciality"
                    required
                    value={speciality}
                    onChange={handleSpecialityChange}
                  />
                </div>
              </Grid>
            </Grid>

            <div class="form-group">
              <input type="submit" value="Submit" onClick={handleFormSubmit} />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
