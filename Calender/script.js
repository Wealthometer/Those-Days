// Calendar Application State
let currentDate = new Date()
let currentView = "month"
let events = []
let filteredEvents = []
let selectedDate = null
let editingEvent = null

// Category colors and settings
const categories = {
  work: { color: "#3b82f6", name: "Work" },
  personal: { color: "#10b981", name: "Personal" },
  health: { color: "#ef4444", name: "Health" },
  social: { color: "#f59e0b", name: "Social" },
  travel: { color: "#8b5cf6", name: "Travel" },
}

// DOM Elements
const loadingScreen = document.getElementById("loading-screen")
const app = document.getElementById("app")
const currentMonthYear = document.getElementById("current-month-year")
const calendarGrid = document.getElementById("calendar-grid")
const monthView = document.getElementById("month-view")
const weekView = document.getElementById("week-view")
const dayView = document.getElementById("day-view")
const overlay = document.getElementById("overlay")
const eventModal = document.getElementById("event-modal")
const eventDetailsModal = document.getElementById("event-details-modal")
const datePickerModal = document.getElementById("date-picker-modal")
const searchInput = document.getElementById("search-input")
const upcomingEvents = document.getElementById("upcoming-events")
const notificationContainer = document.getElementById("notification-container")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Show loading screen
  showLoadingScreen()

  // Load data from localStorage
  loadFromStorage()

  // Set up event listeners
  setupEventListeners()

  // Initialize calendar
  updateCalendarDisplay()
  updateSidebarStats()
  updateUpcomingEvents()

  // Hide loading screen and show app
  setTimeout(() => {
    hideLoadingScreen()
    initializeAnimations()
  }, 2000)
}

function showLoadingScreen() {
  loadingScreen.classList.remove("hidden")
  app.classList.remove("loaded")
}

function hideLoadingScreen() {
  loadingScreen.classList.add("hidden")
  app.classList.add("loaded")
}

function initializeAnimations() {
  // Animate app entrance
  gsap.from(".header", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })

  gsap.from(".sidebar", {
    x: -300,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  })

  gsap.from(".calendar-container", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
  })

  // Animate calendar days
  gsap.from(".calendar-day", {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
    stagger: 0.02,
    ease: "back.out(1.7)",
  })
}

function setupEventListeners() {
  // Navigation buttons
  document.getElementById("prev-btn").addEventListener("click", navigatePrevious)
  document.getElementById("next-btn").addEventListener("click", navigateNext)
  document.getElementById("today-btn").addEventListener("click", goToToday)

  // View controls
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      switchView(e.target.dataset.view)
    })
  })

  // Month/Year picker
  document.getElementById("month-year-btn").addEventListener("click", openDatePicker)

  // Theme toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)

  // Add event button
  document.getElementById("add-event-btn").addEventListener("click", openAddEventModal)

  // Search functionality
  searchInput.addEventListener("input", handleSearch)

  // Quick action buttons
  document.querySelectorAll(".quick-action-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.action
      openAddEventModal(action)
    })
  })

  // Category filters
  document.querySelectorAll(".category-filter input").forEach((checkbox) => {
    checkbox.addEventListener("change", updateEventFilters)
  })

  // Modal close buttons
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modalId = e.target.dataset.modal
      closeModal(modalId)
    })
  })

  // Overlay click
  overlay.addEventListener("click", closeAllModals)

  // Event form submission
  document.getElementById("event-form").addEventListener("submit", handleEventSubmit)

  // Date picker functionality
  setupDatePicker()

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts)

  // Window resize
  window.addEventListener("resize", handleResize)
}

function navigatePrevious() {
  const prevDate = new Date(currentDate)

  if (currentView === "month") {
    prevDate.setMonth(prevDate.getMonth() - 1)
  } else if (currentView === "week") {
    prevDate.setDate(prevDate.getDate() - 7)
  } else if (currentView === "day") {
    prevDate.setDate(prevDate.getDate() - 1)
  }

  currentDate = prevDate
  updateCalendarDisplay()
  animateCalendarTransition("left")
}

function navigateNext() {
  const nextDate = new Date(currentDate)

  if (currentView === "month") {
    nextDate.setMonth(nextDate.getMonth() + 1)
  } else if (currentView === "week") {
    nextDate.setDate(nextDate.getDate() + 7)
  } else if (currentView === "day") {
    nextDate.setDate(nextDate.getDate() + 1)
  }

  currentDate = nextDate
  updateCalendarDisplay()
  animateCalendarTransition("right")
}

