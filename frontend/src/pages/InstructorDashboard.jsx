import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Edit3, Trash2, Tag, Search, BookOpen, Loader2 } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const { data } = await API.get('/courses');
        setCourses(data.filter(c => c.instructor._id === userInfo._id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorCourses();
  }, [userInfo._id]);

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await API.delete(`/courses/${id}`);
        setCourses(courses.filter(c => c._id !== id));
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Loader2 size={48} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <PageTransition>
      <div className="container-fluid py-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h2 className="fw-bold tracking-tight text-slate-900 mb-1">Instructor Dashboard</h2>
            <p className="text-slate-500 fs-5 mb-0">Manage your published courses and curriculum.</p>
          </div>
          <Link to="/create-course" className="btn btn-primary btn-lg rounded-pill shadow-lg d-flex align-items-center gap-2 px-4 py-3 fw-bold">
            <PlusCircle size={20} /> Create New Course
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-0 overflow-hidden"
        >
          <div className="bg-slate-50 border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold text-slate-800 d-flex align-items-center gap-2 mb-0">
               <BookOpen className="text-primary" size={20} /> Published Courses ({courses.length})
            </h5>
            <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
              <Search className="position-absolute text-slate-400" size={18} style={{ left: '12px', top: '12px' }} />
              <input 
                type="text" 
                className="form-control rounded-pill ps-5 bg-white shadow-sm border-0" 
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 border-0">
              <thead className="bg-light text-slate-500 text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.75rem' }}>
                <tr>
                  <th className="px-4 py-3 border-0">Course Title</th>
                  <th className="px-4 py-3 border-0">Category</th>
                  <th className="px-4 py-3 border-0">Price</th>
                  <th className="px-4 py-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, idx) => (
                  <motion.tr 
                    key={course._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                    className="border-bottom transition-colors hover-bg-light"
                  >
                    <td className="px-4 py-4">
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-slate-900 fs-6">{course.title}</span>
                        <span className="text-muted small text-truncate" style={{ maxWidth: '300px' }}>{course.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="badge bg-indigo-50 text-indigo-700 rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-1">
                        <Tag size={12} /> {course.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="fw-bold text-slate-900">${course.price}</span>
                    </td>
                    <td className="px-4 py-4 text-end">
                      <button className="btn btn-sm btn-light rounded-circle text-primary border me-2 shadow-sm" title="Edit Course">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => deleteCourse(course._id)} className="btn btn-sm btn-light rounded-circle text-danger border shadow-sm hover-danger" title="Delete Course">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div className="text-slate-400 mb-3"><BookOpen size={48} /></div>
                      <span className="fw-medium text-slate-500">No courses found matching your criteria.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hover-danger:hover { background-color: #fee2e2 !important; border-color: #ef4444 !important; }
      `}} />
    </PageTransition>
  );
};

export default InstructorDashboard;
