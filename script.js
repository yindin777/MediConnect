import { serve } from '@cloudflare/workers-toolkit';

// Initialize the D1 database connection (make sure D1 is connected in your environment)
const d1 = D1Database; // This assumes D1 database is already configured in your worker

// Function to fetch available slots from D1 database based on a given date
const getAvailableSlots = async (date) => {
    const query = `SELECT * FROM slots WHERE date = ?`; // Query for slots on the given date
    const result = await d1.prepare(query).bind(date).all();  // Execute query and fetch rows
    return result.rows;  // Return rows (slots) for the specified date
};

// Worker to handle incoming requests and respond with available slots
serve(async (req) => {
    // Only handle GET requests
    if (req.method === 'GET') {
        const url = new URL(req.url); // Get the request URL
        const date = url.searchParams.get('date'); // Extract 'date' query parameter

        // If 'date' is provided, fetch and return available slots
        if (date) {
            const slots = await getAvailableSlots(date);
            return new Response(JSON.stringify(slots), {
                headers: { 'Content-Type': 'application/json' }, // Return response as JSON
            });
        }

        // If 'date' is not provided, respond with an error message
        return new Response('Please provide a date in the query parameters', { status: 400 });
    }

    // Handle unsupported methods (only GET is allowed)
    return new Response('Method Not Allowed', { status: 405 });
});
