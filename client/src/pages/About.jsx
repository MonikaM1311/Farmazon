import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const team = [
  { name: 'Monika M', role: 'Co-Founder & CEO', emoji: '👩💼' },
  { name: 'Monisha M', role: 'Co-Founder & CTO', emoji: '👩💻' },
  { name: 'Arvind K', role: 'Head of Farmer Relations', emoji: '🧑🌾' },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-green-950 to-green-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Our Story</h1>
        <p className="text-green-200 max-w-xl mx-auto text-lg">
          Farmazon was born from a simple idea — what if farmers could sell directly to consumers, cutting out the middlemen and making fresh food affordable for everyone?
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We believe every family deserves access to fresh, nutritious food — and every farmer deserves a fair price for their hard work. Farmazon bridges this gap by creating a transparent, direct marketplace that benefits both sides.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { emoji: '🌱', title: 'Sustainability', desc: 'Supporting eco-friendly farming practices and reducing food waste.' },
            { emoji: '🤝', title: 'Fair Trade', desc: 'Farmers earn 40% more by selling directly without intermediaries.' },
            { emoji: '🥗', title: 'Nutrition First', desc: 'Fresh produce harvested and delivered within 24 hours.' },
          ].map((v) => (
            <div key={v.title} className="card p-6 text-center border border-green-100">
              <div className="text-4xl mb-3">{v.emoji}</div>
              <h3 className="font-bold text-green-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-50 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="card p-6 text-center border border-green-100">
                <div className="text-5xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-green-900">{t.name}</h3>
                <p className="text-yellow-600 text-sm font-medium">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-3">Join the Movement</h2>
        <p className="text-gray-500 mb-6">Whether you're a farmer or a consumer, Farmazon is for you.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/shop" className="btn-primary flex items-center gap-2">Shop Now <FiArrowRight /></Link>
          <Link to="/register" className="btn-outline">Become a Farmer</Link>
        </div>
      </section>
    </div>
  );
}
