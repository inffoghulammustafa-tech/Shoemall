import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatCurrency } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQty: (productId: string, size: number, color: string, delta: number) => void;
  onRemoveItem: (productId: string, size: number, color: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Free shipping threshold: $200 USD (or equivalent in PKR)
  const freeShippingThresholdUSD = 200;
  const progressPercent = Math.min(100, Math.round((totalUSD / freeShippingThresholdUSD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-4 border-red-600 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b-2 border-black flex items-center justify-between bg-[#fed828]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-black text-black font-display">Shopping Bag</h3>
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow">
                {totalItems}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:text-red-600 p-1 rounded-lg hover:bg-yellow-200 transition-colors font-black"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-yellow-50 border-b-2 border-black">
            <div className="flex justify-between items-center text-xs mb-1.5 font-mono font-black">
              <span className="text-black flex items-center gap-1">
                <Truck className="w-4 h-4 text-emerald-700" />
                {totalUSD >= freeShippingThresholdUSD
                  ? '✨ Free Express Delivery Unlocked!'
                  : `Add ${formatCurrency(freeShippingThresholdUSD - totalUSD, currency)} for Free Delivery`}
              </span>
              <span className="text-red-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden border border-black">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-black">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-100 border-2 border-black flex items-center justify-center text-3xl">
                  👟
                </div>
                <h4 className="text-lg font-black text-black mb-1">Your bag is empty</h4>
                <p className="text-xs text-black font-bold max-w-xs mx-auto mb-6">
                  Browse our 74 shoes for Men, Women, Boys, and Sports.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-xl border-2 border-emerald-800 hover:bg-emerald-700 transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center space-x-3.5 bg-yellow-50 p-3.5 rounded-2xl border-2 border-black relative group shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-black shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-black truncate font-display">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-black font-bold mt-0.5 font-mono">
                      EU {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="text-xs font-black text-red-600 mt-1 font-mono tabular-nums">
                      {formatCurrency(item.product.priceUSD * item.qty, currency)}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.selectedSize, item.selectedColor, -1)
                        }
                        className="w-6 h-6 bg-white text-black font-black rounded-md border border-black flex items-center justify-center text-xs hover:bg-red-600 hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-black text-black px-1">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.selectedSize, item.selectedColor, 1)
                        }
                        className="w-6 h-6 bg-white text-black font-black rounded-md border border-black flex items-center justify-center text-xs hover:bg-emerald-600 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-black hover:text-red-600 p-2 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t-2 border-black bg-white">
              <div className="space-y-2 mb-4 text-xs font-mono font-black">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span className="text-black font-black tabular-nums">
                    {formatCurrency(totalUSD, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-700 font-black">
                    {totalUSD >= freeShippingThresholdUSD ? 'FREE' : formatCurrency(15, currency)}
                  </span>
                </div>
                <div className="pt-2 border-t-2 border-black flex justify-between items-baseline">
                  <span className="text-sm font-black text-black">Total Amount</span>
                  <span className="text-2xl font-black text-red-600 font-mono tabular-nums">
                    {formatCurrency(
                      totalUSD + (totalUSD >= freeShippingThresholdUSD ? 0 : 15),
                      currency
                    )}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-black font-bold mb-4 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Express courier across Pakistan (PKR) & Worldwide (USD)</span>
              </p>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-xl border-2 border-emerald-900 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-xs font-black text-red-600 hover:underline transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
