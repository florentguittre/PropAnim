// ROUND A NUMBER TO N DECIMALS

function round(number, decimalPlaces) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen
}

// SUBSTRACT N DAYS TO A GIVEN DAY

function getRightDate(daysToRemove, locale) {
  let output;
  let date = new Date();
  date.setDate(date.getDate() - daysToRemove);
  switch(locale) {
    case "fr-FR":
      output = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
      break;
    case "2":
      output = date.toISOString().split('T')[0]
      break;
  }
  return output;
}

// CONVERT yyyy/MM/dd TO dd/MM/yyyy

function transformDate(date) {
    const unixDate = Date.parse(date, 'yyyy/MM/dd');
    return new Date(unixDate).toLocaleDateString("fr-FR");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function colorDep(regionSelec, tauxIncidence) {
  if (tauxIncidence === -1) {
    regionSelec.style = "fill: #FAFAFA;";
  } else if (tauxIncidence >= 0 && tauxIncidence <= 50) {
    regionSelec.style = "fill: #ACD1AF;"; // green
  } else if (tauxIncidence > 50 && tauxIncidence < 100) {
    regionSelec.style = "fill: #EEEE9B;"; // yellow
  } else if (tauxIncidence >= 100 && tauxIncidence < 200) {
    regionSelec.style = "fill: #F5CA7B;"; // orange
  } else if (tauxIncidence >= 200 && tauxIncidence < 500) {
    regionSelec.style = "fill: #F47174;"; // red
  } else if (tauxIncidence >= 500 && tauxIncidence < 1000) {
    regionSelec.style = "fill: #8B0000"; // dark red
  } else if (tauxIncidence >= 1000 && tauxIncidence < 2000) {
    regionSelec.style = "fill: #AF8FE9;"; // purple
  } else if (tauxIncidence >= 2000 && tauxIncidence < 3000) {
    regionSelec.style = "fill: #3F0F4E;" // dark pink
  } else if (tauxIncidence >= 3000 && tauxIncidence < 4000) {
    regionSelec.style = "fill: #AAAAAA;" // grey
  } else if (tauxIncidence >= 4000) {
    regionSelec.style = "fill: #000000;" // black
  }
}

function fixBugEncoding(name) {
  let newName = name.replace("Ã¨", "è").replace("Ã´", "ô").replace("Ã©", "é")
  .replace("Ã©e", "ée");
  return newName;
}

//                       //
//  PROCESSING FUNCTIONS //
// ===================== //
//     MAIN FUNCTIONS    //
//                       //

// SETTING MIN AND MAX VALUES

function settingUpValues() {
  fetch('/EpidAnimDataGatherer/txIncidData.json')
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

function displayLastDayFranceMap() {
  fetch('/EpidAnimDataGatherer/txIncidData.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lastDay = Object.keys(data).pop();
      let depName;
      let depTxIncid;
      refreshedDate.textContent = `Dernière actualisation : ${transformDate(lastDay)}`;
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

async function displayFranceMapAnimation(startDate, endDate) {
  fetch('/EpidAnimDataGatherer/txIncidData.json')
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
    for (let i = 0 ; i < selectedArray.length ; i++) {
      day = selectedArray[i];
      currentDisplayedDay.textContent = transformDate(day);
      data[day].forEach(dep => {
        depName = dep["lib_dep"];
        depTxIncid = dep["tx_incid"];
        depName = fixBugEncoding(depName);
        regionSelec = document.getElementById(depName);
        if (regionSelec === null)
          console.log(`null: ${depName}`);
        else
          colorDep(regionSelec, depTxIncid);
      });
      await sleep(1000/8);
    }
  });
}