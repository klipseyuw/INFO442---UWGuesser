// SET THE TIME LIMIT OF YOUR CHOICE HERE IN SECONDS!
const timeLimit = 90;

/* 

HOW TO ADD NEW BUILDINGS INSTRUCTIONS

Format for each entry:
lat => latitude
lng => longitude
name => name used to identify building


The first entry is the location that you want the street view
To find the lat and lng, go to a google street view and in the URL, there will be 2 numbers similar to the ones provided already.

Example: 
https://www.google.com/maps/place/PACCAR+Hall/@47.6593012,-122.3093962,3a,75y,86.88h,90t/data=!3m7!1e1!3m5!1s33FYJYy7z5ddYEY5Jowc3w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D33FYJYy7z5ddYEY5Jowc3w%26yaw%3D86.88373312129333!7i16384!8i8192!4m6!3m5!1s0x5490148c7ff84a3f:0x8a58dcfd31224abd!8m2!3d47.6593782!4d-122.3090131!16s%2Fg%2F1hd_rw217?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D

The coordinates you would need are lat: 47.6593012, lng: -122.3093962 from above ^

The second entry is the location of the building itself. 
Instead of being in street view, find the building of your choice in google maps and zoom in on it so it is centered. Then, similarly to above, copy and paste the coordinates.

In this format, add it to the list below:
[{lat:, lng:}, {name:, lat:, lng:}]

Reopen or refresh your game to apply the changes.
*/
const buildings = 
[[{lat: 47.6557022, lng: -122.3045488}, {name: "HUB", lat: 47.6553893, lng: -122.3050845}],
[{lat: 47.6561734, lng: -122.3093858}, {name: "Kane Hall", lat: 47.6567387, lng: -122.3092925}], 
[{lat: 47.6559409, lng: -122.3075026}, {name: "Suzzalo Library", lat: 47.6557702, lng: -122.3078427}],
[{lat: 47.6570572, lng: -122.3081083}, {name: "Savery Hall", lat: 47.6571049, lng: -122.3084395}]];

const mainHTML = '<section id="start-screen" class="screen start-screen"><div class="overlay"><div class="start-logo-box"><img src="assets/washington_huskies_2016-pres.webp" alt="UW Logo" class="uw-logo" /><h1 class="title">Guessr</h1></div><button id="start-btn" class="start-button" onclick="switchToRulePage()">Get started</button></div></section>';

const ruleHTML = '<section id="rules-screen" class="screen rules-screen hidden"> <div class="rules-header"> <div class="playbook-label">Purple & Gold Playbook</div> <div class="logo-box"> <img src="assets/washington_huskies_2016-pres.webp" alt="UW Logo" class="uw-logo-small" /> <h1 class="title small">Guessr</h1> </div> </div> <div class="rules-box"> <ol> <li> <strong>Guess the Building</strong><br /> <span>Explore the scene and try to identify the building shown. Use the keyboard arrows to move around and investigate your surroundings.</span> </li> <li> <strong>Bonus Challenge: Find the Dubs</strong><br /> <span>Look closely! Hidden Dubs (UW mascots) are scattered around the building. Count how many you can find for bonus points.</span> </li> <li> <strong>Need Help?!</strong><br /> <span>You get one hint per round — use it wisely!</span> </li> </ol> </div> <button id="continue-btn" class="continue-btn" onclick="switchToMapPageReset()">Continue to First Round</button> </section>';

const mapHTML = '<section id="game-screen" class="screen game-screen hidden"><div class="game-ui-top-left"><div id="countdown" class="timer">⏱ 00:45</div></div><div class="game-input-controls"><h3 id="header">Type your Guess</h3><input type="text" id="answerText" placeholder="Answer Here" class="answer-input" /></div><div class="game-submit-footer"><button onclick="submitAnswer()">Submit</button><p id="dubsScore">Dubs Score: 0</p></div><div id="map"></div></section>';

const hintHTML = '<section id="hint-screen" class="screen hint-screen hidden"> <div class="game-ui-top-left"> <div id = "countdown" class="timer">⏱ 0:45</div> </div> <div class="hint-options-box"> <form id="building-guess-form"> <label class="hint-option"> <input type="radio" name="building" value="mueller" /> Mueller Hall </label> <label class="hint-option"> <input type="radio" name="building" value="ece" /> ECE </label> <label class="hint-option"> <input type="radio" name="building" value="sav" /> SAV </label> <label class="hint-option"> <input type="radio" name="building" value="paul-allen" /> Paul Allen </label> <button type="submit" class="submit-btn">Submit</button> </form> </div> <div class="arrows"> <span class="arrow">&lt;</span> <span class="arrow">&gt;</span> </div> </section>';

