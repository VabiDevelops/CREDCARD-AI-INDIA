
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../types/api';

interface ChatProps {
  onRecommendationsReady: (answers: any, cards: any[]) => void;
}

const Chat: React.FC<ChatProps> = ({ onRecommendationsReady }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading, error } = useChat(onRecommendationsReady);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

useEffect(() => {
  scrollToBottom();

  // If last message was from bot, focus input
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.role === 'assistant') {
    inputRef.current?.focus();
  }
}, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    await sendMessage(userMessage);
  };

  const handleQuickResponse = async (response: string) => {
    await sendMessage(response);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Credit Card Advisor</h3>
            <p className="text-blue-100 text-sm">Powered by Advanced AI</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Welcome to SmartCard AI!</h4>
            <p className="text-gray-600 mb-6">I'll analyze your spending patterns and recommend the perfect credit cards for you.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={() => handleQuickResponse("I need a new credit card")}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Find new card
              </button>
              <button
                onClick={() => handleQuickResponse("I want to upgrade my card")}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
              >
                Upgrade existing
              </button>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            onQuickResponse={handleQuickResponse}
            isLoading={isLoading}
          />
        ))}

        {isLoading && <TypingIndicator />}
        
        {error && <ErrorMessage error={error} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t px-6 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{
  message: ChatMessage;
  onQuickResponse: (response: string) => void;
  isLoading: boolean;
}> = ({ message, onQuickResponse, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const isUser = message.role === 'user';

  useEffect(() => {
    if (!isUser) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(message.content.slice(0, i + 1));
        i++;
        if (i >= message.content.length) clearInterval(interval);
      }, 15); // typing speed
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.content); // instant for user
    }
  }, [message.content, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`p-2 rounded-full ${isUser ? 'bg-blue-600' : 'bg-gray-100'}`}>
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-gray-600" />
          )}
        </div>
        <div
          className={`px-4 py-3 rounded-2xl transition-all duration-500 ${
            isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</p>

          {message.quick_replies && displayedText === message.content && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.quick_replies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickResponse(reply)}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-xs hover:bg-white/30 transition-colors"
                  disabled={isLoading}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="flex items-start space-x-3 max-w-xs">
      <div className="p-2 bg-gray-100 rounded-full">
        <Bot className="h-4 w-4 text-gray-600" />
      </div>
      <div className="px-4 py-3 bg-gray-100 rounded-2xl">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex justify-center">
    <div className="flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <span className="text-sm text-red-700">{error}</span>
    </div>
  </div>
);

export default Chat;
