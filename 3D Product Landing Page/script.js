// Sample product data
let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Premium wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    description: "Track your fitness and stay connected with this smart watch.",
  },
  {
    id: 3,
    name: "Men's T-Shirt",
    category: "clothing",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    description: "Comfortable cotton t-shirt for everyday wear.",
  },
  {
    id: 4,
    name: "Women's Jeans",
    category: "clothing",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    description: "High-quality denim jeans with perfect fit.",
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "home",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1570286424908-f8024bd34d34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZSUyMG1ha2VyfGVufDB8fDB8fHww",
    description: "Brew delicious coffee at home with this easy-to-use coffee maker.",
  },
  {
    id: 6,
    name: "Blender",
    category: "home",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Powerful blender for smoothies and food preparation.",
  },
  {
    id: 7,
    name: "Smartphone",
    category: "electronics",
    price: 699.99,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Latest smartphone with advanced camera and long battery life.",
  },
  {
    id: 8,
    name: "Dress Shirt",
    category: "clothing",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoaXJ0fGVufDB8fDB8fHww",
    description: "Elegant dress shirt for formal occasions.",
  },
]

// Sample orders data
let orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-05-20",
    total: 149.98,
    status: "Delivered",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 2 },
    ],
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-05-22",
    total: 279.98,
    status: "Processing",
    items: [
      { productId: 2, quantity: 1 },
      { productId: 5, quantity: 1 },
    ],
  },
]

// Cart data
let cart = []

// Admin credentials (in a real app, this would be handled securely on a server)
const adminCredentials = {
  username: "admin",
  password: "admin123",
}

// DOM Elements
const productsGrid = document.getElementById("products-grid")
const productsTitle = document.getElementById("products-title")
const cartSidebar = document.getElementById("cart-sidebar")
const cartItems = document.getElementById("cart-items")
const cartCount = document.getElementById("cart-count")
const cartTotalPrice = document.getElementById("cart-total-price")
const checkoutTotalPrice = document.getElementById("checkout-total-price")
const checkoutItems = document.getElementById("checkout-items")
const overlay = document.getElementById("overlay")
const checkoutModal = document.getElementById("checkout-modal")
const confirmationModal = document.getElementById("confirmation-modal")
const adminLoginModal = document.getElementById("admin-login-modal")
const adminDashboard = document.getElementById("admin-dashboard")
const productFormModal = document.getElementById("product-form-modal")
const adminProductsTable = document.getElementById("admin-products-table")
const adminOrdersTable = document.getElementById("admin-orders-table")

// Application State
let currentUser = null
let currentChat = null
let users = []
let rooms = []
let messages = {}
const typingUsers = new Set()

// Sample data for demonstration
const sampleUsers = [
  { id: 1, username: "alice", email: "alice@example.com", password: "password123", online: true },
  { id: 2, username: "bob", email: "bob@example.com", password: "password123", online: true },
  { id: 3, username: "charlie", email: "charlie@example.com", password: "password123", online: false },
  { id: 4, username: "diana", email: "diana@example.com", password: "password123", online: true },
]

const sampleRooms = [
  { id: 1, name: "General", description: "General discussion", private: false, members: [1, 2, 3, 4] },
  { id: 2, name: "Random", description: "Random conversations", private: false, members: [1, 2, 4] },
  { id: 3, name: "Tech Talk", description: "Technology discussions", private: false, members: [1, 3] },
]

// Initialize the application
function init() {
  // Load data from localStorage if available
  loadDataFromStorage()

  // Display all products initially
  displayProducts("all")

  // Update cart count
  updateCartCount()

  // Set up event listeners
  setupEventListeners()

  // Add sample data if none exists
  if (users.length === 0) {
    users = [...sampleUsers]
    rooms = [...sampleRooms]
    saveDataToStorage()
  }

  // Simulate real-time updates
  startSimulatedRealTime()
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initAnimations()
  initInteractions()
  initScrollEffects()
})

// Initialize all animations
function initAnimations() {
  // Hero animations
  animateHero()

  // Section animations
  animateAboutSection()
  animateProcessSection()
  animateFlavorsSection()
  animateParallaxSection()

  // Floating elements
  animateFloatingElements()
}

