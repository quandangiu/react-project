import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/context';
import { MessageSquare, Send, X, Minimize2, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget: React.FC = () => {
  const { state, dispatch } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        id: Date.now().toString(),
        senderId: state.user?.id || 'guest',
        text: text,
        timestamp: new Date().toISOString(),
        isAdmin: false
      }
    });
    setText('');
    
    // Simulate auto-reply
    setTimeout(() => {
        dispatch({
            type: 'SEND_MESSAGE',
            payload: {
                id: (Date.now() + 1).toString(),
                senderId: 'system',
                text: "Thanks for your message! Our team will get back to you shortly.",
                timestamp: new Date().toISOString(),
                isAdmin: true
            }
        });
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <UserIcon size={20} />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">Customer Support</h3>
                  <p className="text-xs text-blue-100">Online | Replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {state.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.isAdmin 
                      ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none' 
                      : 'bg-primary-600 text-white rounded-tr-none'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.isAdmin ? 'text-gray-400' : 'text-blue-100'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button type="submit" className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};