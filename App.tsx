import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  LayoutGrid, 
  Filter, 
  ArrowUpDown, 
  Heart, 
  Info,
  Menu,
  X,
  Search,
  Mail,
  Mic,
  Youtube,
  PenTool,
  Share2,
  Home,
  ChevronRight
} from 'lucide-react';
import { RESOURCES, CATEGORY_IDS } from './data';
import { Resource, ResourceType, Technicality, SortOption, Page } from './types';
import ResourceCard from './components/ResourceCard';

// ----------------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------------

interface NarrativeSectionProps {
  children?: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const NarrativeSection = ({ children, title, icon }: NarrativeSectionProps) => (
  <section className="mb-12 max-w-4xl mx-auto">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
      {icon && <div className="text-indigo-600">{icon}</div>}
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
      {children}
    </div>
  </section>
);

interface NarrativeSubSectionProps {
  title: string;
  children?: React.ReactNode;
}

const NarrativeSubSection = ({ title, children }: NarrativeSubSectionProps) => (
  <div className="mb-10">
    <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">{title}</h3>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Main App Component
// ----------------------------------------------------------------------

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Explorer State
  const [activeFilter, setActiveFilter] = useState<ResourceType | 'All' | 'Favorites'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Load favorites
  useEffect(() => {
    const stored = localStorage.getItem('ai_learning_favorites');
    if (stored) {
      try {
        setFavorites(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [activePage]);

  // Save favorites
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem('ai_learning_favorites', JSON.stringify(Array.from(newFavorites)));
  };

  // ----------------------------------------------------------------------
  // Data Logic
  // ----------------------------------------------------------------------

  const filteredResources = useMemo(() => {
    let result = [...RESOURCES];

    // Filter by Type (for Browse All page)
    if (activePage === 'favorites') {
        result = result.filter(r => favorites.has(r.id));
    } else if (activePage === 'browse_all') {
        if (activeFilter === 'Favorites') {
            result = result.filter(r => favorites.has(r.id));
        } else if (activeFilter !== 'All') {
            result = result.filter(r => r.type === activeFilter);
        }
    } else {
        // For specific pages, pre-filter by type
        switch (activePage) {
            case 'newsletters': result = result.filter(r => r.type === ResourceType.Newsletter); break;
            case 'podcasts': result = result.filter(r => r.type === ResourceType.Podcast); break;
            case 'youtube': result = result.filter(r => r.type === ResourceType.YouTube); break;
            case 'blogs': result = result.filter(r => r.type === ResourceType.Blog); break;
            case 'social': result = result.filter(r => r.type === ResourceType.Social); break;
        }
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.author?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === 'technicality-asc') {
      result.sort((a, b) => a.technicality - b.technicality);
    } else if (sortOption === 'technicality-desc') {
      result.sort((a, b) => b.technicality - a.technicality);
    }

    return result;
  }, [activePage, activeFilter, sortOption, favorites, searchQuery]);

  // ----------------------------------------------------------------------
  // Sub-Components
  // ----------------------------------------------------------------------

  const RenderResourceList = ({ ids }: { ids: string[] }) => {
    return (
      <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
        {ids.map(id => {
          const resource = RESOURCES.find(r => r.id === id);
          if (!resource) return null;
          return (
            <ResourceCard 
              key={id} 
              resource={resource} 
              isFavorite={favorites.has(id)} 
              onToggleFavorite={toggleFavorite}
              compact
            />
          );
        })}
      </div>
    );
  };

  const SidebarItem = ({ page, icon, label, count }: { page: Page, icon: React.ReactNode, label: string, count?: number }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1 ${
        activePage === page 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
            activePage === page ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
        }`}>
            {count}
        </span>
      )}
    </button>
  );

  // ----------------------------------------------------------------------
  // Render Views
  // ----------------------------------------------------------------------

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 animate-in fade-in duration-500">
        
        {/* Hero / About */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-indigo-50 opacity-50">
                <Info size={300} />
            </div>
            <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
                    <BookOpen size={16} />
                    <span>Dominik Lukeš's Guide</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Resources for Learning about <span className="text-indigo-600">AI</span>
                </h1>
                <div className="prose prose-lg text-slate-600 mb-8">
                    <p>
                        Things are changing too quickly in AI for there to be a single source of reliable up-to-date information. 
                        I have five general sources of information I use to keep current but also to learn more deeply about how AI works.
                    </p>
                </div>
                <button 
                    onClick={() => setActivePage('browse_all')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                >
                    Start Browsing
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { id: 'newsletters', title: 'Newsletters', icon: <Mail size={32} />, desc: 'Quick summaries of latest happenings.', count: RESOURCES.filter(r => r.type === ResourceType.Newsletter).length, color: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-200' },
                { id: 'podcasts', title: 'Podcasts', icon: <Mic size={32} />, desc: 'Deep dives and discussions.', count: RESOURCES.filter(r => r.type === ResourceType.Podcast).length, color: 'text-violet-600 bg-violet-50 border-violet-100 hover:border-violet-200' },
                { id: 'youtube', title: 'YouTube', icon: <Youtube size={32} />, desc: 'Visual explainers and demos.', count: RESOURCES.filter(r => r.type === ResourceType.YouTube).length, color: 'text-rose-600 bg-rose-50 border-rose-100 hover:border-rose-200' },
                { id: 'blogs', title: 'Blogs', icon: <PenTool size={32} />, desc: 'Long-form analysis and research.', count: RESOURCES.filter(r => r.type === ResourceType.Blog).length, color: 'text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-200' },
                { id: 'social', title: 'Social Media', icon: <Share2 size={32} />, desc: 'Real-time updates and community.', count: RESOURCES.filter(r => r.type === ResourceType.Social).length, color: 'text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-200' },
                { id: 'browse_all', title: 'Browse All', icon: <LayoutGrid size={32} />, desc: 'Search and filter the complete database.', count: RESOURCES.length, color: 'text-slate-600 bg-slate-50 border-slate-200 hover:border-slate-300' },
            ].map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActivePage(cat.id as Page)}
                    className={`group text-left p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cat.color}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                            {cat.icon}
                        </div>
                        <span className="text-2xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">
                            {cat.count}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                    <p className="text-slate-600 text-sm font-medium opacity-80">{cat.desc}</p>
                </button>
            ))}
        </div>
    </div>
  );