function goToToday() {
  currentDate = new Date()
  updateCalendarDisplay()
  animateCalendarTransition("fade")
  showNotification("Calendar Updated", "Jumped to today", "info")
}

function switchView(view) {
  if (view === currentView) return

  // Update view buttons
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-view="${view}"]`).classList.add("active")

  // Hide all views
  document.querySelectorAll(".calendar-view").forEach((viewEl) => {
    viewEl.classList.remove("active")
  })

  // Show selected view
  document.getElementById(`${view}-view`).classList.add("active")

  currentView = view
  updateCalendarDisplay()

  // Animate view transition
  gsap.from(`#${view}-view`, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power2.out",
  })
}

function updateCalendarDisplay() {
  updateHeaderDate()

  if (currentView === "month") {
    renderMonthView()
  } else if (currentView === "week") {
    renderWeekView()
  } else if (currentView === "day") {
    renderDayView()
  }

  updateSidebarStats()
  updateUpcomingEvents()
}

function updateHeaderDate() {
  const options = { year: "numeric", month: "long" }
  if (currentView === "day") {
    options.day = "numeric"
  }
  currentMonthYear.textContent = currentDate.toLocaleDateString("en-US", options)
}

function renderMonthView() {
  calendarGrid.innerHTML = ""

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const today = new Date()

  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate)
    cellDate.setDate(startDate.getDate() + i)

    const dayElement = createDayElement(cellDate, month, today)
    calendarGrid.appendChild(dayElement)
  }
}

function createDayElement(date, currentMonth, today) {
  const dayElement = document.createElement("div")
  dayElement.className = "calendar-day"

  const isToday = isSameDay(date, today)
  const isCurrentMonth = date.getMonth() === currentMonth
  const isSelected = selectedDate && isSameDay(date, selectedDate)

  if (!isCurrentMonth) dayElement.classList.add("other-month")
  if (isToday) dayElement.classList.add("today")
  if (isSelected) dayElement.classList.add("selected")

  const dayNumber = document.createElement("div")
  dayNumber.className = "day-number"
  dayNumber.textContent = date.getDate()

  const dayEvents = document.createElement("div")
  dayEvents.className = "day-events"

  // Get events for this day
  const dayEventsList = getEventsForDate(date)
  const maxVisible = 3

  dayEventsList.slice(0, maxVisible).forEach((event) => {
    const eventElement = document.createElement("div")
    eventElement.className = `day-event ${event.category}`
    eventElement.textContent = event.title
    eventElement.addEventListener("click", (e) => {
      e.stopPropagation()
      openEventDetails(event)
    })
    dayEvents.appendChild(eventElement)
  })

  if (dayEventsList.length > maxVisible) {
    const moreElement = document.createElement("div")
    moreElement.className = "more-events"
    moreElement.textContent = `+${dayEventsList.length - maxVisible} more`
    moreElement.addEventListener("click", (e) => {
      e.stopPropagation()
      showDayEvents(date, dayEventsList)
    })
    dayEvents.appendChild(moreElement)
  }

  dayElement.appendChild(dayNumber)
  dayElement.appendChild(dayEvents)

  // Add click handler for day selection
  dayElement.addEventListener("click", () => {
    selectDate(date)
  })

  return dayElement
}

function renderWeekView() {
  const weekDays = document.getElementById("week-days")
  const weekEvents = document.getElementById("week-events")
  const timeSlots = document.getElementById("time-slots")

  // Clear previous content
  weekDays.innerHTML = ""
  weekEvents.innerHTML = ""
  timeSlots.innerHTML = ""

  // Get week start (Sunday)
  const weekStart = new Date(currentDate)
  weekStart.setDate(currentDate.getDate() - currentDate.getDay())

  // Render week days header
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + i)

    const dayElement = document.createElement("div")
    dayElement.className = "week-day"
    if (isSameDay(day, new Date())) dayElement.classList.add("today")

    dayElement.innerHTML = `
      <div class="week-day-name">${day.toLocaleDateString("en-US", { weekday: "short" })}</div>
      <div class="week-day-number">${day.getDate()}</div>
    `

    weekDays.appendChild(dayElement)
  }

  // Render time slots
  for (let hour = 0; hour < 24; hour++) {
    const timeSlot = document.createElement("div")
    timeSlot.className = "time-slot"
    timeSlot.textContent = formatHour(hour)
    timeSlots.appendChild(timeSlot)
  }

  // Render week grid and events
  renderWeekGrid(weekStart)
}

