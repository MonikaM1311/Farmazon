import { Link } from 'react-router-dom';
import { GiWheat } from 'react-icons/gi';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GiWheat className="text-yellow-400 text-2xl" />
            <span className="text-white font-bold text-xl">Farmazon</span>
          </div>
          <p className="text-sm text-green-400">Farm-fresh produce delivered directly from farmers to your doorstep.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-yellow-400 transition-colors"><FiInstagram size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FiTwitter size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FiFacebook size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-yellow-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">For Farmers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/register" className="hover:text-yellow-400 transition-colors">Sell on Farmazon</Link></li>
            <li><Link to="/farmer/dashboard" className="hover:text-yellow-400 transition-colors">Farmer Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-green-400">
            <li>support@farmazon.in</li>
            <li>+91 72006 11502</li>
            <li>Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-green-800 text-center text-sm text-green-500">
        © {new Date().getFullYear()} Farmazon. All rights reserved.
      </div>
    </footer>
  );
}