  const renderContent = () => {
    switch(activePage) {
        case 'newsletters':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <NarrativeSection title="Newsletters" icon={<Mail size={40} />}>
                        <NarrativeSubSection title="Why newsletters">
                            <p>
                            Everybody is complaining about a full mailbox but that is where most of us spend our lives. That’s why it’s often nice to receive a quick summary of the latest happenings right alongside the less exciting business emails.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Top 5 Newsletters">
                            <p>These are the top 5 to consider. See below on why I chose them.</p>
                            <RenderResourceList ids={['n1', 'n2', 'n3', 'n4', 'n5']} />
                        </NarrativeSubSection>
                        
                        <NarrativeSubSection title="Honorable mention for researchers in AI">
                            <RenderResourceList ids={['n6']} />
                            <p>You can subscribe to it if you get a free account on HuggingFace and tick papers under notification options.</p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Why (these) newsletters">
                            <p>I chose these newsletters to cover different level of interest. I used these criteria:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>They aggregate information that is relevant to what is actually important</li>
                            <li>The email is short and easy to scan - ideally with brief summaries, bullet points and bold</li>
                            <li>They give me a combination of news, tools and tips</li>
                            <li>They also have websites, I can point people to</li>
                            <li>They do not try to be too sensationalist (but I will forgive some of that for informativeness)</li>
                            </ul>
                            <p className="mt-4">
                            There are many more to choose from. Here's a <a href="https://github.com/swyxio/ai-notes/blob/main/Resources/Good%20AI%20Podcasts%20and%20Newsletters.md" className="text-indigo-600 hover:underline">list of some compiled by swyx</a>, AI podcaster and developer of AI News.
                            </p>
                        </NarrativeSubSection>
                    </NarrativeSection>
                </div>
            );
        case 'podcasts':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <NarrativeSection title="Podcasts" icon={<Mic size={40} />}>
                        <NarrativeSubSection title="Why podcasts?">
                            <p>
                            Unlike newsletters, podcasts require much more of a time commitment. All of these are at least an hour but some go as long as 3. These are some of the ones I subscribe to (even though I don't listen to every episode of all of them). They are good for news but picking a few episodes from the archives would give you some useful background and historical perspective.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Five key podcasts to listen to">
                            <p>From quick and general to long and specialist:</p>
                            <RenderResourceList ids={CATEGORY_IDS.PODCASTS} />
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Bonus podcasts">
                            <p>
                            Here are <strong>four bonus podcasts</strong> that are less focused on new developments but have interviewed some of the biggest luminaries of the field.
                            </p>
                            <RenderResourceList ids={CATEGORY_IDS.PODCASTS_BONUS} />
                        </NarrativeSubSection>
                    </NarrativeSection>
                </div>
            );
        case 'youtube':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <NarrativeSection title="YouTube Channels" icon={<Youtube size={40} />}>
                        <NarrativeSubSection title="Why YouTube">
                            <p>
                            While newsletters are best at news and podcast at long-term engagement with the field, YouTube is best suited for explainers. Not all the best videos are necessarily in channels you should subscribe to. For instance, most of 3Blue1Brown videos are not about AI. But here are channels that I find consistently informative about AI and here is my list.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Getting the most out of YouTube">
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4 rounded-r-lg">
                            <p className="font-bold text-amber-900">Warning:</p>
                            <p className="text-amber-800 text-sm">
                                YouTube is also full of 'AI influencers' and while they may have useful information to share, they also have a posting schedule to maintain, so may not always have the time to vet all the information to share. YouTube rewards bombastic titles and thumbnails, and the content does not always live up to that. My list combines both influencers and deep dives.
                            </p>
                            </div>
                            <p className="mt-4">
                            <strong>How to best watch YouTube these days:</strong> Gone are the days of 4 minute YouTube videos. None of the channels on my list post videos much under 20 minutes and some are over 2 or more hours. Luckily, they usually include chapter markers and I also highly recommend learning to listen to them at high speed with subtitles on.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="5 YouTube channels">
                            <RenderResourceList ids={CATEGORY_IDS.YOUTUBE} />
                            <p className="mt-4">
                            There are now dozens of AI YouTube channels and even more channels with a few very good videos. I think these five give a good cross section of the range out there but I may have missed some that would work for you.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="One-off learning resources on AI on YouTube">
                            <p>YouTube is also full of one-off learning resources about various aspects of AI. For example:</p>
                            <RenderResourceList ids={CATEGORY_IDS.YOUTUBE_BONUS} />
                        </NarrativeSubSection>
                    </NarrativeSection>
                </div>
            );
        case 'blogs':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <NarrativeSection title="Blogs and Substacks" icon={<PenTool size={40} />}>
                        <NarrativeSubSection title="Why blogs or Substack">
                            <p>
                            Blogs and now 'Substacks' are a great source of long-form writing and opinion sharing. Blogs have had a bit of a downturn since their heyday but now they have seen a resurgence with the rise of Substack. Substack is strictly speaking a newsletter platform because you can get the posts by email but it is almost entirely dedicated to long-form writing. They also have webpages for each post. Some other places where blogs are hosted these days are Medium and GitHub pages. I will just use the 'blogs' below.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="How I chose these">
                            <p>
                            There are many blogs that have occasional AI content but they are interleaved with too many other posts and many more that are have useful AI content but only post a few times a year. The list below are blogs that are exclusively AI-focused and that post at least a few times a month. Also, many of the podcasts and YouTube channels I already shared have associated blogs where they occasionally post text-only analysis.
                            </p>
                            <p className="mt-2">
                            Of these, only the top one is for a general audience, two are for those interested in keeping on top of research in AI, one is for AI industry and the last is a collection of blogs by prominent companies in the AI space.
                            </p>
                        </NarrativeSubSection>

