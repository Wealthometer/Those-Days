// Daily Verse JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Daily verses data - in a real application, this would come from an API
  const dailyVerses = [
    {
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      reference: "John 3:16 (ESV)",
    },
    {
      text: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
      reference: "Proverbs 3:5-6 (ESV)",
    },
    {
      text: "I can do all things through him who strengthens me.",
      reference: "Philippians 4:13 (ESV)",
    },
    {
      text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
      reference: "Romans 8:28 (ESV)",
    },
    {
      text: "The LORD is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
      reference: "Psalm 23:1-3 (ESV)",
    },
    {
      text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
      reference: "Jeremiah 29:11 (ESV)",
    },
    {
      text: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
      reference: "Isaiah 40:31 (ESV)",
    },
  ]

  // Get verse elements
  const verseText = document.getElementById("verse-text")
  const verseReference = document.getElementById("verse-reference")
  const shareVerseBtn = document.getElementById("share-verse")

  if (verseText && verseReference) {
    // Get today's verse based on the date
    const today = new Date()
    const dayOfYear = getDayOfYear(today)
    const verseIndex = dayOfYear % dailyVerses.length
    const todayVerse = dailyVerses[verseIndex]

    // Update the verse display
    verseText.textContent = `"${todayVerse.text}"`
    verseReference.textContent = todayVerse.reference

    // Share verse functionality
    if (shareVerseBtn) {
      shareVerseBtn.addEventListener("click", () => {
        shareVerse(todayVerse)
      })
    }
  }

  // Helper function to get day of year
  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }

  // Share verse function
  function shareVerse(verse) {
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: "Daily Verse from Divine Word",
          text: `"${verse.text}" - ${verse.reference}`,
          url: window.location.href,
        })
        .then(() => console.log("Verse shared successfully"))
        .catch((error) => console.log("Error sharing verse:", error))
    } else {
      // Fallback for browsers that don't support Web Share API
      // Create a temporary input to copy the text
      const tempInput = document.createElement("textarea")
      tempInput.value = `"${verse.text}" - ${verse.reference}`
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand("copy")
      document.body.removeChild(tempInput)

      alert("Verse copied to clipboard!")
    }
  }
})
