import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p>&copy; 2026 LMS Hunarmabd. Built with MERN Stack.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="text-light">Privacy Policy</a>
          <a href="#" className="text-light">Terms of Service</a>
          <a href="#" className="text-light">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
