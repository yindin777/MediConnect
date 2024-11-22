import { Ai } from '@cloudflare/ai'

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    const db = env.DB;
    const url = new URL(request.url);

    switch (url.pathname) {
      case '/search':
        return this.handleSearch(request, ai, db);
      case '/details':
        return this.handleDetails(request, db);
      default:
        return new Response('WhereIs - Not Found', { status: 404 });
    }
  },

  async handleSearch(request, ai, db) {
    const { location, radius } = await request.json();
    
    // AI-powered location recommendation
    const aiResponse = await ai.run(
      '@cf/meta/llama-2-7b-chat-int8',
      { 
        messages: [
          { role: 'system', content: 'Find interesting locations' },
          { role: 'user', content: `Suggest interesting places near ${location}` }
        ]
      }
    );

    // Database query
    const locations = await db.prepare(
      'SELECT * FROM locations WHERE city LIKE ? LIMIT 20'
    ).bind(`%${location}%`).all();

    return Response.json({ 
      aiRecommendations: aiResponse,
      locations: locations.results 
    });
  },

  async handleDetails(request, db) {
    const { locationId } = await request.json();
    
    const location = await db.prepare(
      'SELECT * FROM locations WHERE id = ?'
    ).bind(locationId).first();

    return Response.json({ location });
  }
}
