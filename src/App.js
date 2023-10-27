// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProjects from './Components/AllProjects';
import AdminLogin from './Components/AdminLogin';
import AllTickets from './Components/AllTickets';
import Navbar from './Components/Navbar';
import UserLogin from './Components/UserLogin'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import AllWorklogs from './Components/AllWorklogs';

function App() {
  return (
      <Routes>
        <Route index element={< UserLogin/>} />
        <Route path="navbar" element={<Navbar />}/>
        <Route path="allProjects" element={<AllProjects />} />
        <Route path="/allTickets/:projectId" element={<AllTickets/>} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="/by-ticket/:ticketId" element={<AllWorklogs/>}/>
      </Routes>
  );
}

export default App;
