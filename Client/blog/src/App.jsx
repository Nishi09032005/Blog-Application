import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home'; 
import Post from './components/Post'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import './App.css';
import Layout from './components/Layout';
import Logout from './components/Logout';
import Category from './components/Category';
import Posts from './components/Posts'; 
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/category',
        element: <Category/>
      },
     
      {
        path: '/add-post', 
        element: <AddPost /> 
      },
      {
        path: '/posts', 
        element: <Posts /> 
      },
      {
        path: '/post/:id', 
        element: <Post /> 
      },
      {
        path: '/edit/:id',
        element:<EditPost/>
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
