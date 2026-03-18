import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { PageLoader } from '../components/ui/Skeleton';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';

const STATUS_STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiCheckCircle className="text-green-700 text-4xl" />
      </div>
      <h1 className="text-3xl font-extrabold text-green-900 mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-6">Your fresh produce is on its way 🌿</p>

      {order && (
        <div className="card p-6 text-left mb-6 border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-green-900">Order #{order._id.slice(-8).toUpperCase()}</h2>
            <span className="badge bg-green-100 text-green-800 capitalize">{order.status}</span>
          </div>

          {/* Status Tracker */}
          <div className="flex items-center justify-between mb-6">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  STATUS_STEPS.indexOf(order.status) >= i
                    ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded ${STATUS_STEPS.indexOf(order.status) > i ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-4">
            {STATUS_STEPS.map((s) => <span key={s} className="capitalize">{s}</span>)}
          </div>

          <div className="space-y-2 text-sm">
            {order.products.map((p, i) => (
              <div key={i} className="flex justify-between text-gray-600">
                <span>{p.name} × {p.quantity}</span>
                <span>₹{(p.price * p.quantity).toFixed(0)}</span>
              </div>
            ))}
            <div className="border-t border-green-100 pt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span><span className="text-green-800">₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-xl text-sm text-gray-600">
            <FiPackage className="inline mr-2 text-yellow-500" />
            Delivering to: {order.deliveryAddress}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        <Link to="/dashboard" className="btn-outline">View Orders</Link>
      </div>
    </div>
  );
}
