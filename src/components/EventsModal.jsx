import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, MessageCircle, Check, Award, PhoneCall } from 'lucide-react';

export function EventsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [eventType, setEventType] = useState('Birthday Celebration');
  const [guestCount, setGuestCount] = useState('50-100 guests');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('Ondo Town');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [packageRequirements, setPackageRequirements] = useState('');

  const handleSendEventWhatsApp = (e) => {
    e.preventDefault();
    const text = [
      `*✨ EVENT CATERING & DESSERT STATION INQUIRY ✨*`,
      `*Joie Cakes & More Conglomerate (Ondo)*`,
      `-----------------------------------------`,
      `👤 *Client Name:* ${clientName || 'Inquirer'}`,
      `📞 *Client Phone:* ${clientPhone}`,
      `🎉 *Event Type:* ${eventType}`,
      `👥 *Estimated Guests:* ${guestCount}`,
      `📅 *Proposed Date:* ${eventDate || 'To be determined'}`,
      `📍 *Event Location:* ${eventLocation}`,
      `🍰 *Services Needed:* Dessert Table, Tiered Cake, Kilishi Bar, Pastries & Setup`,
      `📝 *Notes/Requirements:* ${packageRequirements || 'None specified'}`,
      `-----------------------------------------`,
      `🩺 *Note for Dr. Joie:* Submitted via Joie Cakes Web Booking Engine.`
    ].join('\n');

    const url = `https://wa.me/2349064839054?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-scale-up">
        
        {/* Luxury Banner */}
        <div className="relative h-44 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 flex flex-col justify-end">
          <div className="inline-flex items-center gap-1.5 bg-amber-600/40 border border-amber-500/40 text-amber-200 px-3 py-1 rounded-full text-xs font-semibold w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Joie Conglomerate Event Styling &amp; Catering</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury">
            Luxury Dessert Tables &amp; Event Management
          </h3>
          <p className="text-xs text-amber-200/80">
            For Weddings, Milestones, Medical Association Dinners &amp; Corporate Receptions in Ondo &amp; Akure.
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendEventWhatsApp} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Your Full Name:
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Mrs. Funke Adeleke"
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Phone Number (WhatsApp):
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="0803 000 0000"
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Event Type:
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
              >
                <option>Wedding Reception</option>
                <option>Birthday Celebration</option>
                <option>Bridal / Baby Shower</option>
                <option>Medical Guild Luncheon</option>
                <option>Corporate Gala / Launch</option>
                <option>Other Custom Event</option>
              </select>
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Estimated Guests:
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
              >
                <option>20 - 50 guests</option>
                <option>50 - 100 guests</option>
                <option>100 - 250 guests</option>
                <option>300+ guests</option>
              </select>
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Event Location:
              </label>
              <select
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
              >
                <option>Ondo Town (Central / Lipakala)</option>
                <option>UNIMED Campus / Teaching Hospital</option>
                <option>Akure (Capital City)</option>
                <option>Other Town in Ondo State</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Event Details &amp; Specific Confectionery Needs:
            </label>
            <textarea
              rows={3}
              value={packageRequirements}
              onChange={(e) => setPackageRequirements(e.target.value)}
              placeholder="e.g. 3-tier Vanilla & Chocolate cake with gold leaf, 100 parfait shots, Kilishi cocktail platters, and 2 dessert table attendants..."
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Event Request to Dr. Joie on WhatsApp</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2">
              Dr. Joie or our lead event coordinator will review your inquiry and share a curated proposal.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
