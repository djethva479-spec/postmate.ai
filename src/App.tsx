import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { PostForm } from './components/PostForm';
import { ResultView } from './components/ResultView';
import { MyPosts } from './components/MyPosts';
import { TemplatesView } from './components/TemplatesView';
import { SettingsModal } from './components/SettingsModal';
import { 
  PostFormInput, 
  GenerationResult, 
  SavedPost, 
  PlatformKey 
} from './types';
import { 
  generateSocialPosts, 
  getSavedPosts, 
  savePostToStorage, 
  deleteSavedPost, 
  clearAllSavedPosts 
} from './services/aiService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'saved' | 'templates'>('home');
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState<Partial<PostFormInput> | undefined>(undefined);

  // Load saved posts on mount
  useEffect(() => {
    setSavedPosts(getSavedPosts());
  }, []);

  const handleGenerate = async (input: PostFormInput) => {
    setIsGenerating(true);
    try {
      const res = await generateSocialPosts(input);
      setGenerationResult(res);
      setActiveTab('create');
    } catch (err) {
      console.error('Generation error:', err);
      alert('An error occurred during generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePost = (post: SavedPost) => {
    const updated = savePostToStorage(post);
    setSavedPosts(updated);
  };

  const handleDeleteSavedPost = (id: string) => {
    const updated = deleteSavedPost(id);
    setSavedPosts(updated);
  };

  const handleClearAllSaved = () => {
    clearAllSavedPosts();
    setSavedPosts([]);
  };

  const handleOpenSavedPost = (post: SavedPost) => {
    // Construct single-post result view
    const dummyResult: GenerationResult = {
      id: post.id,
      createdAt: post.createdAt,
      originalInput: {
        platform: post.platform,
        postType: post.postType,
        topic: post.topic,
        description: post.caption,
        targetAudience: 'Community',
        mainMessage: post.headline,
        tone: post.tone,
        callToAction: post.callToAction,
        visualOption: 'generate',
      },
      selectedPlatform: post.platform,
      posts: {
        instagram: {
          platform: 'instagram',
          headline: post.headline,
          caption: post.caption,
          shortVersion: post.caption.slice(0, 100),
          longVersion: post.caption,
          callToAction: post.callToAction,
          hashtags: post.hashtags,
          visualConcept: post.headline,
          imagePrompt: post.imagePrompt || '',
          imageUrl: post.imageUrl,
          imageSource: 'ai',
        },
        facebook: {
          platform: 'facebook',
          headline: post.headline,
          caption: post.caption,
          shortVersion: post.caption.slice(0, 100),
          longVersion: post.caption,
          callToAction: post.callToAction,
          hashtags: post.hashtags,
          visualConcept: post.headline,
          imagePrompt: post.imagePrompt || '',
          imageUrl: post.imageUrl,
          imageSource: 'ai',
        },
        linkedin: {
          platform: 'linkedin',
          headline: post.headline,
          caption: post.caption,
          shortVersion: post.caption.slice(0, 100),
          longVersion: post.caption,
          callToAction: post.callToAction,
          hashtags: post.hashtags,
          visualConcept: post.headline,
          imagePrompt: post.imagePrompt || '',
          imageUrl: post.imageUrl,
          imageSource: 'ai',
        },
        x: {
          platform: 'x',
          headline: post.headline,
          caption: post.caption,
          shortVersion: post.caption.slice(0, 100),
          longVersion: post.caption,
          callToAction: post.callToAction,
          hashtags: post.hashtags,
          visualConcept: post.headline,
          imagePrompt: post.imagePrompt || '',
          imageUrl: post.imageUrl,
          imageSource: 'ai',
        },
        whatsapp: {
          platform: 'whatsapp',
          headline: post.headline,
          caption: post.caption,
          shortVersion: post.caption.slice(0, 100),
          longVersion: post.caption,
          callToAction: post.callToAction,
          hashtags: post.hashtags,
          visualConcept: post.headline,
          imagePrompt: post.imagePrompt || '',
          imageUrl: post.imageUrl,
          imageSource: 'ai',
        },
      },
    };

    setGenerationResult(dummyResult);
    setActiveTab('create');
  };

  const handleSelectTemplate = (templateInput: Partial<PostFormInput>) => {
    setFormInitialValues(templateInput);
    setGenerationResult(null);
    setActiveTab('create');
  };

  // Demo Mode Handler: fills demo data and runs 1-click multi-platform generation
  const handleTriggerDemo = async () => {
    const demoInput: PostFormInput = {
      platform: 'all',
      postType: 'Restaurant/Food',
      topic: 'Roast & Bloom Coffee Co.',
      description: 'Grand opening this Sunday with hand-poured artisanal brews, fresh pastries, and 20% discount for college students with valid ID.',
      targetAudience: 'College students, remote workers, and neighborhood coffee lovers',
      mainMessage: 'Your cozy new study nook and specialty espresso bar is officially open.',
      tone: 'Friendly',
      callToAction: 'Visit us this Sunday and claim your 20% student discount!',
      price: 'Drinks starting at $3.50 · 20% Student Discount',
      contactInfo: '104 Campus Blvd · @roastandbloom · www.roastandbloom.com',
      additionalInstructions: 'Emphasize the welcoming study ambiance, high-speed Wi-Fi, and ethical single-origin beans.',
      visualOption: 'generate',
    };

    setFormInitialValues(demoInput);
    setActiveTab('create');
    setIsGenerating(true);
    try {
      const res = await generateSocialPosts(demoInput);
      setGenerationResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'create' && !generationResult) {
            // Keep current form or leave empty
          }
        }}
        savedCount={savedPosts.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLoadDemo={handleTriggerDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HeroLanding
            onStartCreate={() => {
              setGenerationResult(null);
              setActiveTab('create');
            }}
            onTryDemo={handleTriggerDemo}
          />
        )}

        {activeTab === 'create' && (
          <>
            {generationResult ? (
              <ResultView
                result={generationResult}
                onUpdateResult={(updated) => setGenerationResult(updated)}
                onSavePost={handleSavePost}
                onRegenerate={() => {
                  if (generationResult?.originalInput) {
                    handleGenerate(generationResult.originalInput);
                  }
                }}
                onNewPost={() => {
                  setGenerationResult(null);
                  setFormInitialValues(undefined);
                }}
                isRegenerating={isGenerating}
              />
            ) : (
              <PostForm
                initialValues={formInitialValues}
                onGenerate={handleGenerate}
                isLoading={isGenerating}
              />
            )}
          </>
        )}

        {activeTab === 'templates' && (
          <TemplatesView onSelectTemplate={handleSelectTemplate} />
        )}

        {activeTab === 'saved' && (
          <MyPosts
            posts={savedPosts}
            onDeletePost={handleDeleteSavedPost}
            onClearAll={handleClearAllSaved}
            onOpenPost={handleOpenSavedPost}
            onCreateNew={() => {
              setGenerationResult(null);
              setFormInitialValues(undefined);
              setActiveTab('create');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-300">PostMate AI</span>
            <span>·</span>
            <span>Turn ideas into platform-ready social content</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-slate-200 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setGenerationResult(null);
                setActiveTab('create');
              }}
              className="hover:text-slate-200 transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className="hover:text-slate-200 transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className="hover:text-slate-200 transition-colors"
            >
              My Posts ({savedPosts.length})
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-200 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        savedCount={savedPosts.length}
        onClearStorage={handleClearAllSaved}
        onLoadDemo={handleTriggerDemo}
      />
    </div>
  );
}
