import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../Slice/projectSlice"; // Add setProjectId action
import Navbar from "./Navbar";

const AllProjects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const status = useSelector((state) => state.projects.status);

  useEffect(() => {
      // console.log("Fetching projects...");
      dispatch(fetchProjects())
  }, [dispatch]);

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

  return (
    <div className="Plist">
      <Navbar />
      <h1 className="allprojects">All Projects</h1>
     {status === true && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

        <table className="table table-hover" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Start Date and Time</th>
              <th>End Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectId}>
                <td>{project.projectId}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{formatDateTime(project.start_date)}</td>
                <td>{formatDateTime(project.end_date)}</td>
                <td>
                  <Link
                    to={`/allTickets/${project.projectId}`} // Include project ID in the URL
                    className="btn btn-primary"
                  >
                    Show Tickets
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};
export default AllProjects;