// Hero section animations
function animateHero() {
  const tl = gsap.timeline()

  // Animate title lines
  tl.to(".title-line", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  })
    .to(
      ".hero-subtitle",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .to(
      ".hero-buttons",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    )

  // Animate beer bottle
  gsap.fromTo(
    ".beer-bottle",
    {
      y: 100,
      opacity: 0,
      rotationY: -30,
    },
    {
      y: 0,
      opacity: 1,
      rotationY: -15,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    },
  )

  // Parallax effect for hero elements
  gsap.to(".beer-bottle-container", {
    y: -100,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })

  gsap.to(".hero-text", {
    y: -50,
    opacity: 0.5,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })
}

// About section animations
function animateAboutSection() {
  gsap.fromTo(
    ".about-text",
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".about-image-container",
    {
      x: 100,
      opacity: 0,
      rotationY: -20,
    },
    {
      x: 0,
      opacity: 1,
      rotationY: -10,
      duration: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animate features
  gsap.fromTo(
    ".feature",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".about-features",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    },
  )
}

// Process section animations
function animateProcessSection() {
  gsap.fromTo(
    ".step",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animate step numbers
  gsap.fromTo(
    ".step-number",
    {
      scale: 0,
      rotation: 180,
    },
    {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    },
  )
}

// Flavors section animations
function animateFlavorsSection() {
  gsap.fromTo(
    ".flavor-card",
    {
      y: 100,
      opacity: 0,
      rotationX: 45,
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".flavors-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  )
}

// Parallax section animations
function animateParallaxSection() {
  // Animate bottles in parallax section
  gsap.to(".bottle-1", {
    y: -100,
    rotation: 360,
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })

  gsap.to(".bottle-2", {
    y: -150,
    rotation: -360,
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  })

  gsap.to(".bottle-3", {
    y: -80,
    rotation: 180,
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
    },
  })

  // Parallax content animation
  gsap.fromTo(
    ".parallax-content",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  )
}

// Floating elements animations
function animateFloatingElements() {
  // Continuous floating animation for hops
  gsap.to(".hop", {
    y: -20,
    rotation: 10,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    stagger: {
      each: 1,
      repeat: -1,
    },
  })

  // Bubble animations
  gsap.set(".bubble", { y: "100vh" })

  gsap.to(".bubble", {
    y: "-100vh",
    duration: 4,
    ease: "none",
    repeat: -1,
    stagger: {
      each: 1,
      repeat: -1,
    },
  })
}

// Initialize scroll effects
function initScrollEffects() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        })
      }
    })
  })

  // Navbar background on scroll
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: {
      className: "scrolled",
      targets: ".navbar",
    },
  })

  // Parallax background elements
  gsap.to(".hero-bg", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })

  // Section reveal animations
  gsap.utils.toArray("section").forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0.8,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// Initialize interactions
function initInteractions() {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Beer bottle hover effect
  const beerBottle = document.querySelector(".beer-bottle")
  if (beerBottle) {
    beerBottle.addEventListener("mouseenter", () => {
      gsap.to(beerBottle, {
        scale: 1.1,
        rotationY: -5,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    beerBottle.addEventListener("mouseleave", () => {
      gsap.to(beerBottle, {
        scale: 1,
        rotationY: -15,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  }

  // Flavor card interactions
  document.querySelectorAll(".flavor-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Button hover effects
  document.querySelectorAll(".btn-primary, .btn-secondary, .cta-button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        y: -3,
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      })
    })

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    })
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Animate form submission
      gsap.to(contactForm, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Show success message (you can customize this)
          alert("Thank you for your message! We'll get back to you soon.")
          contactForm.reset()
        },
      })
    })
  }
}

// Mouse movement parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  // Parallax effect for floating elements
  gsap.to(".hop", {
    x: (mouseX - 0.5) * 20,
    y: (mouseY - 0.5) * 20,
    duration: 1,
    ease: "power2.out",
  })

  // Parallax effect for beer bottle
  gsap.to(".beer-bottle-container", {
    rotationY: -15 + (mouseX - 0.5) * 10,
    rotationX: 5 + (mouseY - 0.5) * 10,
    duration: 1,
    ease: "power2.out",
  })
})

// Resize handler
window.addEventListener("resize", () => {
  ScrollTrigger.refresh()
})

// Loading animation
window.addEventListener("load", () => {
  gsap.to(".hero", {
    opacity: 1,
    duration: 0.5,
  })
})

// Add CSS class for scrolled navbar
const style = document.createElement("style")
style.textContent = `
    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.98) !important;
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`
document.head.appendChild(style)

