import React, { useState, useEffect } from 'react';
import { Clock, Truck, ShieldCheck, Tag } from 'lucide-react';
import { Currency } from '../types';

interface PromoBannerProps {
  currency: Currency;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ currency }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {/* Bold Red & Green Box with Black & Red bold text */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-600 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <span className="text-xs font-black uppercase tracking-wider text-white bg-red-600 px-3 py-1 rounded-lg border border-red-800 flex items-center gap-1.5 shadow-md">
              <Truck className="w-3.5 h-3.5" />
              <span>Free Express Delivery Across Pakistan (COD Available)</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-black font-display">
            EXCLUSIVE FOOTWEAR DEALS // <span className="text-red-600">DUAL CURRENCY</span>
          </h3>

          <p className="text-black text-xs sm:text-sm font-bold">
            Currently active currency:{' '}
            <span className={currency === 'PKR' ? 'text-red-600 font-black' : 'text-emerald-700 font-black'}>
              {currency === 'PKR' ? 'PKR (Pakistani Rupees - 1 USD = 280 PKR)' : 'USD (US Dollars)'}
            </span>
            {' '}· 7-Day Doorstep Replacement Guarantee on all 74 Models!
          </p>
        </div>

        {/* Countdown Timer Box in Red */}
        <div className="shrink-0 bg-yellow-50 p-4 rounded-2xl border-3 border-black text-center shadow-lg">
          <span className="text-[11px] font-black uppercase text-black block mb-2 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-red-600" /> Flash Sale Closes In:
          </span>
          <div className="flex items-center space-x-2 font-mono text-xl sm:text-2xl font-black text-red-600">
            <div className="bg-white px-2.5 py-1 rounded-lg border-2 border-black shadow">
              {pad(timeLeft.hours)}
              <span className="text-[9px] block text-black font-sans uppercase">Hrs</span>
            </div>
            <span className="text-black">:</span>
            <div className="bg-white px-2.5 py-1 rounded-lg border-2 border-black shadow">
              {pad(timeLeft.minutes)}
              <span className="text-[9px] block text-black font-sans uppercase">Min</span>
            </div>
            <span className="text-black">:</span>
            <div className="bg-white px-2.5 py-1 rounded-lg border-2 border-black shadow">
              {pad(timeLeft.seconds)}
              <span className="text-[9px] block text-black font-sans uppercase">Sec</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
