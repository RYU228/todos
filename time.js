const hourSpan = document.querySelector(".hour");
const colonSpan = document.querySelector(".colon");
const minuteSpan = document.querySelector(".minute");

function setTime() {
  const date = new Date();
  let hour = date.getHours();
  const minute = date.getMinutes();

  if (hour > 12) hour = hour - 12;

  hourSpan.innerText = `${hour < 10 ? `0${hour}` : hour}`;
  minuteSpan.innerText = `${minute < 10 ? `0${minute}` : minute}`;

  colonSpan.classList.toggle("notVisible");
}

setInterval(setTime, 1000);
