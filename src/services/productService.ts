import { Product, SearchFilters } from '../types';
import { allProducts } from '../data/products';

export class ProductService {
  private static instance: ProductService;
  private products: Product[] = allProducts;

  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async searchProducts(query: string = '', filters: SearchFilters = {}): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredProducts = [...this.products];

    // Apply text search with enhanced matching
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.brand,
          product.category,
          product.subcategory,
          ...product.tags,
          ...product.features,
          ...Object.values(product.specifications)
        ].join(' ').toLowerCase();

        return searchableText.includes(searchTerm) ||
               this.fuzzyMatch(searchTerm, searchableText);
      });
    }

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(p => 
        p.subcategory.toLowerCase() === filters.subcategory!.toLowerCase()
      );
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase() === filters.brand!.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating!);
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    return filteredProducts;
  }

  private fuzzyMatch(query: string, text: string): boolean {
    const queryWords = query.split(' ').filter(word => word.length > 2);
    return queryWords.some(word => {
      for (let i = 0; i <= text.length - word.length; i++) {
        let matches = 0;
        for (let j = 0; j < word.length; j++) {
          if (text[i + j] === word[j]) matches++;
        }
        if (matches / word.length >= 0.8) return true;
      }
      return false;
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.find(p => p.id === id) || null;
  }

  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.products]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  async getRecommendations(userId: string, limit: number = 6): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Enhanced recommendation logic
    return [...this.products]
      .sort((a, b) => {
        // Prioritize high-rated, in-stock products
        const scoreA = a.rating * (a.inStock ? 1.2 : 0.8) + (a.reviewCount / 1000);
        const scoreB = b.rating * (b.inStock ? 1.2 : 0.8) + (b.reviewCount / 1000);
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  getBrands(): string[] {
    return [...new Set(this.products.map(p => p.brand))].sort();
  }

  getPriceRange(): { min: number; max: number } {
    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  async getTrendingProducts(limit: number = 8): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Simulate trending based on recent activity and ratings
    return [...this.products]
      .filter(p => p.inStock && p.rating >= 4.0)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  }

  async getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
    const products = await this.searchProducts('', { category });
    return limit ? products.slice(0, limit) : products;
  }
}