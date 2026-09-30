import { TemplateItem } from '../types';

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'food-coffee-opening',
    category: 'Food',
    title: 'Artisan Coffee Shop Opening',
    description: 'Launch promotion for a new neighborhood café with student & opening discounts.',
    badge: 'Popular',
    previewVisual: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Restaurant/Food',
      topic: 'Roast & Bloom Coffee Co.',
      description: 'Grand opening this Sunday with hand-poured artisanal brews, fresh pastries, and 20% discount for college students with valid ID.',
      targetAudience: 'College students, young professionals, and local coffee lovers',
      mainMessage: 'Your new favorite workspace and specialty coffee nook is officially open.',
      tone: 'Friendly',
      callToAction: 'Visit us this Sunday and claim your 20% student discount!',
      price: 'Drinks starting at $3.50 · 20% Student Discount',
      contactInfo: '104 Campus Blvd · @roastandbloom · www.roastandbloom.com',
      additionalInstructions: 'Emphasize the warm study ambiance, free high-speed Wi-Fi, and ethical single-origin beans.',
      visualOption: 'generate'
    }
  },
  {
    id: 'fitness-membership-sale',
    category: 'Product',
    title: 'Gym & Fitness Membership Discount',
    description: 'High-conversion fitness campaign with limited-time 30% discount.',
    badge: 'Hot Deal',
    previewVisual: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Offer/Sale',
      topic: 'IronCore Athletic Club',
      description: 'Spring into fitness with 30% off annual memberships this week only. Zero initiation fee and access to premium Olympic lifting, sauna, and recovery zone.',
      targetAudience: 'Fitness enthusiasts, busy professionals seeking health routine, and beginners wanting guidance',
      mainMessage: 'Unlock your strongest year yet with state-of-the-art facilities and zero join fee.',
      tone: 'Exciting',
      callToAction: 'Claim your 30% discount pass online before Friday midnight!',
      price: '$49/month (Regular $70/month) · Save 30%',
      contactInfo: 'www.ironcorefitness.com/spring-pass · Call (555) 019-2834',
      additionalInstructions: 'Create high energy, urgency for the deadline, and highlight the free personal coaching session included.',
      visualOption: 'generate'
    }
  },
  {
    id: 'diwali-festive-sale',
    category: 'Festival',
    title: 'Diwali Festive Fashion Sale',
    description: 'Festive celebration promotion with traditional attire, lights, and festive gifting bundles.',
    badge: 'Trending',
    previewVisual: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Festival/Celebration',
      topic: 'Aura Ethnic Couture - Diwali Collection',
      description: 'Exclusive Diwali Festive Showcase featuring handcrafted silk lehengas, kurtas, and artisanal jewelry with up to 40% off festive gift sets.',
      targetAudience: 'Families, wedding shoppers, festive celebrators, and modern fashion enthusiasts',
      mainMessage: 'Celebrate the festival of lights in timeless elegance with handcrafted festive ensembles.',
      tone: 'Luxury',
      callToAction: 'Explore our Diwali edit in-store & online. Free festive gift box with every order!',
      price: 'Up to 40% Off · Gift sets from $45',
      contactInfo: 'www.auracouture.com/diwali-2026 · WhatsApp: +1 (555) 777-FEST',
      additionalInstructions: 'Include warm Diwali greetings, motifs of diyas, joy, and family celebrations.',
      visualOption: 'generate'
    }
  },
  {
    id: 'tech-saas-launch',
    category: 'Technology',
    title: 'AI Productivity Tool Launch',
    description: 'Product Hunt & LinkedIn announcement for an intelligent workflow automation engine.',
    badge: 'B2B Hero',
    previewVisual: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Business Announcement',
      topic: 'TaskFlow AI 2.0',
      description: 'We are launching TaskFlow AI 2.0: automate your team daily standups, sprint retrospectives, and client status reports with one prompt.',
      targetAudience: 'Tech founders, Product Managers, engineering leads, and remote-first teams',
      mainMessage: 'Stop spending 8 hours every week writing status reports. Let AI synthesize your Jira and Slack threads into clean executive summaries.',
      tone: 'Professional',
      callToAction: 'Try TaskFlow AI free for 14 days — no credit card required.',
      price: 'Free 14-day trial · Teams tier from $12/seat',
      contactInfo: 'www.taskflow.ai/launch · Support: hello@taskflow.ai',
      additionalInstructions: 'Format LinkedIn version with crisp problem/solution structure and clear ROI metrics.',
      visualOption: 'generate'
    }
  },
  {
    id: 'career-senior-designer',
    category: 'Career',
    title: 'Hiring: Senior Product Designer',
    description: 'Engaging talent recruitment post highlighting company culture and benefits.',
    badge: 'Hiring',
    previewVisual: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'linkedin',
      postType: 'Job/Career',
      topic: 'Pulse Design Studio - Senior UX/UI Designer',
      description: 'We are expanding our product team! Looking for a visionary Senior Product Designer to lead design systems and customer experience for fintech clients.',
      targetAudience: 'Mid-to-Senior UI/UX Designers, Design Systems leads, and Product Thinkers',
      mainMessage: 'Join a collaborative, high-autonomy design culture with flexible 4-day workweek options and annual learning stipends.',
      tone: 'Inspirational',
      callToAction: 'View full role details and submit your portfolio directly on our careers page.',
      price: '$130k - $160k + Equity + Full Benefits',
      contactInfo: 'careers.pulse.design/jobs/sr-designer',
      additionalInstructions: 'Highlight team values, modern tech stack (Figma, tokens, Framer), and remote-first policy.',
      visualOption: 'generate'
    }
  },
  {
    id: 'education-webinar',
    category: 'Education',
    title: 'Masterclass Webinar: Growth Marketing',
    description: 'Free virtual workshop registration post with industry speakers.',
    badge: 'Free Event',
    previewVisual: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Educational',
      topic: 'Zero to $1M ARR: Growth Playbook 2026',
      description: 'Free 60-minute live masterclass revealing organic acquisition playbooks, zero-spend viral loops, and conversion rate optimizations used by top SaaS unicorns.',
      targetAudience: 'Growth marketers, founders, creators, and business students',
      mainMessage: 'Learn actionable growth frameworks directly from founders who scaled from $0 to $1M ARR without paid ads.',
      tone: 'Professional',
      callToAction: 'Reserve your free seat today — live replay sent to registered attendees.',
      price: '100% Free · Limited to 500 attendees',
      contactInfo: 'www.growthacademy.io/masterclass · Live on Zoom Thursday 6 PM EST',
      additionalInstructions: 'Include 3 key bullet takeaways that attendees will learn.',
      visualOption: 'generate'
    }
  },
  {
    id: 'travel-resort-getaway',
    category: 'Travel',
    title: 'Tropical Island Villa Retreat',
    description: 'Wanderlust getaway promotion with early bird booking perks.',
    badge: 'Luxury Escape',
    previewVisual: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'instagram',
      postType: 'Travel',
      topic: 'Azure Haven Luxury Villas - Bali',
      description: 'Private infinity pool overlooking lush palm valleys. Unwind with daily floating breakfasts, complimentary sunset yoga, and private spa treatments.',
      targetAudience: 'Honeymooners, luxury travelers, remote work nomads, and wellness vacationers',
      mainMessage: 'Trade the everyday rush for emerald ocean views and tranquil tropical luxury.',
      tone: 'Luxury',
      callToAction: 'Book your 4-night stay this month and receive a complimentary couples spa package.',
      price: 'From $280/night · Early bird save 25%',
      contactInfo: 'reservations@azurehavenbali.com · WhatsApp: +62 812-3456-7890',
      additionalInstructions: 'Evoke sensory tranquility, sights of palm trees, warm ocean breeze, and ultimate relaxation.',
      visualOption: 'generate'
    }
  },
  {
    id: 'personal-founder-story',
    category: 'Personal',
    title: 'Founder Lessons & Milestone Story',
    description: 'Authentic founder reflection post designed for high LinkedIn & X viral engagement.',
    badge: 'Storytelling',
    previewVisual: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'linkedin',
      postType: 'Personal',
      topic: '3 Lessons from Failing My First Venture & Reaching $100k ARR on My Second',
      description: 'Transparent reflection on pivoting from a failed hardware project into a focused B2B software tool, overcoming doubt, and building in public.',
      targetAudience: 'Entrepreneurs, indie hackers, career switchers, and dreamers',
      mainMessage: 'Failure is data, not a destination. Consistency and talking to 10 customers every single week changed everything.',
      tone: 'Inspirational',
      callToAction: 'What was the hardest lesson in your journey? Drop a comment below.',
      price: '',
      contactInfo: 'Follow my weekly newsletter at founderinsights.substack.com',
      additionalInstructions: 'Start with a gripping 1-line hook, use short punchy paragraphs, and end with an engaging question for comments.',
      visualOption: 'suggest'
    }
  },
  {
    id: 'event-live-summit',
    category: 'Event',
    title: 'Future of Commerce Summit 2026',
    description: 'Flagship conference announcement with early bird tickets and speaker lineup.',
    badge: 'Conference',
    previewVisual: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'all',
      postType: 'Event',
      topic: 'Global Commerce Summit 2026 - Austin, TX',
      description: '2 days, 40+ keynote speakers, 1,200 retail leaders exploring AI-driven checkout, omnichannel logistics, and consumer trends.',
      targetAudience: 'E-commerce founders, CMOs, retail executives, and agency heads',
      mainMessage: 'The retail landscape is evolving faster than ever. Connect with the innovators shaping tomorrow’s shopping experience.',
      tone: 'Professional',
      callToAction: 'Super Early Bird passes are 40% off until the end of the month. Grab yours now!',
      price: 'Early Bird Pass $299 (Standard $499)',
      contactInfo: 'www.commercesummit2026.com · Austin Convention Center',
      additionalInstructions: 'Emphasize networking opportunities and high-profile keynote speaker announcements.',
      visualOption: 'generate'
    }
  },
  {
    id: 'business-partnership-announcement',
    category: 'Business',
    title: 'Strategic Partnership Announcement',
    description: 'Co-marketing press and social release for two collaborating brands.',
    badge: 'Milestone',
    previewVisual: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    sampleInput: {
      platform: 'linkedin',
      postType: 'Business Announcement',
      topic: 'FinEdge partners with CloudPay to streamline international remittances',
      description: 'We are thrilled to announce our integration with CloudPay, bringing zero-fee cross-border payments to over 50,000 SMBs across North America and Europe.',
      targetAudience: 'Fintech partners, investors, existing business customers, and tech press',
      mainMessage: 'Empowering small businesses to operate globally without heavy banking conversion fees.',
      tone: 'Professional',
      callToAction: 'Read the full press release and see how this unlocks new capabilities for your account.',
      price: '',
      contactInfo: 'www.finedge.com/press/cloudpay-partnership',
      additionalInstructions: 'Maintain authoritative, polished corporate tone while celebrating customer value creation.',
      visualOption: 'suggest'
    }
  }
];
