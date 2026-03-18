import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product._id}`} className="card group block overflow-hidden border border-green-100">
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image || PLACEHOLDER}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className={`absolute top-2 left-2 badge text-white ${
          product.category === 'fruit' ? 'bg-yellow-500' :
          product.category === 'vegetable' ? 'bg-green-700' :
          product.category === 'grain' ? 'bg-amber-600' : 'bg-green-800'
        }`}>
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{product.farmerName || 'Local Farmer'}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-green-800">₹{product.price}</span>
            <span className="text-xs text-gray-400 ml-1">/{product.unit || 'kg'}</span>
          </div>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-800 to-yellow-500 text-white p-2 rounded-xl hover:opacity-90 transition-all active:scale-95"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}
