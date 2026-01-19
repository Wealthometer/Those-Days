// Shopping Cart Functionality

const productsData = [
  // Example product data
  {
    id: 1,
    title: "Product 1",
    price: 19.99,
    image: "product1.jpg",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
  },
  {
    id: 2,
    title: "Product 2",
    price: 29.99,
    image: "product2.jpg",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
  },
]

class ShoppingCart {
  constructor() {
    this.items = this.loadCart()
    this.init()
  }

  init() {
    this.updateCartUI()
    this.bindEvents()
  }

  bindEvents() {
    // Cart toggle
    const cartToggle = document.getElementById("cartToggle")
    const cartClose = document.getElementById("cartClose")
    const cartOverlay = document.getElementById("cartOverlay")

    if (cartToggle) {
      cartToggle.addEventListener("click", () => this.toggleCart())
    }

    if (cartClose) {
      cartClose.addEventListener("click", () => this.closeCart())
    }

    if (cartOverlay) {
      cartOverlay.addEventListener("click", () => this.closeCart())
    }

    // Add to cart buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart")) {
        e.preventDefault()
        const productId = Number.parseInt(e.target.closest(".product-card").dataset.productId)
        this.addToCart(productId)
      }

      // Quantity controls
      if (e.target.closest(".quantity-btn")) {
        const btn = e.target.closest(".quantity-btn")
        const action = btn.dataset.action
        const productId = Number.parseInt(btn.closest(".cart-item").dataset.productId)

        if (action === "increase") {
          this.updateQuantity(productId, this.getItemQuantity(productId) + 1)
        } else if (action === "decrease") {
          this.updateQuantity(productId, this.getItemQuantity(productId) - 1)
        }
      }

      // Remove item
      if (e.target.closest(".cart-item-remove")) {
        const productId = Number.parseInt(e.target.closest(".cart-item").dataset.productId)
        this.removeFromCart(productId)
      }
    })

    // Quantity input change
    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const productId = Number.parseInt(e.target.closest(".cart-item").dataset.productId)
        const quantity = Number.parseInt(e.target.value) || 1
        this.updateQuantity(productId, quantity)
      }
    })
  }

  addToCart(productId, quantity = 1, size = null, color = null) {
    const product = productsData.find((p) => p.id === productId)
    if (!product) return

    const existingItem = this.items.find((item) => item.id === productId && item.size === size && item.color === color)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({
        id: productId,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size || product.sizes[0],
        color: color || product.colors[0],
      })
    }

    this.saveCart()
    this.updateCartUI()
    this.showAddToCartNotification(product.title)
  }

  removeFromCart(productId, size = null, color = null) {
    this.items = this.items.filter((item) => !(item.id === productId && item.size === size && item.color === color))
    this.saveCart()
    this.updateCartUI()
  }

  updateQuantity(productId, quantity, size = null, color = null) {
    const item = this.items.find((item) => item.id === productId && item.size === size && item.color === color)

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId, size, color)
      } else {
        item.quantity = quantity
        this.saveCart()
        this.updateCartUI()
      }
    }
  }

  getItemQuantity(productId, size = null, color = null) {
    const item = this.items.find((item) => item.id === productId && item.size === size && item.color === color)
    return item ? item.quantity : 0
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  updateCartUI() {
    this.updateCartCount()
    this.updateCartItems()
    this.updateCartTotal()
  }

  updateCartCount() {
    const cartCounts = document.querySelectorAll(".cart-count")
    const totalItems = this.getTotalItems()

    cartCounts.forEach((count) => {
      count.textContent = totalItems
      count.style.display = totalItems > 0 ? "block" : "none"
    })
  }

  updateCartItems() {
    const cartItemsContainer = document.getElementById("cartItems")
    if (!cartItemsContainer) return

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
          <a href="products.html" class="btn btn-primary">Start Shopping</a>
        </div>
      `
      return
    }

    cartItemsContainer.innerHTML = this.items
      .map(
        (item) => `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-options">
            ${item.size ? `<span>Size: ${item.size}</span>` : ""}
            ${item.color ? `<span>Color: ${item.color}</span>` : ""}
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" data-action="decrease">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            <button class="quantity-btn" data-action="increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `,
      )
      .join("")
  }

  updateCartTotal() {
    const cartTotals = document.querySelectorAll("#cartTotal")
    const totalPrice = this.getTotalPrice()

    cartTotals.forEach((total) => {
      total.textContent = totalPrice.toFixed(2)
    })
  }

  toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar")
    const cartOverlay = document.getElementById("cartOverlay")

    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.toggle("active")
      cartOverlay.classList.toggle("active")
      document.body.style.overflow = cartSidebar.classList.contains("active") ? "hidden" : ""
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById("cartSidebar")
    const cartOverlay = document.getElementById("cartOverlay")

    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.remove("active")
      cartOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  showAddToCartNotification(productTitle) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = "cart-notification"
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>Added "${productTitle}" to cart</span>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--accent-color);
      color: var(--primary-color);
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-medium);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  saveCart() {
    localStorage.setItem("luxe_fashion_cart", JSON.stringify(this.items))
  }

  loadCart() {
    const saved = localStorage.getItem("luxe_fashion_cart")
    return saved ? JSON.parse(saved) : []
  }

  clearCart() {
    this.items = []
    this.saveCart()
    this.updateCartUI()
  }

  getCartData() {
    return {
      items: this.items,
      totalItems: this.getTotalItems(),
      totalPrice: this.getTotalPrice(),
    }
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.cart = new ShoppingCart()
})

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = ShoppingCart
}
