import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';


const AddPost = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const submitFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const result = await axios.post(
        "http://localhost:4000/api/upload-image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      console.log(result.data);
     toast.success('Uploaded successfully')
     navigate('/posts');
    } catch (error) {
      console.error('Error uploading file and data:', error);
      toast.error('Failed to upload')
    }
  };

  return (
     <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload File and Data</h1>
      <form onSubmit={submitFile} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">File</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Upload
        </button>
      </form>
    // </div>
  );
};

export default AddPost;
