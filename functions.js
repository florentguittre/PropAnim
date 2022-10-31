// ROUND A NUMBER TO N DECIMALS

function round(number, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen
}

// CONVERT yyyy/MM/dd to unixtime (in ms or s)

function date2unix(date, returnsInMs) {
  let o = Date.parse(date, 'yyyy/MM/dd');
  if (!returnsInMs)
    o /= 1000;
  return o;
}

// CONVERT yyyy/MM/dd TO dd/MM/yyyy

function transformDate(date) {
  return new Date(date2unix(date, true)).toLocaleDateString("fr-FR");
}

// WAIT N MILLISECONDS

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CONVERT NUMBER TO COLOR

function colorDep(regionSelec, tauxIncidence) {
  let o;
  if (tauxIncidence === -1) {
    o = "#FAFAFA"; // broken white
  } else if (tauxIncidence >= 0 && tauxIncidence <= 50) {
    o = "#ACD1AF"; // green
  } else if (tauxIncidence > 50 && tauxIncidence < 100) {
    o = "#EEEE9B"; // yellow
  } else if (tauxIncidence >= 100 && tauxIncidence < 200) {
    o = "#F5CA7B"; // orange
  } else if (tauxIncidence >= 200 && tauxIncidence < 500) {
    o = "#F47174"; // red
  } else if (tauxIncidence >= 500 && tauxIncidence < 1000) {
    o = "#8B0000"; // dark red
  } else if (tauxIncidence >= 1000 && tauxIncidence < 2000) {
    o = "#AF8FE9"; // purple
  } else if (tauxIncidence >= 2000 && tauxIncidence < 3000) {
    o = "#3F0F4E"; // dark pink
  } else if (tauxIncidence >= 3000 && tauxIncidence < 4000) {
    o = "#AAAAAA"; // grey
  } else if (tauxIncidence >= 4000) {
    o = "#000000" // black
  }
  regionSelec.style = `fill: ${o};`;
}

// FIXING A BUG THAT HAPPENS SOMETIMES

function fixBugEncoding(name) {
  return name.replace("Ã¨", "è").replace("Ã´", "ô").replace("Ã©", "é")
    .replace("Ã©e", "ée");
}

//                       //
//  PROCESSING FUNCTIONS //
// ===================== //
//     MAIN FUNCTIONS    //
//                       //

// SETTING MIN AND MAX VALUES

function settingUpValues() {
  fetch('PropAnimDataGatherer/txIncidData.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const dataArray = Object.keys(data);
      const firstDay = dataArray[0];
      const lastDay = dataArray.pop();
      dpStart.min = firstDay;
      dpStart.max = lastDay;
      dpEnd.min = firstDay;
      dpEnd.max = lastDay;
    });
}

// DISPLAYING THE LAST REGISTERED DAY

function displayLastDayFranceMap() {
  fetch('PropAnimDataGatherer/txIncidData.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let firstDay = Object.keys(data)[0];
      let lastDay = Object.keys(data).pop();
      let depName;
      let depTxIncid;
      refreshedDate.innerHTML =
        `Première donnée : ${transformDate(firstDay)} <br>
      Dernière donnée : ${transformDate(lastDay)}`;
      data[lastDay].forEach(dep => {
        depName = dep["lib_dep"];
        depName = fixBugEncoding(depName);
        depTxIncid = dep["tx_incid"];
        regionSelec = document.getElementById(depName);
        if (regionSelec === null)
          console.log(`null: ${depName}`);
        else
          colorDep(regionSelec, depTxIncid);
      });
    });
}

// REPLACING DATA IF OUT OF BOUNDARIES

function setValuesLimits() {
  fetch('PropAnimDataGatherer/txIncidData.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let firstDay = Object.keys(data)[0];
      let lastDay = Object.keys(data).pop();
      dpStartValue = dpStart.value;
      dpEndValue = dpEnd.value;
      dpSpeedValue = dpSpeed.value;
      const unixStart = date2unix(dpStartValue, false); // first given date
      const unixEnd = date2unix(dpEndValue, false); // second given date
      const unixFirst = date2unix(firstDay, false); // first registered date
      const unixLast = date2unix(lastDay, false); // last registered date
      // given dates between start and end
      if (unixStart > unixEnd) {
        alert("La date du début se situe après la date de fin. Veuillez changer les dates données.");
        window.location.href = "https://homeprojects.flguitt.com/propanim/";
      }
      // given dates between registered start and registered end
      if (unixStart < unixFirst)
        dpStart.value = firstDay;
      else if (unixStart > unixLast)
        dpStart.value = lastDay;
      else if (unixEnd < unixFirst)
        dpEnd.value = firstDay;
      else if (unixEnd > unixLast)
        dpEnd.value = lastDay;
      // speed
      if (dpSpeedValue < 1)
        dpSpeedValue = 1;
      else if (dpSpeedValue > 8)
        dpSpeedValue = 8;
      dpSpeed.value = dpSpeedValue;
  });
}

// DISPLAYING ANIMATION BETWEEN 2 GIVEN DATES

async function displayFranceMapAnimation(startDate, endDate, speed, isLoop) {
  fetch('PropAnimDataGatherer/txIncidData.json')
    .then(function (response) {
      return response.json();
    })
    .then(async function (data) {
      let dataArray = Object.keys(data);
      let indexStart = dataArray.indexOf(startDate);
      let indexEnd = dataArray.indexOf(endDate) + 1;
      if (dpStartValue === "")
        indexStart = 0;
      if (dpEndValue === "")
        indexEnd = dataArray.length;
      let selectedArray = dataArray.slice(indexStart, indexEnd);

      let day;
      let depName;
      let depTxIncid;
      while (1) {
        for (let i = 0; i < selectedArray.length; i++) {
          day = selectedArray[i];
          currentDisplayedDay.textContent = transformDate(day);
          data[day].forEach(dep => {
            depName = fixBugEncoding(dep["lib_dep"]);
            depTxIncid = dep["tx_incid"];
            regionSelec = document.getElementById(depName);
            if (regionSelec === null)
              console.log(`null: ${depName}`);
            else
              colorDep(regionSelec, depTxIncid);
          });
          await sleep(1000 / speed);
        }
        if (!isLoop)
          break;
      }
    });
}