// Load data from localStorage
function loadDataFromStorage() {
  const storedProducts = localStorage.getItem("products")
  const storedCart = localStorage.getItem("cart")
  const storedOrders = localStorage.getItem("orders")
  const storedUsers = localStorage.getItem("chatapp_users")
  const storedRooms = localStorage.getItem("chatapp_rooms")
  const storedMessages = localStorage.getItem("chatapp_messages")
  const storedCurrentUser = localStorage.getItem("chatapp_current_user")

  if (storedProducts) {
    products = JSON.parse(storedProducts)
  }

  if (storedCart) {
    cart = JSON.parse(storedCart)
  }

  if (storedOrders) {
    orders = JSON.parse(storedOrders)
  }

  if (storedUsers) users = JSON.parse(storedUsers)
  if (storedRooms) rooms = JSON.parse(storedRooms)
  if (storedMessages) messages = JSON.parse(storedMessages)
  if (storedCurrentUser) {
    currentUser = JSON.parse(storedCurrentUser)
    showChatPage()
  }
}

// Save data to localStorage
function saveDataToStorage() {
  localStorage.setItem("products", JSON.stringify(products))
  localStorage.setItem("cart", JSON.stringify(cart))
  localStorage.setItem("orders", JSON.stringify(orders))
  localStorage.setItem("chatapp_users", JSON.stringify(users))
  localStorage.setItem("chatapp_rooms", JSON.stringify(rooms))
  localStorage.setItem("chatapp_messages", JSON.stringify(messages))
  if (currentUser) {
    localStorage.setItem("chatapp_current_user", JSON.stringify(currentUser))
  }
}

// Set up event listeners
function setupEventListeners() {
  // Category links
  document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const category = e.target.dataset.category
      displayProducts(category)
    })
  })

  // Cart button
  document.getElementById("cart-btn").addEventListener("click", toggleCart)

  // Close cart
  document.getElementById("close-cart").addEventListener("click", toggleCart)

  // Checkout button
  document.getElementById("checkout-btn").addEventListener("click", openCheckoutModal)

  // Close checkout modal
  document.getElementById("close-checkout").addEventListener("click", closeCheckoutModal)

  // Checkout form submission
  document.getElementById("checkout-form").addEventListener("submit", processOrder)

  // Close confirmation modal
  document.querySelectorAll(".close-confirmation").forEach((btn) => {
    btn.addEventListener("click", closeConfirmationModal)
  })

  // Admin link
  document.getElementById("admin-link").addEventListener("click", (e) => {
    e.preventDefault()
    openAdminLoginModal()
  })

  // Close admin login modal
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", closeAllModals)
  })

  // Admin login form
  document.getElementById("admin-login-form").addEventListener("submit", (e) => {
    e.preventDefault()
    loginAdmin()
  })

  // Admin logout
  document.getElementById("admin-logout").addEventListener("click", (e) => {
    e.preventDefault()
    logoutAdmin()
  })

  // Admin navigation
  document.querySelectorAll(".admin-nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = e.target.dataset.section
      showAdminSection(section)
    })
  })

  // Add product button
  document.getElementById("add-product-btn").addEventListener("click", openAddProductModal)

  // Product form submission
  document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault()
    saveProduct()
  })

  // Overlay click
  overlay.addEventListener("click", closeAllModals)

  // Auth form switching
  document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault()
    showSignupForm()
  })

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault()
    showLoginForm()
  })

  // Auth form submissions
  document.getElementById("login").addEventListener("submit", handleLogin)
  document.getElementById("signup").addEventListener("submit", handleSignup)

  // Chat functionality
  document.getElementById("logout-btn").addEventListener("click", handleLogout)
  document.getElementById("create-room-btn").addEventListener("click", showCreateRoomModal)
  document.getElementById("start-dm-btn").addEventListener("click", showStartDMModal)
  document.getElementById("chat-settings-btn").addEventListener("click", showChatSettingsModal)

  // Message input
  document.getElementById("message-input").addEventListener("keypress", handleMessageKeyPress)
  document.getElementById("message-input").addEventListener("input", handleTyping)
  document.getElementById("send-btn").addEventListener("click", sendMessage)

  // Modal forms
  document.getElementById("create-room-form").addEventListener("submit", handleCreateRoom)
  document.getElementById("dm-search").addEventListener("input", handleUserSearch)

  // Modal close buttons
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", closeAllModals)
  })

  document.getElementById("overlay").addEventListener("click", closeAllModals)
}

