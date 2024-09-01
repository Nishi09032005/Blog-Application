import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { toast } from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
  });
 const navigate = useNavigate()
 const {storeTokenInLs}=useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();  
    try {
        const response = await fetch("http://localhost:4000/api/user/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json();
        console.log("login-data",data)
     
        if(response.ok){
            storeTokenInLs(data.token)
            setFormData({email:"",password:""})
            toast.success("login successfully")
            navigate("/")
        }
        else{
            toast.error("invalid credentials")
        }
    } catch (error) {
       console.log(error) 
    }
    console.log('Form data:', formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
