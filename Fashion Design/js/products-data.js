// Products Database
const productsData = [
  {
    id: 1,
    title: "Elegant Evening Dress",
    category: "women",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=400&width=300&text=Evening+Dress",
    images: [
      "/placeholder.svg?height=600&width=400&text=Evening+Dress+1",
      "/placeholder.svg?height=600&width=400&text=Evening+Dress+2",
      "/placeholder.svg?height=600&width=400&text=Evening+Dress+3"
    ],
    description: "A stunning evening dress crafted from premium silk with intricate beadwork details.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "navy", "burgundy"],
    rating: 4.8,
    reviews: 124,
    badge: "Sale",
    featured: true,
    inStock: true,
    stockCount: 15
  },
  {
    id: 2,
    title: "Classic Tailored Suit",
    category: "men",
    price: 599.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Tailored+Suit",
    images: [
      "/placeholder.svg?height=600&width=400&text=Tailored+Suit+1",
      "/placeholder.svg?height=600&width=400&text=Tailored+Suit+2",
      "/placeholder.svg?height=600&width=400&text=Tailored+Suit+3"
    ],
    description: "Impeccably tailored suit made from finest Italian wool with modern slim fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["charcoal", "navy", "black"],
    rating: 4.9,
    reviews: 89,
    badge: "New",
    featured: true,
    inStock: true,
    stockCount: 8
  },
  {
    id: 3,
    title: "Luxury Leather Handbag",
    category: "accessories",
    price: 449.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Leather+Handbag",
    images: [
      "/placeholder.svg?height=600&width=400&text=Leather+Handbag+1",
      "/placeholder.svg?height=600&width=400&text=Leather+Handbag+2",
      "/placeholder.svg?height=600&width=400&text=Leather+Handbag+3"
    ],
    description: "Handcrafted leather handbag with gold-tone hardware and spacious interior.",
    sizes: ["One Size"],
    colors: ["black", "brown", "tan"],
    rating: 4.7,
    reviews: 156,
    badge: null,
    featured: true,
    inStock: true,
    stockCount: 22
  },
  {
    id: 4,
    title: "Designer High Heels",
    category: "shoes",
    price: 329.99,
    originalPrice: 429.99,
    image: "/placeholder.svg?height=400&width=300&text=High+Heels",
    images: [
      "/placeholder.svg?height=600&width=400&text=High+Heels+1",
      "/placeholder.svg?height=600&width=400&text=High+Heels+2",
      "/placeholder.svg?height=600&width=400&text=High+Heels+3"
    ],
    description: "Elegant high heels with comfortable cushioned sole and premium leather construction.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["black", "nude", "red"],
    rating: 4.6,
    reviews: 78,
    badge: "Sale",
    featured: false,
    inStock: true,
    stockCount: 12
  },
  {
    id: 5,
    title: "Cashmere Sweater",
    category: "women",
    price: 199.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Cashmere+Sweater",
    images: [
      "/placeholder.svg?height=600&width=400&text=Cashmere+Sweater+1",
      "/placeholder.svg?height=600&width=400&text=Cashmere+Sweater+2",
      "/placeholder.svg?height=600&width=400&text=Cashmere+Sweater+3"
    ],
    description: "Ultra-soft cashmere sweater with relaxed fit and timeless design.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["cream", "gray", "camel"],
    rating: 4.9,
    reviews: 203,
    badge: "Bestseller",
    featured: true,
    inStock: true,
    stockCount: 18
  },
  {
    id: 6,
    title: "Silk Scarf",
    category: "accessories",
    price: 89.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Silk+Scarf",
    images: [
      "/placeholder.svg?height=600&width=400&text=Silk+Scarf+1",
      "/placeholder.svg?height=600&width=400&text=Silk+Scarf+2",
      "/placeholder.svg?height=600&width=400&text=Silk+Scarf+3"
    ],
    description: "Luxurious silk scarf with hand-painted floral design and rolled edges.",
    sizes: ["One Size"],
    colors: ["floral", "geometric", "abstract"],
    rating: 4.5,
    reviews: 67,
    badge: null,
    featured: false,
    inStock: true,
    stockCount: 35
  },
  {
    id: 7,
    title: "Oxford Dress Shoes",
    category: "shoes",
    price: 399.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Oxford+Shoes",
    images: [
      "/placeholder.svg?height=600&width=400&text=Oxford+Shoes+1",
      "/placeholder.svg?height=600&width=400&text=Oxford+Shoes+2",
      "/placeholder.svg?height=600&width=400&text=Oxford+Shoes+3"
    ],
    description: "Classic Oxford dress shoes crafted from premium leather with Goodyear welt construction.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["black", "brown"],
    rating: 4.8,
    reviews: 145,
    badge: null,
    featured: true,
    inStock: true,
    stockCount: 9
  },
  {
    id: 8,
    title: "Designer Blazer",
    category: "women",
    price: 349.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Designer+Blazer",
    images: [
      "/placeholder.svg?height=600&width=400&text=Designer+Blazer+1",
      "/placeholder.svg?height=600&width=400&text=Designer+Blazer+2",
      "/placeholder.svg?height=600&width=400&text=Designer+Blazer+3"
    ],
    description: "Sophisticated blazer with structured shoulders and contemporary silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "navy", "white"],
    rating: 4.7,
    reviews: 92,
    badge: "New",
    featured: false,
    inStock: true,
    stockCount: 14
  },
  {
    id: 9,
    title: "Luxury Watch",
    category: "accessories",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=400&width=300&text=Luxury+Watch",
    images: [
      "/placeholder.svg?height=600&width=400&text=Luxury+Watch+1",
      "/placeholder.svg?height=600&width=400&text=Luxury+Watch+2",
      "/placeholder.svg?height=600&width=400&text=Luxury+Watch+3"
    ],
    description: "Swiss-made luxury watch with automatic movement and sapphire crystal.",
    sizes: ["One Size"],
    colors: ["gold", "silver", "rose-gold"],
    rating: 4.9,
    reviews: 234,
    badge: "Sale",
    featured: true,
    inStock: true,
    stockCount: 6
  },
  {
    id: 10,
    title: "Casual Polo Shirt",
    category: "men",
    price: 79.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Polo+Shirt",
    images: [
      "/placeholder.svg?height=600&width=400&text=Polo+Shirt+1",
      "/placeholder.svg?height=600&width=400&text=Polo+Shirt+2",
      "/placeholder.svg?height=600&width=400&text=Polo+Shirt+3"
    ],
    description: "Premium cotton polo shirt with classic fit and embroidered logo.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["white", "navy", "gray", "green"],
    rating: 4.4,
    reviews: 167,
    badge: null,
    featured: false,
    inStock: true,
    stockCount: 28
  },
  {
    id: 11,
    title: "Cocktail Dress",
    category: "women",
    price: 249.99,
    originalPrice: 329.99,
    image: "/placeholder.svg?height=400&width=300&text=Cocktail+Dress",
    images: [
      "/placeholder.svg?height=600&width=400&text=Cocktail+Dress+1",
      "/placeholder.svg?height=600&width=400&text=Cocktail+Dress+2",
      "/placeholder.svg?height=600&width=400&text=Cocktail+Dress+3"
    ],
    description: "Chic cocktail dress with flattering A-line silhouette and lace details.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "navy", "burgundy"],
    rating: 4.6,
    reviews: 89,
    badge: "Sale",
    featured: false,
    inStock: true,
    stockCount: 11
  },
  {
    id: 12,
    title: "Leather Wallet",
    category: "accessories",
    price: 129.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300&text=Leather+Wallet",
    images: [
      "/placeholder.svg?height=600&width=400&text=Leather+Wallet+1",
      "/placeholder.svg?height=600&width=400&text=Leather+Wallet+2",
      "/placeholder.svg?height=600&width=400&text=Leather+Wallet+3"
    ],
    description: "Handcrafted leather wallet with multiple card slots and bill compartments.",
    sizes: ["One Size"],
    colors: ["black", "brown", "cognac"],
    rating: 4.7,
    reviews: 198,
    badge: null,
    featured: false,
    inStock: true,
    stockCount: 42
  }
];

