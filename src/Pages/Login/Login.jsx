import React, { useState } from "react";
import "./Login.css";
import Logo from "../../imgs/logo.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/login", {
        email,
        password,
      })
      .then(function (response) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          console.log("error");
          toast.error(response.data, {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{ paddingTop: "4rem" }}>
      <ToastContainer />
      <div class="login-page">
        <div class="form">
          <h1>Admin Login</h1>
          <img
            style={{ height: "70px", width: "70px", marginBottom: "15px" }}
            src={Logo}
            alt="Logo"
          />
          <form class="login-form">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
