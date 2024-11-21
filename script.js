// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13); // Default view at London (change as needed)

// Set up OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add Geosearch control for searching locations
const geocoder = L.Control.Geocoder.nominatim();
const searchControl = new L.Control.Geocoder({
  geocoder: geocoder
}).addTo(map);

// Handle real-time location search
searchControl.on('markgeocode', (e) => {
  const latLng = e.geocode.center;
  map.setView(latLng, 13); // Zoom in on the search result
  L.marker(latLng).addTo(map).bindPopup('Location found').openPopup();
});

// Function to fetch available slots from Worker API
const getAvailableSlots = async (date) => {
  try {
    const response = await fetch(`https://whereisd.yindin777.workers.dev/available-slots?date=${date}`);
    const slots = await response.json();
    updateMapWithSlots(slots);  // Function to display available slots as markers on the map
  } catch (error) {
    console.error('Error fetching slots:', error);
  }
};

// Function to update the map with slot markers
const updateMapWithSlots = (slots) => {
  slots.forEach((slot) => {
    const { lat, lon, description } = slot;
    L.marker([lat, lon]).addTo(map).bindPopup(description);
  });
};

// Example: Call the function to fetch slots for a specific date (this could be dynamic)
getAvailableSlots('2024-11-20');
