import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mob_no: '',
    upi:'',
    ifsc:'',
    ac_no:''
  });

  useEffect(() => {
    if (localStorage.getItem("id")) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formData);

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}/signup`, config);
      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Successfully Created Account!",
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
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center">Telecalling Team Lead Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="upi" className="form-label">UPI ID</label>
            <input
              type="text"
              className="form-control"
              id="upi"
              value={formData.upi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ifsc" className="form-label">IFSC</label>
            <input
              type="text"
              className="form-control"
              id="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ac_no" className="form-label">Salary Account No.</label>
            <input
              type="text"
              className="form-control"
              id="ac_no"
              value={formData.ac_no}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mob_no"
              value={formData.mob_no}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
