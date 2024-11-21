// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize map centered on a default location
    const map = L.map('map').setView([0, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Search button functionality
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('locationSearch');
    const resultsList = document.getElementById('resultsList');

    searchButton.addEventListener('click', () => {
        const location = searchInput.value;
        
        // Use Nominatim for geocoding
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous results
                resultsList.innerHTML = '';

                // Display results in middle section and on the map
                data.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.textContent = result.display_name;
                    resultItem.addEventListener('click', () => {
                        // Center map on selected location
                        map.setView([result.lat, result.lon], 13);
                        
                        // Add a marker
                        L.marker([result.lat, result.lon])
                         .addTo(map)
                         .bindPopup(result.display_name)
                         .openPopup();
                    });
                    resultsList.appendChild(resultItem);
                });
            })
            .catch(error => {
                console.error('Error searching location:', error);
            });
    });
});
