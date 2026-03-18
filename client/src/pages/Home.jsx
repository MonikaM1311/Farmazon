import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiStar } from 'react-icons/fi';
import { GiWheat, GiFruitBowl, GiCarrot } from 'react-icons/gi';

const features = [
  { icon: <GiFruitBowl className="text-3xl text-green-700" />, title: 'Fresh & Organic', desc: 'Directly from farms, no middlemen, no preservatives.' },
  { icon: <FiTruck className="text-3xl text-yellow-500" />, title: 'Fast Delivery', desc: 'Same-day delivery from local farms to your doorstep.' },
  { icon: <FiShield className="text-3xl text-green-700" />, title: 'Quality Assured', desc: 'Every product is verified and quality-checked.' },
  { icon: <GiCarrot className="text-3xl text-yellow-500" />, title: 'Support Farmers', desc: 'Your purchase directly supports local farming families.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Home Cook', text: 'The vegetables are so fresh! I can taste the difference from supermarket produce.', avatar: 'PS' },
  { name: 'Rahul Verma', role: 'Fitness Enthusiast', text: 'Love the organic fruits. The AI assistant helped me pick the right ones for my diet!', avatar: 'RV' },
  { name: 'Anita Patel', role: 'Mother of 2', text: 'Farmazon has made healthy eating so easy and affordable for my family.', avatar: 'AP' },
];

const categories = [
  { label: 'Fruits', emoji: '🍎', color: 'from-yellow-500 to-amber-600', cat: 'fruit' },
  { label: 'Vegetables', emoji: '🥦', color: 'from-green-700 to-green-900', cat: 'vegetable' },
  { label: 'Grains', emoji: '🌾', color: 'from-yellow-600 to-yellow-800', cat: 'grain' },
  { label: 'Dairy', emoji: '🥛', color: 'from-green-600 to-green-800', cat: 'dairy' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-yellow-400/20 text-yellow-300 text-sm px-4 py-1 rounded-full mb-4 font-medium border border-yellow-400/30">
              🌱 Farm to Table, Direct
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Fresh Produce,<br />
              <span className="text-yellow-400">Straight from Farms</span>
            </h1>
            <p className="text-green-200 text-lg mb-8 max-w-lg">
              Buy directly from local farmers. No middlemen, no markup — just fresh, affordable, and honest food.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/shop" className="bg-yellow-400 text-green-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-lg">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/register" className="border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-3 rounded-xl hover:bg-yellow-400/10 transition-all">
                Sell on Farmazon
              </Link>
            </div>
            <div className="flex gap-8 mt-10 justify-center md:justify-start">
              {[['500+', 'Farmers'], ['10K+', 'Customers'], ['50+', 'Cities']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-yellow-400">{num}</p>
                  <p className="text-green-300 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                alt="Fresh produce"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-yellow-400/30"
              />
              <div className="absolute -bottom-4 -left-4 bg-green-900 border border-yellow-400/40 rounded-2xl p-3 shadow-xl">
                <p className="text-xs text-green-400">Today's Pick</p>
                <p className="font-bold text-yellow-400">🍅 Tomatoes — ₹40/kg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.cat}
              to={`/shop?category=${c.cat}`}
              className={`bg-gradient-to-br ${c.color} text-white rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-md`}
            >
              <div className="text-4xl mb-2">{c.emoji}</div>
              <p className="font-bold text-lg">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-900 mb-10">Why Choose Farmazon?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6 text-center hover:scale-105 transition-transform border border-green-100">
                <div className="flex justify-center mb-3">{f.icon}</div>
                <h3 className="font-bold text-green-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 border border-green-100">
              <div className="flex text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
              </div>
              <p className="text-gray-600 text-sm mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-800 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900 to-green-800 text-white text-center">
        <h2 className="text-3xl font-extrabold mb-3">Ready to eat fresh?</h2>
        <p className="text-green-300 mb-6">Join thousands of happy customers buying directly from farmers.</p>
        <Link to="/shop" className="bg-yellow-400 text-green-900 font-bold px-10 py-3 rounded-xl hover:bg-yellow-300 transition-all inline-flex items-center gap-2 shadow-lg">
          Start Shopping <FiArrowRight />
        </Link>
      </section>
    </div>
  );
}
