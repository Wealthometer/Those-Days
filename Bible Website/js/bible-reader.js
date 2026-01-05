// Bible Reader JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.querySelector(".bible-sidebar")
  const sidebarClose = document.getElementById("sidebar-close")
  const toolsClose = document.getElementById("tools-close")
  const studyTools = document.querySelector(".study-tools")
  const testamentTabs = document.querySelectorAll(".testament-tab")
  const oldTestament = document.getElementById("old-testament")
  const newTestament = document.getElementById("new-testament")
  const bookLinks = document.querySelectorAll(".book-category a")
  const currentBookElement = document.getElementById("current-book")
  const chapterSelect = document.getElementById("chapter-select")
  const prevChapterBtn = document.getElementById("prev-chapter")
  const nextChapterBtn = document.getElementById("next-chapter")
  const prevChapterBottomBtn = document.getElementById("prev-chapter-bottom")
  const nextChapterBottomBtn = document.getElementById("next-chapter-bottom")
  const scriptureContent = document.getElementById("scripture-content")
  const fontSizeToggle = document.getElementById("font-size-toggle")
  const fontSizeDropdown = document.querySelector(".font-size-dropdown")
  const fontSizeOptions = document.querySelectorAll(".font-size-dropdown button")
  const bookmarkChapterBtn = document.getElementById("bookmark-chapter")
  const shareChapterBtn = document.getElementById("share-chapter")
  const toolTabs = document.querySelectorAll(".tool-tab")
  const toolContents = document.querySelectorAll(".tool-content")
  const addNoteBtn = document.getElementById("add-note")
  const noteEditor = document.querySelector(".note-editor")
  const saveNoteBtn = document.getElementById("save-note")
  const cancelNoteBtn = document.getElementById("cancel-note")
  const noteText = document.getElementById("note-text")
  const notesContainer = document.getElementById("notes-container")
  const highlightColors = document.querySelectorAll(".color-option")
  const highlightsContainer = document.getElementById("highlights-container")
  const bookmarksContainer = document.getElementById("bookmarks-container")

  // Bible data - in a real application, this would come from an API
  const bibleData = {
    books: {
      Genesis: { chapters: 50 },
      Exodus: { chapters: 40 },
      Leviticus: { chapters: 27 },
      Numbers: { chapters: 36 },
      Deuteronomy: { chapters: 34 },
      Joshua: { chapters: 24 },
      Judges: { chapters: 21 },
      Ruth: { chapters: 4 },
      "1 Samuel": { chapters: 31 },
      "2 Samuel": { chapters: 24 },
      "1 Kings": { chapters: 22 },
      "2 Kings": { chapters: 25 },
      "1 Chronicles": { chapters: 29 },
      "2 Chronicles": { chapters: 36 },
      Ezra: { chapters: 10 },
      Nehemiah: { chapters: 13 },
      Esther: { chapters: 10 },
      Job: { chapters: 42 },
      Psalms: { chapters: 150 },
      Proverbs: { chapters: 31 },
      Ecclesiastes: { chapters: 12 },
      "Song of Solomon": { chapters: 8 },
      Isaiah: { chapters: 66 },
      Jeremiah: { chapters: 52 },
      Lamentations: { chapters: 5 },
      Ezekiel: { chapters: 48 },
      Daniel: { chapters: 12 },
      Hosea: { chapters: 14 },
      Joel: { chapters: 3 },
      Amos: { chapters: 9 },
      Obadiah: { chapters: 1 },
      Jonah: { chapters: 4 },
      Micah: { chapters: 7 },
      Nahum: { chapters: 3 },
      Habakkuk: { chapters: 3 },
      Zephaniah: { chapters: 3 },
      Haggai: { chapters: 2 },
      Zechariah: { chapters: 14 },
      Malachi: { chapters: 4 },
      Matthew: { chapters: 28 },
      Mark: { chapters: 16 },
      Luke: { chapters: 24 },
      John: { chapters: 21 },
      Acts: { chapters: 28 },
      Romans: { chapters: 16 },
      "1 Corinthians": { chapters: 16 },
      "2 Corinthians": { chapters: 13 },
      Galatians: { chapters: 6 },
      Ephesians: { chapters: 6 },
      Philippians: { chapters: 4 },
      Colossians: { chapters: 4 },
      "1 Thessalonians": { chapters: 5 },
      "2 Thessalonians": { chapters: 3 },
      "1 Timothy": { chapters: 6 },
      "2 Timothy": { chapters: 4 },
      Titus: { chapters: 3 },
      Philemon: { chapters: 1 },
      Hebrews: { chapters: 13 },
      James: { chapters: 5 },
      "1 Peter": { chapters: 5 },
      "2 Peter": { chapters: 3 },
      "1 John": { chapters: 5 },
      "2 John": { chapters: 1 },
      "3 John": { chapters: 1 },
      Jude: { chapters: 1 },
      Revelation: { chapters: 22 },
    },
  }

  // Current state
  let currentBook = "Genesis"
  let currentChapter = 1
  const currentTranslation = "kjv"
  let selectedHighlightColor = "yellow"
  let isBookmarked = false

  // User data - in a real application, this would be stored in a database
  const userData = {
    notes: [],
    highlights: [],
    bookmarks: [],
  }

  // Initialize the reader
  function initReader() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const bookParam = urlParams.get("book")
    const chapterParam = urlParams.get("chapter")
    const verseParam = urlParams.get("verse")

    if (bookParam && bibleData.books[bookParam]) {
      currentBook = bookParam
      if (chapterParam && chapterParam <= bibleData.books[bookParam].chapters) {
        currentChapter = Number.parseInt(chapterParam)
      }
    }

    // Update UI
    updateCurrentReference()
    loadChapter()

    // Set active book in sidebar
    bookLinks.forEach((link) => {
      if (link.dataset.book === currentBook) {
        link.classList.add("active")
        // Open the correct testament tab
        const isNewTestament = [
          "Matthew",
          "Mark",
          "Luke",
          "John",
          "Acts",
          "Romans",
          "1 Corinthians",
          "2 Corinthians",
          "Galatians",
          "Ephesians",
          "Philippians",
          "Colossians",
          "1 Thessalonians",
          "2 Thessalonians",
          "1 Timothy",
          "2 Timothy",
          "Titus",
          "Philemon",
          "Hebrews",
          "James",
          "1 Peter",
          "2 Peter",
          "1 John",
          "2 John",
          "3 John",
          "Jude",
          "Revelation",
        ].includes(currentBook)
        if (isNewTestament) {
          testamentTabs[1].click()
        }
      }
    })

    // Scroll to verse if specified
    if (verseParam) {
      setTimeout(() => {
        const verseElement = document.querySelector(`.verse[data-verse="${verseParam}"]`)
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
          verseElement.classList.add("highlighted-yellow")
        }
      }, 1500) // Wait for content to load
    }

    // Set up event listeners
    setupEventListeners()
  }

  // Set up event listeners
  function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }

    if (sidebarClose) {
      sidebarClose.addEventListener("click", () => {
        sidebar.classList.remove("active")
      })
    }

    // Study tools toggle
    const toolsToggle = document.getElementById("tools-toggle")
    if (toolsToggle) {
      toolsToggle.addEventListener("click", () => {
        studyTools.classList.toggle("active")
      })
    }

    if (toolsClose) {
      toolsClose.addEventListener("click", () => {
        studyTools.classList.remove("active")
      })
    }

    // Testament tabs
    testamentTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        testamentTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")

        if (index === 0) {
          oldTestament.classList.remove("hidden")
          newTestament.classList.add("hidden")
        } else {
          oldTestament.classList.add("hidden")
          newTestament.classList.remove("hidden")
        }
      })
    })

    // Book links
    bookLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        // Remove active class from all links
        bookLinks.forEach((l) => l.classList.remove("active"))

        // Add active class to clicked link
        link.classList.add("active")

        // Update current book and chapter
        currentBook = link.dataset.book
        currentChapter = 1

        // Update UI
        updateCurrentReference()
        loadChapter()

        // Close sidebar on mobile
        if (window.innerWidth < 768) {
          sidebar.classList.remove("active")
        }
      })
    })

    // Chapter select
    if (chapterSelect) {
      chapterSelect.addEventListener("change", () => {
        currentChapter = Number.parseInt(chapterSelect.value)
        loadChapter()
      })
    }

    // Navigation buttons
    if (prevChapterBtn) {
      prevChapterBtn.addEventListener("click", navigateToPreviousChapter)
    }

    if (nextChapterBtn) {
      nextChapterBtn.addEventListener("click", navigateToNextChapter)
    }

    if (prevChapterBottomBtn) {
      prevChapterBottomBtn.addEventListener("click", navigateToPreviousChapter)
    }

    if (nextChapterBottomBtn) {
      nextChapterBottomBtn.addEventListener("click", navigateToNextChapter)
    }

    // Font size toggle
    if (fontSizeToggle) {
      fontSizeToggle.addEventListener("click", () => {
        fontSizeDropdown.classList.toggle("active")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!fontSizeToggle.contains(e.target) && !fontSizeDropdown.contains(e.target)) {
          fontSizeDropdown.classList.remove("active")
        }
      })
    }

    // Font size options
    fontSizeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const size = option.dataset.size

        // Remove all font size classes
        scriptureContent.classList.remove("font-small", "font-medium", "font-large")

        // Add selected font size class
        scriptureContent.classList.add(`font-${size}`)

        // Update active class
        fontSizeOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")

        // Close dropdown
        fontSizeDropdown.classList.remove("active")

        // Save preference
        localStorage.setItem("font-size", size)
      })
    })

    // Bookmark chapter button
    if (bookmarkChapterBtn) {
      bookmarkChapterBtn.addEventListener("click", toggleBookmark)
    }

    // Share chapter button
    if (shareChapterBtn) {
      shareChapterBtn.addEventListener("click", shareChapter)
    }

    // Tool tabs
    toolTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        toolTabs.forEach((t) => t.classList.remove("active"))
        toolContents.forEach((c) => c.classList.remove("active"))

        tab.classList.add("active")
        toolContents[index].classList.add("active")
      })
    })

    // Add note button
    if (addNoteBtn) {
      addNoteBtn.addEventListener("click", () => {
        noteEditor.style.display = "block"
        noteText.focus()
      })
    }

    // Save note button
    if (saveNoteBtn) {
      saveNoteBtn.addEventListener("click", saveNote)
    }

    // Cancel note button
    if (cancelNoteBtn) {
      cancelNoteBtn.addEventListener("click", () => {
        noteEditor.style.display = "none"
        noteText.value = ""
      })
    }

    // Highlight colors
    highlightColors.forEach((color) => {
      color.addEventListener("click", () => {
        selectedHighlightColor = color.dataset.color

        // Update active class
        highlightColors.forEach((c) => c.classList.remove("active"))
        color.classList.add("active")
      })
    })
  }

  // Update the current reference display
  function updateCurrentReference() {
    if (currentBookElement) {
      currentBookElement.textContent = currentBook
    }

    // Update chapter select
    if (chapterSelect) {
      chapterSelect.innerHTML = ""
      for (let i = 1; i <= bibleData.books[currentBook].chapters; i++) {
        const option = document.createElement("option")
        option.value = i
        option.textContent = `Chapter ${i}`
        if (i === currentChapter) {
          option.selected = true
        }
        chapterSelect.appendChild(option)
      }
    }

    // Update navigation buttons
    updateNavigationButtons()
  }

  // Update navigation buttons state
  function updateNavigationButtons() {
    // Disable prev button if at first chapter of first book
    const isFirstChapter = currentChapter === 1
    const isFirstBook = currentBook === "Genesis"
    if (prevChapterBtn) {
      prevChapterBtn.disabled = isFirstChapter && isFirstBook
    }
    if (prevChapterBottomBtn) {
      prevChapterBottomBtn.disabled = isFirstChapter && isFirstBook
    }

    // Disable next button if at last chapter of last book
    const isLastChapter = currentChapter === bibleData.books[currentBook].chapters
    const isLastBook = currentBook === "Revelation"
    if (nextChapterBtn) {
      nextChapterBtn.disabled = isLastChapter && isLastBook
    }
    if (nextChapterBottomBtn) {
      nextChapterBottomBtn.disabled = isLastChapter && isLastBook
    }
  }

  // Navigate to previous chapter
  function navigateToPreviousChapter() {
    if (currentChapter > 1) {
      currentChapter--
    } else {
      // Go to previous book
      const books = Object.keys(bibleData.books)
      const currentIndex = books.indexOf(currentBook)

      if (currentIndex > 0) {
        currentBook = books[currentIndex - 1]
        currentChapter = bibleData.books[currentBook].chapters
      }
    }

    updateCurrentReference()
    loadChapter()
  }

  // Navigate to next chapter
  function navigateToNextChapter() {
    if (currentChapter < bibleData.books[currentBook].chapters) {
      currentChapter++
    } else {
      // Go to next book
      const books = Object.keys(bibleData.books)
      const currentIndex = books.indexOf(currentBook)

      if (currentIndex < books.length - 1) {
        currentBook = books[currentIndex + 1]
        currentChapter = 1
      }
    }

    updateCurrentReference()
    loadChapter()
  }

  // Load chapter content
  function loadChapter() {
    // Show loading spinner
    if (scriptureContent) {
      scriptureContent.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading scripture...</span>
                </div>
            `
    }

    // In a real application, this would fetch from an API
    // For demo purposes, we'll simulate loading with a timeout
    setTimeout(() => {
      // Generate sample chapter content
      let chapterHTML = `<h2>${currentBook} ${currentChapter}</h2>`

      // Generate random number of verses (10-30)
      const verseCount = Math.floor(Math.random() * 20) + 10

      for (let i = 1; i <= verseCount; i++) {
        chapterHTML += `
                    <p>
                        <span class="verse" data-verse="${i}" onclick="handleVerseClick(this)">
                            <span class="verse-number">${i}</span>
                            ${getLoremIpsum()}
                        </span>
                    </p>
                `
      }

      if (scriptureContent) {
        scriptureContent.innerHTML = chapterHTML
      }

      // Add verse interaction
      setupVerseInteraction()

      // Update URL without reloading the page
      const url = new URL(window.location)
      url.searchParams.set("book", currentBook)
      url.searchParams.set("chapter", currentChapter)
      window.history.pushState({}, "", url)

      // Update bookmark button state
      updateBookmarkState()

      // Load notes, highlights, and bookmarks for this chapter
      loadNotes()
      loadHighlights()
      loadBookmarks()
    }, 1000)
  }

  // Set up verse interaction
  function setupVerseInteraction() {
    const verses = document.querySelectorAll(".verse")

    verses.forEach((verse) => {
      verse.addEventListener("click", () => {
        // Remove active class from all verses
        verses.forEach((v) => v.classList.remove("active"))

        // Add active class to clicked verse
        verse.classList.add("active")

        // Create verse actions if they don't exist
        if (!verse.querySelector(".verse-actions")) {
          const verseActions = document.createElement("div")
          verseActions.className = "verse-actions"
          verseActions.innerHTML = `
                        <button onclick="highlightVerse(this.parentElement.parentElement, '${selectedHighlightColor}')">
                            <i class="fas fa-highlighter"></i>
                        </button>
                        <button onclick="addNoteForVerse(this.parentElement.parentElement)">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                        <button onclick="copyVerse(this.parentElement.parentElement)">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button onclick="shareVerse(this.parentElement.parentElement)">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    `
          verse.appendChild(verseActions)
        }
      })
    })

    // Close verse actions when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".verse")) {
        verses.forEach((v) => v.classList.remove("active"))
      }
    })
  }

  // Generate lorem ipsum text for demo verses
  function getLoremIpsum() {
    const loremTexts = [
      "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
      'And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness.',
      "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking.",
      "I can do all this through him who gives me strength. And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here! All this is from God, who reconciled us to himself through Christ.",
      "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
    ]

    return loremTexts[Math.floor(Math.random() * loremTexts.length)]
  }

  // Toggle bookmark
  function toggleBookmark() {
    isBookmarked = !isBookmarked

    // Update button state
    updateBookmarkState()

    // In a real application, this would save to a database
    if (isBookmarked) {
      // Add to bookmarks
      userData.bookmarks.push({
        id: Date.now(),
        reference: `${currentBook} ${currentChapter}`,
        preview: scriptureContent.querySelector("p").textContent.trim().substring(0, 100) + "...",
        date: new Date().toISOString().split("T")[0],
      })

      // Show success message
      alert(`${currentBook} ${currentChapter} has been bookmarked!`)
    } else {
      // Remove from bookmarks
      userData.bookmarks = userData.bookmarks.filter(
        (bookmark) => bookmark.reference !== `${currentBook} ${currentChapter}`,
      )

      // Show success message
      alert(`${currentBook} ${currentChapter} has been removed from bookmarks.`)
    }

    // Update bookmarks list
    loadBookmarks()
  }

  // Update bookmark button state
  function updateBookmarkState() {
    // Check if current chapter is bookmarked
    isBookmarked = userData.bookmarks.some((bookmark) => bookmark.reference === `${currentBook} ${currentChapter}`)

    // Update button icon
    if (bookmarkChapterBtn) {
      const icon = bookmarkChapterBtn.querySelector("i")
      if (icon) {
        if (isBookmarked) {
          icon.className = "fas fa-bookmark"
        } else {
          icon.className = "far fa-bookmark"
        }
      }
    }
  }

  // Share chapter
  function shareChapter() {
    const shareText = `I'm reading ${currentBook} ${currentChapter} on Divine Word Bible.`
    const shareUrl = window.location.href

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: `${currentBook} ${currentChapter} - Divine Word Bible`,
          text: shareText,
          url: shareUrl,
        })
        .then(() => console.log("Chapter shared successfully"))
        .catch((error) => console.log("Error sharing chapter:", error))
    } else {
      // Fallback for browsers that don't support Web Share API
      // Create a temporary input to copy the URL
      const tempInput = document.createElement("textarea")
      tempInput.value = `${shareText} ${shareUrl}`
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand("copy")
      document.body.removeChild(tempInput)

      alert("Link copied to clipboard!")
    }
  }

  // Save note
  function saveNote() {
    if (noteText.value.trim() === "") {
      alert("Please enter a note.")
      return
    }

    // Create new note
    const newNote = {
      id: Date.now(),
      reference: `${currentBook} ${currentChapter}`,
      text: noteText.value.trim(),
      date: new Date().toISOString().split("T")[0],
    }

    // Add to notes
    userData.notes.push(newNote)

    // Clear form
    noteText.value = ""

    // Hide editor
    noteEditor.style.display = "none"

    // Show success message
    alert("Note saved successfully!")

    // Update notes list
    loadNotes()
  }

  // Load notes for current chapter
  function loadNotes() {
    if (notesContainer) {
      notesContainer.innerHTML = ""

      // Filter notes for current chapter
      const chapterNotes = userData.notes.filter((note) => note.reference === `${currentBook} ${currentChapter}`)

      if (chapterNotes.length === 0) {
        notesContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-sticky-note"></i>
                        <p>No notes for this chapter yet.</p>
                    </div>
                `
      } else {
        chapterNotes.forEach((note) => {
          const noteItem = document.createElement("div")
          noteItem.className = "note-item"
          noteItem.dataset.id = note.id

          noteItem.innerHTML = `
                        <div class="note-header">
                            <span class="note-reference">${note.reference}</span>
                            <div class="note-actions">
                                <button onclick="editNote(${note.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteNote(${note.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="note-text">${note.text}</div>
                    `

          notesContainer.appendChild(noteItem)
        })
      }
    }
  }

  // Load highlights for current chapter
  function loadHighlights() {
    if (highlightsContainer) {
      highlightsContainer.innerHTML = ""

      // Filter highlights for current chapter
      const chapterHighlights = userData.highlights.filter((highlight) =>
        highlight.reference.startsWith(`${currentBook} ${currentChapter}:`),
      )

      if (chapterHighlights.length === 0) {
        highlightsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-highlighter"></i>
                        <p>No highlights for this chapter yet.</p>
                    </div>
                `
      } else {
        chapterHighlights.forEach((highlight) => {
          const highlightItem = document.createElement("div")
          highlightItem.className = "highlight-item"
          highlightItem.dataset.id = highlight.id

          highlightItem.innerHTML = `
                        <div class="highlight-color-indicator" style="background-color: ${getHighlightColor(highlight.color)};"></div>
                        <div class="highlight-content">
                            <div class="highlight-text">${highlight.text}</div>
                            <div class="highlight-meta">
                                <span>${highlight.reference}</span>
                                <button onclick="deleteHighlight(${highlight.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    `

          highlightsContainer.appendChild(highlightItem)
        })
      }
    }
  }

  // Load bookmarks
  function loadBookmarks() {
    if (bookmarksContainer) {
      bookmarksContainer.innerHTML = ""

      if (userData.bookmarks.length === 0) {
        bookmarksContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-bookmark"></i>
                        <p>No bookmarks yet.</p>
                    </div>
                `
      } else {
        userData.bookmarks.forEach((bookmark) => {
          const bookmarkItem = document.createElement("div")
          bookmarkItem.className = "bookmark-item"
          bookmarkItem.dataset.id = bookmark.id

          bookmarkItem.innerHTML = `
                        <div class="bookmark-icon">
                            <i class="fas fa-bookmark"></i>
                        </div>
                        <div class="bookmark-info">
                            <div class="bookmark-reference">${bookmark.reference}</div>
                            <div class="bookmark-date">${formatDate(bookmark.date)}</div>
                        </div>
                        <div class="bookmark-actions">
                            <button onclick="deleteBookmark(${bookmark.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `

          bookmarkItem.addEventListener("click", (e) => {
            if (!e.target.closest(".bookmark-actions")) {
              // Navigate to the bookmarked chapter
              const parts = bookmark.reference.split(" ")
              if (parts.length === 2) {
                currentBook = parts[0]
                currentChapter = Number.parseInt(parts[1])
              } else if (parts.length === 3) {
                currentBook = parts[0] + " " + parts[1]
                currentChapter = Number.parseInt(parts[2])
              }

              updateCurrentReference()
              loadChapter()
            }
          })

          bookmarksContainer.appendChild(bookmarkItem)
        })
      }
    }
  }

  // Helper function to get highlight color
  function getHighlightColor(colorName) {
    const colors = {
      yellow: "rgba(255, 235, 59, 0.5)",
      green: "rgba(76, 175, 80, 0.5)",
      blue: "rgba(33, 150, 243, 0.5)",
      purple: "rgba(156, 39, 176, 0.5)",
      pink: "rgba(233, 30, 99, 0.5)",
    }

    return colors[colorName] || colors.yellow
  }

  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Initialize the reader
  initReader()
})

