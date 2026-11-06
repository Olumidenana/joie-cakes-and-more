import React from 'react';
import { Heart, Stethoscope, Sparkles, MessageCircle, Clock } from 'lucide-react';

export function DoctorShiftBanner({ doctorShift, onOpenConcierge }) {
  return (
    <div className="bg-gradient-to-r from-[#3B175B] via-[#4F217A] to-[#3B175B] text-white border-b border-purple-900/40 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left message */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <span className="w-7 h-7 rounded-full bg-purple-400/20 border border-purple-300/30 flex items-center justify-center shrink-0">
            <Stethoscope className="w-3.5 h-3.5 text-purple-200" />
          </span>
          <div>
            <span className="font-semibold text-purple-100">
              {doctorShift === 'hospital' ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  Dr. Joie is on hospital rounds today —
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-300 mr-1.5" />
                  Dr. Joie is in the Ondo kitchen studio today —
                </>
              )}
            </span>
            <span className="text-purple-200/90 ml-1">
              {doctorShift === 'hospital'
                ? "No need to wait for a WhatsApp DM reply to secure your order! Pick your items, choose a delivery window, and our Ondo riders handle the rest."
                : "Baking fresh cakes and sun-curing Northern Delicacies Kilishi batches right now."}
            </span>
          </div>
        </div>

        {/* Right prompt */}
        <button
          onClick={onOpenConcierge}
          className="shrink-0 flex items-center gap-1.5 bg-purple-500/20 hover:bg-purple-500/35 text-purple-100 border border-purple-300/30 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-purple-300" />
          <span>Have a question? Ask me here</span>
        </button>

      </div>
    </div>
  );
}
