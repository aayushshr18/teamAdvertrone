import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table } from 'react-bootstrap';

const UserDetails = ({ show, onHide, user }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Mobile No</th>
              <td>{user.mob_no}</td>
            </tr>
            <tr>
              <th>Account No</th>
              <td>{user.account_no}</td>
            </tr>
            <tr>
              <th>IFSC Code</th>
              <td>{user.ifsc_code}</td>
            </tr>
            <tr>
              <th>UPI ID</th>
              <td>{user.upi_id}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{user.balance}</td>
            </tr>
            <tr>
              <th>Accessible Balance</th>
              <td>{user.accessibleBalance}</td>
            </tr>
            <tr>
              <th>Account Status</th>
              <td>{user.account_status}</td>
            </tr>
            <tr>
              <th>Agent Code</th>
              <td>{user.agent_code}</td>
            </tr>
            <tr>
              <th>Referred Agents</th>
              <td>
                <ul>
                  {user?.referred_agent_id?.map(agent => (
                    <li key={agent.id}>{agent.id} - Amount: {agent.amount}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default UserDetails;
