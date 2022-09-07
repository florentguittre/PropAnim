<!--
API UTILISÉE
https://github.com/florianzemma/CoronavirusAPI-France
-->

<!-- modèle du tableau des couleurs de la carte de France interactive -->
<!--
<div class="txIncidTable">
    <div style="background-color:#fafafa;">?</div>
    <div style="background-color:#ACD1AF;">50</div>
    <div style="background-color:#EEEE9B;">100</div>
    <div style="background-color:#F5CA7B;">200</div>
    <div style="background-color:#F47174;">500</div>
    <div style="background-color:#8B0000;" class="colorWhite">1000</div>
    <div style="background-color:#AF8FE9;">2000</div>
    <div style="background-color:#3F0F4E;" class="colorWhite">3000</div>
    <div style="background-color:#AAAAAA;" class="colorWhite">4000</div>
    <div style="background-color:#000000;" class="colorWhite wp">> 4000</div>
</div>
-->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link type="image/png" href="#" rel="icon">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PropAnim | France</title>
    <link href="/style.css" rel="stylesheet"></link>
    <script src="/functions.js"></script>
    <script src="/main.js" defer></script>
</head>
<body>
<div class="wrapper">
    <h1 class="title">PropAnim</h1>
    <div class="propControls">
        <span class="startDate">
            Date de début
            <input class="dpStart" type="date">
        </span>
        <span class="endDate">
            Date de fin
            <input class="dpEnd" type="date">
        </span>
        <br>
        <span class="playBtn">
                Jouer
        </span>
    </div>
    <div class="fmDesc">
        <p class="refreshedDate"></p>
        <img class="txIncidImg"
        src="/indicateur_taux_incidence_departement.png"
        alt="tableau des couleurs des taux d'incidence">
        <p class="currentDisplayedDay"></p>
    </div>
    <?php require("franceMap.php") ?>
</div>
</body>
</html>