function renderWeekGrid(weekStart) {
  const weekEvents = document.getElementById("week-events")
  weekEvents.innerHTML = ""

  const weekGrid = document.createElement("div")
  weekGrid.className = "week-grid"

  // Create columns for each day
  for (let i = 0; i < 7; i++) {
    const column = document.createElement("div")
    column.className = "week-column"

    // Add hour lines
    for (let hour = 0; hour < 24; hour++) {
      const hourLine = document.createElement("div")
      hourLine.className = "week-hour-line"
      hourLine.style.top = `${hour * 60}px`
      column.appendChild(hourLine)
    }

    weekGrid.appendChild(column)
  }

  weekEvents.appendChild(weekGrid)

  // Add events to the week view
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + i)

    const dayEvents = getEventsForDate(day)
    dayEvents.forEach((event) => {
      if (event.startTime && event.endTime) {
        const eventElement = createWeekEventElement(event, i)
        weekEvents.appendChild(eventElement)
      }
    })
  }
}

function createWeekEventElement(event, dayIndex) {
  const eventElement = document.createElement("div")
  eventElement.className = `week-event ${event.category}`
  eventElement.textContent = event.title

  const startTime = parseTime(event.startTime)
  const endTime = parseTime(event.endTime)
  const duration = endTime - startTime

  const left = (dayIndex / 7) * 100
  const top = startTime * 60 // 60px per hour
  const height = duration * 60

  eventElement.style.left = `${left}%`
  eventElement.style.width = `${100 / 7}%`
  eventElement.style.top = `${top}px`
  eventElement.style.height = `${height}px`

  eventElement.addEventListener("click", () => {
    openEventDetails(event)
  })

  return eventElement
}

function renderDayView() {
  const dayTitle = document.getElementById("day-title")
  const dayDate = document.getElementById("day-date")
  const dayTimeSlots = document.getElementById("day-time-slots")
  const dayEvents = document.getElementById("day-events")

  // Update day header
  const isToday = isSameDay(currentDate, new Date())
  dayTitle.textContent = isToday ? "Today" : currentDate.toLocaleDateString("en-US", { weekday: "long" })
  dayDate.textContent = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Clear previous content
  dayTimeSlots.innerHTML = ""
  dayEvents.innerHTML = ""

  // Render time slots
  for (let hour = 0; hour < 24; hour++) {
    const timeSlot = document.createElement("div")
    timeSlot.className = "time-slot"
    timeSlot.textContent = formatHour(hour)
    dayTimeSlots.appendChild(timeSlot)
  }

  // Render day events
  const eventsForDay = getEventsForDate(currentDate)
  eventsForDay.forEach((event) => {
    const eventElement = createDayEventElement(event)
    dayEvents.appendChild(eventElement)
  })
}

function createDayEventElement(event) {
  const eventElement = document.createElement("div")
  eventElement.className = `day-event ${event.category}`

  if (event.startTime && event.endTime) {
    const startTime = parseTime(event.startTime)
    const endTime = parseTime(event.endTime)
    const duration = endTime - startTime

    eventElement.style.top = `${startTime * 60}px`
    eventElement.style.height = `${duration * 60}px`
    eventElement.style.position = "absolute"
    eventElement.style.left = "10px"
    eventElement.style.right = "10px"
  }

  eventElement.innerHTML = `
    <div class="event-time">${event.startTime || "All day"}</div>
    <div class="event-title">${event.title}</div>
  `

  eventElement.addEventListener("click", () => {
    openEventDetails(event)
  })

  return eventElement
}

function selectDate(date) {
  selectedDate = new Date(date)

  // Update visual selection
  document.querySelectorAll(".calendar-day").forEach((day) => {
    day.classList.remove("selected")
  })

  // Find and select the clicked day
  const dayElements = document.querySelectorAll(".calendar-day")
  dayElements.forEach((dayEl) => {
    const dayNumber = Number.parseInt(dayEl.querySelector(".day-number").textContent)
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)

    if (isSameDay(dayDate, selectedDate)) {
      dayEl.classList.add("selected")
    }
  })

  // Animate selection
  gsap.from(".calendar-day.selected", {
    scale: 0.9,
    duration: 0.3,
    ease: "back.out(1.7)",
  })
}

