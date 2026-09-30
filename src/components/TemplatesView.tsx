import React, { useState } from 'react';
import { LayoutTemplate, Sparkles, ArrowRight, Check, Search } from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templates';
import { TemplateItem, PostFormInput } from '../types';

interface TemplatesViewProps {
  onSelectTemplate: (input: Partial<PostFormInput>) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Business',
    'Product',
    'Event',
    'Festival',
    'Education',
    'Career',
    'Technology',
    'Food',
    'Travel',
    'Personal',
  ];

  const filteredTemplates = TEMPLATES_DATA.filter((tmpl) => {
    const matchesCategory = selectedCategory === 'All' || tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Curated Social Media Blueprints</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Social Post Templates
        </h1>
        <p className="text-sm text-slate-400">
          Pick a proven campaign template to auto-populate your generator with high-converting marketing structures.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-4">
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search templates by keyword, industry or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/10 group"
          >
            {/* Visual banner */}
            <div>
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src={template.previewVisual}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-300 border border-white/10 uppercase tracking-wider">
                  {template.badge}
                </div>

                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-slate-300">
                  {template.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {template.description}
                </p>

                {/* Previews brief info */}
                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <p className="truncate">
                    <span className="font-semibold text-slate-400">Tone: </span>
                    {template.sampleInput.tone}
                  </p>
                  <p className="truncate">
                    <span className="font-semibold text-slate-400">Sample: </span>
                    {template.sampleInput.topic}
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800">
              <button
                onClick={() => onSelectTemplate(template.sampleInput)}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-transparent text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