const quizHTML = '<section id="dubs-quiz" class="screen dubs-quiz hidden"> <div class="quiz-box"> <h2>How many Dubs did you see?</h2> <p class="quiz-subtext">(Answer correctly to receive extra points!)</p> <form id="dubs-form"> <label class="quiz-option"> <input type="radio" name="dubs" value="1" /> 1 </label> <label class="quiz-option"> <input type="radio" name="dubs" value="3" /> 3 </label> <label class="quiz-option"> <input type="radio" name="dubs" value="5" /> 5 </label> </form> </div> </section> ';

const correctHTML = '<section id="correct-screen" class="screen correct-screen hidden"> <div class="correct-box"> <div class="score-badge">Dubs score: <span id="score-count"></span> identified!</div> <h3 id = "round-info" class="round-info">Round 1 out of 5</h3> <h1 class="correct-title">Correct!</h1> <div class="emoji">🔥</div> <p class="streak-text">you\'re on a streak!</p> <button id="next-round-btn" class="next-btn" onclick="switchToMapPage()">Next Round</button> </div> </section> ';

const wrongHTML = '<section id="wrong-screen" class="screen wrong-screen hidden"> <div class="wrong-box"> <div class="score-badge">Dubs score: <span id="wrong-score-count"></span> identified!</div> <h3 id = "round-info" class="round-info">Round 1 out of 5</h3> <h1 id="wrong-title" class="wrong-title">Wrong</h1> <div class="emoji">🚨</div> <p class="wrong-text">Even dubs gets turned around<br />sometimes!</p> <button id="retry-btn" class="primary-btn" onclick="switchToMapPageReset()">Play again</button> <button id="later-btn" class="secondary-btn" onclick="switchToMainPage()">Play later</button> </div> </section> ';

const endHTML = '<section id="end-screen" class="screen end-screen hidden"> <div class="end-logo-box"> <img src="assets/washington_huskies_2016-pres.webp" alt="UW Logo" class="uw-logo-small" /> <h1 class="title small">Guessr</h1> </div> <div class="end-box"> <h1 class="end-title">Congrats!</h1> <p class="end-subtitle">You made it to the end!</p> <div class="score-box"> <p class="score-label">Dubs score:</p> <p class="score-value"><span id="final-score">4/10</span> identified!</p> </div> <button id="play-again-btn" class="primary-btn" onclick="switchToMapPageReset()">Play again</button> <button id="exit-btn" class="secondary-btn" onclick="switchToMainPage()">Play later</button> </div> </section>';

let panorama;
let score;
let currentBuildingIndex;
let dubsMarker;

let seconds = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(function() {
        seconds--;
        let secondsCorrected = seconds % 60;
        let minutesCorrected = Math.floor(seconds / 60);

        if(secondsCorrected < 10)
        {
            secondsCorrected = "0" + secondsCorrected;
        }

        if(minutesCorrected < 10)
        {
            minutesCorrected = "0" + minutesCorrected;
        }

        document.getElementById("countdown").innerHTML = "⏱ " + minutesCorrected + ":" + secondsCorrected;
        if(seconds == 0)
        {
            switchToWrongAnswerPage();
            stopTimer();
        }
        // Update the UI or perform actions with the elapsed time
    }, 1000); // Update every 1000ms (1 second)
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  seconds = timeLimit;
}

let buildingsInstance;

function switchToMainPage()
{
    document.body.innerHTML = mainHTML;
}

function switchToRulePage()
{
    document.body.innerHTML = ruleHTML;
}

function switchToMapPageReset()
{
    reset();
    switchToMapPage();
}

function switchToMapPage()
{
    document.body.innerHTML = mapHTML + initAPI();
    window.initMap = initMap;

    let secondsCorrected = timeLimit % 60;
    let minutesCorrected = Math.floor(timeLimit / 60);

    if(secondsCorrected < 10)
    {
        secondsCorrected = "0" + secondsCorrected;
    }

    if(minutesCorrected < 10)
    {
        minutesCorrected = "0" + minutesCorrected;
    }

    document.getElementById("countdown").innerHTML = "⏱ " + minutesCorrected + ":" + secondsCorrected;
}

