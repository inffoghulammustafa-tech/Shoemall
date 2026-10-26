import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  Target, 
  Flame, 
  Trophy 
} from 'lucide-react';
import { PageType } from '../types';

interface AboutPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Brand Title - Bold Black & Red with Yellow BG */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider mb-4 shadow-md">
          <Flame className="w-4 h-4 text-yellow-300" />
          <span>PASSION FOR GROUNDBREAKING FOOTWEAR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight">
          CRAFTING THE FUTURE OF <br />
          <span className="text-red-600 underline decoration-emerald-600 decoration-4">EVERY SINGLE STRIDE</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl font-bold text-black max-w-3xl mx-auto leading-relaxed">
          We bring together aerospace-grade cushioning, ergonomic arch support, and trendsetting street aesthetics to create high-performance footwear for Men, Women, Boys, and Competitive Athletes.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigatePage('all')}
            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Explore All 74 Models</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigatePage('services')}
            className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl border-2 border-red-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>View Shoe Services</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards - Alternating Red and Green Boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white border-4 border-emerald-600 rounded-2xl p-6 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
          <span className="text-3xl sm:text-4xl font-black text-red-600 block mb-1">
            45,000+
          </span>
          <span className="text-xs sm:text-sm font-black text-black uppercase">
            Pairs Delivered
          </span>
          <p className="text-xs font-bold text-black/80 mt-1">Across Pakistan & Overseas</p>
        </div>

        <div className="bg-white border-4 border-red-600 rounded-2xl p-6 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
          <span className="text-3xl sm:text-4xl font-black text-emerald-700 block mb-1">
            74+
          </span>
          <span className="text-xs sm:text-sm font-black text-black uppercase">
            Curated Styles
          </span>
          <p className="text-xs font-bold text-black/80 mt-1">Men, Women, Boys & Sports</p>
        </div>

        <div className="bg-white border-4 border-emerald-600 rounded-2xl p-6 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
          <span className="text-3xl sm:text-4xl font-black text-red-600 block mb-1">
            99.4%
          </span>
          <span className="text-xs sm:text-sm font-black text-black uppercase">
            Satisfaction Rate
          </span>
          <p className="text-xs font-bold text-black/80 mt-1">Verified Customer Reviews</p>
        </div>

        <div className="bg-white border-4 border-red-600 rounded-2xl p-6 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
          <span className="text-3xl sm:text-4xl font-black text-emerald-700 block mb-1">
            7 Days
          </span>
          <span className="text-xs sm:text-sm font-black text-black uppercase">
            Easy Exchange
          </span>
          <p className="text-xs font-bold text-black/80 mt-1">Zero Questions Asked</p>
        </div>
      </div>

      {/* Main Story & Philosophy - Dual Red and Green Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* Story Box - Green Border Frame */}
        <div className="bg-white border-4 border-emerald-600 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                <Target className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase text-red-600 tracking-wider">
                OUR MISSION & ORIGIN
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight">
              Built on Precision, Built for <span className="text-red-600">Pure Comfort</span>
            </h2>

            <p className="text-sm sm:text-base font-bold text-black mb-4 leading-relaxed">
              We started with a straightforward realization: footwear enthusiasts shouldn't have to choose between eye-catching, runway-ready visuals and all-day orthopedic comfort. 
            </p>

            <p className="text-sm sm:text-base font-bold text-black leading-relaxed">
              Every sneaker, high heel, junior LED trainer, and athletic spike in our catalog is engineered to withstand intense daily wear while providing shock absorption that protects your knees, ankles, and spine.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-xl">
              👟
            </div>
            <div>
              <h4 className="text-sm font-black text-black">Precision Shoe Lab</h4>
              <p className="text-xs font-bold text-red-600">Lahore & Karachi Master Workshops</p>
            </div>
          </div>
        </div>

        {/* Quality Standards Box - Red Border Frame */}
        <div className="bg-white border-4 border-red-600 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                UNCOMPROMISED QUALITY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight">
              The 4 Core Standards Behind <span className="text-emerald-700">Every Pair</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-black">Polymer Rebound Soles</h4>
                  <p className="text-xs font-bold text-black/80">Provides up to 68% energy return with each stride, minimizing foot exhaustion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-black">Breathable Aero-Knit Mesh</h4>
                  <p className="text-xs font-bold text-black/80">Thermal dissipation zones keep feet cool in high-heat outdoor conditions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-black">Reinforced Arch Support</h4>
                  <p className="text-xs font-bold text-black/80">Prevents pronation and foot arch collapse during extended wear.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-black">High-Traction Vulcanized Rubber</h4>
                  <p className="text-xs font-bold text-black/80">Slip-resistant grip on wet pavements, sports turf, and polished floors.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-red-100 flex items-center justify-between">
            <span className="text-xs font-black text-black uppercase">Official Standard: ISO 9001 Certified</span>
            <span className="text-xs font-black text-red-600">100% Inspected</span>
          </div>
        </div>

      </div>

      {/* 4 Specialized Collections Breakdown */}
      <div className="bg-white border-4 border-emerald-600 rounded-3xl p-8 sm:p-12 shadow-2xl mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded bg-red-600 text-white font-black text-xs uppercase mb-2">
            ORGANIZED SHOE HUBS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black">
            Four Tailored Footwear <span className="text-red-600">Sub-Collections</span>
          </h2>
          <p className="text-sm font-bold text-black mt-2">
            Each section features specifically designed footwear tuned to unique functional and aesthetic demands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Men */}
          <div 
            onClick={() => onNavigatePage('men')}
            className="cursor-pointer bg-yellow-50 border-3 border-black hover:border-red-600 rounded-2xl p-5 transition-all transform hover:-translate-y-1 shadow-md group"
          >
            <span className="text-xs font-black text-red-600 block uppercase mb-1">Image 1 Sourced</span>
            <h3 className="text-lg font-black text-black group-hover:text-red-600 transition-colors">
              Men's Footwear Hub
            </h3>
            <p className="text-xs font-bold text-black/80 mt-2 leading-relaxed">
              Cyberpunk sneakers, combat boots, and executive formal shoes built for durability and sharp style.
            </p>
            <span className="text-xs font-black text-emerald-700 mt-4 block flex items-center gap-1">
              Explore Men's →
            </span>
          </div>

          {/* Women */}
          <div 
            onClick={() => onNavigatePage('women')}
            className="cursor-pointer bg-yellow-50 border-3 border-black hover:border-red-600 rounded-2xl p-5 transition-all transform hover:-translate-y-1 shadow-md group"
          >
            <span className="text-xs font-black text-red-600 block uppercase mb-1">Image 2 Sourced</span>
            <h3 className="text-lg font-black text-black group-hover:text-red-600 transition-colors">
              Women's Footwear Hub
            </h3>
            <p className="text-xs font-bold text-black/80 mt-2 leading-relaxed">
              Crystal party heels, elegant wedges, and ergonomic walking boots crafted with luxury finishes.
            </p>
            <span className="text-xs font-black text-emerald-700 mt-4 block flex items-center gap-1">
              Explore Women's →
            </span>
          </div>

          {/* Boys */}
          <div 
            onClick={() => onNavigatePage('boys')}
            className="cursor-pointer bg-yellow-50 border-3 border-black hover:border-red-600 rounded-2xl p-5 transition-all transform hover:-translate-y-1 shadow-md group"
          >
            <span className="text-xs font-black text-red-600 block uppercase mb-1">Image 3 Sourced</span>
            <h3 className="text-lg font-black text-black group-hover:text-red-600 transition-colors">
              Boys' Footwear Hub
            </h3>
            <p className="text-xs font-bold text-black/80 mt-2 leading-relaxed">
              Light-up LED runners, school sports shoes, and rugged playground boots with shockproof heels.
            </p>
            <span className="text-xs font-black text-emerald-700 mt-4 block flex items-center gap-1">
              Explore Boys' →
            </span>
          </div>

          {/* Sports */}
          <div 
            onClick={() => onNavigatePage('sports')}
            className="cursor-pointer bg-yellow-50 border-3 border-black hover:border-red-600 rounded-2xl p-5 transition-all transform hover:-translate-y-1 shadow-md group"
          >
            <span className="text-xs font-black text-red-600 block uppercase mb-1">Image 4 Sourced</span>
            <h3 className="text-lg font-black text-black group-hover:text-red-600 transition-colors">
              Sports Footwear Hub
            </h3>
            <p className="text-xs font-bold text-black/80 mt-2 leading-relaxed">
              Cricket spike boots, firm turf football cleats, and high-impact marathon trainers for peak athletes.
            </p>
            <span className="text-xs font-black text-emerald-700 mt-4 block flex items-center gap-1">
              Explore Sports →
            </span>
          </div>
        </div>
      </div>

      {/* Call to action bar */}
      <div className="bg-red-600 border-4 border-black rounded-3xl p-8 sm:p-10 text-center text-white shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-black">
          READY TO EXPERIENCE NEXT-GEN FOOTWEAR?
        </h3>
        <p className="text-sm sm:text-base font-bold mt-2 text-yellow-200 max-w-xl mx-auto">
          Order today with Cash on Delivery in Pakistan or express global shipping.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigatePage('all')}
            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-900 transition-all"
          >
            Shop Now
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-yellow-100 text-black font-black text-sm shadow-xl border-2 border-black transition-all"
          >
            Contact Customer Support
          </button>
        </div>
      </div>

    </div>
  );
};
