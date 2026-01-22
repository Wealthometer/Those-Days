// Pizza data and mood mappings
const pizzaData = {
  happy: {
    names: [
      "Sunshine Margherita", "Joy Supreme", "Happy Pepperoni", 
      "Cheerful Veggie", "Blissful Cheese", "Smiling Slice"
    ],
    toppings: [
      "fresh mozzarella", "sweet basil", "cherry tomatoes", "bell peppers",
      "pineapple", "ham", "mushrooms", "pepperoni", "olives", "corn"
    ],
    descriptions: [
      "A bright and cheerful pizza that brings sunshine to your day!",
      "Loaded with happy flavors that will put a smile on your face.",
      "The perfect combination of joy and deliciousness in every bite."
    ]
  },
  sad: {
    names: [
      "Comfort Cheese", "Healing Margherita", "Warm Hug Pizza", 
      "Cozy Classic", "Soul Soother", "Comfort Food Supreme"
    ],
    toppings: [
      "extra cheese", "comfort pepperoni", "creamy ricotta", "soft mozzarella",
      "mild herbs", "comforting mushrooms", "gentle garlic", "warm tomatoes"
    ],
    descriptions: [
      "A comforting pizza that wraps you in warmth and makes everything better.",
      "Gentle flavors designed to lift your spirits and warm your heart.",
      "The ultimate comfort food to help chase the blues away."
    ]
  },
  angry: {
    names: [
      "Fire Storm Pizza", "Rage Inferno", "Spicy Fury", 
      "Hot Temper Special", "Blazing Mad", "Volcanic Eruption"
    ],
    toppings: [
      "jalapeños", "hot sauce", "spicy pepperoni", "crushed red pepper",
      "habaneros", "chipotle", "sriracha drizzle", "ghost pepper", "cayenne"
    ],
    descriptions: [
      "A fiery pizza that matches your intensity with explosive flavors!",
      "Burn off that anger with seriously spicy heat in every bite.",
      "Warning: This pizza is as hot as your temper!"
    ]
  },
  tired: {
    names: [
      "Energy Boost Special", "Power-Up Pizza", "Revive & Thrive", 
      "Caffeinated Crust", "Wake-Up Call", "Second Wind Slice"
    ],
    toppings: [
      "energizing spinach", "protein-rich chicken", "iron-rich beef",
      "vitamin-packed vegetables", "energizing herbs", "power pepperoni",
      "strengthening cheese", "revitalizing tomatoes"
    ],
    descriptions: [
      "Packed with energizing ingredients to help you power through the day.",
      "The perfect pick-me-up pizza to recharge your batteries.",
      "Fuel your body and boost your energy with every nutritious bite."
    ]
  },
  lazy: {
    names: [
      "Effortless Classic", "Simple Pleasure", "No-Fuss Favorite", 
      "Lazy Day Special", "Easy Does It", "Chill Out Cheese"
    ],
    toppings: [
      "simple cheese", "classic pepperoni", "easy mushrooms", "basic tomatoes",
      "no-fuss mozzarella", "straightforward herbs", "uncomplicated olives"
    ],
    descriptions: [
      "Sometimes simple is best - no complicated flavors, just pure satisfaction.",
      "The perfect low-effort, high-reward pizza for lazy days.",
      "Minimal ingredients, maximum comfort. Just what you need right now."
    ]
  },
  romantic: {
    names: [
      "Love Affair Margherita", "Romance in Red", "Passion Pizza", 
      "Sweetheart Special", "Amore Supreme", "Valentine's Delight"
    ],
    toppings: [
      "heart-shaped pepperoni", "romantic red peppers", "lovely basil",
      "passionate prosciutto", "sweet caramelized onions", "date nights tomatoes",
      "amorous arugula", "charming cheese"
    ],
    descriptions: [
      "A romantic pizza perfect for sharing with someone special.",
      "Elegant flavors that set the mood for love and romance.",
      "Designed for intimate moments and heartfelt connections."
    ]
  },
  energetic: {
    names: [
      "Rocket Fuel Supreme", "High Voltage Pizza", "Turbo Charged", 
      "Lightning Bolt Special", "Adrenaline Rush", "Power Surge Slice"
    ],
    toppings: [
      "high-energy pepperoni", "power-packed vegetables", "energizing chicken",
      "dynamic herbs", "electric cheese", "turbocharged tomatoes",
      "caffeine-infused mushrooms", "athletic greens"
    ],
    descriptions: [
      "A high-energy pizza that matches your enthusiasm and zest for life!",
      "Packed with dynamic flavors to fuel your active lifestyle.",
      "The perfect pizza for go-getters who never slow down."
    ]
  },
  adventurous: {
    names: [
      "Explorer's Dream", "Wild Discovery", "Exotic Adventure", 
      "Daredevil's Delight", "Mystery Blend", "Uncharted Flavors"
    ],
    toppings: [
      "exotic mushrooms", "adventurous arugula", "bold blue cheese",
      "daring chorizo", "wild herbs", "mysterious spices",
      "exotic peppers", "uncharted vegetables", "brave combinations"
    ],
    descriptions: [
      "For the bold and adventurous - a pizza with unexpected and exciting flavors!",
      "Embark on a culinary adventure with unique and daring combinations.",
      "Not for the faint of heart - this pizza pushes flavor boundaries."
    ]
  }
};

// Theme management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('slicemymood-theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('slicemymood-theme', this.currentTheme);
    this.applyTheme();
  }

  bindEvents() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }
}

