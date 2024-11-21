function initMap() {
    // Create the map
    var map = L.map('map').setView([40.72, -74.01], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define healthcare professionals
    var professionals = [
        { name: 'Dr. John Doe', location: { lat: 40.72, lng: -74.01 }, available: true },
        { name: 'Nurse Jane Smith', location: { lat: 40.73, lng: -74.02 }, available: true },
        { name: 'Dr. Emily Johnson', location: { lat: 40.74, lng: -74.03 }, available: false },
    ];

    // Define custom icons
    var greenIcon = L.icon({
        iconUrl: 'green-dot.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });

    var redIcon = L.icon({
        iconUrl: 'red-dot.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });

    // Add markers to the map
    professionals.forEach(function(professional) {
        var icon = professional.available ? greenIcon : redIcon;
        L.marker([professional.location.lat, professional.location.lng], { icon: icon })
            .bindPopup(professional.name + (professional.available ? ' - Available' : ' - Not Available'))
            .addTo(map);
    });
}

// Initialize the map when the window loads
window.onload = initMap;