function openAddEventModal(type = "event") {
  editingEvent = null

  // Reset form
  document.getElementById("event-form").reset()
  document.getElementById("event-modal-title").textContent = "Add Event"
  document.getElementById("delete-event-btn").style.display = "none"

  // Set default category based on quick action
  if (type === "meeting") {
    document.getElementById("event-category").value = "work"
    document.getElementById("event-title").value = "Meeting"
  } else if (type === "reminder") {
    document.getElementById("event-category").value = "personal"
    document.getElementById("event-title").value = "Reminder"
  } else if (type === "task") {
    document.getElementById("event-category").value = "work"
    document.getElementById("event-title").value = "Task"
  }

  // Set default date
  if (selectedDate) {
    document.getElementById("event-date").value = formatDateForInput(selectedDate)
  } else {
    document.getElementById("event-date").value = formatDateForInput(currentDate)
  }

  openModal("event-modal")
}

function openEventDetails(event) {
  // Populate event details
  document.getElementById("event-details-title").textContent = event.title

  const datetime = event.date
  if (event.startTime) {
    document.getElementById("event-details-datetime").textContent =
      `${formatDate(new Date(event.date))} at ${event.startTime}`
  } else {
    document.getElementById("event-details-datetime").textContent = formatDate(new Date(event.date))
  }

  document.getElementById("event-details-location").textContent = event.location || "No location specified"
  document.getElementById("event-details-description").textContent = event.description || "No description"
  document.getElementById("event-details-category").textContent = categories[event.category].name
  document.getElementById("event-details-priority").textContent =
    event.priority.charAt(0).toUpperCase() + event.priority.slice(1)

  // Set up edit button
  document.getElementById("edit-event-btn").onclick = () => {
    closeModal("event-details-modal")
    openEditEventModal(event)
  }

  openModal("event-details-modal")
}

function openEditEventModal(event) {
  editingEvent = event

  // Populate form with event data
  document.getElementById("event-modal-title").textContent = "Edit Event"
  document.getElementById("event-title").value = event.title
  document.getElementById("event-date").value = formatDateForInput(new Date(event.date))
  document.getElementById("event-category").value = event.category
  document.getElementById("event-start-time").value = event.startTime || ""
  document.getElementById("event-end-time").value = event.endTime || ""
  document.getElementById("event-description").value = event.description || ""
  document.getElementById("event-location").value = event.location || ""
  document.getElementById("event-reminder").value = event.reminder || ""
  document.getElementById("event-priority").value = event.priority || "medium"

  // Show delete button
  document.getElementById("delete-event-btn").style.display = "block"
  document.getElementById("delete-event-btn").onclick = () => {
    deleteEvent(event)
  }

  openModal("event-modal")
}

function handleEventSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const eventData = {
    id: editingEvent ? editingEvent.id : generateId(),
    title: formData.get("title") || document.getElementById("event-title").value,
    date: document.getElementById("event-date").value,
    category: document.getElementById("event-category").value,
    startTime: document.getElementById("event-start-time").value,
    endTime: document.getElementById("event-end-time").value,
    description: document.getElementById("event-description").value,
    location: document.getElementById("event-location").value,
    reminder: document.getElementById("event-reminder").value,
    priority: document.getElementById("event-priority").value,
    createdAt: editingEvent ? editingEvent.createdAt : new Date().toISOString(),
  }

  if (editingEvent) {
    // Update existing event
    const index = events.findIndex((e) => e.id === editingEvent.id)
    if (index !== -1) {
      events[index] = eventData
      showNotification("Event Updated", "Event has been updated successfully", "success")
    }
  } else {
    // Add new event
    events.push(eventData)
    showNotification("Event Created", "New event has been created successfully", "success")
  }

  saveToStorage()
  updateCalendarDisplay()
  closeModal("event-modal")

  // Animate the updated calendar
  animateCalendarUpdate()
}

function deleteEvent(event) {
  if (confirm("Are you sure you want to delete this event?")) {
    events = events.filter((e) => e.id !== event.id)
    saveToStorage()
    updateCalendarDisplay()
    closeModal("event-modal")
    showNotification("Event Deleted", "Event has been deleted successfully", "success")
  }
}

