import React, { useState } from 'react';
import { products } from './data/products';
import { Product, Currency, CartItem, FilterCategory, SortOption, OrderDetails, PageType } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ChildPageSection } from './components/ChildPageSection';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentPage, setCurrentPage] = useState<PageType>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'cyan' | 'crimson' } | null>(null);

  const showToast = (message: string, type: 'cyan' | 'crimson' = 'cyan') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNavigatePage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    size?: number,
    color?: string,
    qty: number = 1
  ) => {
    const selectedSize = size || product.sizes[0] || 40;
    const selectedColor = color || product.colorways[0] || 'Default';

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].qty += qty;
        return updated;
      } else {
        return [...prevCart, { product, qty, selectedSize, selectedColor }];
      }
    });

    showToast(`Added ${product.name} (EU ${selectedSize}) to bag`, 'cyan');
  };

  const handleUpdateCartQty = (
    productId: string,
    size: number,
    color: string,
    delta: number
  ) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: number, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    showToast('Item removed from cart', 'crimson');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'crimson');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed from saved`, 'crimson');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved to wishlist`, 'cyan');
        return [...prev, product.id];
      }
    });
  };

  const handleOrderComplete = (_order: OrderDetails) => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="relative min-h-screen bg-[#fed828] text-black font-bold flex flex-col selection:bg-red-600 selection:text-white">
      {/* Background Particle Canvas */}
      <ParticleCanvas />

      {/* Navigation Header with Yellow Background and Red/Green controls */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        currentPage={currentPage}
        onNavigate={handleNavigatePage}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'all' && (
          /* Main Parent Page (All Shoes Hub) */
          <>
            <Hero onNavigatePage={handleNavigatePage} />

            <PromoBanner currency={currency} />

            <ProductCatalog
              products={products}
              currency={currency}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onNavigatePage={handleNavigatePage}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              sortOption={sortOption}
              onSortChange={setSortOption}
              wishlist={wishlist}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          </>
        )}

        {/* Dedicated Services Page */}
        {currentPage === 'services' && (
          <ServicesPage onNavigatePage={handleNavigatePage} currency={currency} />
        )}

        {/* Dedicated About Us Page */}
        {currentPage === 'about' && (
          <AboutPage onNavigatePage={handleNavigatePage} />
        )}

        {/* Dedicated Contact Page */}
        {currentPage === 'contact' && (
          <ContactPage onNavigatePage={handleNavigatePage} />
        )}

        {/* Dedicated Child Shoe Pages: Women, Men, Boys, or Sports */}
        {(currentPage === 'women' ||
          currentPage === 'men' ||
          currentPage === 'boys' ||
          currentPage === 'sports') && (
          <ChildPageSection
            pageType={currentPage}
            products={products}
            currency={currency}
            onBackToAll={() => handleNavigatePage('all')}
            onNavigatePage={handleNavigatePage}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            wishlist={wishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        currency={currency}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Toast Notification in Bold Red or Green */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl border-2 text-xs font-black shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom duration-200 ${
            toast.type === 'crimson'
              ? 'bg-red-600 border-black text-white shadow-box-red'
              : 'bg-emerald-600 border-black text-white shadow-box-green'
          }`}
        >
          <span>👟</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
