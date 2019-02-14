let analog = document.getElementsByClassName("analog")[0];
let hourHand = document.getElementById("hour-hand");
let minuteHand = document.getElementById("minute-hand");
let secondHand = document.getElementById("second-hand");

let digital = document.getElementsByClassName("digital")[0];
let time = document.getElementById("time");
let date = document.getElementById("date");

let toggle = document.getElementById("toggle");

analog.addEventListener("click", toggleType);
digital.addEventListener("click", toggleType);

function setTime() {
  let now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let period = hour > 12 ? "PM" : "AM";

  let hourDegrees = hour * 30 + minute * 0.5 + 90;
  let minuteDegrees = minute * 6 + second * 0.1 + 90;
  let secondDegrees = second * 6 + 90;

  fixFlicker(hourHand, hourDegrees);
  fixFlicker(minuteHand, minuteDegrees);
  fixFlicker(secondHand, secondDegrees);

  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;

  let dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    now.getDay()
  ];
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][now.getMonth()];
  let day = now.getDate();
  let year = now.getFullYear();

  // converts from 24 hour clock
  hour = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;

  hour = hour < 10 ? `0${hour}` : `${hour}`;
  minute = minute < 10 ? `0${minute}` : `${minute}`;
  second = second < 10 ? `0${second}` : `${second}`;

  time.innerHTML = `${hour}:${minute}:${second} ${period}`;

  date.innerHTML = `${dayOfWeek} ${month} ${day} ${year}`;

  document.title = time.innerHTML;

  document.body.style.backgroundColor = `hsl(${secondDegrees},50%,50%)`;
  document.body.style.transition = 'all 1s linear';
  
}

function fixFlicker(hand, degrees) {
  if (degrees == 90) {
    hand.style.transition = "all 0.0s";
  }
}

function toggleType() {
  analog.classList.toggle('hidden');
  digital.classList.toggle('hidden');
}

setTime();

setInterval(setTime, 1000);
