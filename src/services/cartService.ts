import { Product, CartItem } from '../types';

const STORAGE_KEY = 'techmart_cart';

export class CartService {
  private static instance: CartService;
  private items: CartItem[] = [];

  private constructor() {
    this.loadCartFromStorage();
  }

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  private loadCartFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.items = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored cart:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    
    this.saveCartToStorage();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCartToStorage();
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clear(): void {
    this.items = [];
    this.saveCartToStorage();
  }
}