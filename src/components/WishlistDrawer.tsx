import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatCurrency } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  currency: Currency;
  onAddToCart: (p: Product) => void;
  onRemoveFromWishlist: (p: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  currency,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-4 border-emerald-600 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b-2 border-black flex items-center justify-between bg-[#fed828]">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h3 className="text-xl font-black text-black font-display">Saved Wishlist</h3>
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:text-red-600 p-1 rounded-lg hover:bg-yellow-200 transition-colors font-black"
              aria-label="Close wishlist"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 text-black">
                <Heart className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <h4 className="text-base font-black text-black mb-1">No items saved yet</h4>
                <p className="text-xs text-black font-bold max-w-xs mx-auto">
                  Click the heart icon on any shoe card to save your favorites.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center space-x-3.5 bg-yellow-50 p-3.5 rounded-2xl border-2 border-black shadow-sm"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-black shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-black truncate font-display">
                      {p.name}
                    </h4>
                    <p className="text-xs font-black text-red-600 font-mono tabular-nums mt-0.5">
                      {formatCurrency(p.priceUSD, currency)}
                    </p>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="mt-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-lg border border-emerald-800 flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="text-black hover:text-red-600 p-2 transition-colors self-start"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
