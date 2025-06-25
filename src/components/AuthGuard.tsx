import React from 'react';
import { AuthService } from '../services/authService';
import { Lock, ShoppingBag } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  onAuthClick: () => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, onAuthClick }) => {
  const authService = AuthService.getInstance();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Please sign in to access our AI shopping assistant and start discovering amazing tech products tailored just for you.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={onAuthClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Sign In to Continue</span>
            </button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New to TechMart? Create an account to get started
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">AI Assistant</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🛒</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Smart Shopping</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};