import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Filter, ArrowUpDown, Eye, Image as ImageIcon, Trophy, Check, X, ZoomIn, Maximize2 } from 'lucide-react';
import { Product, Currency, PageType, SortOption } from '../types';
import { ProductCard } from './ProductCard';

interface ChildPageSectionProps {
  pageType: 'women' | 'men' | 'boys' | 'sports';
  products: Product[];
  currency: Currency;
  onBackToAll: () => void;
  onNavigatePage: (page: PageType) => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlist: string[];
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const ChildPageSection: React.FC<ChildPageSectionProps> = ({
  pageType,
  products,
  currency,
  onBackToAll,
  onNavigatePage,
  searchQuery,
  onClearSearch,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [showMoodboard, setShowMoodboard] = useState<boolean>(false);
  const [isMoodboardZoomed, setIsMoodboardZoomed] = useState<boolean>(false);

  // Configure metadata per child page
  const config = {
    women: {
      title: "WOMEN'S FOOTWEAR COLLECTION",
      badge: "Child Page · Image 2 Catalog",
      themeColor: "emerald",
      borderClass: "border-4 border-emerald-600",
      refImage: "/assets/aistudio/image_e54a1432.png",
      imgLabel: "Catalog Moodboard (Image 2)",
      desc: "Comprehensive selection of women's shoes: sparkling crystal block heels, soft-girl butterfly sneakers, pointed nude stilettos, luxury wedding bow pumps, ankle boots, and platform walking shoes.",
      subcategories: ['All Models', 'Heels & Sandals', 'Stilettos', 'Casual Sneakers', 'Ankle Boots', 'Platform Sneakers', 'Mary Janes', 'Haute Couture'],
    },
    men: {
      title: "MEN'S FOOTWEAR COLLECTION",
      badge: "Child Page · Image 1 Catalog",
      themeColor: "red",
      borderClass: "border-4 border-red-600",
      refImage: "/assets/aistudio/image_20ca7173.png",
      imgLabel: "Catalog Moodboard (Image 1)",
      desc: "Men's footwear range: trend casual sneakers, shock-absorbing blade athletes, Bruno Marc dress oxfords, high-shine patent formal derby, Chelsea leather boots, and slip-on loafers.",
      subcategories: ['All Models', 'Sneakers & Casuals', 'Air Cushion', 'Bespoke Dress', 'Blade Cushion', 'Leather Boots', 'Chelsea Boots', 'Gala Loafers'],
    },
    boys: {
      title: "BOYS' & KIDS' FOOTWEAR COLLECTION",
      badge: "Child Page · Image 3 Catalog",
      themeColor: "emerald",
      borderClass: "border-4 border-emerald-600",
      refImage: "/assets/aistudio/image_e7c52663.png",
      imgLabel: "Catalog Moodboard (Image 3)",
      desc: "Boys' and kids' shoes: toddler chunky velcro kicks, USB rechargeable 7-color LED fire sneakers, Transformers mecha yellow runners, waterproof summer sport sandals, school court shoes, and soccer cleats.",
      subcategories: ['All Models', 'Toddler Kicks', 'Summer Sandals', 'High-Top Sneakers', 'LED Light Sandals', 'LED Light-Up', 'Football Cleats', 'Kids Boots'],
    },
    sports: {
      title: "SPORTS FOOTWEAR & PERFORMANCE CLEATS",
      badge: "Child Page · Image 4 Catalog",
      themeColor: "red",
      borderClass: "border-4 border-red-600",
      refImage: "/assets/aistudio/image_273aa442.png",
      imgLabel: "Catalog Moodboard (Image 4)",
      desc: "Sports footwear: Asics Gel & Gunn & Moore cricket spike shoes, DSC cricket turf rubber studs, cyber neon speed football cleats, Predator curved studs, FSD lime turf, and metallic indoor futsal shoes.",
      subcategories: ['All Sports', 'Cricket Spikes', 'Cricket Rubber Studs', 'Football Cleats', 'Turf Football', 'Turf Trainers', 'Futsal & Court'],
    },
  }[pageType];

  // Filter products by page and subcategory
  let pageProducts = products.filter((p) => {
    if (pageType === 'women') return p.gender === 'women';
    if (pageType === 'men') return p.gender === 'men';
    if (pageType === 'boys') return p.gender === 'boys';
    if (pageType === 'sports') return p.category === 'sports' || p.fromImage === 4;
    return true;
  });

  // Apply subcategory filter if selected
  if (selectedSubcat !== 'all' && selectedSubcat !== 'All Models' && selectedSubcat !== 'All Sports') {
    pageProducts = pageProducts.filter(
      (p) => p.subcategory?.toLowerCase() === selectedSubcat.toLowerCase()
    );
  }

  // Apply search query filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    pageProducts = pageProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
    );
  }

