import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hotel, Mail, Lock, User, UserPlus, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/apiClient';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailValidation, setEmailValidation] = useState({ checking: false, exists: false, checked: false });
  const { register, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!email || email.length < 3) {
      setEmailValidation({ checking: false, exists: false, checked: false });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailValidation({ checking: false, exists: false, checked: false });
      return;
    }

    setEmailValidation({ checking: true, exists: false, checked: false });

    const timeoutId = setTimeout(async () => {
      try {
        const response = await api.post('/check-email', { email });
        if (response.data.success) {
          setEmailValidation({
            checking: false,
            exists: response.data.exists,
            checked: true
          });
        }
      } catch (error) {
        setEmailValidation({ checking: false, exists: false, checked: false });
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const result = await register(name, email, password);
    if (result.success) {
      setSuccess(true);
      const savedProgress = sessionStorage.getItem('bookingProgress');
      if (savedProgress) {
        setTimeout(() => {
          const progress = JSON.parse(savedProgress);
          navigate(`/hotel/${progress.hotelId}`);
        }, 1500);
      } else {
        setTimeout(() => navigate('/login'), 2000);
      }
    } else {
      setError(result.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
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
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us for exclusive stays</p>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm">
              Registration successful! Redirecting to login...
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-700 border rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none transition ${
                    emailValidation.checked 
                      ? emailValidation.exists 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-green-500 focus:border-green-500'
                      : 'border-gray-600 focus:border-blue-500'
                  }`}
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {emailValidation.checking && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
                  {emailValidation.checked && !emailValidation.checking && (
                    emailValidation.exists ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )
                  )}
                </div>
              </div>
              {emailValidation.checked && emailValidation.exists && (
                <p className="text-red-500 text-sm mt-1">User with this email already exists</p>
              )}
              {emailValidation.checked && !emailValidation.exists && (
                <p className="text-green-500 text-sm mt-1">Email is available</p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Create a password"
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
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Create Account</span>
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
