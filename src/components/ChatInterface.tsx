import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Mic, MicOff, Sparkles } from 'lucide-react';
import { ChatMessage as ChatMessageType, Product } from '../types';
import { ChatService } from '../services/chatService';
import { AuthService } from '../services/authService';
import { ChatMessage } from './ChatMessage';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  onProductView: (product: Product) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onProductView }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const chatService = ChatService.getInstance();
  const authService = AuthService.getInstance();

  useEffect(() => {
    const user = authService.getCurrentUser();
    const initialMessage: ChatMessageType = {
      id: uuidv4(),
      content: `Hello ${user?.firstName || 'there'}! 👋 Welcome to TechMart AI, your intelligent shopping companion! I'm here to help you discover the perfect tech products from our collection of 500+ items.\n\nI can help you with:\n🔍 **Product Search**: "Show me gaming laptops under ₹80,000"\n💰 **Price Comparisons**: "Compare iPhone vs Samsung Galaxy"\n🎯 **Smart Recommendations**: "Best headphones for music"\n⚡ **Quick Answers**: "What's new in smartphones?"\n\nWhat would you like to explore today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: uuidv4(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await chatService.processMessage(inputValue);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: uuidv4(),
        content: "I apologize, but I encountered an error processing your request. Please try again or rephrase your question.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    const user = authService.getCurrentUser();
    const resetMessage: ChatMessageType = {
      id: uuidv4(),
      content: `Chat reset! Hello again ${user?.firstName || 'there'}! 🔄 How can I help you find the perfect tech product today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([resetMessage]);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const currentUser = authService.getCurrentUser();

  const quickSuggestions = [
    'Show me latest smartphones',
    'Gaming laptops under ₹1,00,000',
    'Best wireless headphones',
    'Compare iPhone vs OnePlus',
    'Budget tablets for students',
    'Premium smartwatches'
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Chat Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TechMart AI Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentUser ? `Personalized for ${currentUser.firstName}` : 'Your intelligent shopping companion'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onProductView={onProductView}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-6">
        {/* Quick Suggestions */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputValue(suggestion)}
                className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 rounded-full text-blue-700 dark:text-blue-300 transition-all duration-200 border border-blue-200 dark:border-blue-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about products, prices, or get recommendations..."
              className="w-full px-6 py-4 pr-14 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
              disabled={isLoading}
            />
            <button
              onClick={handleVoiceInput}
              className={`absolute right-4 top-4 p-2 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};