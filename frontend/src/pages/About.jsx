import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const About = () => {
  return (
    <PageTransition>
      <div className="container py-5 my-md-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill mb-3 fw-bold">Our Mission</div>
              <h2 className="display-5 fw-bold mb-4 text-slate-900 tracking-tight">Transforming the Future of Online Education</h2>
              <p className="lead text-slate-600 mb-4 lh-lg">
                LMS Hunarmabd is a cutting-edge Learning Management System designed to bridge the gap between ambitious students and expert instructors in the tech space. We believe in high-quality, accessible learning for everyone.
              </p>
              
              <div className="d-flex flex-column gap-4 mt-5">
                {[
                  { icon: <Target className="text-primary" size={24}/>, title: 'Goal Oriented', desc: 'Curriculums designed to get you hired.' },
                  { icon: <Users className="text-primary" size={24}/>, title: 'Expert Community', desc: 'Learn directly from industry veterans.' },
                  { icon: <Zap className="text-primary" size={24}/>, title: 'Lightning Fast', desc: 'A seamless, distraction-free platform.' }
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div className="bg-indigo-50 p-3 rounded-circle">{item.icon}</div>
                    <div>
                      <h5 className="fw-bold text-slate-800 mb-1">{item.title}</h5>
                      <p className="text-slate-500 mb-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="position-relative"
            >
              <div className="position-absolute bg-primary rounded-circle blur-3xl opacity-20" style={{ width: '300px', height: '300px', top: '-10%', right: '-10%', filter: 'blur(60px)', zIndex: 0 }}></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="About our team" 
                className="img-fluid rounded-4 shadow-lg position-relative z-1" 
                style={{ objectFit: 'cover', height: '600px', width: '100%' }}
              />
              <div className="glass-card position-absolute bottom-0 start-0 m-4 z-2">
                <h3 className="fw-bold text-slate-900 mb-1">10k+</h3>
                <p className="text-slate-600 mb-0 fw-medium">Active Students</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
