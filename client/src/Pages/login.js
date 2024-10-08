import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Swal from 'sweetalert2';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { mobile, password };
        
        const result = await login(userData);
        if (result.success) {
            navigate('/');
        } else {
            Swal.fire({
                title: 'Error!',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="mobile">Mobile</label>
                    <input
                        id="mobile"
                        className="border p-2 w-full"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="border p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
