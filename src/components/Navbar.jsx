import React from 'react'
import { Link } from 'react-router'

function Navbar({ cartCount }) { // Removed openModal, added openCartPage (which is now handled by Link directly)
  return (
    <header className="bg-white shadow-lg sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center no-wrap">
        <Link to="/" className="text-3xl font-bold text-gray-800 font-jaro">Jash e Kart</Link> {/* Link to home */}
        <Link to="/cart" className="relative transform transition-transform duration-200 hover:scale-110"> {/* Link to cart page */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;