// Display products based on category
function displayProducts(category) {
  productsGrid.innerHTML = ""

  let filteredProducts = products
  if (category !== "all") {
    filteredProducts = products.filter((product) => product.category === category)
  }

  // Update title
  productsTitle.textContent = category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <p>No products found in this category.</p>
      </div>
    `
    return
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `

    productsGrid.appendChild(productCard)

    // Add event listener to the "Add to Cart" button
    productCard.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(product.id)
    })
  })
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    })
  }

  updateCartCount()
  updateCartDisplay()
  saveDataToStorage()

  // Show cart
  cartSidebar.classList.add("open")
  overlay.classList.add("active")
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems
}

// Update cart display
function updateCartDisplay() {
  cartItems.innerHTML = ""

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty.</p>
      </div>
    `
    cartTotalPrice.textContent = "$0.00"
    return
  }

  let total = 0

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return

    const itemTotal = product.price * item.quantity
    total += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${product.name}</h4>
        <p class="cart-item-price">$${product.price.toFixed(2)}</p>
        <div class="cart-item-actions">
          <button class="quantity-btn decrease" data-id="${product.id}">-</button>
          <span class="cart-item-quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${product.id}">+</button>
          <button class="remove-item" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `

    cartItems.appendChild(cartItem)

    // Add event listeners
    cartItem.querySelector(".decrease").addEventListener("click", () => {
      updateCartItemQuantity(product.id, -1)
    })

    cartItem.querySelector(".increase").addEventListener("click", () => {
      updateCartItemQuantity(product.id, 1)
    })

    cartItem.querySelector(".remove-item").addEventListener("click", () => {
      removeFromCart(product.id)
    })
  })

  cartTotalPrice.textContent = `$${total.toFixed(2)}`
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
  const item = cart.find((item) => item.productId === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
  } else {
    updateCartCount()
    updateCartDisplay()
    saveDataToStorage()
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId)
  updateCartCount()
  updateCartDisplay()
  saveDataToStorage()
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("open")
  overlay.classList.toggle("active")
}

// Open checkout modal
function openCheckoutModal() {
  if (cart.length === 0) return

  toggleCart()
  checkoutModal.classList.add("open")
  overlay.classList.add("active")

  // Update checkout items
  updateCheckoutDisplay()
}

// Update checkout display
function updateCheckoutDisplay() {
  checkoutItems.innerHTML = ""

  let total = 0

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return

    const itemTotal = product.price * item.quantity
    total += itemTotal

    const checkoutItem = document.createElement("div")
    checkoutItem.className = "checkout-item"
    checkoutItem.innerHTML = `
      <span>${product.name} x ${item.quantity}</span>
      <span>$${itemTotal.toFixed(2)}</span>
    `

    checkoutItems.appendChild(checkoutItem)
  })

  checkoutTotalPrice.textContent = `$${total.toFixed(2)}`
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.classList.remove("open")
  overlay.classList.remove("active")
}

// Process order
function processOrder(e) {
  e.preventDefault()

  if (cart.length === 0) return

  const form = e.target
  const name = form.name.value
  const email = form.email.value
  const address = form.address.value

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  // Generate order ID
  const orderId = `ORD-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`

  // Create order
  const order = {
    id: orderId,
    customer: name,
    email: email,
    address: address,
    date: new Date().toISOString().split("T")[0],
    total: total,
    status: "Processing",
    items: [...cart],
  }

  // Add order to orders
  orders.push(order)

  // Clear cart
  cart = []
  updateCartCount()
  saveDataToStorage()

  // Show confirmation
  document.getElementById("order-id").textContent = orderId
  checkoutModal.classList.remove("open")
  confirmationModal.classList.add("open")
}

// Close confirmation modal
function closeConfirmationModal() {
  confirmationModal.classList.remove("open")
  overlay.classList.remove("active")
}

// Open admin login modal
function openAdminLoginModal() {
  adminLoginModal.classList.add("open")
  overlay.classList.add("active")
}

// Login admin
function loginAdmin() {
  const username = document.getElementById("admin-username").value
  const password = document.getElementById("admin-password").value

  if (username === adminCredentials.username && password === adminCredentials.password) {
    adminLoginModal.classList.remove("open")
    adminDashboard.classList.add("open")

    // Load admin data
    loadAdminProducts()
    loadAdminOrders()
  } else {
    alert("Invalid credentials. Please try again.")
  }
}

// Logout admin
function logoutAdmin() {
  adminDashboard.classList.remove("open")
  overlay.classList.remove("active")
}

