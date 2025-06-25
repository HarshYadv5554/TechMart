import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';
import { ProductCard } from './ProductCard';

interface ChatMessageProps {
  message: ChatMessageType;
  onProductView: (product: any) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onProductView }) => {
  const isBot = message.sender === 'bot';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
          : 'bg-gray-200 text-gray-600'
      }`}>
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div className={`flex-1 max-w-4xl ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isBot 
            ? 'bg-white border border-gray-200' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
        }`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content.split('\n').map((line, index) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <div key={index} className="font-semibold mb-1">
                    {line.slice(2, -2)}
                  </div>
                );
              }
              if (line.startsWith('⭐') || line.startsWith('🔍') || line.startsWith('💰') || 
                  line.startsWith('⚖️') || line.startsWith('🎯')) {
                return (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                );
              }
              return line ? (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ) : (
                <div key={index} className="mb-2" />
              );
            })}
          </div>
        </div>

        {message.products && message.products.length > 0 && (
          <div className="mt-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {message.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onProductView}
                  compact={true}
                />
              ))}
            </div>
          </div>
        )}

        <div className={`text-xs mt-2 ${
          isBot ? 'text-gray-500' : 'text-blue-100'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};