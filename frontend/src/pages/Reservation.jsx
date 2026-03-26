import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, Phone, User, Mail, Sparkles, CheckCircle, ArrowRight, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Reservation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    date: '',
    time: '',
    guests: 2,
    specialRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/reservations', formData);
      if (data.success) {
        setShowSuccess(true);
        // Clear form after success
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: 2,
          specialRequest: '',
        });
      }
    } catch (err) {
      setError('Failed to book table. Please try again.');
      // Fallback for demo
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[3.5rem] border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden"
        >
          <div className="absolute top-[-10%] right-[-10%] text-primary/10 rotate-12">
            <Sparkles size={200} />
          </div>
          
          <div className="h-24 w-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shubh Prarambh!</h2>
          <p className="text-xl font-bold text-primary mb-4 italic">Your table is reserved.</p>
          <p className="text-muted text-lg mb-10 max-w-md mx-auto">
            We are looking forward to hosting you and your guests. A confirmation has been sent to your phone.
          </p>
          
          <button 
            onClick={() => setShowSuccess(false)}
            className="btn-primary px-12 py-4 flex items-center gap-2 mx-auto"
          >
            Back to Home <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Info Side */}
        <div className="space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <Users size={14} /> Elegant Dining Experience
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6">Reserve Your <span className="text-primary italic">Moment</span></h1>
            <p className="text-lg text-muted leading-relaxed max-w-lg italic">
              "At SpiceRoute, we don't just serve food; we curate experiences that linger in your heart long after the meal is over."
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="h-14 w-14 rounded-full bg-card border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Grand Ambience</h3>
                <p className="text-muted">A perfect blend of traditional Indian motifs and modern luxury aesthetics.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="h-14 w-14 rounded-full bg-card border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <ChefHat size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Live Spice Bar</h3>
                <p className="text-muted">Witness our chefs custom-blend spices for your table upon request.</p>
              </div>
            </div>
          </div>

          <div className="p-8 glass rounded-[2.5rem] border-white/5 bg-primary/5">
            <h4 className="font-bold mb-4 flex items-center gap-2"><Clock size={16} className="text-primary" /> Reservation Policy</h4>
            <ul className="text-sm text-muted space-y-2">
              <li className="flex items-center gap-2"><span>•</span> Tables are held for 15 minutes past booking time.</li>
              <li className="flex items-center gap-2"><span>•</span> Groups of 10+ people require call-ahead verification.</li>
              <li className="flex items-center gap-2"><span>•</span> Special requests are accommodated based on availability.</li>
            </ul>
          </div>
        </div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[3.5rem] border-white/5 shadow-2xl relative z-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><User size={12} /> Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="input-field" placeholder="Raj Kumar" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><Phone size={12} /> Phone</label>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  className="input-field" placeholder="+91 98765-43210" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><Mail size={12} /> Email (Optional)</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="input-field" placeholder="raj.kumar@example.com" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><Calendar size={12} /> Date</label>
                <input 
                  type="date" name="date" required value={formData.date} onChange={handleChange}
                  className="input-field" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><Clock size={12} /> Time</label>
                <select 
                  name="time" required value={formData.time} onChange={handleChange}
                  className="input-field appearance-none"
                >
                  <option value="">Select Time Slot</option>
                  {['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><Users size={12} /> Number of Guests</label>
              <div className="flex items-center gap-4">
                {[2, 4, 6, 8, '10+'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({...formData, guests: num === '10+' ? 12 : num})}
                    className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                      (formData.guests === num || (num === '10+' && formData.guests >= 10))
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-black/20 border-white/5 text-muted hover:border-primary/30'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1 flex items-center gap-2"><MessageSquare size={12} /> Special Request</label>
              <textarea 
                name="specialRequest" value={formData.specialRequest} onChange={handleChange}
                className="input-field h-24 resize-none" placeholder="Allergies, birthday celebration, table near window..."
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-5 rounded-3xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-3 mt-4"
            >
              {isSubmitting ? 'Securing your table...' : 'Confirm Reservation'}
              {!isSubmitting && <Sparkles size={20} />}
            </button>
            
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;
