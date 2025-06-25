import { Product } from '../types';

// Comprehensive tech product categories with Indian brands and pricing
const techCategories = {
  smartphones: {
    brands: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Google', 'Nothing', 'Motorola'],
    subcategories: ['Flagship', 'Premium', 'Mid-range', 'Budget', 'Gaming'],
    features: [
      'High refresh rate display', 'Multiple camera setup', 'Fast charging', '5G connectivity',
      'Wireless charging', 'Water resistance', 'Face unlock', 'Fingerprint sensor',
      'Stereo speakers', 'Gaming mode', 'AI photography', 'Night mode'
    ]
  },
  laptops: {
    brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Razer', 'Microsoft', 'LG'],
    subcategories: ['Gaming', 'Business', 'Ultrabook', 'Workstation', 'Budget', 'Convertible'],
    features: [
      'SSD storage', 'Backlit keyboard', 'Fingerprint reader', 'Thunderbolt ports',
      'Long battery life', 'Fast charging', 'Dedicated graphics', 'High refresh display',
      'Premium build', 'Lightweight design', 'Multi-core processor', 'Ample RAM'
    ]
  },
  tablets: {
    brands: ['Apple', 'Samsung', 'Lenovo', 'Xiaomi', 'Realme', 'OnePlus', 'Microsoft', 'Huawei'],
    subcategories: ['Professional', 'Entertainment', 'Budget', 'Kids', 'Gaming'],
    features: [
      'Stylus support', 'Keyboard compatible', 'High resolution display', 'Long battery life',
      'Lightweight design', 'Multi-tasking', 'Premium materials', 'Fast processor'
    ]
  },
  audio: {
    brands: ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Audio-Technica', 'Boat', 'Noise', 'Realme', 'OnePlus', 'Apple'],
    subcategories: ['Headphones', 'Earbuds', 'Speakers', 'Gaming Headsets', 'Studio Monitors'],
    features: [
      'Active noise cancellation', 'Wireless connectivity', 'Long battery life', 'Quick charge',
      'Water resistance', 'Touch controls', 'Voice assistant', 'Premium drivers',
      'Comfortable fit', 'Foldable design', 'Multi-device pairing', 'Spatial audio'
    ]
  },
  smartwatches: {
    brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit', 'Noise', 'Fire-Boltt', 'boAt', 'Realme', 'OnePlus'],
    subcategories: ['Fitness', 'Smart', 'Luxury', 'Sports', 'Budget'],
    features: [
      'Heart rate monitoring', 'GPS tracking', 'Water resistance', 'Sleep tracking',
      'Fitness modes', 'Smart notifications', 'Long battery life', 'Always-on display',
      'Voice assistant', 'Music control', 'Payment support', 'Health sensors'
    ]
  },
  cameras: {
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus', 'Leica', 'GoPro'],
    subcategories: ['DSLR', 'Mirrorless', 'Action', 'Instant', 'Professional', 'Compact'],
    features: [
      '4K video recording', 'Image stabilization', 'Weather sealing', 'Fast autofocus',
      'High ISO performance', 'Dual card slots', 'Articulating screen', 'Wi-Fi connectivity',
      'Long battery life', 'Professional controls', 'Raw support', 'Burst shooting'
    ]
  },
  gaming: {
    brands: ['Sony', 'Microsoft', 'Nintendo', 'Razer', 'Logitech', 'SteelSeries', 'Corsair', 'ASUS', 'MSI'],
    subcategories: ['Consoles', 'Controllers', 'Keyboards', 'Mice', 'Headsets', 'Monitors'],
    features: [
      'High refresh rate', 'Low latency', 'RGB lighting', 'Mechanical switches',
      'Wireless connectivity', 'Programmable buttons', 'Ergonomic design', 'Durable build',
      'Gaming modes', 'Customizable profiles', 'High DPI', 'Anti-ghosting'
    ]
  },
  hometech: {
    brands: ['Amazon', 'Google', 'Apple', 'Philips', 'Xiaomi', 'TP-Link', 'Netgear', 'Samsung', 'LG'],
    subcategories: ['Smart Speakers', 'Security Cameras', 'Smart Lights', 'Routers', 'Smart Displays', 'Streaming Devices'],
    features: [
      'Voice control', 'Smart home integration', 'Mobile app control', 'Energy efficient',
      'Easy setup', 'Multi-room audio', 'HD video', 'Night vision',
      'Motion detection', 'Cloud storage', 'Mesh networking', '4K streaming'
    ]
  },
  accessories: {
    brands: ['Anker', 'Belkin', 'Spigen', 'OtterBox', 'Logitech', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi'],
    subcategories: ['Chargers', 'Cases', 'Screen Protectors', 'Cables', 'Power Banks', 'Stands'],
    features: [
      'Fast charging', 'Wireless charging', 'Durable materials', 'Compact design',
      'Multiple ports', 'LED indicators', 'Safety features', 'Universal compatibility',
      'Premium finish', 'Easy installation', 'Scratch resistant', 'Drop protection'
    ]
  }
};

// Generate comprehensive product database
export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  // Generate products for each category
  Object.entries(techCategories).forEach(([category, config]) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const productsPerSubcategory = Math.ceil(70 / config.subcategories.length); // ~70 products per category

    config.subcategories.forEach(subcategory => {
      for (let i = 0; i < productsPerSubcategory; i++) {
        const brand = config.brands[Math.floor(Math.random() * config.brands.length)];
        const basePrice = getBasePriceForCategory(category, subcategory);
        const price = Math.floor(basePrice * (0.8 + Math.random() * 0.4)); // ±20% variation
        const originalPrice = Math.random() > 0.6 ? Math.floor(price * (1.1 + Math.random() * 0.3)) : undefined;
        
        const product: Product = {
          id: productId.toString(),
          name: generateProductName(brand, category, subcategory, i),
          category: categoryName,
          subcategory,
          price,
          originalPrice,
          description: generateDescription(category, subcategory, brand),
          features: getRandomFeatures(config.features, 4),
          specifications: generateSpecifications(category, subcategory),
          imageUrl: getImageUrl(category),
          rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
          reviewCount: Math.floor(Math.random() * 5000) + 50,
          inStock: Math.random() > 0.05, // 95% in stock
          brand,
          tags: generateTags(category, subcategory, brand)
        };

        products.push(product);
        productId++;
      }
    });
  });

  return products;
};

