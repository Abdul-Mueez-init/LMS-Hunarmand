import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Book, Users, Settings, PlusCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) return null;

  const getLinks = () => {
    switch(userInfo.role) {
      case 'student':
        return [
          { name: 'My Courses', path: '/student-dashboard', icon: <Book size={20} /> },
          { name: 'Completed', path: '#', icon: <CheckCircle size={20} /> },
          { name: 'Profile Settings', path: '/profile', icon: <Settings size={20} /> }
        ];
      case 'instructor':
        return [
          { name: 'Dashboard', path: '/instructor-dashboard', icon: <LayoutDashboard size={20} /> },
          { name: 'Create Course', path: '/create-course', icon: <PlusCircle size={20} /> },
          { name: 'Earnings', path: '#', icon: <BarChart3 size={20} /> },
          { name: 'Profile Settings', path: '/profile', icon: <Settings size={20} /> }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
          { name: 'User Management', path: '#', icon: <Users size={20} /> },
          { name: 'System Settings', path: '#', icon: <Settings size={20} /> }
        ];
      default: return [];
    }
  };

  return (
    <motion.aside 
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white border-end shadow-sm d-none d-lg-flex flex-column p-4"
      style={{ width: '260px', position: 'fixed', top: '78px', bottom: 0, zIndex: 10, overflowY: 'auto' }}
    >
      <div className="text-xs fw-bold text-muted text-uppercase tracking-wider mb-4 ms-2">
        {userInfo.role} Menu
      </div>
      <div className="d-flex flex-column gap-2">
        {getLinks().map(link => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-4 transition-all border-0 ${isActive ? 'bg-primary-soft text-primary shadow-sm' : 'bg-transparent text-slate-600 hover-bg-light'}`}
            >
              <div className={`${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {link.icon}
              </div>
              <span className={`fw-medium ${isActive ? 'fw-bold' : ''}`}>{link.name}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto p-4 bg-indigo-50 rounded-4 border border-indigo-100 mt-5">
        <h6 className="fw-bold text-indigo-900 mb-1">Need Help?</h6>
        <p className="text-muted small mb-3">Check our documentation or contact support.</p>
        <button className="btn btn-sm btn-primary w-100 rounded-pill">Support Hub</button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
