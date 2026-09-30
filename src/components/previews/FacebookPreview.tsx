import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Globe, 
  MoreHorizontal, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { PlatformPostContent } from '../../types';

interface FacebookPreviewProps {
  post: PlatformPostContent;
  topic: string;
}

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({ post, topic }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(384);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const pageName = topic || 'Featured Brand';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto text-slate-100 select-none">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            {pageName.charAt(0) || 'F'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold text-white tracking-tight">{pageName}</h4>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-xs text-blue-400 font-medium cursor-pointer hover:underline">Follow</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>Just now</span>
              <span>·</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Text */}
      <div className="px-4 pb-3 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
        <p>{post.caption}</p>
        
        {post.hashtags && post.hashtags.length > 0 && (
          <p className="text-blue-400 font-medium text-xs">
            {post.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join(' ')}
          </p>
        )}
      </div>

      {/* Media Image */}
      {post.imageUrl && (
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.headline}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Link / CTA Bar */}
      <div className="p-3 bg-slate-850/80 border-t border-b border-slate-800 flex items-center justify-between">
        <div className="max-w-[70%]">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">OFFICIAL ANNOUNCEMENT</p>
          <p className="text-xs font-semibold text-slate-100 truncate">{post.headline}</p>
        </div>
        <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm">
          <span>{post.callToAction ? post.callToAction.split(' ')[0] + ' Now' : 'Learn More'}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Reactions Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center -space-x-1">
            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">
              <ThumbsUp className="w-2.5 h-2.5 fill-white" />
            </span>
            <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white">
              <Heart className="w-2.5 h-2.5 fill-white" />
            </span>
          </div>
          <span>{likeCount}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>48 comments</span>
          <span>19 shares</span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="px-2 py-1 grid grid-cols-3 gap-1">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-colors ${
            liked ? 'text-blue-400 font-semibold bg-blue-950/30' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-blue-400' : ''}`} />
          <span>Like</span>
        </button>

        <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>

        <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};
