const API_URL = 'https://whereis.workers.dev';

class WhereIs {
  constructor() {
    this.initMap();
    this.bindEvents();
  }

  initMap() {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  bindEvents() {
    document.getElementById('searchButton').addEventListener('click', this.searchLocation.bind(this));
  }

  async searchLocation() {
    const location = document.getElementById('locationSearch').value;
    
    try {
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        body: JSON.stringify({ location, radius: 10 })
      });

      const data = await response.json();
      this.displayResults(data);
    } catch (error) {
      console.error('Search failed', error);
    }
  }

  displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = data.locations.map(location => `
      <div class="location">
        <h3>${location.name}</h3>
        <p>${location.description}</p>
        <button onclick="viewDetails(${location.id})">View Details</button>
      </div>
    `).join('');

    // Plot markers on map
    data.locations.forEach(location => {
      L.marker([location.lat, location.lon])
        .addTo(this.map)
        .bindPopup(location.name);
    });
  }
}

new WhereIs();