// Show admin section
function showAdminSection(section) {
  document.querySelectorAll(".admin-section").forEach((s) => {
    s.classList.remove("active")
  })

  document.querySelectorAll(".admin-nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  document.getElementById(`admin-${section}`).classList.add("active")
  document.querySelector(`.admin-nav-link[data-section="${section}"]`).classList.add("active")
}

// Load admin products
function loadAdminProducts() {
  adminProductsTable.innerHTML = ""

  products.forEach((product) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${product.id}</td>
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <div class="table-actions">
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      </td>
    `

    adminProductsTable.appendChild(row)

    // Add event listeners
    row.querySelector(".edit-btn").addEventListener("click", () => {
      openEditProductModal(product.id)
    })

    row.querySelector(".delete-btn").addEventListener("click", () => {
      deleteProduct(product.id)
    })
  })
}

// Load admin orders
function loadAdminOrders() {
  adminOrdersTable.innerHTML = ""

  orders.forEach((order) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td>${order.status}</td>
      <td>
        <div class="table-actions">
          <button class="view-btn" data-id="${order.id}">View</button>
        </div>
      </td>
    `

    adminOrdersTable.appendChild(row)

    // Add event listeners
    row.querySelector(".view-btn").addEventListener("click", () => {
      alert(
        `Order Details for ${order.id}:\n\nCustomer: ${order.customer}\nEmail: ${order.email}\nDate: ${order.date}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}`,
      )
    })
  })
}

// Open add product modal
function openAddProductModal() {
  document.getElementById("product-form-title").textContent = "Add New Product"
  document.getElementById("product-form").reset()
  document.getElementById("product-id").value = ""

  productFormModal.classList.add("open")
  overlay.classList.add("active")
}

// Open edit product modal
function openEditProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  document.getElementById("product-form-title").textContent = "Edit Product"
  document.getElementById("product-id").value = product.id
  document.getElementById("product-name").value = product.name
  document.getElementById("product-category").value = product.category
  document.getElementById("product-price").value = product.price
  document.getElementById("product-image").value = product.image
  document.getElementById("product-description").value = product.description

  productFormModal.classList.add("open")
  overlay.classList.add("active")
}

// Save product
function saveProduct() {
  const form = document.getElementById("product-form")
  const productId = document.getElementById("product-id").value

  const productData = {
    name: form.querySelector("#product-name").value,
    category: form.querySelector("#product-category").value,
    price: Number.parseFloat(form.querySelector("#product-price").value),
    image: form.querySelector("#product-image").value,
    description: form.querySelector("#product-description").value,
  }

  if (productId) {
    // Edit existing product
    const index = products.findIndex((p) => p.id === Number.parseInt(productId))
    if (index !== -1) {
      products[index] = { ...products[index], ...productData }
    }
  } else {
    // Add new product
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    products.push({
      id: newId,
      ...productData,
    })
  }

  saveDataToStorage()
  loadAdminProducts()
  displayProducts("all")

  productFormModal.classList.remove("open")
  overlay.classList.remove("active")
}

// Delete product
function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== productId)

    // Also remove from cart if present
    cart = cart.filter((item) => item.productId !== productId)

    saveDataToStorage()
    loadAdminProducts()
    displayProducts("all")
    updateCartCount()
    updateCartDisplay()
  }
}

// Close all modals
function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("open")
  })

  overlay.classList.remove("active")
  cartSidebar.classList.remove("open")

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("show")
  })
  document.getElementById("overlay").classList.remove("show")
}

// Authentication functions
function showLoginForm() {
  document.getElementById("login-form").classList.add("active")
  document.getElementById("signup-form").classList.remove("active")
}

function showSignupForm() {
  document.getElementById("login-form").classList.remove("active")
  document.getElementById("signup-form").classList.add("active")
}

function handleLogin(e) {
  e.preventDefault()
  const username = document.getElementById("login-username").value
  const password = document.getElementById("login-password").value

  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    currentUser = user
    user.online = true
    saveDataToStorage()
    showChatPage()
    showNotification("Welcome back!", `Logged in as ${user.username}`, "success")
  } else {
    showNotification("Login Failed", "Invalid username or password", "error")
  }
}

function handleSignup(e) {
  e.preventDefault()
  const username = document.getElementById("signup-username").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value
  const confirmPassword = document.getElementById("signup-confirm").value

  // Validation
  if (password !== confirmPassword) {
    showNotification("Signup Failed", "Passwords do not match", "error")
    return
  }

  if (users.find((u) => u.username === username)) {
    showNotification("Signup Failed", "Username already exists", "error")
    return
  }

  if (users.find((u) => u.email === email)) {
    showNotification("Signup Failed", "Email already registered", "error")
    return
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    online: true,
  }

  users.push(newUser)
  currentUser = newUser

  // Add user to general room
  const generalRoom = rooms.find((r) => r.name === "General")
  if (generalRoom && !generalRoom.members.includes(newUser.id)) {
    generalRoom.members.push(newUser.id)
  }

  saveDataToStorage()
  showChatPage()
  showNotification("Account Created!", `Welcome to ChatApp, ${username}!`, "success")
}

