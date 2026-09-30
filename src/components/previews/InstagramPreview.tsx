import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  CheckCircle2, 
  Sparkles,
  Smile
} from 'lucide-react';
import { PlatformPostContent } from '../../types';

interface InstagramPreviewProps {
  post: PlatformPostContent;
  topic: string;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ post, topic }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1482);
  const [bookmarked, setBookmarked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const username = topic
    ? topic.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 16)
    : 'brand_creator';

  const captionText = post.caption || '';
  const isLong = captionText.length > 180;
  const displayCaption = !expanded && isLong ? `${captionText.substring(0, 180)}...` : captionText;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto text-slate-100 select-none">
      {/* Header */}
      <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-white uppercase">
                {username.charAt(0) || 'B'}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-white tracking-tight">{username}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
            </div>
            <p className="text-[10px] text-slate-400">Original audio · Sponsored</p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Media Image */}
      <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.headline}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            <Sparkles className="w-10 h-10 text-indigo-400 mb-3 animate-pulse" />
            <p className="text-sm font-semibold text-slate-200">{post.headline}</p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">{post.visualConcept}</p>
          </div>
        )}

        {/* Platform watermark indicator */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-slate-300 border border-white/10">
          Instagram Feed
        </div>
      </div>

      {/* Engagement Actions */}
      <div className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`transition-transform active:scale-125 ${
                liked ? 'text-rose-500 fill-rose-500' : 'text-slate-200 hover:text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-rose-500' : ''}`} />
            </button>
            <button className="text-slate-200 hover:text-white">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-slate-200 hover:text-white">
              <Send className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`transition-colors ${
              bookmarked ? 'text-amber-400 fill-amber-400' : 'text-slate-200 hover:text-white'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-xs font-semibold text-slate-100">
          {likesCount.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="text-xs text-slate-200 leading-relaxed space-y-1">
          <p className="whitespace-pre-line">
            <span className="font-semibold text-white mr-1.5">{username}</span>
            {displayCaption}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] text-slate-400 hover:text-slate-300 font-medium block"
            >
              {expanded ? 'Show less' : '...more'}
            </button>
          )}

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <p className="text-indigo-400 text-xs pt-1 flex flex-wrap gap-1">
              {post.hashtags.map((tag, idx) => (
                <span key={idx} className="hover:underline cursor-pointer">
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Comments teaser */}
        <p className="text-[11px] text-slate-500 cursor-pointer hover:text-slate-400 pt-0.5">
          View all 42 comments
        </p>

        {/* Add comment mock bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-slate-500" />
            <span>Add a comment...</span>
          </div>
          <span className="text-indigo-400 font-semibold cursor-pointer">Post</span>
        </div>

        {/* Timestamp */}
        <p className="text-[9px] uppercase tracking-wider text-slate-500">
          2 HOURS AGO
        </p>
      </div>
    </div>
  );
};
