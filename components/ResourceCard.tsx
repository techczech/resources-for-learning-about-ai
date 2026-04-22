import React from 'react';
import { ExternalLink, Heart, Bookmark } from 'lucide-react';
import { Resource, ResourceType, Technicality } from '../types';

interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  compact?: boolean;
}

const TechnicalityBadge = ({ level }: { level: Technicality }) => {
  const getColor = (lvl: Technicality) => {
    switch (lvl) {
      case Technicality.General: return 'bg-green-100 text-green-800 border-green-200';
      case Technicality.Practical: return 'bg-blue-100 text-blue-800 border-blue-200';
      case Technicality.Intermediate: return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case Technicality.Advanced: return 'bg-purple-100 text-purple-800 border-purple-200';
      case Technicality.Expert: return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabel = (lvl: Technicality) => {
    return Technicality[lvl];
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getColor(level)}`}>
      {getLabel(level)}
    </span>
  );
};

const TypeBadge = ({ type }: { type: ResourceType }) => {
    return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            {type}
        </span>
    )
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isFavorite, onToggleFavorite, compact }) => {
  return (
    <div className={`group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 ${compact ? 'p-3' : 'p-5'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-2">
            <TypeBadge type={resource.type} />
            <TechnicalityBadge level={resource.technicality} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(resource.id);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <Heart size={18} fill="currentColor" /> : <Heart size={18} />}
        </button>
      </div>

      <h3 className={`font-bold text-slate-900 mb-1 ${compact ? 'text-md' : 'text-lg'}`}>
        {resource.title}
      </h3>
      
      {resource.author && (
        <p className="text-xs text-slate-500 mb-2 font-medium">by {resource.author}</p>
      )}

      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
        {resource.description}
      </p>

      <div className="mt-auto pt-2">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors gap-2 group-hover:gap-3"
        >
          Visit Resource
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
