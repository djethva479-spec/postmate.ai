import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Image as ImageIcon, 
  Hash, 
  Copy, 
  Check, 
  Zap, 
  Share2, 
  ShieldCheck, 
  Compass,
  MessageSquare,
  Wand2
} from 'lucide-react';
import { InstagramPreview } from './previews/InstagramPreview';
import { PlatformPostContent } from '../types';

interface HeroLandingProps {
  onStartCreate: () => void;
  onTryDemo: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartCreate,
  onTryDemo,
}) => {
  const [copiedTeaser, setCopiedTeaser] = useState(false);

  // Sample hero mockup post
  const demoTeaserPost: PlatformPostContent = {
    platform: 'instagram',
    headline: '✨ Fresh Artisanal Brews & Cozy Workspace Now Open!',
    caption: `Say hello to your new favorite study and espresso sanctuary ☕

We are officially open on Campus Blvd! Handcrafted single-origin roasts, warm freshly baked pastries, and lightning-fast Wi-Fi.

🎓 College students: Show your valid student ID for an exclusive 20% discount on all espresso drinks this week!`,
    shortVersion: 'New coffee nook is officially open! 20% student discount all week long. ☕',
    longVersion: 'Big announcement: Roast & Bloom Coffee Co. is open...',
    callToAction: 'Visit us this Sunday and claim your 20% student discount!',
    hashtags: ['specialtycoffee', 'coffeeshop', 'latteart', 'studyspace', 'campuslife'],
    visualConcept: 'Sunny morning artisanal coffee shop with latte art on reclaimed wood table and students chatting in soft focus.',
    imagePrompt: 'Cinematic photograph of a cozy modern coffee shop during a sunny morning grand opening, artisan ceramic latte art cup on a reclaimed wooden table, warm ambient lighting, blurred background of smiling students chatting, 35mm lens, high detail, f/1.8.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'ai',
  };

  const handleCopyTeaser = () => {
    navigator.clipboard.writeText(`${demoTeaserPost.caption}\n\n👉 ${demoTeaserPost.callToAction}\n\n#specialtycoffee #latteart`);
    setCopiedTeaser(true);
    setTimeout(() => setCopiedTeaser(false), 2000);
  };

  const features = [
    {
      title: 'AI Captions',
      desc: 'Engaging, platform-optimized copy with magnetic hooks, tailored tone, and suitable emojis.',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Smart Visuals',
      desc: 'Context-aware matching photography, user uploads preservation, and art direction.',
      icon: ImageIcon,
      color: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Multi-Platform Posts',
      desc: 'Enter your brief once. Automatically generate distinct versions for Instagram, Facebook, LinkedIn, X, and WhatsApp.',
      icon: Layers,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Hashtag Assistant',
      desc: 'Platform-calibrated, high-reach hashtag recommendations without spam or noise.',
      icon: Hash,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'AI Image Prompts',
      desc: 'Camera-specific, lighting-detailed prompts ready to copy into Midjourney, DALL-E, or Imagen.',
      icon: Wand2,
      color: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Ready-to-Post Content',
      desc: 'Instant 1-click copy, download text/image cards, and realistic social media previews.',
      icon: Copy,
      color: 'from-sky-500 to-cyan-500',
    },
  ];

  return (
    <div className="space-y-24 py-10 md:py-16">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Social Creator Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Create Better Social Posts in <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Seconds</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Turn your ideas into platform-ready content and visuals with AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartCreate}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Create Your Post</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTryDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:bg-slate-800 hover:border-indigo-400 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Try Demo</span>
              </button>
            </div>

            {/* Micro stats / Trust badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>5 Major Platforms (Instagram, FB, LinkedIn, X, WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Context-Aware Matching Visuals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                <span>Zero Hallucinated Facts</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Teaser: Interactive Realistic Instagram Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
            <div className="relative">
              <InstagramPreview post={demoTeaserPost} topic="Roast & Bloom Coffee" />

              {/* Floating feature pill */}
              <div className="absolute -bottom-4 -left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">1-Click Multi-Platform</p>
                  <p className="text-[10px] text-slate-400">Optimized length & tone per channel</p>
                </div>
              </div>

              {/* Quick Copy Demo Button on card */}
              <div className="absolute -top-3 -right-3">
                <button
                  onClick={handleCopyTeaser}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedTeaser ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTeaser ? 'Copied!' : 'Copy Demo'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Built for Modern Marketers, Founders & Creators</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Everything You Need for High-Impact Social Presence
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Stop switching between copywriting apps, design templates, and note files. PostMate AI generates complete packages instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 space-y-3.5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 1-Input to 5-Platforms Workflow Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              The PostMate Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              One Input → Five Tailored Channels
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              No generic re-posts. Instagram gets punchy visual hooks and hashtags. LinkedIn gets structured thought leadership. Facebook gets conversational paragraphs. X gets viral brevity. WhatsApp gets formatted broadcast bullets.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartCreate}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Launch Creator Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
