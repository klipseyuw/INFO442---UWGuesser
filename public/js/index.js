let panorama;

// Format: Street View coords, marker to guess coords
const buildings = 
[[{lat: 47.6557022, lng: -122.3045488}, {name: "HUB", lat: 47.6553893, lng: -122.3050845}], 
[{lat: 47.6561734, lng: -122.3093858}, {name: "Kane Hall", lat: 47.6567387, lng: -122.3092925}], 
[{lat: 47.6559409, lng: -122.3075026}, {name: "Suzzalo Library", lat: 47.6557702, lng: -122.3078427}]]

function initMap() {
    const max = buildings.length;
    const rand = Math.floor(Math.random() * max);
    const astorPlace = buildings[rand][0];
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
    const cafeMarker = new google.maps.Marker({
        position: buildings[rand][1],
        map,
        title: "BuildingToGuess",
        icon: cafeIcon.src,
        gmpClickable: true
    });


    cafeMarker.addListener("click", initMap);

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

function test() {
    console.log("Clicked");
}

window.initMap = initMap;