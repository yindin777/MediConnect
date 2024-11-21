export default {
    async fetch(request, env, ctx) {
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };

        // Fetch services from your SQL database
        const services = [
            {
                id: 1,
                name: "Medical Clinic",
                description: "General healthcare services",
                latitude: 51.505,
                longitude: -0.09
            }
            // Add more services from your database
        ];

        return new Response(JSON.stringify(services), { 
            headers: corsHeaders 
        });
    }
}
