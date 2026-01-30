import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your portfolio assistant. Ask me about my developer background, skills, projects, or contact information.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatbotRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        chatbotRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'expo.out' }
      );
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      const text = data?.reply || 'Sorry, I did not receive a response.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: text },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9998] w-35 h-14 rounded bg-almost-black text-soft-white font-body font-medium shadow-lg hover:bg-muted-olive transition-all duration-500 flex items-center justify-center"
        aria-label="Toggle chatbot"
      >
        {isOpen ? '×' : 'Chat with me'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-24 right-8 z-[9998] w-96 max-w-[calc(100vw-4rem)] h-[520px] bg-soft-white border border-light-gray shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-light-gray bg-soft-white">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold">Portfolio Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-charcoal hover:text-almost-black transition-colors duration-300 text-2xl leading-none"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-5"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-almost-black text-soft-white'
                      : 'bg-light-gray/20 text-charcoal border border-light-gray'
                  }`}
                >
                  <p className="font-body text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-light-gray/20 p-4 rounded-2xl border border-light-gray">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 border-t border-light-gray">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-5 py-3 border border-light-gray bg-soft-white text-charcoal font-body text-base focus:outline-none focus:border-almost-black transition-colors duration-500 rounded-2xl"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-almost-black text-soft-white font-body font-medium hover:bg-muted-olive transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
