// Advanced animations using GSAP

// Import GSAP and ScrollTrigger
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP animations if GSAP is loaded
  if (typeof gsap !== "undefined") {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    // Initialize animations
    initHeroAnimations()
    initScrollAnimations()
    initTextAnimations()
    initHoverAnimations()
    initPageTransitions()
    initParticleBackground()
    initCanvasAnimations()
    initMorphingShapes()
    initParallaxEffects()
  }

  // Initialize typing animation
  initTypingAnimation()

  // Initialize text scramble effect
  initTextScramble()

  // Initialize magnetic buttons
  initMagneticButtons()

  // Initialize 3D card effect
  init3DCardEffect()

  // Initialize liquid button effect
  initLiquidButtonEffect()

  // Initialize interactive background
  initInteractiveBackground()
})

// Hero animations
function initHeroAnimations() {
  // Animate floating shapes
  gsap.to(".shape-1", {
    x: "random(-30, 30)",
    y: "random(-30, 30)",
    rotation: "random(-15, 15)",
    duration: "random(4, 8)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })

  gsap.to(".shape-2", {
    x: "random(-40, 40)",
    y: "random(-40, 40)",
    rotation: "random(-20, 20)",
    duration: "random(5, 9)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })

  gsap.to(".shape-3", {
    x: "random(-25, 25)",
    y: "random(-25, 25)",
    rotation: "random(-10, 10)",
    duration: "random(3, 7)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })

  gsap.to(".shape-4", {
    x: "random(-35, 35)",
    y: "random(-35, 35)",
    rotation: "random(-15, 15)",
    duration: "random(4, 8)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })

  // Animate hero image
  gsap.from(".hero-image img", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  })

  // Animate hero text
  const heroTextElements = document.querySelectorAll(".hero-text > *")

  gsap.from(heroTextElements, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  })

  // Add glowing effect to hero section
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    const glowEffect = document.createElement("div")
    glowEffect.classList.add("glow-effect")
    heroSection.appendChild(glowEffect)

    heroSection.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      gsap.to(glowEffect, {
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      })
    })
  }
}

// Scroll animations
function initScrollAnimations() {
  // Animate section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  })

  // Animate work items
  gsap.utils.toArray(".work-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    })
  })

  // Animate service cards
  gsap.utils.toArray(".service-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    })
  })

  // Animate about image
  const aboutImage = document.querySelector(".about-image")
  if (aboutImage) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: aboutImage,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }

  // Animate about text
  const aboutText = document.querySelector(".about-text")
  if (aboutText) {
    gsap.from(aboutText, {
      scrollTrigger: {
        trigger: aboutText,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }

  // Animate skill bars
  gsap.utils.toArray(".skill-fill").forEach((fill) => {
    const width = fill.style.width

    gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scrollTrigger: {
          trigger: fill,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scaleX: width ? Number.parseInt(width) / 100 : 0,
        duration: 1.5,
        ease: "power3.out",
        transformOrigin: "left",
      },
    )
  })

  // Animate timeline items
  gsap.utils.toArray(".timeline-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
    })
  })

  // Animate portfolio items
  gsap.utils.toArray(".portfolio-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    })
  })

  // Animate contact info
  const contactInfo = document.querySelector(".contact-info")
  if (contactInfo) {
    gsap.from(contactInfo, {
      scrollTrigger: {
        trigger: contactInfo,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }

  // Animate contact form
  const contactForm = document.querySelector(".contact-form-container")
  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: contactForm,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }

  // Parallax scrolling effect for sections
  gsap.utils.toArray("section").forEach((section) => {
    const bg = section.querySelector(".bg-parallax")
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: "30%",
        ease: "none",
      })
    }
  })
}

