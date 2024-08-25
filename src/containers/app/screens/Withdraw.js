import React, { useEffect, useState } from 'react';

const Withdraw = () => {
  const id = localStorage.getItem('id');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const entriesPerPage = 10;
  const maxPageNumbersToShow = 5;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}/myrequests?id=${id}`);
      const data = await response.json();
      if (data.success) {
        setRequests(data.req);
      } else {
        setError('Failed to fetch requests.');
      }
    } catch (err) {
      setError('Error fetching requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URI}/withdraw?id=${id}&amt=${amount}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage(`Withdrawal request successfully created for ${data.req.email}. Amount: ${data.req.amt}`);
          fetchRequests(); 
        } else {
          setMessage(data.error || 'Failed to create withdrawal request. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(requests.length / entriesPerPage);
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          style={{
            padding: '10px 15px',
            margin: '0 2px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: currentPage === i ? '#007bff' : '#fff',
            color: currentPage === i ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const currentEntries = requests.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div style={{ margin: '20px auto', maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxSizing: 'border-box', width: '100%' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Withdraw Amount</h2>
      <form onSubmit={handleWithdraw}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          Withdraw
        </button>
      </form>
      {message && (
        <div style={{ marginTop: '20px', padding: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px' }}>
          {message}
        </div>
      )}
      <h2 style={{ fontSize: '24px', marginTop: '40px', textAlign: 'center' }}>Past Withdrawal Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {currentEntries.length > 0 ? (
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th style={{ padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((request, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ padding: '10px' }}>{request.amt}</td>
                    <td style={{ padding: '10px' }}>{request.status}</td>
                    <td style={{ padding: '10px' }}>{new Date(request.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No withdrawal requests found.</p>
          )}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '10px 15px',
                margin: '0 5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
                color: currentPage === 1 ? '#666' : '#fff',
                cursor: 'pointer',
              }}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(requests.length / entriesPerPage)}
              style={{
                padding: '10px 15px',
                margin: '0 5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: currentPage === Math.ceil(requests.length / entriesPerPage) ? '#ccc' : '#007bff',
                color: currentPage === Math.ceil(requests.length / entriesPerPage) ? '#666' : '#fff',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Withdraw;
