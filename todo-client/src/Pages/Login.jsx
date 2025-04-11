import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext'; // Uncomment if using AuthContext

export default function Login() {
    const { login }  = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
                
        try {
            const result = await login({ email, password });
            
            if (result.success) {
              navigate('/dashboard'); // Redirect to dashboard on successful login
            } else {
              setError(result.error || 'Login failed');
            }
          } catch (err) {
            setError('An unexpected error occurred');
            console.error('Login error:', err);
          }
        };


      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {typeof error === 'object' ? JSON.stringify(error) : error}
              </div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only mt-8">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    };

