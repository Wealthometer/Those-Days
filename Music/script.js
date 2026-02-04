class MusicVisualizerApp {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.audioElement = document.getElementById('audioPlayer');
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isPlaying = false;
        this.currentTrack = null;
        this.playlist = [];
        this.currentPlaylistIndex = 0;
        this.visualizerType = 'bars';
        this.isDarkTheme = false;
        this.volume = 0.7;
        this.isShuffled = false;
        this.repeatMode = 'none'; // none, one, all
        
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAudioContext();
        this.setupCanvas();
        this.loadSampleTracks();
        this.setupDragAndDrop();
        this.initializeTheme();
        this.startVisualizerLoop();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchSection(e.target.closest('.nav-item').dataset.section));
        });

        // File upload
        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));

        // Player controls
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousTrack());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextTrack());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.toggleShuffle());
        document.getElementById('repeatBtn').addEventListener('click', () => this.toggleRepeat());

        // Progress bar
        document.getElementById('progressBar').addEventListener('click', (e) => this.seekTo(e));
        document.getElementById('volumeSlider').addEventListener('click', (e) => this.setVolume(e));

        // Visualizer controls
        document.querySelectorAll('.viz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setVisualizerType(e.target.closest('.viz-btn').dataset.viz));
        });

        // Modal controls
        document.getElementById('createPlaylistBtn').addEventListener('click', () => this.openCreatePlaylistModal());
        document.getElementById('createPlaylistBtn2').addEventListener('click', () => this.openCreatePlaylistModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeCreatePlaylistModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeCreatePlaylistModal());
        document.getElementById('createBtn').addEventListener('click', () => this.createPlaylist());

        // Icon selector
        document.querySelectorAll('.icon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectIcon(e.target.closest('.icon-btn')));
        });

        // Audio events
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.handleTrackEnd());
        this.audioElement.addEventListener('loadedmetadata', () => this.updateTrackInfo());

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchTracks(e.target.value));

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e.target.dataset.view));
        });

        // Fullscreen toggle
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('visualizerToggle').addEventListener('click', () => this.switchSection('visualizer'));
    }

    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            const source = this.audioContext.createMediaElementSource(this.audioElement);
            source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        } catch (error) {
            console.error('Error setting up audio context:', error);
        }
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
        });

        uploadArea.addEventListener('drop', (e) => this.handleDrop(e), false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {
        const files = e.dataTransfer.files;
        this.processFiles(files);
    }

    handleFileUpload(e) {
        const files = e.target.files;
        this.processFiles(files);
    }

    processFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('audio/')) {
                this.addTrackToLibrary(file);
            }
        });
    }

    addTrackToLibrary(file) {
        const track = {
            id: this.generateId(),
            name: file.name.replace(/\.[^/.]+$/, ""),
            artist: 'Unknown Artist',
            duration: 0,
            file: file,
            url: URL.createObjectURL(file),
            artwork: '/placeholder.svg?height=200&width=200'
        };

        this.playlist.push(track);
        this.updateLibraryDisplay();
        this.showNotification(`Added "${track.name}" to library`);
    }

    loadSampleTracks() {
        // Sample tracks for demonstration
        const sampleTracks = [
            {
                id: 'sample1',
                name: 'Neon Dreams',
                artist: 'Synthwave Artist',
                duration: 240,
                url: '/placeholder.svg?height=200&width=200', // In real app, this would be audio URL
                artwork: '/placeholder.svg?height=200&width=200'
            },
            {
                id: 'sample2',
                name: 'Digital Horizon',
                artist: 'Electronic Vibes',
                duration: 195,
                url: '/placeholder.svg?height=200&width=200',
                artwork: '/placeholder.svg?height=200&width=200'
            },
            {
                id: 'sample3',
                name: 'Cosmic Journey',
                artist: 'Space Sounds',
                duration: 320,
                url: '/placeholder.svg?height=200&width=200',
                artwork: '/placeholder.svg?height=200&width=200'
            }
        ];

        this.playlist = [...sampleTracks];
        this.updateLibraryDisplay();
        this.updateRecentTracks();
    }

    updateLibraryDisplay() {
        const libraryContent = document.getElementById('libraryContent');
        libraryContent.innerHTML = '';

        this.playlist.forEach(track => {
            const trackElement = this.createTrackElement(track);
            libraryContent.appendChild(trackElement);
        });
    }

    updateRecentTracks() {
        const recentTracks = document.getElementById('recentTracks');
        recentTracks.innerHTML = '';

        this.playlist.slice(0, 6).forEach(track => {
            const trackCard = this.createTrackCard(track);
            recentTracks.appendChild(trackCard);
        });
    }

    createTrackElement(track) {
        const trackEl = document.createElement('div');
        trackEl.className = 'track-card';
        trackEl.innerHTML = `
            <div class="track-artwork">
                <img src="${track.artwork}" alt="${track.name}">
                <div class="artwork-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="track-info">
                <h4>${track.name}</h4>
                <p>${track.artist}</p>
            </div>
        `;

        trackEl.addEventListener('click', () => this.playTrack(track));
        return trackEl;
    }

    createTrackCard(track) {
        const cardEl = document.createElement('div');
        cardEl.className = 'track-card';
        cardEl.innerHTML = `
            <div class="track-artwork">
                <img src="${track.artwork}" alt="${track.name}">
                <div class="artwork-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="track-info">
                <h4>${track.name}</h4>
                <p>${track.artist}</p>
            </div>
        `;

        cardEl.addEventListener('click', () => this.playTrack(track));
        return cardEl;
    }

    playTrack(track) {
        this.currentTrack = track;
        this.currentPlaylistIndex = this.playlist.findIndex(t => t.id === track.id);
        
        if (track.url && !track.url.includes('placeholder')) {
            this.audioElement.src = track.url;
            this.audioElement.load();
        }
        
        this.updatePlayerDisplay();
        this.play();
    }

    play() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // For demo purposes, we'll simulate playback
        this.isPlaying = true;
        this.updatePlayButton();
        this.startProgressSimulation();
        this.showNotification(`Now playing: ${this.currentTrack?.name || 'Unknown'}`);
    }

    pause() {
        this.isPlaying = false;
        this.audioElement.pause();
        this.updatePlayButton();
        this.stopProgressSimulation();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentTrack) {
                this.play();
            } else if (this.playlist.length > 0) {
                this.playTrack(this.playlist[0]);
            }
        }
    }

    previousTrack() {
        if (this.playlist.length === 0) return;
        
        this.currentPlaylistIndex = this.currentPlaylistIndex > 0 
            ? this.currentPlaylistIndex - 1 
            : this.playlist.length - 1;
            
        this.playTrack(this.playlist[this.currentPlaylistIndex]);
    }

    nextTrack() {
        if (this.playlist.length === 0) return;
        
        if (this.isShuffled) {
            this.currentPlaylistIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentPlaylistIndex = this.currentPlaylistIndex < this.playlist.length - 1 
                ? this.currentPlaylistIndex + 1 
                : 0;
        }
        
        this.playTrack(this.playlist[this.currentPlaylistIndex]);
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffleBtn');
        shuffleBtn.classList.toggle('active', this.isShuffled);
        this.showNotification(`Shuffle ${this.isShuffled ? 'enabled' : 'disabled'}`);
    }

    toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        
        const repeatBtn = document.getElementById('repeatBtn');
        repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
        
        const icon = repeatBtn.querySelector('i');
        if (this.repeatMode === 'one') {
            icon.className = 'fas fa-redo-alt';
        } else {
            icon.className = 'fas fa-redo';
        }
        
        this.showNotification(`Repeat ${this.repeatMode}`);
    }

    handleTrackEnd() {
        if (this.repeatMode === 'one') {
            this.play();
        } else if (this.repeatMode === 'all' || this.currentPlaylistIndex < this.playlist.length - 1) {
            this.nextTrack();
        } else {
            this.pause();
        }
    }

    updatePlayerDisplay() {
        if (!this.currentTrack) return;
        
        document.getElementById('playerTitle').textContent = this.currentTrack.name;
        document.getElementById('playerArtist').textContent = this.currentTrack.artist;
        document.getElementById('playerArtwork').src = this.currentTrack.artwork;
    }

    updatePlayButton() {
        const playBtn = document.getElementById('playBtn');
        const icon = playBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    updateProgress() {
        if (!this.audioElement.duration) return;
        
        const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressHandle').style.left = `${progress}%`;
        
        document.getElementById('currentTime').textContent = this.formatTime(this.audioElement.currentTime);
        document.getElementById('totalTime').textContent = this.formatTime(this.audioElement.duration);
    }

    startProgressSimulation() {
        // For demo purposes, simulate progress
        this.progressInterval = setInterval(() => {
            if (this.isPlaying && this.currentTrack) {
                const currentTime = parseFloat(document.getElementById('currentTime').textContent.split(':')[0]) * 60 + 
                                 parseFloat(document.getElementById('currentTime').textContent.split(':')[1]) + 1;
                const duration = this.currentTrack.duration || 180;
                
                if (currentTime >= duration) {
                    this.handleTrackEnd();
                    return;
                }
                
                const progress = (currentTime / duration) * 100;
                document.getElementById('progressFill').style.width = `${progress}%`;
                document.getElementById('progressHandle').style.left = `${progress}%`;
                document.getElementById('currentTime').textContent = this.formatTime(currentTime);
                document.getElementById('totalTime').textContent = this.formatTime(duration);
            }
        }, 1000);
    }

    stopProgressSimulation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    seekTo(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (this.audioElement.duration) {
            this.audioElement.currentTime = percent * this.audioElement.duration;
        }
    }

    setVolume(e) {
        const volumeSlider = e.currentTarget;
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        this.volume = Math.max(0, Math.min(1, percent));
        this.audioElement.volume = this.volume;
        
        document.getElementById('volumeFill').style.width = `${this.volume * 100}%`;
        document.getElementById('volumeHandle').style.left = `${this.volume * 100}%`;
        
        const volumeBtn = document.getElementById('volumeBtn');
        const icon = volumeBtn.querySelector('i');
        
        if (this.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Visualizer Methods
    startVisualizerLoop() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.updateVisualizer();
        };
        animate();
    }

    updateVisualizer() {
        if (!this.analyser || !this.dataArray) {
            this.drawStaticVisualizer();
            return;
        }

        this.analyser.getByteFrequencyData(this.dataArray);
        
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);

        switch (this.visualizerType) {
            case 'bars':
                this.drawBars();
                break;
            case 'wave':
                this.drawWave();
                break;
            case 'circle':
                this.drawCircle();
                break;
            case 'particles':
                this.drawParticles();
                break;
        }
    }

    drawStaticVisualizer() {
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Draw static visualization when no audio is playing
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        this.ctx.strokeStyle = this.isDarkTheme ? '#667eea' : '#764ba2';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.fillStyle = this.isDarkTheme ? '#667eea' : '#764ba2';
        this.ctx.font = '16px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Play music to see visualizations', centerX, centerY + 80);
    }

    drawBars() {
        const rect = this.canvas.getBoundingClientRect();
        const barWidth = rect.width / this.dataArray.length * 2.5;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = (this.dataArray[i] / 255) * rect.height * 0.8;
            
            const gradient = this.ctx.createLinearGradient(0, rect.height, 0, rect.height - barHeight);
            gradient.addColorStop(0, this.isDarkTheme ? '#667eea' : '#764ba2');
            gradient.addColorStop(1, this.isDarkTheme ? '#764ba2' : '#667eea');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, rect.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }

    drawWave() {
        const rect = this.canvas.getBoundingClientRect();
        const sliceWidth = rect.width / this.dataArray.length;
        let x = 0;

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.isDarkTheme ? '#667eea' : '#764ba2';
        this.ctx.beginPath();

        for (let i = 0; i < this.dataArray.length; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * rect.height / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.lineTo(rect.width, rect.height / 2);
        this.ctx.stroke();
    }

    drawCircle() {
        const rect = this.canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;

        this.ctx.lineWidth = 2;

        for (let i = 0; i < this.dataArray.length; i++) {
            const angle = (i / this.dataArray.length) * Math.PI * 2;
            const amplitude = (this.dataArray[i] / 255) * radius * 0.5;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + amplitude);
            const y2 = centerY + Math.sin(angle) * (radius + amplitude);

            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, this.isDarkTheme ? '#667eea' : '#764ba2');
            gradient.addColorStop(1, this.isDarkTheme ? '#764ba2' : '#667eea');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    drawParticles() {
        const rect = this.canvas.getBoundingClientRect();
        
        // Add new particles based on audio data
        if (this.isPlaying && this.dataArray) {
            for (let i = 0; i < this.dataArray.length; i += 8) {
                if (this.dataArray[i] > 128) {
                    this.particles.push({
                        x: Math.random() * rect.width,
                        y: Math.random() * rect.height,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        size: (this.dataArray[i] / 255) * 8 + 2,
                        life: 1.0,
                        decay: 0.02
                    });
                }
            }
        }

        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.99;

            if (particle.life > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = this.isDarkTheme ? '#667eea' : '#764ba2';
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
                return true;
            }
            return false;
        });
    }

    setVisualizerType(type) {
        this.visualizerType = type;
        
        document.querySelectorAll('.viz-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-viz="${type}"]`).classList.add('active');
        
        this.showNotification(`Visualizer: ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    }

    // Theme Methods
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.isDarkTheme = savedTheme === 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        const theme = this.isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.showNotification(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme activated`);
    }

    // Navigation Methods
    switchSection(section) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        document.getElementById(section).classList.add('active');
        
        if (section === 'visualizer') {
            this.resizeCanvas();
        }
    }

    // Playlist Methods
    openCreatePlaylistModal() {
        document.getElementById('createPlaylistModal').classList.add('active');
        document.getElementById('playlistNameInput').focus();
    }

    closeCreatePlaylistModal() {
        document.getElementById('createPlaylistModal').classList.remove('active');
        this.resetCreatePlaylistForm();
    }

    resetCreatePlaylistForm() {
        document.getElementById('playlistNameInput').value = '';
        document.getElementById('playlistDescInput').value = '';
        document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.icon-btn[data-icon="fas fa-music"]').classList.add('active');
    }

    selectIcon(iconBtn) {
        document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
        iconBtn.classList.add('active');
    }

    createPlaylist() {
        const name = document.getElementById('playlistNameInput').value.trim();
        const description = document.getElementById('playlistDescInput').value.trim();
        const selectedIcon = document.querySelector('.icon-btn.active').dataset.icon;

        if (!name) {
            this.showNotification('Please enter a playlist name', 'error');
            return;
        }

        const playlist = {
            id: this.generateId(),
            name: name,
            description: description || 'No description',
            icon: selectedIcon,
            tracks: [],
            createdAt: new Date()
        };

        this.addPlaylistToSidebar(playlist);
        this.closeCreatePlaylistModal();
        this.showNotification(`Playlist "${name}" created successfully`);
    }

    addPlaylistToSidebar(playlist) {
        const playlistList = document.getElementById('playlistList');
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.dataset.playlist = playlist.id;
        playlistItem.innerHTML = `
            <i class="${playlist.icon}"></i>
            <span>${playlist.name}</span>
            <span class="track-count">${playlist.tracks.length}</span>
        `;
        
        playlistList.appendChild(playlistItem);
        
        playlistItem.addEventListener('click', () => this.openPlaylist(playlist));
    }

    openPlaylist(playlist) {
        this.showNotification(`Opening playlist: ${playlist.name}`);
        // Implementation for opening playlist view
    }

    // Search Methods
    searchTracks(query) {
        const filteredTracks = this.playlist.filter(track => 
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayFilteredTracks(filteredTracks);
    }

    displayFilteredTracks(tracks) {
        const libraryContent = document.getElementById('libraryContent');
        libraryContent.innerHTML = '';

        tracks.forEach(track => {
            const trackElement = this.createTrackElement(track);
            libraryContent.appendChild(trackElement);
        });
    }

    // View Methods
    toggleView(view) {
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        const libraryContent = document.getElementById('libraryContent');
        libraryContent.className = `library-content ${view}-view`;
        
        this.showNotification(`View: ${view.charAt(0).toUpperCase() + view.slice(1)}`);
    }

    // Fullscreen Methods
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Utility Methods
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 12px 16px;
            color: var(--text-primary);
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            max-width: 300px;
        `;
        
        if (type === 'error') {
            notification.style.borderColor = '#e74c3c';
            notification.style.color = '#e74c3c';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    updateTrackInfo() {
        if (this.currentTrack) {
            document.getElementById('totalTime').textContent = this.formatTime(this.audioElement.duration || this.currentTrack.duration || 0);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicVisualizerApp();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        box-shadow: 0 10px 30px var(--shadow-medium);
    }
    
    .notification i {
        font-size: 1rem;
    }
    
    .library-content.grid-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .library-content.list-view {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .library-content.list-view .track-card {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
    }
    
    .library-content.list-view .track-artwork {
        width: 50px;
        height: 50px;
        margin-right: 16px;
        margin-bottom: 0;
    }
    
    .library-content.list-view .track-info {
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);