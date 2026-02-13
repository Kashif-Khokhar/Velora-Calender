let date = new Date();
const monthDisplay = document.getElementById('monthDisplay');
const daysContainer = document.getElementById('calendarDays');
const currentSelectedDate = document.getElementById('currentSelectedDate');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderCalendar() {
    date.setDate(1);
    const firstDayIndex = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    monthDisplay.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    let days = "";

    // Empty spaces for previous month days
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="day empty"></div>`;
    }

    // Actual days of the month
    for (let i = 1; i <= lastDay; i++) {
        const isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? "today" : "";
        days += `<div class="day ${isToday}" onclick="selectDate(${i})">${i}</div>`;
    }

    daysContainer.innerHTML = days;
}

function prevMonth() { date.setMonth(date.getMonth() - 1); renderCalendar(); }
function nextMonth() { date.setMonth(date.getMonth() + 1); renderCalendar(); }
function goToday() { date = new Date(); renderCalendar(); }

function jumpToYear() {
    const year = document.getElementById('yearInput').value;
    if(year) {
        date.setFullYear(parseInt(year));
        renderCalendar();
    }
}

function selectDate(day) {
    currentSelectedDate.innerText = `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

renderCalendar();