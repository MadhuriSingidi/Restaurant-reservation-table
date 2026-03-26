import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, ShoppingCart, Utensils, Calendar, Plus, Trash2, Edit2, CheckCircle2, XCircle, Clock, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 'Medium',
    image: '',
    isPopular: false
  });

  const categories = ['Breakfast', 'Starters', 'Main Course', 'Breads', 'Rice & Biryani', 'Soups', 'Raita', 'Desserts', 'Beverages'];

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'menu') {
        const { data } = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(data.data);
      } else if (activeTab === 'orders') {
        const { data } = await axios.get('http://localhost:5000/api/orders');
        setOrders(data.data);
      } else if (activeTab === 'reservations') {
        const { data } = await axios.get('http://localhost:5000/api/reservations');
        setReservations(data.data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      // Create a clean copy of the item without MongoDB metadata for saving
      const { _id, __v, createdAt, updatedAt, ...saveData } = newItem;
      
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/menu/${editingItem._id}`, saveData);
        alert('✨ Dish updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/menu', saveData);
        alert('🚀 New dish added to the menu!');
      }
      setShowItemModal(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error('Save error details:', err.response?.data || err.message);
      alert('❌ Failed to save dish. Please check if the fields are filled correctly.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting item');
      }
    }
  };

  const updateStatus = async (type, id, status) => {
    try {
      const endpoint = type === 'order' ? `api/orders/${id}/status` : `api/reservations/${id}/status`;
      await axios.put(`http://localhost:5000/${endpoint}`, { status });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="p-6 bg-primary rounded-3xl mb-10 shadow-xl shadow-primary/20">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Manage SpiceRoute</p>
          </div>
          
          {[
            { id: 'menu', label: 'Menu Items', icon: Utensils },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-card border border-primary/50 text-primary shadow-lg shadow-orange-950/20 translate-x-1' 
                : 'text-muted hover:bg-white/5 hover:text-text'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-serif font-bold capitalize">{activeTab}</h3>
            {activeTab === 'menu' && (
              <button 
                onClick={() => { setEditingItem(null); setNewItem({ name: '', description: '', price: 0, category: 'Main Course', isVeg: true, spiceLevel: 'Medium', image: '', isPopular: false }); setShowItemModal(true); }}
                className="btn-primary flex items-center gap-2 py-3 px-6"
              >
                <Plus size={20} /> Add Item
              </button>
            )}
          </div>

          <div className="glass rounded-[3rem] border-white/5 overflow-hidden">
            {loading ? (
              <div className="p-20 text-center animate-pulse text-muted">Loading data...</div>
            ) : (
              <div className="overflow-x-auto">
                {activeTab === 'menu' && (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Item</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Category</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Price</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {menuItems.map((item) => (
                        <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl border border-white/10 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold flex items-center gap-2">
                                  {item.name} 
                                  {item.isVeg ? <span className="h-2 w-2 rounded-full bg-green-500" /> : <span className="h-2 w-2 rounded-full bg-red-500" />}
                                </div>
                                <div className="text-xs text-muted leading-tight line-clamp-1">{item.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm italic">{item.category}</td>
                          <td className="px-8 py-6 font-bold text-primary">₹{item.price}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <button onClick={() => { setEditingItem(item); setNewItem(item); setShowItemModal(true); }} className="p-2 text-muted hover:text-primary transition-colors">
                                <Edit2 size={18} />
                              </button>
                              <button onClick={() => handleDeleteItem(item._id)} className="p-2 text-muted hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'orders' && (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Order ID</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Customer</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Items</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Total</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((o) => (
                        <tr key={o._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 text-xs font-mono text-muted">#{o._id.slice(-6)}</td>
                          <td className="px-8 py-6">
                            <div className="font-bold">{o.guestName}</div>
                            <div className="text-xs text-muted">{o.guestEmail}</div>
                          </td>
                          <td className="px-8 py-6 text-sm">{o.items.length} items</td>
                          <td className="px-8 py-6 font-bold">₹{o.totalAmount}</td>
                          <td className="px-8 py-6">
                            <select 
                              value={o.status} 
                              onChange={(e) => updateStatus('order', o._id, e.target.value)}
                              className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold"
                            >
                              {['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'reservations' && (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Customer</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Time</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Guests</th>
                        <th className="px-8 py-6 text-xs uppercase tracking-widest text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reservations.map((r) => (
                        <tr key={r._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold">{r.name}</div>
                            <div className="text-xs text-muted">{r.phone}</div>
                          </td>
                          <td className="px-8 py-6 text-sm">
                            <div className="font-bold">{r.date}</div>
                            <div className="text-muted">{r.time}</div>
                          </td>
                          <td className="px-8 py-6 font-bold">{r.guests}</td>
                          <td className="px-8 py-6">
                            <select 
                              value={r.status} 
                              onChange={(e) => updateStatus('reservation', r._id, e.target.value)}
                              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                                r.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-black/40 text-muted'
                              }`}
                            >
                              {['Pending', 'Confirmed', 'Cancelled'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Modal (Minimal version) */}
      <AnimatePresence>
        {showItemModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowItemModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="glass p-10 rounded-[3rem] w-full max-w-2xl relative z-10 border-white/10 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <h4 className="text-3xl font-serif font-bold mb-8">{editingItem ? 'Edit Dish' : 'Add New Dish'}</h4>
              <form onSubmit={handleSaveItem} className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1">Dish Name</label>
                  <input required placeholder="Enter name..." value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="input-field" />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1">Description</label>
                  <textarea required placeholder="Short description..." value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} className="input-field h-24" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1">Price (₹)</label>
                  <input required type="number" placeholder="450" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})} className="input-field" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1">Category</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="input-field">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted font-bold ml-1">Dish Photo URL (Unsplash Link)</label>
                  <input placeholder="Paste https://images.unsplash.com/..." value={newItem.image} onChange={(e) => setNewItem({...newItem, image: e.target.value})} className="input-field" />
                </div>

                {newItem.image && (
                  <div className="col-span-2 h-44 rounded-[2rem] border border-white/10 overflow-hidden group/prev relative shadow-2xl bg-black/40">
                    <img 
                      key={newItem.image}
                      src={newItem.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover/prev:scale-110" 
                      onLoad={(e) => e.target.classList.remove('opacity-0')}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop';
                      }} 
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/prev:opacity-100 transition-opacity">
                       <span className="text-xs font-bold uppercase tracking-[0.2em]">Image Preview</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-10 mt-4 col-span-2 justify-center py-4 bg-white/5 rounded-3xl border border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={newItem.isVeg} onChange={(e) => setNewItem({...newItem, isVeg: e.target.checked})} className="accent-green-500 h-5 w-5" />
                    <span className="font-bold text-sm">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={newItem.isPopular} onChange={(e) => setNewItem({...newItem, isPopular: e.target.checked})} className="accent-primary h-5 w-5" />
                    <span className="font-bold text-sm">Chef's Choice (Popular)</span>
                  </label>
                </div>
                <div className="col-span-2 flex gap-4 mt-8">
                  <button type="submit" className="btn-primary flex-1 py-4">Save Dish</button>
                  <button type="button" onClick={() => setShowItemModal(false)} className="bg-white/5 px-8 rounded-3xl font-bold">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
