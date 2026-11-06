import React from 'react';
import { ShoppingBag, Stethoscope, Sparkles, Bike, MessageCircle, ShieldCheck, Clock, UserCheck } from 'lucide-react';

export function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenConcierge, 
  onOpenAdmin, 
  doctorShift, 
  activeTab, 
  setActiveTab,
  onOpenTracker,
  activeOrderCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top micro-bar for Doctor's Notice & Location */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-300">Ondo State Delivery Hub:</span>
            <span className="text-stone-300">Ondo Town • UNIMED Zone • Adeyemi Axis • Akure Express</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-stone-800/80 px-2 py-0.5 rounded-full border border-stone-700 text-stone-300">
              <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
              <span>Dr. Joie: <strong className="text-amber-200">{doctorShift === 'hospital' ? 'Hospital Duty (Auto-Pilot Active)' : 'At Kitchen Hub'}</strong></span>
            </div>
            
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 underline text-[11px] cursor-pointer transition-colors"
            >
              Doctor's Command Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-800 via-amber-700 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-serif-luxury">
                Joie Cakes <span className="text-amber-800 font-light">&amp; More</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                Conglomerate
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Cakes • Kilishi by Kg • Yoghurts • Pastries • Event Styling (Ondo)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1 rounded-full border border-stone-200 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'menu' 
                ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                : 'hover:text-stone-900'
            }`}
          >
            Treats &amp; Kilishi Menu
          </button>
          
          <button
            onClick={() => setActiveTab('kilishi-calculator')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'kilishi-calculator' 
                ? 'bg-amber-800 text-white shadow-xs font-semibold' 
                : 'hover:text-amber-800'
            }`}
          >
            <span>⚖️ Kilishi in Kg</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'events' 
                ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                : 'hover:text-stone-900'
            }`}
          >
            Events &amp; Catering
          </button>

          <button
            onClick={onOpenTracker}
            className="px-3.5 py-1.5 rounded-full transition-all hover:text-stone-900 cursor-pointer flex items-center gap-1.5"
          >
            <Bike className="w-4 h-4 text-amber-700" />
            <span>Track Bikeman</span>
            {activeOrderCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                {activeOrderCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5">
          {/* Ask Concierge */}
          <button
            onClick={onOpenConcierge}
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 px-3 py-2 rounded-xl text-xs font-semibold border border-amber-200 transition-colors cursor-pointer"
            title="Ask Dr. Joie's Virtual Concierge"
          >
            <MessageCircle className="w-4 h-4 text-amber-700" />
            <span>Ask Concierge</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">My Basket</span>
            {cartCount > 0 && (
              <span className="bg-white text-amber-900 font-bold text-xs px-2 py-0.5 rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="flex md:hidden items-center justify-around border-t border-stone-200 px-2 py-2 bg-stone-50 text-xs font-medium">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-2.5 py-1 rounded-full ${activeTab === 'menu' ? 'bg-amber-800 text-white font-semibold' : 'text-stone-700'}`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab('kilishi-calculator')}
          className={`px-2.5 py-1 rounded-full ${activeTab === 'kilishi-calculator' ? 'bg-amber-800 text-white font-semibold' : 'text-stone-700'}`}
        >
          ⚖️ Kilishi (Kg)
        </button>
        <button
          onClick={onOpenTracker}
          className="px-2.5 py-1 text-stone-700 flex items-center gap-1"
        >
          <Bike className="w-3.5 h-3.5 text-amber-700" />
          <span>Bikeman ({activeOrderCount})</span>
        </button>
        <button
          onClick={onOpenConcierge}
          className="px-2.5 py-1 text-amber-800 font-semibold flex items-center gap-1"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Concierge</span>
        </button>
      </div>
    </header>
  );
}
