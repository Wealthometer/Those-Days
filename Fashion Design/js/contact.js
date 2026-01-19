// Contact Page JavaScript

// Import GSAP library
import gsap from 'gsap';

class ContactPage {
  constructor() {
    this.form = document.querySelector('.contact-form')
    this.isSubmitting = false
    
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupFormValidation()
    this.setupFAQ()
    this.animateElements()
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e))
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
    formInputs.forEach(input => {
      input.addEventListener('focus', () => this.handleInputFocus(input))
      input.addEventListener('blur', () => this.handleInputBlur(input))
      input.addEventListener('input', () => this.handleInputChange(input))
    })

    // Social links tracking
    document.querySelectorAll('.social-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const platform = e.target.closest('a').getAttribute('href')
        console.log('Social link clicked:', platform)
      })
    })
  }

  setupFormValidation() {
    const inputs = this.form?.querySelectorAll('input, select, textarea')
    if (!inputs) return

    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input))
      input.addEventListener('input', () => this.clearFieldError(input))
    })
  }

  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item')
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question')
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active')
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active')
          }
        })
        
        // Toggle current item
        item.classList.toggle('active', !isActive)
      })
    })
  }

  handleInputFocus(input) {
    const formGroup = input.closest('.form-group')
    formGroup.classList.add('focused')
  }

  handleInputBlur(input) {
    const formGroup = input.closest('.form-group')
    formGroup.classList.remove('focused')
    
    if (!input.value.trim()) {
      formGroup.classList.remove('filled')
    }
  }

  handleInputChange(input) {
    const formGroup = input.closest('.form-group')
    
    if (input.value.trim()) {
      formGroup.classList.add('filled')
    } else {
      formGroup.classList.remove('filled')
    }
    
    // Clear validation errors on input
    this.clearFieldError(input)
  }

  validateField(input) {
    const formGroup = input.closest('.form-group')
    const value = input.value.trim()
    let isValid = true
    let errorMessage = ''

    // Remove existing error state
    this.clearFieldError(input)

    // Required field validation
    if (input.hasAttribute('required') && !value) {
      isValid = false
      errorMessage = 'This field is required'
    }

    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = 'Please enter a valid email address'
      }
    }

    // Phone validation
    if (input.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ''))) {
        isValid = false
        errorMessage = 'Please enter a valid phone number'
      }
    }

    // Name validation
    if (input.name === 'name' && value) {
      if (value.length < 2) {
        isValid = false
        errorMessage = 'Name must be at least 2 characters long'
      }
    }

    // Message validation
    if (input.name === 'message' && value) {
      if (value.length < 10) {
        isValid = false
        errorMessage = 'Message must be at least 10 characters long'
      }
    }

    if (!isValid) {
      this.showFieldError(input, errorMessage)
    }

    return isValid
  }

  showFieldError(input, message) {
    const formGroup = input.closest('.form-group')
    formGroup.classList.add('error')
    
    let errorElement = formGroup.querySelector('.error-message')
    if (!errorElement) {
      errorElement = document.createElement('div')
      errorElement.className = 'error-message'
      formGroup.appendChild(errorElement)
    }
    
    errorElement.textContent = message
  }

  clearFieldError(input) {
    const formGroup = input.closest('.form-group')
    formGroup.classList.remove('error')
    
    const errorElement = formGroup.querySelector('.error-message')
    if (errorElement) {
      errorElement.remove()
    }
  }

  validateForm() {
    if (!this.form) return false

    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]')
    let isValid = true

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    // Check privacy policy agreement
    const privacyCheckbox = this.form.querySelector('input[name="privacy"]')
    if (privacyCheckbox && !privacyCheckbox.checked) {
      isValid = false
      this.showNotification('Please agree to the privacy policy', 'error')
    }

    return isValid
  }

  async handleSubmit(e) {
    e.preventDefault()
    
    if (this.isSubmitting) return
    
    if (!this.validateForm()) {
      this.showNotification('Please correct the errors in the form', 'error')
      return
    }

    this.isSubmitting = true
    this.showLoadingState()

    try {
      const formData = new FormData(this.form)
      const data = Object.fromEntries(formData.entries())
      
      // Simulate API call
      await this.submitForm(data)
      
      this.showSuccessState()
      this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success')
      
    } catch (error) {
      console.error('Form submission error:', error)
      this.showNotification('Failed to send message. Please try again.', 'error')
      this.hideLoadingState()
    } finally {
      this.isSubmitting = false
    }
  }

  async submitForm(data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    console.log('Form data:', data)
    
    // For demo purposes, we'll just log the data
    return { success: true }
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector('.btn[type="submit"]')
    const formContainer = this.form.closest('.contact-form-container')
    
    submitBtn.classList.add('btn-loading')
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    
    formContainer.classList.add('form-loading')
  }

  hideLoadingState() {
    const submitBtn = this.form.querySelector('.btn[type="submit"]')
    const formContainer = this.form.closest('.contact-form-container')
    
    submitBtn.classList.remove('btn-loading')
    submitBtn.disabled = false
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'
    
    formContainer.classList.remove('form-loading')
  }

  showSuccessState() {
    const formContainer = this.form.closest('.contact-form-container')
    
    formContainer.innerHTML = `
      <div class="form-success">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        <button class="btn btn-primary" onclick="location.reload()">
          Send Another Message
        </button>
      </div>
    `
    
    // Animate success state
    gsap.from('.form-success', {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)'
    })
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove())
    
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `
    
    document.body.appendChild(notification)
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.hideNotification(notification)
    })
    
    // Animate in
    gsap.fromTo(notification, 
      { opacity: 0, y: -50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    )
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        this.hideNotification(notification)
      }
    }, 5000)
  }

  hideNotification(notification) {
    gsap.to(notification, {
      opacity: 0,
      y: -50,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (document.body.contains(notification)) {
          notification.remove()
        }
      }
    })
  }

  animateElements() {
    // Animate contact items
    gsap.from('.contact-item', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-details',
        start: 'top 80%'
      }
    })

    // Animate form
    gsap.from('.contact-form-container', {
      duration: 1,
      x: 50,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-form-container',
        start: 'top 80%'
      }
    })

    // Animate FAQ items
    gsap.from('.faq-item', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 80%'
      }
    })

    // Animate map section
    gsap.from('.map-container', {
      duration: 1,
      scale: 0.9,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.map-section',
        start: 'top 80%'
      }
    })
  }
}

// Initialize contact page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.contact-section')) {
    new ContactPage()
  }
})

// Export for use in other modules
window.ContactPage = ContactPage
