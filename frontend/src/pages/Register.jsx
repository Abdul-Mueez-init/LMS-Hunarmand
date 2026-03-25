import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await API.post('/users', { name, email, password, role });
      login(data);
      navigate(`/${data.role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="glass-card p-4 p-md-5 border-0 shadow-lg"
            >
              <div className="text-center mb-5">
                <h2 className="fw-bold text-slate-900 tracking-tight">Create an Account</h2>
                <p className="text-slate-500">Join our learning platform today</p>
              </div>
              
              {error && (
                <div className="alert alert-danger rounded-3 border-0 bg-danger text-white bg-opacity-75 d-flex align-items-center gap-2">
                  <span className="fw-medium">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-slate-700">Full Name</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><User size={18} /></span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-slate-50 border-start-0 ps-0 shadow-none" placeholder="John Doe" required />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-bold small text-slate-700">Email Address</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><Mail size={18} /></span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control bg-slate-50 border-start-0 ps-0 shadow-none" placeholder="you@example.com" required />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-bold small text-slate-700">Password</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><Lock size={18} /></span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control bg-slate-50 border-start-0 ps-0 shadow-none" placeholder="••••••••" required />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="form-label fw-bold small text-slate-700">I want to join as a</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><Briefcase size={18} /></span>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select bg-slate-50 border-start-0 ps-0 shadow-none text-slate-700">
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 shadow"
                >
                  {isLoading ? <div className="spinner-border spinner-border-sm"></div> : <>Sign Up <ArrowRight size={18} /></>}
                </button>
              </form>
              
              <p className="mt-4 text-center text-slate-500">
                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none ms-1">Sign In</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
