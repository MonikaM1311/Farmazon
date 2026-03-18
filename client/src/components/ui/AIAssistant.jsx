import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { GiRobotAntennas } from 'react-icons/gi';
import api from '../../api/axios';

const WELCOME = {
  role: 'bot',
  text: "👋 Hi! I'm **Farma**, your AI assistant. Ask me about:\n- Fruits/veggies for health goals\n- Budget grocery suggestions\n- Nutrition tips",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);
    try {
      const { data } = await api.post('/ai/chat', { message: text });
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: '⚠️ Sorry, I had trouble responding. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) =>
    text.split('\n').map((line, i) => (
      <p key={i} className="mb-1 last:mb-0"
        dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        }}
      />
    ));

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-800 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-green-100 flex flex-col overflow-hidden" style={{ height: '460px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-900 to-green-700 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <GiRobotAntennas className="text-yellow-400 text-xl" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Farma AI</p>
              <p className="text-green-300 text-xs">Your farm assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-green-800 to-yellow-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-700 shadow-sm rounded-bl-sm border border-green-100'
                }`}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-green-100">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-green-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about health goals..."
              className="flex-1 border border-green-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-green-800 to-yellow-500 text-white p-2 rounded-xl disabled:opacity-50 hover:opacity-90 transition-all"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
