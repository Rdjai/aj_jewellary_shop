import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white">
      <nav className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif text-neutral-900">Aj Jewellary</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">Collections</Link>
              <Link to="/rings" className="text-neutral-600 hover:text-neutral-900 transition-colors">Rings</Link>
              <Link to="/necklaces" className="text-neutral-600 hover:text-neutral-900 transition-colors">Necklaces</Link>
              <Link to="/earrings" className="text-neutral-600 hover:text-neutral-900 transition-colors">Earrings</Link>
              <Link to="/bracelets" className="text-neutral-600 hover:text-neutral-900 transition-colors">Bracelets</Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-neutral-600" />
              </button>

              <button className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <Link to="/cart" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-neutral-600" />
                </Link>


              </button>
              <button className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <Link to="/login" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <User className="w-5 h-5 text-neutral-600" />
                </Link>

              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 text-neutral-600" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-neutral-50 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-600" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200">
            {/* Mobile Search */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="py-2">
              <Link to="/" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50">Collections</Link>
              <Link to="/rings" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50">Rings</Link>
              <Link to="/necklaces" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50">Necklaces</Link>
              <Link to="/earrings" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50">Earrings</Link>
              <Link to="/bracelets" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50">Bracelets</Link>
              <div className="px-4 py-3 flex items-center space-x-4 border-t border-neutral-200">
                <button className="flex items-center text-neutral-600 hover:text-neutral-900">
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                </button>

                <button className="flex items-center text-neutral-600 hover:text-neutral-900">
                  <User className="w-5 h-5 mr-2" />
                  Account
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;