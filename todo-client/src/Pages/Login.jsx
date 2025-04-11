import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Uncomment if using AuthContext

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
    //             email,
    //             password,
    //         });
    //         localStorage.setItem('token', response.data.access_token);
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`; // Set authorization header for future requests
    //         navigate('/dashboard');
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             setErrors({ general: 'Invalid login credentials' });
    //         } else {
    //             console.error('Login failed:', error);
    //             setErrors({ general: 'Login failed. Please try again.' });
    //         }
    //     }
    // };
    const handleSubmit = async (email, password) => {
        try {
          const response = await api.post('auth/login', { email, password });
          localStorage.setItem('token', response.data.token);
          // Redirection ou mise à jour du state
        } catch (error) {
          console.error('Login error:', error.response?.data || error.message);
          // Afficher un message d'erreur à l'utilisateur
        }
      };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="block text-gray-700 text-xl font-bold mb-4">Login</h2>
                {errors.general && <p className="text-red-500 text-xs italic mb-4">{errors.general}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email[0]}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password[0]}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                            Don't have an account? Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;