import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Components/Dashboard";
import JobApplicationPage from "./Components/Job";
import HomePage from "./Components/ResumeUpload";
import SoftSkillsForm from "./Components/SoftSkills";
import Login from "./Components/login";
import Location from "./Components/location";
import Hardskills from "./Components/Hardskills";
import Aisim from "./Components/Aisim";
import Linkd from "./Components/Linkd";
import Tech from "./Components/Tech";
import Landing from "./Components/Landing";
import Reverse from "./Components/Reverse";
import QA from "./Components/QA";
import MockInterview from "./Components/MockInterview";
import HRDashboard from "./Components/HRDashboard";
import HRJobDetail from "./Components/HRJobDetail";
import HRAddJob from "./Components/HRAddJob";
import Portfolio from "./Components/Portfolio";
const AppContainer = styled.div`
  // display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
  background-color: #c5e8e0;
`;


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
        <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job" element={<JobApplicationPage />} />
          <Route path="/resume" element={<HomePage />} />
          <Route path="/softskills" element={<SoftSkillsForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
          <Route path="/hardskills" element={<Hardskills />} />
          <Route path="/aisim" element={<Aisim />} />
          <Route path="/linkd" element={<Linkd/>} />
          <Route path="/tech" element={<Tech/>} />
           <Route path="/reverse" element={<Reverse/>} />
           <Route path="/qa" element={<QA/>} />
           <Route path="/mock-interview" element={<MockInterview/>} />
           <Route path="/portfolio" element={<Portfolio/>} />
           <Route path="/hr-dashboard" element={<HRDashboard/>} />
           <Route path="/hr-job-detail/:id" element={<HRJobDetail/>} />
           <Route path="/hr-add-job" element={<HRAddJob/>} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;