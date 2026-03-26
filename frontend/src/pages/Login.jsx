import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Phone, ArrowRight, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ isRegister = false }) => {
  const [isLogin, setIsLogin] = useState(!isRegister);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let res;
    if (isLogin) {
      res = await login(formData.email, formData.password);
    } else {
      res = await register(formData);
    }

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-[3.5rem] border-white/5 shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat size={40} className="text-primary" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Join the Table'}
          </h2>
          <p className="text-muted text-sm">
            {isLogin ? 'Enter your credentials to access your account' : 'Sign up to start your culinary journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5"
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    type="text" name="name" required placeholder="Full Name" 
                    value={formData.name} onChange={handleChange}
                    className="input-field pl-16"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    type="tel" name="phone" placeholder="Phone Number" 
                    value={formData.phone} onChange={handleChange}
                    className="input-field pl-16"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="email" name="email" required placeholder="Email Address" 
              value={formData.email} onChange={handleChange}
              className="input-field pl-16"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="password" name="password" required placeholder="Password" 
              value={formData.password} onChange={handleChange}
              className="input-field pl-16"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

          <button 
            type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
