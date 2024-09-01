import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-hot-toast';

function EditPost() {
    const { id: postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        description: '',
        path: ''
    });

    // Fetch the existing post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/upload-image/getPost/${postId}`);
                setPost(response.data);
               
            } catch (error) {
                console.log(error);
            }
        };
        fetchPost();
    }, [postId]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/upload-image/editPost/${postId}`, post);
            toast.success('Updated successfully')
            navigate(`/post/${postId}`);
        } catch (error) {
            console.log(error);
            toast.error('Unable to upload')
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold my-4">Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        className="border px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                        className="border px-3 py-2 w-full"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded">Save Changes</button>
            </form>
        </div>
    );
}

export default EditPost;
