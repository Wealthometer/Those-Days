// Main JavaScript functionality

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading screen
  initLoadingScreen()

  // Initialize navigation
  initNavigation()

  // Initialize custom cursor
  initCustomCursor()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize portfolio filter
  if (document.querySelector(".portfolio-filter")) {
    initPortfolioFilter()
  }

  // Initialize testimonial slider
  if (document.querySelector(".testimonial-slider")) {
    initTestimonialSlider()
  }

  // Initialize project modal
  if (document.querySelector(".portfolio-link")) {
    initProjectModal()
  }

  // Initialize FAQ accordion
  if (document.querySelector(".faq-item")) {
    initFaqAccordion()
  }

  // Initialize contact form
  if (document.querySelector("#contact-form")) {
    initContactForm()
  }

  // Initialize particles
  initParticles()

  // Initialize text animations
  initTextAnimations()

  // Initialize hover effects
  initHoverEffects()

  // Initialize parallax effect
  initParallax()

  // Initialize stats counter
  if (document.querySelector(".stat-number")) {
    initStatsCounter()
  }
})

// Loading screen initialization
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")

  // Hide loading screen after content is loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      loadingScreen.style.visibility = "hidden"

      // Start animations after loading screen is hidden
      startPageAnimations()
    }, 2000)
  })
}

// Navigation initialization
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navOverlay = document.querySelector(".nav-overlay")
  const navLinks = document.querySelectorAll(".nav-links li")
  const mainNav = document.querySelector(".main-nav")

  // Set index for staggered animation
  navLinks.forEach((link, index) => {
    link.style.setProperty("--i", index)
  })

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    navOverlay.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navOverlay.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Change navigation style on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainNav.classList.add("scrolled")
    } else {
      mainNav.classList.remove("scrolled")
    }
  })
}

// Custom cursor initialization
function initCustomCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    // Add a slight delay to the follower for a smoother effect
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 50)
  })

  // Change cursor size on hover over links and buttons
  const hoverElements = document.querySelectorAll("a, button, .work-item, .portfolio-item, .service-card")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.border = "1px solid rgba(255, 51, 102, 0)"
      cursorFollower.style.backgroundColor = "rgba(255, 51, 102, 0.1)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.border = "1px solid var(--primary-color)"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })

  // Hide cursor when leaving the window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = "0"
      cursorFollower.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "1"
    cursorFollower.style.opacity = "1"
  })
}

// Scroll animations initialization
function initScrollAnimations() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in")

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("visible")
      }
    })
  }

  // Initial check
  revealOnScroll()

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll)

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-fill")

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top

      if (barTop < window.innerHeight - 100) {
        const width = bar.getAttribute("style").match(/width: (\d+)%/)[1]
        bar.style.transform = `scaleX(${width / 100})`
      }
    })
  }

  // Check if skill bars exist
  if (skillBars.length > 0) {
    // Initial check
    setTimeout(animateSkillBars, 1000)

    // Check on scroll
    window.addEventListener("scroll", animateSkillBars)
  }
}

// Portfolio filter initialization
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Filter items
      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 200)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 500)
        }
      })
    })
  })
}

