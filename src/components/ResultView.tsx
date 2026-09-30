import React, { useState, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  Download, 
  Edit3, 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  ExternalLink,
  Share2,
  FileText,
  Sliders,
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';
import { GenerationResult, PlatformKey, PlatformPostContent, SavedPost } from '../types';
import { InstagramPreview } from './previews/InstagramPreview';
import { FacebookPreview } from './previews/FacebookPreview';
import { LinkedInPreview } from './previews/LinkedInPreview';
import { XPreview } from './previews/XPreview';
import { WhatsAppPreview } from './previews/WhatsAppPreview';
import { requestAiImageGeneration } from '../services/aiService';

interface ResultViewProps {
  result: GenerationResult;
  onUpdateResult: (updated: GenerationResult) => void;
  onSavePost: (post: SavedPost) => void;
  onRegenerate: () => void;
  onNewPost: () => void;
  isRegenerating: boolean;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onUpdateResult,
  onSavePost,
  onRegenerate,
  onNewPost,
  isRegenerating,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>(result.selectedPlatform || 'instagram');
  const [activeVersion, setActiveVersion] = useState<'standard' | 'short' | 'long'>('standard');
  const [isEditing, setIsEditing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPost: PlatformPostContent = result.posts[activePlatform] || {
    platform: activePlatform,
    headline: '',
    caption: '',
    shortVersion: '',
    longVersion: '',
    callToAction: '',
    hashtags: [],
    visualConcept: '',
    imagePrompt: '',
    imageSource: 'ai',
  };

  // Editable local state
  const [editHeadline, setEditHeadline] = useState(currentPost.headline);
  const [editCaption, setEditCaption] = useState(currentPost.caption);
  const [editCta, setEditCta] = useState(currentPost.callToAction);
  const [editHashtags, setEditHashtags] = useState(currentPost.hashtags.join(', '));
  const [editPrompt, setEditPrompt] = useState(currentPost.imagePrompt);

  // Sync edits when switching platform
  const handlePlatformChange = (p: PlatformKey) => {
    setActivePlatform(p);
    const post = result.posts[p];
    if (post) {
      setEditHeadline(post.headline);
      setEditCaption(post.caption);
      setEditCta(post.callToAction);
      setEditHashtags(post.hashtags.join(', '));
      setEditPrompt(post.imagePrompt);
    }
    setActiveVersion('standard');
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveEdit = () => {
    const updatedPost: PlatformPostContent = {
      ...currentPost,
      headline: editHeadline,
      caption: editCaption,
      callToAction: editCta,
      hashtags: editHashtags.split(',').map((h) => h.trim().replace(/^#/, '')).filter(Boolean),
      imagePrompt: editPrompt,
    };

    const updatedResult: GenerationResult = {
      ...result,
      posts: {
        ...result.posts,
        [activePlatform]: updatedPost,
      },
    };

    onUpdateResult(updatedResult);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditHeadline(currentPost.headline);
    setEditCaption(currentPost.caption);
    setEditCta(currentPost.callToAction);
    setEditHashtags(currentPost.hashtags.join(', '));
    setEditPrompt(currentPost.imagePrompt);
    setIsEditing(false);
  };

  const handleApplyVersion = (ver: 'standard' | 'short' | 'long') => {
    setActiveVersion(ver);
    let chosenText = currentPost.caption;
    if (ver === 'short' && currentPost.shortVersion) chosenText = currentPost.shortVersion;
    if (ver === 'long' && currentPost.longVersion) chosenText = currentPost.longVersion;

    const updatedPost: PlatformPostContent = {
      ...currentPost,
      caption: chosenText,
    };

    const updatedResult: GenerationResult = {
      ...result,
      posts: {
        ...result.posts,
        [activePlatform]: updatedPost,
      },
    };

    setEditCaption(chosenText);
    onUpdateResult(updatedResult);
  };

  // Image Upload handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      alert('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        updateAllPlatformImages(base64, 'upload');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updateAllPlatformImages(undefined, 'suggested');
  };

  const handleGenerateNewAiImage = async () => {
    setIsGeneratingImg(true);
    try {
      const generated = await requestAiImageGeneration(currentPost.imagePrompt, result.originalInput.topic);
      if (generated) {
        updateAllPlatformImages(generated, 'ai');
      } else {
        alert('Generated detailed prompt ready. You can copy it for Midjourney/Imagen or use curated photo mode.');
      }
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const updateAllPlatformImages = (url: string | undefined, source: 'ai' | 'upload' | 'suggested') => {
    const updatedPosts: Record<PlatformKey, PlatformPostContent> = { ...result.posts };
    const platforms: PlatformKey[] = ['instagram', 'facebook', 'linkedin', 'x', 'whatsapp'];
    for (const p of platforms) {
      if (updatedPosts[p]) {
        updatedPosts[p] = {
          ...updatedPosts[p],
          imageUrl: url,
          imageSource: source,
        };
      }
    }
    onUpdateResult({
      ...result,
      posts: updatedPosts,
    });
  };

  const handleDownloadImage = () => {
    if (!currentPost.imageUrl) return;
    const a = document.createElement('a');
    a.href = currentPost.imageUrl;
    a.download = `postmate-${activePlatform}-${result.originalInput.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadPostText = () => {
    const textContent = `--- POSTMATE AI GENERATED POST ---
Platform: ${activePlatform.toUpperCase()}
Topic: ${result.originalInput.topic}
Type: ${result.originalInput.postType}
Tone: ${result.originalInput.tone}

HEADLINE:
${currentPost.headline}

CAPTION / CONTENT:
${currentPost.caption}

CALL TO ACTION:
${currentPost.callToAction}

HASHTAGS:
${currentPost.hashtags.map((h) => `#${h}`).join(' ')}

VISUAL CONCEPT:
${currentPost.visualConcept}

AI IMAGE PROMPT:
${currentPost.imagePrompt}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `postmate-${activePlatform}-${result.originalInput.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToMyPosts = () => {
    const savedItem: SavedPost = {
      id: `saved_${Date.now()}`,
      createdAt: new Date().toISOString(),
      topic: result.originalInput.topic,
      platform: activePlatform,
      headline: currentPost.headline,
      caption: currentPost.caption,
      hashtags: currentPost.hashtags,
      callToAction: currentPost.callToAction,
      imageUrl: currentPost.imageUrl,
      imagePrompt: currentPost.imagePrompt,
      postType: result.originalInput.postType,
      tone: result.originalInput.tone,
    };
    onSavePost(savedItem);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const fullPostCopyText = `${currentPost.headline}\n\n${currentPost.caption}\n\n👉 ${currentPost.callToAction}\n\n${currentPost.hashtags.map((h) => `#${h}`).join(' ')}`;

  const platformsList: { key: PlatformKey; label: string; icon: string }[] = [
    { key: 'instagram', label: 'Instagram', icon: '📸' },
    { key: 'facebook', label: 'Facebook', icon: '👥' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { key: 'x', label: 'X (Twitter)', icon: '⚡' },
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar with Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready-to-Post AI Content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            {result.originalInput.topic || 'Social Media Campaign'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tailored for {result.originalInput.targetAudience} · Tone: {result.originalInput.tone}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>

          <button
            onClick={handleSaveToMyPosts}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
            <span>Save to My Posts</span>
          </button>

          <button
            onClick={handleDownloadPostText}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download TXT</span>
          </button>

          <button
            onClick={onNewPost}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Create Another</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Save Notification Toast */}
      {savedNotification && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Post saved successfully to "My Posts"! Access it anytime from the top bar.</span>
          </div>
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">Stored Locally</span>
        </div>
      )}

      {/* Platform Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl flex items-center gap-1 overflow-x-auto">
        {platformsList.map((p) => {
          const isSelected = activePlatform === p.key;
          return (
            <button
              key={p.key}
              onClick={() => handlePlatformChange(p.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Layout: Content & Visuals (Left) + Realistic Live Social Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Content Section & Visual Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Post Content Box */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            
            {/* Header with edit toggle & version switchers */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-white">Generated Post Copy</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Length Switcher */}
                <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center text-xs">
                  <button
                    onClick={() => handleApplyVersion('standard')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      activeVersion === 'standard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Optimal
                  </button>
                  <button
                    onClick={() => handleApplyVersion('short')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      activeVersion === 'short' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Short
                  </button>
                  <button
                    onClick={() => handleApplyVersion('long')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      activeVersion === 'long' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Long
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isEditing
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Editing' : 'Edit Post'}</span>
                </button>
              </div>
            </div>

            {/* Editable or Display View */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Headline</label>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Caption / Main Content</label>
                  <textarea
                    rows={6}
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Call To Action (CTA)</label>
                    <input
                      type="text"
                      value={editCta}
                      onChange={(e) => setEditCta(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hashtags (comma separated)</label>
                    <input
                      type="text"
                      value={editHashtags}
                      onChange={(e) => setEditHashtags(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    Update Post
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Headline */}
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Headline / Hook
                  </div>
                  <p className="text-sm font-semibold text-white">{currentPost.headline}</p>
                </div>

                {/* Caption */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Main Caption</span>
                    <button
                      onClick={() => handleCopy(currentPost.caption, 'caption')}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium normal-case"
                    >
                      {copiedKey === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'caption' ? 'Copied!' : 'Copy Caption'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentPost.caption}
                  </p>
                </div>

                {/* CTA & Hashtags Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Call To Action
                    </span>
                    <p className="text-xs font-medium text-indigo-300">{currentPost.callToAction}</p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Hashtags
                      </span>
                      <button
                        onClick={() => handleCopy(currentPost.hashtags.map((h) => `#${h}`).join(' '), 'hashtags')}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                      >
                        {copiedKey === 'hashtags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'hashtags' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentPost.hashtags.map((h, i) => (
                        <span key={i} className="text-[11px] text-slate-300 hover:text-indigo-300">
                          #{h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Copy Action Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => handleCopy(fullPostCopyText, 'fullpost')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    {copiedKey === 'fullpost' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'fullpost' ? 'Full Post Copied!' : 'Copy Full Post'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(currentPost.caption, 'caption-btn')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {copiedKey === 'caption-btn' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Copy Caption Only</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Visual Section & Image Controls */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-white">Visual Assets & Art Direction</h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                Source: {currentPost.imageSource === 'upload' ? 'User Upload' : currentPost.imageSource === 'ai' ? 'Context Visual' : 'Prompt Direction'}
              </span>
            </div>

            {/* Visual thumbnail & control buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Thumbnail */}
              <div className="sm:col-span-5 relative aspect-video sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md group">
                {currentPost.imageUrl ? (
                  <>
                    <img
                      src={currentPost.imageUrl}
                      alt="Visual"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={handleDownloadImage}
                        className="p-2 rounded-lg bg-black/70 text-white hover:bg-black/90"
                        title="Download image"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-500">
                    <Camera className="w-8 h-8 mb-2 text-slate-600" />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>

              {/* Controls Column */}
              <div className="sm:col-span-7 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">Concept: </span>
                  {currentPost.visualConcept}
                </p>

                {/* Buttons row */}
                <div className="flex flex-wrap gap-2 pt-1">
                  
                  {/* Upload Image Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileChange}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{currentPost.imageUrl ? 'Replace Image' : 'Upload Image'}</span>
                  </button>

                  {/* Generate AI Image Button */}
                  <button
                    onClick={handleGenerateNewAiImage}
                    disabled={isGeneratingImg}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingImg ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingImg ? 'Generating...' : 'Generate New Image'}</span>
                  </button>

                  {/* Download Image Button */}
                  {currentPost.imageUrl && (
                    <button
                      onClick={handleDownloadImage}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Download</span>
                    </button>
                  )}

                  {/* Remove Image Button */}
                  {currentPost.imageUrl && (
                    <button
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* AI Image Generation Prompt Box */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Detailed AI Image-Generation Prompt
                </span>
                <button
                  onClick={() => handleCopy(currentPost.imagePrompt, 'imageprompt')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  {copiedKey === 'imageprompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'imageprompt' ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed select-all">
                {currentPost.imagePrompt}
              </p>
              <p className="text-[11px] text-slate-400">
                💡 Ready to paste into Midjourney, DALL-E 3, Imagen, or Stable Diffusion for bespoke custom assets.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Social Media Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-white">Realistic {platformsList.find((p) => p.key === activePlatform)?.label} Preview</h3>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                Interactive Mockup
              </span>
            </div>

            {/* Dynamic Platform Card Component */}
            <div className="transition-all duration-300">
              {activePlatform === 'instagram' && (
                <InstagramPreview post={currentPost} topic={result.originalInput.topic} />
              )}
              {activePlatform === 'facebook' && (
                <FacebookPreview post={currentPost} topic={result.originalInput.topic} />
              )}
              {activePlatform === 'linkedin' && (
                <LinkedInPreview post={currentPost} topic={result.originalInput.topic} />
              )}
              {activePlatform === 'x' && (
                <XPreview post={currentPost} topic={result.originalInput.topic} />
              )}
              {activePlatform === 'whatsapp' && (
                <WhatsAppPreview post={currentPost} topic={result.originalInput.topic} />
              )}
            </div>

            {/* Social Preview Advice Callout */}
            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">💡 Platform Best Practice:</p>
              <p className="text-[11px]">
                {activePlatform === 'instagram' && 'Instagram captions with strong hooks in the first 125 characters get 40% higher saves & shares.'}
                {activePlatform === 'facebook' && 'Conversational, story-based Facebook posts encourage more organic comments and group shares.'}
                {activePlatform === 'linkedin' && 'Spaced bullet points and clear problem-solution framing drive maximum connection rates.'}
                {activePlatform === 'x' && 'Punchy tweets under 200 characters have 21% higher engagement on X/Twitter.'}
                {activePlatform === 'whatsapp' && 'Personal greetings and clear bold highlights make WhatsApp broadcasts easy to forward.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
