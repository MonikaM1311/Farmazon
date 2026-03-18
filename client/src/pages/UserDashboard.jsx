import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { PageLoader } from '../components/ui/Skeleton';
import { FiPackage, FiUser, FiMapPin, FiClock, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const STATUS_COLOR = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-green-100 text-green-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];
const STATUS_ICONS = { pending: '🕐', confirmed: '✅', shipped: '🚚', delivered: '🎉', cancelled: '❌' };

function OrderStatusTracker({ status }) {
  if (status === 'cancelled') {
    return (
      <div className="mt-3 flex items-center gap-2 py-2 px-3 bg-red-50 rounded-xl border border-red-100 text-sm text-red-600 font-medium">
        ❌ Order Cancelled
      </div>
    );
  }
  const currentIdx = STATUS_STEPS.indexOf(status);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        {STATUS_STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i <= currentIdx
                  ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {i < currentIdx ? '✓' : i === currentIdx ? STATUS_ICONS[step] : i + 1}
              </div>
              <span className={`text-xs capitalize font-medium ${i <= currentIdx ? 'text-green-800' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-1 mb-5 rounded-full transition-all ${i < currentIdx ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('orders');
  const [profile, setProfile] = useState({ name: user?.name || '', address: user?.address || '', phone: '' });
  const [saving, setSaving] = useState(false);

  const fetchOrders = () =>
    api.get('/orders/my')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchOrders();
    // Poll every 15s — buyer sees farmer status updates without manual refresh
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/auth/profile', profile);
      updateUser(data);
      toast.success('Profile updated!');
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-green-800 to-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-green-900">{user?.name}</h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-green-100">
        {[['orders', 'My Orders', <FiPackage />], ['profile', 'Profile', <FiUser />]].map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key ? 'border-green-700 text-green-800' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        loading ? <PageLoader /> : orders.length === 0 ? (
          <div className="text-center py-16">
            <FiPackage className="text-5xl text-green-200 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Manual refresh button */}
            <div className="flex justify-end">
              <button
                onClick={fetchOrders}
                className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 transition-colors"
              >
                <FiRefreshCw size={12} /> Refresh
              </button>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="card p-5 border border-green-100">
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div>
                    <p className="font-semibold text-green-900">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <FiClock size={11} /> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge capitalize ${STATUS_COLOR[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_ICONS[order.status]} {order.status}
                  </span>
                </div>

                {/* Visual status stepper */}
                <OrderStatusTracker status={order.status} />

                {/* Products */}
                <div className="text-sm text-gray-600 space-y-1 mt-4 pt-3 border-t border-green-50">
                  {order.products.map((p, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{p.name} × {p.quantity}</span>
                      <span>₹{(p.price * p.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-green-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FiMapPin size={11} /> {order.deliveryAddress}
                  </span>
                  <span className="font-bold text-green-800">₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'profile' && (
        <div className="card p-6 max-w-lg border border-green-100">
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Full Name</label>
              <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Email</label>
              <input className="input bg-gray-50" value={user?.email} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Phone</label>
              <input className="input" placeholder="+91 XXXXX XXXXX" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Address</label>
              <textarea className="input resize-none" rows={2} value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
