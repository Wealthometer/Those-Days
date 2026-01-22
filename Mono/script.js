// Import GSAP and ScrollTrigger
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Global Variables
let isLoading = true
let currentTheme = localStorage.getItem("theme") || "dark"
const isScrolling = false
let scrollTimeout

// DOM Elements
const body = document.body
const navbar = document.getElementById("navbar")
const themeToggle = document.getElementById("themeToggle")
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.getElementById("navMenu")
const loadingScreen = document.getElementById("loadingScreen")
const bgVideo = document.getElementById("bgVideo")
const heroTitle = document.querySelector(".hero-title")
const titleLines = document.querySelectorAll(".title-line")
const heroSubtitle = document.querySelector(".hero-subtitle")
const heroDescription = document.querySelector(".hero-description")
const heroButtons = document.querySelector(".hero-buttons")
const scrollIndicator = document.querySelector(".scroll-indicator")

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeLoading()
  initializeNavigation()
  initializeScrollAnimations()
  initializeVideoEffects()
  initializeInteractions()
  initializeNewsletterForm()
  initializeModals()
})

// Theme Management
function initializeTheme() {
  // Set initial theme
  body.classList.add(currentTheme + "-theme")

  if (themeToggle) {
    themeToggle.checked = currentTheme === "light"
    themeToggle.addEventListener("change", toggleTheme)
  }

  updateThemeElements()
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark"

  // Update body classes
  body.classList.remove("dark-theme", "light-theme")
  body.classList.add(currentTheme + "-theme")

  // Save preference
  localStorage.setItem("theme", currentTheme)

  // Update theme-dependent elements
  updateThemeElements()
  updateVideoFilter()

  // Trigger custom event for other scripts
  window.dispatchEvent(new CustomEvent("themeChanged", { detail: currentTheme }))
}

function updateThemeElements() {
  // Update Sketchfab iframes theme
  const iframes = document.querySelectorAll('iframe[src*="sketchfab.com"]')
  iframes.forEach((iframe) => {
    const src = iframe.src
    const newSrc = src.replace(/ui_theme=(dark|light)/, `ui_theme=${currentTheme}`)
    if (newSrc !== src) {
      iframe.src = newSrc
    }
  })
}

function updateVideoFilter() {
  if (bgVideo) {
    if (currentTheme === "light") {
      bgVideo.style.filter = "grayscale(100%) contrast(1.2) invert(1)"
      bgVideo.style.opacity = "0.05"
    } else {
      bgVideo.style.filter = "grayscale(100%) contrast(1.2)"
      bgVideo.style.opacity = "0.1"
    }
  }
}

// Loading Screen
function initializeLoading() {
  if (!loadingScreen) return

  const loadingProgress = document.querySelector(".loading-progress")
  let progress = 0

  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15
    if (progress >= 100) {
      progress = 100
      clearInterval(loadingInterval)
      setTimeout(hideLoadingScreen, 500)
    }
    if (loadingProgress) {
      loadingProgress.style.width = progress + "%"
    }
  }, 150)
}

function hideLoadingScreen() {
  if (loadingScreen) {
    loadingScreen.classList.add("hidden")
    isLoading = false

    // Start hero animations after loading
    setTimeout(() => {
      initializeHeroAnimations()
    }, 300)
  }
}

// Hero Animations
function initializeHeroAnimations() {
  const titleLines = document.querySelectorAll(".title-line")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroDescription = document.querySelector(".hero-description")
  const heroButtons = document.querySelector(".hero-buttons")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  // Animate title lines
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1"
      line.style.transform = "translateY(0)"
      line.style.transition = "opacity 1.2s ease, transform 1.2s ease"
    }, index * 200)
  })

  // Animate other elements
  setTimeout(() => {
    if (heroSubtitle) {
      heroSubtitle.style.opacity = "1"
      heroSubtitle.style.transform = "translateY(0)"
      heroSubtitle.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    }
  }, 600)

  setTimeout(() => {
    if (heroDescription) {
      heroDescription.style.opacity = "1"
      heroDescription.style.transform = "translateY(0)"
      heroDescription.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    }
  }, 800)

  setTimeout(() => {
    if (heroButtons) {
      heroButtons.style.opacity = "1"
      heroButtons.style.transform = "translateY(0)"
      heroButtons.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    }
  }, 1000)

  setTimeout(() => {
    if (scrollIndicator) {
      scrollIndicator.style.opacity = "1"
      scrollIndicator.style.transition = "opacity 0.6s ease"
    }
  }, 1200)
}

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll)

  // Smooth scrolling for anchor links
  initializeSmoothScrolling()

  // Update active nav link
  updateActiveNavLink()
  window.addEventListener("scroll", debounce(updateActiveNavLink, 100))
}

function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    body.style.overflow = "hidden"
  } else {
    body.style.overflow = ""
  }
}

function closeMobileMenu() {
  mobileMenuToggle.classList.remove("active")
  navMenu.classList.remove("active")
  body.style.overflow = ""
}

function handleNavbarScroll() {
  if (!navbar) return

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
}

function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id], .hero[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === "#" + current || (current === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })
}

// Scroll Animations
function initializeScrollAnimations() {
  // Initialize GSAP ScrollTrigger if available
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger)
    initializeGSAPAnimations()
  } else {
    // Fallback to Intersection Observer
    initializeIntersectionObserver()
  }
}

