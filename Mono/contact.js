// Contact page specific functionality
let formSubmissionInProgress = false
let gtag // Declare gtag variable

// Initialize Contact Page
document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  initializeFAQ()
  initializeFormValidation()
  initializeContactAnimations()
  initializeAutoSave()
  initializeCharacterCounter()
})

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", handleFormSubmission)

  // Real-time validation
  const formInputs = contactForm.querySelectorAll("input, select, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearFieldError)
  })
}

async function handleFormSubmission(e) {
  e.preventDefault()

  if (formSubmissionInProgress) return

  const form = e.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  // Validate form
  if (!validateForm(data)) {
    return
  }

  formSubmissionInProgress = true
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.textContent = "Sending Message..."
  submitBtn.disabled = true
  submitBtn.classList.add("loading")

  try {
    // Simulate API call
    await simulateFormSubmission(data)

    // Success
    showNotification("Message sent successfully! We'll get back to you soon.", "success")
    form.reset()
    clearAllFieldErrors()

    // Track form submission (analytics)
    trackFormSubmission(data.subject)
  } catch (error) {
    console.error("Form submission error:", error)
    showNotification("Failed to send message. Please try again.", "error")
  } finally {
    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
    formSubmissionInProgress = false
  }
}

function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo
      if (Math.random() > 0.1) {
        // 90% success rate
        resolve(data)
      } else {
        reject(new Error("Network error"))
      }
    }, 2000)
  })
}

// Form Validation
function validateForm(data) {
  let isValid = true

  // Required fields
  const requiredFields = ["firstName", "lastName", "email", "subject", "message"]
  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      showFieldError(field, "This field is required")
      isValid = false
    }
  })

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    showFieldError("email", "Please enter a valid email address")
    isValid = false
  }

  // Message length validation
  if (data.message && data.message.length < 10) {
    showFieldError("message", "Message must be at least 10 characters long")
    isValid = false
  }

  return isValid
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()
  const fieldName = field.name

  clearFieldError(fieldName)

  // Required field validation
  if (field.required && !value) {
    showFieldError(fieldName, "This field is required")
    return false
  }

  // Email validation
  if (fieldName === "email" && value && !isValidEmail(value)) {
    showFieldError(fieldName, "Please enter a valid email address")
    return false
  }

  // Message length validation
  if (fieldName === "message" && value && value.length < 10) {
    showFieldError(fieldName, "Message must be at least 10 characters long")
    return false
  }

  return true
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (!field) return

  const formGroup = field.closest(".form-group")
  if (!formGroup) return

  // Remove existing error
  const existingError = formGroup.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }

  // Add error class
  field.classList.add("error")

  // Create error message
  const errorElement = document.createElement("div")
  errorElement.className = "field-error"
  errorElement.textContent = message
  errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: fadeInUp 0.3s ease;
    `

  formGroup.appendChild(errorElement)
}

function clearFieldError(fieldName) {
  const field =
    typeof fieldName === "string" ? document.querySelector(`[name="${fieldName}"]`) : fieldName.target || fieldName

  if (!field) return

  const formGroup = field.closest(".form-group")
  if (!formGroup) return

  field.classList.remove("error")
  const errorElement = formGroup.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
}

function clearAllFieldErrors() {
  const errorElements = document.querySelectorAll(".field-error")
  errorElements.forEach((error) => error.remove())

  const errorFields = document.querySelectorAll(".error")
  errorFields.forEach((field) => field.classList.remove("error"))
}

// FAQ Functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => toggleFAQ(question))
  })
}

function toggleFAQ(questionElement) {
  const faqItem = questionElement.closest(".faq-item")
  const isActive = faqItem.classList.contains("active")

  // Close all other FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item")
  allFaqItems.forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
    }
  })

  // Toggle current item
  if (isActive) {
    faqItem.classList.remove("active")
  } else {
    faqItem.classList.add("active")
  }
}

// Contact Animations
function initializeContactAnimations() {
  // Animate contact info items
  const infoItems = document.querySelectorAll(".info-item")
  infoItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateX(0)"
    }, index * 200)
  })

  // Animate pattern dots
  const patternDots = document.querySelectorAll(".pattern-dot")
  patternDots.forEach((dot, index) => {
    dot.style.animationDelay = `${index * 0.1}s`
  })

  // Form field focus animations
  const formFields = document.querySelectorAll(".form-group input, .form-group select, .form-group textarea")
  formFields.forEach((field) => {
    field.addEventListener("focus", () => {
      field.parentElement.classList.add("focused")
    })

    field.addEventListener("blur", () => {
      if (!field.value) {
        field.parentElement.classList.remove("focused")
      }
    })
  })
}

// Form Validation Helpers
function initializeFormValidation() {
  // Add custom validation styles
  const style = document.createElement("style")
  style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .form-group.focused label {
            color: var(--accent-color);
        }
        
        .field-error {
            animation: fadeInUp 0.3s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .btn.loading {
            position: relative;
            color: transparent;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `
  document.head.appendChild(style)
}

// Analytics and Tracking
function trackFormSubmission(subject) {
  // Track form submission for analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "form_submit", {
      event_category: "contact",
      event_label: subject,
      value: 1,
    })
  }

  // Custom analytics
  console.log("Form submitted:", { subject, timestamp: new Date().toISOString() })
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {
  // Use the global notification function from script.js
  if (window.MonoWorld && window.MonoWorld.showNotification) {
    window.MonoWorld.showNotification(message, type)
  } else {
    // Fallback notification
    alert(message)
  }
}

// Auto-save form data (optional)
function initializeAutoSave() {
  const form = document.getElementById("contactForm")
  if (!form) return

  const formFields = form.querySelectorAll("input, select, textarea")

  formFields.forEach((field) => {
    // Load saved data
    const savedValue = localStorage.getItem(`contact-form-${field.name}`)
    if (savedValue && field.type !== "checkbox") {
      field.value = savedValue
    } else if (savedValue && field.type === "checkbox") {
      field.checked = savedValue === "true"
    }

    // Save data on change
    field.addEventListener("input", () => {
      if (field.type === "checkbox") {
        localStorage.setItem(`contact-form-${field.name}`, field.checked)
      } else {
        localStorage.setItem(`contact-form-${field.name}`, field.value)
      }
    })
  })

  // Clear saved data on successful submission
  form.addEventListener("submit", () => {
    setTimeout(() => {
      formFields.forEach((field) => {
        localStorage.removeItem(`contact-form-${field.name}`)
      })
    }, 3000) // Clear after 3 seconds (after success message)
  })
}

// Character counter for textarea
function initializeCharacterCounter() {
  const messageField = document.getElementById("message")
  if (!messageField) return

  const maxLength = 1000
  const counter = document.createElement("div")
  counter.className = "character-counter"
  counter.style.cssText = `
        text-align: right;
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-top: 0.25rem;
    `

  messageField.parentElement.appendChild(counter)

  function updateCounter() {
    const remaining = maxLength - messageField.value.length
    counter.textContent = `${remaining} characters remaining`

    if (remaining < 50) {
      counter.style.color = "#ef4444"
    } else if (remaining < 100) {
      counter.style.color = "#f59e0b"
    } else {
      counter.style.color = "var(--text-muted)"
    }
  }

  messageField.addEventListener("input", updateCounter)
  messageField.setAttribute("maxlength", maxLength)
  updateCounter()
}

// Export contact functions
window.ContactManager = {
  toggleFAQ,
  validateForm,
  handleFormSubmission,
  showFieldError,
  clearFieldError,
}
