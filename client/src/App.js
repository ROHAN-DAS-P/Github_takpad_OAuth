import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IssueList from './components/IssueList';
import PullList from './components/PullList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repo/:id/issues" element={<IssueList />} />
        <Route path="/repo/:id/pull" element={<PullList />} />
      </Routes>
    </Router>
  );
}

export default App;
