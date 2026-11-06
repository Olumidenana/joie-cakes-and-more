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
  const capInfo = selectedSlot ? (slotCapacities[selectedSlot.id] || { current: selectedSlot.currentOrders, max: slotCapacities.maxCapacity }) : null;
  const isSlotFull = capInfo ? capInfo.current >= capInfo.max : false;

  const itemsSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedLoc ? selectedLoc.fee : 0;
  const grandTotal = itemsSubtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-900/40 flex items-center justify-between bg-[#2F0F4C] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-700/80 border border-purple-500/40 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4 text-purple-200" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif-luxury text-purple-100">Your Treat Basket</h3>
              <p className="text-[11px] text-purple-300/80">
                {items.length} item{items.length !== 1 ? 's' : ''} &bull; Joie Cakes &amp; More (Ondo)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-200 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule & Urgency preview banner */}
        <div className="bg-purple-50/80 border-b border-purple-100 px-4 py-2.5 text-xs text-purple-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-700" />
            <span className="font-semibold">
              {urgency === 'urgent' ? '⚡ Urgent Dispatch (60-90m)' : '🕒 ' + (selectedSlot?.label?.split('(')[0] || 'Scheduled Slot')}
            </span>
          </div>
          <span className="text-[11px] font-mono-code font-bold bg-purple-200/80 px-2 py-0.5 rounded text-purple-950">
            {selectedLoc.name.split('(')[0].trim()}
          </span>
        </div>

        {/* Slot Full Alert in Cart */}
        {isSlotFull && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Attention:</span> Your chosen delivery window is currently at full kitchen capacity. Please adjust the slot in the scheduler or choose Free Ondo Hub Pickup!
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-purple-50">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto text-purple-300 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 font-serif-luxury text-base">Your Basket is Empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our Northern Delicacies beef kilishi measured in kilograms, signature vanilla cakes, or creamy yoghurts.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#6C34A3] hover:bg-[#5C2B8D] text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
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
                  className="w-16 h-16 rounded-xl object-cover border border-purple-100 shrink-0"
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
                    <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold mt-0.5">
                      <Scale className="w-3 h-3 text-purple-700" />
                      <span>{item.selectedWeight} &bull; {item.selectedSpice || 'Yaji'}</span>
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
                    <div className="text-[10px] italic text-purple-900 bg-purple-50/80 p-1 rounded border border-purple-200 mt-1">
                      ✍️ "{item.customInscription}"
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-purple-200 rounded-lg overflow-hidden bg-purple-50/30">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs font-bold text-purple-900 hover:bg-purple-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono-code font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-purple-900 hover:bg-purple-100 cursor-pointer"
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
          <div className="p-4 sm:p-5 border-t border-purple-100 bg-purple-50/30 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-mono-code font-semibold text-stone-900">{formatNaira(itemsSubtotal)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-purple-700" />
                  <span>Ondo Dispatch ({selectedLoc.name.split('(')[0]}):</span>
                </span>
                <span className="font-mono-code font-semibold text-stone-900">
                  {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-purple-100">
                <span>Total Amount:</span>
                <span className="text-purple-950 font-mono-code text-base">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <button
              disabled={isSlotFull}
              onClick={onCheckout}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer ${
                isSlotFull
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#4E1E7B] to-[#732EA8] hover:from-[#43196B] hover:to-[#622690] text-white'
              }`}
            >
              <span>{isSlotFull ? 'Please Select an Open Slot' : 'Proceed to Paystack Checkout'}</span>
              <ArrowRight className="w-4 h-4 text-purple-200" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by Paystack &bull; Direct WhatsApp Order Sync</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
