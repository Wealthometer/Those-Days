// GSAP Registration
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let cursor, cursorFollower;
let isLoading = true;

// Project Data
const projectData = {
    ecommerce: {
        title: "E-Commerce Platform",
        description: "A comprehensive online shopping platform built with modern technologies. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard.",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
        features: [
            "User authentication and authorization",
            "Product catalog with search and filters",
            "Shopping cart and wishlist functionality",
            "Secure payment processing with Stripe",
            "Order tracking and management",
            "Admin dashboard for inventory management",
            "Responsive design for all devices",
            "Email notifications and confirmations"
        ],
        liveUrl: "#",
        codeUrl: "#"
    },
    dashboard: {
        title: "Analytics Dashboard",
        description: "A real-time data visualization platform for business intelligence. Built with Vue.js and D3.js for interactive charts and graphs. Includes user management, data filtering, and export capabilities.",
        tech: ["Vue.js", "Express", "PostgreSQL", "D3.js", "Socket.io", "Chart.js"],
        features: [
            "Real-time data visualization",
            "Interactive charts and graphs",
            "Custom dashboard creation",
            "Data filtering and sorting",
            "Export functionality (PDF, Excel)",
            "User role management",
            "Responsive design",
            "WebSocket integration for live updates"
        ],
        liveUrl: "#",
        codeUrl: "#"
    },
    mobile: {
        title: "Social Media App",
        description: "Cross-platform mobile application for social networking. Features real-time messaging, photo sharing, user profiles, and social interactions. Built with React Native for iOS and Android.",
        tech: ["React Native", "Firebase", "Redux", "Socket.io", "Expo", "AsyncStorage"],
        features: [
            "User registration and authentication",
            "Real-time messaging and chat",
            "Photo and video sharing",
            "User profiles and following system",
            "Push notifications",
            "Offline functionality",
            "Social interactions (likes, comments)",
            "Cross-platform compatibility"
        ],
        liveUrl: "#",
        codeUrl: "#"
    },
    api: {
        title: "RESTful API Service",
        description: "Scalable microservices architecture with comprehensive API documentation. Built with Node.js and Express, featuring authentication, rate limiting, caching, and monitoring.",
        tech: ["Node.js", "Express", "MongoDB", "Docker", "Redis", "JWT"],
        features: [
            "RESTful API design",
            "JWT authentication",
            "Rate limiting and throttling",
            "Redis caching layer",
            "API documentation with Swagger",
            "Error handling and logging",
            "Docker containerization",
            "Automated testing suite"
        ],
        liveUrl: "#",
        codeUrl: "#"
    },
    portfolio: {
        title: "Creative Portfolio",
        description: "Interactive portfolio website with stunning animations and smooth transitions. Built with vanilla JavaScript and GSAP for optimal performance and creative visual effects.",
        tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "ScrollTrigger", "Canvas"],
        features: [
            "Smooth scroll animations",
            "Interactive canvas elements",
            "Responsive design",
            "Performance optimized",
            "SEO friendly",
            "Cross-browser compatibility",
            "Custom cursor effects",
            "Dynamic content loading"
        ],
        liveUrl: "#",
        codeUrl: "#"
    },
    lms: {
        title: "Learning Management System",
        description: "Complete LMS platform with video streaming, progress tracking, and interactive quizzes. Built with React and Django, featuring user management and content delivery.",
        tech: ["React", "Django", "PostgreSQL", "AWS", "Redis", "Celery"],
        features: [
            "Video streaming and playback",
            "Progress tracking and analytics",
            "Interactive quizzes and assessments",
            "User management and roles",
            "Content management system",
            "Discussion forums",
            "Certificate generation",
            "Mobile responsive design"
        ],
        liveUrl: "#",
        codeUrl: "#"
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showPageLoader();
    initializeCursor();
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeInteractions();
    
    // Hide loader after animations are set up
    setTimeout(() => {
        hidePageLoader();
        startPageAnimations();
    }, 2000);
}

// Page Loader
function showPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        gsap.set(loader, { opacity: 1, visibility: 'visible' });
        
        // Animate progress bar
        gsap.to('.progress-bar', {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut'
        });
    }
}

function hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.visibility = 'hidden';
                isLoading = false;
            }
        });
    }
}

// Custom Cursor
function initializeCursor() {
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursor, {
            x: mouseX - 10,
            y: mouseY - 10,
            duration: 0.1
        });
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        gsap.set(cursorFollower, {
            x: followerX - 20,
            y: followerY - 20
        });
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .service-card, .project-panel');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
        });
    });
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Animate theme transition
    gsap.to('body', {
        duration: 0.3,
        ease: 'power2.inOut'
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
            } else {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        });
    }
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: 'power2.inOut'
                    });
                }
            }
        });
    });
}

