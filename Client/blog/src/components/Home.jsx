import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/add-post'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative  md:h-96">
          <img 
            src="https://images.freecreatives.com/wp-content/uploads/2015/03/Huge-Backgrounds-17.jpg" 
            alt="Blogging Woman"
            className="absolute inset-0  bg-cover object-cover w-full h-full"
          />
        </div>
        <div className="p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Our Blogging Platform</h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Discover a world of insightful articles, creative stories, and thought-provoking blogs. Our platform
            connects you with a vibrant community of writers and readers. Whether you're here to share your thoughts
            or explore new ideas, you'll find a home here.
          </p>
          <button 
            onClick={handleGetStarted} 
            className="bg-gray-600 text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-gray-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
