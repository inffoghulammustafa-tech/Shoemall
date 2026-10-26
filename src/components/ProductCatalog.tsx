import React from 'react';
import { ArrowUpDown, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { Product, Currency, FilterCategory, SortOption, PageType } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  currency: Currency;
  activeFilter: FilterCategory;
  onFilterChange: (f: FilterCategory) => void;
  onNavigatePage: (page: PageType) => void;
  searchQuery: string;
  onClearSearch: () => void;
  sortOption: SortOption;
  onSortChange: (s: SortOption) => void;
  wishlist: string[];
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  activeFilter,
  onFilterChange,
  onNavigatePage,
  searchQuery,
  onClearSearch,
  sortOption,
  onSortChange,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  // Apply search query filter
  let filtered = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q) ||
      p.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  // Apply category filter
  if (activeFilter === 'women') {
    filtered = filtered.filter((p) => p.gender === 'women');
  } else if (activeFilter === 'men') {
    filtered = filtered.filter((p) => p.gender === 'men');
  } else if (activeFilter === 'boys') {
    filtered = filtered.filter((p) => p.gender === 'boys');
  } else if (activeFilter === 'sports') {
    filtered = filtered.filter((p) => p.category === 'sports' || p.fromImage === 4);
  } else if (activeFilter === 'fancy') {
    filtered = filtered.filter((p) => p.category === 'fancy');
  }

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortOption === 'price-asc') return a.priceUSD - b.priceUSD;
    if (sortOption === 'price-desc') return b.priceUSD - a.priceUSD;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  const womenCount = products.filter((p) => p.gender === 'women').length;
  const menCount = products.filter((p) => p.gender === 'men').length;
  const boysCount = products.filter((p) => p.gender === 'boys').length;
  const sportsCount = products.filter((p) => p.category === 'sports' || p.fromImage === 4).length;

  return (
    <section id="catalog" className="relative z-10 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 4 Child Pages Directory Showcase Cards in Red & Green Boxes */}
      {!searchQuery.trim() && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-mono font-black uppercase tracking-widest text-red-600 block">
                SPECIALIZED DEPARTMENTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black font-display">
                Dedicated Child Collections
              </h3>
            </div>
            <span className="text-xs font-black text-black font-mono hidden sm:inline bg-white px-3 py-1 rounded-full border-2 border-black">
              74 Unique Footwear Designs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Child Page Card 1: Women's Shoes (Green Box) */}
            <div
              onClick={() => onNavigatePage('women')}
              className="bg-white p-5 rounded-2xl border-4 border-emerald-600 hover:border-black transition-all cursor-pointer group hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                    ♀
                  </span>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-600">
                    Image 2
                  </span>
                </div>
                <h4 className="text-base font-black text-black group-hover:text-red-600 transition-colors font-display">
                  Women's Shoes Page
                </h4>
                <p className="text-xs font-bold text-black/80 mt-1 line-clamp-2">
                  Stilettos, crystal block heels, butterfly sneakers & ankle boots.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-emerald-100 flex items-center justify-between text-xs font-black">
                <span className="text-black font-mono">{womenCount} Models</span>
                <span className="text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Child Page Card 2: Men's Shoes (Red Box) */}
            <div
              onClick={() => onNavigatePage('men')}
              className="bg-white p-5 rounded-2xl border-4 border-red-600 hover:border-black transition-all cursor-pointer group hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-sm flex items-center justify-center">
                    ♂
                  </span>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-600">
                    Image 1
                  </span>
                </div>
                <h4 className="text-base font-black text-black group-hover:text-red-600 transition-colors font-display">
                  Men's Shoes Page
                </h4>
                <p className="text-xs font-bold text-black/80 mt-1 line-clamp-2">
                  Blade athletic runners, Bruno Marc dress oxfords & Chelsea boots.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-red-100 flex items-center justify-between text-xs font-black">
                <span className="text-black font-mono">{menCount} Models</span>
                <span className="text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Child Page Card 3: Boys' Shoes (Green Box) */}
            <div
              onClick={() => onNavigatePage('boys')}
              className="bg-white p-5 rounded-2xl border-4 border-emerald-600 hover:border-black transition-all cursor-pointer group hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                    ⚡
                  </span>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-600">
                    Image 3
                  </span>
                </div>
                <h4 className="text-base font-black text-black group-hover:text-red-600 transition-colors font-display">
                  Boys' Shoes Page
                </h4>
                <p className="text-xs font-bold text-black/80 mt-1 line-clamp-2">
                  USB LED fire kicks, toddler velcro, mecha runners & soccer cleats.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-emerald-100 flex items-center justify-between text-xs font-black">
                <span className="text-black font-mono">{boysCount} Models</span>
                <span className="text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Child Page Card 4: Sports Shoes (Red Box) */}
            <div
              onClick={() => onNavigatePage('sports')}
              className="bg-white p-5 rounded-2xl border-4 border-red-600 hover:border-black transition-all cursor-pointer group hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-sm flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-yellow-300" />
                  </span>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-600">
                    Image 4
                  </span>
                </div>
                <h4 className="text-base font-black text-black group-hover:text-red-600 transition-colors font-display">
                  Sports Shoes Page
                </h4>
                <p className="text-xs font-bold text-black/80 mt-1 line-clamp-2">
                  Asics Gel & GM cricket spikes, DSC studs & cyber football cleats.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-red-100 flex items-center justify-between text-xs font-black">
                <span className="text-black font-mono">{sportsCount} Models</span>
                <span className="text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Unified Controls Bar in Bold Red & Green styling */}
      <div className="bg-white rounded-2xl p-5 border-4 border-black shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">
              ALL FOOTWEAR <span className="text-red-600">CATALOGUE</span>
            </h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-black text-white font-black">
              {filtered.length} Items
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-black mt-1">
            Displaying prices in{' '}
            <strong className={currency === 'PKR' ? 'text-red-600' : 'text-emerald-700'}>
              {currency === 'PKR' ? 'Pakistani Rupees (PKR)' : 'US Dollars (USD)'}
            </strong>
            {searchQuery && (
              <span>
                {' '}· Matching "<span className="text-red-600">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Filter Tabs in Red and Green Buttons & Sort Selection */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-yellow-100 rounded-xl border-2 border-black">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-black text-white shadow-md'
                  : 'text-black hover:text-red-600'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => onFilterChange('women')}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeFilter === 'women'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-black hover:text-emerald-700'
              }`}
            >
              Women ({womenCount})
            </button>
            <button
              onClick={() => onFilterChange('men')}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeFilter === 'men'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-black hover:text-red-600'
              }`}
            >
              Men ({menCount})
            </button>
            <button
              onClick={() => onFilterChange('boys')}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeFilter === 'boys'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-black hover:text-emerald-700'
              }`}
            >
              Boys ({boysCount})
            </button>
            <button
              onClick={() => onFilterChange('sports')}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeFilter === 'sports'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-black hover:text-red-600'
              }`}
            >
              Sports ({sportsCount})
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white text-xs font-black text-black border-2 border-black rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-red-600 cursor-pointer appearance-none shadow-md"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-black absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of shoes */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border-4 border-red-600 my-8 shadow-2xl">
          <span className="text-5xl block mb-3">👟</span>
          <h3 className="text-xl font-black text-black mb-2">No Shoes Match Search</h3>
          <p className="text-sm font-bold text-black mb-4 max-w-sm mx-auto">
            Try adjusting your query or resetting all filters.
          </p>
          <button
            onClick={() => {
              onFilterChange('all');
              onClearSearch();
            }}
            className="px-6 py-2.5 bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg border-2 border-emerald-800 hover:bg-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
};
