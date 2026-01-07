class ChatApp {
    constructor() {
        this.currentUser = null;
        this.currentRoom = 'general';
        this.messages = {};
        this.onlineUsers = ['Alice', 'Bob', 'Charlie'];
        this.typingUsers = [];
        this.aiMessages = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
        this.initializeRooms();
        this.startSimulations();
    }

    bindEvents() {
        // Auth events
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchAuthTab(e.target.dataset.tab));
        });

        document.getElementById('loginFormElement').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupFormElement').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        // Chat events
        document.querySelectorAll('.room-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchRoom(e.currentTarget.dataset.room));
        });

        document.getElementById('messageForm').addEventListener('submit', (e) => this.sendMessage(e));
        document.getElementById('messageInput').addEventListener('input', () => this.handleTyping());

        // AI Chat events
        document.getElementById('aiMessageForm').addEventListener('submit', (e) => this.sendAIMessage(e));
        document.getElementById('closeAiChat').addEventListener('click', () => this.closeAIChat());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAIChat();
            }
        });
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('chatUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showChatApp();
        }
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    async handleLogin(e) {
        e.preventDefault();
        const btn = e.target.querySelector('.auth-btn');
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        this.setLoading(btn, true);

        // Simulate API call
        await this.delay(1500);

        const user = {
            id: this.generateId(),
            username: username.includes('@') ? username.split('@')[0] : username,
            email: username.includes('@') ? username : `${username}@example.com`
        };

        this.currentUser = user;
        localStorage.setItem('chatUser', JSON.stringify(user));
        
        this.setLoading(btn, false);
        this.showChatApp();
    }

    async handleSignup(e) {
        e.preventDefault();
        const btn = e.target.querySelector('.auth-btn');
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;

        this.setLoading(btn, true);

        // Simulate API call
        await this.delay(1500);

        const user = {
            id: this.generateId(),
            username: username,
            email: email
        };

        this.currentUser = user;
        localStorage.setItem('chatUser', JSON.stringify(user));
        
        this.setLoading(btn, false);
        this.showChatApp();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('chatUser');
        document.getElementById('authModal').classList.add('active');
        document.getElementById('chatApp').classList.remove('active');
        
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
    }

    showChatApp() {
        document.getElementById('authModal').classList.remove('active');
        document.getElementById('chatApp').classList.add('active');
        document.getElementById('currentUsername').textContent = this.currentUser.username;
        
        this.updateOnlineUsers();
        this.loadMessages();
    }

    initializeRooms() {
        this.messages = {
            general: [
                {
                    id: this.generateId(),
                    content: `Welcome to the general room!`,
                    sender: 'System',
                    timestamp: new Date(),
                    type: 'system'
                }
            ],
            random: [
                {
                    id: this.generateId(),
                    content: `Welcome to the random room!`,
                    sender: 'System',
                    timestamp: new Date(),
                    type: 'system'
                }
            ],
            tech: [
                {
                    id: this.generateId(),
                    content: `Welcome to the tech room!`,
                    sender: 'System',
                    timestamp: new Date(),
                    type: 'system'
                }
            ],
            'ai-chat': []
        };
    }

    switchRoom(room) {
        if (room === 'ai-chat') {
            this.openAIChat();
            return;
        }

        this.currentRoom = room;
        
        // Update UI
        document.querySelectorAll('.room-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-room="${room}"]`).classList.add('active');
        
        // Update header
        const roomIcon = room === 'ai-chat' ? 'fas fa-robot' : 'fas fa-hashtag';
        document.getElementById('currentRoomName').innerHTML = `<i class="${roomIcon}"></i>${room}`;
        document.getElementById('roomDescription').textContent = `${this.onlineUsers.length + 1} members online`;
        
        // Clear unread count
        const roomItem = document.querySelector(`[data-room="${room}"]`);
        const unreadCount = roomItem.querySelector('.unread-count');
        if (unreadCount) {
            unreadCount.remove();
        }
        
        this.loadMessages();
    }

    loadMessages() {
        const messagesList = document.getElementById('messagesList');
        messagesList.innerHTML = '';
        
        const roomMessages = this.messages[this.currentRoom] || [];
        
        roomMessages.forEach(message => {
            this.displayMessage(message);
        });
        
        this.scrollToBottom();
    }

    sendMessage(e) {
        e.preventDefault();
        const input = document.getElementById('messageInput');
        const content = input.value.trim();
        
        if (!content) return;
        
        const message = {
            id: this.generateId(),
            content: content,
            sender: this.currentUser.username,
            timestamp: new Date(),
            type: 'user'
        };
        
        this.addMessage(message);
        input.value = '';
        
        // Auto-resize input
        input.style.height = 'auto';
    }

    addMessage(message) {
        if (!this.messages[this.currentRoom]) {
            this.messages[this.currentRoom] = [];
        }
        
        this.messages[this.currentRoom].push(message);
        this.displayMessage(message);
        this.scrollToBottom();
    }

    displayMessage(message) {
        const messagesList = document.getElementById('messagesList');
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sender === this.currentUser.username ? 'own' : ''} ${message.type}`;
        
        const avatar = message.type !== 'system' ? 
            `<div class="message-avatar">${this.getInitials(message.sender)}</div>` : '';
        
        const header = message.type !== 'system' ? 
            `<div class="message-header">
                <span class="message-sender">${message.sender}</span>
                <span class="message-time">${this.formatTime(message.timestamp)}</span>
            </div>` : '';
        
        messageEl.innerHTML = `
            ${avatar}
            <div class="message-content">
                ${header}
                <div class="message-text">${this.escapeHtml(message.content)}</div>
            </div>
        `;
        
        messagesList.appendChild(messageEl);
    }

    openAIChat() {
        document.getElementById('aiChatModal').classList.add('active');
        document.getElementById('aiMessageInput').focus();
    }

    closeAIChat() {
        document.getElementById('aiChatModal').classList.remove('active');
    }

    async sendAIMessage(e) {
        e.preventDefault();
        const input = document.getElementById('aiMessageInput');
        const content = input.value.trim();
        
        if (!content) return;
        
        const userMessage = {
            id: this.generateId(),
            content: content,
            sender: this.currentUser.username,
            timestamp: new Date(),
            type: 'user'
        };
        
        this.displayAIMessage(userMessage);
        input.value = '';
        
        // Show typing indicator
        this.showAITyping();
        
        // Simulate AI response
        await this.delay(1000 + Math.random() * 2000);
        
        const aiResponse = this.generateAIResponse(content);
        const aiMessage = {
            id: this.generateId(),
            content: aiResponse,
            sender: 'AI Assistant',
            timestamp: new Date(),
            type: 'assistant'
        };
        
        this.hideAITyping();
        this.displayAIMessage(aiMessage);
    }

    displayAIMessage(message) {
        const aiMessages = document.getElementById('aiMessages');
        const messageEl = document.createElement('div');
        messageEl.className = `ai-message ${message.type}`;
        
        const avatarIcon = message.type === 'assistant' ? 'fas fa-robot' : 'fas fa-user';
        
        messageEl.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message.content)}</p>
                <span class="message-time">${this.formatTime(message.timestamp)}</span>
            </div>
        `;
        
        aiMessages.appendChild(messageEl);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    showAITyping() {
        const aiMessages = document.getElementById('aiMessages');
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-message assistant typing';
        typingEl.id = 'aiTyping';
        
        typingEl.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        aiMessages.appendChild(typingEl);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    hideAITyping() {
        const typingEl = document.getElementById('aiTyping');
        if (typingEl) {
            typingEl.remove();
        }
    }

    generateAIResponse(userMessage) {
        const responses = [
            "That's an interesting question! Let me think about that...",
            "I understand what you're asking. Here's my perspective:",
            "Great question! Based on what I know:",
            "I'd be happy to help you with that!",
            "That's a thoughtful inquiry. Let me explain:",
            "I can definitely assist you with that topic.",
            "Thanks for asking! Here's what I think:",
            "That's a complex topic, but I'll do my best to explain:"
        ];
        
        const followups = [
            "Machine learning is revolutionizing how we process data and make predictions.",
            "The key is to break down complex problems into smaller, manageable parts.",
            "Technology continues to evolve at an unprecedented pace.",
            "It's important to consider multiple perspectives when analyzing any situation.",
            "The best solutions often come from collaborative thinking and innovation.",
            "Understanding the fundamentals is crucial before diving into advanced concepts.",
            "Real-world applications often require balancing theory with practical constraints.",
            "Continuous learning and adaptation are essential in today's fast-paced world."
        ];
        
        const starter = responses[Math.floor(Math.random() * responses.length)];
        const followup = followups[Math.floor(Math.random() * followups.length)];
        
        return `${starter} ${followup}`;
    }

    handleTyping() {
        // Simulate typing indicator for other users
        if (Math.random() > 0.95) {
            this.showTypingIndicator();
        }
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        const randomUser = this.onlineUsers[Math.floor(Math.random() * this.onlineUsers.length)];
        
        document.getElementById('typingText').textContent = `${randomUser} is typing...`;
        indicator.classList.add('active');
        
        setTimeout(() => {
            indicator.classList.remove('active');
        }, 2000);
    }

    updateOnlineUsers() {
        const usersList = document.getElementById('onlineUsers');
        const currentUserItem = document.createElement('div');
        currentUserItem.className = 'user-item';
        currentUserItem.innerHTML = `
            <div class="user-status online"></div>
            <span>${this.currentUser.username} (you)</span>
        `;
        
        usersList.appendChild(currentUserItem);
        document.getElementById('onlineCount').textContent = this.onlineUsers.length + 1;
    }

    startSimulations() {
        // Simulate incoming messages
        setInterval(() => {
            if (Math.random() > 0.7 && this.currentRoom !== 'ai-chat') {
                this.simulateIncomingMessage();
            }
        }, 8000);
        
        // Simulate user status changes
        setInterval(() => {
            this.simulateUserStatusChange();
        }, 15000);
    }

    simulateIncomingMessage() {
        const rooms = ['general', 'random', 'tech'];
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        const randomUser = this.onlineUsers[Math.floor(Math.random() * this.onlineUsers.length)];
        
        const messages = [
            "Hey everyone! How's your day going?",
            "Just finished working on an interesting project!",
            "Anyone want to discuss the latest tech trends?",
            "Beautiful weather today, isn't it?",
            "I found this amazing tutorial online, check it out!",
            "Working on some exciting new features!",
            "Coffee break time! ☕",
            "Has anyone tried the new framework that was released?",
            "Great discussion happening here!",
            "Looking forward to the weekend!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const message = {
            id: this.generateId(),
            content: randomMessage,
            sender: randomUser,
            timestamp: new Date(),
            type: 'user'
        };
        
        if (!this.messages[randomRoom]) {
            this.messages[randomRoom] = [];
        }
        
        this.messages[randomRoom].push(message);
        
        // Show notification if not in current room
        if (randomRoom !== this.currentRoom) {
            this.showUnreadCount(randomRoom);
        } else {
            this.displayMessage(message);
            this.scrollToBottom();
        }
    }

    showUnreadCount(room) {
        const roomItem = document.querySelector(`[data-room="${room}"]`);
        let unreadCount = roomItem.querySelector('.unread-count');
        
        if (!unreadCount) {
            unreadCount = document.createElement('div');
            unreadCount.className = 'unread-count';
            unreadCount.textContent = '1';
            roomItem.appendChild(unreadCount);
        } else {
            const count = parseInt(unreadCount.textContent) + 1;
            unreadCount.textContent = count;
        }
    }

    simulateUserStatusChange() {
        // Randomly change user status (just visual simulation)
        const userItems = document.querySelectorAll('.user-item .user-status');
        userItems.forEach(status => {
            if (Math.random() > 0.8) {
                const statuses = ['online', 'away', 'offline'];
                const currentStatus = status.className.split(' ')[1];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (newStatus !== currentStatus) {
                    status.className = `user-status ${newStatus}`;
                }
            }
        });
    }

    // Utility functions
    setLoading(btn, loading) {
        if (loading) {
            btn.classList.add('loading');
            btn.disabled = true;
        } else {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2);
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});

// Add some CSS animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
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
        background: rgba(255, 255, 255, 0.3);
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