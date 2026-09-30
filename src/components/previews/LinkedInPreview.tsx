import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Plus, 
  MoreHorizontal, 
  Globe2,
  CheckCircle2
} from 'lucide-react';
import { PlatformPostContent } from '../../types';

interface LinkedInPreviewProps {
  post: PlatformPostContent;
  topic: string;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({ post, topic }) => {
  const [reacted, setReacted] = useState(false);
  const [reactCount, setReactCount] = useState(247);
  const [following, setFollowing] = useState(false);

  const handleReact = () => {
    if (reacted) {
      setReacted(false);
      setReactCount((prev) => prev - 1);
    } else {
      setReacted(true);
      setReactCount((prev) => prev + 1);
    }
  };

  const companyName = topic || 'Enterprise Brand';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto text-slate-100 select-none">
      {/* Header */}
      <div className="p-4 flex items-start justify-between border-b border-slate-800/60">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-tr from-sky-700 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
            {companyName.charAt(0) || 'L'}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-semibold text-white tracking-tight">{companyName}</h4>
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
              <span className="text-[11px] text-slate-400">· 1st</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              Building next-generation solutions for forward-thinking organizations
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
              <span>3h</span>
              <span>·</span>
              <span>Edited</span>
              <span>·</span>
              <Globe2 className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFollowing(!following)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              following
                ? 'bg-slate-800 text-slate-300'
                : 'text-sky-400 hover:bg-sky-950/40 border border-sky-500/30'
            }`}
          >
            {!following && <Plus className="w-3.5 h-3.5" />}
            <span>{following ? 'Following' : 'Follow'}</span>
          </button>
          <button className="text-slate-400 hover:text-white p-1">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Post Content */}
      <div className="p-4 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
        <p className="font-semibold text-white">{post.headline}</p>
        <p>{post.caption}</p>

        {post.hashtags && post.hashtags.length > 0 && (
          <p className="text-sky-400 font-medium text-xs pt-1">
            {post.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join(' ')}
          </p>
        )}
      </div>

      {/* Visual Media Container */}
      {post.imageUrl && (
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-t border-b border-slate-800">
          <img
            src={post.imageUrl}
            alt={post.headline}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Social Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center -space-x-1">
            <span className="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-[9px] text-white">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white">
              💡
            </span>
            <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] text-white">
              🎯
            </span>
          </div>
          <span className="text-slate-300 font-medium">{reactCount}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>36 comments</span>
          <span>12 reposts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 grid grid-cols-4 gap-1">
        <button
          onClick={handleReact}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            reacted ? 'text-sky-400 font-semibold bg-sky-950/30' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${reacted ? 'fill-sky-400' : ''}`} />
          <span>Like</span>
        </button>

        <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Comment</span>
        </button>

        <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
          <Repeat2 className="w-3.5 h-3.5" />
          <span>Repost</span>
        </button>

        <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
