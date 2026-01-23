class MoodTracker {
  constructor() {
    this.moods = {
      happy: { emoji: "😊", label: "Happy", color: "#FFD700" },
      sad: { emoji: "😢", label: "Sad", color: "#87CEEB" },
      angry: { emoji: "😡", label: "Angry", color: "#FF6B6B" },
      tired: { emoji: "😴", label: "Tired", color: "#DDA0DD" },
      excited: { emoji: "😍", label: "Excited", color: "#FF69B4" },
    }

    this.selectedMood = null
    this.currentDate = new Date()
    this.calendarDate = new Date()

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateCurrentDate()
    this.loadTodaysMood()
    this.loadMoodHistory()
    this.updateStats()
    this.renderCalendar()
    this.setupCharacterCounter()
  }

  setupEventListeners() {
    // Mood button selection
    document.querySelectorAll(".mood-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.selectMood(e.currentTarget))
    })

    // Save mood button
    document.getElementById("save-mood").addEventListener("click", () => this.saveMood())

    // Edit mood button
    document.getElementById("edit-mood").addEventListener("click", () => this.editMood())

    // Clear history button
    document.getElementById("clear-history").addEventListener("click", () => this.clearHistory())

    // Filter period
    document.getElementById("filter-period").addEventListener("change", (e) => this.filterHistory(e.target.value))

    // Calendar navigation
    document.getElementById("prev-month").addEventListener("click", () => this.navigateCalendar(-1))
    document.getElementById("next-month").addEventListener("click", () => this.navigateCalendar(1))

    // Mood note input
    document.getElementById("mood-note").addEventListener("input", () => this.updateCharacterCounter())
  }

  updateCurrentDate() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    document.getElementById("current-date").textContent = this.currentDate.toLocaleDateString("en-US", options)
  }

  setupCharacterCounter() {
    const textarea = document.getElementById("mood-note")
    const counter = document.getElementById("char-count")

    textarea.addEventListener("input", () => {
      const count = textarea.value.length
      counter.textContent = count

      if (count > 180) {
        counter.style.color = "#e53e3e"
      } else if (count > 150) {
        counter.style.color = "#ed8936"
      } else {
        counter.style.color = "#718096"
      }
    })
  }

  updateCharacterCounter() {
    const textarea = document.getElementById("mood-note")
    const counter = document.getElementById("char-count")
    counter.textContent = textarea.value.length
  }

  selectMood(button) {
    // Remove previous selection
    document.querySelectorAll(".mood-btn").forEach((btn) => {
      btn.classList.remove("selected")
      btn.style.borderColor = "#e2e8f0"
      btn.style.background = "white"
    })

    // Select current mood
    button.classList.add("selected")
    this.selectedMood = button.dataset.mood
    const color = button.dataset.color

    button.style.borderColor = color
    button.style.background = `linear-gradient(135deg, ${color}20, ${color}10)`

    // Enable save button
    document.getElementById("save-mood").disabled = false

    // Add selection animation
    button.style.animation = "pulse 0.5s ease"
    setTimeout(() => {
      button.style.animation = ""
    }, 500)
  }

  saveMood() {
    if (!this.selectedMood) return

    const today = this.formatDate(this.currentDate)
    const note = document.getElementById("mood-note").value.trim()
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const moodEntry = {
      mood: this.selectedMood,
      note: note,
      date: today,
      timestamp: timestamp,
      fullDate: new Date().toISOString(),
    }

    // Save to localStorage
    let moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")

    // Remove existing entry for today if any
    moodData = moodData.filter((entry) => entry.date !== today)

    // Add new entry
    moodData.unshift(moodEntry)

    localStorage.setItem("moodTracker", JSON.stringify(moodData))

    // Show success message
    this.showSuccessMessage()

    // Update UI
    this.loadTodaysMood()
    this.loadMoodHistory()
    this.updateStats()
    this.renderCalendar()

    // Reset form
    this.resetMoodSelection()
  }

  editMood() {
    const todaysMoodSection = document.getElementById("todays-mood")
    todaysMoodSection.style.display = "none"

    // Load today's mood data into form
    const today = this.formatDate(this.currentDate)
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")
    const todayEntry = moodData.find((entry) => entry.date === today)

    if (todayEntry) {
      // Select the mood button
      const moodButton = document.querySelector(`[data-mood="${todayEntry.mood}"]`)
      if (moodButton) {
        this.selectMood(moodButton)
      }

      // Fill in the note
      document.getElementById("mood-note").value = todayEntry.note || ""
      this.updateCharacterCounter()
    }
  }

  resetMoodSelection() {
    document.querySelectorAll(".mood-btn").forEach((btn) => {
      btn.classList.remove("selected")
      btn.style.borderColor = "#e2e8f0"
      btn.style.background = "white"
    })

    this.selectedMood = null
    document.getElementById("save-mood").disabled = true
    document.getElementById("mood-note").value = ""
    this.updateCharacterCounter()
  }

  loadTodaysMood() {
    const today = this.formatDate(this.currentDate)
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")
    const todayEntry = moodData.find((entry) => entry.date === today)

    const todaysMoodSection = document.getElementById("todays-mood")

    if (todayEntry) {
      const mood = this.moods[todayEntry.mood]

      document.getElementById("today-emoji").textContent = mood.emoji
      document.getElementById("today-mood-name").textContent = mood.label
      document.getElementById("today-mood-note").textContent = todayEntry.note || "No note added"
      document.getElementById("today-time").textContent = `Recorded at ${todayEntry.timestamp}`

      todaysMoodSection.style.display = "block"
    } else {
      todaysMoodSection.style.display = "none"
    }
  }

  loadMoodHistory() {
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")
    const historyList = document.getElementById("history-list")

    if (moodData.length === 0) {
      historyList.innerHTML = `
                <div class="empty-state">
                    <span class="empty-emoji">📝</span>
                    <p>No mood entries yet. Start tracking your mood today!</p>
                </div>
            `
      return
    }

    historyList.innerHTML = ""

    moodData.forEach((entry, index) => {
      const mood = this.moods[entry.mood]
      const historyItem = document.createElement("div")
      historyItem.className = "history-item"

      historyItem.innerHTML = `
                <div class="history-mood">
                    <span class="history-emoji">${mood.emoji}</span>
                    <div class="history-info">
                        <h4>${mood.label}</h4>
                        <p>${entry.note || "No note"}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="history-date">${this.formatDisplayDate(entry.date)}</div>
                    <button class="delete-btn" onclick="moodTracker.deleteMoodEntry(${index})">Delete</button>
                </div>
            `

      historyList.appendChild(historyItem)
    })
  }

  deleteMoodEntry(index) {
    if (confirm("Are you sure you want to delete this mood entry?")) {
      const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")
      moodData.splice(index, 1)
      localStorage.setItem("moodTracker", JSON.stringify(moodData))

      this.loadMoodHistory()
      this.updateStats()
      this.renderCalendar()
      this.loadTodaysMood()
    }
  }

  clearHistory() {
    if (confirm("Are you sure you want to clear all mood history? This action cannot be undone.")) {
      localStorage.removeItem("moodTracker")
      this.loadMoodHistory()
      this.updateStats()
      this.renderCalendar()
      this.loadTodaysMood()
    }
  }

  filterHistory(period) {
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")
    let filteredData = moodData

    if (period !== "all") {
      const now = new Date()
      const daysBack = period === "week" ? 7 : 30
      const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

      filteredData = moodData.filter((entry) => {
        const entryDate = new Date(entry.fullDate)
        return entryDate >= cutoffDate
      })
    }

    this.displayFilteredHistory(filteredData)
  }

  displayFilteredHistory(data) {
    const historyList = document.getElementById("history-list")

    if (data.length === 0) {
      historyList.innerHTML = `
                <div class="empty-state">
                    <span class="empty-emoji">📝</span>
                    <p>No mood entries found for this period.</p>
                </div>
            `
      return
    }

    historyList.innerHTML = ""

    data.forEach((entry, index) => {
      const mood = this.moods[entry.mood]
      const historyItem = document.createElement("div")
      historyItem.className = "history-item"

      historyItem.innerHTML = `
                <div class="history-mood">
                    <span class="history-emoji">${mood.emoji}</span>
                    <div class="history-info">
                        <h4>${mood.label}</h4>
                        <p>${entry.note || "No note"}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="history-date">${this.formatDisplayDate(entry.date)}</div>
                </div>
            `

      historyList.appendChild(historyItem)
    })
  }

  updateStats() {
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")

    // Total entries
    document.getElementById("total-entries").textContent = moodData.length

    // Most common mood
    if (moodData.length > 0) {
      const moodCounts = {}
      moodData.forEach((entry) => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1
      })

      const mostCommon = Object.keys(moodCounts).reduce((a, b) => (moodCounts[a] > moodCounts[b] ? a : b))

      document.getElementById("most-common-mood").textContent = this.moods[mostCommon].emoji
    } else {
      document.getElementById("most-common-mood").textContent = "😊"
    }

    // Streak count
    const streak = this.calculateStreak(moodData)
    document.getElementById("streak-count").textContent = streak
  }

  calculateStreak(moodData) {
    if (moodData.length === 0) return 0

    const today = new Date()
    let streak = 0
    const currentDate = new Date(today)

    // Sort data by date (newest first)
    const sortedData = moodData.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate))

    for (let i = 0; i < 365; i++) {
      // Check up to a year
      const dateStr = this.formatDate(currentDate)
      const hasEntry = sortedData.some((entry) => entry.date === dateStr)

      if (hasEntry) {
        streak++
      } else {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    return streak
  }

  renderCalendar() {
    const calendarGrid = document.getElementById("calendar-grid")
    const calendarMonth = document.getElementById("calendar-month")

    // Set month header
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    calendarMonth.textContent = `${monthNames[this.calendarDate.getMonth()]} ${this.calendarDate.getFullYear()}`

    // Clear calendar
    calendarGrid.innerHTML = ""

    // Add day headers
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    dayHeaders.forEach((day) => {
      const dayHeader = document.createElement("div")
      dayHeader.textContent = day
      dayHeader.style.fontWeight = "600"
      dayHeader.style.color = "#718096"
      dayHeader.style.textAlign = "center"
      dayHeader.style.padding = "0.5rem"
      calendarGrid.appendChild(dayHeader)
    })

    // Get first day of month and number of days
    const firstDay = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1)
    const lastDay = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    // Load mood data
    const moodData = JSON.parse(localStorage.getItem("moodTracker") || "[]")

    // Generate calendar days
    for (let i = 0; i < 42; i++) {
      // 6 weeks
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const dayElement = document.createElement("div")
      dayElement.className = "calendar-day"

      const dateStr = this.formatDate(currentDate)
      const moodEntry = moodData.find((entry) => entry.date === dateStr)

      if (moodEntry) {
        dayElement.textContent = this.moods[moodEntry.mood].emoji
        dayElement.classList.add("has-mood")
        dayElement.title = `${this.moods[moodEntry.mood].label}${moodEntry.note ? ": " + moodEntry.note : ""}`
      } else {
        dayElement.textContent = currentDate.getDate()
      }

      // Mark today
      if (this.formatDate(currentDate) === this.formatDate(new Date())) {
        dayElement.classList.add("today")
      }

      // Mark other month days
      if (currentDate.getMonth() !== this.calendarDate.getMonth()) {
        dayElement.classList.add("other-month")
      }

      calendarGrid.appendChild(dayElement)
    }
  }

  navigateCalendar(direction) {
    this.calendarDate.setMonth(this.calendarDate.getMonth() + direction)
    this.renderCalendar()
  }

  showSuccessMessage() {
    const successMessage = document.getElementById("success-message")
    successMessage.classList.add("show")

    setTimeout(() => {
      successMessage.classList.remove("show")
    }, 3000)
  }

  formatDate(date) {
    return date.toISOString().split("T")[0]
  }

  formatDisplayDate(dateStr) {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (this.formatDate(date) === this.formatDate(today)) {
      return "Today"
    } else if (this.formatDate(date) === this.formatDate(yesterday)) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      })
    }
  }
}

// Initialize the mood tracker when the page loads
let moodTracker

document.addEventListener("DOMContentLoaded", () => {
  moodTracker = new MoodTracker()
})
