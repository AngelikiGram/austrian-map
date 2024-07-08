const YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWdyYW1tYXQiLCJhIjoiY2xoNHNkZ3lkMG9iYTNnbzVhY2F4ZnN1ZCJ9.qPqebUE9RSdLRMU4f0H3zw';

document.getElementById('dsmButton').addEventListener('click', function() {
    urlFormat = 'http://alpinemaps.cg.tuwien.ac.at/tiles/mapbox_terrain_rgb/{z}/{x}/{y}.png'
    const newLayer = setMap(urlFormat);
});

document.getElementById('dtmButton').addEventListener('click', function() {
    urlFormat = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{zoom}/{y}/{x}@2x.pngraw?access_token=${YOUR_MAPBOX_ACCESS_TOKEN}'
    const newLayer = setMap(urlFormat);
});

function setMap(urlFormat) {
    const container = document.getElementById('map');

    const datasource = {
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

    Procedural.init({ container, datasource });
    Procedural.setCameraModeControlVisible(true);
    Procedural.setCompassVisible(true);
    Procedural.setUserLocationControlVisible(true);
    Procedural.setRotationControlVisible(true);
    Procedural.setZoomControlVisible(true);
    
    // Configure controls
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

    // Set initial location
    const latitude = 48.210033;
    const longitude = 16.363449;
    Procedural.displayLocation({ latitude: parseFloat(getURLParameter('lat')), longitude: parseFloat(getURLParameter('lng')) });
}