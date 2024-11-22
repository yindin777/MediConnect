import { Ai } from '@cloudflare/ai'
import { AIAssistant, handleAIError } from './ai-helper.js'

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    const aiAssistant = new AIAssistant(ai);
    const db = env.DB;
    const url = new URL(request.url);

    try {
      switch (url.pathname) {
        case '/search':
          return this.handleSearch(request, aiAssistant, db);
        case '/insights':
          return this.handleLocationInsights(request, aiAssistant);
        case '/recommend':
          return this.handleRecommendations(request, aiAssistant);
        default:
          return new Response('WhereIs - Not Found', { status: 404 });
      }
    } catch (error) {
      return Response.json(handleAIError(error), { status: 500 });
    }
  },

  async handleSearch(request, aiAssistant, db) {
    const { location } = await request.json();
    
    // Get location insights
    const insights = await aiAssistant.generateLocationInsights(location);
    
    // Database query
    const locations = await db.prepare(
      'SELECT * FROM locations WHERE city LIKE ? LIMIT 20'
    ).bind(`%${location}%`).all();

    return Response.json({ 
      insights,
      locations: locations.results 
    });
  },

  async handleLocationInsights(request, aiAssistant) {
    const { location } = await request.json();
    
    const insights = await aiAssistant.generateLocationInsights(location);
    const summary = await aiAssistant.summarizeLocation(insights);

    return Response.json({ 
      fullInsights: insights,
      summary 
    });
  },

  async handleRecommendations(request, aiAssistant) {
    const userPreferences = await request.json();
    
    const recommendations = await aiAssistant.generateRecommendations(userPreferences);

    return Response.json({ recommendations });
  }
}
