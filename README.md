# TechMart AI - E-commerce Sales Chatbot

A comprehensive e-commerce sales chatbot system built with React, TypeScript, and Tailwind CSS. This application provides an intelligent shopping assistant that helps customers discover, compare, and purchase electronics products through natural language interactions.

---

## 📦 Features

- **Intelligent Chatbot Interface:** Natural language processing simulation for product searches, price inquiries, comparisons, and recommendations
- **User Authentication:** Secure login/registration system with session management
- **Product Catalog:** 100+ electronics products across multiple categories
- **Shopping Cart:** Full cart functionality with quantity management and persistent storage
- **Product Details:** Detailed product information with specifications, reviews, and features
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Voice Input:** Speech recognition for hands-free interaction (where supported)
- **Session Continuity:** Maintains chat history and user state across sessions
- **Real-time Search:** Instant product filtering and search capabilities
- **Smart Recommendations:** AI-powered product suggestions based on user preferences
- **Product Comparison:** Side-by-side product comparisons with detailed analysis

---

## 🛠️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshYadv5554/TechMart.git
   cd TechMart/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🧑‍💻 Usage Guide

- Open the application in your browser
- Sign up for a new account or use existing credentials
- Start chatting with the AI assistant about products you're interested in

### Chat Commands
- **Search:** "Show me laptops" or "Find iPhone 15"
- **Price Inquiry:** "What's the price of MacBook Pro?"
- **Comparison:** "Compare iPhone vs Samsung Galaxy"
- **Recommendations:** "Recommend a gaming laptop under $1500"
- **Voice Input:** Click the microphone button for voice commands

### Product Interaction
- Click on any product card to view detailed information
- Use the "Add to Cart" button to add items to your shopping cart
- Access your cart through the header cart icon
- Manage quantities and remove items in the cart modal

---

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
├── services/            # Business logic and API services
├── data/                # Mock data and database simulation
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

---

## 🧠 Chatbot Intelligence

- **Intent Recognition:** Identifies user goals (search, compare, recommend)
- **Entity Extraction:** Pulls out product names, categories, price ranges
- **Context Awareness:** Maintains conversation flow and references
- **Response Generation:** Creates contextual, helpful responses

---

## 🖌️ Design System

- **Color Palette:** Modern, accessible colors
- **Typography:** Clear, readable fonts
- **Spacing System:** Consistent, responsive layouts

---

## ⚡ Performance & Security

- **Component Optimization:** Memoization and efficient re-rendering
- **Image Optimization:** Lazy loading and responsive images
- **Bundle Optimization:** Code splitting and tree shaking
- **Caching:** LocalStorage for persistence and performance
- **Input Validation:** Sanitization of user inputs
- **Authentication:** Secure session management

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).