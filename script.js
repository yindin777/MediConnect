// Initialize map
let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fetch services from Cloudflare Worker
async function fetchServices() {
    try {
        const response = await fetch('https://your-worker-url.workers.dev/services');
        const services = await response.json();
        displayServices(services);
        addServiceMarkers(services);
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

// Display services in results section
function displayServices(services) {
    const resultsContainer = document.getElementById('serviceResults');
    resultsContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <button>Book Now</button>
        </div>
    `).join('');
}

// Add markers for services on map
function addServiceMarkers(services) {
    services.forEach(service => {
        L.marker([service.latitude, service.longitude])
            .addTo(map)
            .bindPopup(`
                <b>${service.name}</b><br>
                ${service.description}
            `);
    });
}

// Event Listeners
document.getElementById('servicesBtn').addEventListener('click', fetchServices);

// Initial load
fetchServices();