function initializeGSAPAnimations() {
  // Section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Section subtitles
  gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitle,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Model cards
  gsap.utils.toArray(".model-card, .gallery-item").forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Philosophy section
  const philosophyTitle = document.querySelector(".philosophy-title")
  if (philosophyTitle) {
    gsap.fromTo(
      philosophyTitle,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: philosophyTitle,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }

  const philosophyParagraphs = document.querySelectorAll(".philosophy-paragraphs p")
  philosophyParagraphs.forEach((p, index) => {
    gsap.fromTo(
      p,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Stats animation
  const statNumbers = document.querySelectorAll(".stat-number")
  statNumbers.forEach((stat) => {
    const finalValue = Number.parseInt(stat.getAttribute("data-count") || stat.textContent)

    gsap.fromTo(
      stat,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          toggleActions: "play none none reverse",
          onStart: () => animateCounter(stat, finalValue),
        },
      },
    )
  })
}

function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animate counters
        if (entry.target.classList.contains("stat-number")) {
          const finalValue = Number.parseInt(entry.target.getAttribute("data-count") || entry.target.textContent)
          animateCounter(entry.target, finalValue)
        }
      }
    })
  }, observerOptions)

  // Observe elements
  const animatedElements = document.querySelectorAll(
    ".section-title, .section-subtitle, .model-card, .gallery-item, .philosophy-title, .philosophy-paragraphs p, .stat-number, .value-card, .team-member",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function animateCounter(element, finalValue) {
  let currentValue = 0
  const increment = finalValue / 60 // 60 frames for smooth animation
  const timer = setInterval(() => {
    currentValue += increment
    if (currentValue >= finalValue) {
      currentValue = finalValue
      clearInterval(timer)
    }
    element.textContent = Math.floor(currentValue)
  }, 16) // ~60fps
}

// Video Effects
function initializeVideoEffects() {
  if (!bgVideo) return

  // Video opacity based on scroll
  window.addEventListener("scroll", () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    const opacity = currentTheme === "light" ? 0.05 - scrollPercent * 0.02 : 0.1 - scrollPercent * 0.05
    bgVideo.style.opacity = Math.max(0.01, opacity)
  })

  // Parallax effect
  if (typeof gsap !== "undefined") {
    gsap.to(bgVideo, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }
}

// Interactive Elements
function initializeInteractions() {
  // Model card hover effects
  const modelCards = document.querySelectorAll(".model-card, .gallery-item")
  modelCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)"
    })
  })

  // Floating elements animation
  initializeFloatingElements()
}

function initializeFloatingElements() {
  const floatingElements = document.querySelectorAll(".floating-cube, .floating-sphere, .floating-pyramid")

  floatingElements.forEach((element, index) => {
    // Add mouse interaction
    element.addEventListener("mouseenter", () => {
      element.style.animationPlayState = "paused"
      element.style.transform = "scale(1.1) rotate(45deg)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.animationPlayState = "running"
      element.style.transform = ""
    })
  })
}

// Newsletter Form
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm")
  if (!newsletterForm) return

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const emailInput = newsletterForm.querySelector(".newsletter-input")
    const email = emailInput.value.trim()

    if (!email || !isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Simulate API call
    const submitBtn = newsletterForm.querySelector(".newsletter-btn")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Subscribing..."
    submitBtn.disabled = true

    setTimeout(() => {
      showNotification("Thank you for subscribing to our newsletter!", "success")
      emailInput.value = ""
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Modal Management
function initializeModals() {
  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      hideModal(e.target.id)
    }
  })

  // Close modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active")
      if (activeModal) {
        hideModal(activeModal.id)
      }
    }
  })
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    body.style.overflow = "hidden"
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    body.style.overflow = ""
  }
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "16px 24px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10001",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "400px",
    fontSize: "14px",
  })

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "linear-gradient(135deg, #10b981, #059669)"
      break
    case "error":
      notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)"
      break
    case "warning":
      notification.style.background = "linear-gradient(135deg, #f59e0b, #d97706)"
      break
    default:
      notification.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)"
  }

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

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

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance Optimizations
function initializePerformanceOptimizations() {
  // Lazy load images and iframes
  const lazyElements = document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]')

  if ("IntersectionObserver" in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          if (element.dataset.src) {
            element.src = element.dataset.src
            element.removeAttribute("data-src")
          }
          lazyObserver.unobserve(element)
        }
      })
    })

    lazyElements.forEach((element) => {
      lazyObserver.observe(element)
    })
  }
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // Theme toggle with Ctrl/Cmd + T
  if ((e.ctrlKey || e.metaKey) && e.key === "t") {
    e.preventDefault()
    if (themeToggle) {
      themeToggle.click()
    }
  }

  // Navigation with arrow keys
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        break
      case "ArrowUp":
        e.preventDefault()
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })
        break
      case "Home":
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
        break
      case "End":
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        break
    }
  }
})

// Window Events
window.addEventListener(
  "resize",
  debounce(() => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh()
    }
  }, 250),
)

window.addEventListener("load", () => {
  initializePerformanceOptimizations()
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh()
  }
})

// Error Handling
window.addEventListener("error", (e) => {
  console.error("MonoWorld Error:", e.error)
  // Don't show error notifications to users in production
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    showNotification("An error occurred. Check the console for details.", "error")
  }
})

// Cleanup
window.addEventListener("beforeunload", () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.killAll()
  }
})

// Console Art
console.log(`
███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ 
████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
██║╚██╔╝██║██║   ██║██║ ╚██╗██║██║   ██║██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 

Welcome to MonoWorld - A Black & White 3D Showcase
Version: 1.0.0
Theme: ${currentTheme}

Keyboard shortcuts:
- Ctrl/Cmd + T: Toggle theme
- Ctrl/Cmd + ↑/↓: Navigate sections
- Ctrl/Cmd + Home/End: Go to top/bottom
- Esc: Close modals
`)

// Export functions for other scripts
window.MonoWorld = {
  showModal,
  hideModal,
  showNotification,
  toggleTheme,
  currentTheme: () => currentTheme,
}
