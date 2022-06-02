import React, { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import DashboardHome from 'pages/DashboardHome';

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<DashboardHome />} />
    </Routes>
  );
}

export default App;
