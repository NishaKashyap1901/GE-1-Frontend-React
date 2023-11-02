import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorklogs } from '../Slice/WorklogSlice';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const headerStyle = {
  backgroundColor: '#34db48', /* Background color */
  color: 'white', /* Text color */
  padding: '20px', /* Padding */
  textAlign: 'center',
  fontSize: '24px', /* Font size */
  fontFamily: 'Arial, sans-serif', /* Font family */
  textShadow: '2px 2px 4px #333', /* Text shadow */
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Box shadow */
  background: 'linear-gradient(45deg,  #000080,#3498db  )',
};

const headerStyle1 = {
  backgroundColor: '#34db48',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px #000000',
  background: 'linear-gradient(45deg, #3498db, #000080)',
};
const pageStyle = {
  backgroundColor: '#ADD8E6', // Light blue background color
};
const tableStyle = {
  backgroundColor: '#ADD8E6', // Light blue background color for the table
  fontSize: '12px',
};
const AllWorklogs = () => {
  const dispatch = useDispatch();
  const { worklogs, status, error } = useSelector((state) => state.worklogs);
  const { ticketId } = useParams(); // Get the projectId from the URL

  useEffect(() => {
    dispatch(fetchWorklogs(ticketId));
  }, [dispatch]);


  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 className="allprojects" style={headerStyle}>Worklogs</h1>
      <Link
                  to={`/calender`}
                  className="btn btn-primary"
                >
                 Calendar
                </Link>
      {status === 'loading' && (
        <div className="d-flex justify-content-center" >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <table className="table table-hover" style={{ ...tableStyle, fontSize: '12px' }}>
          <thead >
            <tr>
              <th>Worklog ID</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration(in minutes)</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map((worklog) => (
              <tr key={worklog.log_id}>
                <td>{worklog.log_id}</td>
                <td>{formatDateTime(worklog.date)}</td>
                <td>{formatDateTime(worklog.start_time)}</td>
                <td>{formatDateTime(worklog.end_time)}</td>
                <td>{worklog.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllWorklogs;
