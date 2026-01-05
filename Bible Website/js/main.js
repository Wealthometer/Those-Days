// Main JavaScript for Divine Word Bible Website

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-mode")
    updateThemeIcon(true)
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    const isDark = body.classList.contains("dark-mode")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    updateThemeIcon(isDark)
  })

  function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector("i")
    if (isDark) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    const isOpen = mobileMenu.classList.contains("active")

    // Update the icon
    const icon = mobileMenuToggle.querySelector("i")
    if (isOpen) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target) &&
      mobileMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active")
      const icon = mobileMenuToggle.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      e.preventDefault()

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          const icon = mobileMenuToggle.querySelector("i")
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }
    })
  })

  // FAQ Toggle (if on about page)
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const toggleBtn = item.querySelector(".toggle-btn")
      const answer = item.querySelector(".faq-answer")

      toggleBtn.addEventListener("click", () => {
        // Close all other answers
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
            otherItem.querySelector(".faq-answer").style.maxHeight = null
            otherItem.querySelector(".toggle-btn i").classList.remove("fa-minus")
            otherItem.querySelector(".toggle-btn i").classList.add("fa-plus")
          }
        })

        // Toggle current answer
        item.classList.toggle("active")
        const icon = toggleBtn.querySelector("i")

        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px"
          icon.classList.remove("fa-plus")
          icon.classList.add("fa-minus")
        } else {
          answer.style.maxHeight = null
          icon.classList.remove("fa-minus")
          icon.classList.add("fa-plus")
        }
      })
    })
  }

  // Contact Form Submission (if on about page)
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // In a real application, you would send this data to a server
      // For demo purposes, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }
})
