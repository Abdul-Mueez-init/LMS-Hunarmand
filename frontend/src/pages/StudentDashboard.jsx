import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Clock, ArrowRight, PlayCircle, Loader2 } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await API.get('/enroll/my-courses');
        setEnrollments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

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
            Welcome back, {userInfo.name.split(' ')[0]} <span className="fs-3">👋</span>
          </h2>
          <p className="text-slate-500 fs-5">Let's continue your learning journey.</p>
        </motion.div>

        <div className="row g-4 mb-5">
          {[
            { title: 'Enrolled Courses', value: enrollments.length, icon: <BookOpen size={24} />, color: 'primary' },
            { title: 'Completed Courses', value: '0', icon: <Trophy size={24} />, color: 'success' },
            { title: 'Hours Learned', value: '12.5', icon: <Clock size={24} />, color: 'info' }
          ].map((stat, idx) => (
            <div className="col-md-4" key={idx}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * idx }}
                className="glass-card p-4 d-flex align-items-center gap-4"
              >
                <div className={`bg-${stat.color}-soft text-${stat.color} p-3 rounded-circle d-flex`}>
                  {stat.icon}
                </div>
                <div>
                  <h2 className="fw-bold mb-0 text-slate-900">{stat.value}</h2>
                  <p className="text-slate-500 mb-0 fw-medium">{stat.title}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <h3 className="fw-bold text-slate-900 mb-4">My In-Progress Courses</h3>
        <div className="row g-4">
          {enrollments.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-12">
               <div className="glass-card p-5 text-center border-dashed">
                 <div className="bg-slate-100 text-slate-400 p-4 rounded-circle d-inline-flex mb-3">
                   <BookOpen size={48} />
                 </div>
                 <h4 className="fw-bold text-slate-800">No courses yet</h4>
                 <p className="text-slate-500 mb-4">You haven't enrolled in any courses. Explore the catalog to start learning.</p>
                 <Link to="/courses" className="btn btn-primary rounded-pill px-4 py-2 fw-medium shadow-sm">
                   Browse Courses
                 </Link>
               </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {enrollments.map((enrollment, idx) => (
                <motion.div 
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="col-xl-4 col-md-6"
                >
                  <div className="glass-card h-100 p-0 overflow-hidden group hover-shadow-lg transition-all border border-slate-200">
                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                         <span className="badge bg-indigo-50 text-indigo-700 rounded-pill px-3 py-2 fw-semibold">
                           {enrollment.course.category}
                         </span>
                         <div className="bg-slate-100 p-2 rounded-circle text-slate-400 group-hover-primary transition-colors">
                           <PlayCircle size={20} />
                         </div>
                      </div>
                      <h5 className="fw-bold text-slate-900 mb-4 line-clamp-2" style={{ minHeight: '48px' }}>
                        {enrollment.course.title}
                      </h5>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between text-sm mb-2 fw-medium text-slate-600">
                           <span>Progress</span>
                           <span className="text-primary fw-bold">{enrollment.progress}%</span>
                        </div>
                        <div className="progress bg-slate-100 overflow-hidden" style={{ height: '8px', borderRadius: '4px' }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${enrollment.progress}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="bg-primary h-100 rounded-pill"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 border-top d-flex justify-content-between align-items-center">
                      <span className="text-xs text-slate-500 fw-medium">Last accessed: Today</span>
                      <Link to={`/courses/${enrollment.course._id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold d-flex align-items-center gap-1">
                        Continue <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
{/* Temp styling until global css catches up */}
<style dangerouslySetInnerHTML={{__html: `
.group-hover-primary { transition: color 0.3s ease; }
.hover-shadow-lg:hover .group-hover-primary { color: var(--indigo-600) !important; background-color: var(--indigo-50) !important; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.border-dashed { border: 2px dashed var(--slate-300) !important; }
`}} />
    </PageTransition>
  );
};

export default StudentDashboard;
