import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Function to store token in local storage and update state
    const storeTokenInLs = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

    // Function to log out the user
    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    // Determine if the user is logged in
    const isLoggedIn = !!token;

    // Provide context values to children components
    return (
        <AuthContext.Provider value={{ storeTokenInLs, LogoutUser, isLoggedIn,token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    
    // Throw an error if the hook is used outside of the AuthProvider
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return authContextValue;
};
