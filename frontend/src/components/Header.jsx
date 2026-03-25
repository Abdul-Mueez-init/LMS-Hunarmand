import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen, User, LogOut, ChevronDown, Menu, MonitorPlay } from 'lucide-react';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="navbar navbar-expand-lg sticky-top glass-card rounded-0 border-top-0 border-start-0 border-end-0 py-3 z-3 bg-white"
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary text-white p-2 rounded-3">
            <MonitorPlay size={24} />
          </div>
          <span className="fs-4 ms-1 tracking-tight">LMS <span className="text-primary">Hunarmabd</span></span>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <Menu size={28} className="text-slate-800" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center fw-medium gap-1">
            <li className="nav-item">
              <Link className={`nav-link px-3 py-2 rounded-3 ${location.pathname === '/courses' ? 'bg-primary-soft text-primary' : ''}`} to="/courses">
                <BookOpen size={18} className="me-1 mb-1" /> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 py-2 rounded-3 ${location.pathname === '/about' ? 'bg-primary-soft text-primary' : ''}`} to="/about">
                About
              </Link>
            </li>
            {userInfo ? (
              <li className="nav-item dropdown ms-2">
                <a className="nav-link d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px' }}>
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-900">{userInfo.name.split(' ')[0]}</span>
                  <ChevronDown size={16} className="text-muted" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-2 p-2 glass-card">
                  <li>
                    <Link className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2" to={`/${userInfo.role}-dashboard`}>
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2" to="/profile">
                      <User size={16} /> Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider my-2" /></li>
                  <li>
                    <button className="dropdown-item rounded-3 py-2 text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <div className="d-flex align-items-center gap-2 ms-3">
                <Link className="btn btn-light px-4 py-2 text-slate-800 border" to="/login">Login</Link>
                <Link className="btn btn-primary px-4 py-2 shadow-sm" to="/register">Get Started</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

// Temp fix for missing import in dropdown
import { LayoutDashboard } from 'lucide-react';

export default Header;
