import React from 'react';
import { Star, ShoppingCart, Heart, Eye, Truck, Shield } from 'lucide-react';
import { Product } from '../types';
import { CartService } from '../services/cartService';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  compact?: boolean;
  listView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails, 
  compact = false,
  listView = false
}) => {
  const cartService = CartService.getInstance();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    cartService.addItem(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (listView) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 p-4"
        onClick={() => onViewDetails(product)}
      >
        <div className="flex space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {discountPercent > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{product.brand}</p>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm mb-2">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  
                  {product.inStock && (
                    <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                      <Truck className="w-3 h-3 mr-1" />
                      <span>Free Delivery</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right ml-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-1 text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            compact ? 'h-40' : 'h-48'
          }`}
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discountPercent}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-gray-900 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className={`p-4 space-y-3 ${compact ? 'space-y-2' : ''}`}>
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className={`font-semibold text-gray-900 dark:text-white line-clamp-2 ${
              compact ? 'text-sm' : 'text-lg'
            }`}>
              {product.name}
            </h3>
          </div>
          <p className={`text-gray-600 dark:text-gray-400 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.brand}
          </p>
        </div>

        <p className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>
          {product.description}
        </p>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className={`text-gray-500 dark:text-gray-400 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-bold text-gray-900 dark:text-white ${compact ? 'text-lg' : 'text-xl'}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className={`text-gray-500 dark:text-gray-400 line-through ${compact ? 'text-xs' : 'text-sm'}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.inStock && (
            <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              <span>In Stock</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-1 shadow-lg hover:shadow-xl ${
              compact ? 'py-2 text-xs' : 'py-2.5 text-sm'
            }`}
          >
            <ShoppingCart className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className={`px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center ${
              compact ? 'py-2' : 'py-2.5'
            }`}
          >
            <Eye className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
          </button>
        </div>
      </div>
    </div>
  );
};