// GSAP Animations
function initializeAnimations() {
    // Set initial states
    gsap.set('.hero-title .title-line', { y: 100, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 50, opacity: 0 });
    gsap.set('.hero-cta', { y: 50, opacity: 0 });
    gsap.set('.floating-elements .tech-icon', { scale: 0, rotation: 180 });
    gsap.set('.scroll-indicator', { y: 30, opacity: 0 });
    
    // Page-specific animations
    if (document.querySelector('.landing-page')) {
        initializeHomeAnimations();
    }
    
    if (document.querySelector('.about-page')) {
        initializeAboutAnimations();
    }
    
    if (document.querySelector('.projects-page')) {
        initializeProjectsAnimations();
    }
    
    if (document.querySelector('.services-page')) {
        initializeServicesAnimations();
    }
    
    if (document.querySelector('.contact-page')) {
        initializeContactAnimations();
    }
    
    // Common animations
    initializeScrollAnimations();
}

function startPageAnimations() {
    if (isLoading) return;
    
    // Hero animations
    const tl = gsap.timeline();
    
    tl.to('.hero-title .title-line', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.floating-elements .tech-icon', {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .to('.scroll-indicator', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3');
}

function initializeHomeAnimations() {
    // Hero canvas animation
    initializeHeroCanvas();
    
    // Stats counter animation
    ScrollTrigger.create({
        trigger: '.quick-stats',
        start: 'top 80%',
        onEnter: () => animateCounters()
    });
    
    // Work items hover effects
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.work-image'), {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.work-image'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Tech items animation
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
                gsap.fromTo(item, {
                    y: 50,
                    opacity: 0,
                    scale: 0.8
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
}

function initializeAboutAnimations() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(item, {
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Skills animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 80%',
            onEnter: () => {
                const width = bar.getAttribute('data-width');
                gsap.to(bar, {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Certifications animation
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(item, {
                    y: 50,
                    opacity: 0,
                    rotationY: 90
                }, {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

function initializeProjectsAnimations() {
    // Horizontal scroll for projects
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        const scrollWidth = projectsContainer.scrollWidth - window.innerWidth;
        
        gsap.to(projectsContainer, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-projects',
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });
    }
    
    // Project panels animation
    const projectPanels = document.querySelectorAll('.project-panel');
    projectPanels.forEach((panel, index) => {
        ScrollTrigger.create({
            trigger: panel,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(panel, {
                    y: 100,
                    opacity: 0,
                    scale: 0.8
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    // Filter animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function initializeServicesAnimations() {
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(card, {
                    y: 80,
                    opacity: 0,
                    rotationX: 45
                }, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        ScrollTrigger.create({
            trigger: step,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(step, {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    // Pricing cards animation
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(card, {
                    y: 100,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // FAQ animation
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function initializeContactAnimations() {
    // Form inputs animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.parentElement.querySelector('.form-line'), {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input.parentElement.querySelector('.form-line'), {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Contact methods animation
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        ScrollTrigger.create({
            trigger: method,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(method, {
                    x: -50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Social items animation
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
                gsap.fromTo(item, {
                    scale: 0,
                    rotation: 180
                }, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function initializeScrollAnimations() {
    // Fade in animations for common elements
    const fadeElements = document.querySelectorAll('.section-title, .page-title, .page-subtitle');
    fadeElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(element, {
                    y: 50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    if (document.querySelector('.hero-bg')) {
        gsap.to('.hero-bg', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// Hero Canvas Animation
function initializeHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2;
        
        gsap.fromTo(counter, {
            textContent: 0
        }, {
            textContent: target,
            duration: duration,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                counter.textContent = Math.ceil(counter.textContent);
            }
        });
    });
}

// Project Filtering
function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-panel');
    
    projects.forEach(project => {
        const category = project.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            gsap.to(project, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
            project.style.display = 'block';
        } else {
            gsap.to(project, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    project.style.display = 'none';
                }
            });
        }
    });
}

// Project Modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    if (!modal || !project) return;
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').textContent = project.description;
    
    // Update tech tags
    const techTags = modal.querySelector('.tech-tags');
    techTags.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
    
    // Update features
    const featuresList = modal.querySelector('.features-list');
    featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Update links
    const liveBtn = modal.querySelector('.modal-btn.primary');
    const codeBtn = modal.querySelector('.modal-btn.secondary');
    liveBtn.href = project.liveUrl;
    codeBtn.href = project.codeUrl;
    
    // Show modal with animation
    modal.classList.add('active');
    gsap.fromTo(modal.querySelector('.modal-content'), {
        scale: 0.8,
        opacity: 0,
        y: 50
    }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
        }
    });
}

// Form Handling
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Animate button
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
        submitBtn.style.background = 'var(--accent-color)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success animation
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)'};
        color: ${type === 'success' ? 'var(--text-primary)' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        z-index: 10001;
        max-width: 400px;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
    
    // Auto remove
    setTimeout(() => {
        gsap.to(notification, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// Additional Interactions
function initializeInteractions() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.tech-icon');
    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: -20,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    });
    
    // Hover effects for work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            if (projectId && projectData[projectId]) {
                openProjectModal(projectId);
            }
        });
    });
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeProjectModal();
    }
    
    // Ctrl/Cmd + D for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// Performance optimization
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}