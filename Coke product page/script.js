// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                initAnimations();
            }
        });
    }, 3000);
});

// Initialize Animations
function initAnimations() {
    // Hero animations
    gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    // About section animations
    gsap.from('.about .section-title', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-description', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.feature', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.floating-bottle', {
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 80%'
        },
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)'
    });
    
    // Products section animations
    gsap.from('.products .section-title', {
        scrollTrigger: {
            trigger: '.products',
            start: 'top 80%'
        },
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.products-carousel',
            start: 'top 80%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Contact section animations
    gsap.from('.contact .section-title', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-method', {
        scrollTrigger: {
            trigger: '.contact-methods',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Product carousel functionality
const productCards = document.querySelectorAll('.product-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carouselContainer = document.querySelector('.carousel-container');

let currentIndex = 0;

function updateActiveCard() {
    productCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
}

function scrollToCard(index) {
    const cardWidth = productCards[0].offsetWidth + 32; // card width + gap
    carouselContainer.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : productCards.length - 1;
    updateActiveCard();
    scrollToCard(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < productCards.length - 1 ? currentIndex + 1 : 0;
    updateActiveCard();
    scrollToCard(currentIndex);
});

// Auto-scroll carousel
setInterval(() => {
    currentIndex = currentIndex < productCards.length - 1 ? currentIndex + 1 : 0;
    updateActiveCard();
    scrollToCard(currentIndex);
}, 5000);

// Product modal functionality
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalIngredients = document.getElementById('modal-ingredients');
const modalCalories = document.getElementById('modal-calories');

const productData = {
    classic: {
        title: 'Coca-Cola Classic',
        description: 'The original and iconic taste that has been refreshing the world since 1886. Made with natural flavors and the perfect blend of sweetness and fizz.',
        ingredients: 'Carbonated water, high fructose corn syrup, caramel color, phosphoric acid, natural flavors, caffeine',
        calories: '140 per 330ml'
    },
    zero: {
        title: 'Coca-Cola Zero Sugar',
        description: 'All the great taste of Coca-Cola, with zero sugar and zero calories. Perfect for those who want to enjoy the classic taste without the calories.',
        ingredients: 'Carbonated water, caramel color, phosphoric acid, aspartame, potassium benzoate, natural flavors, potassium citrate, acesulfame potassium, caffeine',
        calories: '0 per 330ml'
    },
    diet: {
        title: 'Diet Coca-Cola',
        description: 'Light, crisp, and refreshing with its own unique blend of flavors. Diet Coke has been a favorite for those seeking a lighter cola experience.',
        ingredients: 'Carbonated water, caramel color, aspartame, phosphoric acid, potassium benzoate, natural flavors, citric acid, caffeine',
        calories: '1 per 330ml'
    }
};

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productType = card.dataset.product;
        const product = productData[productType];
        
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalIngredients.textContent = product.ingredients;
        modalCalories.textContent = product.calories;
        
        modal.style.display = 'block';
        
        // Animate modal entrance
        gsap.from('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });
});

closeModal.addEventListener('click', () => {
    gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        gsap.to('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA button scroll to products
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to bubbles on hover
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
        gsap.to(bubble, {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    bubble.addEventListener('mouseleave', () => {
        gsap.to(bubble, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateActiveCard();
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Add some extra visual effects
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle effect on product card hover
productCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    });
});

// Add sparkle CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    .sparkle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: #dc143c;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle-animation 1s ease-out forwards;
    }
    
    @keyframes sparkle-animation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);