import React, { useState } from 'react';
import { 
  Sparkles, 
  PenTool, 
  BookmarkCheck, 
  LayoutTemplate, 
  Settings, 
  Menu, 
  X,
  Share2,
  Zap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'create' | 'saved' | 'templates';
  setActiveTab: (tab: 'home' | 'create' | 'saved' | 'templates') => void;
  savedCount: number;
  onOpenSettings: () => void;
  onLoadDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSettings,
  onLoadDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'create' | 'saved' | 'templates') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                PostMate<span className="text-indigo-400">.AI</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Multi-Platform Social Content Engine
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNavClick('create')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Create Post</span>
          </button>

          <button
            onClick={() => handleNavClick('templates')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors relative ${
              activeTab === 'saved'
                ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Posts</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500 text-white leading-none">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/40 hover:border-indigo-400/50 transition-all cursor-pointer shadow-sm shadow-indigo-500/10"
            title="Load Coffee Shop Demo Brief and Generate"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Demo</span>
          </button>

          <button
            onClick={() => handleNavClick('create')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-md shadow-indigo-500/25 transition-all cursor-pointer hover:shadow-indigo-500/40 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors"
            title="Settings & System Info"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onLoadDemo}
            className="px-2.5 py-1 text-xs rounded-md bg-indigo-950/60 border border-indigo-500/40 text-indigo-300"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-850"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('create')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'create' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Create Post
            </span>
          </button>
          <button
            onClick={() => handleNavClick('templates')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'templates' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" />
              Templates
            </span>
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'saved' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4" />
              My Posts
            </span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500 text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSettings();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          >
            <Settings className="w-4 h-4" />
            Settings & Info
          </button>
        </div>
      )}
    </header>
  );
};
