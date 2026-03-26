import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-serif font-bold text-primary">
              SpiceRoute
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Experience the soul of Indian cuisine with our authentic spices and heritage recipes crafted for modern palates.
            </p>
            <div className="flex space-x-6 text-xs font-bold tracking-widest text-muted">
              <a href="#" className="hover:text-primary transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-primary transition-colors">FACEBOOK</a>
              <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-text">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Menu', 'Reservations', 'Reviews', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted hover:text-primary transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-text">Find Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-muted">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <span>123 Spice Lane, Curry Heights,<br />New Delhi, 110001</span>
              </li>
              <li className="flex items-center space-x-3 text-muted">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-muted">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@spiceroute.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-text">Newsletter</h4>
            <p className="text-muted text-sm mb-4">Join our culinary journey for exclusive recipes and offers.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-black/30 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
              />
              <button className="absolute right-1.5 top-1.5 bg-primary text-white h-9 px-4 rounded-full text-xs font-bold hover:bg-orange-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-muted text-xs tracking-widest uppercase">
          <p>© 2024 SpiceRoute. All rights reserved.</p>
          <p>Designed for the Modern Indian Foodie</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
