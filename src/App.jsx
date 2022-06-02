import React, { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import AddContact from 'pages/AddContact';
import DashboardLayout from 'components/Dashboard/DashboardLayout';

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="add" element={<AddContact />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