  // Apply sorting
  pageProducts = [...pageProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.priceUSD - b.priceUSD;
    if (sortOption === 'price-desc') return b.priceUSD - a.priceUSD;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black text-xs font-black text-black">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBackToAll}
            className="hover:text-red-600 transition-colors flex items-center gap-1 text-black font-black"
          >
            <ArrowLeft className="w-4 h-4 text-red-600" />
            <span>All Shoes Hub</span>
          </button>
          <span>/</span>
          <span className="text-black">Child Pages</span>
          <span>/</span>
          <span className="text-red-600 font-black uppercase tracking-wider">{config.title}</span>
        </div>

        {/* Quick Child Page Switcher Buttons in Red and Green */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border-2 border-black text-xs font-black shadow-md">
          <span className="text-black px-2">Switch Page:</span>
          <button
            onClick={() => onNavigatePage('women')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              pageType === 'women' ? 'bg-emerald-600 text-white' : 'text-black hover:text-emerald-700'
            }`}
          >
            Women
          </button>
          <button
            onClick={() => onNavigatePage('men')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              pageType === 'men' ? 'bg-red-600 text-white' : 'text-black hover:text-red-600'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => onNavigatePage('boys')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              pageType === 'boys' ? 'bg-emerald-600 text-white' : 'text-black hover:text-emerald-700'
            }`}
          >
            Boys
          </button>
          <button
            onClick={() => onNavigatePage('sports')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              pageType === 'sports' ? 'bg-red-600 text-white' : 'text-black hover:text-red-600'
            }`}
          >
            Sports
          </button>
        </div>
      </div>

      {/* Hero Child Page Header Banner Box */}
      <div className={`rounded-3xl p-6 sm:p-10 ${config.borderClass} bg-white relative overflow-hidden mb-10 shadow-2xl`}>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black text-xs font-black text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span>{config.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight">
            {config.title}
          </h1>

          <p className="text-black text-sm sm:text-base leading-relaxed max-w-2xl font-bold">
            {config.desc}
          </p>

          {/* Action to Toggle User Uploaded Catalog Moodboard Image */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowMoodboard(!showMoodboard)}
              className="px-4 py-2 rounded-xl text-xs font-black border-2 border-black bg-yellow-100 text-black hover:bg-yellow-200 transition-all flex items-center space-x-2 shadow-md"
            >
              <ImageIcon className="w-4 h-4 text-red-600" />
              <span>{showMoodboard ? 'Hide Uploaded Reference Image' : 'View Uploaded Catalog Moodboard'}</span>
            </button>
            <span className="text-xs font-mono font-black text-black">
              Showing <strong className="text-red-600">{pageProducts.length}</strong> styles in this child section
            </span>
          </div>
        </div>

        {/* Uploaded Reference Image Moodboard Expandable Preview */}
        {showMoodboard && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3 text-xs font-black text-black flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Reference Attachment: {config.imgLabel}</span>
              </span>
              <button
                onClick={() => setIsMoodboardZoomed(true)}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white border border-red-800 text-xs font-black flex items-center gap-1.5 transition-all ml-auto shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Full Screen (100% Resolution)</span>
              </button>
            </div>
            <div 
              onClick={() => setIsMoodboardZoomed(true)}
              className="bg-yellow-50 p-3 rounded-2xl border-2 border-black max-h-96 overflow-y-auto cursor-zoom-in group relative"
              title="Click to view Full Screen"
            >
              <img
                src={config.refImage}
                alt={config.imgLabel}
                className="w-full object-contain rounded-xl group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black text-white rounded-lg text-xs font-black border border-white flex items-center gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-yellow-300" />
                <span>Click to Expand</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subcategory Filter Tabs & Controls in Red and Green */}
      <div className="bg-white rounded-2xl p-4 border-4 border-black shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        
        {/* Subcategories */}
        <div className="flex flex-wrap gap-1.5">
          {config.subcategories.map((subcat) => {
            const isAll = subcat === 'All Models' || subcat === 'All Sports';
            const isActive = isAll ? selectedSubcat === 'all' : selectedSubcat === subcat;
            return (
              <button
                key={subcat}
                onClick={() => setSelectedSubcat(isAll ? 'all' : subcat)}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all border-2 ${
                  isActive
                    ? 'bg-red-600 text-white border-black shadow-md'
                    : 'bg-yellow-50 text-black border-black hover:bg-yellow-200'
                }`}
              >
                {subcat}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-white text-xs font-black text-black border-2 border-black rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-red-600 cursor-pointer appearance-none shadow-sm"
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

