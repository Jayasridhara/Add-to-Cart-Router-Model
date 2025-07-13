import { useState ,useEffect} from 'react';
import CartPage from './components/CartPage';
import loadingImage from './assets/loding.gif'
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

import { createBrowserRouter,RouterProvider, Outlet, useLoaderData, useLocation} from 'react-router';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CustomAlert from './components/CustomAlert';
const RootLayout = ({
  cartCount,
  openCartPage, // Renamed from openModal
  searchTerm,
  setSearchTerm,
  toggleSidebar,
  showCategoryDropdown,
  setShowCategoryDropdown,
  searchHistory,
  isSearchFocused,
  setIsSearchFocused,
  setCategories,
  isSidebarOpen,
  closeSidebar,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedCategories,
  selectedColors,
  setSelectedColors,
  allProducts // Pass allProducts for sidebar filters if needed
}) => {
  const location = useLocation(); // Use useLocation hook
  const isCartPage = location.pathname === '/cart';
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar cartCount={cartCount} openCartPage={openCartPage} /> {/* Pass openCartPage */}

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
         {!isCartPage && (
        <Toolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleSidebar={toggleSidebar}
          showCategoryDropdown={!isCartPage && showCategoryDropdown}
          setShowCategoryDropdown={setShowCategoryDropdown}
          searchHistory={searchHistory}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
        />
         )}
        <div className="flex flex-col md:flex-row gap-8 flex-1">
           {!isCartPage && (
          <Sidebar
            setCategories={setCategories}
            isSidebarOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
           showCategoryDropdown={!isCartPage && showCategoryDropdown} 
            isMobile={false}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            selectedCategories={selectedCategories}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            allProducts={allProducts}
          />
           )}
          <main className="flex-1">
            <Outlet /> {/* This is where nested routes (like the product list) will render */}
          </main>
        </div>
      </div>
    </div>
  );
};


function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]); // Cart state will now include quantity
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        const productsWithColors = data.map(product => {
          if (product.category === "men's clothing" || product.category === "women's clothing") {
            let availableColors = [];
            if (product.title.toLowerCase().includes('backpack') || product.title.toLowerCase().includes('mens casual slim fit')) {
              availableColors = ['Blue'];
            }
            else if (product.title.toLowerCase().includes('neck v')) {
              availableColors = ['White'];
            }
            else if (product.title.toLowerCase().includes('moto biker')) {
              availableColors = ['Black'];
            }
            else if (product.title.toLowerCase().includes('rain jacket')) {
              availableColors = ['Blue', 'White'];
            }
            else if (product.title.toLowerCase().includes('premium')) {
              availableColors = ['Black', 'Grey'];
            }
            else if (product.title.toLowerCase().includes('mens cotton jacket')) {
              availableColors = ['Black', 'Brown'];
            }
            else if (product.title.toLowerCase().includes('3-in-1') || product.title.toLowerCase().includes('womens t shirt casual')) {
              availableColors = ['Violet'];
            } else if (product.title.toLowerCase().includes('moisture')) {
              availableColors = ['Red'];
            }
            else { // Generic clothing item
              availableColors = ['Yellow', 'Green', 'Pink'];
            }
            return { ...product, colors: availableColors };
          }
          return { ...product, colors: [] };
        });
        setProducts(productsWithColors);
        setFilteredProducts(productsWithColors);

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);



  

  useEffect(() => {
    let tempProducts = [...products];

    if (searchTerm.trim().length > 1) {
      const matches = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      tempProducts = matches;
      if (matches.length > 0 && !searchHistory.includes(searchTerm)) {
        setSearchHistory(prev => {
          const updatedHistory = [searchTerm, ...prev.filter(term => term !== searchTerm)];
          return updatedHistory.slice(0, 5);
        });
      }
    }

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedPriceRange) {
      const [minStr, maxStr] = selectedPriceRange.split('-');
      const minPrice = parseFloat(minStr);
      const maxPrice = maxStr ? parseFloat(maxStr) : Infinity;

      tempProducts = tempProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (selectedColors.length > 0) {
      tempProducts = tempProducts.filter(product =>
        product.colors && selectedColors.some(color => product.colors.includes(color))
      );
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategories, selectedPriceRange, selectedColors, products]);

  // Modified addToCart to handle quantity
  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        setAlertMessage('Item is already in your cart!');
        setShowAlert(true);
        // If you want to increase quantity when already in cart, modify this:
        // return prevCart.map(item =>
        //   item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        // );
        return prevCart; // Keep existing quantity if already in cart for now
      } else {
        setAlertMessage(`${productToAdd.title} added to cart!`);
        setShowAlert(true);
        return [...prevCart, { ...productToAdd, quantity: 1 }]; // Add with quantity 1
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
    // Check if the user is about to remove the last item
    if (prevCart.length === 1 && prevCart[0].id === productId) {
      setAlertMessage('Your Cart is empty Continue Shopping!');
      setShowAlert(true);
    } else {
      setAlertMessage('Item removed from cart!');
      setShowAlert(true);
    }
    // Return the new cart state
    return prevCart.filter(item => item.id !== productId);
  });
    
  };

  // New function to update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item // Ensure quantity is at least 1
      );
    });
  };


  const closeAlert = () => setShowAlert(false);

  // Use useNavigate for programatic navigation
  const navigate = createBrowserRouter; // This is not how you use useNavigate

  // This should be inside your functional component to use hooks:
  // import { useNavigate } from 'react-router-dom';
  // const navigate = useNavigate();
  // const openCartPage = () => {
  //   navigate('/cartmodal');
  // };

  // For now, let's just make it a simple function to pass to Navbar if not using hooks inside App directly
  // The navigate function will be defined in the router setup below.

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} // Total quantity for cart icon
          openCartPage={() => router.navigate('/cart')} // Programmatic navigation
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          showCategoryDropdown={showCategoryDropdown}
          setShowCategoryDropdown={setShowCategoryDropdown}
          searchHistory={searchHistory}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          setCategories={setCategories}
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedCategories={selectedCategories}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          allProducts={products}
        />
      ),
      children: [
        {
          index: true, // This makes it the default child route for "/"
          element: (
            <div className="min-h-[300px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {(filteredProducts.length > 0 ? filteredProducts : products).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    isInCart={cart.some(item => item.id === product.id)} // Pass if in cart
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          path: "cart", // This defines the route for your cart page
          element: (
            <CartPage
              cartItems={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity} // Pass new function
            />
          ),
        },
      ],
    },
  ]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src={loadingImage} alt="Loading..." className='w-full h-full object-contain' />
        </div>
      ) : (
        <>
          <RouterProvider router={router} />
          <CustomAlert
            isOpen={showAlert}
            message={alertMessage}
            onClose={closeAlert}
          />
        </>
      )}
    </>
  );
}

export default App;