export enum Technicality {
  General = 1,
  Practical = 2,
  Intermediate = 3,
  Advanced = 4,
  Expert = 5
}

export enum ResourceType {
  Newsletter = 'Newsletter',
  Podcast = 'Podcast',
  YouTube = 'YouTube',
  Blog = 'Blog',
  Social = 'Social Media'
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: ResourceType;
  technicality: Technicality;
  author?: string;
}

export type SortOption = 'default' | 'technicality-asc' | 'technicality-desc';
export type ViewMode = 'narrative' | 'database'; // Deprecated in new layout but kept for type safety if needed
export type Page = 'home' | 'newsletters' | 'podcasts' | 'youtube' | 'blogs' | 'social' | 'browse_all' | 'favorites';
