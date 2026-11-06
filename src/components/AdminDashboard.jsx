import React from 'react';
import { 
  X, 
  Stethoscope, 
  Sliders, 
  Bike, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  RefreshCw,
  PackageCheck,
  Ban,
  Check
} from 'lucide-react';
import { formatNaira } from '../utils/formatters';
import { DELIVERY_TIME_SLOTS, TRUSTED_BIKEMEN } from '../data/menuData';

export function AdminDashboard({
  isOpen,
  onClose,
  doctorShift,
  setDoctorShift,
  slotCapacities,
  setSlotCapacities,
  orders,
  onUpdateOrderStatus,
  onReassignRider,
  products,
  onToggleProductStock
}) {
  if (!isOpen) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered').length;

  const handleCapacityChange = (slotId, delta) => {
    setSlotCapacities((prev) => {
      const current = prev[slotId] || { current: 3, max: 6 };
      const newMax = Math.max(current.current, current.max + delta);
      return {
        ...prev,
        [slotId]: {
          ...current,
          max: newMax
        }
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-scale-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-5 flex items-center justify-between border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-700/80 border border-amber-500/50 flex items-center justify-center text-white">
              <Stethoscope className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-serif-luxury text-amber-200">Dr. Joie's Command Portal</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono-code">
                  Ondo Hub Admin
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Manage your hospital shifts, item stock (Ordered Finish), kitchen slot limits &amp; trusted bikemen.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Shift Mode Toggle Bar */}
        <div className="bg-amber-50 border-b border-amber-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Current Doctor Status (Live on Customer Site):
            </div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {doctorShift === 'hospital' 
                ? '🩺 On Hospital Rounds / Surgery Service (Auto-Booking Active)' 
                : '🍰 In Ondo Confectionery Studio / Kitchen Duty'}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-amber-300 shadow-2xs">
            <button
              onClick={() => setDoctorShift('hospital')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                doctorShift === 'hospital'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🩺 Hospital Service Mode
            </button>
            <button
              onClick={() => setDoctorShift('kitchen')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                doctorShift === 'kitchen'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🍰 In Kitchen Mode
            </button>
          </div>
        </div>

        {/* Admin Content Area */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-500 font-semibold">Today's Revenue (Paystack)</div>
              <div className="text-2xl font-bold font-mono-code text-stone-900 mt-1">
                {formatNaira(totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% verified auto-credits</span>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-500 font-semibold">Active Orders in Queue</div>
              <div className="text-2xl font-bold font-mono-code text-amber-900 mt-1">
                {activeOrdersCount}
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                Across Ondo Town &amp; UNIMED
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-500 font-semibold">Bikemen on Ondo Roads</div>
              <div className="text-2xl font-bold font-mono-code text-stone-900 mt-1">
                3 Trusted Bikes
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <Bike className="w-3.5 h-3.5" />
                <span>Kola, Tayo &amp; Emmanuel</span>
              </div>
            </div>
          </div>

          {/* ITEM AVAILABILITY & "ORDERED FINISH" CONTROL */}
          <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2">
              <div>
                <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-amber-800" />
                  <span>Item Availability &amp; "Ordered Finish / Sold Out" Toggle</span>
                </h4>
                <p className="text-[11px] text-stone-500">
                  When a batch of Kilishi, Donkwa, or Vanilla cake is completely booked out, toggle it here so customers cannot order what is unavailable.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {products.map((prod) => {
                const isSoldOut = prod.isAvailable === false || prod.stockStatus === 'sold_out';
                return (
                  <div
                    key={prod.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs transition-colors ${
                      isSoldOut ? 'bg-rose-50/60 border-rose-200' : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-stone-900 truncate">{prod.name.replace('Northern Delicacies: ', '')}</div>
                      <div className="text-[10px] mt-0.5">
                        {isSoldOut ? (
                          <span className="text-rose-700 font-bold bg-rose-100 px-1.5 py-0.2 rounded">
                            🚫 Ordered Finish
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium bg-emerald-100 px-1.5 py-0.2 rounded">
                            ✓ In Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleProductStock(prod.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer transition-colors ${
                        isSoldOut
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                      }`}
                    >
                      {isSoldOut ? 'Restock' : 'Mark Finish'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slot Capacity Tuner (Prevent Kitchen Overwhelm) */}
          <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/70">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-700" />
                  <span>Kitchen Prep Capacity Quota Tuner</span>
                </h4>
                <p className="text-[11px] text-stone-500">
                  Adjust maximum allowable orders per window so your kitchen staff never get overwhelmed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DELIVERY_TIME_SLOTS.map((slot) => {
                const cap = slotCapacities[slot.id] || { current: slot.currentOrders, max: slot.maxCapacity };
                const isFull = cap.current >= cap.max;

                return (
                  <div key={slot.id} className="p-3 bg-white rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-stone-800">{slot.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Current: <strong className="font-mono-code text-stone-900">{cap.current}</strong> / Max: <strong className="font-mono-code text-stone-900">{cap.max}</strong>
                        {isFull && <span className="ml-1.5 text-rose-600 font-bold">[FULL]</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCapacityChange(slot.id, -1)}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center cursor-pointer"
                        title="Reduce Slot Limit"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleCapacityChange(slot.id, 1)}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center cursor-pointer"
                        title="Increase Slot Limit"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Log Table */}
          <div>
            <h4 className="font-bold text-sm text-stone-900 mb-2 flex items-center justify-between">
              <span>Logged Orders &amp; Dispatch Status:</span>
              <span className="text-xs text-stone-500 font-normal">{orders.length} total recorded</span>
            </h4>

            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white text-xs divide-y divide-stone-200">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-stone-400">
                  No orders placed yet. Orders will appear here as soon as customers checkout!
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.orderRef} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code font-bold text-stone-900">{ord.orderRef}</span>
                        <span className="text-[10px] font-mono-code bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
                          {ord.paystackRef}
                        </span>
                        <span className="text-[10px] font-bold text-stone-500">
                          {ord.scheduledDate || 'Today'} • {ord.timeSlot?.label?.split('(')[0]}
                        </span>
                      </div>

                      <div className="font-medium text-stone-800 mt-1">
                        {ord.customer?.name} ({ord.customer?.phone}) • {ord.customer?.address}
                      </div>

                      <div className="text-[11px] text-stone-600 mt-0.5">
                        {ord.items.map((i) => `${i.name} x${i.quantity} ${i.selectedWeight ? `(${i.selectedWeight})` : ''}`).join(', ')}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <div className="font-bold font-mono-code text-stone-900 text-sm">
                        {formatNaira(ord.total)}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Rider assignment */}
                        <select
                          value={ord.assignedRider?.id || 'bike-01'}
                          onChange={(e) => {
                            const newRider = TRUSTED_BIKEMEN.find((r) => r.id === e.target.value);
                            if (newRider) onReassignRider(ord.orderRef, newRider);
                          }}
                          className="text-[11px] p-1.5 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                        >
                          {TRUSTED_BIKEMEN.map((r) => (
                            <option key={r.id} value={r.id}>
                              🛵 {r.name.split('(')[0]}
                            </option>
                          ))}
                        </select>

                        {/* Status change */}
                        <button
                          onClick={() => {
                            const nextStatus = ord.status === 'Delivered' ? 'In Kitchen Queue' : 'Delivered';
                            onUpdateOrderStatus(ord.orderRef, nextStatus);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 hover:bg-emerald-100 text-amber-900 hover:text-emerald-900'
                          }`}
                        >
                          {ord.status === 'Delivered' ? '✓ Delivered' : 'Mark Delivered'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
