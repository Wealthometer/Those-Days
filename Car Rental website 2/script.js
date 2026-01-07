// Toggle favorite cars
const favButtons = document.querySelectorAll('.fav i');

favButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Add a little bounce animation when toggled
        if (this.classList.contains('active')) {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 1s infinite';
            }, 10);
        } else {
            this.style.animation = 'none';
        }
    });
});

// Swap pick-up and drop-off locations
const swapBtn = document.querySelector('.swap-btn button');

if (swapBtn) {
    swapBtn.addEventListener('click', function() {
        // Get the select elements
        const pickupLocation = document.querySelector('.search-box:first-child .form-group:first-child select');
        const pickupDate = document.querySelector('.search-box:first-child .form-row .form-group:first-child select');
        const pickupTime = document.querySelector('.search-box:first-child .form-row .form-group:last-child select');
        
        const dropoffLocation = document.querySelector('.search-box:last-child .form-group:first-child select');
        const dropoffDate = document.querySelector('.search-box:last-child .form-row .form-group:first-child select');
        const dropoffTime = document.querySelector('.search-box:last-child .form-row .form-group:last-child select');
        
        if (pickupLocation && dropoffLocation) {
            // Store the values
            const tempLocation = pickupLocation.value;
            const tempDate = pickupDate.value;
            const tempTime = pickupTime.value;
            
            // Swap values
            pickupLocation.value = dropoffLocation.value;
            pickupDate.value = dropoffDate.value;
            pickupTime.value = dropoffTime.value;
            
            dropoffLocation.value = tempLocation;
            dropoffDate.value = tempDate;
            dropoffTime.value = tempTime;
        }
        
        // Add rotation animation to the swap button
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 500);
    });
}

// Favorites page tabs
const favoriteTabs = document.querySelectorAll('.favorites-tabs .tab');
const favoriteCards = document.querySelectorAll('.car-card');

if (favoriteTabs.length && favoriteCards.length) {
    favoriteTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            favoriteTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Show all or filter cars based on availability
            favoriteCards.forEach(card => {
                if (filter.includes('all')) {
                    card.style.display = 'block';
                } else if (filter.includes('unavailable') && card.classList.contains('unavailable')) {
                    card.style.display = 'block';
                } else if (filter.includes('available') && !card.classList.contains('unavailable')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Notifications page
const notificationTabs = document.querySelectorAll('.notifications-tabs .tab');
const notificationItems = document.querySelectorAll('.notification-item');
const markReadButtons = document.querySelectorAll('.notification-actions .action-btn:first-child');
const deleteButtons = document.querySelectorAll('.notification-actions .action-btn:last-child');
const markAllReadButton = document.querySelector('.notifications-actions .btn-small:first-child');
const clearAllButton = document.querySelector('.notifications-actions .btn-small:last-child');

if (notificationTabs.length && notificationItems.length) {
    notificationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            notificationTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Show all or filter notifications
            notificationItems.forEach(item => {
                if (filter.includes('all')) {
                    item.style.display = 'flex';
                } else if (filter.includes('unread') && item.classList.contains('unread')) {
                    item.style.display = 'flex';
                } else if (filter.includes('rental') && item.querySelector('.notification-icon').classList.contains('rental')) {
                    item.style.display = 'flex';
                } else if (filter.includes('promo') && item.querySelector('.notification-icon').classList.contains('promo')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Mark notification as read
    markReadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const notification = this.closest('.notification-item');
            notification.classList.remove('unread');
        });
    });
    
    // Delete notification
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const notification = this.closest('.notification-item');
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
                
                // Check if there are any notifications left
                const remainingNotifications = document.querySelectorAll('.notification-item');
                if (remainingNotifications.length === 0) {
                    document.querySelector('.no-notifications').style.display = 'block';
                }
            }, 300);
        });
    });
    
    // Mark all as read
    if (markAllReadButton) {
        markAllReadButton.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });
        });
    }
    
    // Clear all notifications
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.style.opacity = '0';
            });
            
            setTimeout(() => {
                notificationItems.forEach(item => {
                    item.remove();
                });
                document.querySelector('.no-notifications').style.display = 'block';
            }, 300);
        });
    }
}

// Settings page
const settingsNavItems = document.querySelectorAll('.settings-nav .nav-item');
const settingsSections = document.querySelectorAll('.settings-section');

if (settingsNavItems.length && settingsSections.length) {
    settingsNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            settingsNavItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            settingsSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the target section
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Welcome page testimonial slider
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialDots.length && testimonialCards.length) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Calculate the scroll position
            const cardWidth = testimonialCards[0].offsetWidth + 30; // Card width + gap
            const scrollPosition = index * cardWidth;
            
            // Scroll to the position
            document.querySelector('.testimonials-slider').scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Password strength meter for signup page
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const signupForm = document.querySelector('.auth-form');

if (passwordInput && confirmPasswordInput && signupForm) {
    signupForm.addEventListener('submit', function(e) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            e.preventDefault();
            alert('Passwords do not match!');
        }
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.banner, .car-card, .step, .featured-item, .partner, .event-card, .blog-post, .episode, .feature-card, .step-card, .testimonial-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});