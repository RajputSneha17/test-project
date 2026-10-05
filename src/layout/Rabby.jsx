import React, { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Rabbit } from "lucide-react";
const Rabby = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const suggestions = [
    "What should I buy today?",
    "Show me today's offers",
    "I need grocery items",
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("User:", message);
    setMessage("");
  };

  return (
    <>
      {/* Floating Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[350px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[26px] border border-[#dcebd7] bg-white shadow-[0_20px_60px_rgba(40,90,49,0.22)]">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#285a31] via-[#367440] to-[#4c8a54] px-5 py-4 text-white">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                  <Rabbit size={24} />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold">Rabby</h3>
                    <Sparkles size={13} />
                  </div>

                  <p className="text-xs text-white/75">
                    Your PFC shopping assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition hover:bg-white/15"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="h-[350px] overflow-y-auto bg-[#f8fbf6] p-4">
            {/* Bot Message */}
            <div className="mb-4 flex gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#e5f2e1] text-[#285a31]">
                <Rabbit size={17} />
              </div>

              <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                Hey! 👋 I'm <b>Rabby</b>.
                <br />
                What are you looking for today?
              </div>
            </div>

            {/* Suggestions */}
            <div className="ml-10 space-y-2">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(item)}
                  className="block w-full rounded-xl border border-[#dcebd7] bg-white px-3 py-2 text-left text-xs text-[#315c38] transition hover:border-[#9fc59a] hover:bg-[#f1f8ee]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#e4eee0] bg-white p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-[#dcebd7] bg-[#f8fbf6] px-3 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask Rabby..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              <button
                onClick={handleSend}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#285a31] text-white transition hover:bg-[#214b29]"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group fixed bottom-5 right-5 z-[9999] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-[#285a31] to-[#4d8b55] text-white shadow-[0_10px_35px_rgba(40,90,49,0.35)] transition-all duration-300 hover:scale-110"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#75a96e] opacity-30 animate-ping" />
        )}

        <div className="relative">
          {open ? <X size={26} /> : <Rabbit size={27} />}
        </div>
      </button>
    </>
  );
};

export default Rabby;
