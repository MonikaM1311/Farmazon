import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { PageLoader } from '../components/ui/Skeleton';
import { FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;
  if (!product) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Product not found.</p>
      <Link to="/shop" className="btn-primary mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/shop" className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-6 font-medium">
        <FiArrowLeft /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden shadow-md border border-green-100">
          <img
            src={product.image || PLACEHOLDER}
            alt={product.name}
            className="w-full h-80 object-cover"
            onError={(e) => { e.target.src = PLACEHOLDER; }}
          />
        </div>

        <div>
          <span className={`badge text-white mb-3 ${
            product.category === 'fruit' ? 'bg-yellow-500' :
            product.category === 'vegetable' ? 'bg-green-700' : 'bg-green-800'
          }`}>
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold text-green-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-green-800">₹{product.price}</span>
            <span className="text-gray-400">/{product.unit || 'kg'}</span>
          </div>

          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <GiWheat className="text-yellow-500" />
              <span>Farmer: <strong>{product.farmerName || product.farmerId?.name || 'Local Farmer'}</strong></span>
            </div>
            {product.harvestDate && (
              <div className="flex items-center gap-2">
                <span>🗓️ Harvested: <strong>{new Date(product.harvestDate).toLocaleDateString()}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>📦 Stock: <strong>{product.stock} {product.unit || 'kg'} available</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-green-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-green-50 transition-colors">
                <FiMinus />
              </button>
              <span className="px-4 py-2 font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-green-50 transition-colors">
                <FiPlus />
              </button>
            </div>
            <span className="text-gray-500 text-sm">Total: <strong className="text-green-800">₹{(product.price * qty).toFixed(2)}</strong></span>
          </div>

          <button onClick={handleAdd} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
            <FiShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
