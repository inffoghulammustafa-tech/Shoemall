export type Gender = 'women' | 'men' | 'boys' | 'unisex';
export type Category = 'fancy' | 'sports' | 'casual' | 'formal';
export type Currency = 'USD' | 'PKR';
export type PageType = 'all' | 'women' | 'men' | 'boys' | 'sports' | 'services' | 'about' | 'contact';

export interface Product {
  id: string;
  gender: Gender;
  name: string;
  category: Category;
  subcategory?: string; // e.g. "Cricket Spikes", "Football Cleats", "LED Light-Up", "Stiletto Heels", "Oxford Dress"
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  image: string;
  desc: string;
  features: string[];
  sizes: number[];
  inStock: boolean;
  colorways: string[];
  glowColor: 'cyan' | 'crimson' | 'purple' | 'gold' | 'green';
  fromImage?: 1 | 2 | 3 | 4; // Tracks source reference: 1=Men, 2=Women, 3=Boys, 4=Sports
  refCrop?: string; // Cropped thumbnail from original collage sheet
}

export interface CartItem {
  product: Product;
  qty: number;
  selectedSize: number;
  selectedColor: string;
}

export type FilterCategory = 'all' | 'women' | 'men' | 'boys' | 'fancy' | 'sports' | 'cricket' | 'football';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: 'cod' | 'card' | 'jazzcash' | 'easypaisa' | 'paypal';
  currency: Currency;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}
