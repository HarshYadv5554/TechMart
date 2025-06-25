import { ChatMessage, Product, SearchFilters } from '../types';
import { ProductService } from './productService';
import { v4 as uuidv4 } from 'uuid';

export class ChatService {
  private static instance: ChatService;
  private productService: ProductService;

  private constructor() {
    this.productService = ProductService.getInstance();
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async processMessage(userMessage: string): Promise<ChatMessage> {
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const message = userMessage.toLowerCase();
    
    // Intent recognition (simplified NLP simulation)
    if (this.isGreeting(message)) {
      return this.createBotMessage(
        "Hello! 👋 Welcome to TechMart AI, your smart shopping assistant! I can help you find the perfect tech products. What are you looking for today?"
      );
    }

    if (this.isSearchQuery(message)) {
      return await this.handleSearchQuery(message);
    }

    if (this.isPriceInquiry(message)) {
      return await this.handlePriceInquiry(message);
    }

    if (this.isComparisonQuery(message)) {
      return await this.handleComparisonQuery(message);
    }

    if (this.isRecommendationRequest(message)) {
      return await this.handleRecommendationRequest(message);
    }

    // Default response with suggestions
    return this.createBotMessage(
      "I'd be happy to help you find the perfect tech product! You can ask me about:\n\n" +
      "🔍 **Search**: \"Show me laptops\" or \"Find iPhone 15\"\n" +
      "💰 **Prices**: \"What's the price of MacBook Pro?\"\n" +
      "⚖️ **Compare**: \"Compare iPhone vs Samsung Galaxy\"\n" +
      "🎯 **Recommendations**: \"Recommend a gaming laptop under $1500\"\n\n" +
      "What would you like to explore?"
    );
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isSearchQuery(message: string): boolean {
    const searchTerms = ['show', 'find', 'search', 'looking for', 'need', 'want', 'get me'];
    return searchTerms.some(term => message.includes(term));
  }

  private isPriceInquiry(message: string): boolean {
    const priceTerms = ['price', 'cost', 'how much', 'expensive', 'cheap', 'budget'];
    return priceTerms.some(term => message.includes(term));
  }

  private isComparisonQuery(message: string): boolean {
    const comparisonTerms = ['compare', 'vs', 'versus', 'difference', 'better', 'which'];
    return comparisonTerms.some(term => message.includes(term));
  }

  private isRecommendationRequest(message: string): boolean {
    const recommendationTerms = ['recommend', 'suggest', 'best', 'top', 'good'];
    return recommendationTerms.some(term => message.includes(term));
  }

  private async handleSearchQuery(message: string): Promise<ChatMessage> {
    const filters = this.extractFiltersFromMessage(message);
    const products = await this.productService.searchProducts('', filters);

    if (products.length === 0) {
      return this.createBotMessage(
        "I couldn't find any products matching your criteria. Try adjusting your search or ask me for recommendations!"
      );
    }

    const categoryInfo = filters.category ? ` in ${filters.category}` : '';
    const responseText = `I found ${products.length} product${products.length > 1 ? 's' : ''}${categoryInfo} for you! Here are the top matches:`;

    return this.createBotMessage(responseText, products.slice(0, 6), 'product-list');
  }

  private async handlePriceInquiry(message: string): Promise<ChatMessage> {
    const productName = this.extractProductNameFromMessage(message);
    const products = await this.productService.searchProducts(productName);

    if (products.length === 0) {
      return this.createBotMessage(
        `I couldn't find pricing information for "${productName}". Could you be more specific about the product you're interested in?`
      );
    }

    const product = products[0];
    const priceInfo = product.originalPrice && product.originalPrice > product.price
      ? `$${product.price} (was $${product.originalPrice}) - You save $${product.originalPrice - product.price}!`
      : `$${product.price}`;

    return this.createBotMessage(
      `The **${product.name}** is priced at **${priceInfo}**\n\n${product.description}`,
      [product],
      'product-details'
    );
  }

  private async handleComparisonQuery(message: string): Promise<ChatMessage> {
    const products = await this.productService.searchProducts('', { category: 'Smartphones' });
    const compareProducts = products.slice(0, 2);

    if (compareProducts.length < 2) {
      return this.createBotMessage(
        "I need at least two products to compare. Could you specify which products you'd like me to compare?"
      );
    }

    const comparison = `Here's a comparison of **${compareProducts[0].name}** vs **${compareProducts[1].name}**:\n\n` +
      `**${compareProducts[0].name}** - $${compareProducts[0].price}\n` +
      `⭐ ${compareProducts[0].rating}/5 (${compareProducts[0].reviewCount} reviews)\n` +
      `${compareProducts[0].features.slice(0, 2).join(', ')}\n\n` +
      `**${compareProducts[1].name}** - $${compareProducts[1].price}\n` +
      `⭐ ${compareProducts[1].rating}/5 (${compareProducts[1].reviewCount} reviews)\n` +
      `${compareProducts[1].features.slice(0, 2).join(', ')}\n\n` +
      `Would you like more details about either product?`;

    return this.createBotMessage(comparison, compareProducts, 'product-list');
  }

  private async handleRecommendationRequest(message: string): Promise<ChatMessage> {
    const filters = this.extractFiltersFromMessage(message);
    let products = await this.productService.searchProducts('', filters);

    // Sort by rating for recommendations
    products = products.sort((a, b) => b.rating - a.rating).slice(0, 4);

    if (products.length === 0) {
      return this.createBotMessage(
        "I couldn't find recommendations matching your criteria. Let me show you some popular products instead!"
      );
    }

    const responseText = `Based on your preferences, here are my top recommendations:\n\n` +
      products.map((p, i) => `${i + 1}. **${p.name}** - $${p.price} (⭐ ${p.rating}/5)`).join('\n');

    return this.createBotMessage(responseText, products, 'product-list');
  }

  private extractFiltersFromMessage(message: string): SearchFilters {
    const filters: SearchFilters = {};

    // Extract category
    if (message.includes('laptop') || message.includes('macbook') || message.includes('notebook')) {
      filters.category = 'Laptops';
    } else if (message.includes('phone') || message.includes('iphone') || message.includes('smartphone')) {
      filters.category = 'Smartphones';
    } else if (message.includes('tablet') || message.includes('ipad')) {
      filters.category = 'Tablets';
    } else if (message.includes('headphone') || message.includes('earbud') || message.includes('audio')) {
      filters.category = 'Audio';
    } else if (message.includes('tv') || message.includes('television')) {
      filters.category = 'Home Entertainment';
    } else if (message.includes('gaming') || message.includes('vr')) {
      filters.category = 'Gaming';
    }

    // Extract brand
    const brands = ['apple', 'samsung', 'sony', 'dell', 'hp', 'lenovo', 'nvidia', 'meta'];
    brands.forEach(brand => {
      if (message.includes(brand)) {
        filters.brand = brand.charAt(0).toUpperCase() + brand.slice(1);
      }
    });

    // Extract price range
    const priceMatch = message.match(/under\s+\$?(\d+)/i) || message.match(/below\s+\$?(\d+)/i);
    if (priceMatch) {
      filters.maxPrice = parseInt(priceMatch[1]);
    }

    const budgetMatch = message.match(/budget\s+\$?(\d+)/i);
    if (budgetMatch) {
      filters.maxPrice = parseInt(budgetMatch[1]);
    }

    return filters;
  }

  private extractProductNameFromMessage(message: string): string {
    // Simple extraction - in real implementation, this would be more sophisticated
    const words = message.split(' ');
    const stopWords = ['price', 'cost', 'how', 'much', 'is', 'the', 'of', 'for', 'what', 'whats'];
    return words.filter(word => !stopWords.includes(word.toLowerCase())).join(' ');
  }

  private createBotMessage(
    content: string,
    products?: Product[],
    type: ChatMessage['type'] = 'text'
  ): ChatMessage {
    return {
      id: uuidv4(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      products,
      type
    };
  }
}