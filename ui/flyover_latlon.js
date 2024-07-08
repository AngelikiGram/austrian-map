function initializeLocationDisplay() {
    document.addEventListener('DOMContentLoaded', function() {
        const displayLocationBtn = document.getElementById('displayLocationBtn');
        const latitudeInput = document.getElementById('latitudeInput');
        const longitudeInput = document.getElementById('longitudeInput');

        const displayLocation = () => {
            const latitude = parseFloat(latitudeInput.value);
            const longitude = parseFloat(longitudeInput.value);
            if (!isNaN(latitude) && !isNaN(longitude)) {
                Procedural.displayLocation({ latitude, longitude });
                updateURLParameters({
                    'lat': latitude.toString(),
                    'lng': longitude.toString()
                });
            } else {
                alert('Please enter valid latitude and longitude values.');
            }
        };

        displayLocationBtn.addEventListener('click', displayLocation);

        // Function to handle "Enter" key press in latitude and longitude inputs
        const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
                displayLocation();
            }
        };

        latitudeInput.addEventListener('keypress', handleEnterKeyPress);
        longitudeInput.addEventListener('keypress', handleEnterKeyPress);
    });
}

// Call the function to initialize the location display functionality
initializeLocationDisplay();