// Testimonial slider initialization
function initTestimonialSlider() {
  const track = document.querySelector(".testimonial-track")
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  let currentIndex = 0
  const slideWidth = slides[0].clientWidth

  // Set initial position
  track.style.transform = `translateX(0)`

  // Update dots
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Move to slide
  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`
    currentIndex = index
    updateDots()
  }

  // Next slide
  nextBtn.addEventListener("click", () => {
    if (currentIndex === slides.length - 1) {
      moveToSlide(0)
    } else {
      moveToSlide(currentIndex + 1)
    }
  })

  // Previous slide
  prevBtn.addEventListener("click", () => {
    if (currentIndex === 0) {
      moveToSlide(slides.length - 1)
    } else {
      moveToSlide(currentIndex - 1)
    }
  })

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      moveToSlide(index)
    })
  })

  // Auto slide
  setInterval(() => {
    if (currentIndex === slides.length - 1) {
      moveToSlide(0)
    } else {
      moveToSlide(currentIndex + 1)
    }
  }, 5000)
}

// Project modal initialization
function initProjectModal() {
  const portfolioLinks = document.querySelectorAll(".portfolio-link")
  const modal = document.querySelector(".project-modal")
  const modalOverlay = document.querySelector(".modal-overlay")
  const modalClose = document.querySelector(".modal-close")
  const modalContent = document.querySelector(".modal-content")
  const modalPrev = document.querySelector(".modal-prev")
  const modalNext = document.querySelector(".modal-next")
  const projectTemplates = document.querySelector(".project-templates")

  let currentProject = ""
  const projectIds = []

  // Get all project IDs
  portfolioLinks.forEach((link) => {
    const projectId = link.getAttribute("data-project")
    projectIds.push(projectId)
  })

  // Open modal
  portfolioLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const projectId = this.getAttribute("data-project")
      currentProject = projectId

      // Get project content from template
      const projectTemplate = document.getElementById(projectId)
      modalContent.innerHTML = projectTemplate.innerHTML

      // Show modal
      modal.classList.add("active")
      document.body.classList.add("no-scroll")
    })
  })

  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active")
    document.body.classList.remove("no-scroll")
  })

  modalOverlay.addEventListener("click", () => {
    modal.classList.remove("active")
    document.body.classList.remove("no-scroll")
  })

  // Navigate to previous project
  modalPrev.addEventListener("click", () => {
    const currentIndex = projectIds.indexOf(currentProject)
    let prevIndex = currentIndex - 1

    if (prevIndex < 0) {
      prevIndex = projectIds.length - 1
    }

    currentProject = projectIds[prevIndex]

    // Get project content from template
    const projectTemplate = document.getElementById(currentProject)
    modalContent.innerHTML = projectTemplate.innerHTML
  })

  // Navigate to next project
  modalNext.addEventListener("click", () => {
    const currentIndex = projectIds.indexOf(currentProject)
    let nextIndex = currentIndex + 1

    if (nextIndex >= projectIds.length) {
      nextIndex = 0
    }

    currentProject = projectIds[nextIndex]

    // Get project content from template
    const projectTemplate = document.getElementById(currentProject)
    modalContent.innerHTML = projectTemplate.innerHTML
  })
}

// FAQ accordion initialization
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })
}

// Contact form initialization
function initContactForm() {
  const form = document.getElementById("contact-form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Validate form
    if (name && email && subject && message) {
      // Simulate form submission
      console.log("Form submitted:", { name, email, subject, message })

      // Reset form
      form.reset()

      // Show success message (you can replace this with your own implementation)
      alert("Message sent successfully!")
    } else {
      alert("Please fill in all fields.")
    }
  })
}

// Start page animations
function startPageAnimations() {
  // Animate hero text
  const textElements = document.querySelectorAll(".text-reveal")
  const heroTextP = document.querySelector(".animate-text-p")

  textElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.transform = "translateY(0)"
      element.style.opacity = "1"
    }, 300 * index)
  })

  if (heroTextP) {
    setTimeout(() => {
      heroTextP.style.transform = "translateY(0)"
      heroTextP.style.opacity = "1"
    }, textElements.length * 300)
  }

  // Reveal hero image
  const heroImage = document.querySelector(".hero-image")
  if (heroImage) {
    setTimeout(
      () => {
        heroImage.style.opacity = "1"
        heroImage.style.transform = "translateY(0)"
      },
      (textElements.length + 1) * 300,
    )
  }
}

// Particles initialization
function initParticles() {
  // Check if particles element exists
  if (document.getElementById("particles-js")) {
    window.particlesJS.load("particles-js", "assets/particles.json", function () {
      console.log("Particles.js loaded...");
    });
  }
}

// Text animations initialization
function initTextAnimations() {
  // Implement text animations here
  // Example: Typed.js, Textillate.js, etc.
}

// Hover effects initialization
function initHoverEffects() {
  // Implement hover effects here
  // Example: Using CSS transitions and transforms
}

// Parallax effect initialization
function initParallax() {
  // Implement parallax effect here
  // Example: Using scroll event and element positioning
}

// Stats counter initialization
function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}
