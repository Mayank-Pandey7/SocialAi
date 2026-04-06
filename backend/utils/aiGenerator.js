const fetch = require('node-fetch');

const templates = {
  technology: {
    professional: ["🚀 The future of {topic} is here. Businesses that adapt will lead the next decade. #Tech #Innovation"],
    funny: ["Me: I'll just google one thing. {topic}: *opens 47 tabs* 😅 #TechLife #DevHumor"],
    motivational: ["Every expert in {topic} was once a beginner. Keep building. 💪 #NeverStopLearning"],
    casual: ["honestly {topic} is lowkey changing everything 👀 #JustSaying #Tech"],
    inspirational: ["Machines compute. Humans innovate. {topic} is just the tool. ✨ #Innovation"],
  },
  sports: {
    professional: ["🏆 Champions aren't made in gyms — they're made from desire, dream, and vision. #Sports #Mindset"],
    funny: ["My fitness plan: watch sports and feel tired on their behalf 😂 #Relatable"],
    motivational: ["Every champion refused to give up. Keep pushing. 💪 #NeverGiveUp"],
    casual: ["watching the game tonight and already nervous 😬 #GameDay"],
    inspirational: ["Every loss is just a lesson in disguise. Get up. Try again. 🌟 #Resilience"],
  },
  business: {
    professional: ["💼 The best businesses solve problems. What problem are you solving today? #Entrepreneurship"],
    funny: ["Business plan: Step 1: Great idea. Step 2: ??? Step 3: Profit 😂 #StartupLife"],
    motivational: ["Your idea is valid. Your timing is right. The only thing missing is action. 🚀 #Entrepreneur"],
    casual: ["starting a business is just saying yes before you're ready 😅 #RealTalk"],
    inspirational: ["Every great company started as someone's crazy idea. What's yours? 🌍 #Innovation"],
  },
  health: {
    professional: ["🏥 Invest in wellness before illness. Prevention is the best medicine. #Health #Wellness"],
    funny: ["Me at 11pm: should sleep. Me at 2am: researching entire family history 😂 #Oops"],
    motivational: ["Your body is your most important asset. Invest in it daily. 💪 #Wellness"],
    casual: ["went for a walk and my brain feels less scrambled 🚶 #SmallWins"],
    inspirational: ["Health isn't about the weight you lose. It's about the life you gain. 🌟"],
  },
  entertainment: {
    professional: ["🎬 Great storytelling builds culture and drives change. #Entertainment #Storytelling"],
    funny: ["Me: one episode. *7 episodes later* 😂 #Netflix #Binge"],
    motivational: ["Support creators. Support storytellers. Support art. 🎨 #Art"],
    casual: ["this show destroyed my sleep schedule and i regret nothing 😅 #WorthIt"],
    inspirational: ["Stories change minds and heal wounds. That's not entertainment — that's magic. ✨"],
  },
};

const topicKeywords = {
  technology:    ['AI', 'blockchain', 'cloud computing', 'machine learning', 'cybersecurity', 'Web3', 'automation'],
  sports:        ['cricket', 'football', 'basketball', 'fitness', 'athletics', 'IPL', 'champions league'],
  business:      ['startup', 'entrepreneurship', 'leadership', 'strategy', 'growth hacking', 'venture capital'],
  health:        ['mental health', 'mindfulness', 'nutrition', 'fitness', 'wellness', 'meditation'],
  entertainment: ['streaming', 'gaming', 'movies', 'music', 'content creation', 'social media'],
  science:       ['space exploration', 'quantum computing', 'biotechnology', 'climate science', 'neuroscience'],
  travel:        ['adventure travel', 'solo travel', 'cultural immersion', 'backpacking', 'luxury travel'],
  food:          ['street food', 'plant-based cooking', 'food photography', 'fusion cuisine', 'healthy eating'],
};

const toneDescriptions = {
  professional:  'professional, authoritative, and insightful with industry expertise',
  funny:         'witty, humorous, and laugh-out-loud funny with clever observations',
  motivational:  'high-energy, deeply inspiring, and action-driving',
  casual:        'conversational, chill, and authentic like texting a friend',
  inspirational: 'deeply thoughtful, poetic, and emotionally moving',
};

const platformConstraints = {
  twitter:   'Under 260 characters. Use 2-3 relevant hashtags.',
  instagram: '150-300 characters. Use 5-8 hashtags. Add line breaks.',
  linkedin:  '200-400 characters. Professional tone. Use 3-4 hashtags.',
  facebook:  '150-300 characters. Conversational. Use 2-3 hashtags.',
};

const generateFromTemplate = (interest, tone) => {
  const i = templates[interest] || templates.technology;
  const t = i[tone] || i.professional;
  const template = t[Math.floor(Math.random() * t.length)];
  const kw = topicKeywords[interest] || topicKeywords.technology;
  return template.replace(/{topic}/g, kw[Math.floor(Math.random() * kw.length)]);
};

const generateWithGroq = async (interest, tone, platform, customPrompt) => {
  const toneDesc   = toneDescriptions[tone] || toneDescriptions.professional;
  const constraint = platformConstraints[platform] || platformConstraints.twitter;
  const kw         = topicKeywords[interest] || topicKeywords.technology;
  const keyword    = kw[Math.floor(Math.random() * kw.length)];

  const userTopic = customPrompt || keyword;

  const prompt = `You are a viral social media content writer specializing in ${interest}.

Write ONE ${platform} post about: "${userTopic}"

Tone: ${toneDesc}
Rules: ${constraint}

STRICT REQUIREMENTS:
- ONLY write about "${userTopic}" — nothing else
- Use real facts, statistics, or specific details about "${userTopic}"
- If it's a person — mention their real achievements
- If it's a product — mention real features
- If it's an event — mention real details
- If it's a concept — give a specific practical tip
- Add 2-3 relevant emojis that match the topic
- Add relevant hashtags at the end
- Sound like a real human wrote it, not a bot
- NO generic quotes like "success comes to those who work hard"
- NO off-topic content

Return ONLY the post. No explanation. No quotes around it.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model:       'llama-3.1-8b-instant',
      max_tokens:  300,
      temperature: 0.75,
      messages: [
        {
          role:    'system',
          content: `You are an expert social media content creator. You write highly specific, engaging posts about exactly what the user asks. You never go off-topic. You always include real, specific information about the topic. You write in a ${toneDesc} style.`,
        },
        {
          role:    'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${err}`);
  }

  const data    = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content || content.length < 10) throw new Error('Empty Groq response');
  return content;
};

const generateContent = async (interest, tone, platform = 'twitter', customPrompt = '') => {
  // Try Groq first (free + fast)
  if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes('xxxxxxxx')) {
    try {
      const content = await generateWithGroq(interest, tone, platform, customPrompt);
      console.log('✅ Generated with Groq AI');
      return { content, source: 'ai' };
    } catch (err) {
      console.warn('⚠️  Groq failed:', err.message);
    }
  }
  // Fallback to templates
  console.log('📝 Using template fallback');
  return { content: generateFromTemplate(interest, tone), source: 'template' };
};

const extractHashtags = (content) => {
  const matches = content.match(/#\w+/g);
  return matches ? matches.map(h => h.toLowerCase()) : [];
};

module.exports = { generateContent, extractHashtags, generateFromTemplate };