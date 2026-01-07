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
        
        // Add rotation animation to the swap button
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 500);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const banners = document.querySelectorAll('.banner');
    banners.forEach((banner, index) => {
        banner.style.animationDelay = `${index * 0.2}s`;
    });
});