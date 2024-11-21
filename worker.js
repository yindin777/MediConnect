// Initialize Google Map
function initMap() {
    // Set default location (e.g., New York)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12
    });

    // Add markers for healthcare professionals (dummy data)
    const professionals = [
        { name: 'Dr. John Doe', location: { lat: 40.72, lng: -74.01 }, available: true },
        { name: 'Nurse Jane Smith', location: { lat: 40.73, lng: -74.02 }, available: true },
        { name: 'Dr. Emily Johnson', location: { lat: 40.74, lng: -74.03 }, available: false },
    ];

    professionals.forEach(professional => {
        const marker = new google.maps.Marker({
            position: professional.location,
            map: map,
            title: professional.name + (professional.available ? ' - Available' : ' - Not Available'),
            icon: professional.available ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
    });
}

// Fetch available professionals and display them
function fetchProfessionals() {
    // Simulate API call with dummy data
    const professionals = [
        { name: 'Dr. John Doe', specialty: 'General Practitioner', rating: 4.5, available: true },
        { name: 'Nurse Jane Smith', specialty: 'Nurse', rating: 4.8, available: true },
        { name: 'Dr. Emily Johnson', specialty: 'Dermatologist', rating: 4.2, available: false },
    ];

    const professionalList = document.getElementById('professional-list');
    professionalList.innerHTML = '';

    professionals.forEach(professional => {
        if (professional.available) {
            const card = document.createElement('div');
            card.className = 'professional-card';
            card.innerHTML = `
                <img src="images/doctor.png" alt="${professional.name}">
                <h3>${professional.name}</h3>
                <p>${professional.specialty}</p>
                <p>Rating: ${professional.rating}</p>
                <button onclick="bookProfessional('${professional.name}')">Book Now</button>
            `;
            professionalList.appendChild(card);
        }
    });
}

// Book a professional
function bookProfessional(name) {
    alert(`Booking request sent to ${name}!`);
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
    const locationInput = document.getElementById('search-input').value;
    if (locationInput) {
        // Here you would geocode the location input and center the map on the new location
        alert(`Searching for professionals near ${locationInput}...`);
        fetchProfessionals();
    } else {
        alert('Please enter a location.');
    }
});

// Initialize the map and fetch professionals on page load
window.onload = function() {
    fetchProfessionals();
};
