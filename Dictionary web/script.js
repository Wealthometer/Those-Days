class GlobalWordDictionary {
    constructor() {
        this.currentSection = 'dictionary';
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.loadHistory();
        this.loadFavorites();
    }

    initializeElements() {
        // Navigation elements
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.sections = document.querySelectorAll('.section');
        this.themeToggle = document.getElementById('themeToggle');

        // Search elements
        this.sourceLanguage = document.getElementById('sourceLanguage');
        this.targetLanguage = document.getElementById('targetLanguage');
        this.swapLanguages = document.getElementById('swapLanguages');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.suggestions = document.getElementById('suggestions');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.resultsContainer = document.getElementById('resultsContainer');

        // History and favorites elements
        this.historyList = document.getElementById('historyList');
        this.favoritesList = document.getElementById('favoritesList');
        this.clearHistory = document.getElementById('clearHistory');
        this.clearFavorites = document.getElementById('clearFavorites');

        // Audio element
        this.audioPlayer = document.getElementById('audioPlayer');
    }

    bindEvents() {
        // Navigation events
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-btn').dataset.section;
                this.switchSection(section);
            });
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Language swap
        this.swapLanguages.addEventListener('click', () => this.swapLanguagePair());

        // Search events
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        this.searchInput.addEventListener('input', () => this.handleSearchInput());

        // Voice search
        this.voiceBtn.addEventListener('click', () => this.startVoiceSearch());

        // Clear buttons
        this.clearHistory.addEventListener('click', () => this.clearSearchHistory());
        this.clearFavorites.addEventListener('click', () => this.clearAllFavorites());

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideSuggestions();
            }
        });
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    switchSection(sectionName) {
        // Update navigation
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        this.sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;
    }

    swapLanguagePair() {
        const sourceValue = this.sourceLanguage.value;
        const targetValue = this.targetLanguage.value;
        
        this.sourceLanguage.value = targetValue;
        this.targetLanguage.value = sourceValue;
    }

    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        const sourceLang = this.sourceLanguage.value;
        const targetLang = this.targetLanguage.value;

        this.showLoading();
        this.hideSuggestions();

        try {
            const result = await this.searchWord(query, sourceLang, targetLang);
            this.displayResults(result, query, sourceLang, targetLang);
            this.addToHistory(query, sourceLang, targetLang, result);
        } catch (error) {
            this.displayError('Failed to fetch translation. Please try again.');
            console.error('Search error:', error);
        } finally {
            this.hideLoading();
        }
    }

    async searchWord(word, sourceLang, targetLang) {
        // Using multiple APIs for better coverage
        try {
            // Try LibreTranslate first (free and open source)
            const libreResult = await this.searchWithLibreTranslate(word, sourceLang, targetLang);
            if (libreResult) return libreResult;
        } catch (error) {
            console.log('LibreTranslate failed, trying fallback...');
        }

        // Fallback to mock data for demonstration
        return this.getMockTranslation(word, sourceLang, targetLang);
    }

    async searchWithLibreTranslate(word, sourceLang, targetLang) {
        // Note: In a real application, you would use your own LibreTranslate instance
        // or a paid API service. This is a demonstration structure.
        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: word,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        if (!response.ok) throw new Error('Translation failed');
        
        const data = await response.json();
        
        return {
            word: word,
            translation: data.translatedText,
            sourceLang: sourceLang,
            targetLang: targetLang,
            definitions: [
                {
                    partOfSpeech: 'unknown',
                    definitions: [
                        {
                            definition: `Translation of "${word}" from ${this.getLanguageName(sourceLang)} to ${this.getLanguageName(targetLang)}`,
                            example: `Example: "${word}" means "${data.translatedText}"`
                        }
                    ]
                }
            ],
            phonetic: '',
            synonyms: []
        };
    }

    getMockTranslation(word, sourceLang, targetLang) {
        // Mock data for demonstration purposes
        const mockTranslations = {
            'peace': {
                'ha': 'zaman lafiya',
                'yo': 'alafia',
                'sw': 'amani',
                'fr': 'paix',
                'es': 'paz',
                'de': 'Frieden'
            },
            'love': {
                'ha': 'soyayya',
                'yo': 'ife',
                'sw': 'upendo',
                'fr': 'amour',
                'es': 'amor',
                'de': 'Liebe'
            },
            'water': {
                'ha': 'ruwa',
                'yo': 'omi',
                'sw': 'maji',
                'fr': 'eau',
                'es': 'agua',
                'de': 'Wasser'
            },
            'hello': {
                'ha': 'sannu',
                'yo': 'bawo',
                'sw': 'hujambo',
                'fr': 'bonjour',
                'es': 'hola',
                'de': 'hallo'
            }
        };

        const translation = mockTranslations[word.toLowerCase()]?.[targetLang] || `[${word} in ${this.getLanguageName(targetLang)}]`;

        return {
            word: word,
            translation: translation,
            sourceLang: sourceLang,
            targetLang: targetLang,
            phonetic: this.getMockPhonetic(word),
            definitions: [
                {
                    partOfSpeech: 'noun',
                    definitions: [
                        {
                            definition: `The word "${word}" translated to ${this.getLanguageName(targetLang)}`,
                            example: `Example: "${word}" is "${translation}" in ${this.getLanguageName(targetLang)}.`
                        }
                    ]
                }
            ],
            synonyms: this.getMockSynonyms(word)
        };
    }

    getMockPhonetic(word) {
        const phonetics = {
            'peace': '/piːs/',
            'love': '/lʌv/',
            'water': '/ˈwɔːtər/',
            'hello': '/həˈloʊ/'
        };
        return phonetics[word.toLowerCase()] || `/${word}/`;
    }

    getMockSynonyms(word) {
        const synonyms = {
            'peace': ['tranquility', 'harmony', 'serenity', 'calm'],
            'love': ['affection', 'adoration', 'devotion', 'care'],
            'water': ['H2O', 'liquid', 'fluid', 'aqua'],
            'hello': ['hi', 'greetings', 'salutations', 'hey']
        };
        return synonyms[word.toLowerCase()] || [];
    }

    getLanguageName(code) {
        const languages = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ko': 'Korean',
            'ar': 'Arabic',
            'hi': 'Hindi',
            'sw': 'Swahili',
            'yo': 'Yoruba',
            'ha': 'Hausa',
            'ig': 'Igbo',
            'am': 'Amharic',
            'zu': 'Zulu'
        };
        return languages[code] || code.toUpperCase();
    }

    displayResults(result, query, sourceLang, targetLang) {
        const resultHtml = `
            <div class="result-card">
                <div class="result-header">
                    <div class="word-info">
                        <span class="word-text">${result.word}</span>
                        ${result.phonetic ? `<span class="phonetic">${result.phonetic}</span>` : ''}
                    </div>
                    <div class="result-actions">
                        <button class="action-btn" onclick="dictionary.playPronunciation('${result.word}', '${sourceLang}')" title="Play pronunciation">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="action-btn ${this.isFavorite(result.word, result.translation) ? 'favorited' : ''}" 
                                onclick="dictionary.toggleFavorite('${result.word}', '${result.translation}', '${sourceLang}', '${targetLang}')" 
                                title="Add to favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                
                <div class="translation-section">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                        ${this.getLanguageName(sourceLang)} → ${this.getLanguageName(targetLang)}
                    </h3>
                    <div style="font-size: 1.25rem; font-weight: 600; color: var(--success-color); margin-bottom: 1rem;">
                        ${result.translation}
                    </div>
                </div>

                ${result.definitions.map(def => `
                    <div class="definition-section">
                        <div class="part-of-speech">${def.partOfSpeech}</div>
                        ${def.definitions.map(definition => `
                            <div class="definition">
                                <div class="definition-text">${definition.definition}</div>
                                ${definition.example ? `<div class="example">${definition.example}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}

                ${result.synonyms.length > 0 ? `
                    <div class="synonyms">
                        <div class="synonyms-title">Synonyms:</div>
                        <div class="synonyms-list">
                            ${result.synonyms.map(synonym => `
                                <span class="synonym" onclick="dictionary.searchSynonym('${synonym}')">${synonym}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this.results.innerHTML = resultHtml;
    }

    displayError(message) {
        this.results.innerHTML = `
            <div class="result-card" style="text-align: center; color: var(--error-color);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>${message}</p>
            </div>
        `;
    }

    showLoading() {
        this.loading.classList.add('show');
        this.results.innerHTML = '';
    }

    hideLoading() {
        this.loading.classList.remove('show');
    }

    handleSearchInput() {
        const query = this.searchInput.value.trim();
        if (query.length > 1) {
            this.showSuggestions(query);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(query) {
        // Mock suggestions - in a real app, you'd fetch from an API
        const mockSuggestions = [
            'peace', 'peaceful', 'peacekeeping',
            'love', 'lovely', 'loving',
            'water', 'waterfall', 'watery',
            'hello', 'help', 'health'
        ].filter(word => word.toLowerCase().includes(query.toLowerCase()));

        if (mockSuggestions.length > 0) {
            const suggestionsHtml = mockSuggestions.slice(0, 5).map(suggestion => `
                <div class="suggestion-item" onclick="dictionary.selectSuggestion('${suggestion}')">
                    ${suggestion}
                </div>
            `).join('');

            this.suggestions.innerHTML = suggestionsHtml;
            this.suggestions.style.display = 'block';
        } else {
            this.hideSuggestions();
        }
    }

    hideSuggestions() {
        this.suggestions.style.display = 'none';
    }

    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion;
        this.hideSuggestions();
        this.performSearch();
    }

    async playPronunciation(word, language) {
        try {
            // Using Web Speech API for text-to-speech
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.lang = this.getSpeechLang(language);
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            } else {
                console.log('Speech synthesis not supported');
            }
        } catch (error) {
            console.error('Pronunciation error:', error);
        }
    }

    getSpeechLang(langCode) {
        const speechLangs = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-PT',
            'ru': 'ru-RU',
            'zh': 'zh-CN',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'ar': 'ar-SA',
            'hi': 'hi-IN'
        };
        return speechLangs[langCode] || 'en-US';
    }

    startVoiceSearch() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice search is not supported in your browser');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = this.getSpeechLang(this.sourceLanguage.value);
        recognition.continuous = false;
        recognition.interimResults = false;

        this.voiceBtn.classList.add('listening');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.searchInput.value = transcript;
            this.performSearch();
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert('Voice search failed. Please try again.');
        };

        recognition.onend = () => {
            this.voiceBtn.classList.remove('listening');
        };

        recognition.start();
    }

    addToHistory(word, sourceLang, targetLang, result) {
        const historyItem = {
            id: Date.now(),
            word: word,
            translation: result.translation,
            sourceLang: sourceLang,
            targetLang: targetLang,
            timestamp: new Date().toISOString(),
            result: result
        };

        // Remove duplicate if exists
        this.searchHistory = this.searchHistory.filter(item => 
            !(item.word.toLowerCase() === word.toLowerCase() && 
              item.sourceLang === sourceLang && 
              item.targetLang === targetLang)
        );

        // Add to beginning of array
        this.searchHistory.unshift(historyItem);

        // Keep only last 50 items
        this.searchHistory = this.searchHistory.slice(0, 50);

        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        this.loadHistory();
    }

    loadHistory() {
        if (this.searchHistory.length === 0) {
            this.historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>No search history yet</p>
                </div>
            `;
            return;
        }

        const historyHtml = this.searchHistory.map(item => `
            <div class="history-item" onclick="dictionary.repeatSearch('${item.word}', '${item.sourceLang}', '${item.targetLang}')">
                <div class="item-header">
                    <span class="item-word">${item.word}</span>
                    <span class="item-translation">${item.translation}</span>
                </div>
                <div class="item-meta">
                    <span class="language-pair-text">${this.getLanguageName(item.sourceLang)} → ${this.getLanguageName(item.targetLang)}</span>
                    <span>${this.formatDate(item.timestamp)}</span>
                </div>
            </div>
        `).join('');

        this.historyList.innerHTML = historyHtml;
    }

    repeatSearch(word, sourceLang, targetLang) {
        this.sourceLanguage.value = sourceLang;
        this.targetLanguage.value = targetLang;
        this.searchInput.value = word;
        this.switchSection('dictionary');
        this.performSearch();
    }

    clearSearchHistory() {
        if (confirm('Are you sure you want to clear all search history?')) {
            this.searchHistory = [];
            localStorage.removeItem('searchHistory');
            this.loadHistory();
        }
    }

    toggleFavorite(word, translation, sourceLang, targetLang) {
        const favoriteId = `${word}-${sourceLang}-${targetLang}`;
        const existingIndex = this.favorites.findIndex(fav => fav.id === favoriteId);

        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
        } else {
            this.favorites.push({
                id: favoriteId,
                word: word,
                translation: translation,
                sourceLang: sourceLang,
                targetLang: targetLang,
                timestamp: new Date().toISOString()
            });
        }

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.loadFavorites();
        
        // Update the heart icon in results
        const heartBtn = document.querySelector(`[onclick*="toggleFavorite('${word}'"]`);
        if (heartBtn) {
            heartBtn.classList.toggle('favorited');
        }
    }

    isFavorite(word, translation) {
        const favoriteId = `${word}-${this.sourceLanguage.value}-${this.targetLanguage.value}`;
        return this.favorites.some(fav => fav.id === favoriteId);
    }

    loadFavorites() {
        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No favorites yet</p>
                </div>
            `;
            return;
        }

        const favoritesHtml = this.favorites.map(item => `
            <div class="favorite-item" onclick="dictionary.repeatSearch('${item.word}', '${item.sourceLang}', '${item.targetLang}')">
                <div class="item-header">
                    <span class="item-word">${item.word}</span>
                    <span class="item-translation">${item.translation}</span>
                </div>
                <div class="item-meta">
                    <span class="language-pair-text">${this.getLanguageName(item.sourceLang)} → ${this.getLanguageName(item.targetLang)}</span>
                    <span>${this.formatDate(item.timestamp)}</span>
                </div>
            </div>
        `).join('');

        this.favoritesList.innerHTML = favoritesHtml;
    }

    clearAllFavorites() {
        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            localStorage.removeItem('favorites');
            this.loadFavorites();
        }
    }

    searchSynonym(synonym) {
        this.searchInput.value = synonym;
        this.performSearch();
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        
        return date.toLocaleDateString();
    }
}

// Initialize the dictionary when the page loads
let dictionary;
document.addEventListener('DOMContentLoaded', () => {
    dictionary = new GlobalWordDictionary();
});

// Make dictionary available globally for onclick handlers
window.dictionary = dictionary;