// Global functions for verse actions
function handleVerseClick(verse) {
  // This function is needed for the onclick attribute
  // The actual click handling is done in setupVerseInteraction
}

function highlightVerse(verse, color) {
  // Remove any existing highlight classes
  verse.classList.remove(
    "highlighted-yellow",
    "highlighted-green",
    "highlighted-blue",
    "highlighted-purple",
    "highlighted-pink",
  )

  // Add the selected highlight class
  verse.classList.add(`highlighted-${color}`)

  // In a real application, this would save to a database
  const verseNumber = verse.dataset.verse
  const verseText = verse.textContent.replace(verseNumber, "").trim()

  // Check if already highlighted
  const existingHighlight = window.userData.highlights.find(
    (h) => h.reference === `${window.currentBook} ${window.currentChapter}:${verseNumber}`,
  )

  if (existingHighlight) {
    // Update existing highlight
    existingHighlight.color = color
  } else {
    // Add new highlight
    window.userData.highlights.push({
      id: Date.now(),
      reference: `${window.currentBook} ${window.currentChapter}:${verseNumber}`,
      text: verseText,
      color: color,
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Update highlights list
  loadHighlights()
}

function addNoteForVerse(verse) {
  // Get verse number
  const verseNumber = verse.dataset.verse

  // Show note editor
  const noteEditor = document.querySelector(".note-editor")
  const noteText = document.getElementById("note-text")

  if (noteEditor && noteText) {
    noteEditor.style.display = "block"
    noteText.focus()

    // Add verse reference to note
    noteText.dataset.verse = verseNumber
  }
}

function copyVerse(verse) {
  // Get verse number and text
  const verseNumber = verse.dataset.verse
  const verseText = verse.textContent.replace(verseNumber, "").trim()

  // Create formatted verse text
  const formattedVerse = `${window.currentBook} ${window.currentChapter}:${verseNumber} - ${verseText}`

  // Copy to clipboard
  const tempInput = document.createElement("textarea")
  tempInput.value = formattedVerse
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand("copy")
  document.body.removeChild(tempInput)

  // Show success message
  alert("Verse copied to clipboard!")
}

function shareVerse(verse) {
  // Get verse number and text
  const verseNumber = verse.dataset.verse
  const verseText = verse.textContent.replace(verseNumber, "").trim()

  // Create formatted verse text
  const formattedVerse = `${window.currentBook} ${window.currentChapter}:${verseNumber} - ${verseText}`

  // Create share URL
  const shareUrl = `${window.location.origin}${window.location.pathname}?book=${encodeURIComponent(window.currentBook)}&chapter=${window.currentChapter}&verse=${verseNumber}`

  // Check if Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: `${window.currentBook} ${window.currentChapter}:${verseNumber}`,
        text: formattedVerse,
        url: shareUrl,
      })
      .then(() => console.log("Verse shared successfully"))
      .catch((error) => console.log("Error sharing verse:", error))
  } else {
    // Fallback for browsers that don't support Web Share API
    copyVerse(verse)
    alert("Verse copied to clipboard! You can now paste it to share.")
  }
}

