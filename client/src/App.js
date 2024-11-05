import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Sidebar from './components/Sidebar';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Employees from './pages/Employees.js';
import './App.css'
import { FadeLoader } from "react-spinners";

import Training from './pages/Trainings';
import Managers from './pages/Managers';

import Start from './pages/Start.js';
import Self from './pages/Self.js';
import Settings from './pages/Settings.js';
import Attendence from './pages/Attendence.js';
import Request from './pages/Request.js';
import Upskill from './pages/Upskill.js';
import Payroll from './pages/Payroll.js';
import Profile from './pages/Profile.js';
import AttendanceCalendar from './components/AttendanceCalender.js';
import useAuth from './hooks/useAuth.js';


const App = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const auth = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000); 
      
  }, []);

  if (!isLoading) {
    return <div style={{ textAlign: 'center', margin: '200px auto' }}>
    <center><FadeLoader color={'#00B4D2'} size={20} /></center>
    <div>Please wait a moment</div>
  </div>
  }
  return (
    <BrowserRouter>
      <AuthProvider>
      <Sidebar>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />} >
          
          <Route path="/home" element={<Home />} />
          <Route path="/self" element={<Self />} />
          <Route path="/employees" element={<Employees />} />
           <Route path='/training' element={<Training />} />
           <Route path='/managers' element={<Managers />} /> 
           <Route path="/settings" element={<Settings />} />
           
           <Route path='/upskill' element={<Upskill />} /> 
           <Route path="/payroll" element={<Payroll />} />
           <Route path='/profile' element={<Profile />} />
           <Route path='/managers' element={<Managers />} /> 
           <Route path='/attendance' element={<AttendanceCalendar />} />
                 
          </Route>
        </Routes>
        </Sidebar>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default App