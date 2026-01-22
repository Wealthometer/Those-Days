// Gallery-specific functionality
let currentFilter = "all"
let currentView = "grid"
let favorites = JSON.parse(localStorage.getItem("monoworld-favorites") || "[]")

// Initialize Gallery
document.addEventListener("DOMContentLoaded", () => {
  initializeGalleryFilters()
  initializeViewControls()
  initializeFavorites()
  initializeLoadMore()
  initializeModelViewer()
  checkURLParams()
})

// Gallery Filters
function initializeGalleryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")
      setActiveFilter(filter)
      filterGalleryItems(filter)
    })
  })
}

function setActiveFilter(filter) {
  currentFilter = filter

  // Update button states
  const filterBtns = document.querySelectorAll(".filter-btn")
  filterBtns.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-filter") === filter) {
      btn.classList.add("active")
    }
  })
}

function filterGalleryItems(filter) {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item, index) => {
    const category = item.getAttribute("data-category")
    const shouldShow = filter === "all" || category === filter

    if (shouldShow) {
      item.style.display = "block"
      // Animate in with delay
      setTimeout(() => {
        item.classList.add("visible")
      }, index * 100)
    } else {
      item.classList.remove("visible")
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })

  // Update URL
  const url = new URL(window.location)
  if (filter === "all") {
    url.searchParams.delete("category")
  } else {
    url.searchParams.set("category", filter)
  }
  window.history.replaceState({}, "", url)
}

// View Controls
function initializeViewControls() {
  const viewBtns = document.querySelectorAll(".view-btn")

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view")
      setActiveView(view)
      updateGalleryView(view)
    })
  })
}

function setActiveView(view) {
  currentView = view

  // Update button states
  const viewBtns = document.querySelectorAll(".view-btn")
  viewBtns.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-view") === view) {
      btn.classList.add("active")
    }
  })
}

function updateGalleryView(view) {
  const galleryGrid = document.getElementById("galleryGrid")
  if (!galleryGrid) return

  if (view === "list") {
    galleryGrid.classList.add("list-view")
    galleryGrid.style.gridTemplateColumns = "1fr"
  } else {
    galleryGrid.classList.remove("list-view")
    galleryGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(350px, 1fr))"
  }
}

// Favorites System
function initializeFavorites() {
  updateFavoriteButtons()
}

function toggleFavorite(button) {
  const galleryItem = button.closest(".gallery-item")
  const itemId =
    galleryItem.getAttribute("data-category") + "-" + Array.from(galleryItem.parentNode.children).indexOf(galleryItem)

  if (favorites.includes(itemId)) {
    // Remove from favorites
    favorites = favorites.filter((id) => id !== itemId)
    button.classList.remove("favorited")
    showNotification("Removed from favorites", "info")
  } else {
    // Add to favorites
    favorites.push(itemId)
    button.classList.add("favorited")
    showNotification("Added to favorites", "success")
  }

  // Save to localStorage
  localStorage.setItem("monoworld-favorites", JSON.stringify(favorites))

  // Update button appearance
  updateFavoriteButton(button)
}

function updateFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn")
  favoriteButtons.forEach(updateFavoriteButton)
}

function updateFavoriteButton(button) {
  const galleryItem = button.closest(".gallery-item")
  const itemId =
    galleryItem.getAttribute("data-category") + "-" + Array.from(galleryItem.parentNode.children).indexOf(galleryItem)

  if (favorites.includes(itemId)) {
    button.classList.add("favorited")
    button.setAttribute("aria-label", "Remove from favorites")
  } else {
    button.classList.remove("favorited")
    button.setAttribute("aria-label", "Add to favorites")
  }
}

// Load More Functionality
function initializeLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (!loadMoreBtn) return

  loadMoreBtn.addEventListener("click", loadMoreItems)
}

function loadMoreItems() {
  const galleryGrid = document.getElementById("galleryGrid")
  const loadMoreBtn = document.getElementById("loadMoreBtn")

  if (!galleryGrid || !loadMoreBtn) return

  // Simulate loading
  loadMoreBtn.textContent = "Loading..."
  loadMoreBtn.disabled = true

  setTimeout(() => {
    // Add more gallery items (simulated)
    const newItems = createAdditionalGalleryItems()
    newItems.forEach((item) => {
      galleryGrid.appendChild(item)
    })

    // Reset button
    loadMoreBtn.textContent = "Load More Models"
    loadMoreBtn.disabled = false

    // Initialize new items
    initializeFavorites()

    // Animate new items
    const newGalleryItems = galleryGrid.querySelectorAll(".gallery-item:not(.visible)")
    newGalleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible")
      }, index * 100)
    })

    showNotification("Loaded more models", "success")
  }, 1500)
}

