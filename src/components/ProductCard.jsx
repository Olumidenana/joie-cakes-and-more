import React, { useState } from 'react';
import { Star, ShoppingBag, Check, Sparkles, Bell } from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export function ProductCard({ product, onAddToCart, onSelectKilishiKg }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [customInscription, setCustomInscription] = useState('');
  const [selectedFrosting, setSelectedFrosting] = useState(
    product.frostings ? product.frostings[0] : null
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const isSoldOut = product.isAvailable === false || product.stockStatus === 'sold_out';

  // If product is Kilishi, we can let user quick-add or jump to the interactive Weigher
  if (product.isKilishi) {
    return (
      <div className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col group ${
        isSoldOut ? 'border-stone-200 opacity-80' : 'border-purple-100 shadow-sm hover:shadow-xl'
      }`}>
        <div className="relative h-56 overflow-hidden bg-purple-50">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale-30' : 'group-hover:scale-105'}`}
          />

          {/* Sold out banner overlay */}
          {isSoldOut ? (
            <div className="absolute inset-0 bg-[#25083B]/70 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center">
              <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Ordered Finish (Sold Out)
              </span>
              <p className="text-[11px] text-purple-100 mt-1 max-w-xs">
                Today's curing batch is fully booked. Fresh batch drops tomorrow morning!
              </p>
            </div>
          ) : (
            <>
              <div className="absolute top-3 left-3 bg-[#381657]/90 backdrop-blur-xs text-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>{product.badge || 'Sold strictly by Kg'}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold font-mono-code">
                From {formatNaira(3500)} / 0.25kg
              </div>
            </>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} reviews)</span>
              </div>
              
              <span className="text-[10px] text-purple-900 font-bold bg-purple-100 px-2 py-0.5 rounded-full">
                Northern Delicacies
              </span>
            </div>

            <h3 className="font-bold text-lg text-stone-900 font-serif-luxury">{product.name}</h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">{product.description}</p>

            <div className="mt-3 p-2.5 bg-purple-50/70 rounded-xl border border-purple-100 text-xs text-purple-950">
              <span className="font-bold flex items-center gap-1">
                <span>Available in Certified Kilogram Weights:</span>
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {product.kgOptions?.map((kg) => (
                  <span key={kg.weight} className="bg-white px-2 py-0.5 rounded-md border border-purple-200 text-[11px] font-mono-code font-medium text-purple-900">
                    {kg.weight} ({formatNaira(kg.price)})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            {isSoldOut ? (
              <a
                href="https://wa.me/2349064839054?text=Hello%20Dr.%20Joie,%20please%20notify%20me%20when%20fresh%20Kilishi%20batch%20is%20ready!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Finished for Today &bull; Pre-Book on WhatsApp</span>
              </a>
            ) : (
              <button
                onClick={onSelectKilishiKg}
                className="w-full bg-[#6C34A3] hover:bg-[#5C2B8D] text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <span>⚖️ Choose Kilograms &amp; Spice Blend</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Current active size for cakes, yoghurts, pastries, donkwa, yaji
  const currentSizeObj = product.sizes ? product.sizes[selectedSizeIndex] : null;
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.basePrice;

  const handleAdd = () => {
    if (isSoldOut) return;

    onAddToCart({
      id: `${product.id}-${currentSizeObj ? currentSizeObj.size : 'default'}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      selectedSize: currentSizeObj ? currentSizeObj.size : null,
      customInscription: customInscription.trim() || null,
      selectedFrosting,
      price: currentPrice,
      quantity: 1,
      itemTotal: currentPrice,
      image: product.image
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col group ${
      isSoldOut ? 'border-stone-200 opacity-80' : 'border-purple-100 shadow-sm hover:shadow-xl'
    }`}>
      {/* Image header */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-purple-50">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale-30' : 'group-hover:scale-105'}`}
        />

        {/* Sold out banner */}
        {isSoldOut ? (
          <div className="absolute inset-0 bg-[#25083B]/70 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center">
            <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Ordered Finish (Sold Out)
            </span>
            <p className="text-[11px] text-purple-100 mt-1 max-w-xs">
              This item is finished for today. You can pre-order for tomorrow or select another treat!
            </p>
          </div>
        ) : (
          <>
            {product.badge && (
              <div className="absolute top-3 left-3 bg-[#381657]/90 backdrop-blur-xs text-purple-200 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-bold font-mono-code">
              {formatNaira(currentPrice)}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount} reviews)</span>
            </div>

            {isSoldOut && (
              <span className="text-rose-700 font-bold text-[10px] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Unavailable Today
              </span>
            )}
          </div>

          <h3 className="font-bold text-lg text-stone-900 font-serif-luxury">{product.name}</h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2">{product.description}</p>

          {/* Size / Portion Selector */}
          {product.sizes && (
            <div className="mt-3">
              <label className="text-[11px] uppercase tracking-wider font-bold text-purple-950 block mb-1.5">
                Select Portion / Packaging:
              </label>
              <div className="space-y-1.5">
                {product.sizes.map((sz, idx) => (
                  <div
                    key={sz.size}
                    onClick={() => !isSoldOut && setSelectedSizeIndex(idx)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                      isSoldOut
                        ? 'bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed'
                        : selectedSizeIndex === idx
                        ? 'bg-purple-50 border-purple-500 text-purple-950 font-semibold shadow-2xs cursor-pointer'
                        : 'bg-purple-50/30 border-purple-100 text-stone-700 hover:bg-purple-50 cursor-pointer'
                    }`}
                  >
                    <div>
                      <span>{sz.size}</span>
                      {sz.serves && <span className="text-[10px] text-stone-500 ml-1.5">({sz.serves})</span>}
                    </div>
                    <span className="font-mono-code font-bold text-purple-900">
                      {formatNaira(sz.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Cake Inscription option */}
          {product.category === 'cakes' && !isSoldOut && (
            <div className="mt-3">
              <label className="text-[11px] uppercase tracking-wider font-bold text-purple-950 flex items-center justify-between mb-1">
                <span>Free Cake Inscription:</span>
                <span className="text-[10px] text-stone-400">e.g. "Happy Birthday"</span>
              </label>
              <input
                type="text"
                value={customInscription}
                onChange={(e) => setCustomInscription(e.target.value)}
                placeholder="Write custom message on cake..."
                className="w-full text-xs p-2 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-hidden bg-purple-50/30"
                maxLength={45}
              />
            </div>
          )}
        </div>

        {/* Add to basket CTA */}
        <div className="pt-2">
          {isSoldOut ? (
            <a
              href={`https://wa.me/2349064839054?text=Hello%20Dr.%20Joie,%20I%20noticed%20${encodeURIComponent(product.name)}%20is%20finished%20today.%20Can%20I%20pre-order%20for%20tomorrow?`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-stone-300 transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-stone-500" />
              <span>Ordered Finish &bull; Pre-Book on WhatsApp</span>
            </a>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full bg-[#3B155B] hover:bg-[#2D0F47] text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-purple-200" />
              <span>Add to Basket &bull; {formatNaira(currentPrice)}</span>
            </button>
          )}

          {addedNotice && (
            <div className="mt-2 p-1.5 bg-purple-50 border border-purple-300 text-purple-900 text-[11px] rounded-lg text-center flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-purple-600" />
              <span>Added to basket!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
