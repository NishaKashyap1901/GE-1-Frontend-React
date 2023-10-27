
import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTicketsByProject } from "../Slice/ticketSlice";
import WorklogsModal from "./WorklogsModal";
import TicketModal from "./TicketModal";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

const AllTickets = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  // console.log("All tickets",tickets)
  const status = useSelector((state) => state.tickets.status);
  const { projectId } = useParams(); // Get the projectId from the URL
  const [prId, setprId] = useState(projectId);

  useEffect(() => {
    
      // console.log("Fetching tickets...");
      setprId(projectId);
      dispatch(fetchTicketsByProject(projectId)); // Pass the projectId
  }, [dispatch]); // Add projectId as a dependency
  
  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  // Function to open the modal
  const openWorklogsModal = () => {
    setModalOpen(true);
  };
  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  return (
    <div>
     <Navbar />
      <h1 className="allprojects">All Tickets</h1>
      <center><button
      className="btn btn-primary"
      onClick={() => openTicketModal()}>
      Add Ticket
      </button></center>
      {status === "loading" && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
        <div>
          <table className="table table-hover" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date and Time</th>
                <th>End Date and Time</th>
                <th>Add Log</th>
                <th>View log</th>
              </tr>

            </thead>
           <tbody>
           {tickets.map((ticket) => (
  <tr key={ticket.ticketId}>
    <td>{ticket.ticketId}</td>
    <td>{ticket.title}</td>
    <td>{ticket.desciption}</td>
    <td>{formatDateTime(ticket.start_time)}</td>
    <td>{formatDateTime(ticket.end_time)}</td>
    <td>
      <button className="btn btn-primary" onClick={() => openWorklogsModal(ticket.ticketId)}>
        Add Worklogs
      </button>
    </td>
    <td>
      <Link to={`/by-ticket/${ticket.ticketId}`} className="btn btn-warning">View Worklogs</Link>
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
{isModalOpen && (
  <WorklogsModal
    isOpen={isModalOpen}
    onRequestClose={() => setModalOpen(false)}
  />
)}
{isTicketModalOpen && (
  <TicketModal
    isOpen={isTicketModalOpen}
    onRequestClose={() => setTicketModalOpen(false)}
  />
)}
    </div>
  );
};
export default AllTickets;



