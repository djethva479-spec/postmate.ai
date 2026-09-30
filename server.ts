import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '15mb' }));

  // Status check endpoint
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json({
      status: 'active',
      hasApiKey: !!aiClient,
      activeModel: 'gemini-3.8-flash',
      imageModel: 'gemini-3.1-flash-lite-image',
      supportedPlatforms: ['instagram', 'facebook', 'linkedin', 'x', 'whatsapp'],
    });
  });

  // AI Post Generation Endpoint
  app.post('/api/generate-post', async (req: Request, res: Response) => {
    try {
      const {
        platform,
        postType,
        topic,
        description,
        targetAudience,
        mainMessage,
        tone,
        callToAction,
        price,
        contactInfo,
        additionalInstructions,
      } = req.body;

      if (!topic && !description) {
        return res.status(400).json({ error: 'Topic or description is required.' });
      }

      const platformsToGenerate: ('instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp')[] =
        platform === 'all'
          ? ['instagram', 'facebook', 'linkedin', 'x', 'whatsapp']
          : [platform || 'instagram'];

      // If aiClient is available, use Gemini 3.8 Flash for creative high-converting posts
      if (aiClient) {
        try {
          const systemInstruction = `You are PostMate AI, an elite social media content strategist and creative director.
Your mission is to turn user briefs into captivating, platform-native social posts that drive massive engagement and conversion.

CRITICAL RULES:
1. Do NOT hallucinate or invent fake discounts, pricing, dates, contact details, or claims that the user did not supply. Rely strictly on the information provided.
2. Adapt tone, structure, line breaks, length, and hooks to each platform:
   - Instagram: Visual-first, magnetic first-line hook, curated emojis, engaging storytelling, 5-15 focused hashtags, punchy CTA.
   - Facebook: Conversational, community-focused, relatable tone, easy-to-read paragraphs, clear CTA, 2-4 hashtags.
   - LinkedIn: Professional yet human, thought-leadership hook, clean spaced formatting/bullet points, industry hashtags (3-5), clear business value CTA.
   - X (Twitter): Sharp, punchy, concise (under 280 chars for standard view or clean thread style), curiosity-inducing hook, 2-3 laser-targeted hashtags.
   - WhatsApp: Personal, direct, easy-to-forward message format, bullet points with emojis, highlighted essentials, clear next step/link.
3. For each platform, provide:
   - headline: Catchy 1-line hook/title
   - caption: Full platform-ready post
   - shortVersion: High-impact condensed version (1-2 sentences)
   - longVersion: Comprehensive storytelling version
   - callToAction: Actionable closing prompt
   - hashtags: Array of hashtags (without # symbol)
   - visualConcept: Description of the ideal matching photography or graphic
   - imagePrompt: Highly detailed photography/digital art prompt (specifying lighting, camera lens, angle, composition, colors, and mood)
4. Return ONLY a valid JSON object matching the requested schema.`;

          const prompt = `Generate tailored social media posts for the following platforms: ${platformsToGenerate.join(', ')}.

USER BRIEF:
- Topic/Product: ${topic || 'Not specified'}
- Post Type: ${postType || 'Product Promotion'}
- Description: ${description || 'Not specified'}
- Target Audience: ${targetAudience || 'General audience'}
- Core Message: ${mainMessage || 'Not specified'}
- Desired Tone: ${tone || 'Friendly'}
- Call To Action: ${callToAction || 'Learn more'}
${price ? `- Price/Offer Details: ${price}` : ''}
${contactInfo ? `- Contact/Website/Location: ${contactInfo}` : ''}
${additionalInstructions ? `- Special Instructions: ${additionalInstructions}` : ''}

REQUIRED JSON OUTPUT FORMAT:
{
  "posts": {
    ${platformsToGenerate
      .map(
        (p) => `"${p}": {
      "platform": "${p}",
      "headline": "string",
      "caption": "string",
      "shortVersion": "string",
      "longVersion": "string",
      "callToAction": "string",
      "hashtags": ["string"],
      "visualConcept": "string",
      "imagePrompt": "string"
    }`
      )
      .join(',\n    ')}
  }
}`;

          const response = await aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.85,
            },
          });

          const rawText = response.text || '{}';
          const cleanedText = rawText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
          const parsed = JSON.parse(cleanedText);

          if (parsed && parsed.posts) {
            return res.json({ posts: parsed.posts, source: 'gemini-3.8-flash' });
          }
        } catch (geminiError) {
          console.warn('Gemini generateContent encountered an issue, activating intelligent fallback engine:', geminiError);
          // Fall through to resilient fallback generator
        }
      }

      // Resilient Smart Template Engine (Fallback when API key is not configured or in offline demo mode)
      const generatedPosts: Record<string, any> = {};

      for (const p of platformsToGenerate) {
        generatedPosts[p] = buildIntelligentPost({
          platform: p,
          postType: postType || 'Announcement',
          topic: topic || 'New Update',
          description: description || 'Special announcement and details.',
          targetAudience: targetAudience || 'Community & Customers',
          mainMessage: mainMessage || topic,
          tone: tone || 'Friendly',
          callToAction: callToAction || 'Check it out now!',
          price,
          contactInfo,
          additionalInstructions,
        });
      }

      return res.json({ posts: generatedPosts, source: 'smart-template-engine' });
    } catch (err: any) {
      console.error('Error generating post:', err);
      return res.status(500).json({ error: 'Failed to generate post. Please try again.' });
    }
  });

  // AI Image Generation Endpoint
  app.post('/api/generate-image', async (req: Request, res: Response) => {
    try {
      const { prompt, topic } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (aiClient) {
        try {
          const response = await aiClient.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: '1:1',
              },
            },
          });

          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                const mime = part.inlineData.mimeType || 'image/png';
                return res.json({
                  imageUrl: `data:${mime};base64,${part.inlineData.data}`,
                  source: 'gemini-3.1-flash-lite-image',
                });
              }
            }
          }
        } catch (imgError: any) {
          console.warn('Gemini image generation unavailable or quota exceeded:', imgError?.message || imgError);
        }
      }

      // If AI image generation was not available, return success with null so frontend assigns curated contextual visual
      return res.json({
        imageUrl: null,
        message: 'Contextual curated visual will be paired with the generated prompt.',
      });
    } catch (err) {
      console.error('Error in /api/generate-image:', err);
      return res.status(500).json({ error: 'Image generation error' });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[PostMate AI] Server listening on http://0.0.0.0:${port}`);
  });
}

