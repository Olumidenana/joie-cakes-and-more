import React from 'react';
import { Sparkles, Scale, Bike, ShieldCheck, HeartHandshake, ArrowRight, Clock, Star } from 'lucide-react';

export function Hero({ onExploreMenu, onGoKilishi, onOpenConcierge }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EE] via-[#F5ECE0] to-[#FAF7F2] border-b border-stone-200/60 pt-6 pb-12 sm:pb-16">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-950 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Physician-Precision Hygiene • Ondo Confectionery &amp; Gourmet Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 leading-[1.15] font-serif-luxury">
              Luxury Vanilla Cakes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700">
                Kilishi by the Kilogram
              </span> &amp; Gourmet Pastries.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Welcome to <strong>Joie Cakes &amp; More</strong> — founded by Dr. Joie (MD). Whether you’re craving 
              our authentic spiced <strong>beef kilishi measured strictly in kilograms (0.25kg to 5kg)</strong>, 
              custom celebratory vanilla &amp; red velvet cakes, creamy Greek yoghurts, layered fruit parfaits, or 
              full event management across Ondo State, our automated system schedules your delivery effortlessly 
              while Dr. Joie attends to hospital rounds!
            </p>

            {/* Value chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 p-2 bg-white/80 border border-stone-200 rounded-xl shadow-2xs">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-800">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-800">Kilishi in Kg</div>
                  <div className="text-stone-500 text-[10px]">0.25kg to 5kg Tiers</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white/80 border border-stone-200 rounded-xl shadow-2xs">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-800">Urgency Scheduler</div>
                  <div className="text-stone-500 text-[10px]">Express vs Slot Cap</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white/80 border border-stone-200 rounded-xl shadow-2xs col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800">
                  <Bike className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-800">Ondo Bikemen</div>
                  <div className="text-stone-500 text-[10px]">Live Minutes ETA</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Order Treats &amp; Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoKilishi}
                className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>⚖️ Kilishi Kg Calculator</span>
              </button>

              <button
                onClick={onOpenConcierge}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-4 py-3 rounded-xl font-medium text-sm shadow-2xs transition-colors cursor-pointer"
              >
                <span>Ask Dr. Joie Concierge</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Showcase & Testimonial */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main aesthetic card */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-stone-200/90 overflow-hidden">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                    alt="Joie Velvet Cake & Treats"
                    className="w-full h-full object-cover transform hover:scale-105 transition-duration-700 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 bg-amber-900/60 backdrop-blur-xs px-2 py-0.5 rounded w-fit mb-1">
                      Doctor Crafted • Hospital-Grade Hygiene
                    </span>
                    <h3 className="text-lg font-bold font-serif-luxury">Fresh Cakes &amp; Sun-Cured Kilishi</h3>
                    <p className="text-xs text-stone-200">
                      Dispatched across Ondo City, UNIMED medical campus, and Akure highway daily.
                    </p>
                  </div>
                </div>

                {/* Floating pill: Authentic Northern Delicacies Kilishi & Donkwa */}
                <div className="mt-3 p-3 bg-amber-50/90 rounded-2xl border border-amber-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="/joie-kilishi-real.jpg" 
                      alt="Northern Delicacies Kilishi Pouch" 
                      className="w-11 h-11 rounded-xl object-cover border border-amber-300 shrink-0 shadow-2xs"
                    />
                    <div>
                      <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                        <span>Northern Delicacies (By Kg)</span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">Official</span>
                      </div>
                      <div className="text-[11px] text-amber-800">Freshly Made &bull; Quality Ingredients &bull; Made with Love</div>
                    </div>
                  </div>
                  <button
                    onClick={onGoKilishi}
                    className="text-xs font-bold bg-amber-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-amber-700 cursor-pointer shadow-xs"
                  >
                    Weigh Kg
                  </button>
                </div>

                {/* Trusted Dispatch Rider Pill */}
                <div className="mt-2.5 p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" 
                      alt="Rider Kola" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-800 flex items-center gap-1">
                        <span>Rider Kola (Trusted Ondo Bike 01)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Active</span>
                      </div>
                      <div className="text-[11px] text-stone-500">Live minute countdown &amp; Paystack verified</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-900 font-mono-code">25 Min ETA</div>
                    <div className="text-[10px] text-stone-400">Ondo Central</div>
                  </div>
                </div>

              </div>

              {/* Decorative rating pill */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-stone-200 shadow-lg px-3.5 py-2 rounded-2xl flex items-center gap-2">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs font-bold text-stone-800">4.96/5.0</span>
                <span className="text-[10px] text-stone-500">(1,240+ Orders)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
