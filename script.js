const API_URL = "https://your-api-endpoint.com";  // Set the URL of your API endpoint (Whereis Worker API)

// Handle form submission and data interaction with the D1 database
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Serve the front-end assets
  if (url.pathname === "/") {
    return await serveStaticHTML();
  }

  // Handle API endpoint for available slots
  if (url.pathname === "/getAvailableSlots") {
    return await getAvailableSlots();
  }

  // Handle API for booking appointment
  if (url.pathname === "/bookAppointment") {
    return await bookAppointment(request);
  }

  return new Response("Not Found", { status: 404 });
}

async function serveStaticHTML() {
  const html = await fetch("https://raw.githubusercontent.com/yindin777/Whereis/main/index.html");
  const htmlText = await html.text();
  return new Response(htmlText, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

async function getAvailableSlots() {
  const slots = await fetchSlotsFromD1Database();
  return new Response(JSON.stringify(slots), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function fetchSlotsFromD1Database() {
  // Connect to D1 database and get available slots (example code, adjust according to your D1 schema)
  const result = await fetch(API_URL + "/slots");  // Example endpoint
  const slots = await result.json();
  return slots;
}

async function bookAppointment(request) {
  const requestBody = await request.json();
  const { name, appointmentDate } = requestBody;

  // Save appointment data to the D1 database
  const result = await fetch(API_URL + "/book", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, appointmentDate })
  });

  const response = await result.json();
  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' }
  });
}
