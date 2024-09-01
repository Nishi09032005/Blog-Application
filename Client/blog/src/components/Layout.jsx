import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-center" />
      
      <div className="flex-grow">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
