// Sample movie data (in a real application, this would come from an API)
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        duration: "2h 28m",
        rating: "PG-13",
        category: ["action", "sci-fi", "thriller"],
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sample video URL
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        duration: "2h 32m",
        rating: "PG-13",
        category: ["action", "crime", "drama"],
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 3,
        title: "Pulp Fiction",
        year: 1994,
        duration: "2h 34m",
        rating: "R",
        category: ["crime", "drama"],
        image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        year: 1994,
        duration: "2h 22m",
        rating: "R",
        category: ["drama"],
        image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 5,
        title: "The Godfather",
        year: 1972,
        duration: "2h 55m",
        rating: "R",
        category: ["crime", "drama"],
        image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        cast: "Marlon Brando, Al Pacino, James Caan",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 6,
        title: "Forrest Gump",
        year: 1994,
        duration: "2h 22m",
        rating: "PG-13",
        category: ["drama", "romance"],
        image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
        description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        cast: "Tom Hanks, Robin Wright, Gary Sinise",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 7,
        title: "The Matrix",
        year: 1999,
        duration: "2h 16m",
        rating: "R",
        category: ["action", "sci-fi"],
        image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 8,
        title: "Goodfellas",
        year: 1990,
        duration: "2h 26m",
        rating: "R",
        category: ["biography", "crime", "drama"],
        image: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
        cast: "Robert De Niro, Ray Liotta, Joe Pesci",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 9,
        title: "The Silence of the Lambs",
        year: 1991,
        duration: "1h 58m",
        rating: "R",
        category: ["crime", "drama", "thriller"],
        image: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        cast: "Jodie Foster, Anthony Hopkins, Lawrence A. Bonney",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 10,
        title: "Fight Club",
        year: 1999,
        duration: "2h 19m",
        rating: "R",
        category: ["drama"],
        image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        cast: "Brad Pitt, Edward Norton, Meat Loaf",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 11,
        title: "The Hangover",
        year: 2009,
        duration: "1h 40m",
        rating: "R",
        category: ["comedy"],
        image: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
        description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
        cast: "Zach Galifianakis, Bradley Cooper, Justin Bartha",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 12,
        title: "Superbad",
        year: 2007,
        duration: "1h 53m",
        rating: "R",
        category: ["comedy"],
        image: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
        description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        cast: "Michael Cera, Jonah Hill, Christopher Mintz-Plasse",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    }
];

// DOM Elements
const trendingRow = document.getElementById('trending');
const actionRow = document.getElementById('action');
const comedyRow = document.getElementById('comedy');
const dramaRow = document.getElementById('drama');
const modal = document.getElementById('movie-modal');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const videoPlayer = document.getElementById('movie-player');

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Populate movie rows
function populateMovieRow(element, category) {
    let filteredMovies;
    
    if (category === 'trending') {
        // For trending, just get a random selection of movies
        filteredMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
        // Filter by category
        filteredMovies = movies.filter(movie => movie.category.includes(category));
    }
    
    element.innerHTML = '';
    
    filteredMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.dataset.id = movie.id;
        
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h4 class="movie-title">${movie.title}</h4>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        `;
        
        movieCard.addEventListener('click', () => openMovieModal(movie.id));
        
        element.appendChild(movieCard);
    });
}

// Open movie modal
function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    
    if (movie) {
        document.getElementById('modal-title').textContent = movie.title;
        document.getElementById('modal-year').textContent = movie.year;
        document.getElementById('modal-duration').textContent = movie.duration;
        document.getElementById('modal-rating').textContent = movie.rating;
        document.getElementById('modal-description').textContent = movie.description;
        document.getElementById('modal-cast').textContent = movie.cast;
        
        // Set video source
        videoPlayer.innerHTML = `<source src="${movie.videoUrl}" type="video/mp4">`;
        videoPlayer.load();
        
        modal.style.display = 'block';
    }
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    videoPlayer.pause();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        videoPlayer.pause();
    }
});

// Search functionality
function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // If search is empty, reset to default view
        initializeMovieRows();
        return;
    }
    
    // Filter movies by search term
    const searchResults = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) || 
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.cast.toLowerCase().includes(searchTerm)
    );
    
    // Clear all rows
    trendingRow.innerHTML = '';
    actionRow.innerHTML = '';
    comedyRow.innerHTML = '';
    dramaRow.innerHTML = '';
    
    // Display search results in trending row
    if (searchResults.length > 0) {
        document.querySelector('.movie-section h3').textContent = 'Search Results';
        
        searchResults.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.dataset.id = movie.id;
            
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h4 class="movie-title">${movie.title}</h4>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span>${movie.rating}</span>
                    </div>
                </div>
            `;
            
            movieCard.addEventListener('click', () => openMovieModal(movie.id));
            
            trendingRow.appendChild(movieCard);
        });
    } else {
        document.querySelector('.movie-section h3').textContent = 'No Results Found';
    }
}

searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

// Initialize movie rows
function initializeMovieRows() {
    populateMovieRow(trendingRow, 'trending');
    populateMovieRow(actionRow, 'action');
    populateMovieRow(comedyRow, 'comedy');
    populateMovieRow(dramaRow, 'drama');
}

// Hero play button functionality
document.querySelector('.play-btn').addEventListener('click', () => {
    // For demo purposes, open the first movie
    openMovieModal(1);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeMovieRows();
});