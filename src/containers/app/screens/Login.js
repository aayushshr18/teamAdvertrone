import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("id")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}/login`, config);
      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Successfully Logged In!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", result.data.teamLeader?._id);
        window.location.href = "/";
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="card-title text-center">Invoice Form Service Team Lead Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
