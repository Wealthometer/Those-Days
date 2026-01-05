// Search Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const searchForm = document.getElementById("search-form")
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")
  const translationSelect = document.getElementById("translation-select")
  const searchTypeRadios = document.querySelectorAll('input[name="search-type"]')
  const customScopeToggle = document.getElementById("custom-scope-toggle")
  const customScopeSection = document.querySelector(".custom-scope")
  const bookSelectionBtn = document.getElementById("book-selection-btn")
  const bookSelectionModal = document.getElementById("book-selection-modal")
  const closeModalBtn = document.getElementById("close-modal")
  const bookTabs = document.querySelectorAll(".book-tab")
  const testamentBooks = document.querySelectorAll(".testament-books")
  const categoryCheckboxes = document.querySelectorAll(".book-category-checkbox")
  const bookCheckboxes = document.querySelectorAll(".book-checkbox")
  const selectAllBtn = document.getElementById("select-all-btn")
  const clearSelectionBtn = document.getElementById("clear-selection-btn")
  const applySelectionBtn = document.getElementById("apply-selection-btn")
  const selectedBooksCount = document.getElementById("selected-books-count")
  const selectedBooksDisplay = document.getElementById("selected-books-display")
  const sortResultsBtn = document.getElementById("sort-results")
  const sortDropdown = document.querySelector(".sort-dropdown")
  const sortOptions = document.querySelectorAll(".sort-dropdown button")
  const resultsContainer = document.getElementById("search-results-container")
  const initialState = document.querySelector(".initial-state")
  const noResults = document.querySelector(".no-results")
  const noResultsTerm = document.getElementById("no-results-term")
  const resultsList = document.querySelector(".results-list")
  const resultsCount = document.getElementById("results-count")
  const popularSearchTags = document.querySelectorAll(".search-tag")
  const paginationPrev = document.getElementById("pagination-prev")
  const paginationNext = document.getElementById("pagination-next")
  const currentPage = document.getElementById("current-page")
  const totalPages = document.getElementById("total-pages")

  // Search state
  const searchState = {
    query: "",
    translation: "kjv",
    searchType: "all",
    selectedBooks: [],
    currentPage: 1,
    totalPages: 1,
    sortBy: "relevance",
    results: [],
  }

  // Initialize the search page
  function initSearchPage() {
    // Check if there's a query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const queryParam = urlParams.get("q")

    if (queryParam) {
      searchInput.value = queryParam
      searchState.query = queryParam
      performSearch()
    } else {
      // Show initial state
      showInitialState()
    }

    // Set up event listeners
    setupEventListeners()
  }

  // Set up event listeners
  function setupEventListeners() {
    // Search form submission
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        searchState.query = searchInput.value.trim()
        searchState.currentPage = 1

        if (searchState.query) {
          performSearch()

          // Update URL without reloading the page
          const url = new URL(window.location)
          url.searchParams.set("q", searchState.query)
          window.history.pushState({}, "", url)
        }
      })
    }

    // Translation select change
    if (translationSelect) {
      translationSelect.addEventListener("change", () => {
        searchState.translation = translationSelect.value
        if (searchState.query) {
          performSearch()
        }
      })
    }

    // Search type radio buttons
    searchTypeRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        searchState.searchType = radio.value

        // Show/hide custom scope section
        if (radio.value === "custom" && customScopeSection) {
          customScopeSection.style.display = "block"
        } else if (customScopeSection) {
          customScopeSection.style.display = "none"
        }
      })
    })

    // Book selection modal
    if (bookSelectionBtn) {
      bookSelectionBtn.addEventListener("click", () => {
        bookSelectionModal.classList.add("active")
      })
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        bookSelectionModal.classList.remove("active")
      })
    }

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === bookSelectionModal) {
        bookSelectionModal.classList.remove("active")
      }
    })

    // Testament tabs in modal
    bookTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and content
        bookTabs.forEach((t) => t.classList.remove("active"))
        testamentBooks.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        testamentBooks[index].classList.add("active")
      })
    })

    // Category checkboxes (select all books in category)
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const category = checkbox.dataset.category
        const booksInCategory = document.querySelectorAll(`.book-checkbox[data-category="${category}"]`)

        booksInCategory.forEach((book) => {
          book.checked = checkbox.checked
        })

        updateSelectedBooksCount()
      })
    })

    // Individual book checkboxes
    bookCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateSelectedBooksCount()

        // Check if all books in a category are selected
        const category = checkbox.dataset.category
        const booksInCategory = document.querySelectorAll(`.book-checkbox[data-category="${category}"]`)
        const categoryCheckbox = document.querySelector(`.book-category-checkbox[data-category="${category}"]`)

        let allChecked = true
        booksInCategory.forEach((book) => {
          if (!book.checked) {
            allChecked = false
          }
        })

        if (categoryCheckbox) {
          categoryCheckbox.checked = allChecked
        }
      })
    })

    // Select all books button
    if (selectAllBtn) {
      selectAllBtn.addEventListener("click", () => {
        bookCheckboxes.forEach((checkbox) => {
          checkbox.checked = true
        })

        categoryCheckboxes.forEach((checkbox) => {
          checkbox.checked = true
        })

        updateSelectedBooksCount()
      })
    }

    // Clear selection button
    if (clearSelectionBtn) {
      clearSelectionBtn.addEventListener("click", () => {
        bookCheckboxes.forEach((checkbox) => {
          checkbox.checked = false
        })

        categoryCheckboxes.forEach((checkbox) => {
          checkbox.checked = false
        })

        updateSelectedBooksCount()
      })
    }

    // Apply selection button
    if (applySelectionBtn) {
      applySelectionBtn.addEventListener("click", () => {
        // Get selected books
        searchState.selectedBooks = []
        bookCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            searchState.selectedBooks.push(checkbox.value)
          }
        })

        // Update display
        if (selectedBooksDisplay) {
          if (searchState.selectedBooks.length > 0) {
            selectedBooksDisplay.textContent =
              searchState.selectedBooks.length > 3
                ? `${searchState.selectedBooks.slice(0, 3).join(", ")}...`
                : searchState.selectedBooks.join(", ")
          } else {
            selectedBooksDisplay.textContent = "All Books"
          }
        }

        // Close modal
        bookSelectionModal.classList.remove("active")

        // Perform search if there's a query
        if (searchState.query) {
          performSearch()
        }
      })
    }

    // Sort results button
    if (sortResultsBtn) {
      sortResultsBtn.addEventListener("click", () => {
        sortDropdown.classList.toggle("active")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!sortResultsBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
          sortDropdown.classList.remove("active")
        }
      })
    }

    // Sort options
    sortOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Update active class
        sortOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")

        // Update sort state
        searchState.sortBy = option.dataset.sort

        // Update button text
        const sortText = sortResultsBtn.querySelector("span")
        if (sortText) {
          sortText.textContent = option.textContent
        }

        // Close dropdown
        sortDropdown.classList.remove("active")

        // Re-sort results
        if (searchState.results.length > 0) {
          sortResults()
          displayResults()
        }
      })
    })

    // Popular search tags
    popularSearchTags.forEach((tag) => {
      tag.addEventListener("click", () => {
        searchState.query = tag.textContent.trim()
        searchInput.value = searchState.query
        searchState.currentPage = 1
        performSearch()

        // Update URL without reloading the page
        const url = new URL(window.location)
        url.searchParams.set("q", searchState.query)
        window.history.pushState({}, "", url)
      })
    })

    // Pagination
    if (paginationPrev) {
      paginationPrev.addEventListener("click", () => {
        if (searchState.currentPage > 1) {
          searchState.currentPage--
          displayResults()
          window.scrollTo(0, 0)
        }
      })
    }

    if (paginationNext) {
      paginationNext.addEventListener("click", () => {
        if (searchState.currentPage < searchState.totalPages) {
          searchState.currentPage++
          displayResults()
          window.scrollTo(0, 0)
        }
      })
    }
  }

  // Update selected books count
  function updateSelectedBooksCount() {
    let count = 0
    bookCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        count++
      }
    })

    if (selectedBooksCount) {
      selectedBooksCount.textContent = count
    }
  }

  // Perform search
  function performSearch() {
    // Show loading state
    showLoading()

    // In a real application, this would be an API call
    // For demo purposes, we'll simulate with a timeout
    setTimeout(() => {
      // Generate mock results based on the query
      const results = generateMockResults(searchState.query)

      if (results.length > 0) {
        searchState.results = results
        searchState.totalPages = Math.ceil(results.length / 10)

        // Sort results
        sortResults()

        // Display results
        displayResults()
      } else {
        showNoResults()
      }
    }, 1000)
  }

  // Generate mock search results
  function generateMockResults(query) {
    // This is just for demo purposes
    // In a real application, this would be replaced with actual search results from an API

    // If query is empty, return empty results
    if (!query) return []

    const mockVerses = [
      {
        reference: "John 3:16",
        translation: "KJV",
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      },
      {
        reference: "Psalm 23:1",
        translation: "KJV",
        text: "The LORD is my shepherd; I shall not want.",
      },
      {
        reference: "Genesis 1:1",
        translation: "KJV",
        text: "In the beginning God created the heaven and the earth.",
      },
      {
        reference: "Romans 8:28",
        translation: "KJV",
        text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      },
      {
        reference: "Philippians 4:13",
        translation: "KJV",
        text: "I can do all things through Christ which strengtheneth me.",
      },
      {
        reference: "Jeremiah 29:11",
        translation: "KJV",
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      },
      {
        reference: "Proverbs 3:5-6",
        translation: "KJV",
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      },
      {
        reference: "Isaiah 40:31",
        translation: "KJV",
        text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      },
      {
        reference: "Matthew 11:28",
        translation: "KJV",
        text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      },
      {
        reference: "Romans 12:2",
        translation: "KJV",
        text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      },
      {
        reference: "2 Corinthians 5:17",
        translation: "KJV",
        text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
      },
      {
        reference: "Galatians 5:22-23",
        translation: "KJV",
        text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.",
      },
      {
        reference: "Ephesians 2:8-9",
        translation: "KJV",
        text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      },
      {
        reference: "Hebrews 11:1",
        translation: "KJV",
        text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      },
      {
        reference: "1 John 1:9",
        translation: "KJV",
        text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
      },
    ]

    // Filter verses that contain the query (case insensitive)
    const queryLower = query.toLowerCase()
    return mockVerses
      .filter(
        (verse) => verse.text.toLowerCase().includes(queryLower) || verse.reference.toLowerCase().includes(queryLower),
      )
      .map((verse) => {
        // Highlight the query in the text
        const regex = new RegExp(`(${query})`, "gi")
        const highlightedText = verse.text.replace(regex, '<span class="highlight">$1</span>')

        return {
          ...verse,
          highlightedText,
          // Add a relevance score based on how many times the query appears
          relevance: (verse.text.toLowerCase().match(new RegExp(queryLower, "g")) || []).length,
          // Add a date for sorting (just for demo)
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        }
      })
  }

  // Sort results based on the current sort option
  function sortResults() {
    switch (searchState.sortBy) {
      case "relevance":
        searchState.results.sort((a, b) => b.relevance - a.relevance)
        break
      case "book":
        searchState.results.sort((a, b) => a.reference.localeCompare(b.reference))
        break
      case "newest":
        searchState.results.sort((a, b) => b.date - a.date)
        break
      case "oldest":
        searchState.results.sort((a, b) => a.date - b.date)
        break
      default:
        searchState.results.sort((a, b) => b.relevance - a.relevance)
    }
  }

  // Display search results
  function displayResults() {
    // Hide initial state and no results
    if (initialState) initialState.style.display = "none"
    if (noResults) noResults.style.display = "none"

    // Show results list
    if (resultsList) resultsList.style.display = "flex"

    // Update results count
    if (resultsCount) {
      resultsCount.textContent = `${searchState.results.length} results found`
    }

    // Calculate pagination
    const startIndex = (searchState.currentPage - 1) * 10
    const endIndex = Math.min(startIndex + 10, searchState.results.length)
    const currentResults = searchState.results.slice(startIndex, endIndex)

    // Update pagination display
    if (currentPage) currentPage.textContent = searchState.currentPage
    if (totalPages) totalPages.textContent = searchState.totalPages

    // Enable/disable pagination buttons
    if (paginationPrev) {
      paginationPrev.disabled = searchState.currentPage === 1
    }

    if (paginationNext) {
      paginationNext.disabled = searchState.currentPage === searchState.totalPages
    }

    // Clear previous results
    if (resultsList) {
      resultsList.innerHTML = ""

      // Add current page results
      currentResults.forEach((result) => {
        const resultItem = document.createElement("div")
        resultItem.className = "result-item"

        resultItem.innerHTML = `
          <div class="result-reference">
            <h3>${result.reference}</h3>
            <div class="result-translation">${result.translation}</div>
          </div>
          <div class="result-text">${result.highlightedText}</div>
          <div class="result-actions">
            <button class="btn btn-secondary btn-sm" onclick="copyVerse('${result.reference}', '${result.text.replace(/'/g, "\\'")}')">
              <i class="fas fa-copy"></i> Copy
            </button>
            <button class="btn btn-secondary btn-sm" onclick="shareVerse('${result.reference}', '${result.text.replace(/'/g, "\\'")}')">
              <i class="fas fa-share-alt"></i> Share
            </button>
            <button class="btn btn-primary btn-sm" onclick="readInContext('${result.reference}')">
              <i class="fas fa-book-open"></i> Read in Context
            </button>
          </div>
        `

        resultsList.appendChild(resultItem)
      })
    }
  }

  // Show loading state
  function showLoading() {
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Searching...</span>
        </div>
      `
    }
  }

  // Show initial state
  function showInitialState() {
    if (initialState) initialState.style.display = "block"
    if (noResults) noResults.style.display = "none"
    if (resultsList) resultsList.style.display = "none"
  }

  // Show no results state
  function showNoResults() {
    if (initialState) initialState.style.display = "none"
    if (noResults) {
      noResults.style.display = "block"
      if (noResultsTerm) {
        noResultsTerm.textContent = searchState.query
      }
    }
    if (resultsList) resultsList.style.display = "none"
  }

  // Initialize the page
  initSearchPage()
})

// Global functions for result actions
function copyVerse(reference, text) {
  const verseText = `${text} - ${reference}`

  // Create a temporary input to copy the text
  const tempInput = document.createElement("textarea")
  tempInput.value = verseText
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand("copy")
  document.body.removeChild(tempInput)

  alert("Verse copied to clipboard!")
}

function shareVerse(reference, text) {
  const verseText = `${text} - ${reference}`

  // Check if Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: `Bible Verse: ${reference}`,
        text: verseText,
        url: window.location.href,
      })
      .then(() => console.log("Verse shared successfully"))
      .catch((error) => console.log("Error sharing verse:", error))
  } else {
    // Fallback for browsers that don't support Web Share API
    copyVerse(reference, text)
    alert("Verse copied to clipboard! You can now paste it to share.")
  }
}

function readInContext(reference) {
  // Parse the reference to get book and chapter
  const parts = reference.split(" ")
  let book, chapter

  if (parts.length === 2) {
    // Format: "Genesis 1:1"
    book = parts[0]
    chapter = parts[1].split(":")[0]
  } else if (parts.length === 3) {
    // Format: "1 Corinthians 13:4"
    book = parts[0] + " " + parts[1]
    chapter = parts[2].split(":")[0]
  }

  // Redirect to the reader page
  window.location.href = `read.html?book=${encodeURIComponent(book)}&chapter=${chapter}`
}
