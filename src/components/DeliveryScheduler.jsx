import React from 'react';
import { Clock, Zap, Calendar, MapPin, AlertTriangle, CheckCircle2, ShieldCheck, Bike, Sparkles } from 'lucide-react';
import { ONDO_LOCATIONS, DELIVERY_TIME_SLOTS } from '../data/menuData';
import { formatNaira } from '../utils/formatters';

export function DeliveryScheduler({
  urgency,
  setUrgency,
  selectedDate,
  setSelectedDate,
  selectedSlotId,
  setSelectedSlotId,
  selectedLocationId,
  setSelectedLocationId,
  deliveryAddress,
  setDeliveryAddress,
  customerNotes,
  setCustomerNotes,
  slotCapacities
}) {
  const selectedLocation = ONDO_LOCATIONS.find((l) => l.id === selectedLocationId) || ONDO_LOCATIONS[0];
  
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-md space-y-6">
      {/* Title */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
          <Clock className="w-4 h-4" />
          <span>Step 1: Urgency &amp; Schedule Logistics</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-luxury">
          When &amp; Where Do You Need It in Ondo?
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          To ensure Dr. Joie's kitchen doesn't get overwhelmed and each treat arrives fresh, delivery slots have strictly capped prep quotas.
        </p>
      </div>

      {/* 1. Urgency Selection */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          1. Choose Sense of Urgency:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Urgent Flash Dispatch */}
          <div
            onClick={() => setUrgency('urgent')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              urgency === 'urgent'
                ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-400'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <Zap className="w-4 h-4" />
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${urgency === 'urgent' ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900'}`}>
                Fastest
              </span>
            </div>
            <div className="font-bold text-sm mt-2 font-serif-luxury">⚡ Urgent Flash Dispatch</div>
            <div className={`text-xs mt-1 leading-snug ${urgency === 'urgent' ? 'text-amber-200' : 'text-stone-500'}`}>
              Dispatched in 60-90 mins via our ready bikemen (Kilishi, yoghurt, pastries &amp; stocked treats).
            </div>
          </div>

          {/* Standard Scheduled Slot */}
          <div
            onClick={() => setUrgency('scheduled')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              urgency === 'scheduled'
                ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-400'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <Clock className="w-4 h-4" />
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${urgency === 'scheduled' ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'}`}>
                Standard
              </span>
            </div>
            <div className="font-bold text-sm mt-2 font-serif-luxury">🕒 Scheduled Time Slot</div>
            <div className={`text-xs mt-1 leading-snug ${urgency === 'scheduled' ? 'text-amber-200' : 'text-stone-500'}`}>
              Pick your preferred delivery window today or tomorrow (Morning, Afternoon, Evening).
            </div>
          </div>

          {/* Advance Pre-Order */}
          <div
            onClick={() => setUrgency('preorder')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              urgency === 'preorder'
                ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-400'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <Calendar className="w-4 h-4" />
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${urgency === 'preorder' ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'}`}>
                Custom Cakes
              </span>
            </div>
            <div className="font-bold text-sm mt-2 font-serif-luxury">🎂 Advance Pre-Order</div>
            <div className={`text-xs mt-1 leading-snug ${urgency === 'preorder' ? 'text-amber-200' : 'text-stone-500'}`}>
              For custom tiered birthday/wedding cakes or bulk event hampers (2 to 30 days ahead).
            </div>
          </div>

        </div>
      </div>

      {/* 2. Date & Time Window Selector with Capacity Guard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Date picker */}
        <div className="md:col-span-5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
            Target Delivery Date:
          </label>
          <input
            type="date"
            min={todayStr}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50 font-mono-code font-semibold"
          />
          <p className="text-[11px] text-stone-500 mt-1">
            {selectedDate === todayStr ? '⚡ Same-Day delivery active' : '📅 Pre-booked order'}
          </p>
        </div>

        {/* Time slots with Capacity meter */}
        <div className="md:col-span-7">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
            Available Kitchen Prep Windows:
          </label>

          <div className="space-y-2">
            {DELIVERY_TIME_SLOTS.map((slot) => {
              // Read live capacity
              const capInfo = slotCapacities[slot.id] || { current: slot.currentOrders, max: slot.maxCapacity };
              const isFull = capInfo.current >= capInfo.max;
              const remaining = capInfo.max - capInfo.current;
              const isSelected = selectedSlotId === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    if (!isFull) {
                      setSelectedSlotId(slot.id);
                    }
                  }}
                  className={`p-3 rounded-2xl border transition-all ${
                    isFull
                      ? 'bg-rose-50/70 border-rose-200 text-stone-400 cursor-not-allowed opacity-80'
                      : isSelected
                      ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs ring-1 ring-amber-500 cursor-pointer'
                      : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200 text-stone-800 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-semibold flex items-center gap-1.5">
                      {isSelected && !isFull && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                      <span>{slot.label}</span>
                    </div>

                    {isFull ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>SLOT FULL</span>
                      </span>
                    ) : remaining <= 2 ? (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        🔥 Only {remaining} slot left!
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Available ({remaining} slots left)
                      </span>
                    )}
                  </div>

                  {/* Capacity progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isFull ? 'bg-rose-600' : remaining <= 2 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (capInfo.current / capInfo.max) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono-code">
                      {capInfo.current}/{capInfo.max} orders
                    </span>
                  </div>

                  {isFull && (
                    <div className="mt-1.5 text-[11px] text-rose-700 font-medium">
                      ⚠️ Dr. Joie's kitchen prep limit reached for this window. Please select another slot or choose Free Self-Pickup at Ondo Hub!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Delivery Zone in Ondo State */}
      <div className="border-t border-stone-200 pt-5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>3. Delivery Destination in Ondo State:</span>
          </span>
          <span className="text-[11px] text-stone-500">Insulated Bike Dispatch</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ONDO_LOCATIONS.map((loc) => {
            const isSelected = selectedLocationId === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-900 shadow-sm ring-2 ring-amber-400'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                }`}
              >
                <div className="font-semibold text-xs leading-snug">{loc.name}</div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-current/10 text-[11px]">
                  <span className="font-mono-code font-bold">
                    {loc.fee === 0 ? 'FREE' : formatNaira(loc.fee)}
                  </span>
                  <span className="opacity-80 flex items-center gap-1">
                    <Bike className="w-3 h-3" />
                    <span>~{loc.etaMinutes} mins ETA</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Exact Street Address & Landmark */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
          Exact Street Address / Landmark / Hostel / Office in Ondo:
        </label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="e.g., Room 14, Clinical Students Hostel, UNIMED Teaching Hospital / No. 12 Lipakala Rd..."
          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
        />
      </div>

      {/* 5. Special Notes for Dr. Joie's Kitchen */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
          Special Preparation / Rider Drop-Off Notes (Optional):
        </label>
        <input
          type="text"
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          placeholder="e.g. Call my number when rider reaches gate; please keep Kilishi extra crispy..."
          className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
        />
      </div>

    </div>
  );
}
