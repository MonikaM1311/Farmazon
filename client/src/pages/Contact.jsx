import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-green-900 mb-2">Get in Touch</h1>
        <p className="text-gray-500">Have questions? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card p-6 border border-green-100">
            <h2 className="font-bold text-green-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              {[
                { icon: <FiMail className="text-yellow-500" />, label: 'Email', value: 'support@farmazon.in' },
                { icon: <FiPhone className="text-yellow-500" />, label: 'Phone', value: '+91 72006 11502' },
                { icon: <FiMapPin className="text-yellow-500" />, label: 'Address', value: 'Pollachi Road , Coimbatore , Tamil Nadu 641001 ' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="mt-0.5">{c.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400">{c.label}</p>
                    <p className="text-gray-700 font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-green-900 to-green-800 border border-green-700">
            <h3 className="font-bold text-yellow-400 mb-2">🌾 Are you a farmer?</h3>
            <p className="text-green-200 text-sm">Join Farmazon and start selling your produce directly to thousands of consumers. No fees, no middlemen.</p>
          </div>
        </div>

        <div className="card p-6 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-green-900 mb-1 block">Name</label>
                <input className="input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium text-green-900 mb-1 block">Email</label>
                <input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Subject</label>
              <input className="input" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium text-green-900 mb-1 block">Message</label>
              <textarea className="input resize-none" rows={4} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              <FiSend size={16} /> {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
