import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Scale, Bike, Clock, AlertCircle } from 'lucide-react';
import { formatNaira } from '../utils/formatters';
import { ONDO_LOCATIONS, DELIVERY_TIME_SLOTS } from '../data/menuData';

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  selectedLocationId,
  selectedSlotId,
  urgency,
  selectedDate,
  deliveryAddress,
  slotCapacities
}) {
  if (!isOpen) return null;

  const selectedLoc = ONDO_LOCATIONS.find((l) => l.id === selectedLocationId) || ONDO_LOCATIONS[0];
  const selectedSlot = DELIVERY_TIME_SLOTS.find((s) => s.id === selectedSlotId);
  const capInfo = selectedSlot ? (slotCapacities[selectedSlot.id] || { current: selectedSlot.currentOrders, max: selectedSlot.maxCapacity }) : null;
  const isSlotFull = capInfo ? capInfo.current >= capInfo.max : false;

  const itemsSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedLoc ? selectedLoc.fee : 0;
  const grandTotal = itemsSubtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif-luxury text-amber-200">Your Gourmet Basket</h3>
              <p className="text-[11px] text-stone-300">
                {items.length} unique item{items.length !== 1 ? 's' : ''} • Joie Cakes &amp; More
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule & Urgency preview banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-semibold">
              {urgency === 'urgent' ? '⚡ Urgent Dispatch' : '🕒 ' + (selectedSlot?.label?.split('(')[0] || 'Scheduled Slot')}
            </span>
          </div>
          <span className="text-[11px] font-mono-code font-bold bg-amber-200/70 px-2 py-0.5 rounded text-amber-900">
            {selectedLoc.name.split('(')[0].trim()}
          </span>
        </div>

        {/* Slot Full Alert in Cart if user hasn't switched */}
        {isSlotFull && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Attention:</span> Your chosen delivery slot is currently at full kitchen prep capacity. Please adjust the slot in the scheduler or choose Ondo Hub Pickup!
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-700 font-serif-luxury text-base">Your Basket is Empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our authentic beef kilishi measured in kilograms, signature vanilla cakes, or creamy yoghurts.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-amber-800 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h5 className="font-semibold text-xs text-stone-900 truncate">{item.name}</h5>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Kilishi kg badge */}
                  {item.selectedWeight && (
                    <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold mt-0.5">
                      <Scale className="w-3 h-3 text-amber-800" />
                      <span>{item.selectedWeight} • {item.selectedSpice || 'Yaji'}</span>
                    </div>
                  )}

                  {/* Cake size badge */}
                  {item.selectedSize && (
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      Size: <span className="font-medium text-stone-800">{item.selectedSize}</span>
                    </div>
                  )}

                  {/* Custom inscription */}
                  {item.customInscription && (
                    <div className="text-[10px] italic text-amber-900 bg-amber-50 p-1 rounded border border-amber-200/50 mt-1">
                      ✍️ "{item.customInscription}"
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs font-bold text-stone-700 hover:bg-stone-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono-code font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-stone-700 hover:bg-stone-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-bold text-xs font-mono-code text-stone-900">
                      {formatNaira(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/90 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-mono-code font-semibold text-stone-900">{formatNaira(itemsSubtotal)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ondo Dispatch ({selectedLoc.name.split('(')[0]}):</span>
                </span>
                <span className="font-mono-code font-semibold text-stone-900">
                  {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="text-amber-900 font-mono-code text-base">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <button
              disabled={isSlotFull}
              onClick={onCheckout}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                isSlotFull
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-white'
              }`}
            >
              <span>{isSlotFull ? 'Please Select an Open Slot' : 'Proceed to Paystack Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by Paystack • Direct WhatsApp Order Sync</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
