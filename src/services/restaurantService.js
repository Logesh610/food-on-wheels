// ── Rich Mock Data — 10 restaurants, 5-7 menu items each ──────────────────────

const MOCK_RESTAURANTS = [
  {
    id: 'r1',
    name: 'The Burger Club',
    cuisine: 'American, Burgers',
    rating: 4.5,
    deliveryTime: '25-30',
    priceForTwo: 500,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60',
    category: 'Fast Food',
    featured: true,
    offers: ['20% off up to ₹100', 'Free delivery on ₹300+'],
    isVeg: false,
    menu: [
      { id: 'm1', name: 'Zesty Beast Burger', price: 189, description: 'Double patty with secret sauce, jalapeños and cheddar.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60', category: 'Burgers', isVeg: false, bestseller: true },
      { id: 'm2', name: 'Classic Cheese Burger', price: 149, description: 'Single patty with cheddar, pickles and thousand island.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60', category: 'Burgers', isVeg: false },
      { id: 'm3', name: 'Veggie Delight Burger', price: 129, description: 'Aloo tikki patty with fresh veggies and mint chutney.', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&auto=format&fit=crop&q=60', category: 'Burgers', isVeg: true },
      { id: 'm4', name: 'Peri Peri Fries', price: 99, description: 'Crispy golden fries with house-blend spicy seasoning.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60', category: 'Sides', isVeg: true, bestseller: true },
      { id: 'm5', name: 'Loaded Nachos', price: 159, description: 'Crispy nachos with cheese sauce, salsa and sour cream.', image: 'https://images.unsplash.com/photo-1548390712-87806e45aa4b?w=500&auto=format&fit=crop&q=60', category: 'Sides', isVeg: true },
      { id: 'm6', name: 'Chocolate Shake', price: 119, description: 'Thick, rich chocolate milkshake.', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&auto=format&fit=crop&q=60', category: 'Beverages', isVeg: true },
    ]
  },
  {
    id: 'r2',
    name: 'Pasta La Vista',
    cuisine: 'Italian, Pizza',
    rating: 4.2,
    deliveryTime: '35-40',
    priceForTwo: 800,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=60',
    category: 'Italian',
    offers: ['Flat ₹50 off on ₹500+'],
    isVeg: false,
    menu: [
      { id: 'm7', name: 'Penne Arrabbiata', price: 299, description: 'Spicy tomato and garlic sauce with fresh basil.', image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&auto=format&fit=crop&q=60', category: 'Pasta', isVeg: true, bestseller: true },
      { id: 'm8', name: 'Spaghetti Carbonara', price: 349, description: 'Classic Roman pasta with egg, pecorino and guanciale.', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60', category: 'Pasta', isVeg: false },
      { id: 'm9', name: 'Margherita Pizza', price: 349, description: 'Classic mozzarella, fresh tomato and basil.' , image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500&auto=format&fit=crop&q=60', category: 'Pizza', isVeg: true, bestseller: true },
      { id: 'm10', name: 'Pepperoni Pizza', price: 449, description: 'Loaded with premium pepperoni and mozzarella.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60', category: 'Pizza', isVeg: false },
      { id: 'm11', name: 'Garlic Bread', price: 149, description: 'Toasted baguette with herb-infused garlic butter.', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661a?w=500&auto=format&fit=crop&q=60', category: 'Starters', isVeg: true },
      { id: 'm12', name: 'Tiramisu', price: 249, description: 'Classic Italian dessert with espresso and mascarpone.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60', category: 'Desserts', isVeg: true },
    ]
  },
  {
    id: 'r3',
    name: 'Spicy Tadka',
    cuisine: 'North Indian, Mughlai',
    rating: 4.7,
    deliveryTime: '40-45',
    priceForTwo: 600,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    category: 'Indian',
    featured: true,
    offers: ['30% off up to ₹150', 'Free Naan on ₹500+'],
    isVeg: false,
    menu: [
      { id: 'm13', name: 'Butter Chicken', price: 449, description: 'Creamy tomato-based chicken curry — a timeless classic.', image: 'https://images.unsplash.com/photo-1603894584202-933259bb49ec?w=500&auto=format&fit=crop&q=60', category: 'Main Course', isVeg: false, bestseller: true },
      { id: 'm14', name: 'Paneer Tikka Masala', price: 389, description: 'Grilled paneer cubes in rich spiced tomato gravy.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60', category: 'Main Course', isVeg: true, bestseller: true },
      { id: 'm15', name: 'Dal Makhani', price: 299, description: 'Slow-cooked black lentils with butter and cream.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60', category: 'Main Course', isVeg: true },
      { id: 'm16', name: 'Chicken Biryani', price: 399, description: 'Fragrant basmati rice layered with spiced chicken.', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60', category: 'Rice', isVeg: false, bestseller: true },
      { id: 'm17', name: 'Garlic Naan', price: 59, description: 'Soft tandoor bread with garlic and butter.', image: 'https://images.unsplash.com/photo-1601050633647-81a317274036?w=500&auto=format&fit=crop&q=60', category: 'Breads', isVeg: true },
      { id: 'm18', name: 'Mango Lassi', price: 99, description: 'Chilled yogurt drink blended with fresh mango pulp.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60', category: 'Beverages', isVeg: true },
    ]
  },
  {
    id: 'r4',
    name: 'Sushi Zen',
    cuisine: 'Japanese, Sushi',
    rating: 4.8,
    deliveryTime: '30-35',
    priceForTwo: 1200,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    category: 'Asian',
    offers: ['Flat ₹100 off above ₹1000'],
    isVeg: false,
    menu: [
      { id: 'm19', name: 'Salmon Nigiri', price: 599, description: 'Fresh premium salmon on hand-pressed vinegared rice (6 pcs).', image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&auto=format&fit=crop&q=60', category: 'Nigiri', isVeg: false, bestseller: true },
      { id: 'm20', name: 'California Roll', price: 499, description: 'Crab meat, avocado and cucumber with tobiko.', image: 'https://images.unsplash.com/photo-1559466273-d95e72debaf8?w=500&auto=format&fit=crop&q=60', category: 'Rolls', isVeg: false, bestseller: true },
      { id: 'm21', name: 'Tuna Sashimi', price: 699, description: 'Sliced fresh bluefin tuna, served with wasabi (8 pcs).', image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&auto=format&fit=crop&q=60', category: 'Sashimi', isVeg: false },
      { id: 'm22', name: 'Edamame', price: 249, description: 'Lightly salted steamed young soybeans.', image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&auto=format&fit=crop&q=60', category: 'Starters', isVeg: true },
      { id: 'm23', name: 'Miso Soup', price: 149, description: 'Traditional Japanese soup with tofu and wakame.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60', category: 'Soups', isVeg: true },
    ]
  },
  {
    id: 'r5',
    name: 'The Pizza Factory',
    cuisine: 'Pizza, Italian',
    rating: 4.3,
    deliveryTime: '20-25',
    priceForTwo: 700,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60',
    category: 'Pizza',
    featured: true,
    offers: ['Buy 1 Get 1 on all Large Pizzas'],
    isVeg: false,
    menu: [
      { id: 'm24', name: 'BBQ Chicken Pizza', price: 549, description: 'Smoky BBQ sauce, grilled chicken, red onions and cheese.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60', category: 'Pizza', isVeg: false, bestseller: true },
      { id: 'm25', name: 'Paneer Tikka Pizza', price: 499, description: 'Desi fusion — spiced paneer with capsicum and onion.', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop&q=60', category: 'Pizza', isVeg: true },
      { id: 'm26', name: 'Four Cheese Pizza', price: 649, description: 'Mozzarella, cheddar, gouda and parmesan.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500&auto=format&fit=crop&q=60', category: 'Pizza', isVeg: true, bestseller: true },
      { id: 'm27', name: 'Garlic Dip Wedges', price: 179, description: 'Wedge-cut potatoes with house garlic dipping sauce.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60', category: 'Sides', isVeg: true },
      { id: 'm28', name: 'Brownie Sundae', price: 199, description: 'Warm chocolate brownie with vanilla ice cream.', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&auto=format&fit=crop&q=60', category: 'Desserts', isVeg: true },
    ]
  },
  {
    id: 'r6',
    name: 'Biryani House',
    cuisine: 'Hyderabadi, North Indian, Biryani',
    rating: 4.6,
    deliveryTime: '45-55',
    priceForTwo: 550,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d9f4?w=800&auto=format&fit=crop&q=60',
    category: 'Biryani',
    offers: ['₹75 off on ₹499+', 'Extra 10% with ICICI cards'],
    isVeg: false,
    menu: [
      { id: 'm29', name: 'Hyderabadi Dum Biryani', price: 449, description: 'Slow-cooked in dum style with whole spices and saffron.', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60', category: 'Biryani', isVeg: false, bestseller: true },
      { id: 'm30', name: 'Veg Biryani', price: 349, description: 'Fragrant basmati with 12 mixed vegetables and whole spices.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60', category: 'Biryani', isVeg: true, bestseller: true },
      { id: 'm31', name: 'Chicken Shorba', price: 199, description: 'Light aromatic chicken broth — perfect starter.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60', category: 'Starters', isVeg: false },
      { id: 'm32', name: 'Mirchi Ka Salan', price: 149, description: 'Spicy green chilli curry — traditional accompaniment.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60', category: 'Sides', isVeg: true },
      { id: 'm33', name: 'Double Ka Meetha', price: 179, description: 'Hyderabadi bread pudding with fried bread and rabdi.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60', category: 'Desserts', isVeg: true },
    ]
  },
  {
    id: 'r7',
    name: 'Green Bowl',
    cuisine: 'Healthy, Salads, Vegan',
    rating: 4.4,
    deliveryTime: '20-30',
    priceForTwo: 600,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
    category: 'Healthy',
    offers: ['Free delivery always!'],
    isVeg: true,
    menu: [
      { id: 'm34', name: 'Quinoa Power Bowl', price: 349, description: 'Quinoa, roasted veggies, avocado and tahini dressing.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60', category: 'Bowls', isVeg: true, bestseller: true },
      { id: 'm35', name: 'Greek Salad', price: 299, description: 'Feta, olives, cucumber, tomato with oregano dressing.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60', category: 'Salads', isVeg: true },
      { id: 'm36', name: 'Acai Berry Smoothie', price: 249, description: 'Frozen acai, banana, almond milk and granola.', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&auto=format&fit=crop&q=60', category: 'Smoothies', isVeg: true, bestseller: true },
      { id: 'm37', name: 'Avocado Toast', price: 279, description: 'Sourdough with smashed avocado, cherry tomatoes, microgreens.', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&auto=format&fit=crop&q=60', category: 'Breakfast', isVeg: true },
    ]
  },
  {
    id: 'r8',
    name: 'Chaat Corner',
    cuisine: 'Street Food, Indian Snacks',
    rating: 4.5,
    deliveryTime: '15-25',
    priceForTwo: 300,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=60',
    category: 'Street Food',
    featured: true,
    offers: ['10% off on all orders'],
    isVeg: true,
    menu: [
      { id: 'm38', name: 'Pani Puri (12 pcs)', price: 79, description: 'Crispy puris with spiced tamarind water and filling.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60', category: 'Chaat', isVeg: true, bestseller: true },
      { id: 'm39', name: 'Dahi Papdi Chaat', price: 129, description: 'Crispy papdi with yogurt, chutneys and sev.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60', category: 'Chaat', isVeg: true, bestseller: true },
      { id: 'm40', name: 'Samosa (2 pcs)', price: 49, description: 'Classic potato-pea stuffed crispy triangles.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60', category: 'Snacks', isVeg: true },
      { id: 'm41', name: 'Raj Kachori', price: 99, description: 'Giant kachori stuffed with moong dal, sprouts and chutneys.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60', category: 'Chaat', isVeg: true },
      { id: 'm42', name: 'Lassi (Sweet)', price: 69, description: 'Thick creamy traditional sweet yogurt drink.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60', category: 'Beverages', isVeg: true },
    ]
  },
  {
    id: 'r9',
    name: 'Dessert Dreams',
    cuisine: 'Desserts, Ice Cream, Cakes',
    rating: 4.6,
    deliveryTime: '25-35',
    priceForTwo: 400,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60',
    category: 'Desserts',
    offers: ['15% off orders above ₹500'],
    isVeg: true,
    menu: [
      { id: 'm43', name: 'Belgian Waffle', price: 279, description: 'Crispy waffle with Nutella, banana and ice cream.', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=60', category: 'Waffles', isVeg: true, bestseller: true },
      { id: 'm44', name: 'Red Velvet Cake Slice', price: 249, description: 'Moist red velvet with cream cheese frosting.', image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=500&auto=format&fit=crop&q=60', category: 'Cakes', isVeg: true, bestseller: true },
      { id: 'm45', name: 'Mango Kulfi', price: 149, description: 'Traditional Indian frozen dessert with real mango.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60', category: 'Ice Cream', isVeg: true },
      { id: 'm46', name: 'Gulab Jamun (4 pcs)', price: 99, description: 'Soft milk solid balls soaked in rose sugar syrup.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60', category: 'Indian Sweets', isVeg: true },
    ]
  },
  {
    id: 'r10',
    name: 'South Spice Kitchen',
    cuisine: 'South Indian, Dosa, Kerala',
    rating: 4.4,
    deliveryTime: '30-40',
    priceForTwo: 450,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60',
    category: 'South Indian',
    offers: ['₹50 cashback on ₹350+'],
    isVeg: false,
    menu: [
      { id: 'm47', name: 'Masala Dosa', price: 149, description: 'Crispy rice crepe filled with spiced potato masala.', image: 'https://images.unsplash.com/photo-1589301760014-d929f8db6c30?w=500&auto=format&fit=crop&q=60', category: 'Dosas', isVeg: true, bestseller: true },
      { id: 'm48', name: 'Idli Sambar (3 pcs)', price: 99, description: 'Steamed rice cakes with piping hot sambar and chutneys.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60', category: 'Breakfast', isVeg: true },
      { id: 'm49', name: 'Chettinad Chicken Curry', price: 349, description: 'Bold Chettinad spices with bone-in chicken.', image: 'https://images.unsplash.com/photo-1603894584202-933259bb49ec?w=500&auto=format&fit=crop&q=60', category: 'Main Course', isVeg: false, bestseller: true },
      { id: 'm50', name: 'Kerala Prawn Curry', price: 449, description: 'Succulent prawns in tangy coconut milk and curry leaves.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60', category: 'Main Course', isVeg: false },
      { id: 'm51', name: 'Filter Coffee', price: 69, description: 'Authentic South Indian filter coffee served in davara tumbler.', image: 'https://images.unsplash.com/photo-1512568400610-f7c42c7e4c31?w=500&auto=format&fit=crop&q=60', category: 'Beverages', isVeg: true, bestseller: true },
    ]
  }
];

const CATEGORIES = [
  { name: 'Pizza',       icon: '🍕' },
  { name: 'Burgers',     icon: '🍔' },
  { name: 'Biryani',     icon: '🍛' },
  { name: 'Indian',      icon: '🥘' },
  { name: 'Asian',       icon: '🍱' },
  { name: 'Desserts',    icon: '🍰' },
  { name: 'Healthy',     icon: '🥗' },
  { name: 'Street Food', icon: '🌮' },
  { name: 'South Indian',icon: '🫓' },
];

const OFFERS = [
  { code: 'WELCOME50', discount: 50,  minOrder: 200, type: 'flat',    description: '₹50 off on your first order' },
  { code: 'FEAST20',   discount: 20,  minOrder: 500, type: 'percent', description: '20% off on orders above ₹500', maxDiscount: 100 },
  { code: 'SAVE100',   discount: 100, minOrder: 800, type: 'flat',    description: '₹100 off on orders above ₹800' },
];

export const getRestaurants = () =>
  new Promise(resolve => setTimeout(() => resolve(MOCK_RESTAURANTS), 800));

export const getRestaurantById = (id) =>
  new Promise(resolve => setTimeout(() => resolve(MOCK_RESTAURANTS.find(r => r.id === id) || null), 400));

export const getCategories = () => CATEGORIES;

export const searchRestaurants = (query) =>
  new Promise(resolve => {
    const q = query.toLowerCase();
    const results = MOCK_RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.menu.some(m => m.name.toLowerCase().includes(q))
    );
    setTimeout(() => resolve(results), 200);
  });

export const validateCoupon = (code, cartTotal) => {
  const offer = OFFERS.find(o => o.code === code.toUpperCase());
  if (!offer) return { valid: false, message: 'Invalid promo code' };
  if (cartTotal < offer.minOrder) return { valid: false, message: `Minimum order of ₹${offer.minOrder} required` };
  let discount = offer.type === 'flat'
    ? offer.discount
    : Math.min(Math.round(cartTotal * offer.discount / 100), offer.maxDiscount || Infinity);
  return { valid: true, discount, message: offer.description };
};

export const getFeaturedRestaurants = () =>
  MOCK_RESTAURANTS.filter(r => r.featured);

export const getAllMenuItems = () => {
  const items = [];
  MOCK_RESTAURANTS.forEach(r => {
    r.menu.forEach(m => {
      items.push({ ...m, restaurantId: r.id, restaurantName: r.name });
    });
  });
  return items;
};
