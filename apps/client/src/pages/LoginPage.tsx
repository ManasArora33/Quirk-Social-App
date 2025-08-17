import { Link, useNavigate } from 'react-router-dom';
import { MessageSquareQuote, Mail, Lock, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { OAuthButtons } from '../components/OAuthButtons';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', formData);
      login(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-black rounded-2xl border border-gray-800">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-24">
            <LoaderCircle className="animate-spin h-12 w-12 text-purple-400" />
            <p className="mt-4 text-gray-400">Signing in...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <MessageSquareQuote size={32} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-center">Sign in to Quirk</h2>

            <OAuthButtons />

            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-gray-800" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-800" />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                  className="w-full py-3 px-4 border border-transparent rounded-full font-bold text-black bg-white hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-400 hover:underline">
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
