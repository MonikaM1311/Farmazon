import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FiMapPin, FiCreditCard } from 'react-icons/fi';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [payment, setPayment] = useState('COD');
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return toast.error('Please enter delivery address');
    if (!cart.length) return toast.error('Cart is empty');

    setLoading(true);
    try {
      const products = cart.map((i) => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      }));
      const { data } = await api.post('/orders', { products, deliveryAddress: address, paymentMethod: payment });
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleOrder} className="lg:col-span-2 space-y-4">
          <div className="card p-6 border border-green-100">
            <h2 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <FiMapPin className="text-yellow-500" /> Delivery Address
            </h2>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="card p-6 border border-green-100">
            <h2 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <FiCreditCard className="text-yellow-500" /> Payment Method
            </h2>
            <div className="space-y-2">
              {[['COD', '💵 Cash on Delivery'], ['UPI', '📱 UPI Payment'], ['Card', '💳 Credit/Debit Card']].map(([val, label]) => (
                <label key={val} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${payment === val ? 'border-green-700 bg-green-50' : 'border-gray-200 hover:border-green-400'}`}>
                  <input type="radio" name="payment" value={val} checked={payment === val} onChange={() => setPayment(val)} className="accent-green-700" />
                  <span className="font-medium text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? 'Placing Order...' : `Place Order — ₹${total.toFixed(2)}`}
          </button>
        </form>

        <div className="card p-6 h-fit border border-green-100">
          <h2 className="font-bold text-green-900 mb-4">Order Items ({cart.length})</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1">{item.name} × {item.quantity}</span>
                <span className="font-semibold ml-2">₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-green-100 mt-4 pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span className="text-green-800">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
