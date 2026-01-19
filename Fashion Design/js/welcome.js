// Welcome Page JavaScript

class WelcomePage {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".bg-slide")
    this.dots = document.querySelectorAll(".dot")
    this.autoSlideInterval = null

    this.init()
  }

  init() {
    this.startAutoSlide()
    this.bindEvents()
    this.checkAgeVerification()
  }

  bindEvents() {
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })

    // Enter site button
    const enterBtn = document.getElementById("enterSite")
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        this.enterSite()
      })
    }

    // Explore button
    const exploreBtn = document.getElementById("exploreBtn")
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        this.exploreSite()
      })
    }

    // Age verification
    const ageConfirm = document.getElementById("ageConfirm")
    const ageDecline = document.getElementById("ageDecline")

    if (ageConfirm) {
      ageConfirm.addEventListener("click", () => {
        this.confirmAge()
      })
    }

    if (ageDecline) {
      ageDecline.addEventListener("click", () => {
        this.declineAge()
      })
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide()
      } else if (e.key === "ArrowRight") {
        this.nextSlide()
      } else if (e.key === "Enter") {
        this.enterSite()
      }
    })
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide()
    }, 4000)
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = null
    }
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateSlides()
    this.stopAutoSlide()
    this.startAutoSlide()
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length
    this.updateSlides()
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.updateSlides()
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide)
    })

    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })
  }

  checkAgeVerification() {
    const ageVerified = localStorage.getItem("luxe_fashion_age_verified")

    if (!ageVerified) {
      setTimeout(() => {
        this.showAgeModal()
      }, 2000)
    }
  }

  showAgeModal() {
    const ageModal = document.getElementById("ageModal")
    if (ageModal) {
      ageModal.classList.add("active")
      this.stopAutoSlide()
    }
  }

  hideAgeModal() {
    const ageModal = document.getElementById("ageModal")
    if (ageModal) {
      ageModal.classList.remove("active")
      this.startAutoSlide()
    }
  }

  confirmAge() {
    localStorage.setItem("luxe_fashion_age_verified", "true")
    this.hideAgeModal()
    this.showWelcomeMessage()
  }

  declineAge() {
    alert("You must be 18 or older to access this website.")
    window.location.href = "https://www.google.com"
  }

  showWelcomeMessage() {
    const notification = document.createElement("div")
    notification.className = "welcome-notification"
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>Welcome to Luxe Fashion!</span>
      </div>
    `

    notification.style.cssText = `
      position: fixed;
      top: 20px;
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

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  enterSite() {
    this.animateExit(() => {
      window.location.href = "index.html"
    })
  }

  exploreSite() {
    this.animateExit(() => {
      window.location.href = "products.html"
    })
  }

  animateExit(callback) {
    const welcomeContainer = document.querySelector(".welcome-container")

    if (welcomeContainer) {
      welcomeContainer.style.transition = "opacity 1s ease-out, transform 1s ease-out"
      welcomeContainer.style.opacity = "0"
      welcomeContainer.style.transform = "scale(1.1)"

      setTimeout(callback, 1000)
    } else {
      callback()
    }
  }
}

// Initialize welcome page
document.addEventListener("DOMContentLoaded", () => {
  new WelcomePage()
})

// GSAP animations for welcome page
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)

  // Initial animations
  gsap
    .timeline()
    .from(".welcome-logo", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.5,
    })
    .from(
      ".welcome-text",
      {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.5",
    )
    .from(
      ".welcome-actions",
      {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.3",
    )
    .from(
      ".welcome-features .feature",
      {
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.3",
    )
    .from(
      ".welcome-navigation",
      {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.2",
    )
    .from(
      ".welcome-footer",
      {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.2",
    )

  // Button hover animations
  const buttons = document.querySelectorAll(".enter-btn, .explore-btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        duration: 0.3,
        scale: 1.05,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        duration: 0.3,
        scale: 1,
        ease: "power2.out",
      })
    })
  })

  // Feature hover animations
  const features = document.querySelectorAll(".feature")
  features.forEach((feature) => {
    feature.addEventListener("mouseenter", () => {
      gsap.to(feature.querySelector("i"), {
        duration: 0.3,
        scale: 1.2,
        rotation: 10,
        ease: "power2.out",
      })
    })

    feature.addEventListener("mouseleave", () => {
      gsap.to(feature.querySelector("i"), {
        duration: 0.3,
        scale: 1,
        rotation: 0,
        ease: "power2.out",
      })
    })
  })
}
