import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorklogs } from '../Slice/WorklogSlice';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const AllWorklogs = () => {
  const dispatch = useDispatch();
  const { worklogs, status, error } = useSelector((state) => state.worklogs);
  const { ticketId } = useParams(); // Get the projectId from the URL

  useEffect(() => {
    dispatch(fetchWorklogs());
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
    <div>
      <Navbar />
      <h1 className="allprojects">Worklogs</h1>
      {status === 'loading' && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <table className="table table-hover" style={{ fontSize: '12px' }}>
          <thead>
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
