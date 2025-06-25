export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  brand: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: Product[];
  type?: 'text' | 'product-list' | 'product-details' | 'cart-update';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}