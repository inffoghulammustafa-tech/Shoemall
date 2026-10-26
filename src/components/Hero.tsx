import React from 'react';
import { ArrowDown, Zap, Trophy, Sparkles, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';
import { PageType } from '../types';

interface HeroProps {
  onNavigatePage: (page: PageType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigatePage }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video with poster fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          className="w-full h-full object-cover scale-105 opacity-20 mix-blend-multiply"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-shoes-of-a-runner-in-a-race-43285-large.mp4" type="video/mp4" />
        </video>
        {/* Radial Yellow Overlay for crisp contrast */}
        <div className="absolute inset-0 bg-[#fed828]/85" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle kicker tag in bold Red & Green */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white border-3 border-black text-black text-xs font-black mb-6 shadow-xl">
          <Zap className="w-4 h-4 text-red-600" />
          <span className="tracking-wide">PREMIUM FOOTWEAR FOR MEN, WOMEN, BOYS & SPORTS</span>
        </div>

        {/* Primary Headline in Bold Black & Red */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black mb-6 leading-tight font-display">
          NEXT-GEN COMFORT & <br />
          <span className="text-red-600 underline decoration-emerald-600 decoration-8">
            CHAMPIONSHIP STYLE
          </span>
        </h1>

        {/* Supporting description */}
        <p className="max-w-2xl mx-auto text-black text-base sm:text-lg md:text-xl mb-10 leading-relaxed font-bold">
          Explore our dedicated collections: Men's sneakers & boots (Image 1), Women's luxury heels (Image 2), Boys' glowing runners (Image 3), and Sports cricket & football shoes (Image 4).
        </p>

        {/* 4 Child Page Action Buttons in Red and Green */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <button
            onClick={() => onNavigatePage('women')}
            className="px-6 py-3.5 rounded-xl font-black bg-emerald-600 text-white shadow-xl border-2 border-emerald-800 hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <span>Women's Page (Img 2)</span>
          </button>
          
          <button
            onClick={() => onNavigatePage('men')}
            className="px-6 py-3.5 rounded-xl font-black bg-red-600 text-white shadow-xl border-2 border-red-800 hover:bg-red-700 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <span>Men's Page (Img 1)</span>
          </button>
          
          <button
            onClick={() => onNavigatePage('boys')}
            className="px-6 py-3.5 rounded-xl font-black bg-emerald-600 text-white shadow-xl border-2 border-emerald-800 hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <span>Boys' Page (Img 3)</span>
          </button>
          
          <button
            onClick={() => onNavigatePage('sports')}
            className="px-6 py-3.5 rounded-xl font-black bg-red-600 text-white shadow-xl border-2 border-red-800 hover:bg-red-700 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>Sports Page (Img 4)</span>
          </button>
        </div>

        {/* 4-Item Statistics Strip in Alternating Red & Green Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
          <div 
            onClick={() => onNavigatePage('men')}
            className="cursor-pointer bg-white border-3 border-black hover:border-red-600 rounded-2xl p-4 shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span className="text-2xl sm:text-3xl font-black text-red-600 block">
              18+
            </span>
            <span className="text-xs font-black uppercase text-black">
              Men's Models
            </span>
            <span className="text-[11px] font-bold text-emerald-700 block mt-0.5">Image 1</span>
          </div>

          <div 
            onClick={() => onNavigatePage('women')}
            className="cursor-pointer bg-white border-3 border-black hover:border-emerald-600 rounded-2xl p-4 shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 block">
              18+
            </span>
            <span className="text-xs font-black uppercase text-black">
              Women's Heels
            </span>
            <span className="text-[11px] font-bold text-red-600 block mt-0.5">Image 2</span>
          </div>

          <div 
            onClick={() => onNavigatePage('boys')}
            className="cursor-pointer bg-white border-3 border-black hover:border-red-600 rounded-2xl p-4 shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span className="text-2xl sm:text-3xl font-black text-red-600 block">
              18+
            </span>
            <span className="text-xs font-black uppercase text-black">
              Boys' Trainers
            </span>
            <span className="text-[11px] font-bold text-emerald-700 block mt-0.5">Image 3</span>
          </div>

          <div 
            onClick={() => onNavigatePage('sports')}
            className="cursor-pointer bg-white border-3 border-black hover:border-emerald-600 rounded-2xl p-4 shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 block">
              20+
            </span>
            <span className="text-xs font-black uppercase text-black">
              Sports Spikes
            </span>
            <span className="text-[11px] font-bold text-red-600 block mt-0.5">Image 4</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <a
            href="#catalog"
            className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-black bg-white/90 px-4 py-1.5 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all shadow-md"
          >
            <span>Scroll to Catalog</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
