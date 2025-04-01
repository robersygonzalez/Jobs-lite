import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AppliedJobs from './pages/user/AppliedJobs';
import PostedJobs from './pages/user/postedjobs';
import NewEditJob from './pages/user/postedjobs/NewEditJob';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import './stylesheets/custom-components.css';
import './stylesheets/layout.css'
import Profile from './pages/user/profile';
import Notifications from './pages/Notifications';
import AllJobs from './pages/admin/AllJobs';
import AllUsers from './pages/admin/AllUsers';
import JobDescription from './pages/JobDescription';

const App = () => {
  const { loading } = useSelector(state => state.alert);
  return (
    <div >
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/job-description/:id" element={<ProtectedRoute><JobDescription /></ProtectedRoute>} />
          <Route path="/applied-jobs" element={<ProtectedRoute><AppliedJobs /></ProtectedRoute>} />
          <Route path="/posted-jobs" element={<ProtectedRoute><PostedJobs /></ProtectedRoute>} />
          <Route path="/posted-jobs/edit/:id" element={<ProtectedRoute><NewEditJob /></ProtectedRoute>} />
          <Route path="/posted-jobs/new" element={<ProtectedRoute><NewEditJob /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><AllJobs /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

