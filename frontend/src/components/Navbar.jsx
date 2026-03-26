import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservation' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-dark py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
              SpiceRoute
            </span>
            <div className="h-1 w-8 bg-primary rounded-full group-hover:w-12 transition-all duration-300" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-text'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/cart" className="relative p-2 text-text hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-bounce-slow">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 p-2 text-accent hover:text-primary transition-colors border border-accent/20 rounded-full px-3" title="Admin Dashboard">
                    <LayoutDashboard size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Admin Panel</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 group cursor-pointer border border-white/10 rounded-full px-3 py-1 hover:border-primary/50 transition-all">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white">{user.name}</span>
                  <button onClick={logout} className="flex items-center space-x-1 p-1 hover:text-red-400 transition-colors">
                    <LogOut size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center space-x-2">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-text hover:text-primary transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-text border-b border-white/5 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-4 text-base font-medium text-text hover:text-primary transition-colors"
              >
                <User size={20} />
                <span>{user ? user.name : 'Login / Signup'}</span>
              </Link>
              {user && (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center space-x-3 w-full text-left px-3 py-4 text-base font-medium text-red-500 hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
