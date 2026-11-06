import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Stethoscope, Sparkles, Scale, Bike, ShieldCheck, Clock, Bot } from 'lucide-react';
import { CONCIERGE_KNOWLEDGE } from '../data/menuData';

export function DrJoieConcierge({ isOpen, onClose, doctorShift }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Dr. Joie's Virtual Concierge 🩺. Dr. Joie is on hospital medical duty today, so I am here to help you order seamlessly! Ask me about our Kilishi (strictly measured in kg), cake turnaround times, today's delivery slots in Ondo, or Paystack payments.",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "Is Dr. Joie in clinic today?",
    "How much is 1kg of Kilishi?",
    "Can I get urgent same-day delivery?",
    "Do you deliver to UNIMED campus?",
    "How does the trusted bikeman work?"
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Smart answer matching from knowledge base
    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();

      let answer = null;
      for (const item of CONCIERGE_KNOWLEDGE) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          answer = item.answer;
          break;
        }
      }

      if (!answer) {
        answer = "I'd be delighted to assist! Dr. Joie's system is fully automated: you can pick your exact kilogram of kilishi (0.25kg to 5kg), select an available delivery slot in Ondo, and complete payment via Paystack. Your receipt will also link directly to Dr. Joie's WhatsApp so she sees the full order log!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end p-2 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-3xl h-full sm:h-[620px] my-auto flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-slide-left">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-4 flex items-center justify-between border-b border-amber-900/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-amber-700/80 border border-amber-500 flex items-center justify-center text-white">
                <Stethoscope className="w-5 h-5 text-amber-200" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-amber-200 font-serif-luxury">Dr. Joie's Virtual Concierge</h4>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono-code">24/7 AI</span>
              </div>
              <p className="text-[11px] text-stone-300">
                Automated Assistant for Hospital Service Hours
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

        {/* Doctor Status Banner in chat */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Doctor Status: <strong>{doctorShift === 'hospital' ? 'Hospital Duty / In Theatre' : 'In Ondo Kitchen'}</strong></span>
          </div>
          <span className="text-stone-500">Auto-Booking Active</span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/60 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-800 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-stone-200 w-20 shadow-xs">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 px-3 py-1 rounded-full whitespace-nowrap border border-stone-200 transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about orders, Kilishi kg, or Ondo delivery..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:outline-hidden bg-stone-50"
          />
          <button
            type="submit"
            className="p-2.5 bg-amber-800 hover:bg-amber-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