const getBasePriceForCategory = (category: string, subcategory: string): number => {
  const basePrices: Record<string, Record<string, number>> = {
    smartphones: {
      'Flagship': 80000,
      'Premium': 50000,
      'Mid-range': 25000,
      'Budget': 12000,
      'Gaming': 35000
    },
    laptops: {
      'Gaming': 75000,
      'Business': 60000,
      'Ultrabook': 85000,
      'Workstation': 120000,
      'Budget': 30000,
      'Convertible': 70000
    },
    tablets: {
      'Professional': 45000,
      'Entertainment': 25000,
      'Budget': 12000,
      'Kids': 8000,
      'Gaming': 35000
    },
    audio: {
      'Headphones': 15000,
      'Earbuds': 8000,
      'Speakers': 12000,
      'Gaming Headsets': 10000,
      'Studio Monitors': 25000
    },
    smartwatches: {
      'Fitness': 8000,
      'Smart': 25000,
      'Luxury': 45000,
      'Sports': 15000,
      'Budget': 3000
    },
    cameras: {
      'DSLR': 45000,
      'Mirrorless': 55000,
      'Action': 15000,
      'Instant': 8000,
      'Professional': 150000,
      'Compact': 20000
    },
    gaming: {
      'Consoles': 35000,
      'Controllers': 4000,
      'Keyboards': 8000,
      'Mice': 3000,
      'Headsets': 12000,
      'Monitors': 25000
    },
    hometech: {
      'Smart Speakers': 5000,
      'Security Cameras': 8000,
      'Smart Lights': 2000,
      'Routers': 6000,
      'Smart Displays': 12000,
      'Streaming Devices': 4000
    },
    accessories: {
      'Chargers': 2000,
      'Cases': 1500,
      'Screen Protectors': 500,
      'Cables': 800,
      'Power Banks': 3000,
      'Stands': 2500
    }
  };

  return basePrices[category]?.[subcategory] || 10000;
};

const generateProductName = (brand: string, category: string, subcategory: string, index: number): string => {
  const modelNumbers = ['Pro', 'Max', 'Ultra', 'Plus', 'Lite', 'SE', 'Air', 'Mini', 'Edge', 'Prime'];
  const suffixes = ['2024', '5G', 'Wireless', 'HD', '4K', 'Gaming', 'Professional', 'Advanced'];
  
  const model = modelNumbers[Math.floor(Math.random() * modelNumbers.length)];
  const suffix = Math.random() > 0.5 ? suffixes[Math.floor(Math.random() * suffixes.length)] : '';
  
  return `${brand} ${subcategory} ${model} ${suffix}`.trim();
};

