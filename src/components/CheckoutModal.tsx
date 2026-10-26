import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency, OrderDetails } from '../types';
import { formatCurrency, USD_TO_PKR } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(currency === 'PKR' ? 'Karachi' : 'New York');
  const [country, setCountry] = useState(currency === 'PKR' ? 'Pakistan' : 'United States');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'jazzcash' | 'easypaisa' | 'paypal'>(
    currency === 'PKR' ? 'cod' : 'card'
  );
  const [submittedOrder, setSubmittedOrder] = useState<OrderDetails | null>(null);

  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.qty, 0);
  const shippingUSD = subtotalUSD >= 200 ? 0 : 15;
  const totalUSD = subtotalUSD + shippingUSD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `NK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName: name,
      email,
      phone,
      address,
      city,
      country,
      paymentMethod,
      currency,
      items: [...cart],
      subtotal: currency === 'PKR' ? Math.round(subtotalUSD * USD_TO_PKR) : subtotalUSD,
      shipping: currency === 'PKR' ? Math.round(shippingUSD * USD_TO_PKR) : shippingUSD,
      total: currency === 'PKR' ? Math.round(totalUSD * USD_TO_PKR) : totalUSD,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setSubmittedOrder(newOrder);
    onOrderComplete(newOrder);

    // Fire celebration confetti in red, green, yellow, black
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#16a34a', '#fed828', '#000000'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="bg-white max-w-2xl w-full rounded-3xl border-4 border-red-600 shadow-2xl relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-black flex items-center justify-between bg-[#fed828]">
          <div className="flex items-center space-x-2">
            <span className="text-xl">👟</span>
            <h3 className="text-xl font-black text-black font-display">
              {submittedOrder ? 'Order Confirmed' : 'Checkout & Delivery'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-red-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors font-black"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {submittedOrder ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-8 space-y-6 text-center bg-white">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-700 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-black text-red-600 uppercase tracking-wider block">
                Order Reference #{submittedOrder.orderId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black mt-1 font-display">
                Thank You, {submittedOrder.customerName}!
              </h2>
              <p className="text-xs sm:text-sm font-bold text-black mt-2 max-w-md mx-auto">
                Your footwear order has been confirmed. Our packaging team is preparing your dispatch.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-yellow-50 rounded-2xl p-4 sm:p-5 border-2 border-black text-left space-y-3 font-mono text-xs font-black">
              <div className="flex justify-between pb-2 border-b border-gray-300 text-black">
                <span>Estimated Delivery</span>
                <span className="text-emerald-700 font-bold">
                  {submittedOrder.country.toLowerCase().includes('pakistan') ? '2-4 Days (Express Courier)' : '5-7 Days (DHL Express)'}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-300 text-black">
                <span>Destination</span>
                <span className="text-black truncate max-w-xs">
                  {submittedOrder.address}, {submittedOrder.city}, {submittedOrder.country}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-300 text-black">
                <span>Payment Mode</span>
                <span className="text-red-600 uppercase font-black">
                  {submittedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-1 font-black">
                <span className="text-black">Amount Total</span>
                <span className="text-red-600 text-base tabular-nums">
                  {currency === 'PKR'
                    ? `Rs. ${submittedOrder.total.toLocaleString()}`
                    : `$${submittedOrder.total.toFixed(2)}`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-xl border-2 border-emerald-800 transition-all"
            >
              Continue Shopping Shoes
            </button>
          </div>
        ) : (
          /* Checkout Input Form View */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6 bg-white">
            
            {/* Quick Order Summary Snippet */}
            <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-black flex justify-between items-center text-xs">
              <div>
                <span className="text-black block font-mono font-black">Bag Items ({cart.length})</span>
                <span className="text-black font-bold">{cart.map((c) => c.product.name).slice(0, 2).join(', ')}{cart.length > 2 ? ` + ${cart.length - 2} more` : ''}</span>
              </div>
              <div className="text-right">
                <span className="text-black block font-mono font-black">Total Due</span>
                <span className="text-lg font-black text-red-600 font-mono tabular-nums">
                  {formatCurrency(totalUSD, currency)}
                </span>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-black font-mono uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>1. Shipping & Contact Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-black font-black block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-black font-black block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-black font-black block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="text-xs">
                <label className="text-black font-black block mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 14, Street 5, Phase 4 DHA"
                  className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-black font-black block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore / Karachi / Islamabad"
                    className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-black font-black block mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Pakistan or USA"
                    className="w-full bg-yellow-50 text-black font-bold p-2.5 rounded-xl border-2 border-black focus:border-red-600 outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-black text-black font-mono uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-red-600" />
                <span>2. Payment Option</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border-2 text-center font-black transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-emerald-600 text-white shadow'
                      : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1" />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border-2 text-center font-black transition-all ${
                    paymentMethod === 'card'
                      ? 'border-black bg-emerald-600 text-white shadow'
                      : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span>Debit / Visa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-3 rounded-xl border-2 text-center font-black transition-all ${
                    paymentMethod === 'easypaisa'
                      ? 'border-black bg-emerald-600 text-white shadow'
                      : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="block font-black text-sm">EP</span>
                  <span>EasyPaisa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-3 rounded-xl border-2 text-center font-black transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'border-black bg-emerald-600 text-white shadow'
                      : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                  }`}
                >
                  <span className="block font-black text-sm">JC</span>
                  <span>JazzCash</span>
                </button>
              </div>

              {paymentMethod === 'cod' && (
                <p className="text-[11px] font-bold text-black bg-yellow-100 p-2.5 rounded-xl border border-black">
                  💡 <strong>Cash on Delivery (COD)</strong>: Pay in cash directly to the courier rider upon delivery at your doorstep anywhere in Pakistan.
                </p>
              )}
            </div>

            {/* Submit Action Button in Bold Green */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-xl border-2 border-emerald-900 transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Confirm Footwear Order · {formatCurrency(totalUSD, currency)}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
