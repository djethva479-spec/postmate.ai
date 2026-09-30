// Curated high-resolution, royalty-free context-aware visuals for realistic rendering and instant fallback

export interface CuratedVisual {
  keyword: string;
  category: string;
  imageUrl: string;
  defaultPrompt: string;
  artDirection: {
    colorPalette: string[];
    cameraAngle: string;
    lighting: string;
    style: string;
  };
}

export const CURATED_VISUAL_CATALOG: CuratedVisual[] = [
  {
    keyword: 'coffee',
    category: 'Restaurant/Food',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Cinematic photograph of a cozy modern coffee shop during a sunny morning grand opening, artisan ceramic latte art cup on a reclaimed wooden table, warm ambient lighting, blurred background of smiling students chatting, 35mm lens, high detail, f/1.8.',
    artDirection: {
      colorPalette: ['#4A2E18', '#D4A373', '#E9D8A6', '#FAEDCD'],
      cameraAngle: '45-degree tabletop close-up',
      lighting: 'Warm morning sunlight through storefront glass',
      style: 'Artisanal modern lifestyle photography'
    }
  },
  {
    keyword: 'gym',
    category: 'Product Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Dynamic high-energy photograph of a premium modern gym interior, motivational atmosphere, clean kettlebells and weights, neon accent lighting on dark concrete walls, athletic individual working out, hyper-realistic, dramatic rim lighting.',
    artDirection: {
      colorPalette: ['#0F172A', '#06B6D4', '#E2E8F0', '#3B82F6'],
      cameraAngle: 'Low-angle dynamic perspective',
      lighting: 'Dramatic high-contrast rim lighting with subtle neon blue glow',
      style: 'Commercial fitness & athletic editorial'
    }
  },
  {
    keyword: 'fitness',
    category: 'Offer/Sale',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Professional fitness club promo visual, modern equipment, energetic workout session, clean wellness ambiance, bright natural daylight, motivational vibe.',
    artDirection: {
      colorPalette: ['#1E293B', '#10B981', '#F8FAFC'],
      cameraAngle: 'Eye-level wide aperture action shot',
      lighting: 'Clean studio natural daylight',
      style: 'High-end wellness club photography'
    }
  },
  {
    keyword: 'diwali',
    category: 'Festival/Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Vibrant and festive Diwali celebration scene, traditional clay diyas glowing with golden flame, intricate flower rangoli, rich silk ethnic festive fashion fabrics in marigold and ruby red, sparkles of light, festive warm glow, festive luxury.',
    artDirection: {
      colorPalette: ['#991B1B', '#D97706', '#FBBF24', '#7C2D12'],
      cameraAngle: 'Close-up focal depth with bokeh',
      lighting: 'Warm flickering candle and diya illumination',
      style: 'Festive cultural luxury aesthetic'
    }
  },
  {
    keyword: 'festival',
    category: 'Festival/Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Celebratory holiday atmosphere with golden fairy lights, celebratory confetti, festive decorations, joyful vibes, warm inviting aesthetic, premium holiday campaign.',
    artDirection: {
      colorPalette: ['#F59E0B', '#EF4444', '#10B981'],
      cameraAngle: 'Cinematic wide angle',
      lighting: 'Festive ambient bokeh glow',
      style: 'Editorial celebratory advertising'
    }
  },
  {
    keyword: 'tech',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Sleek futuristic tech workstation, minimal glass desk, illuminated ultra-thin laptop showing AI dashboard, soft indigo and violet ambient luminescence, clean ergonomic aesthetic, 8k render style, crisp product photography.',
    artDirection: {
      colorPalette: ['#0F172A', '#6366F1', '#8B5CF6', '#F8FAFC'],
      cameraAngle: 'Clean modern isometric 3/4 angle',
      lighting: 'Soft diffused studio LED lighting with violet accent',
      style: 'Silicon Valley modern product aesthetic'
    }
  },
  {
    keyword: 'software',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Contemporary SaaS platform visual concept, high-resolution holographic data analytics interfaces floating over a modern designer workspace, clean gradient lighting, sleek tech presentation.',
    artDirection: {
      colorPalette: ['#1E1B4B', '#3B82F6', '#06B6D4'],
      cameraAngle: 'Direct front product view',
      lighting: 'Subtle backlighting with luminous screen glow',
      style: 'Clean SaaS marketing render'
    }
  },
  {
    keyword: 'food',
    category: 'Restaurant/Food',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Artisanal culinary masterpiece presented on matte ceramic tableware, vibrant fresh ingredients, edible flowers, delicate sauce drizzle, rustic bistro background, warm natural light, food editorial magazine style.',
    artDirection: {
      colorPalette: ['#1C1917', '#E11D48', '#84CC16', '#FEF3C7'],
      cameraAngle: 'Top-down flat lay or 45-degree gourmet angle',
      lighting: 'Diffused window light with soft fill',
      style: 'Michelin-guide editorial food styling'
    }
  },
  {
    keyword: 'travel',
    category: 'Travel',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Breathtaking luxury travel resort scene, turquoise ocean waters, gentle breeze rustling palm trees, chic wooden lounge deck with refreshing tropical drinks, golden hour sunset reflections, serene wanderlust.',
    artDirection: {
      colorPalette: ['#0284C7', '#38BDF8', '#FDE047', '#EA580C'],
      cameraAngle: 'Expansive panoramic eye-level landscape',
      lighting: 'Warm golden hour sunset glow',
      style: 'Condé Nast luxury travel photography'
    }
  },
  {
    keyword: 'fashion',
    category: 'Product Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'High-fashion editorial campaign, model wearing minimalist tailored neutral clothing, architectural shadows, clean sun-drenched concrete studio, crisp fabric texture, Vogue aesthetic.',
    artDirection: {
      colorPalette: ['#292524', '#D6D3D1', '#FAFAF9', '#A8A29E'],
      cameraAngle: 'Full-length editorial portrait',
      lighting: 'Hard sunlight creating geometric shadows',
      style: 'Minimalist luxury fashion editorial'
    }
  },
  {
    keyword: 'job',
    category: 'Job/Career',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Modern creative agency team collaborating around a timber conference table, laughing, brainstorming with sketches on glass board, sunlit open-plan loft office, high energy positive culture.',
    artDirection: {
      colorPalette: ['#0F172A', '#38BDF8', '#F1F5F9', '#475569'],
      cameraAngle: 'Medium collaborative candid shot',
      lighting: 'Soft overhead daylight',
      style: 'Modern tech company workplace culture'
    }
  },
  {
    keyword: 'education',
    category: 'Educational',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Inspiring modern educational environment, students collaborating with notebooks and digital tablets in a brightly lit modern library, cheerful learning atmosphere, focused and ambitious.',
    artDirection: {
      colorPalette: ['#1E3A8A', '#3B82F6', '#F3F4F6'],
      cameraAngle: 'Over-the-shoulder interactive angle',
      lighting: 'Bright natural library ambient daylight',
      style: 'Contemporary academic & masterclass marketing'
    }
  },
  {
    keyword: 'event',
    category: 'Event',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: 'Exciting grand event atmosphere, sleek conference stage with impressive lighting beams, engaged audience in silhouette, high anticipation, premier keynote presentation feel.',
    artDirection: {
      colorPalette: ['#09090B', '#7C3AED', '#EC4899', '#FAFAFA'],
      cameraAngle: 'Audience perspective toward illuminated stage',
      lighting: 'Dramatic stage spotlights and ambient haze',
      style: 'Flagship keynote / live concert production'
    }
  }
];

export function findMatchingVisual(topic: string, description: string, postType: string): CuratedVisual {
  const query = `${topic} ${description} ${postType}`.toLowerCase();

  for (const item of CURATED_VISUAL_CATALOG) {
    if (query.includes(item.keyword.toLowerCase())) {
      return item;
    }
  }

  // Fallbacks based on category match
  const categoryMatch = CURATED_VISUAL_CATALOG.find(
    (item) => item.category.toLowerCase() === postType.toLowerCase()
  );
  if (categoryMatch) return categoryMatch;

  // General business/product fallback
  return {
    keyword: 'product',
    category: 'Product Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    defaultPrompt: `High-end commercial product visualization for "${topic}". Sleek composition, soft studio lighting, clean background, premium aesthetic, crisp details, 50mm lens f/2.0.`,
    artDirection: {
      colorPalette: ['#0F172A', '#6366F1', '#E2E8F0'],
      cameraAngle: '45-degree commercial studio angle',
      lighting: 'Balanced 3-point softbox studio lighting',
      style: 'Modern premium commercial campaign'
    }
  };
}
