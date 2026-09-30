import { PostFormInput, GenerationResult, PlatformPostContent, PlatformKey, SavedPost } from '../types';
import { findMatchingVisual } from '../data/fallbackVisuals';

const STORAGE_KEY = 'postmate_ai_saved_posts';

export async function generateSocialPosts(input: PostFormInput): Promise<GenerationResult> {
  const resultId = `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const matchingVisual = findMatchingVisual(input.topic, input.description, input.postType);

  let serverPosts: Record<string, any> = {};

  try {
    const res = await fetch('/api/generate-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.posts) {
        serverPosts = data.posts;
      }
    }
  } catch (err) {
    console.warn('API fetch failed, generating client-side fallback post structure:', err);
  }

  const platforms: PlatformKey[] = ['instagram', 'facebook', 'linkedin', 'x', 'whatsapp'];
  const formattedPosts: Record<PlatformKey, PlatformPostContent> = {} as any;

  // Visual determination based on user selection
  let finalImageUrl: string | undefined = undefined;
  if (input.visualOption === 'upload' && input.customUploadedImage) {
    finalImageUrl = input.customUploadedImage;
  } else if (input.visualOption === 'generate') {
    finalImageUrl = matchingVisual.imageUrl;
  } else {
    finalImageUrl = matchingVisual.imageUrl;
  }

  for (const p of platforms) {
    const raw = serverPosts[p];

    if (raw) {
      formattedPosts[p] = {
        platform: p,
        headline: raw.headline || `${input.topic} - Ready to share`,
        caption: raw.caption || `${input.topic}\n\n${input.description}\n\n${input.callToAction}`,
        shortVersion: raw.shortVersion || `${input.topic}: ${input.description.slice(0, 100)}...`,
        longVersion: raw.longVersion || raw.caption || input.description,
        callToAction: raw.callToAction || input.callToAction || 'Learn more!',
        hashtags: Array.isArray(raw.hashtags)
          ? raw.hashtags.map((h: string) => h.replace(/^#/, ''))
          : ['innovation', 'trending'],
        visualConcept: raw.visualConcept || matchingVisual.defaultPrompt,
        imagePrompt: raw.imagePrompt || matchingVisual.defaultPrompt,
        imageUrl: finalImageUrl,
        imageSource: input.visualOption === 'upload' ? 'upload' : input.visualOption === 'suggest' ? 'suggested' : 'ai',
        suggestedArtDirection: matchingVisual.artDirection,
      };
    } else {
      // Fallback synthesis if specific platform was omitted
      formattedPosts[p] = {
        platform: p,
        headline: `${input.topic}: Special Announcement`,
        caption: `${input.topic}\n\n${input.description}\n\n${input.mainMessage}\n\n👉 ${input.callToAction}`,
        shortVersion: `${input.topic} is here! ${input.description.slice(0, 90)}...`,
        longVersion: `${input.topic}\n\n${input.description}\n\nDesigned for: ${input.targetAudience}\nKey highlight: ${input.mainMessage}\n\n${input.callToAction}`,
        callToAction: input.callToAction || 'Check it out now!',
        hashtags: [
          input.topic.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'news',
          input.postType.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'update',
          'trending',
        ],
        visualConcept: matchingVisual.defaultPrompt,
        imagePrompt: matchingVisual.defaultPrompt,
        imageUrl: finalImageUrl,
        imageSource: input.visualOption === 'upload' ? 'upload' : input.visualOption === 'suggest' ? 'suggested' : 'ai',
        suggestedArtDirection: matchingVisual.artDirection,
      };
    }
  }

  const primaryPlatform: PlatformKey = input.platform === 'all' ? 'instagram' : (input.platform as PlatformKey);

  return {
    id: resultId,
    createdAt: new Date().toISOString(),
    originalInput: input,
    posts: formattedPosts,
    selectedPlatform: primaryPlatform,
  };
}

export async function requestAiImageGeneration(prompt: string, topic: string): Promise<string | null> {
  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, topic }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.imageUrl) {
        return data.imageUrl;
      }
    }
  } catch (err) {
    console.warn('Image generation endpoint call failed:', err);
  }
  return null;
}

// LocalStorage helpers for Saved Posts (My Posts)
export function getSavedPosts(): SavedPost[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Error loading saved posts:', e);
    return [];
  }
}

export function savePostToStorage(post: SavedPost): SavedPost[] {
  try {
    const existing = getSavedPosts();
    const updated = [post, ...existing.filter((p) => p.id !== post.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving post to storage:', e);
    return getSavedPosts();
  }
}

export function deleteSavedPost(id: string): SavedPost[] {
  try {
    const existing = getSavedPosts();
    const updated = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting saved post:', e);
    return [];
  }
}

export function clearAllSavedPosts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing saved posts:', e);
  }
}