// Favorites management
class FavoritesManager {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('slicemymood-favorites') || '[]');
  }

  addFavorite(pizza) {
    const isDuplicate = this.favorites.some(fav => 
      fav.name === pizza.name && JSON.stringify(fav.toppings) === JSON.stringify(pizza.toppings)
    );
    
    if (!isDuplicate) {
      this.favorites.push({
        ...pizza,
        id: Date.now(),
        dateAdded: new Date().toLocaleDateString()
      });
      this.saveFavorites();
      this.displayFavorites();
      this.showNotification('Pizza saved to favorites! ❤️');
    } else {
      this.showNotification('This pizza is already in your favorites!');
    }
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter(fav => fav.id !== id);
    this.saveFavorites();
    this.displayFavorites();
    this.showNotification('Removed from favorites');
  }

  clearAllFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
      this.favorites = [];
      this.saveFavorites();
      this.displayFavorites();
      this.showNotification('All favorites cleared');
    }
  }

  saveFavorites() {
    localStorage.setItem('slicemymood-favorites', JSON.stringify(this.favorites));
  }

  displayFavorites() {
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesList = document.getElementById('favoritesList');
    
    if (this.favorites.length === 0) {
      favoritesSection.style.display = 'none';
      return;
    }

    favoritesSection.style.display = 'block';
    favoritesList.innerHTML = this.favorites.map(pizza => `
      <div class="favorite-item">
        <div class="favorite-info">
          <h4>${pizza.name}</h4>
          <div class="favorite-toppings">${pizza.toppings.join(', ')}</div>
          <small>Added: ${pizza.dateAdded}</small>
        </div>
        <button class="remove-favorite-btn" onclick="favoritesManager.removeFavorite(${pizza.id})">
          ❌
        </button>
      </div>
    `).join('');
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Pizza generator
class PizzaGenerator {
  constructor() {
    this.currentPizza = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateGenerateButton();
  }

  bindEvents() {
    // Mood selection
    const moodInputs = document.querySelectorAll('.mood-input');
    moodInputs.forEach(input => {
      input.addEventListener('change', () => this.updateGenerateButton());
    });

    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', () => this.generatePizza());

    // Try again button
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    tryAgainBtn.addEventListener('click', () => this.resetGenerator());

    // Save button
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', () => this.savePizza());

    // Clear favorites
    const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
    clearFavoritesBtn.addEventListener('click', () => favoritesManager.clearAllFavorites());
  }

  updateGenerateButton() {
    const selectedMood = document.querySelector('.mood-input:checked');
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = !selectedMood;
  }

  generatePizza() {
    const selectedMood = document.querySelector('.mood-input:checked').value;
    const moodData = pizzaData[selectedMood];
    
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.textContent;
    generateBtn.innerHTML = '<span class="loading"></span> Cooking your pizza...';
    generateBtn.disabled = true;

    // Simulate cooking time
    setTimeout(() => {
      // Generate random pizza
      const randomName = this.getRandomItem(moodData.names);
      const randomToppings = this.getRandomToppings(moodData.toppings, 3, 5);
      const randomDescription = this.getRandomItem(moodData.descriptions);

      this.currentPizza = {
        name: randomName,
        toppings: randomToppings,
        description: randomDescription,
        mood: selectedMood
      };

      this.displayPizza();
      
      // Reset button
      generateBtn.textContent = originalText;
      generateBtn.disabled = false;
    }, 2000);
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomToppings(toppings, min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...toppings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  displayPizza() {
    const resultSection = document.getElementById('resultSection');
    const pizzaName = document.getElementById('pizzaName');
    const toppingsList = document.getElementById('toppingsList');
    const pizzaDescription = document.getElementById('pizzaDescription');

    pizzaName.textContent = this.currentPizza.name;
    toppingsList.innerHTML = this.currentPizza.toppings
      .map(topping => `<li>${topping}</li>`)
      .join('');
    pizzaDescription.textContent = this.currentPizza.description;

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
  }

  resetGenerator() {
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'none';
    
    // Clear mood selection
    const moodInputs = document.querySelectorAll('.mood-input');
    moodInputs.forEach(input => input.checked = false);
    
    this.updateGenerateButton();
    
    // Scroll back to top
    document.querySelector('.mood-section').scrollIntoView({ behavior: 'smooth' });
  }

  savePizza() {
    if (this.currentPizza) {
      favoritesManager.addFavorite(this.currentPizza);
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  window.themeManager = new ThemeManager();
  window.favoritesManager = new FavoritesManager();
  window.pizzaGenerator = new PizzaGenerator();
  
  // Display existing favorites
  favoritesManager.displayFavorites();
  
  // Add some fun interactions
  addFunInteractions();
});

// Fun interactions and easter eggs
function addFunInteractions() {
  // Add pizza emoji animation on hover
  const title = document.querySelector('.title');
  title.addEventListener('mouseenter', () => {
    title.style.transform = 'scale(1.05) rotate(2deg)';
  });
  title.addEventListener('mouseleave', () => {
    title.style.transform = 'scale(1) rotate(0deg)';
  });

  // Add click sound effect (visual feedback)
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    });
  });

  // Mood card interactions
  const moodCards = document.querySelectorAll('.mood-card');
  moodCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const emoji = card.querySelector('.mood-emoji');
      emoji.style.transform = 'scale(1.2) rotate(10deg)';
    });
    card.addEventListener('mouseleave', () => {
      const emoji = card.querySelector('.mood-emoji');
      emoji.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);