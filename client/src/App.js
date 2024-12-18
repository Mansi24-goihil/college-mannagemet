import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import { UserRightsProvider } from './components/UserRightsContext';
import Course from './components/master/Course';
import { MenuProvider } from './components/MenuContext';
import SideNavbar from './components/SideNavbar';
import Login2 from './components/Login2';
import Dashboard from './components/Dashboard';
import Permissions from './components/Permissions';
import Roles from './components/Roles';
import Users from './components/Users';
import UserPermissionsDetail from './components/UserPermissionsDetail';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const About = () => <h2>About Page</h2>;
const Services = () => <h2>Services Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const AppRouter = () => {
  const [menus,setMenus]=React.useState([]);

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='flex'>
      {!isLoginPage && <SideNavbar  />}
      <div className='flex-grow p-4'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login2 setMenus={setMenus}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/master/course" element={<Course />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userpermissiondetail" element={<UserPermissionsDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />


        </Routes>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <UserRightsProvider> {/* Wrap with UserRightsProvider */}
      <MenuProvider>
        <Router>

          <AppRouter/>
        </Router>
      </MenuProvider>
    </UserRightsProvider>
  );
};

export default App;
