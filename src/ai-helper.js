export class AIAssistant {
  constructor(ai) {
    this.ai = ai;
  }

  async generateLocationInsights(location) {
    return this.ai.run(
      '@cf/meta/llama-2-7b-chat-int8', 
      {
        messages: [
          { 
            role: 'system', 
            content: `You are a travel and location insights AI assistant. 
            Provide comprehensive, engaging information about locations.` 
          },
          { 
            role: 'user', 
            content: `Generate detailed insights about ${location}, 
            including:
            - Brief historical background
            - Top 3 must-visit attractions
            - Local culture highlights
            - Unique local experiences
            - Best time to visit
            - Interesting local facts`
          }
        ]
      }
    );
  }

  async translateDescription(text, targetLanguage = 'en') {
    return this.ai.run(
      '@cf/meta/m2m100-1.2b',
      {
        text,
        source_lang: 'auto',
        target_lang: targetLanguage
      }
    );
  }

  async summarizeLocation(longDescription) {
    return this.ai.run(
      '@cf/facebook/bart-large-cnn',
      {
        input_text: longDescription,
        max_length: 150
      }
    );
  }

  async generateRecommendations(userPreferences) {
    return this.ai.run(
      '@cf/meta/llama-2-7b-chat-int8',
      {
        messages: [
          { 
            role: 'system', 
            content: 'You are a personalized travel recommendation AI' 
          },
          { 
            role: 'user', 
            content: `Based on these user preferences: ${JSON.stringify(userPreferences)}, 
            suggest 5 unique travel destinations with reasons why they would be a perfect match.` 
          }
        ]
      }
    );
  }

  // Image analysis for location recognition
  async analyzeLocationImage(imageBlob) {
    return this.ai.run(
      '@cf/microsoft/resnet50',
      {
        image: [...new Uint8Array(await imageBlob.arrayBuffer())]
      }
    );
  }
}

// Utility function for error handling
export function handleAIError(error) {
  console.error('AI Processing Error:', error);
  return {
    status: 'error',
    message: 'AI processing encountered an issue',
    details: error.message
  };
}
