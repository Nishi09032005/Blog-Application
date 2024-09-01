import React, { useEffect, useState } from 'react'
import { useAuth } from '../storage/auth'


export default function Category() {
    const [title,setTitle] = useState('')
    const [categories,setCategories] = useState([])
    const [message,setMessage] = useState('')

    const {token} = useAuth()

    useEffect(()=>{
        const fetchCategories = async()=>{
            console.log('token',token)
            try {
            const response = await fetch('http://localhost:3000/api/categories/getcategories',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json()
            if (response.ok){
                setCategories(data)
            }else{
                setMessage('Error')
            }
            } catch (error) {
                setMessage('Failed to fetch categories')
            }
        }
        fetchCategories()
    },[token])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/api/categories/addcategories',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify({title:title})
            })
            const data = await response.json()
            if (response.ok){
                setCategories([...categories,data])
                setMessage(data.message)
                setTitle('')
            }else{
                setMessage('Error')
            }
        } catch (error) {
            setMessage('Failed to create category ')
        }
    }
  return (
    
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

    {/* Form to add a new category */}
    <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                Category Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter category title"
                required
            />
        </div>
        <button
            type="submit"
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
        >
            Add Category
        </button>
    </form>

    {/* Display message */}
    {message && <p className="mb-4 text-red-500">{message}</p>}

    {/* List of categories */}
    <h3 className="text-xl font-bold mb-2">Existing Categories</h3>
    <ul className="list-disc list-inside">
        {categories.map((category) => (
            <li key={category._id} className="mb-2">
                {category.title}
            </li>
        ))}
    </ul>
</div>
  )
}
