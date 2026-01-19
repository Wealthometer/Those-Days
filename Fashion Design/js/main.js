// Main JavaScript functionality for Photographer Portfolio

document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  initializeNavigation()
  initializeHeroSlider()
  initializeSearch()
  initializeAnimations()
  initializeNewsletterForm()
  initializeFeaturedProducts()
  initializeCounters()
  initializeScrollEffects()
}

// Loading screen initialization
function initializeLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")

      // Start hero animations after loading
      startHeroAnimations()
    }, 2500)
  })
}

// Navigation initialization
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const menuToggle = document.getElementById("menuToggle")
  const navMenu = document.getElementById("navMenu")

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
      document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
    })
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle && navMenu) {
        menuToggle.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  })

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.remove("transparent")
      } else {
        navbar.classList.add("transparent")
      }
    })
  }
}

// Hero slider functionality
function initializeHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.querySelector(".hero-prev")
  const nextBtn = document.querySelector(".hero-next")

  if (slides.length === 0) return

  let currentSlide = 0
  const totalSlides = slides.length

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    showSlide(currentSlide)
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", prevSlide)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Auto-play slider
  setInterval(nextSlide, 5000)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide()
    if (e.key === "ArrowRight") nextSlide()
  })
}

// Search functionality
function initializeSearch() {
  const searchToggle = document.querySelector(".search-toggle")
  const searchOverlay = document.getElementById("searchOverlay")
  const searchClose = document.querySelector(".search-close")
  const searchInput = document.querySelector(".search-input")

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.add("active")
      searchInput?.focus()
    })
  }

  if (searchClose) {
    searchClose.addEventListener("click", () => {
      searchOverlay?.classList.remove("active")
    })
  }

  // Close search on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay?.classList.contains("active")) {
      searchOverlay.classList.remove("active")
    }
  })

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 300))
  }
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim()

  if (query.length < 2) return

  // Filter products based on search query
  const results = productsData.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query),
  )

  displaySearchResults(results)
}

function displaySearchResults(results) {
  // This would typically display results in a dropdown or redirect to products page
  console.log("Search results:", results)
}

// Animation initialization
function initializeAnimations() {
  // Fade in elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".animate-on-scroll")
  animateElements.forEach((el) => observer.observe(el))

  // Add animate class to elements that should animate on scroll
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .section-subtitle, .category-card, .product-card, .story-text, .stat",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
}

// Newsletter form
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = e.target.querySelector('input[type="email"]').value

      // Simulate newsletter subscription
      showNotification("Thank you for subscribing to our newsletter!", "success")
      e.target.reset()
    })
  }
}

// Featured products loading
function initializeFeaturedProducts() {
  const featuredContainer = document.getElementById("featuredProducts")

  if (featuredContainer && typeof productsData !== "undefined") {
    const featuredProducts = productsData.filter((product) => product.featured).slice(0, 4)
    featuredContainer.innerHTML = featuredProducts.map((product) => createProductCard(product)).join("")
  }
}

// Create product card HTML
function createProductCard(product) {
  return `
    <div class="product-card animate-on-scroll" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
        <div class="product-actions">
          <button class="action-btn quick-view" data-product-id="${product.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn wishlist" data-product-id="${product.id}">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `
}

// Counter animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        counter.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted")
          animateCounter(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => counterObserver.observe(counter))
}

