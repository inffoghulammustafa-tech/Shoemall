import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatCurrency } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  const [imageError, setImageError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);
  const [showCrop, setShowCrop] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  // Red and green box theme: Women & Sports get green frames, Men & Boys get red frames (or vice versa for balanced alternating aesthetics)
  const isGreenTheme = product.gender === 'women' || product.category === 'sports';
  const borderClass = isGreenTheme
    ? 'border-4 border-emerald-600 shadow-emerald-950/10'
    : 'border-4 border-red-600 shadow-red-950/10';

  const badgeColor =
    product.badge === 'HOT' || product.badge === 'SALE'
      ? 'bg-red-600 text-white border-red-800'
      : product.badge === 'NEW' || product.badge === 'BESTSELLER'
      ? 'bg-emerald-600 text-white border-emerald-800'
      : 'bg-black text-white border-black';

  const activeImageUrl = showCrop && product.refCrop ? product.refCrop : product.image;

  return (
    <div
      onClick={() => onQuickView(product)}
      className={`bg-white rounded-3xl ${borderClass} overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 shadow-2xl`}
    >
      {/* Product Image Area - Full Show & Zero Blur on clean background */}
      <div className="relative bg-gradient-to-b from-yellow-50 via-white to-gray-50 h-60 sm:h-64 p-3 flex items-center justify-center overflow-hidden border-b-2 border-gray-200">
        
        {/* Source Badge & Resolution Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className={`text-[10px] font-mono font-black tracking-wider px-2 py-0.5 rounded border ${badgeColor} shadow`}
          >
            {product.badge}
          </span>
          {product.fromImage && (
            <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-black text-white shadow">
              Img {product.fromImage}
            </span>
          )}
          <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow">
            {showCrop ? 'Sheet Tile' : 'Full HD'}
          </span>
        </div>

        {/* Wishlist Heart Button in Red */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white border-2 border-black text-black hover:text-red-600 transition-colors z-10 shadow-md"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-600 text-red-600' : 'stroke-current'
            }`}
          />
        </button>

        {/* Main Footwear Image - 100% Full Show, Aspect Preserved, Zero Blur */}
        {!imageError ? (
          <img
            src={activeImageUrl}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="max-h-52 max-w-[92%] w-auto h-auto object-contain mx-auto transform group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] select-none"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-black bg-yellow-50">
            <span className="text-3xl mb-1">👟</span>
            <span className="text-xs font-black">{product.name}</span>
          </div>
        )}

        {/* Bottom Overlay Action: Quick View & Reference Crop Switcher */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {product.refCrop ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCrop(!showCrop);
              }}
              className="px-2.5 py-1 rounded-xl bg-black hover:bg-gray-800 text-[10px] font-black text-white border-2 border-black flex items-center gap-1 shadow-lg"
              title="Toggle Full HD Studio Photo vs Moodboard Sheet Tile"
            >
              <ImageIcon className="w-3 h-3 text-yellow-300" />
              <span>{showCrop ? 'Full HD' : 'Sheet Tile'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs flex items-center space-x-1 shadow-md hover:bg-red-700 transition-all border border-red-800 ml-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Full View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details in Bold Black & Red */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Metadata: Category and Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
            <span className="capitalize text-[11px] text-red-600 font-black truncate max-w-[170px]">
              {product.subcategory || `${product.gender} · ${product.category}`}
            </span>
            <div className="flex items-center space-x-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="text-black text-xs font-black">{product.rating}.0</span>
              <span className="text-gray-600 text-[10px] font-bold">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title in Bold Black */}
          <h4 className="text-base font-black text-black group-hover:text-red-600 transition-colors line-clamp-1 font-display">
            {product.name}
          </h4>

          {/* Short description in Bold Black */}
          <p className="text-xs text-black/85 mt-1 line-clamp-2 leading-relaxed font-bold">
            {product.desc}
          </p>

          {/* Available Sizes preview */}
          <div className="mt-2 flex items-center gap-1 text-[11px] text-black font-black font-mono">
            <span>Sizes:</span>
            <span className="text-emerald-700">EU {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
          </div>
        </div>

        {/* Price & Buy Action Baseline */}
        <div className="mt-4 pt-3 border-t-2 border-gray-200 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-black block uppercase font-black tracking-wider">
              Price
            </span>
            <span className="text-base sm:text-lg font-black text-red-600 font-mono tabular-nums">
              {formatCurrency(product.priceUSD, currency)}
            </span>
          </div>

          {/* Bold Green Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800 shadow-md transition-all duration-200 flex items-center space-x-1.5 whitespace-nowrap transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
            <span>{addedAnim ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
