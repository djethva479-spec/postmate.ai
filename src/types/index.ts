export type PlatformKey = 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp';

export type PlatformOption = PlatformKey | 'all';

export type PostType =
  | 'Product Promotion'
  | 'Business Announcement'
  | 'Event'
  | 'Educational'
  | 'Personal'
  | 'Festival/Celebration'
  | 'Job/Career'
  | 'Offer/Sale'
  | 'New Product'
  | 'Restaurant/Food'
  | 'Travel'
  | 'Technology'
  | 'Custom';

export type ToneType =
  | 'Professional'
  | 'Friendly'
  | 'Funny'
  | 'Inspirational'
  | 'Luxury'
  | 'Casual'
  | 'Exciting'
  | 'Minimal'
  | 'Creative';

export interface PostFormInput {
  platform: PlatformOption;
  postType: PostType;
  topic: string;
  description: string;
  targetAudience: string;
  mainMessage: string;
  tone: ToneType;
  callToAction: string;
  price?: string;
  contactInfo?: string;
  additionalInstructions?: string;
  visualOption: 'generate' | 'upload' | 'suggest';
  customUploadedImage?: string;
}

export interface PlatformPostContent {
  platform: PlatformKey;
  headline: string;
  caption: string;
  shortVersion: string;
  longVersion: string;
  callToAction: string;
  hashtags: string[];
  visualConcept: string;
  imagePrompt: string;
  imageUrl?: string;
  imageSource: 'ai' | 'upload' | 'suggested';
  suggestedArtDirection?: {
    colorPalette: string[];
    cameraAngle: string;
    lighting: string;
    style: string;
  };
}

export interface GenerationResult {
  id: string;
  createdAt: string;
  originalInput: PostFormInput;
  posts: Record<PlatformKey, PlatformPostContent>;
  selectedPlatform: PlatformKey;
}

export interface SavedPost {
  id: string;
  createdAt: string;
  topic: string;
  platform: PlatformKey;
  headline: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  imageUrl?: string;
  imagePrompt?: string;
  postType: PostType;
  tone: ToneType;
}

export interface TemplateItem {
  id: string;
  category: string;
  title: string;
  description: string;
  badge: string;
  sampleInput: Partial<PostFormInput>;
  previewVisual: string;
}
