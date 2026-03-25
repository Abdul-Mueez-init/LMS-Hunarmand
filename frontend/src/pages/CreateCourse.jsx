import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Tag, DollarSign, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import API from '../services/api';
import PageTransition from '../components/PageTransition';

const CreateCourse = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', price: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post('/courses', formData);
      navigate('/instructor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <PageTransition>
      <div className="container-fluid py-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: '800px' }}>
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-center">
            <h2 className="fw-bold tracking-tight text-slate-900 mb-2">Create New Course</h2>
            <p className="text-slate-500 fs-5 mb-0">Follow the steps to publish your curriculum.</p>
          </motion.div>

          {/* Stepper */}
          <div className="d-flex justify-content-between position-relative mb-5 px-sm-5">
            <div className="position-absolute top-50 start-50 translate-middle w-75 bg-slate-200" style={{ height: '2px', zIndex: -1 }}>
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${(step - 1) * 50}%` }} 
                 transition={{ duration: 0.3 }}
                 className="bg-primary h-100"
               />
            </div>
            {[
              { id: 1, label: 'Basic Info', icon: <FileText size={18}/> },
              { id: 2, label: 'Categorization', icon: <Tag size={18}/> },
              { id: 3, label: 'Review', icon: <CheckCircle2 size={18}/> }
            ].map(s => (
              <div key={s.id} className="d-flex flex-column align-items-center bg-slate-50 px-2">
                <div className={`rounded-circle d-flex justify-content-center align-items-center text-white fw-bold mb-2 shadow-sm transition-colors ${step >= s.id ? 'bg-primary' : 'bg-slate-300'}`} style={{ width: '40px', height: '40px' }}>
                  {s.icon}
                </div>
                <span className={`small fw-bold ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-4 p-md-5">
            {error && (
              <div className="alert alert-danger rounded-3 border-0 bg-danger text-white bg-opacity-75 mb-4">
                <span className="fw-medium">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }}>
                    <h4 className="fw-bold text-slate-800 mb-4">Course Details</h4>
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-slate-700">Course Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control form-control-lg bg-slate-50 shadow-none border-0 px-4 py-3" placeholder="e.g. Complete Web Development Bootcamp" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-slate-700">Description</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="form-control bg-slate-50 shadow-none border-0 px-4 py-3" rows="5" placeholder="What will students learn?" required></textarea>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }}>
                    <h4 className="fw-bold text-slate-800 mb-4">Categorization & Pricing</h4>
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-slate-700">Category</label>
                      <div className="input-group input-group-lg">
                         <span className="input-group-text bg-slate-50 border-0 text-slate-400 pe-2"><Tag size={18} /></span>
                         <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-control bg-slate-50 shadow-none border-0 ps-0" placeholder="e.g. Web Development" required />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-slate-700">Price ($)</label>
                      <div className="input-group input-group-lg">
                         <span className="input-group-text bg-slate-50 border-0 text-slate-400 pe-2"><DollarSign size={18} /></span>
                         <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control bg-slate-50 shadow-none border-0 ps-0" placeholder="99" required />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }}>
                    <h4 className="fw-bold text-slate-800 mb-4 text-center">Ready to Publish?</h4>
                    <div className="bg-indigo-50 p-4 rounded-4 mb-4 border border-indigo-100">
                      <h5 className="fw-bold text-slate-900 mb-2">{formData.title || 'Untitled Course'}</h5>
                      <p className="text-muted mb-3">{formData.description || 'No description provided.'}</p>
                      <div className="d-flex gap-3">
                         <span className="badge bg-primary px-3 py-2">{formData.category || 'Uncategorized'}</span>
                         <span className="badge bg-success px-3 py-2">${formData.price || '0'}</span>
                      </div>
                    </div>
                    <p className="text-center text-slate-500 fw-medium">By publishing this course, you agree to our Terms of Service.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                {step > 1 ? (
                  <button type="button" onClick={handleBack} className="btn btn-light border btn-lg rounded-pill px-4 fw-bold text-slate-600 d-flex align-items-center gap-2">
                    <ArrowLeft size={18} /> Back
                  </button>
                ) : <div></div>}
                
                {step < 3 ? (
                  <button type="button" onClick={handleNext} className="btn btn-primary btn-lg rounded-pill px-5 fw-bold d-flex align-items-center gap-2 shadow-sm">
                    Continue <ArrowRight size={18} />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg rounded-pill px-5 fw-bold d-flex align-items-center gap-2 shadow pulse-btn">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Publish Course <CheckCircle2 size={18} /></>}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); } 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); } }
        .pulse-btn:hover { animation: pulse 1.5s infinite; }
      `}} />
    </PageTransition>
  );
};

export default CreateCourse;
