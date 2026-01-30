// Typing Animation
const textArray = [
  "I Am A Full Stack Developer",
  "I Can create Responsive",
  "And Functioning Websites",
  "I Can Create both Mobile",
  "and Desktop Applications",
  "I Work With Time And Deliver on Time",
]

const typingSpeed = 150
const delayBetweenTexts = 2000
let textIndex = 0
let charIndex = 0
const typedTextElement = document.getElementById("typed-text")

function typeText() {
  if (typedTextElement && charIndex < textArray[textIndex].length) {
    typedTextElement.textContent += textArray[textIndex].charAt(charIndex)
    charIndex++
    setTimeout(typeText, typingSpeed)
  } else if (typedTextElement) {
    setTimeout(deleteText, delayBetweenTexts)
  }
}

function deleteText() {
  if (typedTextElement && charIndex > 0) {
    typedTextElement.textContent = textArray[textIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(deleteText, typingSpeed / 2)
  } else {
    textIndex = (textIndex + 1) % textArray.length
    setTimeout(typeText, typingSpeed)
  }
}

// Start typing animation
if (typedTextElement) {
  typeText()
}

// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  const pages = document.querySelectorAll(".page")
  const isMobile = window.innerWidth < 1024

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetPage = this.getAttribute("data-page")

      // Remove active class from all nav links
      navLinks.forEach((nav) => nav.classList.remove("active"))
      // Add active class to clicked link
      this.classList.add("active")

      if (isMobile) {
        // Mobile: scroll to section
        const targetSection = document.getElementById(targetPage)
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      } else {
        // Desktop: show/hide pages
        pages.forEach((page) => {
          page.classList.remove("active")
        })

        const targetPageElement = document.getElementById(targetPage)
        if (targetPageElement) {
          targetPageElement.classList.add("active")
        }
      }
    })
  })

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all filter buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (filterValue === "all") {
          item.classList.remove("hidden")
          // Add fade in animation
          item.style.opacity = "0"
          setTimeout(() => {
            item.style.opacity = "1"
          }, 100)
        } else {
          if (item.getAttribute("data-category") === filterValue) {
            item.classList.remove("hidden")
            item.style.opacity = "0"
            setTimeout(() => {
              item.style.opacity = "1"
            }, 100)
          } else {
            item.classList.add("hidden")
          }
        }
      })
    })
  })

  // Download Resume functionality
  function downloadResume() {
    const resumeContent = `MEDEBEM OBINNA
FullStack Developer

CONTACT INFORMATION:
Phone: +234 803 2296 371
Email: beatricewambuimbuguaa@gmail.com
Location: NIIT Surulere

EDUCATION:
2020-2021: Software Development - Moringa School
2013-2016: Disaster Management - Masinde Muliro University

PROFESSIONAL EXPERIENCE:
2022 - Present: Technical Mentor - Moringa School
2021-2022: Website Development - Village 2 Nation

TECHNICAL SKILLS:
• Programming Languages: HTML, CSS, JavaScript, Java, Python
• Databases: MongoDB, MSSQL, MYSQL
• Tools: Advanced Excel, Database Management
• Frameworks: NEXT.js, React

SOFT SKILLS:
• Time Management
• Mentorship & Leadership
• Impeccable Communication
• Flexibility & Adaptability
• Research & Analysis
• Technical Writing

PROJECTS:
• Food Website - Web Development
• Interior App - Mobile Application
• Rental Platform - Web Development
• Wallet App - Mentorship Project
• Ideaflow - Web Development

ABOUT:
Passionate and versatile full-stack developer with keen interest in exploring 
cutting-edge technologies. Experienced in creating responsive, scalable, and 
user-friendly applications. Committed to continuous learning and sharing 
knowledge with the developer community.`

    // Create blob and download
    const blob = new Blob([resumeContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Medebem_Obinna_Resume.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show feedback
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-check"></i> Downloaded!'
    this.style.background = "#10B981"

    setTimeout(() => {
      this.innerHTML = originalText
      this.style.background = "linear-gradient(45deg, #388AC2, #00246D)"
    }, 2000)
  }

  // Attach download functionality to both buttons
  const downloadBtn = document.getElementById("downloadBtn")
  const mobileDownloadBtn = document.getElementById("mobileDownloadBtn")

  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadResume)
  }

  if (mobileDownloadBtn) {
    mobileDownloadBtn.addEventListener("click", downloadResume)
  }

  // Handle window resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Reload page on significant resize to handle layout changes
      if ((window.innerWidth >= 1024 && isMobile) || (window.innerWidth < 1024 && !isMobile)) {
        location.reload()
      }
    }, 250)
  })

  // Smooth scrolling for mobile navigation
  if (isMobile) {
    // Show all sections on mobile
    pages.forEach((page) => {
      page.style.display = "block"
      page.classList.add("active")
    })
  }

  // Add scroll spy for mobile navigation
  if (isMobile) {
    window.addEventListener("scroll", () => {
      let current = ""
      pages.forEach((page) => {
        const pageTop = page.offsetTop
        const pageHeight = page.clientHeight
        if (scrollY >= pageTop - 200) {
          current = page.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-page") === current) {
          link.classList.add("active")
        }
      })
    })
  }

  // Portfolio item hover effects
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Skill tag hover effects
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#3182ce"
      this.style.color = "white"
      this.style.transform = "translateY(-2px)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#f5f7fa"
      this.style.color = "#2d3748"
      this.style.transform = "translateY(0)"
    })
  })

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Social links functionality (you can add real URLs here)
document.addEventListener("DOMContentLoaded", () => {
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      // Add your social media URLs here
      console.log("Social link clicked")
    })
  })
})
