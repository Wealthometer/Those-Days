const textArray = [
    "I Am A Full Stack Developer",
    "I Can create Responsive",
    "And Functioning Websites",
    " I Can Create both Mobile",
    "and Desktop Applications",
    "I Work With Time And Deliver on Time"
];

const typingSpeed = 150;
const delayBetweenTexts = 2000;
let textIndex = 0;
let charIndex = 0;
const typedTextElement = document.getElementById("typed-text");

function typeText() {
    if (typedTextElement && charIndex < textArray[textIndex].length) {
        typedTextElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else if (typedTextElement) {
        setTimeout(deleteText, delayBetweenTexts);
    }
}

function deleteText() {
    if (typedTextElement && charIndex > 0) {
        typedTextElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, typingSpeed / 2);
    } else if (typedTextElement) {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, typingSpeed);
    }
}

// Start typing animation
if (typedTextElement) {
    typeText();
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    const mobileSections = document.querySelectorAll('.mobile-section');
    const desktopSection = document.getElementById('home');

    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Remove active class from all buttons
            mobileNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all mobile sections
            mobileSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.add('active');
            }
            
            // Handle desktop home section visibility
            if (desktopSection) {
                if (targetSection === 'home') {
                    desktopSection.classList.add('active');
                } else {
                    desktopSection.classList.remove('active');
                }
            }
        });
    });

    // Portfolio filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-item-mobile');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            const parentContainer = this.closest('.filter-tabs, .filter-tabs-mobile');
            const siblingButtons = parentContainer.querySelectorAll('.filter-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.dataset.filter;
            const targetItems = this.closest('.mobile-section') ? 
                document.querySelectorAll('.portfolio-item-mobile') : 
                document.querySelectorAll('.portfolio-item');

            // Filter portfolio items
            targetItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    if (item.dataset.category === filterValue) {
                        item.classList.remove('hidden');
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Download resume functionality
    function downloadResume() {