      {/* Product Cards Grid */}
      {pageProducts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border-4 border-red-600 my-8 shadow-2xl">
          <span className="text-5xl block mb-3">👟</span>
          <h3 className="text-xl font-black text-black mb-2">No Shoes Found</h3>
          <p className="text-sm font-bold text-black mb-4 max-w-sm mx-auto">
            Try resetting your subcategory filter or clearing your search query.
          </p>
          <button
            onClick={() => {
              setSelectedSubcat('all');
              onClearSearch();
            }}
            className="px-6 py-2.5 bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg border-2 border-emerald-800 hover:bg-emerald-700 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pageProducts.map((product) => (
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

      {/* Back to All Shoes Footer Action in Bold Green */}
      <div className="mt-16 text-center pt-8 border-t-2 border-black">
        <button
          onClick={onBackToAll}
          className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm border-2 border-emerald-900 transition-all inline-flex items-center space-x-2 shadow-xl transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Shoes (Main Hub)</span>
        </button>
      </div>

      {/* Fullscreen Moodboard Inspector Modal - 100% Uncompressed Resolution */}
      {isMoodboardZoomed && (
        <div 
          onClick={() => setIsMoodboardZoomed(false)}
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setIsMoodboardZoomed(false)}
            className="absolute top-5 right-5 p-3 rounded-2xl bg-white text-black hover:bg-red-600 hover:text-white border-2 border-black transition-colors z-20 shadow-2xl font-black"
            aria-label="Close moodboard preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
            <span className="text-base sm:text-lg font-black text-white font-display">{config.title}</span>
            <span className="text-xs font-mono font-black px-3 py-1 rounded bg-red-600 text-white border border-white">
              100% Full Resolution Moodboard
            </span>
          </div>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[85vh] flex items-center justify-center overflow-auto p-2"
          >
            <img
              src={config.refImage}
              alt={config.imgLabel}
              className="max-h-[80vh] max-w-full w-auto h-auto object-contain rounded-2xl border-4 border-yellow-400 shadow-2xl"
            />
          </div>

          <div className="absolute bottom-5 inset-x-0 text-center z-20">
            <span className="text-xs text-white font-mono font-black bg-black/90 px-5 py-2 rounded-full border border-yellow-400">
              All shoes from this reference sheet are individually featured below with full specs & cart support
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
