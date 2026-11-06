import React from 'react';
import { ShoppingBag, Stethoscope, Sparkles, Bike, MessageCircle, Camera } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
      {/* Top micro-bar for Ondo State location & doctor status */}
      <div className="bg-[#2D1245] text-purple-200 text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="font-medium text-purple-200">Ondo City Delivery Hub:</span>
            <span className="text-purple-300/80">Ondo Town • UNIMED Zone • Adeyemi Axis • Akure Shuttle</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a
              href="https://instagram.com/joiescakes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Camera className="w-3 h-3 text-purple-300" />
              <span>@joiescakes</span>
            </a>

            <span className="text-purple-400/50">|</span>

            <button
              onClick={onOpenAdmin}
              className="hover:text-purple-100 underline text-[11px] cursor-pointer transition-colors"
            >
              Doctor's Shift Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#6C34A3] via-[#8545C6] to-[#A467E0] flex items-center justify-center text-white shadow-md shadow-purple-900/10 group-hover:scale-105 transition-transform">
            <span className="font-serif-luxury text-xl font-bold italic">J</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-serif-luxury">
                Joie Cakes <span className="text-purple-800 font-light">&amp; More</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                Ondo
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Northern Delicacies (Kilishi by Kg) • Custom Cakes • Greek Yoghurt &amp; Events
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-purple-50/70 p-1 rounded-full border border-purple-100 text-xs font-semibold text-stone-600">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'menu' 
                ? 'bg-white text-purple-950 shadow-xs font-bold' 
                : 'hover:text-purple-900'
            }`}
          >
            Treats &amp; Menu
          </button>
          
          <button
            onClick={() => setActiveTab('kilishi-calculator')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'kilishi-calculator' 
                ? 'bg-[#6D34A5] text-white shadow-xs font-bold' 
                : 'hover:text-purple-900'
            }`}
          >
            <span>⚖️ Kilishi in Kg</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'events' 
                ? 'bg-white text-purple-950 shadow-xs font-bold' 
                : 'hover:text-purple-900'
            }`}
          >
            Events &amp; Dessert Bars
          </button>

          <button
            onClick={onOpenTracker}
            className="px-4 py-2 rounded-full transition-all hover:text-purple-950 cursor-pointer flex items-center gap-1.5"
          >
            <Bike className="w-3.5 h-3.5 text-purple-700" />
            <span>Track Bikeman</span>
            {activeOrderCount > 0 && (
              <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
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
            className="hidden sm:flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100/90 text-purple-900 px-3.5 py-2 rounded-xl text-xs font-semibold border border-purple-200 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-purple-700" />
            <span>Ask Concierge</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-[#4E1E7B] to-[#6829A4] hover:from-[#43196B] hover:to-[#5B2391] text-white px-4 py-2 rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-purple-200" />
            <span className="hidden sm:inline">My Basket</span>
            {cartCount > 0 && (
              <span className="bg-white text-purple-900 font-bold text-xs px-2 py-0.5 rounded-full shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="flex md:hidden items-center justify-around border-t border-purple-100 px-2 py-2 bg-purple-50/50 text-xs font-medium">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-3 py-1 rounded-full ${activeTab === 'menu' ? 'bg-[#6D34A5] text-white font-semibold' : 'text-stone-700'}`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab('kilishi-calculator')}
          className={`px-3 py-1 rounded-full ${activeTab === 'kilishi-calculator' ? 'bg-[#6D34A5] text-white font-semibold' : 'text-stone-700'}`}
        >
          ⚖️ Kilishi (Kg)
        </button>
        <button
          onClick={onOpenTracker}
          className="px-3 py-1 text-stone-700 flex items-center gap-1"
        >
          <Bike className="w-3.5 h-3.5 text-purple-700" />
          <span>Bikeman ({activeOrderCount})</span>
        </button>
        <button
          onClick={onOpenConcierge}
          className="px-3 py-1 text-purple-800 font-semibold flex items-center gap-1"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Concierge</span>
        </button>
      </div>
    </header>
  );
}
