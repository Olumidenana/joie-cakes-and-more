import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Bike, Copy, Check, Clock, MapPin, Scale, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { formatNaira, buildWhatsAppMessage } from '../utils/formatters';

export function OrderConfirmationModal({
  order,
  onClose,
  onOpenTracker
}) {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  // Official WhatsApp dispatch line for Dr. Joie (from authentic Northern Delicacies label: 09064839054)
  const drJoieWhatsAppNumber = '2349064839054'; 
  const whatsappUrl = `https://wa.me/${drJoieWhatsAppNumber}?text=${buildWhatsAppMessage(order)}`;

  const handleCopyInvoice = () => {
    const rawText = decodeURIComponent(buildWhatsAppMessage(order));
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-scale-up">
        
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-200" />
          </div>

          <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest bg-emerald-950/40 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30">
            Paystack Payment Confirmed
          </span>

          <h3 className="text-2xl font-bold font-serif-luxury mt-2">
            Order Successfully Logged!
          </h3>
          <p className="text-xs text-emerald-100 max-w-md mx-auto mt-1">
            Dr. Joie's kitchen prep queue is updated. Your treats and kilishi are being prepared to perfection.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Key Reference & Dispatch Strip */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Order Reference</div>
              <div className="text-base font-bold font-mono-code text-stone-900">{order.orderRef}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Total Paid</div>
              <div className="text-base font-bold font-mono-code text-emerald-700">{formatNaira(order.total)}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Target Delivery</div>
              <div className="text-xs font-semibold text-stone-800">
                {order.scheduledDate || 'Today'} • {order.timeSlot?.label?.split('(')[0] || 'Scheduled'}
              </div>
            </div>
          </div>

          {/* Assigned Trusted Bikeman Card */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={order.assignedRider?.avatar}
                alt={order.assignedRider?.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="text-[10px] font-mono-code font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>Assigned Ondo Dispatch Rider</span>
                </div>
                <div className="font-bold text-sm text-stone-900">{order.assignedRider?.name}</div>
                <div className="text-xs text-stone-600">
                  {order.assignedRider?.phone} • {order.assignedRider?.bikeModel}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono-code font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-lg">
                ~{order.assignedRider?.etaMinutes || 25} Mins ETA
              </span>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Items Logged:
            </div>
            <div className="divide-y divide-stone-100 bg-stone-50 rounded-2xl p-3 border border-stone-200 text-xs space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-stone-900">{it.name}</span>
                    <span className="text-stone-500 ml-1">x{it.quantity}</span>
                    {it.selectedWeight && (
                      <div className="text-[11px] text-amber-800 font-mono-code">
                        ⚖️ {it.selectedWeight} ({it.selectedSpice || 'Yaji'})
                      </div>
                    )}
                    {it.customInscription && (
                      <div className="text-[10px] text-stone-500 italic">
                        Inscription: "{it.customInscription}"
                      </div>
                    )}
                  </div>
                  <span className="font-mono-code font-semibold text-stone-800">
                    {formatNaira(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination & Doctor Note */}
          <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
              <strong className="text-stone-900">Destination:</strong> {order.customer?.address} ({order.deliveryOption?.name})
            </div>
            <div>
              <strong className="text-stone-900">Recipient Phone:</strong> {order.customer?.phone}
            </div>
          </div>

          {/* WhatsApp Direct Push Callout (Crucial feature) */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-emerald-950">
              <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Sync to Dr. Joie's WhatsApp:</span> Click below to send this complete invoice directly to Dr. Joie's WhatsApp line so she has a real-time record on her phone between hospital consults.
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Receipt to Dr. Joie on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Secondary Actions: Track Live Rider or Copy Invoice */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="py-3 px-3 rounded-xl border border-amber-600 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bike className="w-4 h-4 text-amber-700" />
              <span>Track Bikeman Live</span>
            </button>

            <button
              onClick={handleCopyInvoice}
              className="py-3 px-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Invoice!' : 'Copy Invoice'}</span>
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-stone-500 hover:text-stone-800 text-xs font-medium underline cursor-pointer"
            >
              Close &amp; Return to Menu
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
