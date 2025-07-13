import React from 'react';
import { Link } from 'react-router';


function Navbar({ cartCount }) {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center no-wrap">
        <Link to="/" className="text-3xl font-bold text-gray-800 font-jaro">Jash e Kart</Link>

        {cartCount > 0 ? (
          // If cartCount is greater than 0, render the interactive Link
          <Link to="/cart" className="relative transform transition-transform duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
          </Link>
        ) : (
          // If cartCount is 0 or less, render a non-interactive element
          <span className="relative text-gray-400 cursor-not-allowed"> {/* Changed to span, changed text color, added cursor style */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* You might still want to show a '0' count or no count when disabled */}
            {/* {cartCount > 0 && ( */}
              <span className="absolute -top-2 -right-3 bg-gray-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            {/* )} */}
          </span>
        )}
      </nav>
    </header>
  );
}

export default Navbar;