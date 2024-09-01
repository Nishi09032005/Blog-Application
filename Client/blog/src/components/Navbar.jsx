import { Link } from 'react-router-dom';
import { useAuth } from '../storage/auth';

function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden md:flex space-x-8 ml-10">
              <Link
                to="/"
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/category"
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                to="/posts"
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Posts
              </Link>
              <Link
                to="/add-post"
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Post
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/logout"
                  className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="ml-4">
              <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
