import React, { useState } from 'react';
import { 
  Sparkles, 
  Wrench, 
  Truck, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { PageType, Currency } from '../types';

interface ServicesPageProps {
  onNavigatePage: (page: PageType) => void;
  currency: Currency;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigatePage, currency }) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [serviceName, setServiceName] = useState('Custom Sole Fitting & Orthopedic Arch');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerNotes('');
    }, 4000);
  };

  const servicesList = [
    {
      id: 'custom-fitting',
      title: 'Precision Sizing & Ergonomic Arch Fitting',
      category: 'Biomechanics',
      badge: 'POPULAR SERVICE',
      boxTheme: 'green' as const,
      icon: <Layers className="w-8 h-8 text-emerald-700" />,
      desc: 'Free digital foot measurement and tailored gel/carbon arch support for zero fatigue during long sprints, cricket matches, and formal galas.',
      features: [
        'Custom memory-foam & carbon fiber inserts',
        'Pressure point mapping & arch calibration',
        'Available for all Men, Women, and Boys sizes',
        '7-day comfort satisfaction guarantee'
      ],
      pricePKR: 'PKR 2,500',
      priceUSD: '$12.00',
      turnaround: '24 - 48 Hours'
    },
    {
      id: 'sneaker-restoration',
      title: 'Deep Cryo-Cleaning & Sneaker Restoration',
      category: 'Care & Maintenance',
      badge: 'REVIVAL PRO',
      boxTheme: 'red' as const,
      icon: <Sparkles className="w-8 h-8 text-red-600" />,
      desc: 'Complete ultrasonic dirt extraction, yellowed sole un-oxidization, water repellent nano-coating, and delicate hand stitching repairs.',
      features: [
        'Midsole un-yellowing & UV restoration',
        'Crease reduction & toe-box reshaping',
        'Hydrophobic water & stain nano-shield',
        'Anti-microbial deodorizing treatment'
      ],
      pricePKR: 'PKR 3,200',
      priceUSD: '$15.00',
      turnaround: '48 Hours'
    },
    {
      id: 'spikes-replacement',
      title: 'Athletic Spikes & Cleats Stud Re-Tractioning',
      category: 'Sports Performance',
      badge: 'SPORTS SPECIAL',
      boxTheme: 'green' as const,
      icon: <Wrench className="w-8 h-8 text-emerald-700" />,
      desc: 'Tungsten cricket bowling spikes, football turf stud replacement, and plate stiffening engineered for max grip and fast acceleration.',
      features: [
        'All-weather stainless steel & ceramic spikes',
        'Firm ground (FG) & artificial turf (AG) conversion',
        'Reinforced toe bumper for cricket bowlers',
        'Match-ready calibration and balance check'
      ],
      pricePKR: 'PKR 2,800',
      priceUSD: '$14.00',
      turnaround: 'Same-day / 24 Hours'
    },
    {
      id: 'express-delivery',
      title: 'VIP Express Doorstep Delivery & Try-Before-Pay',
      category: 'Logistics',
      badge: 'FAST LOGISTICS',
      boxTheme: 'red' as const,
      icon: <Truck className="w-8 h-8 text-red-600" />,
      desc: 'Rapid express courier covering all cities in Pakistan with Cash on Delivery option and doorstep sizing exchange if the fit is not exact.',
      features: [
        'Overnight shipping to Lahore, Karachi, Islamabad',
        'Real-time SMS & WhatsApp package tracking',
        'Free doorstep size exchange service',
        'Discreet shockproof armored shoe packaging'
      ],
      pricePKR: 'FREE over PKR 5,000',
      priceUSD: 'FREE over $50',
      turnaround: '2 - 4 Days'
    },
    {
      id: 'authenticity-guarantee',
      title: '100% Genuine Materials & Quality Audit',
      category: 'Trust & Warranty',
      badge: 'OFFICIAL CERTIFIED',
      boxTheme: 'green' as const,
      icon: <Award className="w-8 h-8 text-emerald-700" />,
      desc: 'Every single pair goes through an 18-point inspection checklist for stitch density, sole adhesion, bounce index, and colorfastness.',
      features: [
        'Individually inspected and serial numbered',
        'Official 90-day sole crack replacement guarantee',
        'Direct sourcing and ethical manufacturing',
        'Certificate of authentic build included'
      ],
      pricePKR: 'Complimentary',
      priceUSD: 'Complimentary',
      turnaround: 'Included with Every Pair'
    },
    {
      id: 'team-bulk-orders',
      title: 'Custom Team, School & Corporate Bulk Orders',
      category: 'Bulk Sourcing',
      badge: 'TEAM ORDERS',
      boxTheme: 'red' as const,
      icon: <Zap className="w-8 h-8 text-red-600" />,
      desc: 'Tailored footwear for cricket academies, football clubs, school teams, and corporate marathons with custom colorways and crests.',
      features: [
        'Team jersey colorway matching',
        'Player squad numbers and custom initials printed',
        'Bulk wholesale volume discounts (up to 35% off)',
        'Sample pair provided before mass production'
      ],
      pricePKR: 'Custom Quote',
      priceUSD: 'Custom Quote',
      turnaround: '5 - 10 Days'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner - Yellow background with Bold Black & Red Typography */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider mb-4 shadow-md">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>PREMIUM SHOE SERVICES & AFTER-CARE</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
          OUR EXCLUSIVE <span className="text-red-600 underline decoration-red-600 decoration-4">SERVICES</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg font-bold text-black leading-relaxed">
          From custom ergonomic sole sizing to cryo sneaker cleaning and match-ready sports spikes replacements — we keep your footwear performing at championship level.
        </p>

        {/* Action button in bold green */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigatePage('all')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Browse All Shoes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl border-2 border-red-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Support Desk</span>
          </button>
        </div>
      </div>

      {/* Services Grid with Red and Green Box Frames & Bold Black/Red Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {servicesList.map((service) => {
          const isGreen = service.boxTheme === 'green';
          return (
            <div
              key={service.id}
              className={`rounded-2xl p-6 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${
                isGreen
                  ? 'bg-white border-4 border-emerald-600 shadow-emerald-900/10'
                  : 'bg-white border-4 border-red-600 shadow-red-900/10'
              }`}
            >
              <div>
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-lg text-white ${
                      isGreen ? 'bg-emerald-600' : 'bg-red-600'
                    }`}
                  >
                    {service.badge}
                  </span>
                  <span className="text-xs font-black uppercase text-black font-mono">
                    {service.category}
                  </span>
                </div>

                {/* Service Icon & Title */}
                <div className="mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
                      isGreen ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-red-100 border-2 border-red-500'
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-black text-black leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm font-bold text-black/90 mb-5 leading-relaxed">
                  {service.desc}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-bold text-black">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isGreen ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Turnaround Box */}
              <div
                className={`pt-4 border-t-2 flex items-center justify-between mt-auto ${
                  isGreen ? 'border-emerald-200 bg-emerald-50/70' : 'border-red-200 bg-red-50/70'
                } -mx-6 -mb-6 p-4 rounded-b-xl`}
              >
                <div>
                  <span className="text-[11px] font-black uppercase text-black block">
                    Estimated Cost
                  </span>
                  <span className="text-base font-black text-red-600">
                    {currency === 'PKR' ? service.pricePKR : service.priceUSD}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-black uppercase text-black block flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-black" /> Turnaround
                  </span>
                  <span className="text-xs font-black text-black">
                    {service.turnaround}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Service Inquiry Form Box - Bold Green/Red Frame */}
      <div className="bg-white border-4 border-emerald-600 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 rounded bg-red-600 text-white font-black text-xs uppercase mb-2">
            FAST BOOKING DESK
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black">
            Book a Shoe <span className="text-red-600">Service Appointment</span>
          </h2>
          <p className="text-sm font-bold text-black mt-2">
            Leave your contact details and shoe service requirement. Our specialist footwear technician will call you within 15 minutes.
          </p>
        </div>

        {inquirySubmitted ? (
          <div className="bg-emerald-100 border-4 border-emerald-600 p-8 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
            <h3 className="text-2xl font-black text-black">
              Service Inquiry Received!
            </h3>
            <p className="text-sm font-bold text-black max-w-md mx-auto">
              Thank you, <span className="text-red-600">{customerName}</span>. Our shoe technician has received your request for <span className="text-red-600">{serviceName}</span> and will reach you at <span className="text-emerald-700">{customerPhone}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-black uppercase text-black mb-2">
                  Select Service
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600"
                >
                  <option value="Custom Sole Fitting & Orthopedic Arch">Custom Sole Fitting & Orthopedic Arch</option>
                  <option value="Deep Cryo-Cleaning & Sneaker Restoration">Deep Cryo-Cleaning & Sneaker Restoration</option>
                  <option value="Athletic Spikes & Cleats Stud Re-Tractioning">Athletic Spikes & Cleats Stud Re-Tractioning</option>
                  <option value="VIP Express Doorstep Delivery & Sizing">VIP Express Doorstep Delivery & Sizing</option>
                  <option value="Custom Team, School & Corporate Bulk Orders">Custom Team, School & Corporate Bulk Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hamza Ali"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-2">
                  Shoe Model & Size
                </label>
                <input
                  type="text"
                  placeholder="e.g. Men Cyber Stride EU 42"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-gray-200">
              <div className="flex items-center gap-2 text-xs font-black text-black">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Zero upfront charge · Free quotation inspection</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md border-2 border-red-800 transition-all text-center"
                >
                  Call Helpline
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-800 transition-all text-center"
                >
                  Confirm Service Booking
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
