import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ui/ProductCard';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { FiSearch } from 'react-icons/fi';

const CATEGORIES = ['all', 'fruit', 'vegetable', 'grain', 'dairy', 'other'];
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 12, sort };
        if (category !== 'all') params.category = category;
        if (search) params.search = search;
        const { data } = await api.get('/products', { params });
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category, search, sort, page]);

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setPage(1);
    setSearchParams(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-900">Fresh Produce</h1>
        <p className="text-gray-500 text-sm mt-1">{total} products available</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-10"
            placeholder="Search fruits, vegetables..."
            defaultValue={search}
            onKeyDown={(e) => e.key === 'Enter' && setParam('search', e.target.value)}
            onChange={(e) => !e.target.value && setParam('search', '')}
          />
        </div>
        <select className="input sm:w-44" value={sort} onChange={(e) => setParam('sort', e.target.value)}>
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setParam('category', c === 'all' ? '' : c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
              category === c || (c === 'all' && !searchParams.get('category'))
                ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🌿</p>
          <p className="text-gray-500 text-lg">No products found</p>
          <button onClick={() => setSearchParams({})} className="btn-primary mt-4">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-xl font-medium text-sm transition-all ${
                page === i + 1
                  ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-green-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
