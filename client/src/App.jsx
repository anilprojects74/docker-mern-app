import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

import AuthRedirect from './layout/AuthRedirect';
import MainLayout from './layout/MainLayout';


import "./index.css"

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={ <MainLayout><Dashboard /></MainLayout>} />
    </Routes>
  )
}

export default App;
