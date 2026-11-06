import React, { useState } from 'react';
import { X, CreditCard, Building2, PhoneCall, ShieldCheck, Lock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatNaira, generateOrderRef } from '../utils/formatters';
import { ONDO_LOCATIONS, DELIVERY_TIME_SLOTS, TRUSTED_BIKEMEN } from '../data/menuData';

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalAmount,
  urgency,
  selectedDate,
  selectedSlotId,
  selectedLocationId,
  deliveryAddress,
  customerNotes,
  onOrderSuccess
}) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('5399 4100 8821 9043');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('412');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedLoc = ONDO_LOCATIONS.find((l) => l.id === selectedLocationId) || ONDO_LOCATIONS[0];
  const selectedSlot = DELIVERY_TIME_SLOTS.find((s) => s.id === selectedSlotId) || DELIVERY_TIME_SLOTS[0];

  const handlePay = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your full name and valid phone number for the rider to reach you.');
      return;
    }

    if (!deliveryAddress.trim() && selectedLoc.id !== 'ondo-pickup') {
      setErrorMsg('Please enter your delivery address or landmark in Ondo.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    // Simulate Paystack transaction processing
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }

      // Pick suitable bikeman based on destination
      let assignedRider = TRUSTED_BIKEMEN[0]; // Rider Kola
      if (selectedLoc.id === 'ondo-unimed' || selectedLoc.id === 'ondo-adeyemi') {
        assignedRider = TRUSTED_BIKEMEN[1]; // Rider Tayo
      } else if (selectedLoc.id === 'akure-express') {
        assignedRider = TRUSTED_BIKEMEN[2]; // Rider Emmanuel
      }

      const newOrder = {
        orderRef: generateOrderRef(),
        createdAt: new Date().toISOString(),
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          address: deliveryAddress || 'Ondo Hub Self Pickup'
        },
        items: [...items],
        total: totalAmount,
        deliveryOption: selectedLoc,
        urgency,
        scheduledDate: selectedDate,
        timeSlot: selectedSlot,
        customerNotes,
        paystackRef: `PSTK-${Math.floor(100000 + Math.random() * 900000)}`,
        assignedRider,
        status: 'Confirmed & In Kitchen Queue',
        etaMinutes: selectedLoc.etaMinutes || 25
      };

      onOrderSuccess(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-scale-up">
        
        {/* Authentic Paystack Header Branding */}
        <div className="bg-[#0BA4DB] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
              💳
            </div>
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-cyan-100 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secured by Paystack</span>
              </div>
              <h4 className="font-bold text-base leading-tight">Joie Cakes &amp; More (Ondo Hub)</h4>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-stone-500 font-semibold">Total to Pay</div>
            <div className="text-xl font-bold font-mono-code text-stone-900">{formatNaira(totalAmount)}</div>
          </div>
          <div className="text-right text-[11px]">
            <span className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
              {urgency === 'urgent' ? '⚡ Rush Dispatch' : '🕒 ' + selectedSlot.label.split('(')[0]}
            </span>
            <div className="text-stone-500 mt-0.5">{selectedLoc.name.split('(')[0]}</div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Customer contact fields */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                Your Full Name:
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Dr. Kehinde Adebayo / Funke Williams"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-cyan-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Phone (WhatsApp / Call):
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0803 000 0000"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-cyan-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Email (Receipt Copy):
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-cyan-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1.5">
              Select Paystack Channel:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'bg-cyan-50 border-[#0BA4DB] text-[#0BA4DB] font-bold ring-1 ring-[#0BA4DB]'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-2.5 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'transfer'
                    ? 'bg-cyan-50 border-[#0BA4DB] text-[#0BA4DB] font-bold ring-1 ring-[#0BA4DB]'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ussd')}
                className={`p-2.5 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                  paymentMethod === 'ussd'
                    ? 'bg-cyan-50 border-[#0BA4DB] text-[#0BA4DB] font-bold ring-1 ring-[#0BA4DB]'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>USSD Code</span>
              </button>
            </div>
          </div>

          {/* Payment method details */}
          {paymentMethod === 'card' && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-stone-500 font-semibold block">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono-code"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-stone-500 font-semibold block">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono-code"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 font-semibold block">CVV</label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono-code"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'transfer' && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="font-semibold text-stone-800">Transfer to Joie Cakes &amp; More Dedicated Account:</div>
              <div className="p-2 bg-white rounded-lg border border-cyan-200 font-mono-code text-cyan-950">
                <div className="text-[11px] text-stone-500">Bank: <strong>Wema Bank / ALAT (Paystack Gateway)</strong></div>
                <div className="text-sm font-bold mt-0.5">Account: 9948 2018 44</div>
                <div className="text-[11px] text-stone-500">Name: <strong>JOIE CAKES ENTERPRISE</strong></div>
              </div>
              <p className="text-[10px] text-stone-500">Auto-detected in ~15 seconds after transfer.</p>
            </div>
          )}

          {paymentMethod === 'ussd' && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1 text-center font-mono-code">
              <div className="text-stone-700 font-sans text-xs">Dial on your registered SIM:</div>
              <div className="text-base font-bold text-[#0BA4DB]">*737*50*13000*8924#</div>
              <div className="text-[10px] text-stone-500 font-sans">GTBank, Zenith, UBA &amp; FirstBank supported</div>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#0BA4DB] hover:bg-[#098cb9] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Paystack Secure Payment...</span>
              </span>
            ) : (
              <span>Authorize Payment &bull; {formatNaira(totalAmount)}</span>
            )}
          </button>

          <p className="text-[10px] text-stone-400 text-center">
            🔒 256-bit SSL encrypted. Payment logs order and syncs with Dr. Joie's Ondo kitchen queue.
          </p>
        </form>

      </div>
    </div>
  );
}
