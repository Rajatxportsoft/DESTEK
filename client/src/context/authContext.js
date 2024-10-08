import React, { createContext, useContext, useState, useEffect } from 'react';
import { logIn } from '../services/apiClient';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (userData) => {
        try {
            const response = await logIn(userData);
            const userResponse = response.data;
            setUser(userResponse);
            localStorage.setItem('user', JSON.stringify(userResponse));
            localStorage.setItem('token', userResponse.token);
            return { success: true }; 
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.response?.data?.message || 'Login failed' }; 
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    const isLoggedIn = () => {
        return !!user;
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
