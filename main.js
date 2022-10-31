// ELEMENTS AND VARIABLES DECLARATIONS

const dpStart = document.querySelector(".dpStart");
const dpEnd = document.querySelector(".dpEnd");
const dpSpeed = document.querySelector(".dpSpeed");
const dpLoop = document.querySelector(".dpLoop");
const refreshedDate = document.querySelector(".refreshedDate");
const currentDisplayedDay = document.querySelector(".currentDisplayedDay");
const playBtn = document.querySelector(".playBtn");
const depMap = document.querySelector(".depMap g path");
const hoveredDep = document.querySelector(".hoveredDep");
let dpStartValue;
let dpEndValue;
let dpSpeedValue;
let dpLoopValue;

settingUpValues();
displayLastDayFranceMap();

// DETECTING IF PLAY BUTTON WAS PRESSED
// IF SO, ANIMATION WILL BEGIN

playBtn.addEventListener("click", function () {
  setValuesLimits(); // fixing if incorrect values
  dpStartValue = dpStart.value;
  dpEndValue = dpEnd.value;
  dpSpeedValue = dpSpeed.value;
  dpLoopValue = dpLoop.checked;
  displayFranceMapAnimation(
    dpStartValue, dpEndValue, dpSpeedValue, dpLoopValue
  );
});

// DISPLAYING DEP NAME WHEN HOVERING IT

