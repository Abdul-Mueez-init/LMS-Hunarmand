import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';
import API from '../services/api';
import PageTransition from '../components/PageTransition';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get('/courses');
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Loader2 size={48} className="text-primary animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <PageTransition>
      <div className="container py-5">
        <div className="mb-5 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fw-bold display-4 text-slate-900 mb-3"
          >
            Explore Our Catalog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted fs-5"
          >
            Find the perfect course to advance your career.
          </motion.p>
        </div>

        <div className="row g-4">
          {courses.length === 0 ? (
            <div className="col-12 text-center py-5">
              <BookOpen size={64} className="text-slate-300 mb-3" />
              <h3 className="text-muted">No courses available right now.</h3>
            </div>
          ) : (
            courses.map((course, idx) => (
              <div key={course._id} className="col-md-6 col-lg-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card h-100 border-0 shadow-sm transition-all overflow-hidden bg-white hover-shadow"
                  style={{ borderRadius: '16px' }}
                >
                  <div className="bg-indigo-50 p-4 d-flex justify-content-center align-items-center" style={{ height: '160px' }}>
                     <MonitorPlay size={48} className="text-primary opacity-50" />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                       <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">
                         {course.category}
                       </span>
                       <span className="fw-bold fs-5 text-slate-900">${course.price}</span>
                    </div>
                    <h4 className="card-title fw-bold text-slate-900 mt-2 mb-3">{course.title}</h4>
                    <p className="card-text text-muted text-truncate mb-4 flex-grow-1">{course.description}</p>
                    
                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top">
                      <div className="d-flex align-items-center text-muted small fw-medium">
                        <UserIcon size={16} className="me-1" /> {course.instructor?.name || 'Instructor'}
                      </div>
                      <Link to={`/courses/${course._id}`} className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold">
                         View <ArrowRight size={16} className="ms-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </div>
      </div>
{/* Temp fix for missing import */}
<style dangerouslySetInnerHTML={{__html: `
@keyframes spin { 100% { transform: rotate(360deg); } }
.hover-shadow:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important; }
`}} />
    </PageTransition>
  );
};

import { MonitorPlay } from 'lucide-react';

export default CourseListing;
