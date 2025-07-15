import { useState } from "react";


function ProductCard({ product, addToCart,removeFromCart,isInCart }) {
  const [showFullDescription, setShowFullDescription] = useState(false); // New state for description

  
  const handleAdd = () => addToCart(product);
  const handleRemove = () => removeFromCart(product.id);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Define a character limit for the collapsed description
  const descriptionCharLimit = 100; // You can adjust this number

  // Check if the description needs truncation
  const needsTruncation = product.description.length > descriptionCharLimit;

  // Get the display description based on the state
  const displayDescription = showFullDescription || !needsTruncation
    ? product.description
    : `${product.description.substring(0, descriptionCharLimit)}...`;


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />
      <div className="p-4 flex-grow flex flex-col font-rowdies">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        {/* Updated description display */}
        <p className="text-gray-600 text-sm mb-2 flex-grow font-rowdies">
          {displayDescription}
          {needsTruncation && ( // Only show "show more/less" if description is long enough to truncate
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:text-blue-700 ml-1 font-medium focus:outline-none"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          )}
        </p>
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>

          {isInCart ? (
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;