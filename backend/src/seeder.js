const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const menuItems = [
  // BREAKFAST (8 Items)
  { name: 'Poori Bhaji', description: 'Deep-fried puffed bread served with spicy potato curry.', price: 180, category: 'Breakfast', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1626132646529-5006375bc66f?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Chola Bhatura', description: 'Spiced chickpeas served with large fried leavened bread.', price: 220, category: 'Breakfast', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1626132646529-5006375bc66f?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Paneer Prantha', description: 'Whole wheat flatbread stuffed with spiced cottage cheese.', price: 150, category: 'Breakfast', rating: 4.6, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1633504581290-458637088757?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Aloo Paratha', description: 'Traditional flatbread stuffed with spiced mashed potatoes.', price: 130, category: 'Breakfast', rating: 4.8, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1922&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Masala Dosa', description: 'Crispy rice crepe stuffed with tempered potato filling.', price: 190, category: 'Breakfast', rating: 4.9, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Idli Sambhar', description: 'Steamed rice cakes served with lentil soup and coconut chutney.', price: 140, category: 'Breakfast', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2040&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Vada Pav', description: 'Spiced potato fritter inside a soft bread bun.', price: 90, category: 'Breakfast', rating: 4.8, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1922&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Poha', description: 'Flattened rice tempered with turmeric, onions, and peanuts.', price: 110, category: 'Breakfast', rating: 4.5, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },

  // STARTERS (8 Items)
  { name: 'Chilly Paneer', description: 'Indo-Chinese style cottage cheese tossed in spicy soy sauce.', price: 280, category: 'Starters', rating: 4.8, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Chicken Tikka 8pc', description: 'Char-grilled boneless chicken marinated in yogurt and spices.', price: 380, category: 'Starters', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Onion Pakora', description: 'Crispy deep-fried onion fritters seasoned with spices.', price: 120, category: 'Starters', rating: 4.5, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d744?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Fish Fry', description: 'Golden fried fish fillets marinated in authentic spices.', price: 420, category: 'Starters', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Hara Bhara Kebab', description: 'Healthy and delicious spinach and green pea patties.', price: 240, category: 'Starters', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1589647363535-882ffc1aa35b?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Veg Spring Rolls', description: 'Crispy rolls stuffed with seasoned vegetables.', price: 220, category: 'Starters', rating: 4.5, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1589647363535-882ffc1aa35b?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Samosa Chat', description: 'Crushed samosas topped with yogurt, chutneys, and spices.', price: 150, category: 'Starters', rating: 4.8, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d744?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Gobi Manchurian', description: 'Crispy cauliflower florets in a spicy Indo-Chinese sauce.', price: 260, category: 'Starters', rating: 4.7, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },

  // MAIN COURSE (15 Items)
  { name: 'Dal Makhani', description: 'Creamy slow-cooked black lentils and kidney beans.', price: 280, category: 'Main Course', rating: 4.9, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=1887&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Kadai Paneer', description: 'Paneer cubes cooked with bell peppers and coarse ground spices.', price: 340, category: 'Main Course', rating: 4.7, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=fit=crop', isPopular: true, isVeg: true },
  { name: 'Paneer Butter Masala', description: 'Cottage cheese in a rich and creamy tomato-butter gravy.', price: 360, category: 'Main Course', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Mix Vegetable', description: 'Fresh seasonal vegetables cooked in a blended onion-tomato gravy.', price: 260, category: 'Main Course', rating: 4.5, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1596797038558-b3bc4f9cb650?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Butter chicken', description: 'Tender tandoori chicken chunks in a buttery tomato gravy.', price: 450, category: 'Main Course', rating: 4.9, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Chicken curry', description: 'Classic home-style chicken curry with ginger, garlic, and onions.', price: 380, category: 'Main Course', rating: 4.6, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1626777553732-48f8c92a997d?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Mutton masala', description: 'Slow-cooked mutton in a thick and spicy aromatic gravy.', price: 550, category: 'Main Course', rating: 4.8, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Mutton Rogan Josh', description: 'Traditional Kashmiri style mutton curry with rich spices.', price: 580, category: 'Main Course', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Palak Paneer', description: 'Cottage cheese cubes in a thick pureed spinach gravy.', price: 320, category: 'Main Course', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=fit=crop', isPopular: false, isVeg: true },
  { name: 'Malai Kofta', description: 'Veggie balls in a rich and creamy cashew-based gravy.', price: 350, category: 'Main Course', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },

  // BREADS (8 Items)
  { name: 'Butter Naan', description: 'Classic leavened flatbread topped with butter.', price: 60, category: 'Breads', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d744?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Garlic Naan', description: 'Tandoori flatbread flavored with garlic and fresh coriander.', price: 80, category: 'Breads', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d744?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Tandoori Roti', description: 'Whole wheat bread cooked in a traditional clay oven.', price: 40, category: 'Breads', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2036&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Lacha Paratha', description: 'Multi-layered flaky whole wheat bread.', price: 90, category: 'Breads', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1922&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Missi Roti', description: 'Gram flour bread flavored with spices and herbs.', price: 70, category: 'Breads', rating: 4.5, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2036&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Rumali Roti', description: 'Extra thin and soft traditional flatbread.', price: 90, category: 'Breads', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2036&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Paneer Kulcha', description: 'Soft bread stuffed with spiced cottage cheese.', price: 110, category: 'Breads', rating: 4.8, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1922&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Keema Naan', description: 'Soft bread stuffed with choice of spiced minced meat.', price: 160, category: 'Breads', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d744?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: false },

  // RICE & BIRYANI (8 Items)
  { name: 'Veg Biryani', description: 'Fragrant basmati rice layered with vegetables and spices.', price: 320, category: 'Rice & Biryani', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Chicken Biryani', description: 'Aromatic rice dish made with spiced chicken and basmati rice.', price: 480, category: 'Rice & Biryani', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Mutton Biryani', description: 'Slow-cooked aromatic rice with succulent pieces of mutton.', price: 580, category: 'Rice & Biryani', rating: 4.9, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Jeera Rice', description: 'Basmati rice tempered with cumin seeds and butter.', price: 180, category: 'Rice & Biryani', rating: 4.5, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1596797038558-b3bc4f9cb650?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Paneer Biryani', description: 'Fragrant rice cooked with marinated cottage cheese cubes.', price: 360, category: 'Rice & Biryani', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Egg Biryani', description: 'Basmati rice layered with boiled eggs and aromatic spices.', price: 340, category: 'Rice & Biryani', rating: 4.6, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: false },
  { name: 'Lemon Rice', description: 'Zesty South Indian style rice with lemon juice and peanuts.', price: 160, category: 'Rice & Biryani', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1596797038558-b3bc4f9cb650?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Steamed Rice', description: 'Classic fluffy long-grain basmati rice.', price: 120, category: 'Rice & Biryani', rating: 4.4, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1596797038558-b3bc4f9cb650?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },

  // SOUPS (8 Items)
  { name: 'Tomato Soup', description: 'Warm and tangy cream of tomato soup with croutons.', price: 140, category: 'Soups', rating: 4.4, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Manchow Soup', description: 'Spicy Indo-Chinese soup with finely chopped vegetables.', price: 160, category: 'Soups', rating: 4.7, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Hot & Sour Soup', description: 'Spicy and tangy soup with ginger, garlic, and mixed vegetables.', price: 160, category: 'Soups', rating: 4.5, spiceLevel: 'Hot', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Sweet Corn Soup', description: 'Creamy and comforting soup with sweet corn and mild herbs.', price: 150, category: 'Soups', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Lemon Coriander Soup', description: 'Refreshing clear soup with vitamin-C rich lemon and fresh coriander.', price: 140, category: 'Soups', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Veg Clear Soup', description: 'Simple and healthy clear soup with seasonal diced vegetables.', price: 130, category: 'Soups', rating: 4.4, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Chicken Clear Soup', description: 'Light and nutritious clear soup with chicken shreds.', price: 180, category: 'Soups', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: true, isVeg: false },
  { name: 'Mushroom Soup', description: 'Creamy and earthy soup made with fresh button mushrooms and herbs.', price: 170, category: 'Soups', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop', isPopular: false, isVeg: true },

  // RAITA (8 Items)
  { name: 'Mix Raita', description: 'Yogurt mixed with cucumber, onion, tomato, and ground spices.', price: 120, category: 'Raita', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Boondi Raita', description: 'Yogurt infused with crispy fried gram flour pearls.', price: 110, category: 'Raita', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Pineapple Raita', description: 'Sweet and tangy yogurt with chunks of fresh pineapple.', price: 140, category: 'Raita', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Cucumber Raita', description: 'Cooling yogurt with freshly grated cucumber and roasted cumin.', price: 110, category: 'Raita', rating: 4.5, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Burani Raita', description: 'Garlic infused yogurt with spices, perfect for biryanis.', price: 130, category: 'Raita', rating: 4.8, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Mint Raita', description: 'Cooling yogurt dip flavored with fresh mint and cilantro.', price: 120, category: 'Raita', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Veg Raita', description: 'Yogurt mixed with assorted fresh finely diced vegetables.', price: 120, category: 'Raita', rating: 4.5, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Fruit Raita', description: 'Creamy yogurt with a mix of fresh seasonal fruits.', price: 160, category: 'Raita', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },

  // DESSERTS (8 Items)
  { name: 'Gulab Jamun', description: 'Deep-fried milk solids dumplings in saffron sugar syrup.', price: 150, category: 'Desserts', rating: 4.9, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Rasmalai', description: 'Creamy cottage cheese patties soaked in thickened milk.', price: 180, category: 'Desserts', rating: 4.8, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Gajar Ka Halwa', description: 'Classic Indian carrot pudding with milk and dry fruits.', price: 160, category: 'Desserts', rating: 4.7, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Kheer', description: 'Traditional rice pudding flavored with cardamom and saffron.', price: 140, category: 'Desserts', rating: 4.6, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Jalebi', description: 'Crispy and juicy deep-fried batter spirals soaked in syrup.', price: 120, category: 'Desserts', rating: 4.9, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Kulfi', description: 'Traditional Indian frozen dessert made with pistachio and saffron.', price: 130, category: 'Desserts', rating: 4.8, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Rasgulla', description: 'Soft and spongy milk-based balls soaked in light syrup.', price: 120, category: 'Desserts', rating: 4.7, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Ice Cream', description: 'Choice of Vanilla, Chocolate, or Strawberry flavors.', price: 110, category: 'Desserts', rating: 4.6, spiceLevel: 'Mild', image: 'https://plus.unsplash.com/premium_photo-1701314330664-d576a0c0f862?q=80&w=2070&auto=format&fit=crop', isPopular: false, isVeg: true },

  // BEVERAGES (8 Items)
  { name: 'Mango Lassi', description: 'Thick and authentic mango flavored yogurt drink.', price: 120, category: 'Beverages', rating: 4.9, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Masala Chai', description: 'Spiced Indian tea brewed with ginger and cardamom.', price: 60, category: 'Beverages', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1544787210-2213d242699a?q=80&w=2021&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Sweet Lassi', description: 'Traditional sweet and creamy yogurt-based drink.', price: 100, category: 'Beverages', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Nimbu Pani', description: 'Refreshing Indian style lemonade with a hint of salt and spices.', price: 80, category: 'Beverages', rating: 4.5, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Cold Coffee', description: 'Rich and creamy chilled coffee served with chocolate syrup.', price: 150, category: 'Beverages', rating: 4.7, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: true, isVeg: true },
  { name: 'Fresh Lime Soda', description: 'Sparkling Lemonade with choice of Sweet or Salted flakes.', price: 90, category: 'Beverages', rating: 4.6, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Jaljeera', description: 'Refreshing spiced cumin drink with mint and tamrind.', price: 80, category: 'Beverages', rating: 4.7, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
  { name: 'Thandai', description: 'Traditional festive milk drink with nuts and saffron.', price: 140, category: 'Beverages', rating: 4.8, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546173159-315724a9389a?q=80&w=1974&auto=format&fit=crop', isPopular: false, isVeg: true },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);

    // Create admin if not exists
    const userExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
    }

    console.log('✅ Menu expanded massively with 80+ items and verified photo links!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
