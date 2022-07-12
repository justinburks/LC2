// document.querySelector('.input-toggler').addEventListener('click', (e) => {
//     document.querySelector('.date').classList.toggle('b5');
//     document.querySelector('.date').classList.toggle('active');
//     e.currentTarget.classList.toggle('clicked');
    
//     document.getElementById('calendar-2').classList.toggle('show');

// })

let nav = 0;
let clicked = null;
let events;
// const resetButton = document.querySelector('.reset');
// const backButton = document.querySelector('.btn__calendar-back');
// const nextButton = document.querySelector('.btn__calendar-next');
const days = document.querySelector('.daySquares');
const monthDisplay = document.querySelector('.month-display');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() {

    const dt = new Date();
    dt.setDate(1);
    if (nav !== 0) {

        dt.setMonth(dt.getMonth() + nav);
        // dt.setMonth(new Date().getMonth() + nav);
    }


    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    // const dateString = `${month + 1}/${date}/${year}`;

    monthDisplay.innerText = `${dt.toLocaleString('en-us', {
        month: 'long',
    })} ${year}`;

    days.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    console.log(paddingDays);
    console.log(daysInMonth);
    console.log(dateString);

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        let day = document.createElement('div');

        if (i > paddingDays) {
            day.classList.add('day');
            day.innerText = i - paddingDays;
        } else {
            day.classList.add('padding');
        }
        days.appendChild(day);
    }
    
}

// function initButtons() {
//     resetButton.addEventListener('click', () => {
//         nav = 0;
//         load();
//     })
//     nextButton.addEventListener('click', () => {
//         nav++;
//         load();
//     })
//     backButton.addEventListener('click', () => {
//         nav--;
//         load();
//     })
// }

document.querySelector('button').addEventListener('click', () => {
    document.querySelector('.calendar__modal-1').classList.toggle('show');
})
// initButtons();
load();