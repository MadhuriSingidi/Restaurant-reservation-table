import React from 'react';
import { Star, Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const FoodCard = ({ item }) => {
  const { addToCart, removeFromCart, cartItems, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(i => i._id === item._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="food-card group"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1596797038558-b3bc4f9cb650?q=80&w=2070&auto=format&fit=crop'} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.isVeg ? (
            <div className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Leaf size={10} /> VEG
            </div>
          ) : (
            <div className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              NON-VEG
            </div>
          )}
          {item.isPopular && (
            <div className="bg-accent/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              POPULAR
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-accent border border-white/10">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-bold text-white">{item.rating?.toFixed(1) || '4.2'}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2 text-primary font-serif italic text-xs uppercase tracking-widest">
          {item.category}
          <span className="text-muted flex items-center">
            {item.spiceLevel === 'Hot' && '🌶️🌶️'}
            {item.spiceLevel === 'Medium' && '🌶️'}
            {item.spiceLevel === 'Mild' && '🍃'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
        <p className="text-muted text-sm mb-6 line-clamp-2 h-10 leading-relaxed">
          {item.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-text">₹{item.price}</span>
          
          {quantity > 0 ? (
            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <button 
                onClick={() => updateQuantity(item._id, quantity - 1)}
                className="text-primary hover:text-accent transition-colors p-1"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              <span className="w-6 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => addToCart(item)}
                className="text-primary hover:text-accent transition-colors p-1"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(item)}
              className="px-5 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 rounded-full text-sm font-bold transition-all flex items-center gap-2 group/btn"
            >
              <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
              ADD
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
