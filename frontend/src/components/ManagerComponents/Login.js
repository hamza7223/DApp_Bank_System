import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, customerSignin } from "../../server/axiosApi";
import axios from "axios";
import backgroundImage from "../../Cover.jpeg";

const defaultValue = { username: "", password: "" };

const Login = ({ loginHandler }) => {
  const [loginData, setLoginData] = useState(defaultValue);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    if (isChecked) {
      localStorage.setItem("AsManager", true);
      const res = await signin(loginData);
      console.log(res);
      if (res) {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        console.log(axios.defaults.headers);
        loginHandler();
        navigate("/");
      }
    } else {
      localStorage.setItem("AsManager", false);
      const res = await customerSignin(loginData);
      console.log(res);
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("CustomerID", res.data.user._id);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        console.log(axios.defaults.headers);
        loginHandler();
        navigate("/");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",

        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 style={{ color: "white" }}>SignIn Page</h1>
        <br />
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Username"
            name={"username"}
            onChange={handleChange}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid gray",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name={"password"}
            onChange={handleChange}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid gray",
              fontSize: "16px",
            }}
          />
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck"
              onChange={handleCheckboxChange}
            />
            <label
              className="form-check-label"
              htmlFor="exampleCheck"
              style={{ color: "white" }}
            >
              Login as Manager
            </label>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              fontSize: "20px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
