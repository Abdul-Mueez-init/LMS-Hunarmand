import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await API.post('/users/login', { email, password });
      login(data);
      navigate(`/${data.role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="glass-card p-4 p-md-5 border-0 shadow-lg"
            >
              <div className="text-center mb-5">
                <h2 className="fw-bold text-slate-900 tracking-tight">Welcome Back</h2>
                <p className="text-slate-500">Sign in to continue your learning journey</p>
              </div>
              
              {error && (
                <div className="alert alert-danger rounded-3 border-0 bg-danger text-white bg-opacity-75 d-flex align-items-center gap-2">
                  <span className="fw-medium">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-slate-700">Email Address</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><Mail size={18} /></span>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="form-control bg-slate-50 border-start-0 ps-0 shadow-none" 
                      placeholder="you@example.com"
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-bold small text-slate-700 mb-0">Password</label>
                    <Link to="#" className="small text-primary text-decoration-none fw-medium">Forgot password?</Link>
                  </div>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-slate-50 border-end-0 text-slate-400 pe-2"><Lock size={18} /></span>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="form-control bg-slate-50 border-start-0 ps-0 shadow-none" 
                      placeholder="••••••••"
                      required 
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 shadow"
                >
                  {isLoading ? <div className="spinner-border spinner-border-sm"></div> : <>Sign In <ArrowRight size={18} /></>}
                </button>
              </form>
              
              <p className="mt-4 text-center text-slate-500">
                Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none ms-1">Create one</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