function handleLogout() {
  if (currentUser) {
    currentUser.online = false
    saveDataToStorage()
  }
  currentUser = null
  currentChat = null
  localStorage.removeItem("chatapp_current_user")
  showAuthPage()
  showNotification("Logged Out", "You have been logged out successfully", "success")
}

// Page navigation
function showAuthPage() {
  document.getElementById("auth-page").classList.add("active")
  document.getElementById("chat-page").classList.remove("active")
}

function showChatPage() {
  document.getElementById("auth-page").classList.remove("active")
  document.getElementById("chat-page").classList.add("active")

  updateUserInfo()
  loadChatList()
  enableMessageInput(false)
}

// Chat functionality
function updateUserInfo() {
  if (currentUser) {
    document.getElementById("current-username").textContent = currentUser.username
    document.getElementById("user-initial").textContent = currentUser.username.charAt(0).toUpperCase()
  }
}

function loadChatList() {
  loadRoomsList()
  loadUsersList()
}

function loadRoomsList() {
  const roomsList = document.getElementById("rooms-list")
  roomsList.innerHTML = ""

  const userRooms = rooms.filter((room) => room.members.includes(currentUser.id))

  userRooms.forEach((room) => {
    const roomElement = createChatItem(room, "room")
    roomsList.appendChild(roomElement)
  })
}

function loadUsersList() {
  const usersList = document.getElementById("users-list")
  usersList.innerHTML = ""

  const otherUsers = users.filter((user) => user.id !== currentUser.id)

  otherUsers.forEach((user) => {
    const userElement = createChatItem(user, "user")
    usersList.appendChild(userElement)
  })
}

function createChatItem(item, type) {
  const chatItem = document.createElement("div")
  chatItem.className = "chat-item"
  chatItem.dataset.type = type
  chatItem.dataset.id = item.id

  const isRoom = type === "room"
  const name = isRoom ? item.name : item.username
  const subtitle = isRoom ? `${item.members.length} members` : item.online ? "Online" : "Offline"
  const avatar = name.charAt(0).toUpperCase()

  // Get unread count
  const chatId = isRoom
    ? `room_${item.id}`
    : `dm_${Math.min(currentUser.id, item.id)}_${Math.max(currentUser.id, item.id)}`
  const unreadCount = getUnreadCount(chatId)

  chatItem.innerHTML = `
    <div class="chat-item-info">
      <div class="chat-item-avatar">${avatar}</div>
      <div class="chat-item-details">
        <h5>${name}</h5>
        <div class="chat-item-meta">
          <span>${subtitle}</span>
          ${unreadCount > 0 ? `<span class="unread-count">${unreadCount}</span>` : ""}
        </div>
      </div>
    </div>
  `

  chatItem.addEventListener("click", () => openChat(item, type))

  return chatItem
}

function openChat(item, type) {
  // Update active chat item
  document.querySelectorAll(".chat-item").forEach((el) => el.classList.remove("active"))
  document.querySelector(`[data-type="${type}"][data-id="${item.id}"]`).classList.add("active")

  currentChat = { item, type }

  // Update chat header
  const isRoom = type === "room"
  const name = isRoom ? item.name : item.username
  const subtitle = isRoom ? item.description : item.online ? "Online" : "Last seen recently"

  document.getElementById("chat-title").textContent = name
  document.getElementById("chat-subtitle").textContent = subtitle

  // Load messages
  loadMessages()

  // Enable message input
  enableMessageInput(true)

  // Mark as read
  const chatId = isRoom
    ? `room_${item.id}`
    : `dm_${Math.min(currentUser.id, item.id)}_${Math.max(currentUser.id, item.id)}`
  markAsRead(chatId)
}

