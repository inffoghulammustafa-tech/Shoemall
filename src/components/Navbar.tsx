import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, Trophy, Sparkles, Phone, Info, Wrench } from 'lucide-react';
import { Currency, PageType } from '../types';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPage = (page: PageType) => {
    onNavigate(page);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fed828] border-b-4 border-red-600 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        
        {/* Zone 1: Brand Wordmark (Black & Red bold) */}
        <button
          onClick={() => handleSelectPage('all')}
          className="flex items-center space-x-2.5 group whitespace-nowrap shrink-0 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 border-2 border-black flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-black text-xl">👟</span>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            NEON<span className="text-red-600 underline decoration-black decoration-2">KICKS</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links with All Shoes Dropdown & New Pages */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 font-black text-xs sm:text-sm tracking-wide">
          
          {/* All Shoes Parent Item with Child Pages Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap shrink-0 ${
                currentPage === 'all'
                  ? 'bg-red-600 text-white border-black shadow-md'
                  : 'bg-white/80 text-black border-transparent hover:border-black hover:bg-white'
              }`}
            >
              <span>All Shoes</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Pages Dropdown Menu */}
            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-red-600 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black border-b border-gray-200">
                  Main Store Hub
                </div>
                <button
                  onClick={() => handleSelectPage('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                    currentPage === 'all'
                      ? 'bg-red-600 text-white'
                      : 'text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>👟</span> All Footwear Overview
                  </span>
                  <span className="text-[10px] font-mono font-bold">Hub</span>
                </button>

                <div className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-red-600 border-t border-gray-200 mt-1">
                  Child Sub-Pages
                </div>

                {/* Child Page: Women's Shoes */}
                <button
                  onClick={() => handleSelectPage('women')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                    currentPage === 'women'
                      ? 'bg-emerald-600 text-white'
                      : 'text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-red-600">♀</span> Women's Shoes
                  </span>
                  <span className="text-[10px] font-mono font-bold text-red-600">Img 2</span>
                </button>

                {/* Child Page: Men's Shoes */}
                <button
                  onClick={() => handleSelectPage('men')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                    currentPage === 'men'
                      ? 'bg-red-600 text-white'
                      : 'text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-700">♂</span> Men's Shoes
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">Img 1</span>
                </button>

                {/* Child Page: Boys' Shoes */}
                <button
                  onClick={() => handleSelectPage('boys')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                    currentPage === 'boys'
                      ? 'bg-emerald-600 text-white'
                      : 'text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-red-600">⚡</span> Boys' Shoes
                  </span>
                  <span className="text-[10px] font-mono font-bold text-red-600">Img 3</span>
                </button>

                {/* Child Page: Sports Shoes */}
                <button
                  onClick={() => handleSelectPage('sports')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                    currentPage === 'sports'
                      ? 'bg-red-600 text-white'
                      : 'text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-emerald-700" /> Sports Shoes
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">Img 4</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Direct Link: Women */}
          <button
            onClick={() => handleSelectPage('women')}
            className={`px-2 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center space-x-1 ${
              currentPage === 'women'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-black hover:text-red-600'
            }`}
          >
            <span>Women</span>
          </button>

          {/* Quick Direct Link: Men */}
          <button
            onClick={() => handleSelectPage('men')}
            className={`px-2 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center space-x-1 ${
              currentPage === 'men'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-black hover:text-red-600'
            }`}
          >
            <span>Men</span>
          </button>

          {/* Quick Direct Link: Boys */}
          <button
            onClick={() => handleSelectPage('boys')}
            className={`px-2 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center space-x-1 ${
              currentPage === 'boys'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-black hover:text-red-600'
            }`}
          >
            <span>Boys</span>
          </button>

          {/* Quick Direct Link: Sports */}
          <button
            onClick={() => handleSelectPage('sports')}
            className={`px-2 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center space-x-1 ${
              currentPage === 'sports'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-black hover:text-red-600'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Sports</span>
          </button>

          {/* NEW PAGE: Services Page */}
          <button
            onClick={() => handleSelectPage('services')}
            className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center space-x-1 border-2 ${
              currentPage === 'services'
                ? 'bg-emerald-600 text-white border-black shadow-md'
                : 'bg-white/80 text-black border-transparent hover:border-black hover:bg-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-red-600" />
            <span>Services</span>
          </button>

          {/* NEW PAGE: About Us Page */}
          <button
            onClick={() => handleSelectPage('about')}
            className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center space-x-1 border-2 ${
              currentPage === 'about'
                ? 'bg-red-600 text-white border-black shadow-md'
                : 'bg-white/80 text-black border-transparent hover:border-black hover:bg-white'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-emerald-700" />
            <span>About</span>
          </button>

          {/* NEW PAGE: Contact Page */}
          <button
            onClick={() => handleSelectPage('contact')}
            className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center space-x-1 border-2 ${
              currentPage === 'contact'
                ? 'bg-emerald-600 text-white border-black shadow-md'
                : 'bg-white/80 text-black border-transparent hover:border-black hover:bg-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>Contact</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Controls (Red and Green Buttons) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {/* Currency Toggle Switcher (USD / PKR) in Red and Green */}
          <div className="bg-white rounded-xl p-1 border-2 border-black flex items-center shadow-md">
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                currency === 'USD'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-black hover:text-red-600'
              }`}
              title="View prices in US Dollars"
            >
              USD
            </button>
            <button
              onClick={() => onCurrencyChange('PKR')}
              className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                currency === 'PKR'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-black hover:text-red-600'
              }`}
              title="View prices in Pakistani Rupees"
            >
              PKR
            </button>
          </div>

          {/* Search Box Desktop */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search shoes..."
              className="w-32 xl:w-44 bg-white text-xs text-black font-black pl-8 pr-3 py-2 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 shadow-sm placeholder:text-gray-500"
            />
            <Search className="w-3.5 h-3.5 text-black absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-black hover:text-red-600 text-xs font-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-xl bg-white border-2 border-black text-black hover:text-red-600"
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button in Bold Red */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-xl bg-red-600 border-2 border-black text-white hover:bg-red-700 transition-all shadow-md"
            aria-label="View Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-red-600 text-[10px] font-black rounded-full flex items-center justify-center border border-black shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button in Bold Green */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 border-2 border-black text-white transition-all shadow-md flex items-center space-x-1.5"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline text-xs font-black">Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-red-600 text-white text-xs font-black rounded-full flex items-center justify-center border border-white font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border-2 border-black text-black hover:bg-yellow-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-b-2 border-black bg-[#fed828]">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search all shoe models..."
              className="w-full bg-white text-sm text-black font-black pl-9 pr-3 py-2 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-black absolute left-3 top-2.5" />
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu - Yellow background with Red & Green boxes */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fed828] border-t-2 border-black px-6 py-5 space-y-4 shadow-2xl">
          <div className="space-y-2 font-black text-sm">
            <button
              onClick={() => handleSelectPage('all')}
              className={`block w-full text-left py-2 px-3 rounded-xl border-2 ${
                currentPage === 'all'
                  ? 'bg-red-600 text-white border-black'
                  : 'bg-white text-black border-black'
              }`}
            >
              👟 All Shoes (Main Hub)
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleSelectPage('women')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-black text-left ${
                  currentPage === 'women'
                    ? 'bg-emerald-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                ♀ Women (Img 2)
              </button>

              <button
                onClick={() => handleSelectPage('men')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-black text-left ${
                  currentPage === 'men'
                    ? 'bg-red-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                ♂ Men (Img 1)
              </button>

              <button
                onClick={() => handleSelectPage('boys')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-black text-left ${
                  currentPage === 'boys'
                    ? 'bg-emerald-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                ⚡ Boys (Img 3)
              </button>

              <button
                onClick={() => handleSelectPage('sports')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-black text-left ${
                  currentPage === 'sports'
                    ? 'bg-red-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                🏆 Sports (Img 4)
              </button>
            </div>

            {/* New Pages in Mobile Menu */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSelectPage('services')}
                className={`block w-full text-left py-2 px-3 rounded-xl border-2 ${
                  currentPage === 'services'
                    ? 'bg-emerald-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                🛠️ Services & Care
              </button>

              <button
                onClick={() => handleSelectPage('about')}
                className={`block w-full text-left py-2 px-3 rounded-xl border-2 ${
                  currentPage === 'about'
                    ? 'bg-red-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                📖 About Our Brand
              </button>

              <button
                onClick={() => handleSelectPage('contact')}
                className={`block w-full text-left py-2 px-3 rounded-xl border-2 ${
                  currentPage === 'contact'
                    ? 'bg-emerald-600 text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                📞 Contact & Locations
              </button>
            </div>
          </div>

          <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black text-black">
            <span>Currency: <strong className="text-red-600">{currency}</strong></span>
            <span className="text-emerald-800">1 USD = 280 PKR</span>
          </div>
        </div>
      )}
    </header>
  );
};
