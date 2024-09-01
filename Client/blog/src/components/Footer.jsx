import React from 'react';
import { Link } from 'react-router-dom';
//import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-600 w-full text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold hover:text-gray-400">
            Blog Platform
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            {/* <FaFacebook /> */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            {/* <FaTwitter /> */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            {/* <FaInstagram /> */}
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            {/* <FaLinkedin /> */}
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-200 mt-4">
        &copy; {new Date().getFullYear()} Blog Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
