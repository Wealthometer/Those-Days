// Study Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const dashboardTabs = document.querySelectorAll(".dashboard-tab")
  const tabContents = document.querySelectorAll(".tab-content")
  const searchNotes = document.getElementById("search-notes")
  const searchHighlights = document.getElementById("search-highlights")
  const searchBookmarks = document.getElementById("search-bookmarks")
  const filterDropdowns = document.querySelectorAll(".filter-dropdown")
  const dropdownButtons = document.querySelectorAll(".dropdown-button")
  const dropdownContents = document.querySelectorAll(".dropdown-content")
  const filterOptions = document.querySelectorAll(".dropdown-content button")
  const notesContainer = document.getElementById("notes-container")
  const highlightsContainer = document.getElementById("highlights-container")
  const bookmarksContainer = document.getElementById("bookmarks-container")
  const plansContainer = document.getElementById("plans-container")
  const addNoteBtn = document.getElementById("add-note")
  const noteEditor = document.getElementById("note-editor")
  const saveNoteBtn = document.getElementById("save-note")
  const cancelNoteBtn = document.getElementById("cancel-note")
  const noteTitle = document.getElementById("note-title")
  const noteText = document.getElementById("note-text")
  const planFilter = document.getElementById("plan-filter")

  // Study data - in a real application, this would come from a database or API
  const studyData = {
    notes: [
      {
        id: 1,
        title: "Sermon on the Mount",
        reference: "Matthew 5-7",
        text: "Jesus teaches about the Beatitudes, salt and light, fulfilling the law, anger, lust, divorce, oaths, retaliation, loving enemies, giving, prayer, fasting, treasures, worry, judging, asking, the narrow gate, true disciples, and building on rock.",
        date: "2023-05-15",
        tags: ["sermon", "teachings", "jesus"],
      },
      {
        id: 2,
        title: "Fruit of the Spirit",
        reference: "Galatians 5:22-23",
        text: "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. These qualities should be evident in the life of a believer.",
        date: "2023-06-02",
        tags: ["fruit", "spirit", "character"],
      },
      {
        id: 3,
        title: "Armor of God",
        reference: "Ephesians 6:10-18",
        text: "Paul describes the spiritual armor that believers should put on: the belt of truth, the breastplate of righteousness, feet fitted with readiness, the shield of faith, the helmet of salvation, and the sword of the Spirit.",
        date: "2023-06-10",
        tags: ["armor", "spiritual warfare", "paul"],
      },
      {
        id: 4,
        title: "Creation Account",
        reference: "Genesis 1-2",
        text: "God creates the heavens and the earth in six days and rests on the seventh. He creates humans in His image and places them in the Garden of Eden.",
        date: "2023-04-20",
        tags: ["creation", "genesis", "beginning"],
      },
      {
        id: 5,
        title: "Love Chapter",
        reference: "1 Corinthians 13",
        text: "Paul describes the characteristics of love: patient, kind, not envious, not boastful, not proud, not rude, not self-seeking, not easily angered, keeps no record of wrongs, etc.",
        date: "2023-05-28",
        tags: ["love", "paul", "corinthians"],
      },
    ],
    highlights: [
      {
        id: 1,
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        color: "yellow",
        date: "2023-06-05",
      },
      {
        id: 2,
        reference: "Psalm 23:1",
        text: "The LORD is my shepherd, I lack nothing.",
        color: "green",
        date: "2023-05-20",
      },
      {
        id: 3,
        reference: "Philippians 4:13",
        text: "I can do all this through him who gives me strength.",
        color: "blue",
        date: "2023-06-12",
      },
      {
        id: 4,
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        color: "purple",
        date: "2023-05-10",
      },
      {
        id: 5,
        reference: "Jeremiah 29:11",
        text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
        color: "pink",
        date: "2023-06-01",
      },
    ],
    bookmarks: [
      {
        id: 1,
        reference: "Psalm 119",
        preview: "Blessed are those whose ways are blameless, who walk according to the law of the LORD...",
        date: "2023-06-10",
      },
      {
        id: 2,
        reference: "Romans 12",
        preview:
          "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice...",
        date: "2023-05-25",
      },
      {
        id: 3,
        reference: "Hebrews 11",
        preview: "Now faith is confidence in what we hope for and assurance about what we do not see...",
        date: "2023-06-08",
      },
      {
        id: 4,
        reference: "John 15",
        preview:
          "I am the true vine, and my Father is the gardener. He cuts off every branch in me that bears no fruit...",
        date: "2023-05-15",
      },
      {
        id: 5,
        reference: "Isaiah 40",
        preview:
          "Comfort, comfort my people, says your God. Speak tenderly to Jerusalem, and proclaim to her that her hard service has been completed...",
        date: "2023-06-03",
      },
    ],
    plans: {
      active: [
        {
          id: 1,
          title: "Through the Bible in a Year",
          progress: 45,
          daysCompleted: 164,
          daysTotal: 365,
          chaptersRead: 492,
          chaptersTotal: 1189,
        },
        {
          id: 2,
          title: "New Testament in 90 Days",
          progress: 70,
          daysCompleted: 63,
          daysTotal: 90,
          chaptersRead: 189,
          chaptersTotal: 260,
        },
      ],
      available: [
        {
          id: 3,
          title: "Psalms and Proverbs",
          description: "Read through the wisdom literature of Psalms and Proverbs in 60 days.",
          duration: "60 days",
          difficulty: "Easy",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          id: 4,
          title: "Life of Jesus",
          description: "Follow the life and teachings of Jesus through the four Gospels.",
          duration: "45 days",
          difficulty: "Medium",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          id: 5,
          title: "Paul's Epistles",
          description: "Study the letters of Paul to the early churches and understand his theology.",
          duration: "30 days",
          difficulty: "Medium",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          id: 6,
          title: "Prophetic Books",
          description: "Explore the major and minor prophets of the Old Testament.",
          duration: "90 days",
          difficulty: "Hard",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
  }

  // Initialize the study dashboard
  function initStudyDashboard() {
    // Set up event listeners
    setupEventListeners()

    // Load initial data
    loadNotes()
    loadHighlights()
    loadBookmarks()
    loadPlans()
  }

  // Set up event listeners
  function setupEventListeners() {
    // Dashboard tabs
    dashboardTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and content
        dashboardTabs.forEach((t) => t.classList.remove("active"))
        tabContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        tabContents[index].classList.add("active")
      })
    })

    // Search inputs
    if (searchNotes) {
      searchNotes.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase()
        filterNotes(query)
      })
    }

    if (searchHighlights) {
      searchHighlights.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase()
        filterHighlights(query)
      })
    }

    if (searchBookmarks) {
      searchBookmarks.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase()
        filterBookmarks(query)
      })
    }

    // Dropdown buttons
    dropdownButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        dropdownContents[index].classList.toggle("active")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!button.contains(e.target) && !dropdownContents[index].contains(e.target)) {
          dropdownContents[index].classList.remove("active")
        }
      })
    })

    // Filter options
    filterOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Get the filter type and value
        const filterType = option.dataset.filterType
        const filterValue = option.dataset.filterValue

        // Update active class
        const filterOptions = option.parentElement.querySelectorAll("button")
        filterOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")

        // Update button text
        const buttonText = option.parentElement.previousElementSibling.querySelector("span")
        if (buttonText) {
          buttonText.textContent = option.textContent
        }

        // Apply filter
        if (filterType === "notes") {
          filterNotesByDate(filterValue)
        } else if (filterType === "highlights") {
          filterHighlightsByColor(filterValue)
        } else if (filterType === "bookmarks") {
          filterBookmarksByDate(filterValue)
        }

        // Close dropdown
        option.parentElement.classList.remove("active")
      })
    })

    // Add note button
    if (addNoteBtn) {
      addNoteBtn.addEventListener("click", () => {
        // Show note editor
        if (noteEditor) {
          noteEditor.style.display = "block"

          // Clear form
          if (noteTitle) noteTitle.value = ""
          if (noteText) noteText.value = ""

          // Focus on title
          if (noteTitle) noteTitle.focus()
        }
      })
    }

    // Save note button
    if (saveNoteBtn) {
      saveNoteBtn.addEventListener("click", () => {
        // Validate form
        if (!noteTitle || !noteText || noteTitle.value.trim() === "" || noteText.value.trim() === "") {
          alert("Please fill in all fields")
          return
        }

        // Create new note
        const newNote = {
          id: studyData.notes.length + 1,
          title: noteTitle.value.trim(),
          reference: "Custom Note",
          text: noteText.value.trim(),
          date: new Date().toISOString().split("T")[0],
          tags: [],
        }

        // Add to data
        studyData.notes.unshift(newNote)

        // Reload notes
        loadNotes()

        // Hide editor
        noteEditor.style.display = "none"

        // Show success message
        alert("Note saved successfully!")
      })
    }

    // Cancel note button
    if (cancelNoteBtn) {
      cancelNoteBtn.addEventListener("click", () => {
        // Hide editor
        if (noteEditor) {
          noteEditor.style.display = "none"
        }
      })
    }

    // Plan filter
    if (planFilter) {
      planFilter.addEventListener("change", () => {
        const filterValue = planFilter.value
        filterPlans(filterValue)
      })
    }
  }

  // Load notes
  function loadNotes() {
    if (notesContainer) {
      notesContainer.innerHTML = ""

      if (studyData.notes.length === 0) {
        notesContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-sticky-note"></i>
            <h3>No Notes Yet</h3>
            <p>Start adding notes as you study the Bible to see them here.</p>
            <button class="btn btn-primary" id="add-first-note">Add Your First Note</button>
          </div>
        `

        const addFirstNoteBtn = document.getElementById("add-first-note")
        if (addFirstNoteBtn) {
          addFirstNoteBtn.addEventListener("click", () => {
            if (addNoteBtn) addNoteBtn.click()
          })
        }
      } else {
        studyData.notes.forEach((note) => {
          const noteCard = document.createElement("div")
          noteCard.className = "note-card"
          noteCard.dataset.id = note.id

          noteCard.innerHTML = `
            <div class="note-header">
              <h3>${note.title}</h3>
              <div class="note-meta">
                <span>${note.reference}</span>
                <span>${formatDate(note.date)}</span>
              </div>
            </div>
            <div class="note-content">
              ${note.text}
            </div>
            <div class="note-actions">
              <button class="btn btn-secondary btn-sm" onclick="editNote(${note.id})">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-secondary btn-sm" onclick="deleteNote(${note.id})">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="btn btn-primary btn-sm" onclick="viewNote(${note.id})">
                <i class="fas fa-eye"></i> View
              </button>
            </div>
          `

          notesContainer.appendChild(noteCard)
        })
      }
    }
  }

  // Load highlights
  function loadHighlights() {
    if (highlightsContainer) {
      highlightsContainer.innerHTML = ""

      if (studyData.highlights.length === 0) {
        highlightsContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-highlighter"></i>
            <h3>No Highlights Yet</h3>
            <p>Highlight verses as you read the Bible to see them here.</p>
            <button class="btn btn-primary" onclick="goToReader()">Go to Reader</button>
          </div>
        `
      } else {
        studyData.highlights.forEach((highlight) => {
          const highlightCard = document.createElement("div")
          highlightCard.className = "highlight-card"
          highlightCard.dataset.id = highlight.id
          highlightCard.dataset.color = highlight.color

          highlightCard.innerHTML = `
            <div class="highlight-color" style="background-color: ${getHighlightColor(highlight.color)};"></div>
            <div class="highlight-content">
              <div class="highlight-text">${highlight.text}</div>
              <div class="highlight-meta">
                <span>${highlight.reference}</span>
                <span>${formatDate(highlight.date)}</span>
              </div>
            </div>
            <div class="highlight-actions">
              <button class="btn btn-secondary btn-sm" onclick="deleteHighlight(${highlight.id})">
                <i class="fas fa-trash"></i>
              </button>
              <button class="btn btn-primary btn-sm" onclick="goToVerse('${highlight.reference}')">
                <i class="fas fa-book-open"></i>
              </button>
            </div>
          `

          highlightsContainer.appendChild(highlightCard)
        })
      }
    }
  }

  // Load bookmarks
  function loadBookmarks() {
    if (bookmarksContainer) {
      bookmarksContainer.innerHTML = ""

      if (studyData.bookmarks.length === 0) {
        bookmarksContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-bookmark"></i>
            <h3>No Bookmarks Yet</h3>
            <p>Bookmark chapters as you read the Bible to see them here.</p>
            <button class="btn btn-primary" onclick="goToReader()">Go to Reader</button>
          </div>
        `
      } else {
        studyData.bookmarks.forEach((bookmark) => {
          const bookmarkCard = document.createElement("div")
          bookmarkCard.className = "bookmark-card"
          bookmarkCard.dataset.id = bookmark.id

          bookmarkCard.innerHTML = `
            <div class="bookmark-icon">
              <i class="fas fa-bookmark"></i>
            </div>
            <div class="bookmark-content">
              <h3>${bookmark.reference}</h3>
              <div class="bookmark-preview">${bookmark.preview}</div>
              <div class="bookmark-meta">
                <span>Bookmarked on ${formatDate(bookmark.date)}</span>
              </div>
            </div>
            <div class="bookmark-actions">
              <button class="btn btn-secondary btn-sm" onclick="deleteBookmark(${bookmark.id})">
                <i class="fas fa-trash"></i>
              </button>
              <button class="btn btn-primary btn-sm" onclick="goToChapter('${bookmark.reference}')">
                <i class="fas fa-book-open"></i>
              </button>
            </div>
          `

          bookmarksContainer.appendChild(bookmarkCard)
        })
      }
    }
  }

  // Load reading plans
  function loadPlans() {
    if (plansContainer) {
      // Active plans section
      const activePlansSection = document.createElement("div")
      activePlansSection.className = "active-plans"

      if (studyData.plans.active.length === 0) {
        activePlansSection.innerHTML = `
          <h3>Active Reading Plans</h3>
          <div class="empty-state">
            <i class="fas fa-book"></i>
            <h3>No Active Plans</h3>
            <p>Start a reading plan to track your progress.</p>
          </div>
        `
      } else {
        activePlansSection.innerHTML = `<h3>Active Reading Plans</h3>`

        const plansList = document.createElement("div")
        plansList.className = "plans-list"

        studyData.plans.active.forEach((plan) => {
          const activePlan = document.createElement("div")
          activePlan.className = "active-plan"
          activePlan.dataset.id = plan.id

          activePlan.innerHTML = `
            <div class="plan-header">
              <h4>${plan.title}</h4>
              <div class="plan-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${plan.progress}%;"></div>
                </div>
                <div class="progress-text">${plan.progress}% complete</div>
              </div>
            </div>
            <div class="plan-details">
              <div class="plan-stats">
                <div class="stat">
                  <div class="stat-value">${plan.daysCompleted}</div>
                  <div class="stat-label">Days Completed</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${plan.daysTotal - plan.daysCompleted}</div>
                  <div class="stat-label">Days Remaining</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${plan.chaptersRead}</div>
                  <div class="stat-label">Chapters Read</div>
                </div>
              </div>
              <div class="plan-actions">
                <button class="btn btn-secondary btn-sm" onclick="pausePlan(${plan.id})">
                  <i class="fas fa-pause"></i> Pause
                </button>
                <button class="btn btn-primary btn-sm" onclick="continuePlan(${plan.id})">
                  <i class="fas fa-book-open"></i> Continue
                </button>
              </div>
            </div>
          `

          plansList.appendChild(activePlan)
        })

        activePlansSection.appendChild(plansList)
      }

      // Available plans section
      const availablePlansSection = document.createElement("div")
      availablePlansSection.className = "available-plans"

      availablePlansSection.innerHTML = `
        <div class="section-header">
          <h3>Available Reading Plans</h3>
          <div class="plans-filter">
            <select id="plan-filter">
              <option value="all">All Plans</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      `

      const plansGrid = document.createElement("div")
      plansGrid.className = "plans-grid"

      studyData.plans.available.forEach((plan) => {
        const availablePlan = document.createElement("div")
        availablePlan.className = "available-plan"
        availablePlan.dataset.id = plan.id
        availablePlan.dataset.difficulty = plan.difficulty.toLowerCase()

        availablePlan.innerHTML = `
          <div class="plan-image">
            <img src="${plan.image}" alt="${plan.title}">
          </div>
          <div class="plan-content">
            <h4>${plan.title}</h4>
            <p>${plan.description}</p>
            <div class="plan-meta">
              <span><i class="fas fa-calendar-alt"></i> ${plan.duration}</span>
              <span><i class="fas fa-signal"></i> ${plan.difficulty}</span>
            </div>
          </div>
        `

        plansGrid.appendChild(availablePlan)
      })

      availablePlansSection.appendChild(plansGrid)

      // View more button
      const viewMoreBtn = document.createElement("div")
      viewMoreBtn.className = "view-more-plans"
      viewMoreBtn.innerHTML = `
        <button class="btn btn-secondary" onclick="viewMorePlans()">
          View More Plans <i class="fas fa-arrow-right"></i>
        </button>
      `

      availablePlansSection.appendChild(viewMoreBtn)

      // Add sections to container
      plansContainer.innerHTML = ""
      plansContainer.appendChild(activePlansSection)
      plansContainer.appendChild(availablePlansSection)
    }
  }

  // Filter notes by search query
  function filterNotes(query) {
    const noteCards = document.querySelectorAll(".note-card")

    noteCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const reference = card.querySelector(".note-meta span:first-child").textContent.toLowerCase()
      const content = card.querySelector(".note-content").textContent.toLowerCase()

      if (title.includes(query) || reference.includes(query) || content.includes(query)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Filter notes by date
  function filterNotesByDate(filterValue) {
    const noteCards = document.querySelectorAll(".note-card")
    const today = new Date()
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 7)
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(today.getMonth() - 1)

    noteCards.forEach((card) => {
      const dateText = card.querySelector(".note-meta span:last-child").textContent
      const date = parseDate(dateText)

      if (filterValue === "all") {
        card.style.display = "block"
      } else if (filterValue === "today") {
        card.style.display = isSameDay(date, today) ? "block" : "none"
      } else if (filterValue === "week") {
        card.style.display = date >= oneWeekAgo ? "block" : "none"
      } else if (filterValue === "month") {
        card.style.display = date >= oneMonthAgo ? "block" : "none"
      }
    })
  }

  // Filter highlights by search query
  function filterHighlights(query) {
    const highlightCards = document.querySelectorAll(".highlight-card")

    highlightCards.forEach((card) => {
      const text = card.querySelector(".highlight-text").textContent.toLowerCase()
      const reference = card.querySelector(".highlight-meta span:first-child").textContent.toLowerCase()

      if (text.includes(query) || reference.includes(query)) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Filter highlights by color
  function filterHighlightsByColor(filterValue) {
    const highlightCards = document.querySelectorAll(".highlight-card")

    highlightCards.forEach((card) => {
      const color = card.dataset.color

      if (filterValue === "all") {
        card.style.display = "flex"
      } else {
        card.style.display = color === filterValue ? "flex" : "none"
      }
    })
  }

  // Filter bookmarks by search query
  function filterBookmarks(query) {
    const bookmarkCards = document.querySelectorAll(".bookmark-card")

    bookmarkCards.forEach((card) => {
      const reference = card.querySelector("h3").textContent.toLowerCase()
      const preview = card.querySelector(".bookmark-preview").textContent.toLowerCase()

      if (reference.includes(query) || preview.includes(query)) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Filter bookmarks by date
  function filterBookmarksByDate(filterValue) {
    const bookmarkCards = document.querySelectorAll(".bookmark-card")
    const today = new Date()
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 7)
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(today.getMonth() - 1)

    bookmarkCards.forEach((card) => {
      const dateText = card.querySelector(".bookmark-meta span").textContent
      const dateMatch = dateText.match(/(\d{1,2}\/\d{1,2}\/\d{4})/)
      const date = dateMatch ? parseDate(dateMatch[1]) : new Date()

      if (filterValue === "all") {
        card.style.display = "flex"
      } else if (filterValue === "today") {
        card.style.display = isSameDay(date, today) ? "flex" : "none"
      } else if (filterValue === "week") {
        card.style.display = date >= oneWeekAgo ? "flex" : "none"
      } else if (filterValue === "month") {
        card.style.display = date >= oneMonthAgo ? "flex" : "none"
      }
    })
  }

  // Filter plans by difficulty
  function filterPlans(filterValue) {
    const planCards = document.querySelectorAll(".available-plan")

    planCards.forEach((card) => {
      const difficulty = card.dataset.difficulty

      if (filterValue === "all") {
        card.style.display = "block"
      } else {
        card.style.display = difficulty === filterValue ? "block" : "none"
      }
    })
  }

  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Helper function to parse date from formatted string
  function parseDate(dateString) {
    const parts = dateString.split(" ")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    if (parts.length === 3) {
      const month = monthNames.indexOf(parts[0])
      const day = Number.parseInt(parts[1].replace(",", ""))
      const year = Number.parseInt(parts[2])

      return new Date(year, month, day)
    }

    return new Date()
  }

  // Helper function to check if two dates are the same day
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
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

  // Initialize the dashboard
  initStudyDashboard()
})

// Global functions for note actions
function editNote(noteId) {
  // In a real application, this would load the note data into the editor
  alert(`Editing note ${noteId}`)

  // Show note editor
  const noteEditor = document.getElementById("note-editor")
  if (noteEditor) {
    noteEditor.style.display = "block"

    // Find the note in the data
    const studyData = {
      notes: document.querySelectorAll(".note-card"),
    }

    const noteCard = document.querySelector(`.note-card[data-id="${noteId}"]`)
    if (noteCard) {
      const title = noteCard.querySelector("h3").textContent
      const text = noteCard.querySelector(".note-content").textContent.trim()

      // Populate form
      const noteTitle = document.getElementById("note-title")
      const noteText = document.getElementById("note-text")

      if (noteTitle) noteTitle.value = title
      if (noteText) noteText.value = text

      // Focus on title
      if (noteTitle) noteTitle.focus()
    }
  }
}

function deleteNote(noteId) {
  if (confirm("Are you sure you want to delete this note?")) {
    // In a real application, this would delete the note from the database
    const noteCard = document.querySelector(`.note-card[data-id="${noteId}"]`)
    if (noteCard) {
      noteCard.remove()
    }
  }
}

function viewNote(noteId) {
  // In a real application, this would open a detailed view of the note
  const noteCard = document.querySelector(`.note-card[data-id="${noteId}"]`)
  if (noteCard) {
    const title = noteCard.querySelector("h3").textContent
    const reference = noteCard.querySelector(".note-meta span:first-child").textContent
    const text = noteCard.querySelector(".note-content").textContent.trim()

    alert(`Note: ${title}\nReference: ${reference}\n\n${text}`)
  }
}

function deleteHighlight(highlightId) {
  if (confirm("Are you sure you want to delete this highlight?")) {
    // In a real application, this would delete the highlight from the database
    const highlightCard = document.querySelector(`.highlight-card[data-id="${highlightId}"]`)
    if (highlightCard) {
      highlightCard.remove()
    }
  }
}

function goToVerse(reference) {
  // Parse the reference to get book, chapter, and verse
  const parts = reference.split(" ")
  let book, chapter, verse

  if (parts.length === 2) {
    // Format: "Genesis 1:1"
    const chapterVerse = parts[1].split(":")
    book = parts[0]
    chapter = chapterVerse[0]
    verse = chapterVerse[1]
  } else if (parts.length === 3) {
    // Format: "1 Corinthians 13:4"
    const chapterVerse = parts[2].split(":")
    book = parts[0] + " " + parts[1]
    chapter = chapterVerse[0]
    verse = chapterVerse[1]
  }

  // Redirect to the reader page
  window.location.href = `read.html?book=${encodeURIComponent(book)}&chapter=${chapter}&verse=${verse}`
}

function deleteBookmark(bookmarkId) {
  if (confirm("Are you sure you want to delete this bookmark?")) {
    // In a real application, this would delete the bookmark from the database
    const bookmarkCard = document.querySelector(`.bookmark-card[data-id="${bookmarkId}"]`)
    if (bookmarkCard) {
      bookmarkCard.remove()
    }
  }
}

function goToChapter(reference) {
  // Parse the reference to get book and chapter
  const parts = reference.split(" ")
  let book, chapter

  if (parts.length === 2) {
    // Format: "Genesis 1"
    book = parts[0]
    chapter = parts[1]
  } else if (parts.length === 3) {
    // Format: "1 Corinthians 13"
    book = parts[0] + " " + parts[1]
    chapter = parts[2]
  } else {
    // Just a book name
    book = reference
    chapter = 1
  }

  // Redirect to the reader page
  window.location.href = `read.html?book=${encodeURIComponent(book)}&chapter=${chapter}`
}

function pausePlan(planId) {
  // In a real application, this would pause the reading plan
  alert(`Pausing plan ${planId}`)
}

function continuePlan(planId) {
  // In a real application, this would continue the reading plan
  window.location.href = `read.html?plan=${planId}`
}

function viewMorePlans() {
  // In a real application, this would show more reading plans
  alert("Loading more reading plans...")
}

function goToReader() {
  // Redirect to the reader page
  window.location.href = "read.html"
}
