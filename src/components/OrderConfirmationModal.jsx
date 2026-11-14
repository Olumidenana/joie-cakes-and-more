import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Bike, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Scale, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { formatNaira, buildWhatsAppMessage } from '../utils/formatters';

export function OrderConfirmationModal({
  order,
  onClose,
  onOpenTracker
}) {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  // Official WhatsApp dispatch line for Dr. Joie (09064839054)
  const drJoieWhatsAppNumber = '2349064839054'; 
  const whatsappUrl = `https://wa.me/${drJoieWhatsAppNumber}?text=${buildWhatsAppMessage(order)}`;

  const handleCopyInvoice = () => {
    const rawText = decodeURIComponent(buildWhatsAppMessage(order));
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-purple-200 animate-scale-up">
        
        {/* Top Celebration Banner in Elegant Purple & Emerald */}
        <div className="bg-gradient-to-r from-[#2F0F4C] via-[#481A75] to-[#2F0F4C] text-white p-6 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-400/40 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-300" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-code font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Paystack Payment Confirmed</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury mt-1">
            Order Successfully Placed!
          </h3>
          <p className="text-xs text-purple-200/90 max-w-md mx-auto mt-1 leading-relaxed">
            Your payment is verified. Next step: send this receipt to Dr. Joie on WhatsApp so the kitchen can dispatch your treats.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          
          {/* Key Reference & Dispatch Strip */}
          <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Order Reference</div>
              <div className="text-base font-bold font-mono-code text-purple-950">{order.orderRef}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Total Paid (Paystack)</div>
              <div className="text-base font-bold font-mono-code text-emerald-700">{formatNaira(order.total)}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Delivery Window</div>
              <div className="text-xs font-semibold text-stone-800">
                {order.scheduledDate || 'Today'} &bull; {order.timeSlot?.label?.split('(')[0] || 'Scheduled'}
              </div>
            </div>
          </div>

          {/* CRITICAL ACTION: Send Receipt to Dr. Joie on WhatsApp */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-emerald-50/60 to-purple-50/40 border-2 border-emerald-300 rounded-3xl space-y-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <MessageCircle className="w-5 h-5 fill-current" />
              </span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span>Send Receipt to Dr. Joie on WhatsApp</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full uppercase">
                    Important
                  </span>
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Click the green button below to deliver your formatted receipt directly to Dr. Joie at <strong>09064839054</strong>. She receives your full order slip instantly between hospital consults!
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Receipt to Dr. Joie on WhatsApp (09064839054)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Google Sheets Logging Pill */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500 border-t border-emerald-200/60">
              <span className="flex items-center gap-1 text-purple-900 font-medium">
                <FileSpreadsheet className="w-3.5 h-3.5 text-purple-700" />
                <span>Auto-Logged into Dr. Joie's Orders Spreadsheet</span>
              </span>
              <span className="text-emerald-700 font-bold">✓ Recorded</span>
            </div>
          </div>

          {/* Assigned Trusted Bikeman Card */}
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={order.assignedRider?.avatar}
                alt={order.assignedRider?.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="text-[10px] font-mono-code font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>Assigned Ondo Dispatch Rider</span>
                </div>
                <div className="font-bold text-sm text-stone-900">{order.assignedRider?.name}</div>
                <div className="text-xs text-stone-600">
                  {order.assignedRider?.phone} &bull; {order.assignedRider?.bikeModel}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono-code font-bold text-purple-950 bg-purple-100 px-2.5 py-1 rounded-lg">
                ~{order.assignedRider?.etaMinutes || 25} Mins ETA
              </span>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-950 mb-2">
              Items Ordered:
            </div>
            <div className="divide-y divide-purple-50 bg-purple-50/30 rounded-2xl p-3 border border-purple-100 text-xs space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-stone-900">{it.name}</span>
                    <span className="text-stone-500 ml-1">x{it.quantity}</span>
                    {it.selectedWeight && (
                      <div className="text-[11px] text-purple-900 font-mono-code font-semibold">
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

          {/* Destination */}
          <div className="text-xs text-stone-600 space-y-1 bg-purple-50/30 p-3 rounded-xl border border-purple-100">
            <div>
              <strong className="text-stone-900">Destination:</strong> {order.customer?.address} ({order.deliveryOption?.name})
            </div>
            <div>
              <strong className="text-stone-900">Recipient Phone:</strong> {order.customer?.phone}
            </div>
          </div>

          {/* Secondary Actions: Track Live Rider or Copy Invoice */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="py-3 px-3 rounded-xl border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Bike className="w-4 h-4 text-purple-700" />
              <span>Track Bikeman Live</span>
            </button>

            <button
              onClick={handleCopyInvoice}
              className="py-3 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Receipt!' : 'Copy Receipt'}</span>
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 text-xs font-medium underline cursor-pointer"
            >
              Close &amp; Return to Menu
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