function openDatePicker() {
  const selectedYear = document.getElementById("selected-year")
  const monthGrid = document.getElementById("month-grid")

  selectedYear.textContent = currentDate.getFullYear()

  // Clear and populate month grid
  monthGrid.innerHTML = ""
  const months = [
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

  months.forEach((month, index) => {
    const monthItem = document.createElement("div")
    monthItem.className = "month-item"
    monthItem.textContent = month

    if (index === currentDate.getMonth()) {
      monthItem.classList.add("current")
    }

    monthItem.addEventListener("click", () => {
      currentDate.setMonth(index)
      updateCalendarDisplay()
      closeModal("date-picker-modal")
      animateCalendarTransition("fade")
    })

    monthGrid.appendChild(monthItem)
  })

  openModal("date-picker-modal")
}

function setupDatePicker() {
  document.getElementById("prev-year").addEventListener("click", () => {
    const selectedYear = document.getElementById("selected-year")
    const year = Number.parseInt(selectedYear.textContent) - 1
    selectedYear.textContent = year
  })

  document.getElementById("next-year").addEventListener("click", () => {
    const selectedYear = document.getElementById("selected-year")
    const year = Number.parseInt(selectedYear.textContent) + 1
    selectedYear.textContent = year
  })
}

function toggleTheme() {
  const body = document.body
  const isDark = body.classList.contains("dark-theme")

  if (isDark) {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme")
    localStorage.setItem("theme", "light")
  } else {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")
  }

  // Animate theme transition
  gsap.from("body", {
    opacity: 0.8,
    duration: 0.3,
    ease: "power2.inOut",
  })

  showNotification("Theme Changed", `Switched to ${isDark ? "light" : "dark"} theme`, "info")
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim()

  if (query === "") {
    filteredEvents = [...events]
  } else {
    filteredEvents = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query),
    )
  }

  updateCalendarDisplay()

  if (query !== "") {
    showNotification("Search Results", `Found ${filteredEvents.length} events`, "info")
  }
}

function updateEventFilters() {
  const activeCategories = []
  document.querySelectorAll(".category-filter input:checked").forEach((checkbox) => {
    activeCategories.push(checkbox.dataset.category)
  })

  filteredEvents = events.filter((event) => activeCategories.includes(event.category))

  updateCalendarDisplay()
}

function updateSidebarStats() {
  const totalEvents = events.length
  const thisMonthEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()
  }).length

  const completedTasks = events.filter((event) => event.completed).length

  document.getElementById("total-events").textContent = totalEvents
  document.getElementById("this-month-events").textContent = thisMonthEvents
  document.getElementById("completed-tasks").textContent = completedTasks

  // Update category counts
  Object.keys(categories).forEach((category) => {
    const count = events.filter((event) => event.category === category).length
    const countElement = document.getElementById(`${category}-count`)
    if (countElement) {
      countElement.textContent = count
    }
  })
}

function updateUpcomingEvents() {
  upcomingEvents.innerHTML = ""

  const today = new Date()
  const upcoming = events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  if (upcoming.length === 0) {
    upcomingEvents.innerHTML = '<p class="text-center text-tertiary">No upcoming events</p>'
    return
  }

  upcoming.forEach((event) => {
    const eventElement = document.createElement("div")
    eventElement.className = "upcoming-event"
    eventElement.innerHTML = `
      <div class="upcoming-event-title">${event.title}</div>
      <div class="upcoming-event-time">${formatDate(new Date(event.date))} ${event.startTime || ""}</div>
    `

    eventElement.addEventListener("click", () => {
      openEventDetails(event)
    })

    upcomingEvents.appendChild(eventElement)
  })
}

function getEventsForDate(date) {
  const dateString = formatDateForInput(date)
  const eventsToShow = filteredEvents.length > 0 ? filteredEvents : events
  return eventsToShow.filter((event) => event.date === dateString)
}

function openModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.add("active")
  overlay.classList.add("active")

  // Animate modal entrance
  gsap.from(`#${modalId} .modal-content`, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "back.out(1.7)",
  })
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)

  // Animate modal exit
  gsap.to(`#${modalId} .modal-content`, {
    scale: 0.8,
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      modal.classList.remove("active")
      if (!document.querySelector(".modal.active")) {
        overlay.classList.remove("active")
      }
    },
  })
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active")
  })
  overlay.classList.remove("active")
}

function showNotification(title, message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  }

  notification.innerHTML = `
    <div class="notification-icon">${icons[type]}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
  `

  notificationContainer.appendChild(notification)

  // Animate notification entrance
  gsap.set(notification, { x: 100, opacity: 0 })
  gsap.to(notification, {
    x: 0,
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  })

  notification.classList.add("show")

  // Auto remove after 5 seconds
  setTimeout(() => {
    gsap.to(notification, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        notification.remove()
      },
    })
  }, 5000)
}

