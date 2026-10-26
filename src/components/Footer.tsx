import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Truck, ShieldCheck, Trophy, Sparkles, Wrench, Info } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  onNavigatePage: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleNav = (page: PageType) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative z-10 bg-white border-t-4 border-red-600 mt-20 pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 border-2 border-black flex items-center justify-center">
                <span className="text-white font-black text-lg">👟</span>
              </div>
              <span className="text-2xl font-black text-black font-display">
                NEON<span className="text-red-600 underline decoration-black decoration-2">KICKS</span>
              </span>
            </div>

            <p className="text-black text-xs sm:text-sm font-bold leading-relaxed">
              Premium footwear hub featuring 74 distinct shoe models organized into dedicated departments for Men (Image 1), Women (Image 2), Boys (Image 3), and Sports (Image 4).
            </p>

            <div className="text-xs font-black text-black space-y-2 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Lahore, Karachi & Islamabad Flagship Stores</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Helpline: +92 300 1234567</span>
              </p>
            </div>
          </div>

          {/* Child Pages & Navigation Links */}
          <div>
            <h4 className="text-red-600 font-black mb-4 tracking-wider text-xs uppercase font-mono">
              Shoe Sub-Departments
            </h4>
            <ul className="space-y-2.5 text-xs font-black text-black">
              <li>
                <button
                  onClick={() => handleNav('women')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="text-emerald-700">♀</span> Women's Shoes (Image 2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('men')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="text-red-600">♂</span> Men's Shoes (Image 1)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('boys')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="text-emerald-700">⚡</span> Boys' Shoes (Image 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sports')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5 text-black font-black"
                >
                  <Trophy className="w-3.5 h-3.5 text-red-600" /> Sports Spikes & Cleats (Image 4)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('all')}
                  className="hover:text-red-600 transition-colors text-left text-red-600 pt-1"
                >
                  ← All Footwear Directory Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support Pages (Services, About, Contact) */}
          <div>
            <h4 className="text-emerald-700 font-black mb-4 tracking-wider text-xs uppercase font-mono">
              Company & Services
            </h4>
            <ul className="space-y-2.5 text-xs font-black text-black">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-emerald-700" /> Shoe Sizing & Care Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-red-600" /> About Our Craft & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" /> Contact & Store Locator
                </button>
              </li>
              <li className="flex items-start gap-1.5 pt-2">
                <Truck className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                <span>Express Courier across Pakistan (2-4 Days)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                <span>7-Day Doorstep Size Exchange</span>
              </li>
            </ul>
          </div>

          {/* VIP Drop Alerts Form in Bold Red & Green */}
          <div className="space-y-3">
            <h4 className="text-black font-black tracking-wider text-xs uppercase font-mono">
              VIP Drop Newsletter
            </h4>
            <p className="text-xs font-bold text-black">
              Subscribe for alerts on new shoe arrivals and exclusive flash discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-yellow-50 text-xs text-black font-black px-3.5 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase rounded-xl transition-all shadow-md border-2 border-emerald-800 flex items-center justify-center space-x-1.5"
              >
                <span>Subscribe Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="text-xs text-emerald-700 flex items-center space-x-1.5 font-black pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check email for discount code.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs text-black gap-4 font-black">
          <p>© 2026 NEONKICKS Store. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-2 text-black text-xs font-black">
            <span className="px-2.5 py-1 rounded-lg bg-yellow-100 border border-black">Visa</span>
            <span className="px-2.5 py-1 rounded-lg bg-yellow-100 border border-black">MasterCard</span>
            <span className="px-2.5 py-1 rounded-lg bg-yellow-100 border border-black">PayPal</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-600 text-emerald-800 font-black">EasyPaisa</span>
            <span className="px-2.5 py-1 rounded-lg bg-red-100 border border-red-600 text-red-800 font-black">JazzCash</span>
            <span className="px-2.5 py-1 rounded-lg bg-black text-white font-black">Cash On Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
