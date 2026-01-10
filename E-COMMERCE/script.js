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
      "https://images.unsplash.com/photo-1626862025982-ae5dacfdeff6?q=80&w=3130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
}

// Load data from localStorage
function loadDataFromStorage() {
  const storedProducts = localStorage.getItem("products")
  const storedCart = localStorage.getItem("cart")
  const storedOrders = localStorage.getItem("orders")

  if (storedProducts) {
    products = JSON.parse(storedProducts)
  }

  if (storedCart) {
    cart = JSON.parse(storedCart)
  }

  if (storedOrders) {
    orders = JSON.parse(storedOrders)
  }
}

// Save data to localStorage
function saveDataToStorage() {
  localStorage.setItem("products", JSON.stringify(products))
  localStorage.setItem("cart", JSON.stringify(cart))
  localStorage.setItem("orders", JSON.stringify(orders))
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
}

// Initialize the application
document.addEventListener("DOMContentLoaded", init)
