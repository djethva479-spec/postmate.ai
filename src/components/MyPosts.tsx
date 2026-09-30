import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Copy, 
  Check, 
  Eye, 
  Search, 
  Filter, 
  ExternalLink, 
  PenTool,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SavedPost, PlatformKey } from '../types';

interface MyPostsProps {
  posts: SavedPost[];
  onDeletePost: (id: string) => void;
  onClearAll: () => void;
  onOpenPost: (post: SavedPost) => void;
  onCreateNew: () => void;
}

export const MyPosts: React.FC<MyPostsProps> = ({
  posts,
  onDeletePost,
  onClearAll,
  onOpenPost,
  onCreateNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformKey>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPost = (post: SavedPost) => {
    const text = `${post.headline}\n\n${post.caption}\n\n👉 ${post.callToAction}\n\n${post.hashtags.map((h) => `#${h}`).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformIcon = (key: PlatformKey) => {
    switch (key) {
      case 'instagram': return '📸';
      case 'facebook': return '👥';
      case 'linkedin': return '💼';
      case 'x': return '⚡';
      case 'whatsapp': return '💬';
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Local Post Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            My Saved Posts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} stored securely in your browser's local memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {posts.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved posts?')) {
                  onClearAll();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-lg border border-rose-500/20 hover:bg-rose-950/30 transition-colors"
            >
              Clear All
            </button>
          )}

          <button
            onClick={onCreateNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Create New Post</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search saved posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Platform filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {(['all', 'instagram', 'facebook', 'linkedin', 'x', 'whatsapp'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize transition-colors ${
                platformFilter === p
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p === 'all' ? 'All' : `${getPlatformIcon(p)} ${p}`}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
            >
              {/* Card Header & Media preview */}
              <div>
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.topic}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">
                      No Media Attached
                    </div>
                  )}

                  {/* Platform Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10 flex items-center gap-1.5 shadow">
                    <span>{getPlatformIcon(post.platform)}</span>
                    <span className="capitalize">{post.platform}</span>
                  </div>

                  {/* Date badge */}
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] text-slate-300">
                    {formatDate(post.createdAt)}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-2.5">
                  <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {post.headline || post.topic}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.hashtags.slice(0, 3).map((h, i) => (
                        <span key={i} className="text-[10px] text-indigo-400">
                          #{h}
                        </span>
                      ))}
                      {post.hashtags.length > 3 && (
                        <span className="text-[10px] text-slate-500">
                          +{post.hashtags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onOpenPost(post)}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Preview</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyPost(post)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copy full post"
                  >
                    {copiedId === post.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">No Saved Posts Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Generate any social post and click "Save to My Posts" on the results page to store it here for future reference.
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-1.5"
          >
            <span>Create Your First Post</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
