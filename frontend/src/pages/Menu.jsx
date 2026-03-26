import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FoodCard from '../components/FoodCard';
import axios from 'axios';

const categories = ['All', 'Breakfast', 'Starters', 'Main Course', 'Breads', 'Rice & Biryani', 'Soups', 'Raita', 'Desserts', 'Beverages'];

const Menu = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const catParam = searchParams.get('category');

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(catParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
    }
  }, [catParam]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/menu');
        setItems(data.data);
        setFilteredItems(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        // Fallback mock items (Expanded to show 20+ dishes as backup)
        const mockItems = [
          { _id: '1', name: 'Butter Chicken', description: 'Tender chicken in a creamy tomato sauce gravy.', price: 450, category: 'Main Course', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
          { _id: '2', name: 'Paneer Tikka', description: 'Grilled chunks of paneer marinated in spices.', price: 320, category: 'Starters', rating: 4.7, spiceLevel: 'Medium', image: 'https://plus.unsplash.com/premium_photo-1694141253433-c902fe984422?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '3', name: 'Chicken Biryani', description: 'Fragrant rice with spice-infused chicken.', price: 480, category: 'Rice & Biryani', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: false },
          { _id: '4', name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter.', price: 280, category: 'Main Course', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=1887&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '5', name: 'Poori Bhaji', description: 'Puffed bread with spiced potato curry.', price: 180, category: 'Breakfast', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1645177623570-520f3d99432f?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '6', name: 'Mango Lassi', description: 'Thick and authentic mango yogurt drink.', price: 120, category: 'Beverages', rating: 4.9, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '7', name: 'Tomato Soup', description: 'Creamy tomato soup with fresh herbs.', price: 140, category: 'Soups', rating: 4.4, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '8', name: 'Mix Raita', description: 'Yogurt with diced fresh vegetables and spices.', price: 120, category: 'Raita', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '9', name: 'Chola Bhatura', description: 'Spiced chickpeas with fried leavened bread.', price: 220, category: 'Breakfast', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1626132646529-5006375bc66f?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '10', name: 'Gulab Jamun', description: 'Milk balls in saffron sugar syrup.', price: 150, category: 'Desserts', rating: 4.9, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '11', name: 'Garlic Naan', description: 'Bread flavored with garlic and fresh coriander.', price: 80, category: 'Breads', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d745?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
          { _id: '12', name: 'Kadai Paneer', description: 'Paneer cooked with bell peppers and ground spices.', price: 340, category: 'Main Course', rating: 4.7, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=fit=crop', isPopular: true, isVeg: true },
        ];
        setItems(mockItems);
        setFilteredItems(mockItems);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    let result = items;
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(result);
  }, [activeCategory, searchQuery, items]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our <span className="text-primary italic">Delicacies</span></h1>
        <p className="text-muted max-w-2xl mx-auto text-lg">Indulge in our expansive collection of over 80 authentic Indian dishes, each crafted to perfections and bursting with heritage.</p>
      </div>

      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border border-white/5 p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6 mb-16 shadow-2xl">
        {/* Search */}
        <div className="relative w-full md:w-96 order-2 md:order-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search our huge menu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-all text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Scroller */}
        <div className="w-full md:flex-grow flex items-center gap-3 overflow-x-auto no-scrollbar order-1 md:order-2 pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white/5 border border-white/10 text-muted hover:border-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-card rounded-2xl h-[400px] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredItems.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 glass rounded-[3rem]">
            <Search size={64} className="mx-auto text-muted/30 mb-6" />
            <h3 className="text-2xl font-bold mb-2">No dishes found</h3>
            <p className="text-muted">Try searching for something else or clearing filters.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-primary hover:underline font-bold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
