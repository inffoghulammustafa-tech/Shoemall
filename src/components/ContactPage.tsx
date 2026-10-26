import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle,
  Truck,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { PageType } from '../types';

interface ContactPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigatePage }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Order Tracking');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4500);
  };

  const faqs = [
    {
      q: 'How long does delivery take across Pakistan?',
      a: 'We deliver within 2 to 4 working days to all major cities including Lahore, Karachi, Rawalpindi, Islamabad, Faisalabad, Multan, and Peshawar via TCS and Leopard courier services.'
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes, 100% Cash on Delivery is available across Pakistan. You can inspect the outer packaging and pay the courier rider upon delivery.'
    },
    {
      q: 'What is your size exchange and return policy?',
      a: 'We offer a 7-day hassle-free doorstep size exchange. If the shoe is too tight or loose, simply notify our WhatsApp support desk and we will send you the replacement size immediately.'
    },
    {
      q: 'Do you deliver internationally?',
      a: 'Yes! We ship worldwide via DHL Express with an average transit time of 5-7 business days. International orders can be paid securely via PayPal, Visa, or Mastercard.'
    },
    {
      q: 'Are all 74 shoe models true to European (EU) sizing?',
      a: 'Yes, our shoes follow standard EU foot sizing (sizes EU 35 to 46). We also include a size conversion guide in the product quick view modal.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header - Bold Black & Red with Yellow BG */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider mb-4 shadow-md">
          <Phone className="w-4 h-4 text-yellow-300" />
          <span>24/7 CUSTOMER CARE & STORE NETWORK</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
          GET IN <span className="text-red-600 underline decoration-red-600 decoration-4">TOUCH</span> WITH US
        </h1>

        <p className="mt-4 text-base sm:text-lg font-bold text-black leading-relaxed">
          Need sizing assistance, order status tracking, bulk sports team orders, or shoe maintenance advice? Our support specialists are ready to help.
        </p>

        {/* Quick WhatsApp Action Button */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/923001234567?text=Hello%20NeonKicks%20Support!%20I%20have%20an%20inquiry%20about%20your%20shoes."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-yellow-300" />
            <span>Chat on WhatsApp (+92 300 1234567)</span>
          </a>
          <a
            href="tel:+923001234567"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl border-2 border-red-800 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Direct Helpline</span>
          </a>
        </div>
      </div>

      {/* Grid: 3 Contact Method Info Boxes (Alternating Red and Green) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Box 1: Phone & WhatsApp (Green Box) */}
        <div className="bg-white border-4 border-emerald-600 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-700 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase text-red-600 block mb-1">
              Direct Helplines
            </span>
            <h3 className="text-xl font-black text-black mb-2">
              Phone & WhatsApp
            </h3>
            <p className="text-xs font-bold text-black/80 mb-4">
              Instant assistance for urgent orders, size alterations, and courier dispatch numbers.
            </p>
            <div className="space-y-1.5 text-xs font-black text-black">
              <p>WhatsApp: <span className="text-emerald-700">+92 300 1234567</span></p>
              <p>Helpline: <span className="text-red-600">+92 42 35789012</span></p>
              <p>Toll-Free: <span className="text-black">0800-KICKS (54257)</span></p>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t-2 border-emerald-100 flex items-center gap-1.5 text-[11px] font-black text-emerald-700">
            <Clock className="w-3.5 h-3.5" /> 9:00 AM – 11:00 PM PST
          </div>
        </div>

        {/* Box 2: Store Locations (Red Box) */}
        <div className="bg-white border-4 border-red-600 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-red-100 border-2 border-red-600 flex items-center justify-center text-red-600 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase text-emerald-700 block mb-1">
              Store Locations
            </span>
            <h3 className="text-xl font-black text-black mb-2">
              Visit Our Flagships
            </h3>
            <p className="text-xs font-bold text-black/80 mb-4">
              Experience all 74 shoe styles in person with free digital foot sizing scans.
            </p>
            <div className="space-y-2 text-xs font-black text-black">
              <p><span className="text-red-600">Lahore:</span> MM Alam Road, Gulberg III</p>
              <p><span className="text-red-600">Karachi:</span> Dolmen Mall, Clifton Block 4</p>
              <p><span className="text-red-600">Islamabad:</span> Beverly Centre, Blue Area</p>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t-2 border-red-100 flex items-center gap-1.5 text-[11px] font-black text-red-600">
            <Clock className="w-3.5 h-3.5" /> Mon - Sun: 11 AM – 10 PM
          </div>
        </div>

        {/* Box 3: Email & Support Inquiries (Green Box) */}
        <div className="bg-white border-4 border-emerald-600 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-700 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase text-red-600 block mb-1">
              Email Helpdesk
            </span>
            <h3 className="text-xl font-black text-black mb-2">
              Written Support
            </h3>
            <p className="text-xs font-bold text-black/80 mb-4">
              Send detailed inquiries for bulk sports team orders, corporate supplies, or returns.
            </p>
            <div className="space-y-1.5 text-xs font-black text-black">
              <p>General: <span className="text-emerald-700">support@neonkicks.com</span></p>
              <p>Orders: <span className="text-red-600">orders@neonkicks.com</span></p>
              <p>Bulk/Teams: <span className="text-black">teams@neonkicks.com</span></p>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t-2 border-emerald-100 flex items-center gap-1.5 text-[11px] font-black text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" /> Average response: &lt; 2 Hours
          </div>
        </div>

      </div>

      {/* Main Two-Column: Interactive Form (Red Box) & FAQs (Green Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Form Container: 7 Columns */}
        <div className="lg:col-span-7 bg-white border-4 border-red-600 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded bg-red-600 text-white font-black text-xs uppercase mb-2">
              SEND DIRECT MESSAGE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              Have a Question? <span className="text-red-600">Write to Us</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold text-black mt-1">
              Fill out this quick form and our support manager will respond directly to your WhatsApp or phone.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-100 border-4 border-emerald-600 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="text-2xl font-black text-black">
                Message Sent Successfully!
              </h3>
              <p className="text-sm font-bold text-black max-w-md mx-auto">
                Thank you, <span className="text-red-600">{name}</span>! Our support team has logged your inquiry regarding <span className="text-red-600">{category}</span> and will reply promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Tariq"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 321 9876543"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. usman@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600"
                  >
                    <option value="Order Tracking">Order Tracking & Delivery Status</option>
                    <option value="Size Exchange">Size Exchange or Fit Issue</option>
                    <option value="Sports Shoes">Sports Spikes / Cleats Sizing</option>
                    <option value="Shoe Service">Shoe Maintenance & Cleaning Service</option>
                    <option value="Bulk Order">Bulk Academy or Team Orders</option>
                    <option value="Payment Issue">Cash on Delivery or Payment Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  Your Message or Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what shoe model, size, or help you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-yellow-50 text-black font-bold text-sm px-4 py-3 rounded-xl border-2 border-black focus:outline-none focus:border-red-600 placeholder:text-gray-500 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-black text-black">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Privacy protected · Instant WhatsApp callback</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl border-2 border-emerald-800 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQs Container: 5 Columns (Green Box) */}
        <div className="lg:col-span-5 bg-white border-4 border-emerald-600 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-emerald-600 text-white font-black text-xs uppercase mb-2">
              FREQUENTLY ASKED
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-2">
              Quick Answers
            </h2>
            <p className="text-xs sm:text-sm font-bold text-black mb-6">
              Frequently asked queries about sizing, delivery, and payment options.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border-2 transition-all overflow-hidden ${
                      isOpen
                        ? 'border-red-600 bg-red-50'
                        : 'border-black bg-yellow-50 hover:border-emerald-600'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-2"
                    >
                      <span className="text-xs sm:text-sm font-black text-black">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-red-600 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs font-bold text-black/90 leading-relaxed border-t border-red-200 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-black text-black">Need more help?</span>
            <button
              onClick={() => onNavigatePage('services')}
              className="text-xs font-black text-red-600 hover:underline"
            >
              See All Services →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
