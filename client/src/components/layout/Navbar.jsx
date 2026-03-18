import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-green-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GiWheat className="text-yellow-400 text-2xl" />
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Farmazon
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-green-100 hover:text-yellow-400 font-medium transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 hover:bg-green-800 rounded-xl transition-colors">
            <FiShoppingCart className="text-xl text-green-100" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-green-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded-xl transition-colors"
              >
                <FiUser className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-300 hidden sm:block">{user.name.split(' ')[0]}</span>
              </button>
              {dropOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    to={user.role === 'farmer' ? '/farmer/dashboard' : '/dashboard'}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    onClick={() => setDropOpen(false)}
                  >
                    <FiUser size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <FiLogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
          )}

          <button className="md:hidden p-2 text-green-100" onClick={() => setOpen(!open)}>
            {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-green-800 border-t border-green-700 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-green-100 hover:text-yellow-400 font-medium py-1 transition-colors" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