// Maybe we don't do hints since moving on the map is technically the hint?
function switchToHintPage()
{
    document.body.innerHTML = hintHTML;
}

function switchToQuizPage()
{
    document.body.innerHTML = quizHTML;
}

function switchToCorrectAnswerPage()
{
    stopTimer();
    document.body.innerHTML = correctHTML;
    document.getElementById('round-info').innerHTML = "Round " + (buildings.length - buildingsInstance.length) + "/" + buildings.length;
    document.getElementById('score-count').innerHTML = score + "/" + buildings.length;
}

function switchToWrongAnswerPage()
{
    stopTimer();
    document.body.innerHTML = wrongHTML;
    document.getElementById('round-info').innerHTML = "Round " + (buildings.length - buildingsInstance.length) + "/" + buildings.length;
    document.getElementById('wrong-score-count').innerHTML = score + "/" + buildings.length;
    document.getElementById('wrong-title').innerHTML = "Wrong! Answer is: " + buildingsInstance[currentBuildingIndex][1].name;
}
function switchToEndPage()
{
    stopTimer()
    document.body.innerHTML = endHTML;
    document.getElementById('final-score').innerHTML = score + "/" + buildings.length;
}

function initAPI()
{
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=marker&v=weekly';
    script.type = 'text/javascript';

    document.body.appendChild(script);
}

function initMap()
{
    setNextMap();
}

function setNextMap() {

    resetTimer();
    startTimer();

    document.getElementById("answerText").value = "";   
    if(buildingsInstance.length == 0)
    {
        switchToEndPage();
        return;
    }

    let max = buildingsInstance.length;
    
    currentBuildingIndex = Math.floor(Math.random() * max);

    let astorPlace = buildingsInstance[currentBuildingIndex][0];
    // Set up the map
    let map = new google.maps.Map(document.getElementById("map"), {
    center: astorPlace,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
    });

    let buildingIcon = document.createElement("img");

    buildingIcon.src = "./images/BuildingToGuess.svg";

    // Set up the markers on the map
    buildingMarker = new google.maps.Marker({
        position: buildingsInstance[currentBuildingIndex][1],
        map,
        title: "BuildingToGuess",
        icon: buildingIcon.src,
        gmpClickable: false,
    });

    buildingMarker.setMap(map);

    let dubsIcon = document.createElement("img");

        dubsIcon.src = "./images/Dubs.svg";

    let dubsRandomizedLoc = [{lat: buildingsInstance[currentBuildingIndex][1].lat + Math.random() * 0.001, lng: buildingsInstance[currentBuildingIndex][1].lng + Math.random() * 0.001}];

    dubsMarker = new google.maps.Marker({
        position: dubsRandomizedLoc[0],
        map,
        title: "DubsIcon",
        icon: dubsIcon.src,
        gmpClickable: true,
    });

    dubsMarker.addListener("click", addToScore);

    dubsMarker.setMap(map);

    // We get the map's default panorama and set up some defaults.
    // Note that we don't yet set it visible.
    panorama = map.getStreetView(); // TODO fix type
    panorama.setPosition(astorPlace);
    panorama.setPov(
    /** @type {google.maps.StreetViewPov} */ {
        heading: 265,
        pitch: 0
    },
    );
    panorama.setOptions(
    {
        enableCloseButton: false,
        disableDefaultUI: true,
    }
    )
    panorama.setVisible(true);
}

function addToScore() {
    score++;
    document.getElementById("dubsScore").innerHTML = "Dubs Score: " + score;
    dubsMarker.setMap(null);
}

function submitAnswer()
{
    var ans = document.getElementById("answerText").value;
    
    if(buildingsInstance[currentBuildingIndex][1].name.includes(ans) && ans != "")
    {
        removeBuilding(currentBuildingIndex);
        switchToCorrectAnswerPage();
    }
    else
    {
        switchToWrongAnswerPage();
    }
}

function reset()
{
    buildingsInstance = [...buildings];
    score = 0;
}

function removeBuilding(index)
{
    buildingsInstance.splice(index, 1);
}

switchToMainPage();
