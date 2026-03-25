import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit2, ShieldCheck, Book, Award } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const Profile = () => {
  const { userInfo } = useContext(AuthContext);

  const getRoleBadgeColor = () => {
    switch(userInfo.role) {
      case 'admin': return 'bg-danger';
      case 'instructor': return 'bg-info';
      default: return 'bg-primary';
    }
  };

  return (
    <PageTransition>
      <div className="container-fluid py-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <h2 className="fw-bold tracking-tight text-slate-900 mb-1">Profile Settings</h2>
            <p className="text-slate-500 fs-5 mb-0">Manage your personal information and preferences.</p>
          </motion.div>

          <div className="row g-4">
            <div className="col-md-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                className="glass-card text-center p-4 border-top border-4 overflow-hidden"
                style={{ borderTopColor: 'var(--indigo-600)' }}
              >
                <div className="position-relative d-inline-block mb-4 mt-2">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-lg" style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                  <button className="btn btn-sm btn-light rounded-circle shadow position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center p-2 border">
                    <Edit2 size={16} className="text-primary"/>
                  </button>
                </div>
                
                <h4 className="fw-bold text-slate-900 mb-1">{userInfo.name}</h4>
                <p className="text-slate-500 mb-3">{userInfo.email}</p>
                <span className={`badge ${getRoleBadgeColor()} rounded-pill px-4 py-2 text-uppercase tracking-wider fw-bold shadow-sm mb-4`}>
                  {userInfo.role}
                </span>

                <div className="border-top pt-4 text-start">
                  <div className="d-flex align-items-center gap-3 text-slate-600 mb-3">
                    <ShieldCheck size={20} className="text-slate-400" />
                    <span className="fw-medium">Account Status: <span className="text-success fw-bold">Active</span></span>
                  </div>
                  <div className="d-flex align-items-center gap-3 text-slate-600">
                    <Calendar size={20} className="text-slate-400" />
                    <span className="fw-medium">Joined: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-md-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card p-4 p-md-5 mb-4"
              >
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                  <h5 className="fw-bold text-slate-800 mb-0 d-flex align-items-center gap-2">
                    <User className="text-primary" /> Personal Information
                  </h5>
                  <button className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold">Edit Info</button>
                </div>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="text-slate-400 small fw-bold text-uppercase tracking-wider mb-1">Full Name</label>
                    <div className="fw-bold text-slate-900 fs-5 p-3 bg-slate-50 rounded-3 border-start border-primary border-4 shadow-sm">
                      {userInfo.name}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-slate-400 small fw-bold text-uppercase tracking-wider mb-1">Email Address</label>
                    <div className="fw-bold text-slate-900 fs-5 p-3 bg-slate-50 rounded-3 border-start border-primary border-4 shadow-sm text-truncate">
                      {userInfo.email}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-4 p-md-5"
              >
                <h5 className="fw-bold text-slate-800 mb-4 d-flex align-items-center gap-2 border-bottom pb-3">
                  <Award className="text-primary" /> Learning Stats
                </h5>
                <div className="row g-3">
                   <div className="col-6">
                     <div className="bg-indigo-50 p-4 rounded-4 text-center border border-indigo-100">
                       <Book size={32} className="text-indigo-500 mb-2" />
                       <h3 className="fw-bold text-indigo-900 mb-0">12</h3>
                       <p className="text-indigo-600 fw-medium small mb-0">Courses Enrolled</p>
                     </div>
                   </div>
                   <div className="col-6">
                     <div className="bg-success bg-opacity-10 p-4 rounded-4 text-center border border-success border-opacity-25">
                       <Award size={32} className="text-success mb-2" />
                       <h3 className="fw-bold text-success mb-0">3</h3>
                       <p className="text-success fw-medium small mb-0">Certificates</p>
                     </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
