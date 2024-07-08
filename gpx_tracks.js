// Assuming gpxFileInput is a reference to an <input type="file"> element
if (!gpxFileInput) {
    console.error("gpxFileInput is not defined or not selected correctly.");
} else {
    // Add an event listener to handle file selection
    gpxFileInput.addEventListener('change', function(event) {
        handleGPXFile(event);
    });
}

function handleGPXFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const gpxData = new DOMParser().parseFromString(event.target.result, 'application/xml');
            const geojson = toGeoJSON.gpx(gpxData); // Ensure toGeoJSON.gpx() is available
            let featureCollection = convertToFeatureCollection(geojson);
            let featuresCollection = JSON.stringify(featureCollection);

            console.log(featuresCollection); // Log the feature collection

            // Assuming Procedural.addOverlay is ready and accepts a JSON object
            Procedural.addOverlay(JSON.parse(featuresCollection));

            console.log('startingCoordinate');

            // Focus on the starting coordinate of the route
            if (geojson.features.length > 0 && geojson.features[0].geometry.coordinates.length > 0) {
                const startingCoordinate = geojson.features[0].geometry.coordinates[0];
                console.log('startingCoordinate', startingCoordinate);
                Procedural.displayLocation({
                    latitude: startingCoordinate[1],
                    longitude: startingCoordinate[0]
                });
            }
        };
        reader.readAsText(file);
    }
}

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

/* Add an event listener to simulate a click on the actual file input when the label is clicked or focused and Enter/Space key is pressed */
document.getElementById('fileInputLabel').addEventListener('click', function() {
    document.getElementById('gpxFileInput').click();
});

document.getElementById('fileInputLabel').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        document.getElementById('gpxFileInput').click();
    }
});