function loadMessages() {
  const messagesContainer = document.getElementById("messages-container")
  messagesContainer.innerHTML = ""

  if (!currentChat) return

  const isRoom = currentChat.type === "room"
  const chatId = isRoom
    ? `room_${currentChat.item.id}`
    : `dm_${Math.min(currentUser.id, currentChat.item.id)}_${Math.max(currentUser.id, currentChat.item.id)}`

  const chatMessages = messages[chatId] || []

  chatMessages.forEach((message) => {
    const messageElement = createMessageElement(message)
    messagesContainer.appendChild(messageElement)
  })

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function createMessageElement(message) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${message.userId === currentUser.id ? "own" : ""}`

  const user = users.find((u) => u.id === message.userId)
  const avatar = user ? user.username.charAt(0).toUpperCase() : "?"
  const author = user ? user.username : "Unknown"

  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <div class="message-header">
        <span class="message-author">${author}</span>
        <span class="message-time">${formatTime(message.timestamp)}</span>
      </div>
      <div class="message-text">${escapeHtml(message.text)}</div>
    </div>
  `

  return messageDiv
}

function enableMessageInput(enabled) {
  const messageInput = document.getElementById("message-input")
  const sendBtn = document.getElementById("send-btn")

  messageInput.disabled = !enabled
  sendBtn.disabled = !enabled

  if (enabled) {
    messageInput.placeholder = "Type a message..."
    messageInput.focus()
  } else {
    messageInput.placeholder = "Select a chat to start messaging"
  }
}

