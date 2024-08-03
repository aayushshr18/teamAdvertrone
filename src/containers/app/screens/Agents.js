import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserDetails from "./components/UserDetails";
import { Table } from "react-bootstrap";

const Agents = () => {
  const [agentCode, setAgentCode] = useState("");
  const [agentsList, setAgentsList] = useState([]);
  const [user, setUser] = useState({});
  const id = localStorage.getItem("id");
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const loadLeads = async () => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/agents?id=${id}`,
        config
      );
      const data = await response.json();
      setAgentsList(data.members);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/addagent?id=${id}&agentCode=${agentCode}`,
        config
      );
      const data = await response.json();
      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Agent added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
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

  const handleRemSubmit = async (event) => {
    event.preventDefault();
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/remagent?id=${id}&agentCode=${agentCode}`,
        config
      );
      const data = await response.json();
      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Agent removed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
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
    <div className="container mt-5">
      <div className="col">
        {/* Add Agent Form */}
        <div className="col-md-6">
          <div className="card p-3">
            <h2 className="card-title">Add Agent</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="agentCode" className="form-label">
                  Agent Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="agentCode"
                  value={agentCode}
                  onChange={(e) => setAgentCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Agent
              </button>
            </form>
          </div>
        </div>

        {/* Agents List */}
        <div className="mt-5">
          <div className="card p-3">
            <h1 className="my-4">Agents List</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Code</th>
                  <th>*</th>
                </tr>
              </thead>
              <tbody>
                {agentsList?.map((agent) => (
                  <tr key={agent?.id} style={{ cursor: "pointer" }}>
                    <td>{agent?.name}</td>
                    <td>{agent?.agent_code}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          setAgentCode(agent.agent_code);
                          handleRemSubmit(e);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          setUser(agent);
                          handleShow();
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <UserDetails show={showModal} onHide={handleClose} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
