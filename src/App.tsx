import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Directory from './pages/Directory';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import Network from './pages/Network';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import Tools from './pages/Tools';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/network" element={<Network />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;