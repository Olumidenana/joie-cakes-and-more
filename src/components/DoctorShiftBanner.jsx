import React from 'react';
import { Stethoscope, Clock, ShieldCheck, Sparkles, MessageSquareHeart } from 'lucide-react';

export function DoctorShiftBanner({ doctorShift, onOpenConcierge }) {
  return (
    <section className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Left indicator */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <Stethoscope className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-amber-200 text-sm tracking-wide flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {doctorShift === 'hospital' 
                    ? 'Dr. Joie is on Medical Hospital Rounds / Surgery Service' 
                    : 'Dr. Joie is Overseeing Kitchen Production in Ondo Hub'}
                </span>
                <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono-code">
                  Zero Delay Auto-Pilot
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                {doctorShift === 'hospital' ? (
                  <>
                    No need to wait for a WhatsApp DM reply while Dr. Joie attends to hospital patients. 
                    This system <strong>automatically reserves kitchen prep slots, coordinates trusted Ondo bikemen</strong>, and secures your treats!
                  </>
                ) : (
                  <>
                    Dr. Joie is actively on ground at the Ondo Confectionery studio coordinating kitchen production and kilishi curing batches today.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right quick help & Concierge trigger */}
          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <button
              onClick={onOpenConcierge}
              className="w-full md:w-auto flex items-center justify-center gap-1.5 bg-amber-600/30 hover:bg-amber-600/45 text-amber-100 border border-amber-500/50 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <MessageSquareHeart className="w-4 h-4 text-amber-300" />
              <span>Ask Dr. Joie’s Virtual Concierge</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
