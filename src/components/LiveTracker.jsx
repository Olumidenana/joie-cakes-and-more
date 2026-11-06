import React, { useState, useEffect } from 'react';
import { Bike, Phone, MessageCircle, MapPin, Clock, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';
import { formatNaira } from '../utils/formatters';
import { TRUSTED_BIKEMEN } from '../data/menuData';

export function LiveTracker({ orders, activeOrder, onClose }) {
  const displayOrder = activeOrder || (orders.length > 0 ? orders[0] : {
    orderRef: 'JC-OND-8821',
    createdAt: new Date().toISOString(),
    customer: {
      name: 'Dr. Kehinde Adebayo',
      phone: '0803 555 8921',
      address: 'Clinical Students Hostel, UNIMED Teaching Hospital Zone, Ondo'
    },
    items: [
      { name: 'Northern Delicacies: Kilishi (1.0 kg)', quantity: 1, selectedWeight: '1.0 kg', price: 13000 },
      { name: 'Classic Velvet Vanilla Dream Cake (8 inch)', quantity: 1, price: 18500 }
    ],
    total: 32100,
    deliveryOption: { name: 'UNIMED Campus & Teaching Hospital Zone', fee: 600, etaMinutes: 18 },
    urgency: 'urgent',
    scheduledDate: 'Today',
    timeSlot: { label: '⚡ Urgent Flash Dispatch (Next 60-90 Mins)' },
    paystackRef: 'PSTK-481902',
    assignedRider: TRUSTED_BIKEMEN[1],
    status: 'En Route with Trusted Bikeman',
    etaMinutes: 18
  });

  const rider = displayOrder.assignedRider || TRUSTED_BIKEMEN[0];
  const [etaRemaining, setEtaRemaining] = useState(displayOrder.etaMinutes || 22);
  const [progressStage, setProgressStage] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaRemaining((prev) => (prev <= 1 ? 1 : prev - 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { title: 'Order Logged & Kitchen Queue', desc: 'Auto-verified while Dr. Joie was on medical rounds', time: '12 mins ago' },
    { title: 'Kilishi Weighed & Cake Sealed', desc: 'Insulated thermal box packaged with freshness seal', time: '5 mins ago' },
    { title: 'Handed to Ondo Trusted Bikeman', desc: `${rider.name} is on transit along Ondo corridor`, time: 'Just now' },
    { title: 'Delivered to Destination', desc: 'Signed receipt & confirmation', time: `Est in ${etaRemaining} mins` }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-purple-100 shadow-xl max-w-4xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1.5">
            <Navigation className="w-3.5 h-3.5 text-purple-700 animate-spin" />
            <span>Ondo Live Bikeman Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-stone-900">
            Order &amp; Rider Movement Tracker
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Tracking Order <strong className="font-mono-code text-purple-950">{displayOrder.orderRef}</strong> &bull; Real-time transit updates
          </p>
        </div>

        {/* Live ETA Card */}
        <div className="bg-gradient-to-br from-[#3B155B] to-[#25083B] text-white p-4 rounded-2xl shadow-md border border-purple-700/50 text-right shrink-0">
          <div className="text-[10px] font-mono-code uppercase tracking-wider text-purple-300">
            Estimated Delivery Time
          </div>
          <div className="text-3xl font-extrabold font-mono-code text-purple-100 mt-0.5 flex items-baseline justify-end gap-1">
            <span>{etaRemaining}</span>
            <span className="text-sm font-sans font-normal text-purple-300">minutes</span>
          </div>
          <div className="text-[11px] text-purple-200 flex items-center justify-end gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Rider moving at optimal speed</span>
          </div>
        </div>
      </div>

      {/* Trusted Bikeman Profile Card */}
      <div className="bg-purple-50/40 rounded-2xl p-5 border border-purple-100 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Rider Photo & Info */}
        <div className="md:col-span-7 flex items-center gap-4">
          <div className="relative">
            <img
              src={rider.avatar}
              alt={rider.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base text-stone-900">{rider.name}</h4>
              <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                ★ {rider.rating} (840+ drops)
              </span>
            </div>

            <div className="text-xs text-stone-600 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span className="font-mono-code font-bold text-purple-900 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                {rider.plateNumber}
              </span>
              <span>&bull;</span>
              <span>{rider.bikeModel}</span>
            </div>

            <div className="text-[11px] text-stone-500 mt-1">
              Coverage: <strong>{rider.zone}</strong>
            </div>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap gap-2 justify-start md:justify-end">
          <a
            href={`tel:${rider.phone}`}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#3B155B] hover:bg-[#2D0F47] text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-300" />
            <span>Call Rider</span>
          </a>

          <a
            href={`https://wa.me/${rider.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(rider.name)},%20I%20am%20tracking%20my%20Joie%20Cakes%20order%20(${displayOrder.orderRef})`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Rider</span>
          </a>
        </div>
      </div>

      {/* Visual Simulated Route in Ondo */}
      <div className="relative bg-gradient-to-r from-purple-50 via-purple-50/50 to-purple-50 rounded-2xl p-4 sm:p-5 border border-purple-100 overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-purple-800" />
            <span>Ondo Route Corridor Transit</span>
          </span>
          <span className="text-purple-900 font-mono-code">Status: Stage {progressStage + 1} of 4</span>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative z-10">
          {stages.map((stg, idx) => {
            const isCompleted = idx <= progressStage;
            const isCurrent = idx === progressStage;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-300'
                    : isCompleted
                    ? 'bg-white/80 border-purple-100 text-stone-800'
                    : 'bg-purple-50/30 border-purple-100/60 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCompleted ? 'bg-[#6C34A3] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono-code text-stone-500">{stg.time}</span>
                </div>
                <div className={`font-bold mt-1 text-xs ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                  {stg.title}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                  {stg.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Line Indicator */}
        <div className="mt-4 pt-3 border-t border-purple-200/60 flex items-center justify-between text-[11px] text-stone-500">
          <div>📍 Hub: Ondo City Commercial Centre</div>
          <div className="text-purple-900 font-bold">➡️ En Route via Insulated Bike Carrier</div>
          <div>🏁 Destination: {displayOrder.customer?.address || 'UNIMED Zone'}</div>
        </div>
      </div>

    </div>
  );
}
