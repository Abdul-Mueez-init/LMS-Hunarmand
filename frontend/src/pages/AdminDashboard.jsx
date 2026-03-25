import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MonitorPlay, DollarSign, Search, Trash2, Shield, UserX, Loader2 } from 'lucide-react';
import API from '../services/api';
import PageTransition from '../components/PageTransition';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, courseData] = await Promise.all([
          API.get('/users'),
          API.get('/courses')
        ]);
        setUsers(userData.data);
        setCourses(courseData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Total Users', value: users.length, icon: <Users size={24}/>, color: 'primary' },
    { title: 'Total Courses', value: courses.length, icon: <MonitorPlay size={24}/>, color: 'success' },
    { title: 'Total Revenue', value: '$' + courses.reduce((acc, c) => acc + c.price, 0), icon: <DollarSign size={24}/>, color: 'info' }
  ];

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Loader2 size={48} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <PageTransition>
      <div className="container-fluid py-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <h2 className="fw-bold tracking-tight text-slate-900 mb-1 d-flex align-items-center gap-2">
            <Shield className="text-primary" /> Admin Overview
          </h2>
          <p className="text-slate-500 fs-5">System analytics and user management.</p>
        </motion.div>

        <div className="row g-4 mb-5">
          {stats.map((stat, idx) => (
            <div className="col-md-4" key={idx}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * idx }}
                className="glass-card p-4 d-flex align-items-center gap-4 border-start border-4"
                style={{ borderStartColor: `var(--${stat.color})` }}
              >
                <div className={`bg-${stat.color}-soft text-${stat.color} p-3 rounded-circle d-flex`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-slate-500 mb-0 fw-medium text-uppercase tracking-wider small">{stat.title}</p>
                  <h2 className="fw-bold mb-0 text-slate-900">{stat.value}</h2>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-0 overflow-hidden"
        >
          <div className="bg-slate-50 border-bottom p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
             <h5 className="fw-bold text-slate-800 mb-0 d-flex align-items-center gap-2">
               <Users className="text-primary" size={20} /> User Directory
             </h5>
             <div className="position-relative" style={{ maxWidth: '350px', width: '100%' }}>
               <Search className="position-absolute text-slate-400" size={18} style={{ left: '12px', top: '12px' }} />
               <input 
                 type="text" 
                 className="form-control rounded-pill ps-5 bg-white shadow-sm border-0" 
                 placeholder="Search by name or email..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 border-0">
              <thead className="bg-light text-slate-500 text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.75rem' }}>
                <tr>
                  <th className="px-4 py-3 border-0">User Details</th>
                  <th className="px-4 py-3 border-0">Role</th>
                  <th className="px-4 py-3 border-0">Joined</th>
                  <th className="px-4 py-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                    className="border-bottom transition-colors hover-bg-light"
                  >
                    <td className="px-4 py-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '40px', height: '40px' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="d-flex flex-column">
                          <span className="fw-bold text-slate-900">{user.name}</span>
                          <span className="text-muted small">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`badge rounded-pill px-3 py-2 fw-medium ${
                        user.role === 'admin' ? 'bg-danger-subtle text-danger' : 
                        user.role === 'instructor' ? 'bg-info-subtle text-info' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 fw-medium">
                      {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-end">
                      <button 
                        onClick={() => deleteUser(user._id)} 
                        className="btn btn-sm btn-light rounded-pill text-danger border shadow-sm hover-danger px-3 d-inline-flex align-items-center gap-2"
                        disabled={user.role === 'admin'}
                      >
                        <UserX size={16} /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div className="text-slate-400 mb-3"><Search size={48} /></div>
                      <span className="fw-medium text-slate-500">No users found matching your search.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
