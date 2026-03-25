import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, MonitorPlay, ShieldCheck, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <div className="bg-slate-50 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
          <div className="position-absolute rounded-circle bg-indigo-500 opacity-10" style={{ width: '600px', height: '600px', top: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
          <div className="position-absolute rounded-circle bg-primary opacity-10" style={{ width: '400px', height: '400px', bottom: '10%', right: '-5%', filter: 'blur(60px)' }}></div>
        </div>

        <div className="container py-5 text-center position-relative z-1" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="d-inline-flex align-items-center gap-2 bg-white text-primary px-4 py-2 rounded-pill shadow-sm mb-4 border border-primary-subtle fw-bold"
              >
                <span className="badge bg-primary rounded-pill">New</span> The future of learning is here
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="display-3 fw-bold mb-4 tracking-tight text-slate-900"
              >
                Empower Your Learning with <span className="text-primary">LMS Hunarmabd</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lead mb-5 text-slate-600 px-md-5 fs-4"
              >
                A professional, high-end platform for students to learn, instructors to share, and admins to manage knowledge effortlessly.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="d-flex flex-column flex-sm-row justify-content-center gap-3"
              >
                <Link to="/courses" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2">
                  Explore Courses <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="btn btn-light bg-white border btn-lg rounded-pill px-5 py-3 shadow-sm text-slate-800 fw-bold">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container py-5 mt-5 position-relative z-1">
          <div className="row g-4 text-center justify-content-center">
            {[
              { title: "Learn for Students", desc: "Access hundreds of courses at your fingertips and track your progress daily.", icon: <GraduationCap size={32} /> },
              { title: "Teach for Instructors", desc: "Build beautiful lessons, upload videos, and reach thousands of students worldwide.", icon: <MonitorPlay size={32} /> },
              { title: "Manage for Admin", desc: "Powerful analytics and user management tools to control everything in one place.", icon: <ShieldCheck size={32} /> }
            ].map((feature, idx) => (
              <div className="col-md-4" key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card h-100 p-5 d-flex flex-column align-items-center"
                >
                  <div className="mb-4 bg-primary-soft text-primary p-4 rounded-circle d-inline-flex">
                    {feature.icon}
                  </div>
                  <h3 className="fw-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-500 mb-0 fs-5">{feature.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