function editNote(noteId) {
  // Find the note
  const note = window.userData.notes.find((n) => n.id === noteId)

  if (note) {
    // Show note editor
    const noteEditor = document.querySelector(".note-editor")
    const noteText = document.getElementById("note-text")

    if (noteEditor && noteText) {
      noteEditor.style.display = "block"
      noteText.value = note.text
      noteText.dataset.noteId = noteId
      noteText.focus()
    }
  }
}

function deleteNote(noteId) {
  if (confirm("Are you sure you want to delete this note?")) {
    // Remove note from data
    window.userData.notes = window.userData.notes.filter((note) => note.id !== noteId)

    // Update notes list
    loadNotes()
  }
}

function deleteHighlight(highlightId) {
  if (confirm("Are you sure you want to delete this highlight?")) {
    // Remove highlight from data
    window.userData.highlights = window.userData.highlights.filter((highlight) => highlight.id !== highlightId)

    // Update highlights list
    loadHighlights()

    // Remove highlight class from verse
    const highlight = window.userData.highlights.find((h) => h.id === highlightId)
    if (highlight) {
      const reference = highlight.reference.split(":")
      const verseNumber = reference[1]
      const verse = document.querySelector(`.verse[data-verse="${verseNumber}"]`)

      if (verse) {
        verse.classList.remove(
          "highlighted-yellow",
          "highlighted-green",
          "highlighted-blue",
          "highlighted-purple",
          "highlighted-pink",
        )
      }
    }
  }
}

function deleteBookmark(bookmarkId) {
  if (confirm("Are you sure you want to delete this bookmark?")) {
    // Remove bookmark from data
    window.userData.bookmarks = window.userData.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId)

    // Update bookmarks list
    loadBookmarks()

    // Update bookmark button state
    updateBookmarkState()
  }
}