// Helper for generating nuanced, platform-tailored fallbacks that sound completely human and high-converting
function buildIntelligentPost(params: {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp';
  postType: string;
  topic: string;
  description: string;
  targetAudience: string;
  mainMessage: string;
  tone: string;
  callToAction: string;
  price?: string;
  contactInfo?: string;
  additionalInstructions?: string;
}) {
  const { platform, postType, topic, description, targetAudience, mainMessage, tone, callToAction, price, contactInfo } = params;

  const topicClean = topic.trim();
  const descClean = description.trim();

  // Platform-specific styling & composition
  switch (platform) {
    case 'instagram': {
      const headline = `✨ Something exciting has arrived: Meet ${topicClean}!`;
      const caption = `✨ Ready to elevate your daily routine? Introducing ${topicClean}!

${descClean}

💡 Why you'll love this:
• ${mainMessage || 'Crafted with premium quality and intentional detail'}
${price ? `• Exclusive Offer: ${price}\n` : ''}• Specially curated for ${targetAudience || 'creators and go-getters'}

👉 ${callToAction || 'Tap the link in bio to explore more!'}
${contactInfo ? `📍 ${contactInfo}` : ''}`;

      const shortVersion = `Say hello to ${topicClean}! ✨ ${descClean.slice(0, 100)}... Tap the link in our bio to learn more.`;
      const longVersion = `Big news is finally here! 🎉

Over the past few months, we've been crafting something special for our community. Today, we're proud to unveil ${topicClean}.

${descClean}

Whether you're looking to transform your workflow or discover your next favorite essential, this was designed specifically for ${targetAudience}.

${price ? `🏷️ Details: ${price}\n` : ''}
💬 We'd love to hear your thoughts in the comments below!
🔗 ${callToAction} (Link in bio)
${contactInfo ? `\n📌 Find us at: ${contactInfo}` : ''}`;

      return {
        platform: 'instagram',
        headline,
        caption,
        shortVersion,
        longVersion,
        callToAction: callToAction || 'Tap link in bio to check it out!',
        hashtags: [
          topicClean.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'innovation',
          postType.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'trending',
          'instadaily',
          'creative',
          'communityfirst',
          'explorepage',
          'qualitymatter',
        ],
        visualConcept: `Vibrant, high-contrast lifestyle visual featuring ${topicClean} in an authentic setting. Natural lighting, warm tones, and inviting composition tailored for Instagram feed or carousel.`,
        imagePrompt: `Cinematic editorial photograph showcasing "${topicClean}". ${descClean.slice(0, 120)}. Aesthetic modern setting, soft golden hour rim light, 50mm f/1.8 lens, shallow depth of field, magazine-quality styling, 8k resolution.`,
      };
    }

    case 'facebook': {
      const headline = `📢 Announcement: Introducing ${topicClean}!`;
      const caption = `Hey everyone! 👋 We have some exciting news to share today.

We are officially announcing ${topicClean} — ${descClean}

Here is what this means for you:
✅ ${mainMessage || 'Better experience designed from the ground up'}
${price ? `✅ Pricing/Offer: ${price}\n` : ''}✅ Perfect for ${targetAudience || 'our amazing community'}

${callToAction || 'Click the link below to get all the details and be part of the launch!'}
${contactInfo ? `\nReach out to us: ${contactInfo}` : ''}

Feel free to like, share, and tag a friend who needs to know about this! 👇`;

      const shortVersion = `Exciting update! We just launched ${topicClean}. ${descClean.slice(0, 120)}... Click below to learn more!`;
      const longVersion = `To our community and friends,\n\nWe couldn't wait to share this moment with you. Today marks a big milestone as we launch ${topicClean}.\n\n${descClean}\n\nOur goal has always been simple: create real value for ${targetAudience}. We listened closely to feedback, and this launch reflects everything you asked for.\n\n${price ? `Special pricing: ${price}\n\n` : ''}Ready to dive in?\n👉 ${callToAction}\n\n${contactInfo ? `Questions? Reach us at: ${contactInfo}` : ''}`;

      return {
        platform: 'facebook',
        headline,
        caption,
        shortVersion,
        longVersion,
        callToAction: callToAction || 'Learn more & join the conversation!',
        hashtags: [
          topicClean.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'news',
          'community',
          'announcement',
          'trendingnow',
        ],
        visualConcept: `Clean, welcoming horizontal banner or candid scene highlighting ${topicClean}. Bright, accessible, and friendly mood optimized for Facebook newsfeeds.`,
        imagePrompt: `Professional commercial photograph representing "${topicClean}". Crisp daylight, warm friendly atmosphere, real people or high-clarity product focus, balanced composition for Facebook feed, 4k clarity.`,
      };
    }

    case 'linkedin': {
      const headline = `🚀 Launching ${topicClean}: A New Standard for ${targetAudience}`;
      const caption = `Excited to share a major milestone today: Introducing ${topicClean}.

${descClean}

Key takeaways and business impact:
🔹 Strategic Focus: ${mainMessage || 'Delivering measurable value and efficiency'}
🔹 Built For: ${targetAudience || 'Industry leaders and forward-thinking teams'}
${price ? `🔹 Value & Tier: ${price}\n` : ''}
In today's fast-moving environment, staying ahead requires intentional solutions that solve real pain points. That was the core thesis behind ${topicClean}.

${callToAction || 'Read the complete announcement and discover how to get started:'}
${contactInfo ? `\nConnect with our team: ${contactInfo}` : ''}

I would welcome your perspective: How is your team currently tackling this in your organization? Let's discuss in the comments.`;

      const shortVersion = `We are proud to introduce ${topicClean}. Designed specifically for ${targetAudience} to solve real challenges. Link in comments below.`;
      const longVersion = `Solving complex challenges requires disciplined execution and deep empathy for the customer.\n\nToday, I'm thrilled to unveil ${topicClean}.\n\n${descClean}\n\nHere is why this matters:\n1. Purpose-built for ${targetAudience}\n2. Core value: ${mainMessage}\n${price ? `3. Commercial availability: ${price}\n` : ''}\nThank you to our remarkable team and partners who brought this vision to fruition.\n\n${callToAction}\n\nWhat are your thoughts on this direction? Looking forward to the conversation below.`;

      return {
        platform: 'linkedin',
        headline,
        caption,
        shortVersion,
        longVersion,
        callToAction: callToAction || 'Explore the full announcement and share your insights.',
        hashtags: [
          'businessgrowth',
          'innovation',
          'leadership',
          'strategy',
          topicClean.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'professional',
        ],
        visualConcept: `Polished corporate and thought-leadership visual. Clean modern workspace, data presentation, or architectural minimalist product staging.`,
        imagePrompt: `Sleek, minimalist executive presentation visual for "${topicClean}". Modern glass architecture, subtle indigo ambient gradient, clean high-end aesthetic, Bloomberg and Forbes editorial style, sharp 8k details.`,
      };
    }

    case 'x': {
      const headline = `Big news: ${topicClean} is officially live 🚀`;
      const caption = `${topicClean} is here. 

${descClean.slice(0, 140)}

⚡ ${mainMessage || 'Built for speed and simplicity'}
${price ? `🏷️ ${price}\n` : ''}
👉 ${callToAction || 'Check it out now:'} ${contactInfo || ''}`;

      const shortVersion = `Introducing ${topicClean}. ${descClean.slice(0, 100)}... Check it out now ⚡`;
      const longVersion = `Thread: Why we built ${topicClean} 🧵👇\n\n1/ ${descClean}\n\n2/ Built specifically for ${targetAudience}.\n\n3/ Core promise: ${mainMessage}\n${price ? `\n4/ Available today: ${price}` : ''}\n\n5/ ${callToAction}\n${contactInfo ? `Link: ${contactInfo}` : ''}`;

      return {
        platform: 'x',
        headline,
        caption,
        shortVersion,
        longVersion,
        callToAction: callToAction || 'Check it out today',
        hashtags: [
          topicClean.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'launch',
          'tech',
          'buildinpublic',
        ],
        visualConcept: `High-impact, eye-catching visual card with high contrast, minimal typography, and bold geometric shapes that stop thumbs while scrolling Twitter feeds.`,
        imagePrompt: `Modern high-contrast graphic concept for "${topicClean}". Punchy composition, vibrant accents, dark mode aesthetic, ultra-sharp rendering, 16:9 aspect ratio optimized for X feed.`,
      };
    }

    case 'whatsapp': {
      const headline = `*📢 Quick Update: ${topicClean}*`;
      const caption = `*Hello!* 👋

Hope you're having a great week! Just wanted to share a quick update regarding *${topicClean}*.

${descClean}

*Key Highlights:*
• *What:* ${mainMessage || topicClean}
• *Who it's for:* ${targetAudience || 'You and your team'}
${price ? `• *Details:* ${price}\n` : ''}
*Next Step:*
👉 ${callToAction || 'Tap here to get started or reply to this message directly!'}

${contactInfo ? `📞 Contact / Website: ${contactInfo}\n` : ''}
Feel free to forward this to anyone who would find this valuable! 🙌`;

      const shortVersion = `*${topicClean} is now available!* 🚀\n${descClean.slice(0, 100)}...\n👉 ${callToAction}`;
      const longVersion = `*Important Announcement: ${topicClean}* 🌟\n\nHi there,\n\nWe wanted to personally reach out with exciting news:\n\n${descClean}\n\n*Why this matters to you:*\n${mainMessage}\n\n${price ? `*Pricing/Offers:* ${price}\n` : ''}*How to claim or learn more:*\n${callToAction}\n\n${contactInfo ? `*Direct Info:* ${contactInfo}\n` : ''}Let us know if you have any questions!`;

      return {
        platform: 'whatsapp',
        headline,
        caption,
        shortVersion,
        longVersion,
        callToAction: callToAction || 'Reply directly or click the link to claim!',
        hashtags: [],
        visualConcept: `Clean, mobile-optimized square graphic with readable text overlay and cheerful direct appeal for WhatsApp groups, broadcast lists, and status updates.`,
        imagePrompt: `Friendly, inviting marketing visual for "${topicClean}". Crisp details, bright natural lighting, clean presentation, optimized for mobile chat preview.`,
      };
    }
  }
}

startServer();
