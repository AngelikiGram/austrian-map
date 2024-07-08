const YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWdyYW1tYXQiLCJhIjoiY2xoNHNkZ3lkMG9iYTNnbzVhY2F4ZnN1ZCJ9.qPqebUE9RSdLRMU4f0H3zw';

let mapInstance = null;
let currentLatitude = 48.210033; // Default latitude
let currentLongitude = 16.363449; // Default longitude

function initializeMap() {
    const initialMapType = getURLParameter('map') || 'DSM';
    const initialLatitude = parseFloat(getURLParameter('lat'));
    const initialLongitude = parseFloat(getURLParameter('lng'));

    if (!isNaN(initialLatitude) && !isNaN(initialLongitude)) {
        currentLatitude = initialLatitude;
        currentLongitude = initialLongitude;
    }

    const urlFormat = initialMapType === 'DSM' ?
        'https://alpinemaps.cg.tuwien.ac.at/tiles/mapbox_terrain_rgb/{z}/{x}/{y}.png' :
        `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}@2x.pngraw?access_token=${YOUR_MAPBOX_ACCESS_TOKEN}`;

    setMap(urlFormat);
    setupEventListeners();
}

function disposeMap() {
    if (mapInstance) {
        mapInstance.dispose();
        mapInstance = null;
    }
}

function setMap(urlFormat) {
    disposeMap(); // Dispose of the previous map instance

    const container = document.getElementById('map');
    container.innerHTML = ""; // Clear previous map content

    const datasource = createDatasource(urlFormat);
    mapInstance = Procedural.init({ container, datasource });
    configureMapControls();
    Procedural.displayLocation({ latitude: currentLatitude, longitude: currentLongitude });
}

function createDatasource(urlFormat) {
    return {
        elevation: {
            apiKey: 'YOUR_ELEVATION_API_KEY',
            attribution: 'Elevation attribution',
            pixelEncoding: 'terrain-rgb',
            maxZoom: 14,
            urlFormat: urlFormat
        },
        imagery: {
            apiKey: 'YOUR_IMAGERY_API_KEY',
            attribution: 'Imagery attribution',
            maxZoom: 21,
            urlFormat: 'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg'
        }
    };
}

function configureMapControls() {
    Procedural.setCameraModeControlVisible(true);
    Procedural.setCompassVisible(true);
    Procedural.setUserLocationControlVisible(true);
    Procedural.setRotationControlVisible(true);
    Procedural.setZoomControlVisible(true);

    var configuration = {
        minDistance: 10,
        maxDistance: 5000000,
        maxBounds: 7500,
        minPolarAngle: 0.05 * Math.PI,
        maxPolarAngle: 1.0 * Math.PI,
        noPan: false,
        noRotate: false,
        noZoom: false
    };
    Procedural.configureControls(configuration);
}

function updateURLParameter(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.location.href = url.toString();
}

function getURLParameter(param) {
    const url = new URL(window.location);
    return url.searchParams.get(param);
}

function updateURLParameters(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    window.location.href = url.toString();
}

function setupEventListeners() {
    document.getElementById('dsmButton').addEventListener('click', () => {
        updateURLParameters({
            'map': 'DSM',
            'lat': currentLatitude.toString(),
            'lng': currentLongitude.toString()
        });
    });

    document.getElementById('dtmButton').addEventListener('click', () => {
        updateURLParameters({
            'map': 'DTM',
            'lat': currentLatitude.toString(),
            'lng': currentLongitude.toString()
        });
    });
}

initializeMap();