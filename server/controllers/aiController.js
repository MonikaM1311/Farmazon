// Mock AI logic — swap with OpenAI API when key is available
const knowledgeBase = {
  immunity: ['Spinach', 'Broccoli', 'Garlic', 'Ginger', 'Citrus fruits', 'Bell peppers'],
  weight_loss: ['Cucumber', 'Lettuce', 'Tomatoes', 'Watermelon', 'Papaya', 'Berries'],
  energy: ['Bananas', 'Sweet potatoes', 'Beets', 'Oranges', 'Mangoes'],
  digestion: ['Papaya', 'Pineapple', 'Ginger', 'Fennel', 'Apples'],
  budget: ['Carrots', 'Onions', 'Potatoes', 'Cabbage', 'Bananas', 'Tomatoes'],
  diabetes: ['Bitter gourd', 'Fenugreek', 'Spinach', 'Broccoli', 'Berries'],
  heart: ['Tomatoes', 'Avocado', 'Leafy greens', 'Berries', 'Pomegranate'],
};

const getAIResponse = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes('immun')) {
    return `🌿 For boosting immunity, I recommend: **${knowledgeBase.immunity.join(', ')}**. These are rich in Vitamin C, antioxidants, and zinc. You can find fresh options in our shop!`;
  }
  if (msg.includes('weight') || msg.includes('diet') || msg.includes('slim')) {
    return `🥗 For weight management, try: **${knowledgeBase.weight_loss.join(', ')}**. These are low-calorie, high-fiber options available fresh from our farmers.`;
  }
  if (msg.includes('energy') || msg.includes('tired') || msg.includes('fatigue')) {
    return `⚡ For natural energy, go for: **${knowledgeBase.energy.join(', ')}**. These are packed with natural sugars and complex carbs.`;
  }
  if (msg.includes('digest') || msg.includes('stomach') || msg.includes('gut')) {
    return `🫚 For better digestion, try: **${knowledgeBase.digestion.join(', ')}**. These contain natural enzymes and fiber.`;
  }
  if (msg.includes('budget') || msg.includes('cheap') || msg.includes('₹') || msg.includes('200') || msg.includes('affordable')) {
    return `💰 For a budget-friendly grocery under ₹200, I suggest: **${knowledgeBase.budget.join(', ')}**. These are nutritious, widely available, and very affordable on Farmazon!`;
  }
  if (msg.includes('diabetes') || msg.includes('sugar') || msg.includes('blood sugar')) {
    return `🩺 For managing blood sugar, consider: **${knowledgeBase.diabetes.join(', ')}**. These have a low glycemic index and are great for diabetics.`;
  }
  if (msg.includes('heart') || msg.includes('cholesterol') || msg.includes('bp') || msg.includes('blood pressure')) {
    return `❤️ For heart health, try: **${knowledgeBase.heart.join(', ')}**. These are rich in antioxidants and heart-healthy nutrients.`;
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `👋 Hello! I'm Farma, your AI assistant. I can help you:\n- Suggest fruits/veggies for health goals\n- Recommend budget groceries\n- Answer nutrition questions\n\nWhat can I help you with today?`;
  }
  if (msg.includes('fruit') || msg.includes('vegetable') || msg.includes('recommend')) {
    return `🛒 I can recommend produce based on your health goals! Tell me what you're looking for:\n- Immunity boost\n- Weight loss\n- More energy\n- Better digestion\n- Budget shopping\n\nJust ask!`;
  }

  return `🤔 I'm not sure about that, but I can help with:\n- **Health goals** (immunity, weight loss, energy)\n- **Budget grocery suggestions**\n- **Nutrition advice**\n\nTry asking: "What's good for immunity?" or "Suggest budget groceries under ₹200"`;
};

const chat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });

  // If OpenAI key exists, use it; otherwise use mock
  if (process.env.OPENAI_API_KEY) {
    try {
      const { OpenAI } = require('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Farma, an AI assistant for Farmazon, a farm-to-consumer marketplace. Help users with fruit/vegetable recommendations, health goals, and budget grocery suggestions. Keep responses concise and friendly.' },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
      });
      return res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
      console.error('OpenAI error, falling back to mock:', err.message);
    }
  }

  res.json({ reply: getAIResponse(message) });
};

module.exports = { chat };
