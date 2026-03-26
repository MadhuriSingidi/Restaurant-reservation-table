import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, ShoppingBag, Calendar, ArrowRight, Star, Clock, Heart } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import axios from 'axios';

const categories = [
  { name: 'Breakfast', icon: '🥞' },
  { name: 'Starters', icon: '🌶️' },
  { name: 'Main Course', icon: '🍛' },
  { name: 'Breads', icon: '🫓' },
  { name: 'Rice & Biryani', icon: '🥘' },
  { name: 'Desserts', icon: '🍨' },
  { name: 'Beverages', icon: '🍹' },
  { name: 'Soups', icon: '🥣' },
  { name: 'Raita', icon: '🥗' },
];

const stats = [
  { label: 'Authentic Dishes', value: '45+', icon: ChefHat },
  { label: 'Happy Customers', value: '12k', icon: Heart },
  { label: 'Cooking Prep Time', value: '25m', icon: Clock },
  { label: 'Quality Rating', value: '4.9', icon: Star },
];

const Home = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/menu?isPopular=true');
        setPopularItems(data.data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular items:', error);
        // Fallback mock data
        setPopularItems([
          { _id: '1', name: 'Butter chicken', description: 'Tender chicken in a creamy tomato sauce gravy with butter and spices.', price: 450, category: 'Main Course', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
          { _id: '2', name: 'Paneer Tikka', description: 'Grilled chunks of paneer marinated in yogurt and Indian spices.', price: 320, category: 'Starters', rating: 4.7, spiceLevel: 'Medium', image: 'https://plus.unsplash.com/premium_photo-1694141253433-c902fe984422?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '3', name: 'Chicken Biryani', description: 'Basmati rice cooked with spice-infused chicken and caramelized onions.', price: 480, category: 'Rice & Biryani', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: false },
          { _id: '4', name: 'Dal Makhani', description: 'Slow-cooked black lentils with kidney beans, cream, and butter.', price: 280, category: 'Main Course', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=1887&auto=format&fit=crop', isPopular: true, isVeg: true },
        ]);
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1936&auto=format&fit=crop" 
            alt="Hero BG" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
              <ChefHat size={14} /> The Soul of India
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-text leading-tight mb-6">
              Flavor That <span className="text-primary italic">Dances</span> On Your Palate
            </h1>
            <p className="text-lg text-muted mb-10 leading-relaxed max-w-lg">
              Journey through the spice-rich regions of India. Every dish at SpiceRoute is a story written with aromatics, fresh ingredients, and love.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary flex items-center gap-2 text-lg py-4 px-10 group">
                <ShoppingBag size={20} /> Order Now <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/reservation" className="btn-outline flex items-center gap-2 text-lg py-3.5 px-10">
                <Calendar size={20} /> Book Table
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Element */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute right-[10%] top-[25%] z-20"
        >
          <div className="glass-dark p-4 rounded-3xl border border-white/10 flex items-center gap-4 animate-slide-up shadow-2xl">
            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <ChefHat size={32} />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Signature Dish</p>
              <p className="text-muted text-sm italic">Royal Ghosht Biryani</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl text-center border-white/5 hover:border-primary/20 transition-all cursor-default"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <stat.icon size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-muted text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-serif font-bold mb-4">Explore Our <span className="text-primary italic">Heritage</span></h2>
            <p className="text-muted max-w-md">Each dish is crafted to suit your spice preference. Click any category to see our full range.</p>
          </div>
          <Link to="/menu" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2 uppercase tracking-widest text-xs">
            View Full Menu <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={cat.name}
              to={`/menu?category=${encodeURIComponent(cat.name)}`}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-card border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center gap-6 group-hover:bg-primary/10 group-hover:border-primary/40 transition-all h-full justify-center shadow-xl shadow-black/20"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-500">{cat.icon}</span>
                <span className="text-xs font-bold tracking-wide uppercase opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all line-clamp-1">{cat.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/20 py-24 rounded-[3rem] border border-white/5">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Recommended for you</span>
          <h2 className="text-5xl font-serif font-bold">Chef's <span className="text-primary italic">Favorites</span> Today</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-white/5 animate-pulse rounded-3xl" />
            ))
          ) : (
            popularItems.length > 0 ? (
              popularItems.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 opacity-50 italic">More favorites coming soon...</div>
            )
          )}
        </div>
      </section>


      {/* Reservation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[4rem] h-[550px] border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop" 
            alt="Dining Room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-center">
            <div className="max-w-2xl px-12 md:px-20">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                Exclusive Hosting
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white leading-tight">Host Your Next <span className="text-primary italic">Moment</span></h2>
              <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-lg">
                Whether it's a corporate dinner or a family celebration, let us craft the perfect evening for you.
              </p>
              <Link to="/reservation" className="btn-primary inline-flex py-5 px-14 text-lg">
                Reserve A Table
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
