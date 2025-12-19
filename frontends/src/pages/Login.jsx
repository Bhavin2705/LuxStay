import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hotel, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        const savedProgress = sessionStorage.getItem('bookingProgress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          navigate(`/hotel/${progress.hotelId}`);
        } else {
          navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
        }
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Hotel className="w-10 h-10 text-blue-500" />
            <span className="text-3xl font-bold text-white">Lux<span className="text-blue-500">Stay</span></span>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-400 font-semibold">
                Register here
              </Link>
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700" />
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
