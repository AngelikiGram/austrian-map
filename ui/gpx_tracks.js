// Initialization function
function initializeGPXFileInput() {
    const gpxFileInput = document.getElementById('gpxFileInput');
    if (!gpxFileInput) {
        console.error("gpxFileInput is not defined or not selected correctly.");
        return;
    }
    gpxFileInput.addEventListener('change', handleGPXFile);

    const fileInputLabel = document.getElementById('fileInputLabel');
    fileInputLabel.addEventListener('click', () => gpxFileInput.click());
    fileInputLabel.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            gpxFileInput.click();
        }
    });
}

// Function to handle GPX file input
function handleGPXFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => processGPXData(event.target.result);
    reader.readAsText(file);
}

// Function to process GPX data
function processGPXData(gpxContent) {
    const gpxData = new DOMParser().parseFromString(gpxContent, 'application/xml');
    const geojson = toGeoJSON.gpx(gpxData); // Ensure toGeoJSON.gpx() is available
    const featureCollection = convertToFeatureCollection(geojson);
    displayFeatureCollection(featureCollection);
    focusOnStartingCoordinate(geojson);
}

// Function to display feature collection
function displayFeatureCollection(featureCollection) {
    const featuresCollectionStr = JSON.stringify(featureCollection);
    console.log(featuresCollectionStr); // Log the feature collection
    Procedural.addOverlay(JSON.parse(featuresCollectionStr)); // Assuming Procedural.addOverlay is ready
}

// Function to focus on the starting coordinate of the route
function focusOnStartingCoordinate(geojson) {
    if (geojson.features.length > 0 && geojson.features[0].geometry.coordinates.length > 0) {
        const startingCoordinate = geojson.features[0].geometry.coordinates[0];
        console.log('startingCoordinate', startingCoordinate);
        Procedural.displayLocation({
            latitude: startingCoordinate[1],
            longitude: startingCoordinate[0]
        });
    }
}

// Function to convert GeoJSON to a feature collection
function convertToFeatureCollection(geojson) {
    let idCounter = 0;
    const features = geojson.features.map(feature => ({
        'id': idCounter++,
        'type': 'Feature',
        'geometry': feature.geometry,
        'properties': {
            'color': '#f30e32' // Example property, adjust as needed
        }
    }));

    return {
        'name': 'example',
        'type': 'FeatureCollection',
        'features': features
    };
}

initializeGPXFileInput();