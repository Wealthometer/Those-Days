document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all pages first with animation
            pages.forEach(page => {
                if (page.classList.contains('active')) {
                    page.style.opacity = '0';
                    page.style.transform = 'translateX(-50px)';
                    
                    setTimeout(() => {
                        page.classList.remove('active');
                    }, 500);
                }
            });
            
            // Show target page with animation
            setTimeout(() => {
                const targetElement = document.getElementById(targetPage);
                targetElement.classList.add('active');
                
                // Add staggered animations to elements inside the page
                animatePageElements(targetElement);
            }, 500);
        });
    });
    
    // Portfolio filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Function to animate elements inside a page
    function animatePageElements(page) {
        // Get all animatable elements
        const elements = page.querySelectorAll('.service-card, .timeline-item, .skills-section, .portfolio-item');
        
        // Animate each element with a delay
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('slide-up');
                
                // Remove the animation class after it completes
                setTimeout(() => {
                    element.classList.remove('slide-up');
                }, 500);
            }, 100 * index);
        });
    }
    
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        setTimeout(() => {
            animatePageElements(activePage);
        }, 300);
    }
    
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 576) {
            document.querySelectorAll('.nav-link i').forEach(icon => {
                icon.style.marginRight = '0';
            });
            
            document.querySelectorAll('.nav-link span').forEach(text => {
                text.style.display = 'none';
            });
        } else {
            document.querySelectorAll('.nav-link i').forEach(icon => {
                icon.style.marginRight = '8px';
            });
            
            document.querySelectorAll('.nav-link span').forEach(text => {
                text.style.display = 'inline';
            });
        }
    }
    
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
});