function createAdditionalGalleryItems() {
  const additionalItems = [
    {
      category: "abstract",
      title: "Fluid Dynamics",
      artist: "Motion Studio",
      tags: ["Abstract", "Fluid"],
      icon: "🌊",
    },
    {
      category: "sculpture",
      title: "Monolithic Form",
      artist: "Stone Collective",
      tags: ["Sculpture", "Monolithic"],
      icon: "🗿",
    },
    {
      category: "technology",
      title: "Neural Network",
      artist: "AI Labs",
      tags: ["Technology", "AI"],
      icon: "🧠",
    },
  ]

  return additionalItems.map((item) => createGalleryItem(item))
}

function createGalleryItem(itemData) {
  const galleryItem = document.createElement("div")
  galleryItem.className = "gallery-item"
  galleryItem.setAttribute("data-category", itemData.category)

  galleryItem.innerHTML = `
        <div class="item-preview">
            <div class="model-placeholder">
                <div class="placeholder-content">
                    <div class="placeholder-icon">${itemData.icon}</div>
                    <p>${itemData.title}</p>
                </div>
            </div>
            <div class="item-overlay">
                <button class="view-btn-3d" onclick="openModelViewer('${itemData.title.toLowerCase().replace(/\s+/g, "")}')">View in 3D</button>
                <button class="favorite-btn" onclick="toggleFavorite(this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="item-info">
            <h3 class="item-title">${itemData.title}</h3>
            <p class="item-artist">By ${itemData.artist}</p>
            <div class="item-tags">
                ${itemData.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
        </div>
    `

  return galleryItem
}

// Model Viewer
function initializeModelViewer() {
  // Initialize model viewer modal functionality
  const modelViewerModal = document.getElementById("modelViewerModal")
  if (modelViewerModal) {
    // Add event listeners for model viewer controls
    initializeModelViewerControls()
  }
}

function openModelViewer(modelId) {
  const modal = document.getElementById("modelViewerModal")
  const title = document.getElementById("modelViewerTitle")
  const frame = document.getElementById("modelViewerFrame")

  if (!modal || !title || !frame) return

  // Set title
  title.textContent = `3D Model Viewer - ${modelId}`

  // Load model (simulated)
  frame.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--bg-secondary); color: var(--text-muted); font-size: 1.2rem;">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎨</div>
                <p>3D Model: ${modelId}</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Interactive viewer would load here</p>
            </div>
        </div>
    `

  // Show modal
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModelViewer() {
  const modal = document.getElementById("modelViewerModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

function initializeModelViewerControls() {
  // These would control the actual 3D viewer
  window.resetModelView = () => {
    showNotification("Model view reset", "info")
  }

  window.toggleAutoRotate = () => {
    showNotification("Auto rotate toggled", "info")
  }

  window.toggleWireframe = () => {
    showNotification("Wireframe mode toggled", "info")
  }
}

// URL Parameters
function checkURLParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")

  if (category && category !== "all") {
    setActiveFilter(category)
    filterGalleryItems(category)
  }
}

// Search Functionality (if needed)
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      const query = e.target.value.toLowerCase().trim()
      searchGalleryItems(query)
    }, 300),
  )
}

function searchGalleryItems(query) {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    const title = item.querySelector(".item-title").textContent.toLowerCase()
    const artist = item.querySelector(".item-artist").textContent.toLowerCase()
    const tags = Array.from(item.querySelectorAll(".tag")).map((tag) => tag.textContent.toLowerCase())

    const matches = title.includes(query) || artist.includes(query) || tags.some((tag) => tag.includes(query))

    if (matches || query === "") {
      item.style.display = "block"
      item.classList.add("visible")
    } else {
      item.classList.remove("visible")
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })
}

// Export gallery functions
window.GalleryManager = {
  toggleFavorite,
  openModelViewer,
  closeModelViewer,
  filterGalleryItems,
  loadMoreItems,
}
