import { Link, useNavigate } from 'react-router-dom';
import { MessageSquareQuote, User, Mail, Lock, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { OAuthButtons } from '../components/OAuthButtons';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Cookie will be set by backend automatically (api has withCredentials: true)
      const response = await api.post('/auth/register', formData);
      login(response.data.user);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'An unknown error occurred.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-1.5">
      <div className="w-full max-w-sm p-8 space-y-6 bg-black rounded-2xl border border-gray-800">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-40">
            <LoaderCircle className="animate-spin h-12 w-12 text-purple-400" />
            <p className="mt-4 text-gray-400">Creating Account...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <MessageSquareQuote size={32} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-center">Join Quirk Today</h2>

            <OAuthButtons />

            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-gray-800" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-800" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  placeholder="Display Name"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 mt-2 border border-transparent rounded-full font-bold text-black bg-white hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-400 hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
