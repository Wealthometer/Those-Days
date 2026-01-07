document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector("header")
    const nav = document.querySelector("nav")

    const mobileMenuButton = document.createElement("button")
    mobileMenuButton.classList.add("mobile-menu-toggle")
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>'

    header.insertBefore(mobileMenuButton, nav)

    mobileMenuButton.addEventListener("click", function () {
      nav.classList.toggle("active")
      this.innerHTML = nav.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>'
    })
  }

  // Only create mobile menu for screens under 768px
  if (window.innerWidth < 768) {
    createMobileMenu()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
          const toggle = otherItem.querySelector(".faq-toggle i")
          toggle.className = "fas fa-plus"
        }
      })

      // Toggle current item
      item.classList.toggle("active")
      const toggle = item.querySelector(".faq-toggle i")

      if (item.classList.contains("active")) {
        toggle.className = "fas fa-minus"
      } else {
        toggle.className = "fas fa-plus"
      }
    })
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Thank you for your interest in the PowerHub 1500! We will contact you shortly.")
      this.reset()
    })
  }
})
