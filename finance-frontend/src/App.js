import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Charts from './pages/Charts';
import EmailPreferences from './pages/EmailPreferences';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/transactions"
          element={<ProtectedRoute><Transactions /></ProtectedRoute>}
        />
        <Route
          path="/budgets"
          element={<ProtectedRoute><Budgets /></ProtectedRoute>}
        />
        <Route
          path="/reports"
          element={<ProtectedRoute><Reports /></ProtectedRoute>}
        />
        <Route
          path="/charts"
          element={<ProtectedRoute><Charts /></ProtectedRoute>}
        />
        <Route
          path="/email-preferences"
          element={<ProtectedRoute><EmailPreferences /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;