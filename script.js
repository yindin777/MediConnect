// Initialize the map (OpenStreetMap using Leaflet)
const map = L.map('map').setView([51.505, -0.09], 13); // Default center: London

// Set up OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Example: Add a marker for a healthcare professional
const marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup('<b>Healthcare Professional</b><br>Location Info').openPopup();

// You can replace the marker with dynamic data from your API
// Example: Fetch healthcare professional data and add markers dynamically
fetch('/api/healthcare-professionals')
    .then(response => response.json())
    .then(data => {
        data.forEach(professional => {
            L.marker([professional.latitude, professional.longitude])
                .addTo(map)
                .bindPopup(`<b>${professional.name}</b><br>${professional.specialty}`);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
