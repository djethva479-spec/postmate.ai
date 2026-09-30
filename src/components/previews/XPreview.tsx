import React, { useState } from 'react';
import { 
  MessageCircle, 
  Repeat, 
  Heart, 
  Bookmark, 
  Share, 
  MoreHorizontal, 
  CheckCircle2, 
  BarChart2 
} from 'lucide-react';
import { PlatformPostContent } from '../../types';

interface XPreviewProps {
  post: PlatformPostContent;
  topic: string;
}

export const XPreview: React.FC<XPreviewProps> = ({ post, topic }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(892);
  const [retweeted, setRetweeted] = useState(false);
  const [retweetCount, setRetweetCount] = useState(145);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleRetweet = () => {
    if (retweeted) {
      setRetweeted(false);
      setRetweetCount((prev) => prev - 1);
    } else {
      setRetweeted(true);
      setRetweetCount((prev) => prev + 1);
    }
  };

  const displayName = topic || 'Tech Innovator';
  const handle = topic
    ? topic.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 14)
    : 'techinnovator';

  return (
    <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto text-slate-100 select-none">
      {/* Top author row */}
      <div className="p-4 pb-2 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm border border-slate-700">
            {displayName.charAt(0) || 'X'}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                {displayName}
              </span>
              <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400" />
            </div>
            <p className="text-xs text-slate-400">@{handle}</p>
          </div>
        </div>

        <button className="text-slate-500 hover:text-slate-300 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Tweet Body */}
      <div className="px-4 py-2 text-sm text-slate-100 leading-relaxed whitespace-pre-line space-y-2">
        <p>{post.caption}</p>

        {post.hashtags && post.hashtags.length > 0 && (
          <p className="text-sky-400 text-xs pt-1">
            {post.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join(' ')}
          </p>
        )}
      </div>

      {/* Tweet Media */}
      {post.imageUrl && (
        <div className="px-4 py-1.5">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={post.imageUrl}
              alt={post.headline}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Timestamp & Views */}
      <div className="px-4 py-2 text-[11px] text-slate-500 flex items-center gap-2 border-b border-slate-800/80">
        <span>10:30 AM</span>
        <span>·</span>
        <span>Sep 30, 2026</span>
        <span>·</span>
        <span className="font-semibold text-slate-300">48.2K</span>
        <span>Views</span>
      </div>

      {/* Action Metrics Row */}
      <div className="px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group">
          <div className="p-1.5 rounded-full group-hover:bg-sky-500/10">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span>38</span>
        </button>

        <button
          onClick={handleRetweet}
          className={`flex items-center gap-1.5 transition-colors group ${
            retweeted ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
          }`}
        >
          <div className="p-1.5 rounded-full group-hover:bg-emerald-500/10">
            <Repeat className="w-4 h-4" />
          </div>
          <span>{retweetCount}</span>
        </button>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors group ${
            liked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
          }`}
        >
          <div className="p-1.5 rounded-full group-hover:bg-rose-500/10">
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
          </div>
          <span>{likeCount}</span>
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`flex items-center gap-1.5 transition-colors group ${
            bookmarked ? 'text-sky-400' : 'hover:text-sky-400'
          }`}
        >
          <div className="p-1.5 rounded-full group-hover:bg-sky-500/10">
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-sky-400' : ''}`} />
          </div>
        </button>

        <button className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
          <Share className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
