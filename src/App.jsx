import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Search, Star, User, Menu, X } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProductView, setCurrentProductView] = useState(null);

  // Categories for the filter
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'kids', name: 'Kids' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'cycles', name: 'Cycles' },
    { id: 'bags', name: 'Bags' },
    { id: 'fitness', name: 'Fitness' }
  ];
  // Modified button click handler
const handleExploreNow = () => {
  // First filter to show all products
  filterProducts('all');
  
  // Then scroll to the products section
  if (productsRef.current) {
    productsRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};


  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Initialize products with corrected categorization
useEffect(() => {
  // Mock product data with corrected category/subcategory structure
  const mockProducts = [
    {
      id: 1,
      name: 'Pro Runner Shoes',
      category: 'shoes',  // Primary category
      subcategory: 'men', // Secondary category
      price: 79.99,
      rating: 4.5,
      imageUrl: 'src/assets/1.png',
      description: 'Premium running shoes with enhanced cushioning and support for professional athletes.'
    },
    {
      id: 2,
      name: 'Training Shorts',
      category: 'men',
      subcategory: 'all',
      price: 29.99,
      rating: 4.2,
      imageUrl: 'src/assets/2.png',
      description: 'Comfortable training shorts with moisture-wicking fabric, perfect for intense workouts.'
    },
    {
      id: 3,
      name: 'Yoga Mat',
      category: 'fitness',
      subcategory: 'all',
      price: 24.99,
      rating: 4.8,
      imageUrl: 'src/assets/3.png',
      description: 'Non-slip yoga mat with extra padding for comfort during your practice.'
    },
    {
      id: 4,
      name: 'Mountain Bike',
      category: 'cycles',
      subcategory: 'all',
      price: 499.99,
      rating: 4.7,
      imageUrl: 'src/assets/4.png',
      description: 'Durable mountain bike with aluminum frame and 21-speed gear system.'
    },
    {
      id: 5,
      name: 'Sports Backpack',
      category: 'bags',
      subcategory: 'all',
      price: 39.99,
      rating: 4.3,
      imageUrl: 'src/assets/5.png',
      description: 'Spacious backpack with multiple compartments, perfect for gym or travel.'
    },
    {
      id: 6,
      name: 'Tennis Racket',
      category: 'all',
      subcategory: 'all',
      price: 89.99,
      rating: 4.6,
      imageUrl: 'src/assets/6.png',
      description: 'Professional-grade tennis racket with balanced weight distribution for better control.'
    },
    {
      id: 7,
      name: 'Women\'s Running Leggings',
      category: 'women',
      subcategory: 'all',
      price: 34.99,
      rating: 4.4,
      imageUrl: 'src/assets/7.png',
      description: 'High-waisted leggings with pocket, perfect for running and gym workouts.'
    },
    {
      id: 8,
      name: 'Kids Football',
      category: 'kids',
      subcategory: 'all',
      price: 19.99,
      rating: 4.1,
      imageUrl: 'src/assets/8.png',
      description: 'Durable football sized for kids, with bright colors for better visibility.'
    },
    {
      id: 9,
      name: 'Fitness Tracker',
      category: 'fitness',
      subcategory: 'all',
      price: 59.99,
      rating: 4.5,
      imageUrl: 'src/assets/9.png',
      description: 'Smart fitness tracker with heart rate monitoring and sleep analysis.'
    },
    {
      id: 10,
      name: 'Cycling Helmet',
      category: 'cycles',
      subcategory: 'all',
      price: 49.99,
      rating: 4.9,
      imageUrl: 'src/assets/10.png',
      description: 'Lightweight cycling helmet with adjustable fit and ventilation system.'
    },
    {
      id: 11,
      name: 'Women\'s Training Shoes',
      category: 'shoes',
      subcategory: 'women',
      price: 69.99,
      rating: 4.3,
      imageUrl: 'src/assets/11.png',
      description: 'Versatile training shoes for women with extra support and cushioning.'
    },
    {
      id: 12,
      name: 'Kids Swim Goggles',
      category: 'kids',
      subcategory: 'all',
      price: 14.99,
      rating: 4.2,
      imageUrl: 'src/assets/12.png',
      description: 'Comfortable swim goggles with anti-fog coating, designed for children.'
    }
  ];
  
  console.log('Loading products:', mockProducts.length);
  setProducts(mockProducts);
  setFilteredProducts(mockProducts);
  setActiveCategory('all');
}, []);
// Completely revised filter products function
const filterProducts = (categoryId) => {
  console.log('Filtering by category:', categoryId);
  
  // Update active category state
  setActiveCategory(categoryId);
  
  // If we don't have products yet, don't try to filter
  if (!products || !products.length) {
    console.log('No products to filter');
    return;
  }
  
  // Special case for "all" category
  if (categoryId === 'all') {
    console.log('Showing all products:', products.length);
    setFilteredProducts([...products]); // Use a new array to ensure state update
    return;
  }
  
  // For specific categories - use clean, straightforward logic
  const filtered = products.filter(product => {
    // Check if product matches selected category (either primary category or subcategory)
    return product.category === categoryId || product.subcategory === categoryId;
  });
  
  console.log(`Found ${filtered.length} products in category "${categoryId}"`);
  
  // Update filtered products state with new array
  setFilteredProducts([...filtered]);
};

// Add this effect to debug - this will show us what's happening
// with the filtered products whenever they change
useEffect(() => {
  console.log('Filtered products updated:', filteredProducts.length);
}, [filteredProducts]);
  // Toggle wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Open product view
  const openProductView = (product) => {
    setCurrentProductView(product);
  };

  // Close product view
  const closeProductView = () => {
    setCurrentProductView(null);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-md sticky top-0 z-40"
      >
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">DECATHLON</h1>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all duration-300 group-hover:shadow-md"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
                >
                  <User className="h-6 w-6" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300 relative"
                >
                  <Heart className="h-6 w-6" />
                  {wishlist.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
                >
                  <ShoppingCart className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
            
            <div className="md:hidden">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <div className="flex justify-around">
                  <button className="text-gray-600 hover:text-blue-700 flex flex-col items-center">
                    <User className="h-6 w-6" />
                    <span className="text-xs mt-1">Account</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-700 flex flex-col items-center relative">
                    <Heart className="h-6 w-6" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                    <span className="text-xs mt-1">Wishlist</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-700 flex flex-col items-center">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="text-xs mt-1">Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        <div className="h-96 md:h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("src/assets/hero.png")' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-blue-900/100 flex items-center">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-2xl"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight"
                >
                  Gear Up For <span className="text-blue-400">Greatness</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xl md:text-2xl text-gray-200 mb-8"
                >
                  Premium sports equipment for every athlete
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.button 
  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg"
  onClick={handleExploreNow}
>
  Explore Now
</motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden"
        >
          <svg className="absolute top-0 right-0 h-full opacity-10" viewBox="0 0 100 100">
            <circle cx="95" cy="5" r="20" fill="white" />
            <circle cx="85" cy="45" r="10" fill="white" />
            <circle cx="75" cy="75" r="15" fill="white" />
          </svg>
        </motion.div> */}
      </section>

      {/* Shop By Category Section - Integrated with Product Display */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Shop By Category</h2>
            <div className="h-1 w-20 bg-blue-700 mx-auto"></div>
          </motion.div>
          
          {/* Category Filter Buttons */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {/* Updated category buttons with proper event handling */}
{categories.map((category) => (
  <motion.button
    key={category.id}
    variants={fadeInUp}
    whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      console.log(`Clicked on category: ${category.id}`);
      filterProducts(category.id);
    }}
    className={`px-6 py-3 rounded-full transition-all duration-300 ${
      activeCategory === category.id
        ? 'bg-blue-700 text-white shadow-lg shadow-blue-500/30'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }`}
  >
    {category.name}
  </motion.button>
))}
          </motion.div>
          
          {/* Products Display - Directly integrated with category selection */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group relative"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
                      {/* Product image with overlay */}
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onClick={() => openProductView(product)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Quick actions */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-100 transition-colors duration-300"
                            onClick={() => openProductView(product)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWishlist(product.id)}
                            className="bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors duration-300"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                              }`}
                            />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-100 transition-colors duration-300"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Category label */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product info */}
                    <div className="mt-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-700 transition-colors duration-300">{product.name}</h3>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : i < product.rating 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-blue-700 font-bold text-xl">${product.price.toFixed(2)}</div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 rounded-lg transition-all duration-300 shadow hover:shadow-md"
                      onClick={() => openProductView(product)}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={fadeInUp}
                className="text-center py-16"
              >
                <h3 className="text-xl text-gray-600">No products found in this category.</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => filterProducts('all')}
                  className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-300"
                >
                  View All Products
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Product View Modal */}
      {currentProductView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{currentProductView.name}</h2>
                <button 
                  onClick={closeProductView}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={currentProductView.imageUrl} 
                      alt={currentProductView.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(currentProductView.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : i < currentProductView.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">{currentProductView.rating.toFixed(1)}</span>
                    </div>
                    
                    <p className="text-3xl font-bold text-blue-700 mb-4">
                      ${currentProductView.price.toFixed(2)}
                    </p>
                    
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{currentProductView.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700">Category:</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {currentProductView.category}
                        </span>
                        {currentProductView.subcategory !== 'all' && (
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {currentProductView.subcategory}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleWishlist(currentProductView.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                            wishlist.includes(currentProductView.id) 
                              ? 'bg-red-50 text-red-500' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Heart 
                            className={`h-6 w-6 ${
                              wishlist.includes(currentProductView.id) ? 'fill-red-500' : ''
                            }`} 
                          />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* About Us Section - New */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4">About <span className="text-blue-700">DECATHLON</span></h2>
              <div className="h-1 w-20 bg-blue-700 mb-6"></div>
              <p className="text-gray-600 mb-4">Decathlon is committed to making sports accessible to everyone. Founded with a passion for athleticism and outdoor activities, we've grown into a global brand trusted by professionals and amateurs alike.</p>
              <p className="text-gray-600 mb-6">Our mission is to sustainably bring the power and joy of sports to the many. We design, produce and sell sporting goods for over 80 sports, focusing on quality, innovation, and affordability.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="mr-3 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quality Products</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Expert Advice</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Eco-friendly</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Affordable Prices</span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 mt-8 md:mt-0"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="rounded-lg overflow-hidden shadow-lg h-64"
                >
                  <img src="src/assets/13.png" alt="Team" className="w-full h-64 object-cover" />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="rounded-lg overflow-hidden shadow-lg mt-8"
                >
                  <img src="src/assets/15.png" alt="Store" className="w-full h-64 object-cover" />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="rounded-lg overflow-hidden shadow-lg -mt-4 h-64"
                >
                  <img src="src/assets/14.png" alt="Products" className="w-full h-64 object-cover" />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="rounded-lg overflow-hidden shadow-lg mt-4"
                >
                  <img src="src/assets/4.png" alt="Sports" className="w-full h-64 object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
            <div className="h-1 w-20 bg-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">Experience the difference with our premium sports equipment and exceptional customer service.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fast Delivery",
                description: "Get your sports gear delivered within 24-48 hours with our express shipping options."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Quality Guarantee",
                description: "All our products come with a 2-year warranty and 30-day money-back guarantee."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Easy Returns",
                description: "Not satisfied? Return your purchase hassle-free with our simple return process."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "24/7 Support",
                description: "Our customer support team is available round the clock to assist you with any queries."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-800/30 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-blue-700/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-2"
              >
                <div className="bg-blue-600/50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Customers Say - New Section with Rounded Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <div className="h-1 w-20 bg-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their experience with our products and services.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Professional Runner",
                image: "src/assets/team4.webp",
                quote: "The Pro Runner Shoes changed my training routine completely. The cushioning and support are unparalleled. I've improved my timing significantly!"
              },
              {
                name: "Michael Chen",
                role: "Cycling Enthusiast",
                image: "src/assets/team3.avif",
                quote: "I've been using Decathlon's Mountain Bike for over a year now, and it's by far the best investment I've made. Durable, reliable, and great value for money."
              },
              {
                name: "Priya Sharma",
                role: "Yoga Instructor",
                image: "src/assets/team2.jpg",
                quote: "The quality of Decathlon's yoga mats is exceptional. My students always ask where I got mine from. The grip and padding are perfect for all yoga styles."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="rounded-full border-4 border-white shadow-lg overflow-hidden w-20 h-20">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-blue-700 text-sm">{testimonial.role}</p>
                  
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-1 bg-blue-700 text-white text-xs rounded-full">
                      Verified Purchase
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            >
              Read More Testimonials
            </motion.button>
          </div>
        </div>
      </section>

      {/* Enhanced Products Showcase - Unique UI */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <div className="h-1 w-20 bg-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our most popular products that athletes are loving right now.</p>
          </motion.div>
          
          <div className="relative">
            {/* Unique hexagonal grid layout */}
            <div className="flex flex-wrap justify-center">
              {filteredProducts.slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"
                >
                  <div className="relative group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative">
                      {/* Hexagonal overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent group-hover:opacity-0 transition-opacity duration-500 clip-hexagon"></div>
                      
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onClick={() => openProductView(product)}
                      />
                      
                      {/* Info overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <h3 className="text-white font-bold text-xl mb-2">{product.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-lg">${product.price.toFixed(2)}</span>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleWishlist(product.id)}
                              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                            >
                              <Heart
                                className={`h-5 w-5 ${
                                  wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'
                                }`}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                            >
                              <ShoppingCart className="h-5 w-5 text-white" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Trending
                      </span>
                    </div>
                    
                    {/* Rating strip */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-lg">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs font-medium">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            >
              View All Trending Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletters Section - Enhanced with better search UI */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600 rounded-full opacity-20"></div>
          <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-400 rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-full opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold mb-2">Join Our Newsletter</h2>
              <div className="h-1 w-20 bg-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-100 max-w-2xl mx-auto">Subscribe to our newsletter to get updates on new products, exclusive deals, and sports tips from our experts.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <h3 className="text-blue-900 font-bold text-xl mb-2">Get 15% Off Your First Order</h3>
                  <p className="text-gray-600 mb-6">Plus receive exclusive access to sales and new product launches.</p>
                  
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-36 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                      >
                        Subscribe Now
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <input type="checkbox" id="privacy" className="mr-2" />
                    <label htmlFor="privacy">I agree to receive promotional emails and accept the <a href="#" className="text-blue-700 underline">Privacy Policy</a></label>
                  </div>
                </div>
                
                <div className="hidden md:block border-l-2 border-gray-200 h-32"></div>
                
                <div className="md:w-1/3 text-center md:text-left">
                  <h4 className="font-semibold text-blue-900 mb-3">Also follow us on:</h4>
                  <div className="flex justify-center md:justify-start space-x-4">
                    {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                      <motion.a
                        key={social}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 transition-colors duration-300"
                        href="#"
                      >
                        <img src={`src/assets/${social}.svg`} alt={social} className="h-6 w-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sports Events Calendar - New Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Upcoming Sports Events</h2>
            <div className="h-1 w-20 bg-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Join us at these exciting events and showcase your skills with Decathlon gear.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "City Marathon 2025",
                date: "May 15, 2025",
                location: "Central Park",
                image: "src/assets/16.png",
                category: "Running"
              },
              {
                title: "Mountain Biking Championship",
                date: "June 10, 2025",
                location: "Rocky Trails",
                image: "src/assets/17.png",
                category: "Cycling"
              },
              {
                title: "Beach Volleyball Tournament",
                date: "July 5, 2025",
                location: "Sunny Beach",
                image: "src/assets/18.png",
                category: "Volleyball"
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-blue-700 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-white text-xl font-bold">{event.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="mr-4 text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-700 font-semibold hover:text-blue-900 transition-colors duration-300"
                    >
                      Learn More
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
                    >
                      Register
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            >
              View All Events
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-6">DECATHLON</h2>
              <p className="text-gray-400 mb-4">Making sports accessible to the many since 1976. Quality products at affordable prices.</p>
              <div className="flex space-x-4 mt-6">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    <img src={`src/assets/${social}.svg`} alt={social} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 relative">
                <span className="block mb-2">Quick Links</span>
                <span className="block w-12 h-1 bg-blue-700"></span>
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Contact Us', 'Careers', 'Stores', 'Blog', 'Gift Cards'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 relative">
                <span className="block mb-2">Customer Service</span>
                <span className="block w-12 h-1 bg-blue-700"></span>
              </h3>
              <ul className="space-y-3">
                {['FAQ', 'Shipping Policy', 'Returns & Exchanges', 'Track Order', 'Privacy Policy', 'Terms & Conditions'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 relative">
                <span className="block mb-2">Contact Us</span>
                <span className="block w-12 h-1 bg-blue-700"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Sports Avenue, Fitness City, SP 12345</span>
                </li>
                <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">support@decathlon.com</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Download Our App</h4>
                <div className="flex space-x-3">
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                    <img src="src/assets/app-store.png" alt="App Store" className="h-8" />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                    <img src="src/assets/play-store.png" alt="Play Store" className="h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Decathlon. All rights reserved.
              </p>
              
              <div className="flex flex-wrap justify-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300">Sitemap</a>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <span className="text-gray-500 text-sm mr-4">Payment Methods:</span>
                <div className="flex space-x-2">
                  {['visa', 'mastercard', 'amex', 'paypal'].map((payment) => (
                    <div key={payment} className="bg-gray-800 p-1 rounded">
                      <img src={`src/assets/${payment}.svg`} alt={payment} className="h-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Quick View Modal */}
      {currentProductView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeProductView}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
                <img 
                  src={currentProductView.imageUrl} 
                  alt={currentProductView.name}
                  className="max-h-[60vh] object-contain" 
                />
              </div>
              
              <div className="md:w-1/2 p-8 flex flex-col h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentProductView.name}</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(currentProductView.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : i < currentProductView.rating 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">{currentProductView.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    onClick={closeProductView}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                    {currentProductView.category}
                  </span>
                  <p className="text-3xl font-bold text-blue-800 mb-4">
                    ${currentProductView.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {currentProductView.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button 
                        key={size}
                        className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Select Color</h3>
                  <div className="flex space-x-3">
                    {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'].map((color, i) => (
                      <button 
                        key={i}
                        className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md hover:scale-110 transition-transform duration-300`}
                      ></button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300">-</button>
                      <span className="px-4 py-2">1</span>
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300">+</button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleWishlist(currentProductView.id)}
                    className={`mt-4 w-full py-3 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all duration-300 ${
                      wishlist.includes(currentProductView.id)
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.includes(currentProductView.id) ? 'fill-red-500' : ''
                      }`}
                    />
                    <span>
                      {wishlist.includes(currentProductView.id) ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Sticky Add to Cart Button (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-30">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>View Cart</span>
        </motion.button>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-24 md:bottom-8 right-8 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 z-30"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* CSS for Hexagonal Clip Path */}
      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
        }
      `}</style>
    </div>
  );
}

export default App;