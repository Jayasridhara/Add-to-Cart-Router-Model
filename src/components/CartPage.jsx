// components/CartPage.jsx (Rename CartModal.jsx to CartPage.jsx)
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; // Import Link for navigation back

function CartPage({ cartItems, removeFromCart, updateQuantity }) {
  // Removed isOpen and closeModal props as it's no longer a modal

  const navigate=useNavigate();

    useEffect(() => {
    // Check if the cart is empty
    if (cartItems.length === 0) {
      console.log("Cart is empty, redirecting...");  
      navigate('/');
    }

  }, [cartItems, navigate]);
  
  const calculateItemTotal = (item) => item.price * item.quantity;

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const discountPercentage = 0.10; // 10%
  const discountAmount = subtotal * discountPercentage;
  const finalPrice = subtotal - discountAmount;

   
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mx-auto max-w-[100%] font-righteous mt-8">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h2> 
        <button className="
        group relative flex items-center bg-blue-600 text-white text-lg
        py-2 px-4 rounded overflow-hidden
        transition-colors duration-300 hover:bg-blue-700
      ">
        <span> <Link to="/" >Continue Shopping </Link></span>
        <span className="
          inline-block ml-2 transform transition-transform duration-300
          -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
        ">
          ➜
        </span>
      </button>     
        
      </div>  
        <>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain mr-4 rounded-md mb-4 sm:mb-0"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="text-xl font-medium text-gray-800 line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-600 font-semibold mb-2">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-0">
                    <label htmlFor={`quantity-${item.id}`} className="text-gray-700">Quantity:</label>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
                      disabled={item.quantity <= 1}
                    >
                      
                    </button>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center border rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end ml-0 sm:ml-4 mt-4 sm:mt-0">
                  <p className="text-lg font-bold text-gray-800 mb-2">Item Total: ${calculateItemTotal(item).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-6 text-right">
            <div className="text-xl font-semibold text-gray-800 mb-2">
              Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-lg text-green-700 mb-2">
              Discount (10%): <span className="font-bold">-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="text-2xl font-bold text-indigo-700 mb-4">
              Final Price: <span className="text-2xl">${finalPrice.toFixed(2)}</span>
            </div>
           
          </div>
        </>
      
    </div>
  );
}

export default CartPage;