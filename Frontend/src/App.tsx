import './App.css'
import './index.css'
import { Routes, Route } from "react-router";
import About from './Pages/About.tsx';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AccountSetup from './Pages/AccountSetup.tsx';
import JobApplication from './Pages/JobApplication.tsx';
import AssignedJob from './Pages/AssignedJob.tsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/accountSetup" element={<ProtectedRoute><AccountSetup /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />
      <Route path="/jobApplications/:jobApplicationId" element={<JobApplication />} />
      <Route path="/assignedJobs/:assignedJobId" element={<AssignedJob />} />
    </Routes>
  )
}

export default App
