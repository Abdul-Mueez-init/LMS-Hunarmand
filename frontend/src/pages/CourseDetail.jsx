import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, User, Tag, Clock, CheckCircle, Shield, Loader2, PlayCircle } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      await API.post('/enroll', { courseId: id });
      alert('Successfully enrolled!');
      navigate('/student-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Loader2 size={48} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );
  
  if (!course) return <div className="container py-5 text-center"><h2 className="text-slate-500">Course not found</h2></div>;

  return (
    <PageTransition>
      <div className="bg-indigo-900 text-white py-5 mb-5 relative overflow-hidden">
        <div className="container position-relative z-1 py-4">
          <div className="row">
            <div className="col-lg-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-3 d-flex gap-2">
                <span className="badge bg-primary px-3 py-2 fs-6">{course.category}</span>
                <span className="badge bg-white text-indigo-900 px-3 py-2 fs-6 d-flex align-items-center gap-1"><Clock size={16} /> Self-paced</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="display-4 fw-bold mb-4 text-white">
                {course.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="fs-5 text-indigo-100 mb-4 lh-lg">
                {course.description}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="d-flex align-items-center gap-4 text-indigo-200">
                <div className="d-flex align-items-center gap-2"><User size={20} /> Created by <span className="text-white fw-bold">{course.instructor?.name || 'Instructor'}</span></div>
                <div className="d-flex align-items-center gap-2"><BookOpen size={20} /> {course.lessons.length} Lessons</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="fw-bold mb-4 text-slate-900 d-flex align-items-center gap-2">
                <BookOpen className="text-primary" /> Course Curriculum
              </h3>
              <div className="glass-card bg-white p-0">
                <ul className="list-group list-group-flush rounded-4">
                  {course.lessons.map((lesson, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-4 px-4 border-bottom">
                      <div className="d-flex align-items-center gap-3">
                         <div className="bg-slate-100 text-slate-400 p-2 rounded-circle d-flex"><PlayCircle size={20} /></div>
                         <span className="fw-medium text-slate-800 fs-5">{lesson.title}</span>
                      </div>
                      <span className="badge bg-slate-100 text-slate-500 rounded-pill px-3 py-2">Locked</span>
                    </li>
                  ))}
                  {course.lessons.length === 0 && <li className="list-group-item py-4 text-center text-muted">No lessons uploaded yet.</li>}
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.5, type: 'spring' }}
              className="glass-card bg-white p-4 sticky-top" 
              style={{ top: '100px', marginTop: '-120px' }}
            >
              <div className="mb-4 bg-slate-100 rounded-3 d-flex align-items-center justify-content-center p-4">
                 <MonitorPlay size={64} className="text-slate-300" />
              </div>
              <h2 className="fw-bold text-slate-900 mb-4 display-5">${course.price}</h2>
              <button onClick={handleEnroll} className="btn btn-primary btn-lg w-100 rounded-pill mb-4 shadow fw-bold fs-5 py-3">
                Enroll Now
              </button>
              
              <div className="d-flex flex-column gap-3">
                <h6 className="fw-bold text-slate-900 mb-2">This course includes:</h6>
                <div className="d-flex align-items-center gap-3 text-slate-600">
                  <PlayCircle size={20} className="text-primary" /> <span>Full lifetime access</span>
                </div>
                <div className="d-flex align-items-center gap-3 text-slate-600">
                  <Shield size={20} className="text-primary" /> <span>Certificate of completion</span>
                </div>
                <div className="d-flex align-items-center gap-3 text-slate-600">
                  <Tag size={20} className="text-primary" /> <span>Premium support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 100% { transform: rotate(360deg); } }`}} />
    </PageTransition>
  );
};

export default CourseDetail;
