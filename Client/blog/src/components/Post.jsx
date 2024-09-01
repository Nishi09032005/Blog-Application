import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Post() {
    const { id: postId } = useParams(); 
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/upload-image/deletePost/${postId}`); 
            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${postId}`); 
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 border-4 my-10">
            <img src={`http://localhost:4000/${post.path}`} alt={post.title} className="w-full h-64 object-cover" />
            <h1 className="text-3xl font-bold my-4">{post.title}</h1>
            <p className="text-gray-700">{post.description}</p>
            <div className="flex space-x-4 mt-4">
                <button onClick={handleEdit} className="text-blue-600  px-4 py-2 rounded">Edit</button>
                <button onClick={handleDelete} className="text-red-600  px-4 py-2 rounded">Delete</button>
            </div>
        </div>
    );
}

export default Post;
