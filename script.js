// Leaflet.js initialization for the map
const map = L.map('map').setView([40.7128, -74.0060], 13); // Example coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers dynamically based on available slots
// For now, using static markers as placeholders

L.marker([40.7128, -74.0060]).addTo(map).bindPopup('Available in 1 hour');
L.marker([40.715, -74.010]).addTo(map).bindPopup('Available in 15 minutes');
