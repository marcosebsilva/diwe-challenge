import React, { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