// Text animations
function initTextAnimations() {
  // Split text into characters for advanced animations
  const splitTextElements = document.querySelectorAll('[data-animation="split-text"]')

  splitTextElements.forEach((element) => {
    const text = element.textContent
    let html = ""

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        html += " "
      } else {
        html += `<span style="display: inline-block;">${text[i]}</span>`
      }
    }

    element.innerHTML = html

    const chars = element.querySelectorAll("span")

    gsap.from(chars, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: "random(-100, 100)",
      rotationX: "random(-90, 90)",
      rotationY: "random(-90, 90)",
      stagger: 0.02,
      duration: 1,
      ease: "power3.out",
    })
  })

  // Animated gradient text
  const gradientTextElements = document.querySelectorAll(".gradient-text")
  gradientTextElements.forEach((element) => {
    gsap.to(element, {
      backgroundPosition: "200% 200%",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  })

  // Text wave animation
  const waveTextElements = document.querySelectorAll('[data-animation="wave-text"]')
  waveTextElements.forEach((element) => {
    const text = element.textContent
    let html = ""

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        html += " "
      } else {
        html += `<span style="display: inline-block;">${text[i]}</span>`
      }
    }

    element.innerHTML = html

    const chars = element.querySelectorAll("span")

    gsap.to(chars, {
      y: -15,
      duration: 0.5,
      stagger: 0.05,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  })
}

// Hover animations
function initHoverAnimations() {
  // Service card hover effect
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(this.querySelector(".service-icon"), {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(this.querySelector(".service-icon"), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Portfolio item hover effect
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  portfolioItems.forEach((item) => {
    const overlay = item.querySelector(".portfolio-overlay")
    const info = item.querySelector(".portfolio-info")

    item.addEventListener("mouseenter", () => {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(info, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      })
    })

    item.addEventListener("mouseleave", () => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(info, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Button hover effect
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })
}

// Page transitions
function initPageTransitions() {
  // Animate page header
  const pageHeader = document.querySelector(".page-header")
  if (pageHeader) {
    gsap.from(pageHeader.querySelector("h1"), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    gsap.from(pageHeader.querySelector(".header-line"), {
      scaleX: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    })
  }
}

// Typing animation
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('[data-animation="typing"]')

  typingElements.forEach((element) => {
    const text = element.textContent
    element.textContent = ""
    element.classList.add("typing-animation")

    let i = 0
    const speed = 50 // typing speed in milliseconds

    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, speed)
      }
    }

    // Start typing when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500)
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(element)
  })
}

// Text scramble effect
function initTextScramble() {
  const scrambleElements = document.querySelectorAll('[data-animation="scramble"]')

  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = "!<>-_\\/[]{}—=+*^?#________"
      this.update = this.update.bind(this)
    }

    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => (this.resolve = resolve))
      this.queue = []

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ""
        const to = newText[i] || ""
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }

      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }

    update() {
      let output = ""
      let complete = 0

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]

        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="scramble-char">${char}</span>`
        } else {
          output += from
        }
      }

      this.el.innerHTML = output

      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  scrambleElements.forEach((element) => {
    const originalText = element.textContent
    element.classList.add("text-scramble")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fx = new TextScramble(element)
            fx.setText(originalText)
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(element)
  })
}

// Magnetic buttons
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('[data-animation="magnetic"]')

  magneticButtons.forEach((button) => {
    button.classList.add("magnetic-btn")

    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(this, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    })
  })
}

// 3D Card Effect
function init3DCardEffect() {
  const cards = document.querySelectorAll('[data-animation="3d-card"]')

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    })
  })
}

// Liquid Button Effect
function initLiquidButtonEffect() {
  const liquidButtons = document.querySelectorAll('[data-animation="liquid"]')

  liquidButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (!this.querySelector(".liquid-circle")) {
        const circle = document.createElement("div")
        circle.classList.add("liquid-circle")
        this.appendChild(circle)

        gsap.fromTo(
          circle,
          { scale: 0, opacity: 1 },
          {
            scale: 2,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              circle.remove()
            },
          },
        )
      }
    })
  })
}

// Particle Background
function initParticleBackground() {
  const sections = document.querySelectorAll('[data-background="particles"]')

  sections.forEach((section) => {
    // Create canvas for particles
    const canvas = document.createElement("canvas")
    canvas.classList.add("particle-canvas")
    section.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    let particles = []

    function resizeCanvas() {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }

    function createParticles() {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        })
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      requestAnimationFrame(drawParticles)
    }

    // Initialize
    resizeCanvas()
    createParticles()
    drawParticles()

    // Handle resize
    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })
  })
}

// Canvas Animations
function initCanvasAnimations() {
  const canvasContainers = document.querySelectorAll('[data-animation="canvas"]')

  canvasContainers.forEach((container) => {
    const canvas = document.createElement("canvas")
    canvas.classList.add("animation-canvas")
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")

    function resizeCanvas() {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    function drawWavePattern(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(255, 51, 102, 0.5)")
      gradient.addColorStop(0.5, "rgba(108, 99, 255, 0.5)")
      gradient.addColorStop(1, "rgba(0, 201, 167, 0.5)")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()

        const amplitude = 20 + i * 5
        const frequency = 0.01 - i * 0.002
        const timeOffset = i * 0.5

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * frequency + (time + timeOffset) / 1000) * amplitude

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      requestAnimationFrame(() => drawWavePattern(time + 16))
    }

    // Initialize
    resizeCanvas()
    drawWavePattern(0)

    // Handle resize
    window.addEventListener("resize", resizeCanvas)
  })
}

// Morphing Shapes
function initMorphingShapes() {
  const morphContainers = document.querySelectorAll('[data-animation="morph"]')

  morphContainers.forEach((container) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.classList.add("morph-svg")
    container.appendChild(svg)

    const shape = document.createElementNS("http://www.w3.org/2000/svg", "path")
    shape.setAttribute("fill", "rgba(255, 51, 102, 0.2)")
    svg.appendChild(shape)

    // Define shape paths
    const shapes = [
      "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z",
      "M20,20 C40,5 60,5 80,20 C95,40 95,60 80,80 C60,95 40,95 20,80 C5,60 5,40 20,20 Z",
      "M50,10 C80,10 90,40 90,50 C90,60 80,90 50,90 C20,90 10,60 10,50 C10,40 20,10 50,10 Z",
      "M30,10 C60,20 80,30 90,50 C80,70 60,80 50,90 C40,80 20,70 10,50 C20,30 40,20 30,10 Z",
    ]

    let currentShape = 0

    function morphShape() {
      const nextShape = (currentShape + 1) % shapes.length

      gsap.to(shape, {
        attr: { d: shapes[nextShape] },
        duration: 3,
        ease: "sine.inOut",
        onComplete: morphShape,
      })

      currentShape = nextShape
    }

    // Set initial shape
    shape.setAttribute("d", shapes[0])

    // Start morphing
    morphShape()
  })
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll("[data-parallax]")

  parallaxElements.forEach((element) => {
    const depth = Number.parseFloat(element.getAttribute("data-parallax")) || 0.2

    window.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.clientX) * depth
      const y = (window.innerHeight / 2 - e.clientY) * depth

      gsap.to(element, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
      })
    })
  })
}

// Interactive Background
function initInteractiveBackground() {
  const sections = document.querySelectorAll('[data-background="interactive"]')

  sections.forEach((section) => {
    // Create canvas
    const canvas = document.createElement("canvas")
    canvas.classList.add("interactive-canvas")
    section.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    let points = []
    const mouse = { x: 0, y: 0, radius: 100 }

    function resizeCanvas() {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
      initPoints()
    }

    function initPoints() {
      points = []
      const density = 30
      const spacingX = canvas.width / density
      const spacingY = canvas.height / density

      for (let x = 0; x < canvas.width; x += spacingX) {
        for (let y = 0; y < canvas.height; y += spacingY) {
          points.push({
            x: x + Math.random() * spacingX,
            y: y + Math.random() * spacingY,
            originX: x + spacingX / 2,
            originY: y + spacingY / 2,
            color: "rgba(255, 255, 255, 0.5)",
            radius: 1 + Math.random(),
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    function drawPoints() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      points.forEach((point) => {
        // Calculate distance from mouse
        const dx = mouse.x - point.x
        const dy = mouse.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        // Push points away from mouse
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          point.vx -= Math.cos(angle) * force * 2
          point.vy -= Math.sin(angle) * force * 2
        }

        // Return to original position
        const dx2 = point.originX - point.x
        const dy2 = point.originY - point.y
        point.vx += dx2 * 0.03
        point.vy += dy2 * 0.03

        // Apply velocity with damping
        point.x += point.vx
        point.y += point.vy
        point.vx *= 0.9
        point.vy *= 0.9

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()
      })

      // Draw connections
      ctx.beginPath()
      for (let i = 0; i < points.length; i++) {
        const pointA = points[i]

        for (let j = i + 1; j < points.length; j++) {
          const pointB = points[j]
          const dx = pointA.x - pointB.x
          const dy = pointA.y - pointB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 50) {
            ctx.moveTo(pointA.x, pointA.y)
            ctx.lineTo(pointB.x, pointB.y)
          }
        }
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.stroke()

      requestAnimationFrame(drawPoints)
    }

    // Track mouse position
    section.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    })

    section.addEventListener("mouseleave", () => {
      mouse.x = -1000
      mouse.y = -1000
    })

    // Initialize
    resizeCanvas()
    drawPoints()

    // Handle resize
    window.addEventListener("resize", resizeCanvas)
  })
}
