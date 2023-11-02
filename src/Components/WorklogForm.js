import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorklogToBackend } from '../Slice/WorklogSlice';
import { useParams, useNavigate } from 'react-router-dom';
const headerStyle = {
    backgroundColor: '#004C4E', /* Background color */
    color: 'white', /* Text color */
    padding: '310px', /* Padding */
    textAlign: 'center',
    fontSize: '24px', /* Font size */
    fontFamily: 'Arial, sans-serif', /* Font family */
    textShadow: '2px 2px 4px #333', /* Text shadow */
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Box shadow */
    background: 'linear-gradient(45deg, #005C4E , #00D9C0    )',
  };
const buttonStyle = {
  backgroundColor: '#009688',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const inputLabelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
  display: 'block',
};

const formContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  
  padding: '20px',
  border: '1px solid #009688',
  borderRadius: '10px',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 150, 136, 0.2)',
};

const WorklogForm = () => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    duration: '',
    start_time: '',
    end_time: '',
  });

  
  useEffect(() => {
    if (formData.duration && formData.start_time) {
      const startTime = new Date(formData.start_time);
      console.log("Start Time =", startTime);
  
      const durationInMinutes = parseInt(formData.duration, 10);
      console.log("Duration in minutes =", durationInMinutes);
  
      const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);
      console.log("End Time =", endTime);
  
      // Format 'endTime' in ISO format
      const year = endTime.getFullYear();
      const month = (endTime.getMonth() + 1).toString().padStart(2, '0');
      const day = endTime.getDate().toString().padStart(2, '0');
      const hours = endTime.getHours().toString().padStart(2, '0');
      const minutes = endTime.getMinutes().toString().padStart(2, '0');
      const endTimeISO = `${year}-${month}-${day}T${hours}:${minutes}`;
      console.log("endTimeISO =", endTimeISO);
  
      setFormData({ ...formData, end_time: endTimeISO });
    }
  }, [formData.duration, formData.start_time]);
    

  const handleSubmit = (e) => {
    e.preventDefault();
    const worklogData = {
      ...formData,
      tickets_ticket_id: ticketId,
    };

    dispatch(addWorklogToBackend(ticketId, worklogData))
      .then(() => {
        navigate(`/by-ticket/${ticketId}`);
      })
      .catch((error) => {
        console.error('Error adding worklog:', error);
      });
  };

  return (<div>
    <h2 style={headerStyle}>Add Worklog</h2>
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={inputLabelStyle}>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={inputLabelStyle}>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={inputLabelStyle}>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={inputLabelStyle}>End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            disabled
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Worklog</button>
      </form>
    </div>
    </div>
  );
};

export default WorklogForm;
