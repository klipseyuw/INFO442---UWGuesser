let panorama;
let score;
let currentBuildingIndex;
let clickListener;
let dubsMarker;

// Format: Street View coords, marker to guess coords
const buildings = 
[[{lat: 47.6557022, lng: -122.3045488}, {name: "HUB", lat: 47.6553893, lng: -122.3050845}], 
[{lat: 47.6561734, lng: -122.3093858}, {name: "Kane Hall", lat: 47.6567387, lng: -122.3092925}], 
[{lat: 47.6559409, lng: -122.3075026}, {name: "Suzzalo Library", lat: 47.6557702, lng: -122.3078427}]]

let buildingsInstance;

function initMap()
{
    reset();
    setNextMap();
}

function setNextMap() {
    document.getElementById("answerText").value = "";   
    if(buildingsInstance.length == 0)
    {
        document.getElementById("header").innerHTML = "You Win!";
        return;
    }

    const max = buildingsInstance.length;
    
    currentBuildingIndex = Math.floor(Math.random() * max);

    const astorPlace = buildingsInstance[currentBuildingIndex][0];
    // Set up the map
    const map = new google.maps.Map(document.getElementById("map"), {
    center: astorPlace,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
    });

    const cafeIcon = document.createElement("img");

    cafeIcon.src =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/cafe_icon.svg";

    // Set up the markers on the map
    dubsMarker = new google.maps.Marker({
        position: buildingsInstance[currentBuildingIndex][1],
        map,
        title: "BuildingToGuess",
        icon: cafeIcon.src,
        gmpClickable: true,
    });

    clickListener = dubsMarker.addListener("click", addToScore);

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
    
    if(buildingsInstance[currentBuildingIndex][1].name.includes(ans))
    {
        removeBuilding(currentBuildingIndex);
        setNextMap();
    }
    else
    {
        document.getElementById("answerText").value = "Wrong Answer!";
    }
}

function reset()
{
    buildingsInstance = buildings;
    score = 0;
}

function removeBuilding(index)
{
    buildingsInstance.splice(index, 1);
}

window.initMap = initMap;