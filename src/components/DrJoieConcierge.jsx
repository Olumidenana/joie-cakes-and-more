import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Stethoscope, Sparkles } from 'lucide-react';
import { CONCIERGE_KNOWLEDGE } from '../data/menuData';

export function DrJoieConcierge({ isOpen, onClose, doctorShift }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! Welcome to Joie Cakes & More 💜. Dr. Joie is currently attending to patients at the hospital, but I am here to make sure your order is logged and scheduled smoothly! Ask me about our Kilishi (strictly measured in kg), fresh vanilla cakes, delivery windows in Ondo, or Paystack payment.",
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
    "What if an item is ordered finish?"
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

    // Natural empathetic answer matching
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
        answer = "I'm right here to help! You can pick your preferred kilogram of Kilishi (0.25kg to 5kg), choose an available delivery window across Ondo, and complete payment securely via Paystack. Your receipt will also link directly to Dr. Joie's WhatsApp (09064839054) so our kitchen queue gets notified immediately!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end p-2 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl h-full sm:h-[620px] my-auto flex flex-col shadow-2xl border border-purple-200 overflow-hidden animate-slide-left">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3A145C] via-[#4F217A] to-[#3A145C] text-white p-4 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/80 border border-purple-400 flex items-center justify-center text-white font-serif-luxury font-bold italic text-lg shadow-inner">
                J
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#3A145C] rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-purple-100 font-serif-luxury">Dr. Joie's Concierge</h4>
                <span className="text-[10px] bg-purple-400/20 text-purple-200 px-2 py-0.2 rounded-full font-medium">Ondo Hub</span>
              </div>
              <p className="text-[11px] text-purple-200/80">
                Direct Assistance for Hospital Service Hours
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Status Banner in chat */}
        <div className="bg-purple-50/80 border-b border-purple-100 px-4 py-2 text-[11px] text-purple-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Doctor Status: <strong>{doctorShift === 'hospital' ? 'On Hospital Shift' : 'In Ondo Kitchen'}</strong></span>
          </div>
          <span className="text-purple-700 font-medium">Auto-Scheduling Active</span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8FD] text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#5B2391] text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-stone-800 rounded-bl-xs border border-purple-100 shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-purple-100 w-20 shadow-2xs">
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-purple-100 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-purple-50 hover:bg-purple-100 text-purple-900 px-3 py-1 rounded-full whitespace-nowrap border border-purple-100 transition-colors cursor-pointer shrink-0"
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
          className="p-3 bg-white border-t border-purple-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about Kilishi in kg, cakes, or delivery in Ondo..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-hidden bg-purple-50/20"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#6C34A3] hover:bg-[#5C2B8D] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
