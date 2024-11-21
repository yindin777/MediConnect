// Initialize OpenStreetMap
let map = L.map('map').setView([51.505, -0.09], 13);  // Default coordinates (London)

// Set up OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example function to fetch available slots (replace with your API)
const fetchAvailableSlots = async (date) => {
    const response = await fetch(`https://whereisd.yindin777.workers.dev/slots?date=${date}`);
    const slots = await response.json();
    displaySlotsOnMap(slots);
};

// Function to display slots on the map
const displaySlotsOnMap = (slots) => {
    slots.forEach(slot => {
        const { latitude, longitude, professionalName } = slot;  // Example slot data
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>${professionalName}</b><br>Available Slot`);
    });
};

// Call this function when a date is selected (for now, using today's date for demo)
const today = new Date().toISOString().split('T')[0];
fetchAvailableSlots(today);

// Healthcare Professionals List
const populateHealthcareProfiles = () => {
    const profilesList = document.getElementById('professional-list');
    const professionals = [
        { name: 'Dr. John Doe', specialty: 'Dentist', location: 'New York' },
        { name: 'Dr. Jane Smith', specialty: 'Chiropractor', location: 'Los Angeles' }
    ];

    professionals.forEach(prof => {
        const li = document.createElement('li');
        li.textContent = `${prof.name} - ${prof.specialty} (${prof.location})`;
        profilesList.appendChild(li);
    });
};

populateHealthcareProfiles();