                        <NarrativeSubSection title="Five blogs to keep an eye on">
                            <RenderResourceList ids={CATEGORY_IDS.BLOGS} />
                            <h4 className="font-bold text-slate-800 mt-6 mb-2">Company Blogs</h4>
                            <p className="mb-4">Many companies run blogs but few are useful. AI companies are the exception and by and large their blog posts offer value.</p>
                            <RenderResourceList ids={CATEGORY_IDS.BLOGS_COMPANY} />
                        </NarrativeSubSection>
                    </NarrativeSection>
                </div>
            );
        case 'social':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <NarrativeSection title="Social Media" icon={<Share2 size={40} />}>
                        <NarrativeSubSection title="Twitter / X">
                            <p>Two lists of useful accounts to follow:</p>
                            <RenderResourceList ids={['s1', 's2']} />
                        </NarrativeSubSection>
                        <NarrativeSubSection title="Reddit">
                            <p>Many useful subreddits. I’ve collated them into two groups:</p>
                            <RenderResourceList ids={['s3', 's4']} />
                        </NarrativeSubSection>
                        <NarrativeSubSection title="LinkedIn">
                            <RenderResourceList ids={['s5']} />
                        </NarrativeSubSection>
                    </NarrativeSection>
                </div>
            );
        case 'browse_all':
        case 'favorites':
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                        {activePage === 'favorites' ? <Heart className="text-rose-500" size={32} /> : <LayoutGrid className="text-indigo-600" size={32} />}
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                            {activePage === 'favorites' ? 'My Favorites' : 'Browse All Resources'}
                        </h2>
                    </div>

                    {/* Controls */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 sticky top-20 z-40">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            
                            {/* Search */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search resources..." 
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Filters (Only for Browse All) */}
                            {activePage === 'browse_all' && (
                                <div className="flex flex-wrap justify-center gap-2">
                                    {(['All', 'Favorites', ...Object.values(ResourceType)] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveFilter(type)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                                activeFilter === type
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {type} {type === 'Favorites' && `(${favorites.size})`}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Sorting */}
                            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                <ArrowUpDown size={16} className="text-slate-400" />
                                <select 
                                    className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                                >
                                    <option value="default">Default Order</option>
                                    <option value="technicality-asc">Easier First</option>
                                    <option value="technicality-desc">More Technical First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                            {filteredResources.map((resource) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                isFavorite={favorites.has(resource.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-400">
                            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                            <Filter size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-600">No resources found</h3>
                            <p>Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>
            );
        default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <BookOpen size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 hidden sm:block">AI Learning Resources</span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActivePage('favorites')}
                className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                    activePage === 'favorites' 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart size={16} className={activePage === 'favorites' ? 'fill-rose-500' : ''} />
                <span className="hidden sm:inline">Favorites ({favorites.size})</span>
                <span className="sm:hidden">{favorites.size}</span>
              </button>
              
              {activePage !== 'home' && (
                <button 
                  onClick={() => setSidebarOpen(!isSidebarOpen)} 
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-md md:hidden"
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow max-w-7xl mx-auto w-full">
        {/* Sidebar (Only on inner pages) */}
        {activePage !== 'home' && (
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                pt-20 md:pt-8 px-4 pb-8
            `}>
                <div className="space-y-6">
                    <div>
                        <h4 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</h4>
                        <SidebarItem page="home" icon={<Home size={18} />} label="Home" />
                        <SidebarItem page="browse_all" icon={<LayoutGrid size={18} />} label="Browse All" />
                    </div>
                    
                    <div className="w-full h-px bg-slate-100"></div>

                    <div>
                        <h4 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Categories</h4>
                        <SidebarItem page="newsletters" icon={<Mail size={18} />} label="Newsletters" />
                        <SidebarItem page="podcasts" icon={<Mic size={18} />} label="Podcasts" />
                        <SidebarItem page="youtube" icon={<Youtube size={18} />} label="YouTube" />
                        <SidebarItem page="blogs" icon={<PenTool size={18} />} label="Blogs" />
                        <SidebarItem page="social" icon={<Share2 size={18} />} label="Social Media" />
                    </div>

                    <div className="w-full h-px bg-slate-100"></div>

                    <div>
                        <h4 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Library</h4>
                        <SidebarItem page="favorites" icon={<Heart size={18} />} label="Favorites" count={favorites.size} />
                    </div>
                </div>
            </aside>
        )}

        {/* Overlay for mobile sidebar */}
        {activePage !== 'home' && isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
            ></div>
        )}

        {/* Main Content Area */}
        <main className={`flex-grow w-full ${activePage === 'home' ? '' : 'py-8 px-8 md:px-16'}`}>
            {activePage === 'home' ? renderHome() : renderContent()}
        </main>
      </div>

      <footer className="w-full bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-slate-500 text-sm">
            <p>&quot;by Dominik Lukeš&quot;</p>
        </div>
      </footer>
    </div>
  );
}