function handleMessageKeyPress(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function sendMessage() {
  const messageInput = document.getElementById("message-input")
  const text = messageInput.value.trim()

  if (!text || !currentChat) return

  const isRoom = currentChat.type === "room"
  const chatId = isRoom
    ? `room_${currentChat.item.id}`
    : `dm_${Math.min(currentUser.id, currentChat.item.id)}_${Math.max(currentUser.id, currentChat.item.id)}`

  const message = {
    id: Date.now(),
    userId: currentUser.id,
    text: text,
    timestamp: new Date().toISOString(),
    chatId: chatId,
  }

  // Add message to storage
  if (!messages[chatId]) {
    messages[chatId] = []
  }
  messages[chatId].push(message)

  // Clear input
  messageInput.value = ""

  // Update UI
  const messageElement = createMessageElement(message)
  document.getElementById("messages-container").appendChild(messageElement)

  // Scroll to bottom
  const container = document.getElementById("messages-container")
  container.scrollTop = container.scrollHeight

  // Save to storage
  saveDataToStorage()

  // Simulate message delivery to other users
  simulateMessageDelivery(message)
}

function handleTyping() {
  if (!currentChat) return

  // Simulate typing indicator for other users
  showTypingIndicator()

  // Clear typing indicator after 2 seconds
  setTimeout(() => {
    hideTypingIndicator()
  }, 2000)
}

function showTypingIndicator() {
  const indicator = document.getElementById("typing-indicator")
  indicator.classList.add("show")
}

function hideTypingIndicator() {
  const indicator = document.getElementById("typing-indicator")
  indicator.classList.remove("show")
}

// Modal functions
function showCreateRoomModal() {
  document.getElementById("create-room-modal").classList.add("show")
  document.getElementById("overlay").classList.add("show")
}

function showStartDMModal() {
  document.getElementById("start-dm-modal").classList.add("show")
  document.getElementById("overlay").classList.add("show")
  loadAvailableUsers()
}

function showChatSettingsModal() {
  if (!currentChat) return

  document.getElementById("chat-settings-modal").classList.add("show")
  document.getElementById("overlay").classList.add("show")
  loadChatSettings()
}

function handleCreateRoom(e) {
  e.preventDefault()

  const name = document.getElementById("room-name").value
  const description = document.getElementById("room-description").value
  const isPrivate = document.getElementById("room-private").checked

  const newRoom = {
    id: rooms.length + 1,
    name: name,
    description: description,
    private: isPrivate,
    members: [currentUser.id],
    createdBy: currentUser.id,
    createdAt: new Date().toISOString(),
  }

  rooms.push(newRoom)
  saveDataToStorage()
  loadRoomsList()
  closeAllModals()

  showNotification("Room Created!", `${name} has been created successfully`, "success")

  // Reset form
  document.getElementById("create-room-form").reset()
}

function loadAvailableUsers() {
  const container = document.getElementById("available-users")
  container.innerHTML = ""

  const otherUsers = users.filter((user) => user.id !== currentUser.id)

  otherUsers.forEach((user) => {
    const userElement = document.createElement("div")
    userElement.className = "user-search-item"
    userElement.innerHTML = `
      <div class="user-search-avatar">${user.username.charAt(0).toUpperCase()}</div>
      <div class="user-search-info">
        <h5>${user.username}</h5>
        <span>${user.online ? "Online" : "Offline"}</span>
      </div>
    `

    userElement.addEventListener("click", () => {
      openChat(user, "user")
      closeAllModals()
    })

    container.appendChild(userElement)
  })
}

function handleUserSearch(e) {
  const searchTerm = e.target.value.toLowerCase()
  const userItems = document.querySelectorAll(".user-search-item")

  userItems.forEach((item) => {
    const username = item.querySelector("h5").textContent.toLowerCase()
    if (username.includes(searchTerm)) {
      item.style.display = "flex"
    } else {
      item.style.display = "none"
    }
  })
}

function loadChatSettings() {
  const container = document.getElementById("chat-settings-content")

  if (!currentChat) {
    container.innerHTML = "<p>No chat selected</p>"
    return
  }

  const isRoom = currentChat.type === "room"

  if (isRoom) {
    container.innerHTML = `
      <div class="form-group">
        <label>Room Name</label>
        <input type="text" value="${currentChat.item.name}" readonly>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea readonly>${currentChat.item.description}</textarea>
      </div>
      <div class="form-group">
        <label>Members (${currentChat.item.members.length})</label>
        <div class="members-list">
          ${currentChat.item.members
            .map((memberId) => {
              const member = users.find((u) => u.id === memberId)
              return member ? `<span class="member-tag">${member.username}</span>` : ""
            })
            .join("")}
        </div>
      </div>
    `
  } else {
    container.innerHTML = `
      <div class="form-group">
        <label>User</label>
        <input type="text" value="${currentChat.item.username}" readonly>
      </div>
      <div class="form-group">
        <label>Status</label>
        <input type="text" value="${currentChat.item.online ? "Online" : "Offline"}" readonly>
      </div>
    `
  }
}

// Utility functions
function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString()
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

function getUnreadCount(chatId) {
  // Simulate unread messages (in a real app, this would be tracked properly)
  return Math.floor(Math.random() * 3) // Random 0-2 unread messages
}

function markAsRead(chatId) {
  // In a real app, this would mark messages as read
  // For demo purposes, we'll just refresh the chat list
  setTimeout(() => {
    loadChatList()
  }, 100)
}

function showNotification(title, message, type = "info") {
  const container = document.getElementById("notification-container")

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `

  container.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove()
  }, 5000)
}

function simulateMessageDelivery(message) {
  // Simulate other users receiving the message
  // In a real app, this would be handled by WebSocket/Socket.io

  setTimeout(
    () => {
      // Simulate a response from another user occasionally
      if (Math.random() < 0.3 && currentChat.type === "room") {
        const otherUsers = users.filter(
          (u) => u.id !== currentUser.id && currentChat.item.members.includes(u.id) && u.online,
        )

        if (otherUsers.length > 0) {
          const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)]
          const responses = [
            "That's interesting!",
            "I agree!",
            "Thanks for sharing",
            "Good point",
            "Exactly!",
            "👍",
            "Nice!",
            "Cool!",
          ]

          const response = {
            id: Date.now() + 1,
            userId: randomUser.id,
            text: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toISOString(),
            chatId: message.chatId,
          }

          messages[message.chatId].push(response)

          // Update UI if we're still in the same chat
          if (
            currentChat &&
            ((currentChat.type === "room" && `room_${currentChat.item.id}` === message.chatId) ||
              (currentChat.type === "user" &&
                `dm_${Math.min(currentUser.id, currentChat.item.id)}_${Math.max(currentUser.id, currentChat.item.id)}` ===
                  message.chatId))
          ) {
            const messageElement = createMessageElement(response)
            document.getElementById("messages-container").appendChild(messageElement)

            const container = document.getElementById("messages-container")
            container.scrollTop = container.scrollHeight
          }

          saveDataToStorage()
        }
      }
    },
    1000 + Math.random() * 3000,
  ) // Random delay 1-4 seconds
}

function startSimulatedRealTime() {
  // Simulate users going online/offline
  setInterval(() => {
    users.forEach((user) => {
      if (user.id !== currentUser?.id) {
        // 10% chance to change online status
        if (Math.random() < 0.1) {
          user.online = !user.online
        }
      }
    })

    if (currentUser) {
      saveDataToStorage()
      loadUsersList()
    }
  }, 10000) // Every 10 seconds

  // Simulate typing indicators occasionally
  setInterval(() => {
    if (currentChat && Math.random() < 0.1) {
      showTypingIndicator()
      setTimeout(hideTypingIndicator, 2000)
    }
  }, 15000) // Every 15 seconds
}

// Initialize the application
document.addEventListener("DOMContentLoaded", init)
