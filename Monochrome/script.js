// Import GSAP and ScrollTrigger
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Global Variables
let isLoading = true
let currentTheme = "dark"

// DOM Elements
const body = document.body
const themeToggle = document.getElementById("theme-toggle")
const loadingScreen = document.getElementById("loadingScreen")
const bgVideo = document.getElementById("bgVideo")
const heroTitle = document.querySelector(".hero-title")
const titleLines = document.querySelectorAll(".title-line")
const heroSubtitle = document.querySelector(".hero-subtitle")
const heroCta = document.querySelector(".hero-cta")
const scrollIndicator = document.querySelector(".scroll-indicator")

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initializeLoading()
  initializeThemeToggle()
  initializeScrollAnimations()
  initializeVideoEffects()
  initializeInteractions()
})

// Loading Screen
function initializeLoading() {
  const loadingProgress = document.querySelector(".loading-progress")
  let progress = 0

  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15
    if (progress >= 100) {
      progress = 100
      clearInterval(loadingInterval)
      setTimeout(hideLoadingScreen, 500)
    }
    loadingProgress.style.width = progress + "%"
  }, 150)
}

function hideLoadingScreen() {
  loadingScreen.classList.add("hidden")
  isLoading = false

  // Start hero animations after loading
  setTimeout(() => {
    animateHeroEntrance()
  }, 300)
}

// Hero Entrance Animation
function animateHeroEntrance() {
  const tl = gsap.timeline()

  // Animate title lines
  tl.to(titleLines, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
  })
    .to(
      heroSubtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .to(
      heroCta,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .to(
      scrollIndicator,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2",
    )
}

// Theme Toggle
function initializeThemeToggle() {
  themeToggle.addEventListener("change", toggleTheme)

  // Set initial theme
  updateThemeElements()
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark"

  if (currentTheme === "light") {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme")
  } else {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
  }

  updateThemeElements()
  updateVideoFilter()
}

function updateThemeElements() {
  // Update Sketchfab iframes theme
  const iframes = document.querySelectorAll("iframe")
  iframes.forEach((iframe) => {
    const src = iframe.src
    if (src.includes("sketchfab.com")) {
      const newSrc = src.replace(/ui_theme=(dark|light)/, `ui_theme=${currentTheme}`)
      if (newSrc !== src) {
        iframe.src = newSrc
      }
    }
  })
}

function updateVideoFilter() {
  if (currentTheme === "light") {
    bgVideo.style.filter = "grayscale(100%) contrast(1.2) invert(1)"
  } else {
    bgVideo.style.filter = "grayscale(100%) contrast(1.2)"
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  // Section title animations
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })
  })

  // Section subtitle animations
  gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: subtitle,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })
  })

  // Gallery items animations
  gsap.utils.toArray(".gallery-item").forEach((item, index) => {
    const isReverse = item.classList.contains("reverse")

    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate model container and info separately for better effect
    const modelContainer = item.querySelector(".model-container")
    const modelInfo = item.querySelector(".model-info")

    gsap.fromTo(
      modelContainer,
      {
        opacity: 0,
        x: isReverse ? 100 : -100,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      modelInfo,
      {
        opacity: 0,
        x: isReverse ? -50 : 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // About section animations
  const aboutTitle = document.querySelector(".about-title")
  const aboutParagraphs = document.querySelectorAll(".about-paragraph")
  const aboutStats = document.querySelectorAll(".stat-item")
  const aboutVisual = document.querySelector(".about-visual")

  if (aboutTitle) {
    gsap.to(aboutTitle, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutTitle,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
  }

  aboutParagraphs.forEach((paragraph, index) => {
    gsap.to(paragraph, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: paragraph,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })
  })

  aboutStats.forEach((stat, index) => {
    gsap.to(stat, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: stat,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    })
  })

  if (aboutVisual) {
    gsap.to(aboutVisual, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutVisual,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate grid items
    const gridItems = aboutVisual.querySelectorAll(".grid-item")
    gridItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          scale: 0,
          rotation: 45,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: aboutVisual,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  }
}

// Video Effects
function initializeVideoEffects() {
  // Video opacity based on scroll
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const progress = self.progress
      const opacity = 0.3 - progress * 0.2
      bgVideo.style.opacity = Math.max(0.1, opacity)
    },
  })

  // Parallax effect for video
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

// Interactive Elements
function initializeInteractions() {
  // CTA Button click
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      document.querySelector(".gallery").scrollIntoView({
        behavior: "smooth",
      })
    })
  }

  // Model frame hover effects
  const modelFrames = document.querySelectorAll(".model-frame")
  modelFrames.forEach((frame) => {
    frame.addEventListener("mouseenter", () => {
      gsap.to(frame, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    frame.addEventListener("mouseleave", () => {
      gsap.to(frame, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll(".footer-link")
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const href = link.getAttribute("href")
      if (href.startsWith("#")) {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
}

// Utility Functions
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

// Performance Optimizations
function initializePerformanceOptimizations() {
  // Lazy load iframes
  const iframes = document.querySelectorAll("iframe")
  const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src
          iframe.removeAttribute("data-src")
        }
        iframeObserver.unobserve(iframe)
      }
    })
  })

  iframes.forEach((iframe) => {
    iframeObserver.observe(iframe)
  })
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
      }
      break
    case "ArrowUp":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })
      }
      break
    case "Home":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      break
    case "End":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }
      break
    case "t":
    case "T":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        themeToggle.click()
      }
      break
  }
})

// Window Events
window.addEventListener(
  "resize",
  debounce(() => {
    ScrollTrigger.refresh()
  }, 250),
)

window.addEventListener("load", () => {
  ScrollTrigger.refresh()
  initializePerformanceOptimizations()
})

// Error Handling
window.addEventListener("error", (e) => {
  console.error("MonoWorld Error:", e.error)
})

// Cleanup
window.addEventListener("beforeunload", () => {
  ScrollTrigger.killAll()
})

// Console Art
console.log(`
███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ ██╗    ██╗ ██████╗ ██████╗ ██╗     ██╗██████╗ 
████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗██║    ██║██╔═══██╗██╔══██╗██║     ██║██╔══██╗
██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║██║ █╗ ██║██║   ██║██████╔╝██║     ██║██║  ██║
██║╚██╔╝██║██║   ██║██║ ╚██╗██║██║   ██║██║███╗██║██║   ██║██╔══██╗██║     ██║██║  ██║
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║███████╗██║██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ 

Welcome to MonoWorld - A Black & White 3D Showcase
Keyboard shortcuts:
- Ctrl/Cmd + T: Toggle theme
- Ctrl/Cmd + ↑/↓: Navigate sections
- Ctrl/Cmd + Home/End: Go to top/bottom
`)