const generateDescription = (category: string, subcategory: string, brand: string): string => {
  const descriptions: Record<string, string[]> = {
    smartphones: [
      'Experience cutting-edge technology with advanced camera systems and lightning-fast performance.',
      'Premium smartphone designed for modern users who demand excellence in every detail.',
      'Revolutionary mobile experience with AI-powered features and stunning display quality.',
      'Next-generation smartphone combining style, performance, and innovative technology.'
    ],
    laptops: [
      'Powerful computing solution designed for professionals and enthusiasts alike.',
      'High-performance laptop engineered for demanding tasks and seamless multitasking.',
      'Premium laptop combining portability with uncompromising performance and reliability.',
      'Advanced computing platform built for productivity and creative workflows.'
    ],
    tablets: [
      'Versatile tablet perfect for work, entertainment, and creative pursuits.',
      'Premium tablet experience with stunning display and intuitive touch interface.',
      'Portable powerhouse designed for modern digital lifestyle and productivity.',
      'Advanced tablet technology for seamless content creation and consumption.'
    ],
    audio: [
      'Exceptional audio quality with premium drivers and advanced acoustic engineering.',
      'Immersive sound experience designed for audiophiles and music enthusiasts.',
      'Professional-grade audio equipment delivering crystal-clear sound reproduction.',
      'Premium audio solution combining comfort, style, and superior sound quality.'
    ],
    smartwatches: [
      'Smart wearable technology for health monitoring and connected lifestyle.',
      'Advanced fitness tracking with comprehensive health insights and smart features.',
      'Elegant smartwatch combining style with cutting-edge health and fitness technology.',
      'Intelligent wearable designed for active individuals who value health and connectivity.'
    ],
    cameras: [
      'Professional imaging solution for capturing life\'s most precious moments.',
      'Advanced camera technology delivering exceptional image quality and creative control.',
      'Premium photography equipment designed for enthusiasts and professionals.',
      'Cutting-edge imaging system with superior optics and innovative features.'
    ],
    gaming: [
      'High-performance gaming equipment designed for competitive and casual gamers.',
      'Premium gaming gear engineered for precision, speed, and immersive experiences.',
      'Professional gaming solution combining performance with ergonomic design.',
      'Advanced gaming technology for enhanced gameplay and competitive advantage.'
    ],
    hometech: [
      'Smart home solution designed to enhance convenience and connectivity.',
      'Intelligent home technology for modern living and automated control.',
      'Advanced home automation device with seamless integration and user-friendly interface.',
      'Smart home innovation combining functionality with elegant design.'
    ],
    accessories: [
      'Essential accessory designed to enhance and protect your valuable devices.',
      'Premium accessory combining functionality with stylish design and durability.',
      'High-quality accessory engineered for reliability and optimal performance.',
      'Innovative accessory solution for modern device users and tech enthusiasts.'
    ]
  };

  const categoryDescriptions = descriptions[category] || descriptions.smartphones;
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
};

const getRandomFeatures = (features: string[], count: number): string[] => {
  const shuffled = [...features].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateSpecifications = (category: string, subcategory: string): Record<string, string> => {
  const specs: Record<string, Record<string, string[]>> = {
    smartphones: {
      'Display': ['6.1" OLED', '6.7" AMOLED', '6.4" Super AMOLED', '5.8" Retina'],
      'Processor': ['Snapdragon 8 Gen 3', 'A17 Pro', 'MediaTek Dimensity 9300', 'Exynos 2400'],
      'RAM': ['8GB', '12GB', '16GB', '6GB'],
      'Storage': ['128GB', '256GB', '512GB', '1TB'],
      'Camera': ['50MP Triple', '108MP Quad', '64MP Dual', '48MP Triple']
    },
    laptops: {
      'Processor': ['Intel Core i7', 'AMD Ryzen 7', 'Apple M3', 'Intel Core i5'],
      'RAM': ['16GB DDR5', '32GB DDR5', '8GB DDR4', '64GB DDR5'],
      'Storage': ['512GB SSD', '1TB SSD', '2TB SSD', '256GB SSD'],
      'Display': ['15.6" FHD', '14" 4K OLED', '16" Retina', '13.3" QHD'],
      'Graphics': ['RTX 4060', 'RTX 4070', 'Integrated', 'RTX 4080']
    },
    audio: {
      'Driver': ['40mm Dynamic', '50mm Planar', '10mm Dynamic', '30mm Neodymium'],
      'Frequency': ['20Hz-20kHz', '5Hz-40kHz', '10Hz-22kHz', '15Hz-25kHz'],
      'Battery': ['30 hours', '40 hours', '20 hours', '50 hours'],
      'Connectivity': ['Bluetooth 5.3', 'Wired + Wireless', 'USB-C', 'Bluetooth 5.2']
    }
  };

  const categorySpecs = specs[category] || specs.smartphones;
  const result: Record<string, string> = {};

  Object.entries(categorySpecs).forEach(([key, values]) => {
    result[key] = values[Math.floor(Math.random() * values.length)];
  });

  return result;
};

const getImageUrl = (category: string): string => {
  const imageUrls: Record<string, string> = {
    smartphones: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    laptops: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    tablets: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    audio: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg',
    smartwatches: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    cameras: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    gaming: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg',
    hometech: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg',
    accessories: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'
  };

  return imageUrls[category] || imageUrls.smartphones;
};

const generateTags = (category: string, subcategory: string, brand: string): string[] => {
  const baseTags = [category.toLowerCase(), subcategory.toLowerCase(), brand.toLowerCase()];
  const additionalTags = ['tech', 'electronics', 'gadget', 'innovation', 'premium', 'latest'];
  
  return [...baseTags, ...additionalTags.slice(0, 2)];
};

// Generate and export all products
export const allProducts = generateProducts();