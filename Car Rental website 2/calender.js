const eventList = {
    '2025-01-15': [
      { title: 'Book Reading: Fiction', time: '10:00 AM' },
      { title: 'Workshop: Digital Archives', time: '2:00 PM' }
    ],
    '2025-01-22': [
      { title: 'Author Meet and Greet', time: '5:00 PM' }
    ],
    '2025-01-20': [
      { title: 'Book Reading Event', time: '9:00 AM'}
    ],
    '2025-01-31': [
        {title: 'Black-Friday', time: 'The whole day starting from 12:00 AM Get Books for a percentage %% off'}
    ],
    '2025-02-28': [
        {title: 'Black-Friday', time: 'The whole day starting from 12:00 AM Get Books for a percentage %% off'}
    ],
    '2025-02-15':[
         {title:'Realease of Latest Books', time: "Latest Released Books Will Be Release From This Day Henceforth"}
    ],
    '2025-03-28':[
      {title: 'Black-Friday', time: 'The whole day starting from 12:00AM Get Books for a percentage %% off'}
    ],
    '2025-03-01': [
      { title: 'Poetry Slam Night', time: '6:00 PM' }
    ],
    '2025-03-05': [
      { title: 'Children’s Story Hour', time: '11:00 AM' }
    ],
    '2025-03-18': [
      { title: 'Book Club: Mystery Novels', time: '7:00 PM' }
    ],
    '2025-03-28': [
      { title: 'Black Friday Sale', time: 'The whole day starting from 12:00 AM. Get Books for a percentage %% off' }
    ],
    '2025-04-02': [
      { title: 'Graphic Novel Workshop', time: '3:00 PM' }
    ],
    '2025-04-06': [
      { title: 'Local Author Showcase', time: '1:00 PM' }
    ],
    '2025-04-16': [
      { title: 'History of Literature Lecture', time: '5:00 PM' }
    ],
    '2025-04-19': [
      { title: 'Book Signing Event', time: '4:00 PM' }
    ],
    '2025-04-21': [
      { title: 'Library Open House', time: '10:00 AM - 4:00 PM' }
    ],
    '2025-04-26': [
      { title: 'Science Fiction Movie Night', time: '6:00 PM' }
    ],
    '2025-04-29': [
      { title: 'Monthly Book Swap', time: '2:00 PM' }
    ],
    '2025-05-01': [
      { title: 'May Day Celebration: Read-a-thon', time: 'All day event' }
    ],
    '2025-05-10': [
      { title: 'Mother’s Day Craft Workshop', time: '2:00 PM' }
    ],
    '2025-05-15': [
      { title: 'Young Adult Book Fair', time: '10:00 AM - 5:00 PM' }
    ],
    '2025-05-20': [
      { title: 'Digital Literacy Workshop', time: '3:00 PM' }
    ],
    '2025-05-25': [
      { title: 'Memorial Day Reading Challenge', time: 'All day event' }
    ],
    '2025-06-01': [
      { title: 'Summer Reading Kickoff', time: '10:00 AM' }
    ],
    '2025-06-10': [
      { title: 'Creative Writing Workshop', time: '1:00 PM' }
    ],
    '2025-06-15': [
      { title: 'Father’s Day Book Recommendations', time: 'All day event' }
    ],
    '2025-06-20': [
      { title: 'Outdoor Storytime', time: '11:00 AM' }
    ],
    '2025-06-30': [
      { title: 'End of Month Book Discussion', time: '6:00 PM' }
    ],
    '2025-07-04': [
      { title: 'Independence Day Celebration', time: 'Library Closed' }
    ],
    '2025-07-10': [
      { title: 'Science Fair Projects Showcase', time: '2:00 PM' }
    ],
    '2025-07-15': [
      { title: 'Book Bingo Night', time: '6:00 PM' }
    ],
    '2025-07-20': [
      { title: 'Teen Movie Night', time: '5:00 PM' }
    ],
    '2025-07-30': [
      { title: 'End of Summer Reading Party', time: '3:00 PM' }
    ],
    '2025-08-01': [
      { title: 'Back to School Book Fair', time: '10:00 AM - 5:00 PM' }
    ],
    '2025-08-15': [
      { title: 'Book Discussion: Classics', time: '7:00 PM' }
    ],
    '2025-08-20': [
      { title: 'Library Card Sign-Up Month', time: 'All day event' }
    ],
    '2025-09-01': [
      { title: 'Labor Day Reading Challenge', time: 'All day event' }
    ],
    '2025-09-10': [
      { title: 'Fall Reading Program Launch', time: '10:00 AM' }
    ],
    '2025-09-15': [
      { title: 'Author Talk: Historical Fiction', time: '6:00 PM' }
    ],
    '2025-09-30': [
      { title: 'Banned Books Week Display', time: 'All week' }
    ],
    '2025-10-01': [
      { title: 'Halloween Storytime', time: '11:00 AM' }
    ],
    '2025-10-15': [
      { title: 'Spooky Movie Night', time: '6:00 PM' }
    ],
    '2025-10-31': [
      { title: 'Halloween Costume Contest', time: '5:00 PM' }
    ],
    '2025-11-01': [
      { title: 'NaNoWriMo Kickoff', time: '10:00 AM' }
    ],
    '2025-11-11': [
      { title: 'Veterans Day Tribute', time: '2:00 PM' }
    ],
    '2025-11-15': [
      { title: 'Thanksgiving Recipe Exchange', time: '1:00 PM' }
    ],
    '2025-11-30': [
      { title: 'End of Month Book Discussion', time: '6:00 PM' }
    ],
    '2025-12-01': [
      { title: 'Holiday Reading Challenge', time: 'All month' }
    ],
    '2025-12-10': [
      { title: 'Winter Craft Workshop', time: '2:00 PM' }
    ],
    '2025-12-15': [
      { title: 'Holiday Book Fair', time: '10:00 AM - 5:00 PM' }
    ],
    '2025-12-24': [
      { title: 'Christmas Eve Storytime', time: '4:00 PM' }
    ],
    '2025-12-31': [
      { title: 'New Year’s Eve Celebration', time: '6:00 PM' }
    ]
};

  const calendarDates = document.getElementById('calendarDates');
  const currentMonth = document.getElementById('currentMonth');
  const eventContainer = document.getElementById('eventContainer');

  let date = new Date();
  date.setDate(1);

  function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();

    currentMonth.textContent = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    calendarDates.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarDates.innerHTML += '<div></div>';
    }

    for (let i = 1; i <= lastDay; i++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dateDiv = document.createElement('div');
      dateDiv.textContent = i;
      dateDiv.dataset.date = fullDate;

      if (eventList[fullDate]) {
        dateDiv.style.backgroundColor = '#ffeb3b';
      }

      dateDiv.addEventListener('click', () => showEvents(fullDate));
      calendarDates.appendChild(dateDiv);
    }
  }

  function showEvents(date) {
    const events = eventList[date] || [];
    eventContainer.innerHTML = events.length
      ? events.map(event => `<div class="event"><strong>${event.title}</strong><br>${event.time}</div>`).join('')
      : 'No events for this date.';
  }

  document.getElementById('prevMonth').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();