function animateCalendarTransition(direction) {
  const calendar = document.querySelector(".calendar-grid, .week-content, .day-content")

  if (direction === "left") {
    gsap.fromTo(calendar, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
  } else if (direction === "right") {
    gsap.fromTo(calendar, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
  } else {
    gsap.fromTo(calendar, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
  }
}

function animateCalendarUpdate() {
  gsap.from(".calendar-day", {
    scale: 0.9,
    opacity: 0.7,
    duration: 0.3,
    stagger: 0.01,
    ease: "power2.out",
  })
}

function handleKeyboardShortcuts(e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return

  switch (e.key) {
    case "n":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        openAddEventModal()
      }
      break
    case "t":
      goToToday()
      break
    case "ArrowLeft":
      navigatePrevious()
      break
    case "ArrowRight":
      navigateNext()
      break
    case "1":
      switchView("month")
      break
    case "2":
      switchView("week")
      break
    case "3":
      switchView("day")
      break
    case "Escape":
      closeAllModals()
      break
  }
}

function handleResize() {
  // Refresh calendar layout on resize
  setTimeout(() => {
    updateCalendarDisplay()
  }, 100)
}

// Utility functions
function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateForInput(date) {
  return date.toISOString().split("T")[0]
}

function formatHour(hour) {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

function parseTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number)
  return hours + minutes / 60
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function saveToStorage() {
  localStorage.setItem("calendar_events", JSON.stringify(events))
  localStorage.setItem("calendar_current_date", currentDate.toISOString())
  localStorage.setItem("calendar_view", currentView)
}

function loadFromStorage() {
  // Load events
  const storedEvents = localStorage.getItem("calendar_events")
  if (storedEvents) {
    events = JSON.parse(storedEvents)
    filteredEvents = [...events]
  }

  // Load current date
  const storedDate = localStorage.getItem("calendar_current_date")
  if (storedDate) {
    currentDate = new Date(storedDate)
  }

  // Load view
  const storedView = localStorage.getItem("calendar_view")
  if (storedView) {
    currentView = storedView
    switchView(currentView)
  }

  // Load theme
  const storedTheme = localStorage.getItem("theme")
  if (storedTheme) {
    document.body.className = `${storedTheme}-theme`
  }

  // Add some sample events if none exist
  if (events.length === 0) {
    addSampleEvents()
  }
}

function addSampleEvents() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const sampleEvents = [
    {
      id: generateId(),
      title: "Team Meeting",
      date: formatDateForInput(today),
      category: "work",
      startTime: "10:00",
      endTime: "11:00",
      description: "Weekly team sync meeting",
      location: "Conference Room A",
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: "Lunch with Sarah",
      date: formatDateForInput(tomorrow),
      category: "personal",
      startTime: "12:30",
      endTime: "13:30",
      description: "Catch up lunch",
      location: "Downtown Cafe",
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: "Gym Workout",
      date: formatDateForInput(today),
      category: "health",
      startTime: "18:00",
      endTime: "19:30",
      description: "Cardio and strength training",
      location: "Fitness Center",
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
  ]

  events = sampleEvents
  filteredEvents = [...events]
  saveToStorage()
}

// Initialize drag and drop for events (bonus feature)
function initializeDragAndDrop() {
  // This would implement drag and drop functionality for moving events
  // between dates in the calendar view
}

// Export calendar data (bonus feature)
function exportCalendar() {
  const dataStr = JSON.stringify(events, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = "calendar-events.json"
  link.click()
  URL.revokeObjectURL(url)

  showNotification("Export Complete", "Calendar data exported successfully", "success")
}

// Import calendar data (bonus feature)
function importCalendar(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedEvents = JSON.parse(e.target.result)
      events = [...events, ...importedEvents]
      filteredEvents = [...events]
      saveToStorage()
      updateCalendarDisplay()
      showNotification("Import Complete", `Imported ${importedEvents.length} events`, "success")
    } catch (error) {
      showNotification("Import Failed", "Invalid file format", "error")
    }
  }
  reader.readAsText(file)
}

function showDayEvents(date, dayEventsList) {
  const dayEventsModal = document.getElementById("day-events-modal")
  const dayEventsListContainer = document.getElementById("day-events-list")
  const dayEventsTitle = document.getElementById("day-events-title")

  dayEventsTitle.textContent = formatDate(date)
  dayEventsListContainer.innerHTML = ""

  dayEventsList.forEach((event) => {
    const eventElement = document.createElement("div")
    eventElement.className = "day-event-item"
    eventElement.textContent = event.title
    eventElement.addEventListener("click", () => {
      closeModal("day-events-modal")
      openEventDetails(event)
    })
    dayEventsListContainer.appendChild(eventElement)
  })

  openModal("day-events-modal")
}
