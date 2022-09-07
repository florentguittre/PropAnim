// elements and variables declarations

const dpStart = document.querySelector(".dpStart");
const dpEnd = document.querySelector(".dpEnd");
const refreshedDate = document.querySelector(".refreshedDate");
const currentDisplayedDay = document.querySelector(".currentDisplayedDay");
const playBtn = document.querySelector(".playBtn");
let dpStartValue;
let dpEndValue;

// setting up and displaying france map

settingUpValues();
displayLastDayFranceMap();

// detecting if play button was pressed,
// if so, animation will start under dates
// precised by user

playBtn.addEventListener("click", function() {
  dpStartValue = dpStart.value;
  dpEndValue = dpEnd.value;
  displayFranceMapAnimation(dpStartValue, dpEndValue);
});