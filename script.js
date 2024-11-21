// Professional data
const professionals = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Dentist",
        rating: 4.7,
        distance: "2.3 miles",
        location: {
            lat: 40.7128,
            lng: -74.0060
        }
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cardiologist",
        rating: 4.5,
        distance: "3.7 miles",
        location: {
            lat: 40.7282,
            lng: -73.7949
        }
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        rating: 4.9,
        distance: "1.5 miles",
        location: {
            lat: 40.7312,
            lng: -74.0030
        }
    }
];

// Render nearest professional
function renderNearestProfessional() {
    const nearestProfessional = professionals[0]; // Assuming the first one is the nearest
    const detailsContainer = document.getElementById('nearest-professional-details');
    detailsContainer.innerHTML = `
        <h3 class="font-bold">${nearestProfessional.name}</h3>
        <p class="text-gray-600">${nearestProfessional.specialty}</p>
        <div class="mt-2">
            <strong>Rating:</strong> ★ ${nearestProfessional.rating}<br>
            <strong>Distance:</strong> ${nearestProfessional.distance}
        </div>
    `;
}

// Render professionals list
function renderProfessionalsList(professionalsToRender = professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = professionalsToRender.map(pro => `
        <div class="professional-card p-3 border-b hover:bg-blue-50 cursor-pointer" 
             data-id="${pro.id}">
            <h3 class="font-bold">${pro.name}</h3>
            <p class="text-gray-600">${pro.specialty}</p>
            <div class="flex justify-between">
                <span>★ ${pro.rating}</span>
                <span>${pro.distance}</span>
            </div>
        </div>
    `).join('');

    // Add click event to show details on map
    document.querySelectorAll('.professional-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const professional = professionals.find(p => p.id === parseInt(id));
            updateMap(professional);
        });
    });
}

// Initialize OpenStreetMap
function initMap() {
    const map = L.map('map-container').setView([40.7128, -74.0060], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for all professionals
    professionals.forEach(pro => {
        L.marker([pro.location.lat, pro.location.lng])
            .addTo(map)
            .bindPopup(`
                <b>${pro.name}</b><br>
                ${pro.specialty}<br>
                Rating: ★ ${pro.rating}<br>
                Distance: ${pro.distance}
            `);
    });

    return map;
}

// Update map to focus on selected professional
function updateMap(professional) {
    const map = document.getElementById('map-container')._leaflet_map;
    
    // Center map on professional's location
    map.setView([professional.location.lat, professional.location.lng], 14);

    // Clear existing markers and add new marker
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add marker for selected professional
    L.marker([professional.location.lat, professional.location.lng])
        .addTo(map)
        .bindPopup(`
            <b>${professional.name}</b><br>
            ${professional.specialty}<br>
            Rating: ★ ${professional.rating}<br>
            Distance: ${professional.distance}
        `)
        .openPopup();
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProfessionals = professionals.filter(pro => 
            pro.name.toLowerCase().includes(searchTerm) || 
            pro.specialty.toLowerCase().includes(searchTerm)
        );

        renderProfessionalsList(filteredProfessionals);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderNearestProfessional();
    renderProfessionalsList();
    const map = initMap();
    initSearch();

    // Attach map to container for later reference
    document.getElementById('map-container')._leaflet_map = map;
});
