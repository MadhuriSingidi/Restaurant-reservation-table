import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, CreditCard, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = 40;
  const tax = Math.round(cartTotal * 0.05); // 5% GST
  const grandTotal = cartTotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    setError('');
    
    try {
      const orderData = {
        items: cartItems,
        totalAmount: grandTotal,
        guestName: user ? user.name : 'Guest',
        guestEmail: user ? user.email : 'guest@example.com',
        notes: 'Simulated Order'
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData);
      
      if (data.success) {
        setOrderSuccess(true);
        clearCart();
      }
    } catch (err) {
      setError('Failed to place order. Please check your connection and try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[3.5rem] border-primary/20 shadow-2xl shadow-primary/10"
        >
          <div className="h-24 w-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shukriya! Order Placed</h2>
          <p className="text-muted text-lg mb-10 max-w-md mx-auto">
            Your delicious meal is now in the making and will be at your doorstep within 30-40 minutes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary flex items-center justify-center gap-2 px-10">
              Order More
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-serif font-bold mb-2">My <span className="text-primary italic">Cravings</span></h1>
        <p className="text-muted">Review your selection before we start cooking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-6 rounded-3xl border-white/5 flex flex-col md:flex-row items-center gap-6 group"
                >
                  <div className="h-24 w-24 rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-primary/30 transition-all">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-muted text-sm">{item.category}</p>
                    <div className="mt-2 text-primary font-bold">₹{item.price} each</div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-4 bg-black/30 border border-white/10 rounded-2xl px-4 py-2">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-primary hover:text-white transition-colors">
                        <Minus size={18} />
                      </button>
                      <span className="w-4 text-center font-bold text-lg">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-primary hover:text-white transition-colors">
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-3 text-red-400/50 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 glass rounded-[3rem] border-dashed border-white/10">
                <ShoppingBag size={64} className="mx-auto text-muted/20 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
                <p className="text-muted mb-10">Add some delicious Indian dishes to get started.</p>
                <Link to="/menu" className="btn-primary inline-flex">Go To Menu</Link>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[2.5rem] border-white/10 sticky top-28 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-8">Bill Summary</h3>
            
            <div className="space-y-4 mb-8 text-muted">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-text font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Clock size={16} /> Delivery Fee</span>
                <span className="text-text font-medium">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>GST (5%)</span>
                <span className="text-text font-medium">₹{tax}</span>
              </div>
              <div className="h-px bg-white/5 my-4" />
              <div className="flex justify-between items-center text-xl font-bold text-text">
                <span>Grand Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-black/20 border border-white/5 rounded-2xl relative overflow-hidden group">
                <MapPin size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-sm">Delivery to</h4>
                  <p className="text-muted text-xs">Dine-in at SpiceRoute, Table 4</p>
                </div>
                <div className="absolute right-[-20%] bottom-[-20%] text-primary/5 group-hover:text-primary/10 transition-all">
                  <MapPin size={80} />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-black/20 border border-white/5 rounded-2xl">
                <CreditCard size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-sm">Payment Mode</h4>
                  <p className="text-muted text-xs">Cash on Delivery / Simulation</p>
                </div>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0 || isOrdering}
              onClick={handlePlaceOrder}
              className={`w-full py-4 rounded-3xl text-lg font-bold transition-all flex items-center justify-center gap-2 group ${
                cartItems.length > 0 
                ? 'bg-primary text-white hover:bg-orange-600 shadow-xl shadow-primary/20' 
                : 'bg-white/5 text-muted cursor-not-allowed'
              }`}
            >
              {isOrdering ? 'Processing...' : 'Place Order'}
              {!isOrdering && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> }
            </button>
            
            {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
