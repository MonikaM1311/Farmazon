import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { GiWheat } from 'react-icons/gi';
import { FiUser, FiMail, FiLock, FiMapPin } from 'react-icons/fi';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'consumer', address: '' });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Welcome to Farmazon, ${user.name}!`);
      navigate(user.role === 'farmer' ? '/farmer/dashboard' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 to-green-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GiWheat className="text-yellow-400 text-3xl" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Farmazon</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-green-300 text-sm mt-1">Join the farm-to-table revolution</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Role Toggle */}
          <div className="flex bg-green-50 rounded-xl p-1 mb-5 border border-green-100">
            {['consumer', 'farmer'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => set('role', r)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  form.role === r
                    ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-green-800'
                }`}
              >
                {r === 'consumer' ? '🛒 Consumer' : '🌾 Farmer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="input pl-10" placeholder="Full name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" className="input pl-10" placeholder="Email address" value={form.email} onChange={(e) => set('email', e.target.value)} required />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" className="input pl-10" placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => set('password', e.target.value)} required />
            </div>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="input pl-10" placeholder="Address (optional)" value={form.address} onChange={(e) => set('address', e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
