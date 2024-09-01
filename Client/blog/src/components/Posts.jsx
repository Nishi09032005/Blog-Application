import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/upload-image/getPost');
        
        setPosts(Array.isArray(response.data.post) ? response.data.post : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Set an empty array on error
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white border rounded-lg overflow-hidden shadow-md">
          <img src={`http://localhost:4000/${post.path}`} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.description}</p>
            <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">Visit</Link> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