// Gallery Data
const galleryData = [
  {
    id: 1,
    title: "Spring Collection 2025",
    category: "collections",
    image: "/placeholder.svg?height=600&width=400&text=Spring+Collection",
    description: "Our latest spring collection featuring vibrant colors and flowing fabrics.",
    date: "2025-01-15"
  },
  {
    id: 2,
    title: "Milan Fashion Week",
    category: "runway",
    image: "/placeholder.svg?height=600&width=400&text=Milan+Runway",
    description: "Highlights from our Milan Fashion Week runway show.",
    date: "2024-12-10"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    category: "behind-scenes",
    image: "/placeholder.svg?height=600&width=400&text=Behind+Scenes",
    description: "A glimpse into our design process and atelier work.",
    date: "2024-11-20"
  },
  {
    id: 4,
    title: "Editorial Shoot",
    category: "editorial",
    image: "/placeholder.svg?height=600&width=400&text=Editorial+Shoot",
    description: "Fashion editorial featuring our luxury evening wear collection.",
    date: "2024-10-05"
  },
  {
    id: 5,
    title: "Autumn Elegance",
    category: "collections",
    image: "/placeholder.svg?height=600&width=400&text=Autumn+Collection",
    description: "Rich textures and warm tones define our autumn collection.",
    date: "2024-09-15"
  },
  {
    id: 6,
    title: "Paris Runway",
    category: "runway",
    image: "/placeholder.svg?height=600&width=400&text=Paris+Runway",
    description: "Our debut at Paris Fashion Week showcasing innovative designs.",
    date: "2024-08-22"
  }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productsData, galleryData };
}
