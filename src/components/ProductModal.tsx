import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap, Image as ImageIcon, ZoomIn, Maximize2 } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatCurrency } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (p: Product, size: number, color: string, qty: number) => void;
  onToggleWishlist: (p: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 40);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorways[0] || 'Default');
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // US Size approximation helper based on gender
  const getUsSize = (eu: number) => {
    if (product.gender === 'women') return (eu - 32).toFixed(1);
    if (product.gender === 'boys') return (eu - 28).toFixed(1);
    return (eu - 33).toFixed(1);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const activeImageUrl = showCrop && product.refCrop ? product.refCrop : product.image;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="bg-white max-w-4xl w-full rounded-3xl border-4 border-emerald-600 shadow-2xl relative overflow-hidden max-h-[94vh] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white text-black hover:bg-red-600 hover:text-white border-2 border-black transition-colors font-black"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Full Unblurred Shoe Showcase */}
          <div className="md:w-1/2 bg-yellow-50 p-5 sm:p-6 flex flex-col items-center justify-between relative border-b-2 md:border-b-0 md:border-r-2 border-black min-h-[340px] sm:min-h-[400px]">
            <div className="w-full flex items-center justify-between z-10 gap-2 flex-wrap">
              <div className="flex gap-1.5 items-center">
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-red-600 text-white shadow">
                  {product.badge}
                </span>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-black text-white capitalize">
                  {product.gender}
                </span>
                {product.fromImage && (
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-white text-black border border-black">
                    Img {product.fromImage}
                  </span>
                )}
                <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                  {showCrop ? 'Sheet Tile' : 'Full HD 800px'}
                </span>
              </div>

              {/* Toggle HD / Crop Button if crop exists */}
              {product.refCrop && (
                <button
                  onClick={() => setShowCrop(!showCrop)}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-yellow-100 text-[10px] font-black text-black border-2 border-black flex items-center gap-1.5 transition-all shadow ml-auto"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-red-600" />
                  <span>{showCrop ? 'Switch to Full HD' : 'View Sheet Crop'}</span>
                </button>
              )}
            </div>

            {/* Shoe Image - 100% Full Show, Natural Aspect Ratio Preserved, Interactive Zoom */}
            <div 
              onClick={() => setIsZoomModalOpen(true)}
              className="w-full flex-1 flex items-center justify-center py-4 relative group cursor-zoom-in"
              title="Click to view 100% Full Screen Unblurred Image"
            >
              <img
                src={activeImageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-72 sm:max-h-80 max-w-[92%] w-auto h-auto object-contain mx-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-105 select-none"
              />

              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black text-white text-[10px] font-black border border-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-yellow-300" />
                <span>Full Scale View</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between border-t-2 border-gray-200 pt-3 text-xs font-black">
              <span className="text-black">Colorway: <strong className="text-red-600">{selectedColor}</strong></span>
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="text-xs text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>100% Full View</span>
              </button>
            </div>
          </div>

          {/* Right Column: Details & Contiguous Purchase Module in Bold Black & Red */}
          <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[90vh] bg-white">
            <div>
              {/* Header: Subcategory & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-wider font-mono text-[11px] text-red-600 font-black">
                  {product.subcategory || `${product.category} Footwear`}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-black text-black">{product.rating}.0</span>
                  <span className="text-gray-500 font-bold">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title in Bold Black */}
              <h3 className="text-2xl font-black text-black font-display leading-tight mb-2">
                {product.name}
              </h3>

              {/* Price in Bold Red */}
              <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono tabular-nums mb-4">
                {formatCurrency(product.priceUSD, currency)}
                {currency === 'PKR' && (
                  <span className="text-xs text-black font-bold block font-sans">
                    Equivalent: ${(product.priceUSD).toFixed(2)} USD (Exchange rate 1:280)
                  </span>
                )}
              </div>

              {/* Description in Bold Black */}
              <p className="text-xs sm:text-sm text-black leading-relaxed mb-5 font-bold">
                {product.desc}
              </p>

              {/* Colorway Options */}
              <div className="mb-4">
                <label className="text-xs text-black font-black block mb-2 font-mono uppercase">
                  Color Accent:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colorways.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                        selectedColor === col
                          ? 'border-red-600 bg-red-600 text-white shadow'
                          : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-black font-black font-mono uppercase">
                    Select Size (EU / US):
                  </label>
                  <span className="text-xs text-emerald-700 font-black">True to fit</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-black border-2 transition-all ${
                        selectedSize === sz
                          ? 'border-emerald-700 bg-emerald-600 text-white shadow-md'
                          : 'border-black bg-yellow-50 text-black hover:bg-yellow-100'
                      }`}
                    >
                      <div>EU {sz}</div>
                      <div className="text-[10px] font-mono">
                        US {getUsSize(sz)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs / Key Features */}
              <div className="mb-6 p-3.5 rounded-2xl bg-yellow-50 border-2 border-black">
                <span className="text-xs font-mono font-black text-black uppercase tracking-wider block mb-2">
                  Specifications & Features
                </span>
                <ul className="grid grid-cols-2 gap-2 text-xs font-black text-black">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Row in Red & Green */}
            <div>
              <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-200">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-yellow-50 border-2 border-black rounded-xl p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-black hover:bg-red-600 hover:text-white flex items-center justify-center font-black text-sm border border-black"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-black text-sm text-black">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-black hover:bg-emerald-600 hover:text-white flex items-center justify-center font-black text-sm border border-black"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist toggle in Red */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-black bg-white text-black hover:text-red-600'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>

                {/* Add to Cart CTA in Bold Green */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl border-2 border-emerald-900 transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>
                    {added ? 'Added to Bag!' : `Add to Cart · ${formatCurrency(product.priceUSD * qty, currency)}`}
                  </span>
                </button>
              </div>

              {/* Trust badge */}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-black font-black font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Authentic Footwear
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-red-600" /> Express Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen HD Lightbox Modal - 100% Full Show & Zero Blur */}
      {isZoomModalOpen && (
        <div 
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-white text-black hover:bg-red-600 hover:text-white border-2 border-black transition-colors z-20 font-black"
            aria-label="Close zoom preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <span className="text-base font-black text-white font-display">{product.name}</span>
            <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-emerald-600 text-white border border-emerald-400">
              {showCrop ? 'Original Moodboard Tile' : 'Full HD Unblurred Studio View'}
            </span>
          </div>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-4"
          >
            <img
              src={activeImageUrl}
              alt={product.name}
              className="max-h-[82vh] max-w-full w-auto h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none rounded-2xl border-4 border-yellow-400"
            />
          </div>

          <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4 z-20">
            {product.refCrop && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCrop(!showCrop);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-black text-white border-2 border-black flex items-center gap-2 shadow-xl"
              >
                <ImageIcon className="w-4 h-4 text-yellow-300" />
                <span>{showCrop ? 'Switch to Full HD Studio' : 'Switch to Moodboard Crop'}</span>
              </button>
            )}
            <span className="text-xs text-white font-black bg-black/80 px-4 py-1.5 rounded-full border border-yellow-400">
              Click anywhere to close
            </span>
          </div>
        </div>
      )}
    </>
  );
};
