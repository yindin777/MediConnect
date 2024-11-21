import { serve } from '@cloudflare/workers-toolkit';

// Example endpoint to fetch available slots from D1 database
const getAvailableSlots = async (date) => {
    const d1 = D1Database; // Use your D1 database connection here
    const query = `SELECT * FROM slots WHERE date = ?`; // Modify query to suit your table structure
    const result = await d1.prepare(query).bind(date).first();
    return result.rows;
};

// Define Worker route to handle request for available slots
serve(async (req) => {
    if (req.method === 'GET') {
        const url = new URL(req.url);
        const date = url.searchParams.get('date'); // Assuming date query param

        // Return available slots as JSON
        if (date) {
            const slots = await getAvailableSlots(date);
            return new Response(JSON.stringify(slots), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response('Please provide a date', { status: 400 });
    }

    return new Response('Method Not Allowed', { status: 405 });
});
