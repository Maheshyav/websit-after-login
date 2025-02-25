import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-accent-600">
            LUXE
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/electronics" className="text-primary-700 hover:text-accent-600 transition-colors">
              Electronics
            </Link>
            <Link to="/men" className="text-primary-700 hover:text-accent-600 transition-colors">
              Men
            </Link>
            <Link to="/women" className="text-primary-700 hover:text-accent-600 transition-colors">
              Women
            </Link>
            <Link to="/watches" className="text-primary-700 hover:text-accent-600 transition-colors">
              Watches
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-primary-700 hover:text-accent-600 transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-primary-700 hover:text-accent-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-primary-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/electronics" 
                className="text-primary-700 hover:text-accent-600 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                to="/men" 
                className="text-primary-700 hover:text-accent-600 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-primary-700 hover:text-accent-600 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/watches" 
                className="text-primary-700 hover:text-accent-600 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Watches
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}