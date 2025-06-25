import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { AuthModal } from './components/AuthModal';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartModal } from './components/CartModal';
import { ProductGrid } from './components/ProductGrid';
import { AuthGuard } from './components/AuthGuard';
import { ThemeProvider } from './contexts/ThemeContext';
import { Product, User } from './types';
import { AuthService } from './services/authService';
import { allProducts } from './data/products';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'chat' | 'products'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  const authService = AuthService.getInstance();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleAuthSuccess = () => {
    setUser(authService.getCurrentUser());
  };

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentView('products');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
        <Header
          onAuthClick={() => setIsAuthModalOpen(true)}
          onCartClick={() => setIsCartModalOpen(true)}
          onSearchChange={handleSearchChange}
        />
        
        <main className="flex-1 flex">
          {currentView === 'chat' ? (
            <AuthGuard onAuthClick={() => setIsAuthModalOpen(true)}>
              <div className="w-full">
                <ChatInterface onProductView={handleProductView} />
              </div>
            </AuthGuard>
          ) : (
            <div className="w-full">
              <ProductGrid
                products={allProducts}
                onProductView={handleProductView}
                searchQuery={searchQuery}
              />
            </div>
          )}
        </main>

        {/* Navigation Tabs */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-1 flex space-x-1">
            <button
              onClick={() => setCurrentView('products')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                currentView === 'products'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🛍️ Browse Products
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                currentView === 'chat'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🤖 AI Assistant
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />

        <ProductDetailsModal
          product={selectedProduct}
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
        />

        <CartModal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;