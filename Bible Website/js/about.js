// About Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    // Initialize FAQ items (ensure they start collapsed)
    faqItems.forEach((item) => {
      const answer = item.querySelector(".faq-answer")
      answer.style.maxHeight = null
    })

    // Add click event listeners to FAQ questions
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
      const toggleBtn = question.querySelector(".toggle-btn")
      const icon = toggleBtn.querySelector("i")

      question.addEventListener("click", () => {
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherAnswer = otherItem.querySelector(".faq-answer")
            const otherIcon = otherItem.querySelector(".toggle-btn i")

            otherItem.classList.remove("active")
            otherAnswer.style.maxHeight = null

            if (otherIcon) {
              otherIcon.classList.remove("fa-minus")
              otherIcon.classList.add("fa-plus")
            }
          }
        })

        // Toggle current FAQ item
        item.classList.toggle("active")

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

  // Team Member Hover Effects
  const teamMembers = document.querySelectorAll(".team-member")

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", () => {
      member.style.transform = "translateY(-10px)"
    })

    member.addEventListener("mouseleave", () => {
      member.style.transform = "translateY(0)"
    })
  })

  // Translation Card Hover Effects
  const translationCards = document.querySelectorAll(".translation-card")

  translationCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    })
  })

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form fields
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const subjectInput = document.getElementById("subject")
      const messageInput = document.getElementById("message")

      // Validate form
      let isValid = true

      // Name validation
      if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name")
        isValid = false
      } else {
        removeError(nameInput)
      }

      // Email validation
      if (emailInput.value.trim() === "") {
        showError(emailInput, "Please enter your email")
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address")
        isValid = false
      } else {
        removeError(emailInput)
      }

      // Subject validation
      if (subjectInput.value.trim() === "") {
        showError(subjectInput, "Please enter a subject")
        isValid = false
      } else {
        removeError(subjectInput)
      }

      // Message validation
      if (messageInput.value.trim() === "") {
        showError(messageInput, "Please enter your message")
        isValid = false
      } else {
        removeError(messageInput)
      }

      // If form is valid, submit it
      if (isValid) {
        // In a real application, this would send the form data to a server
        // For demo purposes, we'll just show a success message

        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "form-success"
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <p>Thank you for your message! We will get back to you soon.</p>
        `

        // Hide form and show success message
        contactForm.style.display = "none"
        contactForm.parentNode.appendChild(successMessage)

        // Reset form
        contactForm.reset()

        // After 5 seconds, remove success message and show form again
        setTimeout(() => {
          successMessage.remove()
          contactForm.style.display = "block"
        }, 5000)
      }
    })
  }

  // Helper function to show error message
  function showError(input, message) {
    const formGroup = input.parentElement
    const errorMessage = formGroup.querySelector(".error-message") || document.createElement("div")

    errorMessage.className = "error-message"
    errorMessage.textContent = message

    if (!formGroup.querySelector(".error-message")) {
      formGroup.appendChild(errorMessage)
    }

    formGroup.className = "form-group error"
    input.focus()
  }

  // Helper function to remove error message
  function removeError(input) {
    const formGroup = input.parentElement
    const errorMessage = formGroup.querySelector(".error-message")

    if (errorMessage) {
      formGroup.removeChild(errorMessage)
    }

    formGroup.className = "form-group"
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href")

      if (targetId === "#") return

      e.preventDefault()

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })

  // Add CSS for dynamic elements
  const style = document.createElement("style")
  style.textContent = `
    .form-group.error input,
    .form-group.error textarea {
      border-color: #f44336;
    }
    
    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .form-success {
      background-color: #4caf50;
      color: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .form-success i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
  `
  document.head.appendChild(style)
})
