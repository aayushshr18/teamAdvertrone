import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {

  const squareBoxStyle = {
    paddingTop: '100%', // 1:1 Aspect Ratio
    position: 'relative',
  };

  const cardBodyStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const userInfoStyle = {
    marginBottom: '2rem',
    textAlign: 'left',
    border: '2px solid darkBlue',
    padding: '20px'
  };

  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const id = localStorage.getItem("id");

  const loadLeads = async () => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/dashboard?id=${id}`,
        config
      );
      const result = await response.json();
      setData(result.data);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(!id||id===''){
      window.location.href='/#/login'
    }
    loadLeads();
  }, []);

  return (
    <div className="container mt-5" >
      <div style={userInfoStyle}>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.mob_no}</p>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card text-white bg-primary" style={squareBoxStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title">Total Team Members</h5>
              <p className="card-text">{data.totalTeam}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card text-white bg-success" style={squareBoxStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title">Total Balance</h5>
              <p className="card-text">{data.totalBalance}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card text-white bg-warning" style={squareBoxStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title">Total Leads</h5>
              <p className="card-text">{data.totalLeads}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card text-white bg-danger" style={squareBoxStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title">Current Balance</h5>
              <p className="card-text">{data.currBalance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
