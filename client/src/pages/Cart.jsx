import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FiShoppingBag className="text-6xl text-green-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add some fresh produce to get started!</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-900">Shopping Cart ({cart.length})</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">Clear All</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="card p-4 flex items-center gap-4 border border-green-100">
              <img
                src={item.image || PLACEHOLDER}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl"
                onError={(e) => { e.target.src = PLACEHOLDER; }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-green-700 font-bold">₹{item.price}/{item.unit || 'kg'}</p>
              </div>
              <div className="flex items-center border border-green-200 rounded-xl overflow-hidden">
                <button onClick={() => updateQty(item._id, item.quantity - 1)} className="px-2 py-1.5 hover:bg-green-50">
                  <FiMinus size={14} />
                </button>
                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQty(item._id, item.quantity + 1)} className="px-2 py-1.5 hover:bg-green-50">
                  <FiPlus size={14} />
                </button>
              </div>
              <p className="font-bold text-gray-800 w-16 text-right">₹{(item.price * item.quantity).toFixed(0)}</p>
              <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition-colors ml-1">
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-20 border border-green-100">
          <h2 className="font-bold text-green-900 text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span><span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t border-green-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
              <span>Total</span><span className="text-green-800">₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
            Proceed to Checkout <FiArrowRight />
          </Link>
          <Link to="/shop" className="block text-center text-sm text-green-700 hover:underline mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
