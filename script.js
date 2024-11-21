function initMap() {
    // Initialize map code here
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

// Create a new Web Worker
const worker = new Worker('worker.js');

// Main script code
worker.postMessage('Start background tasks');

worker.onmessage = function(event) {
    console.log('Worker response:', event.data);
};
