import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTh, FaAdn, FaRegUser } from 'react-icons/fa';
import { MdLogout, MdManageAccounts } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineQuestionCircle, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdModelTraining } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import useAuth from '../hooks/useAuth';
import '../styles/Sidebar.css';
import logo from '../Assets/enfuse-logo.png';
import Swal from 'sweetalert2';
import Attendance from './Attendance';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen] = useState(true);
  const { auth, setAuth } = useAuth();

  const logout = () => {
    setAuth({});
    navigate('/');
    Swal.fire({
      icon: 'success',
      title: 'You have been logged out successfully',
      showConfirmButton: false,
      confirmButtonColor: '#00B4D2',
      timer: 2000,
    });
  };

  const menuItem = [
    {
      path: '/home',
      name: 'Home',
      icon: <AiOutlineUsergroupAdd />,
    },
    {
      path: '/self',
      name: 'Self',
      icon: <AiOutlineUsergroupAdd />,
    },
    {
      path: '/employees',
      name: 'Employees',
      icon: <AiOutlineQuestionCircle />,
    },
    {
      path: '/managers',
      name: 'Managers',
      icon: <AiOutlineQuestionCircle />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <VscFeedback />,
    },
    {
      path: '/departments',
      name: 'Departments',
      icon: <MdModelTraining />,
    },
    {
      path: '/attendance',
      name: 'Attendance',
      icon: <FaTh />,
    },
    {
      path: '/requests',
      name: 'Requests',
      icon: <MdManageAccounts />,
    },
    {
      path: '/upskill',
      name: 'Upskill',
      icon: <FaRegUser />,
    },
    {
      path: '/payroll',
      name: 'Payroll',
      icon: <TbReportAnalytics />,
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: <FaAdn />,
    },
  ];

  // Render Sidebar if auth.role exists, otherwise render children directly
  if (auth.role) {
    return (
      <div>
        <div className="navbar">
        
            <div>
              <img src={logo} alt="logo" width={'150px'}/>
              
            </div>
            <Attendance auth={auth}/>
          <div>
          <button className="icon-button" onClick={logout}>
              <span className="icon-container">
                <MdLogout />
              </span>
              <span className="text">Logout</span>
            </button>
            </div>
        </div>
      
        <div className="container">
          <div style={{ width: isOpen ? '150px' : '25px' }} className="sidebar">
            

            {menuItem.map((item, index) => {
              if (
                (auth.role === 'Admin' &&
                  (item.name === 'Home' ||
                    item.name === 'Employees' ||
                    item.name === 'Managers' ||
                    item.name === 'Departments' ||
                    item.name === 'Approvals' ||
                    item.name === 'Settings' ||
                    item.name === 'Profile')) ||
                (auth.role === 'Manager' &&
                  (item.name === 'Home' ||
                    item.name === 'Employees' ||
                    item.name === 'Upskill' ||
                    item.name === 'Approvals' ||
                    item.name === 'Payroll' ||
                    item.name === 'Profile')) ||
                (auth.role === 'Employee' &&
                  (item.name === 'Self' ||
                    item.name === 'Attendance' ||
                    item.name === 'Requests' ||
                    item.name === 'Payroll'))
              ) {
                return (
                  <NavLink to={item.path} key={index} className="link" activeClassName="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link-text nowrap">{item.name}</div>
                  </NavLink>
                );
              } else {
                return null;
              }
            })}

            
          </div>
          <main className='main'>{children}</main>
        </div>
        <div className="footer">
          <h2>Footer</h2>
        </div>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default Sidebar;
