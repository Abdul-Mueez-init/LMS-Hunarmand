import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseListing from './pages/CourseListing';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateCourse from './pages/CreateCourse';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('-dashboard') || location.pathname === '/profile' || location.pathname === '/create-course';

  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-50">
      <Header />
      <div className="d-flex flex-grow-1 position-relative">
        {isDashboard && <Sidebar />}
        <main 
          className="flex-grow-1 w-100 transition-all" 
          style={{ 
            marginLeft: isDashboard ? '260px' : '0',
            // Allow layout nicely on mobile where sidebar is hidden
            paddingBottom: '2rem'
          }}
        >
          {/* Inject container for non-dashboard pages to prevent edge hugging, dashboards manage their own padding */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<CourseListing />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute allowedRoles={['student', 'instructor', 'admin']} />}>
                 <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={['student']} />}>
                <Route path="/student-dashboard" element={<StudentDashboard />} />
              </Route>
              
              <Route element={<PrivateRoute allowedRoles={['instructor']} />}>
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/create-course" element={<CreateCourse />} />
              </Route>
              
              <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
