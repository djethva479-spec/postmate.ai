import React, { useEffect, useState } from 'react';
import { X, Sparkles, Database, CheckCircle2, Shield, Info, Trash2, Cpu } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
  onClearStorage: () => void;
  onLoadDemo: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  savedCount,
  onClearStorage,
  onLoadDemo,
}) => {
  const [systemStatus, setSystemStatus] = useState<{
    hasApiKey: boolean;
    activeModel: string;
    imageModel: string;
  }>({
    hasApiKey: true,
    activeModel: 'gemini-3.8-flash',
    imageModel: 'gemini-3.1-flash-lite-image',
  });

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSystemStatus({
            hasApiKey: data.hasApiKey ?? true,
            activeModel: data.activeModel || 'gemini-3.8-flash',
            imageModel: data.imageModel || 'gemini-3.1-flash-lite-image',
          });
        }
      })
      .catch(() => {
        // Safe offline default
      });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">PostMate AI Settings</h3>
              <p className="text-[11px] text-slate-400">System diagnostics & local storage</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI & Engine Status */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              AI Generation Engine
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              Connected
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Text & Copy Model:</span>
              <span className="font-mono text-slate-200">{systemStatus.activeModel}</span>
            </div>
            <div className="flex justify-between">
              <span>Visual & Image Model:</span>
              <span className="font-mono text-slate-200">{systemStatus.imageModel}</span>
            </div>
            <div className="flex justify-between">
              <span>Multi-Platform Mode:</span>
              <span className="text-slate-200 font-medium">5 Channels Supported</span>
            </div>
          </div>
        </div>

        {/* Local Storage Info */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Local Storage Cache
            </span>
            <span className="text-xs font-medium text-slate-400">
              {savedCount} {savedCount === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            Generated and saved posts are kept strictly inside your browser's private local storage.
          </p>

          {savedCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Delete all saved posts from local storage?')) {
                  onClearStorage();
                }
              }}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-medium text-rose-400 border border-rose-500/20 hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Saved Posts Vault</span>
            </button>
          )}
        </div>

        {/* Instant Demo Trigger */}
        <div className="p-3.5 bg-indigo-950/30 rounded-2xl border border-indigo-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-indigo-200">Test Immediately</p>
            <p className="text-[11px] text-slate-400">Preload Coffee Shop Demo with 1 click</p>
          </div>
          <button
            onClick={() => {
              onClose();
              onLoadDemo();
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Launch Demo
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>No external publishing without your explicit manual review & copy.</span>
        </div>

      </div>
    </div>
  );
};
