// Products Page JavaScript

import gsap from 'gsap';

class ProductsPage {
  constructor() {
    this.products = []
    this.filteredProducts = []
    this.currentPage =  1
    this.productsPerPage = 12
    this.currentView = 'grid'
    this.currentSort = 'featured'
    this.filters = {
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      inStock: false
    }
    
    this.init()
  }

  init() {
    this.loadProducts()
    this.setupEventListeners()
    this.setupFilters()
    this.renderProducts()
    this.updateResultsCount()
  }

  loadProducts() {
    // Load products from products-data.js
    this.products = window.productsData || []
    this.filteredProducts = [...this.products]
  }

  setupEventListeners() {
    // Filter toggle for mobile
    const filtersToggle = document.querySelector('.filters-toggle')
    const filtersSidebar = document.querySelector('.filters-sidebar')
    const filtersClose = document.querySelector('.filters-close')

    if (filtersToggle) {
      filtersToggle.addEventListener('click', () => {
        filtersSidebar.classList.add('active')
      })
    }

    if (filtersClose) {
      filtersClose.addEventListener('click', () => {
        filtersSidebar.classList.remove('active')
      })
    }

    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn')
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.target.dataset.view
        this.changeView(view)
      })
    })

    // Sort dropdown
    const sortSelect = document.querySelector('.sort-select')
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value
        this.sortProducts()
        this.renderProducts()
      })
    }

    // Clear filters
    const clearFilters = document.querySelector('.clear-filters')
    if (clearFilters) {
      clearFilters.addEventListener('click', () => {
        this.clearAllFilters()
      })
    }

    // Product actions
    document.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn[data-action="wishlist"]')) {
        this.toggleWishlist(e.target.closest('.action-btn'))
      }
      
      if (e.target.closest('.action-btn[data-action="quick-view"]')) {
        const productId = e.target.closest('.product-card').dataset.productId
        this.openQuickView(productId)
      }

      if (e.target.closest('.add-to-cart')) {
        const productId = e.target.closest('.product-card').dataset.productId
        this.addToCart(productId)
      }
    })

    // Quick view modal
    const quickViewModal = document.querySelector('.quick-view-modal')
    const modalClose = document.querySelector('.modal-close')
    const modalOverlay = document.querySelector('.modal-overlay')

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        this.closeQuickView()
      })
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => {
        this.closeQuickView()
      })
    }

    // Pagination
    document.addEventListener('click', (e) => {
      if (e.target.closest('.page-btn')) {
        const page = parseInt(e.target.closest('.page-btn').dataset.page)
        if (!isNaN(page)) {
          this.currentPage = page
          this.renderProducts()
          this.scrollToTop()
        }
      }
    })
  }

  setupFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('.filter-option input[data-filter="category"]')
    categoryFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateCategoryFilter(filter.value, filter.checked)
      })
    })

    // Color filters
    const colorFilters = document.querySelectorAll('.color-option input')
    colorFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateColorFilter(filter.value, filter.checked)
      })
    })

    // Size filters
    const sizeFilters = document.querySelectorAll('.filter-option input[data-filter="size"]')
    sizeFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateSizeFilter(filter.value, filter.checked)
      })
    })

    // Price range
    const priceRange = document.querySelector('.price-range input[type="range"]')
    if (priceRange) {
      priceRange.addEventListener('input', (e) => {
        this.updatePriceFilter(parseInt(e.target.value))
      })
    }

    // In stock filter
    const inStockFilter = document.querySelector('input[data-filter="in-stock"]')
    if (inStockFilter) {
      inStockFilter.addEventListener('change', () => {
        this.filters.inStock = inStockFilter.checked
        this.applyFilters()
      })
    }
  }

  updateCategoryFilter(category, checked) {
    if (checked) {
      this.filters.categories.push(category)
    } else {
      this.filters.categories = this.filters.categories.filter(c => c !== category)
    }
    this.applyFilters()
  }

  updateColorFilter(color, checked) {
    if (checked) {
      this.filters.colors.push(color)
    } else {
      this.filters.colors = this.filters.colors.filter(c => c !== color)
    }
    this.applyFilters()
  }

  updateSizeFilter(size, checked) {
    if (checked) {
      this.filters.sizes.push(size)
    } else {
      this.filters.sizes = this.filters.sizes.filter(s => s !== size)
    }
    this.applyFilters()
  }

  updatePriceFilter(maxPrice) {
    this.filters.priceRange[1] = maxPrice
    document.querySelector('.price-max').textContent = `$${maxPrice}`
    this.applyFilters()
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      // Category filter
      if (this.filters.categories.length > 0 && !this.filters.categories.includes(product.category)) {
        return false
      }

      // Color filter
      if (this.filters.colors.length > 0 && !this.filters.colors.some(color => product.colors.includes(color))) {
        return false
      }

      // Size filter
      if (this.filters.sizes.length > 0 && !this.filters.sizes.some(size => product.sizes.includes(size))) {
        return false
      }

      // Price filter
      if (product.price < this.filters.priceRange[0] || product.price > this.filters.priceRange[1]) {
        return false
      }

      // In stock filter
      if (this.filters.inStock && product.stock === 0) {
        return false
      }

      return true
    })

    this.currentPage = 1
    this.sortProducts()
    this.renderProducts()
    this.updateResultsCount()
  }

  sortProducts() {
    switch (this.currentSort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        this.filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        break
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - keep original order or custom logic
        break
    }
  }

  renderProducts() {
    const productsGrid = document.querySelector('.products-grid')
    if (!productsGrid) return

    // Show loading state
    productsGrid.innerHTML = '<div class="products-loading"><div class="loading-spinner"></div>Loading products...</div>'

    // Simulate loading delay
    setTimeout(() => {
      const startIndex = (this.currentPage - 1) * this.productsPerPage
      const endIndex = startIndex + this.productsPerPage
      const productsToShow = this.filteredProducts.slice(startIndex, endIndex)

      if (productsToShow.length === 0) {
        productsGrid.innerHTML = this.renderEmptyState()
        return
      }

      productsGrid.innerHTML = productsToShow.map(product => this.renderProductCard(product)).join('')
      this.renderPagination()
      
      // Animate product cards
      gsap.from('.product-card', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, 300)
  }

  renderProductCard(product) {
    const isWishlisted = this.isInWishlist(product.id)
    const discountPercentage = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

    return `
      <div class="product-card" data-product-id="${product.id}">
        ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
        ${discountPercentage > 0 ? `<div class="product-badge sale">-${discountPercentage}%</div>` : ''}
        
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-actions">
            <button class="action-btn ${isWishlisted ? 'liked' : ''}" data-action="wishlist" title="Add to Wishlist">
              <i class="fas fa-heart"></i>
            </button>
            <button class="action-btn" data-action="quick-view" title="Quick View">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn" data-action="compare" title="Compare">
              <i class="fas fa-balance-scale"></i>
            </button>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            ${this.renderStars(product.rating)}
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price">
            <span class="current-price">$${product.price}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
          </div>
          <div class="product-colors">
            ${product.colors.slice(0, 4).map(color => `<span class="color-dot" style="background-color: ${color}" title="${color}"></span>`).join('')}
            ${product.colors.length > 4 ? `<span class="color-more">+${product.colors.length - 4}</span>` : ''}
          </div>
          <button class="btn btn-primary add-to-cart" ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return `
      ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
      ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
      ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `
  }

  renderEmptyState() {
    return `
      <div class="empty-products">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
        <button class="btn btn-primary clear-filters">Clear All Filters</button>
      </div>
    `
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage)
    if (totalPages <= 1) return

    const paginationContainer = document.querySelector('.pagination')
    if (!paginationContainer) return

    let paginationHTML = ''

    // Previous button
    paginationHTML += `
      <button class="page-btn" data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
      </button>
    `

    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    if (startPage > 1) {
      paginationHTML += `<button class="page-btn" data-page="1">1</button>`
      if (startPage > 2) {
        paginationHTML += `<span class="page-ellipsis">...</span>`
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="page-ellipsis">...</span>`
      }
      paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`
    }

    // Next button
    paginationHTML += `
      <button class="page-btn" data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
      </button>
    `

    paginationContainer.innerHTML = paginationHTML
  }

  changeView(view) {
    this.currentView = view
    const productsGrid = document.querySelector('.products-grid')
    const viewBtns = document.querySelectorAll('.view-btn')

    // Update active button
    viewBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view)
    })

    // Update grid class
    productsGrid.className = `products-grid ${view}-view`
  }

  updateResultsCount() {
    const resultsCount = document.querySelector('.results-count')
    if (resultsCount) {
      const total = this.filteredProducts.length
      const startIndex = (this.currentPage - 1) * this.productsPerPage + 1
      const endIndex = Math.min(startIndex + this.productsPerPage - 1, total)
      
      resultsCount.textContent = total > 0 
        ? `Showing ${startIndex}-${endIndex} of ${total} products`
        : 'No products found'
    }
  }

  clearAllFilters() {
    // Reset filters
    this.filters = {
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      inStock: false
    }

    // Reset form inputs
    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(input => {
      input.checked = false
    })

    const priceRange = document.querySelector('.price-range input[type="range"]')
    if (priceRange) {
      priceRange.value = 1000
      document.querySelector('.price-max').textContent = '$1000'
    }

    // Apply filters
    this.applyFilters()
  }

  openQuickView(productId) {
    const product = this.products.find(p => p.id === parseInt(productId))
    if (!product) return

    const modal = document.querySelector('.quick-view-modal')
    const modalContent = modal.querySelector('.modal-content')

    modalContent.innerHTML = this.renderQuickViewContent(product)
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'

    // Setup quick view event listeners
    this.setupQuickViewListeners(product)
  }

  renderQuickViewContent(product) {
    return `
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-details">
        <h2>${product.name}</h2>
        <div class="modal-price">$${product.price}</div>
        <div class="product-rating">
          ${this.renderStars(product.rating)}
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        <p class="modal-description">${product.description || 'Premium quality product with excellent craftsmanship and attention to detail.'}</p>
        
        <div class="modal-options">
          <div class="option-group">
            <label>Size:</label>
            <div class="size-options">
              ${product.sizes.map(size => `
                <div class="size-option" data-size="${size}">${size}</div>
              `).join('')}
            </div>
          </div>
          
          <div class="option-group">
            <label>Color:</label>
            <div class="color-options-modal">
              ${product.colors.map(color => `
                <div class="color-option-modal" data-color="${color}" style="background-color: ${color}" title="${color}"></div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button class="quantity-btn" data-action="decrease">-</button>
            <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
            <button class="quantity-btn" data-action="increase">+</button>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="btn btn-primary add-to-cart-modal" data-product-id="${product.id}">
            Add to Cart
          </button>
          <button class="btn btn-secondary add-to-wishlist-modal" data-product-id="${product.id}">
            Add to Wishlist
          </button>
        </div>
      </div>
    `
  }

  setupQuickViewListeners(product) {
    // Size selection
    document.querySelectorAll('.size-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'))
        option.classList.add('selected')
      })
    })

    // Color selection
    document.querySelectorAll('.color-option-modal').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.color-option-modal').forEach(o => o.classList.remove('selected'))
        option.classList.add('selected')
      })
    })

    // Quantity controls
    const quantityInput = document.querySelector('.quantity-input')
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action
        let quantity = parseInt(quantityInput.value)
        
        if (action === 'increase' && quantity < product.stock) {
          quantity++
        } else if (action === 'decrease' && quantity > 1) {
          quantity--
        }
        
        quantityInput.value = quantity
      })
    })

    // Add to cart from modal
    const addToCartBtn = document.querySelector('.add-to-cart-modal')
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-option.selected')?.dataset.size
        const selectedColor = document.querySelector('.color-option-modal.selected')?.dataset.color
        const quantity = parseInt(quantityInput.value)
        
        this.addToCart(product.id, { size: selectedSize, color: selectedColor, quantity })
        this.closeQuickView()
      })
    }
  }

  closeQuickView() {
    const modal = document.querySelector('.quick-view-modal')
    modal.classList.remove('active')
    document.body.style.overflow = ''
  }

  toggleWishlist(btn) {
    const productId = btn.closest('.product-card').dataset.productId
    btn.classList.toggle('liked')
    
    // Add to wishlist logic here
    console.log('Toggle wishlist for product:', productId)
  }

  isInWishlist(productId) {
    // Check if product is in wishlist
    return false // Placeholder
  }

  addToCart(productId, options = {}) {
    const product = this.products.find(p => p.id === parseInt(productId))
    if (!product) return

    // Add to cart logic here
    console.log('Add to cart:', product, options)
    
    // Show success message
    this.showNotification('Product added to cart!', 'success')
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    
    // Add to page
    document.body.appendChild(notification)
    
    // Animate in
    gsap.fromTo(notification, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.3 }
    )
    
    // Remove after delay
    setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        onComplete: () => notification.remove()
      })
    }, 3000)
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.products-section')) {
    new ProductsPage()
  }
})

// Export for use in other modules
window.ProductsPage = ProductsPage
