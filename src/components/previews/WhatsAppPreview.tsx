import React from 'react';
import { CheckCheck, Phone, Video, MoreVertical, Paperclip, Send } from 'lucide-react';
import { PlatformPostContent } from '../../types';

interface WhatsAppPreviewProps {
  post: PlatformPostContent;
  topic: string;
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ post, topic }) => {
  const contactName = topic || 'Special Updates';

  return (
    <div className="bg-[#0b141a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto text-slate-100 select-none">
      {/* WhatsApp Chat Header */}
      <div className="bg-[#202c33] px-3.5 py-2.5 flex items-center justify-between text-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            {contactName.charAt(0) || 'W'}
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-100 leading-tight">{contactName}</h4>
            <p className="text-[10px] text-slate-400">online</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 text-slate-300">
          <Video className="w-4 h-4 cursor-pointer hover:text-white" />
          <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Chat Area with WhatsApp Wallpaper feel */}
      <div className="p-3.5 space-y-3 bg-[#0c1317] min-h-[380px] flex flex-col justify-end bg-gradient-to-b from-[#0b141a] to-[#080d10]">
        
        {/* Date pill */}
        <div className="flex justify-center">
          <span className="bg-[#182229] text-[#8696a0] text-[10px] font-medium px-2.5 py-1 rounded-md shadow-sm">
            TODAY
          </span>
        </div>

        {/* Message Bubble (Outgoing style in WhatsApp green) */}
        <div className="self-end max-w-[90%] sm:max-w-[85%] bg-[#005c4b] text-[#e9edef] rounded-xl rounded-tr-none p-2.5 shadow-md relative space-y-2">
          
          {/* Media image preview inside bubble */}
          {post.imageUrl && (
            <div className="rounded-lg overflow-hidden relative aspect-video bg-[#0b141a]">
              <img
                src={post.imageUrl}
                alt={post.headline}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Formatted Text */}
          <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed space-y-1.5 pt-1">
            <p className="font-bold text-white tracking-wide">{post.headline}</p>
            <p>{post.caption}</p>
          </div>

          {/* Link / CTA card inside bubble */}
          {post.callToAction && (
            <div className="mt-2 p-2 bg-[#025142] rounded-lg border border-[#014135] text-xs">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase tracking-wider">
                Direct Link / Action
              </span>
              <p className="text-slate-100 font-medium truncate">{post.callToAction}</p>
            </div>
          )}

          {/* Timestamp and Double Check Mark */}
          <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0] pt-1">
            <span>10:32 AM</span>
            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
          </div>
        </div>
      </div>

      {/* Input bar footer */}
      <div className="bg-[#202c33] p-2 flex items-center gap-2 text-slate-400">
        <Paperclip className="w-5 h-5 ml-1 text-[#8696a0] cursor-pointer hover:text-white" />
        <div className="flex-1 bg-[#2a3942] rounded-lg px-3 py-1.5 text-xs text-slate-300">
          Type a message...
        </div>
        <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white cursor-pointer hover:opacity-95">
          <Send className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
