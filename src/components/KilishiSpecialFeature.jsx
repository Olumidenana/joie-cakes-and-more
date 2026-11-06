import React, { useState } from 'react';
import { Scale, Flame, Check, ShoppingBag, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export function KilishiSpecialFeature({ onAddToCart, isSoldOut = false }) {
  const kgOptions = [
    { 
      weight: '0.25 kg', 
      label: 'Quarter Kg', 
      sub: 'Snack Pouch', 
      price: 3500, 
      sheets: '1-2 large sheets', 
      servings: '1-2 People',
      packaging: 'Northern Delicacies Stand-up Window Pouch' 
    },
    { 
      weight: '0.5 kg', 
      label: 'Half Kg', 
      sub: 'Family Savor Pack', 
      price: 6800, 
      popular: true, 
      sheets: '2-3 large sheets', 
      servings: '3-5 People',
      packaging: 'Double-sealed Stand-up Window Pouch' 
    },
    { 
      weight: '1.0 kg', 
      label: 'Full 1.0 Kg', 
      sub: 'Connoisseur Box', 
      price: 13000, 
      sheets: '5-6 large sheets', 
      servings: '6-8 People',
      packaging: 'Luxury sealed gift hamper box' 
    },
    { 
      weight: '2.0 kg', 
      label: '2.0 Kg', 
      sub: 'Jumbo Feast Pack', 
      price: 25000, 
      sheets: '10-12 large sheets', 
      servings: 'Party / Family Crate',
      packaging: 'Reusable airtight storage tub' 
    },
    { 
      weight: '5.0 kg', 
      label: '5.0 Kg', 
      sub: 'Conglomerate Wholesale', 
      price: 60000, 
      sheets: '25-30 large sheets', 
      servings: 'Event & Reseller Box',
      packaging: 'Dual heavy-duty sealed crate' 
    }
  ];

  const [selectedKgIndex, setSelectedKgIndex] = useState(1); // Default 0.5kg
  const [selectedSpice, setSelectedSpice] = useState('Traditional Mild Yaji');
  const [selectedCut, setSelectedCut] = useState('Thin Wafer Crisp');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const activeOption = kgOptions[selectedKgIndex];
  const totalPrice = activeOption.price * quantity;

  const handleAdd = () => {
    if (isSoldOut) return;

    onAddToCart({
      id: `kilishi-${activeOption.weight.replace(' ', '')}-${Date.now()}`,
      name: `Northern Delicacies: Kilishi (${activeOption.weight})`,
      category: 'kilishi',
      isKilishi: true,
      selectedWeight: activeOption.weight,
      selectedSpice,
      selectedCut,
      packaging: activeOption.packaging,
      price: activeOption.price,
      quantity,
      itemTotal: totalPrice,
      image: '/joie-kilishi-real.jpg'
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section className="bg-gradient-to-br from-[#2D0D45] via-[#3B155B] to-[#25083B] text-white rounded-3xl p-6 sm:p-10 my-10 shadow-2xl border border-purple-800/40 relative overflow-hidden">
      {/* Soft lavender ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-800/50 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/25 border border-purple-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-purple-200 mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Northern Delicacies &bull; Measured Strictly in Kilograms (kg)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-luxury tracking-tight text-white">
            Authentic Beef Kilishi (Beef Jerky)
          </h2>
          <p className="text-purple-200/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Thinly sliced deboned prime beef infused with stone-ground groundnut paste and roasted Yaji spices, 
            cured over glowing charcoal embers in Ondo. Packaged in our official Northern Delicacies window pouches.
          </p>
        </div>

        <div className="bg-purple-900/40 border border-purple-700/50 rounded-2xl p-3 text-right shrink-0">
          <div className="text-[11px] text-purple-300 font-mono-code uppercase tracking-wider">Official Packaging</div>
          <div className="text-xs font-semibold text-purple-100 flex items-center gap-1.5 justify-end mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Freshly Made &bull; Quality Ingredients</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Weigher Selector on Left, Visual Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Kilogram Selector & Flavor Configurator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Kilogram Weight Picker */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-purple-300 mb-3 flex items-center justify-between">
              <span>1. Choose Weighed Kilogram Pack</span>
              <span className="text-[11px] font-normal text-purple-200/80">Certified scales &bull; Airtight pouch</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {kgOptions.map((opt, idx) => (
                <div
                  key={opt.weight}
                  onClick={() => setSelectedKgIndex(idx)}
                  className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedKgIndex === idx
                      ? 'bg-[#823BC6] text-white border-purple-300 shadow-lg shadow-purple-950/40 ring-2 ring-purple-400 scale-[1.02]'
                      : 'bg-[#1F0730]/70 hover:bg-[#2A0E40] text-purple-200 border-purple-900/60'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute -top-2.5 right-3 bg-purple-300 text-[#25083B] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Popular
                    </span>
                  )}
                  <div className="text-xs font-mono-code opacity-80">{opt.sub}</div>
                  <div className="text-lg font-bold font-serif-luxury mt-0.5">{opt.weight}</div>
                  <div className="text-sm font-semibold mt-1 text-purple-200 font-mono-code">
                    {formatNaira(opt.price)}
                  </div>
                  <div className="text-[10px] opacity-75 mt-1 border-t border-white/10 pt-1">
                    ~ {opt.sheets}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Spice Level Profile */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-purple-300 mb-2.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-purple-400" />
              <span>2. Select Spice &amp; Pepper Intensity</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { name: 'Traditional Mild Yaji', desc: 'Aromatic ginger & clove, balanced kick' },
                { name: 'Suya Fire (Extra Hot)', desc: 'Heavy habanero & roasted chili peppers' },
                { name: 'Honey Glazed Pepper', desc: 'Pure sweet honey glaze meets spicy dry rub' }
              ].map((sp) => (
                <button
                  key={sp.name}
                  onClick={() => setSelectedSpice(sp.name)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedSpice === sp.name
                      ? 'bg-purple-800/80 border-purple-400 text-white font-medium'
                      : 'bg-[#1F0730]/60 border-purple-950 text-purple-300 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-purple-100">{sp.name}</div>
                  <div className="text-[10px] text-purple-300/80 mt-0.5">{sp.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Cut Style */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-purple-300 mb-2.5 block">
              3. Beef Cut &amp; Texture Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {['Thin Wafer Crisp', 'Tender Chewy Ribbons', 'Mixed Whole Sheets'].map((cut) => (
                <button
                  key={cut}
                  onClick={() => setSelectedCut(cut)}
                  className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedCut === cut
                      ? 'bg-purple-400 text-[#25083B] font-bold border-purple-300'
                      : 'bg-[#1F0730]/60 border-purple-950 text-purple-200 hover:bg-purple-900/60'
                  }`}
                >
                  {cut}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Preview & Order Action */}
        <div className="lg:col-span-5 bg-[#200732]/95 rounded-2xl p-5 border border-purple-800/60 shadow-xl space-y-4">
          <div className="relative h-56 rounded-xl overflow-hidden border border-purple-900/60 bg-[#160424]">
            <img
              src="/joie-kilishi-real.jpg"
              alt="Official Joie Northern Delicacies Kilishi Pouch"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-mono-code text-purple-300">
              Selected: {activeOption.weight} ({activeOption.label})
            </div>
            <div className="absolute bottom-2.5 right-2.5 bg-[#7E38C4] text-white px-2.5 py-1 rounded-lg text-xs font-bold font-mono-code">
              {formatNaira(activeOption.price)}
            </div>
          </div>

          {/* Specs breakdown */}
          <div className="space-y-2 text-xs text-purple-200 bg-[#140321]/80 p-3.5 rounded-xl border border-purple-950">
            <div className="flex justify-between">
              <span className="text-purple-300/70">Total Weighed:</span>
              <span className="font-bold text-white font-mono-code">{activeOption.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Approx. Content:</span>
              <span className="font-semibold text-purple-200">{activeOption.sheets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Serving Guide:</span>
              <span className="text-purple-100">{activeOption.servings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Spice Blend:</span>
              <span className="text-purple-200 font-medium">{selectedSpice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Packaging:</span>
              <span className="text-purple-100">{activeOption.packaging}</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-[#2B0E44] border border-purple-800 rounded-xl px-2.5 py-1.5">
              <button
                disabled={isSoldOut}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-white font-bold flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                -
              </button>
              <span className="font-mono-code text-sm font-bold w-6 text-center text-white">
                {quantity}
              </span>
              <button
                disabled={isSoldOut}
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-white font-bold flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-purple-300/80">Subtotal</div>
              <div className="text-lg font-bold text-purple-200 font-mono-code">
                {formatNaira(totalPrice)}
              </div>
            </div>
          </div>

          {isSoldOut ? (
            <a
              href="https://wa.me/2349064839054?text=Hello%20Dr.%20Joie,%20please%20reserve%20Kilishi%20for%20me%20for%20tomorrow!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-transform text-xs"
            >
              <span>Kilishi Ordered Finish Today &bull; Reserve for Tomorrow</span>
            </a>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B42D6] to-[#A45DE6] hover:from-[#7C36C7] hover:to-[#934CD5] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <ShoppingBag className="w-4 h-4 text-purple-100" />
              <span>Add {quantity}x ({activeOption.weight}) to Basket</span>
            </button>
          )}

          {addedNotice && (
            <div className="p-2.5 bg-purple-950/90 border border-purple-400 text-purple-200 text-xs rounded-xl flex items-center gap-2 justify-center animate-bounce">
              <Check className="w-4 h-4 text-purple-300" />
              <span>Added {activeOption.weight} Northern Delicacies Kilishi to your basket!</span>
            </div>
          )}

          <p className="text-[11px] text-purple-300/80 text-center">
            🛵 Ondo Delivery: Insulated packaging keeps your Kilishi crispy &amp; dry during delivery.
          </p>
        </div>

      </div>
    </section>
  );
}
