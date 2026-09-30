import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Upload, 
  Trash2, 
  Wand2, 
  HelpCircle, 
  Check, 
  Zap, 
  Layers,
  ArrowRight,
  Lightbulb,
  Camera
} from 'lucide-react';
import { PostFormInput, PlatformOption, PostType, ToneType } from '../types';

interface PostFormProps {
  initialValues?: Partial<PostFormInput>;
  onGenerate: (input: PostFormInput) => void;
  isLoading: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  onGenerate,
  isLoading,
}) => {
  const [platform, setPlatform] = useState<PlatformOption>(initialValues?.platform || 'all');
  const [postType, setPostType] = useState<PostType>(initialValues?.postType || 'Product Promotion');
  const [topic, setTopic] = useState(initialValues?.topic || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [targetAudience, setTargetAudience] = useState(initialValues?.targetAudience || '');
  const [mainMessage, setMainMessage] = useState(initialValues?.mainMessage || '');
  const [tone, setTone] = useState<ToneType>(initialValues?.tone || 'Friendly');
  const [callToAction, setCallToAction] = useState(initialValues?.callToAction || '');
  const [price, setPrice] = useState(initialValues?.price || '');
  const [contactInfo, setContactInfo] = useState(initialValues?.contactInfo || '');
  const [additionalInstructions, setAdditionalInstructions] = useState(initialValues?.additionalInstructions || '');
  const [visualOption, setVisualOption] = useState<'generate' | 'upload' | 'suggest'>(initialValues?.visualOption || 'generate');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | undefined>(initialValues?.customUploadedImage);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const platforms: { id: PlatformOption; label: string; icon: string; desc: string }[] = [
    { id: 'all', label: 'All Platforms', icon: '✨', desc: 'Auto-generates tailored posts for all 5 platforms' },
    { id: 'instagram', label: 'Instagram', icon: '📸', desc: 'Aesthetic caption, visual hook & hashtags' },
    { id: 'facebook', label: 'Facebook', icon: '👥', desc: 'Conversational, community-driven' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼', desc: 'Professional, thought leadership' },
    { id: 'x', label: 'X (Twitter)', icon: '⚡', desc: 'Punchy, viral & concise' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Direct, promotional message' },
  ];

  const postTypes: PostType[] = [
    'Product Promotion',
    'Business Announcement',
    'Event',
    'Educational',
    'Personal',
    'Festival/Celebration',
    'Job/Career',
    'Offer/Sale',
    'New Product',
    'Restaurant/Food',
    'Travel',
    'Technology',
    'Custom',
  ];

  const tones: { id: ToneType; label: string; emoji: string }[] = [
    { id: 'Professional', label: 'Professional', emoji: '👔' },
    { id: 'Friendly', label: 'Friendly', emoji: '😊' },
    { id: 'Funny', label: 'Funny', emoji: '😄' },
    { id: 'Inspirational', label: 'Inspirational', emoji: '🌟' },
    { id: 'Luxury', label: 'Luxury', emoji: '💎' },
    { id: 'Casual', label: 'Casual', emoji: '☕' },
    { id: 'Exciting', label: 'Exciting', emoji: '🔥' },
    { id: 'Minimal', label: 'Minimal', emoji: '⚪' },
    { id: 'Creative', label: 'Creative', emoji: '🎨' },
  ];

  const quickDemoIdeas = [
    {
      label: '☕ Coffee Shop Grand Opening',
      topic: 'Roast & Bloom Coffee Co.',
      description: 'Grand opening this Sunday with hand-poured artisanal brews, fresh pastries, and 20% discount for college students with valid ID.',
      targetAudience: 'College students, remote workers, coffee lovers',
      mainMessage: 'Your cozy new study nook and specialty espresso bar.',
      tone: 'Friendly' as ToneType,
      cta: 'Visit us this Sunday and grab 20% off!',
      price: 'Drinks starting at $3.50 · 20% Student Discount',
      contact: '104 Campus Blvd · @roastandbloom · roastandbloom.com',
      postType: 'Restaurant/Food' as PostType,
    },
    {
      label: '🏋️ 30% Gym Membership Sale',
      topic: 'IronCore Athletic Club',
      description: 'Spring fitness sale: 30% off annual memberships this week only with zero join fee and free personal fitness assessment.',
      targetAudience: 'Busy professionals and beginners looking to get in shape',
      mainMessage: 'Transform your body with state-of-the-art facilities.',
      tone: 'Exciting' as ToneType,
      cta: 'Claim your 30% discount pass before Friday midnight!',
      price: '$49/mo (Reg $70/mo) · Save 30%',
      contact: 'www.ironcorefitness.com/pass · Call (555) 019-2834',
      postType: 'Offer/Sale' as PostType,
    },
    {
      label: '✨ Diwali Festive Fashion Sale',
      topic: 'Aura Ethnic Couture - Festive Collection',
      description: 'Grand Diwali celebration sale featuring handcrafted silk sarees, kurtas, and festive jewelry sets with up to 40% discount.',
      targetAudience: 'Families, wedding shoppers, festive celebrators',
      mainMessage: 'Celebrate the festival of lights in royal handcrafted elegance.',
      tone: 'Luxury' as ToneType,
      cta: 'Explore our Diwali edit in-store & online with free festive gift box!',
      price: 'Up to 40% Off · Gift sets from $45',
      contact: 'www.auracouture.com/diwali · WhatsApp: +1 555-777-FEST',
      postType: 'Festival/Celebration' as PostType,
    },
  ];

  const handleApplyDemo = (demo: typeof quickDemoIdeas[0]) => {
    setTopic(demo.topic);
    setDescription(demo.description);
    setTargetAudience(demo.targetAudience);
    setMainMessage(demo.mainMessage);
    setTone(demo.tone);
    setCallToAction(demo.cta);
    setPrice(demo.price);
    setContactInfo(demo.contact);
    setPostType(demo.postType);
    setVisualOption('generate');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      alert('Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUploadedImagePreview(base64);
      setVisualOption('upload');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert('Please enter a Topic or Product Name.');
      return;
    }
    if (!description.trim()) {
      alert('Please provide a brief Description.');
      return;
    }

    onGenerate({
      platform,
      postType,
      topic,
      description,
      targetAudience: targetAudience || 'General Audience',
      mainMessage: mainMessage || topic,
      tone,
      callToAction: callToAction || 'Check it out now!',
      price,
      contactInfo,
      additionalInstructions,
      visualOption,
      customUploadedImage: uploadedImagePreview,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header section */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>PostMate Creator Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Create Platform-Ready Social Posts
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          One Idea → One Click → Multiple Platforms + Matching Visuals.
        </p>
      </div>

      {/* Quick Load Example Chips */}
      <div className="mb-8 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Test with Real-World Briefs:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickDemoIdeas.map((demo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyDemo(demo)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-950/50 hover:border-indigo-500/40 text-slate-200 border border-slate-700/60 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{demo.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Platform Selection */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
              Select Target Platform
            </label>
            <span className="text-xs text-indigo-400 font-medium">
              {platform === 'all' ? 'Multi-Platform Mode Active' : 'Single Platform Mode'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {platforms.map((p) => {
              const isSelected = platform === p.id;
              const isAll = p.id === 'all';
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? isAll
                        ? 'bg-gradient-to-r from-indigo-950/80 to-violet-950/80 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                        : 'bg-indigo-600/15 border-indigo-500 ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {isAll && (
                    <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-full bg-indigo-500 text-[9px] font-bold text-white uppercase tracking-wider shadow">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{p.icon}</span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {p.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{p.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Post Type */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs font-bold">2</span>
            Select Post Category / Purpose
          </label>

          <div className="flex flex-wrap gap-2">
            {postTypes.map((type) => {
              const isSelected = postType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Information & Brief */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs font-bold">3</span>
            Post Details & Information
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Topic / Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Topic / Product / Announcement Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Roast & Bloom Coffee Co. Grand Opening"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Description / Key Details <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Grand opening this Sunday with 20% discount for college students with valid ID. Single-origin roasts and freshly baked pastries."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. College students, local foodies, remote workers"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Main Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Main Message / Value Proposition
              </label>
              <input
                type="text"
                value={mainMessage}
                onChange={(e) => setMainMessage(e.target.value)}
                placeholder="e.g. Your neighborhood sanctuary for premium coffee and quiet study"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Call To Action */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Call To Action (CTA)
              </label>
              <input
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder="e.g. Visit us this Sunday to claim your discount!"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Price (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Price / Offer (Optional)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 20% off all beverages · Starting at $3.50"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Contact / Website (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Website / Contact Information (Optional)
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="e.g. www.roastandbloom.com · 104 Campus Blvd"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Additional Instructions */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Additional Instructions (Optional)
              </label>
              <input
                type="text"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Emphasize cozy vibe, free Wi-Fi, and ethical single-origin beans"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Tone Selector */}
          <div className="pt-3 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Desired Tone
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {tones.map((t) => {
                const isSelected = tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`py-2 px-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{t.emoji}</span>
                    <span className="text-[11px] truncate block">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 4: Visuals & Image Options */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs font-bold">4</span>
              Visual Strategy (Choose One)
            </label>
            <span className="text-xs text-slate-400">Context-Aware Matching</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Generate AI Image */}
            <button
              type="button"
              onClick={() => setVisualOption('generate')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                visualOption === 'generate'
                  ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Generate AI Image</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                AI analyzes your topic & tone to prepare a matching visual (e.g. coffee shop, gym, Diwali, tech).
              </p>
            </button>

            {/* Upload My Image */}
            <button
              type="button"
              onClick={() => {
                setVisualOption('upload');
                fileInputRef.current?.click();
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                visualOption === 'upload'
                  ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Upload className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-white">Upload My Image</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Upload your brand graphic or product photo (JPG, PNG, WEBP). Stays completely untouched.
              </p>
            </button>

            {/* Suggest Visual */}
            <button
              type="button"
              onClick={() => setVisualOption('suggest')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                visualOption === 'suggest'
                  ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Suggest Visual & Prompt</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                AI suggests art direction and gives a ready-to-copy prompt for external tools.
              </p>
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
          />

          {/* Uploaded Preview Display */}
          {uploadedImagePreview && visualOption === 'upload' && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={uploadedImagePreview}
                  alt="Uploaded"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                />
                <div>
                  <p className="text-xs font-semibold text-white">Custom Image Attached</p>
                  <p className="text-[10px] text-slate-400">Ready to embed in social previews</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedImagePreview(undefined);
                    setVisualOption('generate');
                  }}
                  className="p-1.5 text-xs rounded-md text-rose-400 hover:bg-rose-950/40"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Large Prominent Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-display text-base sm:text-lg font-bold shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                <span>Crafting High-Converting Social Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>
                  {platform === 'all'
                    ? 'Generate for All 5 Platforms + Matching Visual'
                    : `Generate ${platform.toUpperCase()} Post + Matching Visual`}
                </span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            No proprietary publishing credentials needed · Instant ready-to-copy output with social mockups.
          </p>
        </div>

      </form>
    </div>
  );
};