// Scroll effects
function initializeScrollEffects() {
  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg")

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
  `

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#27ae60" : "#3498db"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-medium);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
    }, 1000)
  }
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause any animations or auto-play features
    console.log("Page hidden - pausing animations")
  } else {
    // Resume animations
    console.log("Page visible - resuming animations")
  }
})

// Custom cursor initialization
function initCustomCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  // Change cursor size on hover over interactive elements
  const hoverElements = document.querySelectorAll("a, button, .portfolio-item, .service-card, .camera-3d-model")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.border = "1px solid rgba(0, 0, 0, 0)"
      cursorFollower.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.border = "1px solid var(--primary-color)"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })
}

// Floating text initialization
function initFloatingText() {
  const textContainer = document.getElementById("floatingTextContainer")
  const text = "PHOTOGRAPHY MOMENTS CAPTURE LIGHT SHADOW BEAUTY EMOTION STORY FRAME LENS FOCUS"
  const words = text.split(" ")

  words.forEach((word, index) => {
    for (let i = 0; i < word.length; i++) {
      const letter = document.createElement("div")
      letter.className = "floating-letter"
      letter.textContent = word[i]
      letter.style.setProperty("--delay", Math.random() * 20)

      // Random initial position
      letter.style.left = Math.random() * 100 + "%"
      letter.style.top = Math.random() * 100 + "%"

      textContainer.appendChild(letter)
    }
  })

  // Animate letters on mouse movement
  document.addEventListener("mousemove", (e) => {
    const letters = document.querySelectorAll(".floating-letter")
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    letters.forEach((letter, index) => {
      const speed = ((index % 3) + 1) * 0.5
      const x = (mouseX - 0.5) * speed * 50
      const y = (mouseY - 0.5) * speed * 50

      letter.style.transform = `translate(${x}px, ${y}px) translateZ(${Math.sin(Date.now() * 0.001 + index) * 20}px)`
    })
  })
}

// 3D Camera interactions
function init3DCameraInteractions() {
  const camera3D = document.getElementById("camera3D")

  camera3D.addEventListener("mousemove", (e) => {
    const rect = camera3D.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = (y / rect.height) * 30
    const rotateY = (x / rect.width) * 30

    camera3D.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
  })

  camera3D.addEventListener("mouseleave", () => {
    camera3D.style.transform = "rotateX(0deg) rotateY(0deg)"
  })

  // Camera click interaction
  camera3D.addEventListener("click", () => {
    camera3D.style.animation = "none"
    camera3D.style.transform = "rotateY(360deg) scale(1.1)"

    setTimeout(() => {
      camera3D.style.animation = "cameraFloat 6s ease-in-out infinite"
      camera3D.style.transform = "rotateX(0deg) rotateY(0deg)"
    }, 1000)
  })
}

// Scroll animations initialization
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")

        // Trigger staggered animations for grid items
        if (entry.target.classList.contains("services-grid")) {
          animateGridItems(entry.target, ".service-card")
        } else if (entry.target.classList.contains("portfolio-grid")) {
          animateGridItems(entry.target, ".portfolio-item")
        } else if (entry.target.classList.contains("testimonials-container")) {
          animateGridItems(entry.target, ".testimonial-card")
        }
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const elementsToObserve = document.querySelectorAll(
    ".section-title, .section-subtitle, .services-grid, .portfolio-grid, .testimonials-container, .cta-content",
  )

  elementsToObserve.forEach((el) => {
    el.classList.add("scroll-reveal")
    observer.observe(el)
  })
}

// Animate grid items with stagger
function animateGridItems(container, selector) {
  const items = container.querySelectorAll(selector)

  items.forEach((item, index) => {
    item.style.setProperty("--delay", index + 1)
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0) scale(1)"
    }, index * 100)
  })
}

// Stats counter initialization
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 16)
  }

  // Observe stats for animation trigger
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        statsObserver.unobserve(entry.target)
      }
    })
  })

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })
}

// Portfolio interactions
function initPortfolioInteractions() {
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // Add subtle tilt effect
      const randomTilt = (Math.random() - 0.5) * 10
      item.style.transform = `translateY(-10px) rotate(${randomTilt}deg)`
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) rotate(0deg)"
    })
  })
}

// Testimonial interactions
function initTestimonialInteractions() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Pause quote animation on hover
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "paused"
      }
    })

    card.addEventListener("mouseleave", () => {
      // Resume quote animation
      const quoteIcon = card.querySelector(".quote-icon")
      if (quoteIcon) {
        quoteIcon.style.animationPlayState = "running"
      }
    })
  })
}

// Start hero animations
function startHeroAnimations() {
  const titleLines = document.querySelectorAll(".title-line")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroStats = document.querySelector(".hero-stats")
  const heroCta = document.querySelector(".hero-cta")

  // Animate title lines
  titleLines.forEach((line, index) => {
    line.style.setProperty("--delay", index)
    setTimeout(
      () => {
        line.style.transform = "translateY(0)"
        line.style.opacity = "1"
      },
      index * 200 + 500,
    )
  })

  // Animate other hero elements
  setTimeout(() => {
    heroSubtitle.style.transform = "translateY(0)"
    heroSubtitle.style.opacity = "1"
  }, 1200)

  setTimeout(() => {
    heroStats.style.transform = "translateY(0)"
    heroStats.style.opacity = "1"
  }, 1400)

  setTimeout(() => {
    heroCta.style.transform = "translateY(0)"
    heroCta.style.opacity = "1"
  }, 1600)
}
