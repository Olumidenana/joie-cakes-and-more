import React from 'react';
import { Scale, Bike, ArrowRight, Clock, Star, Sparkles, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export function Hero({ onExploreMenu, onGoKilishi, onOpenConcierge }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FBF9FD] via-[#F4EDFC] to-[#FAF8FD] border-b border-purple-100/80 pt-6 pb-12 sm:pb-16">
      {/* Delicate lilac and lavender ambient glow */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-purple-100/80 border border-purple-200 px-3.5 py-1 rounded-full text-xs font-semibold text-purple-950">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>Northern Delicacies &bull; Handcrafted Confectionery in Ondo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 leading-[1.18] font-serif-luxury">
              Fresh Vanilla Cakes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#591F8F] via-[#7A36B8] to-[#9955DC]">
                Kilishi by the Kilogram
              </span> &amp; Sweet Treats.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Welcome to <strong>Joie Cakes &amp; More</strong> — where authentic culinary craft meets hospital-grade precision. 
              Founded by <strong>Dr. Joie</strong>, we bring you sun-cured beef kilishi strictly measured in kilograms 
              (0.25kg to 5kg), delicate vanilla buttercream cakes, thick Greek yoghurts, layered fruit parfaits, and luxury event styling across Ondo State.
            </p>

            {/* Value chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 bg-white/90 border border-purple-100 rounded-2xl shadow-2xs">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-800">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900">Kilishi by Kg</div>
                  <div className="text-stone-500 text-[10px]">0.25kg to 5kg Tiers</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-white/90 border border-purple-100 rounded-2xl shadow-2xs">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900">Urgency Options</div>
                  <div className="text-stone-500 text-[10px]">Express vs Slot Cap</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-white/90 border border-purple-100 rounded-2xl shadow-2xs col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-800">
                  <Bike className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900">Ondo Bikemen</div>
                  <div className="text-stone-500 text-[10px]">Live Minutes ETA</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 bg-[#42176B] hover:bg-[#341154] text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Order Cakes &amp; Treats</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoKilishi}
                className="flex items-center gap-2 bg-[#7534AF] hover:bg-[#652C97] text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>⚖️ Kilishi in Kilograms</span>
              </button>

              <button
                onClick={onOpenConcierge}
                className="flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-950 border border-purple-200 px-4 py-3 rounded-xl font-medium text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
              >
                <span>Ask Dr. Joie Concierge</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Card showcasing actual packaging */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-purple-100 overflow-hidden">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-purple-50">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                    alt="Joie Vanilla Dream Cake"
                    className="w-full h-full object-cover transform hover:scale-105 transition-duration-700 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#250B3B]/85 via-[#250B3B]/25 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-purple-200 bg-purple-950/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-fit mb-1">
                      Dr. Joie Confectionery &bull; Ondo
                    </span>
                    <h3 className="text-lg font-bold font-serif-luxury">Fresh Cakes &amp; Northern Delicacies</h3>
                    <p className="text-xs text-purple-100/90">
                      Dispatched same-day to UNIMED Teaching Hospital, Ondo Town &amp; Akure.
                    </p>
                  </div>
                </div>

                {/* Northern Delicacies Kilishi Pill with actual pouch photo */}
                <div className="mt-3 p-3 bg-purple-50/80 rounded-2xl border border-purple-200/80 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/joie-kilishi-real.jpg" 
                      alt="Northern Delicacies Pouch" 
                      className="w-12 h-12 rounded-xl object-cover border border-purple-300 shadow-2xs shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                        <span>Northern Delicacies</span>
                        <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.2 rounded-full">Official</span>
                      </div>
                      <div className="text-[11px] text-purple-800">Kilishi (Beef Jerky) &bull; 0.25kg to 5kg</div>
                    </div>
                  </div>
                  <button
                    onClick={onGoKilishi}
                    className="text-xs font-bold bg-[#6D32A3] text-white px-3 py-1.5 rounded-xl hover:bg-[#5C278C] cursor-pointer shadow-xs shrink-0"
                  >
                    Weigh Kg
                  </button>
                </div>

                {/* Rider delivery indicator */}
                <div className="mt-2.5 p-2.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-stone-700 font-medium">Trusted Ondo Bikemen active</span>
                  </div>
                  <span className="text-purple-900 font-bold font-mono-code">25 Min ETA</span>
                </div>

              </div>

              {/* Rating badge */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-purple-100 shadow-lg px-3.5 py-2 rounded-2xl flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs font-bold text-stone-900">4.98</span>
                <span className="text-[10px] text-stone-500">(1,400+ Orders)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
