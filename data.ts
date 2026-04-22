import { Resource, ResourceType, Technicality } from './types';

export const RESOURCES: Resource[] = [
  // Newsletters
  {
    id: 'n1',
    title: 'AI Rundown',
    url: 'https://www.therundown.ai/subscribe?utm_source=www.therundown.ai&utm_medium=newsletter&utm_campaign=ai-developer-codes-websites-by-itself',
    description: 'Daily newsletter that gives you the main news in the AI world and a dose of new tools. Definitely the obvious choice if you only want one.',
    type: ResourceType.Newsletter,
    technicality: Technicality.General
  },
  {
    id: 'n2',
    title: 'AlphaSignal',
    url: 'https://alphasignal.ai/',
    description: 'This is also a newsletter that is automatically collected by AI but unlike AI News, it is customisable for just the areas you’re interested in.',
    type: ResourceType.Newsletter,
    technicality: Technicality.Intermediate
  },
  {
    id: 'n3',
    title: 'TLDR AI',
    url: 'https://tldr.tech/ai?rh_ref=825c12e7&sl_campaign=MF07e83226c147',
    description: 'Also daily but links to articles on the web with a brief summary. A good complement if you want know what\'s in the news.',
    type: ResourceType.Newsletter,
    technicality: Technicality.General
  },
  {
    id: 'n4',
    title: 'AI News',
    url: 'https://buttondown.email/ainews',
    description: 'This humbly named newsletter is a real gem if you want an insight into what\'s happening among insiders. It summarises what is happening on AI Twitter/X and in some of the popular Discords.',
    type: ResourceType.Newsletter,
    technicality: Technicality.Intermediate
  },
  {
    id: 'n5',
    title: 'Future tools',
    url: 'https://futuretools.beehiiv.com/?utm_source=futuretools.beehiiv.com&utm_medium=newsletter&utm_campaign=tackle-emails-with-ai',
    description: 'Several times a week, this newsletter includes some news but mostly features AI tools.',
    type: ResourceType.Newsletter,
    technicality: Technicality.General
  },
  {
    id: 'n6',
    title: 'Hugging face papers',
    url: 'https://huggingface.co/papers',
    description: 'This is a less a newsletter and more of a mailing with links to the top 5-8 papers that had been recently published to arXiv.',
    type: ResourceType.Newsletter,
    technicality: Technicality.Expert
  },

  // Podcasts
  {
    id: 'p1',
    title: 'The AI Daily Brief',
    url: 'https://www.youtube.com/@AIDailyBrief/videos',
    description: 'Brief - 7 - 12 minute daily podcast summary of key AI news. Covers the headlines and a quick main story with an editorial every day.',
    type: ResourceType.Podcast,
    technicality: Technicality.General
  },
  {
    id: 'p2',
    title: 'How do you use ChatGPT',
    author: 'Dan Shipper',
    url: 'https://every.to/@danshipper',
    description: 'Dan Shipper interviews various people who use AI and walks them through practical examples of what they do.',
    type: ResourceType.Podcast,
    technicality: Technicality.Practical
  },
  {
    id: 'p3',
    title: 'Cognitive revolution',
    author: 'Nathan Labenz',
    url: 'https://www.cognitiverevolution.ai/',
    description: 'Interviews mostly founders of AI companies and occasionally does a deep dive into a tech issue or an overview of the latest news.',
    type: ResourceType.Podcast,
    technicality: Technicality.Intermediate
  },
  {
    id: 'p4',
    title: 'Latent Space',
    author: 'Alessio and Swyx',
    url: 'https://www.latent.space/podcast',
    description: 'Similar to the Cognitive Revolution but has a more technical interest in both the engineering and business side of things.',
    type: ResourceType.Podcast,
    technicality: Technicality.Advanced
  },
  {
    id: 'p5',
    title: 'ThursdAI',
    author: 'Alex Volkov',
    url: 'https://thursdai.news/',
    description: 'Very developer and expert focused but a must listen for anyone interested in open models, fine tuning and insider deep dive perspective.',
    type: ResourceType.Podcast,
    technicality: Technicality.Advanced
  },
  {
    id: 'p6',
    title: 'TWIML/AI',
    author: 'Sam Charrington',
    url: 'https://twimlai.com/podcast/twimlai/',
    description: 'It\'s been covering AI developments for almost 10 years and contains interviews with researchers in a very wide area of AI (not just LLMs).',
    type: ResourceType.Podcast,
    technicality: Technicality.Advanced
  },
  {
    id: 'p7',
    title: 'Eye on AI',
    author: 'Craig Smith',
    url: 'https://www.eye-on.ai/podcast-archive',
    description: 'Has been interviewing many of the big actors (and some smaller ones) since 2019. The historical archive is invaluable.',
    type: ResourceType.Podcast,
    technicality: Technicality.Intermediate
  },
  {
    id: 'p8',
    title: 'Dwarkesh Patel',
    url: 'https://www.dwarkeshpatel.com/',
    description: 'Relatively new and not primarily an AI podcast but he has interviewed some of the biggest players. Interviews are long and in-depth.',
    type: ResourceType.Podcast,
    technicality: Technicality.Intermediate
  },
  {
    id: 'p9',
    title: 'Lex Fridman',
    url: 'https://lexfridman.com/podcast/',
    description: 'Known for interviewing high profile people on a variety of topics but he can get some of the biggest players and lets them talk for 2-3 hours.',
    type: ResourceType.Podcast,
    technicality: Technicality.General
  },

  // YouTube
  {
    id: 'y1',
    title: 'Matt Wolfe',
    url: 'https://www.youtube.com/@mreflow',
    description: 'If you only want to spend 20-30 minutes a week catching up AI developments, Matt Wolfe\'s channel is your best bet.',
    type: ResourceType.YouTube,
    technicality: Technicality.General
  },
  {
    id: 'y2',
    title: 'Andy Stapleton',
    url: 'https://www.youtube.com/@DrAndyStapleton',
    description: 'Academic influencer. Best for getting a sense of what academic-focused AI apps there are and what is their best case scenario.',
    type: ResourceType.YouTube,
    technicality: Technicality.Practical
  },
  {
    id: 'y3',
    title: 'Sam Witteveen',
    url: 'https://www.youtube.com/@samwitteveenai',
    description: 'Best for people interested in building with AI. Sam walks through new models and APIs in detail and combines it with the occasional explainer.',
    type: ResourceType.YouTube,
    technicality: Technicality.Advanced
  },
  {
    id: 'y4',
    title: 'Yannic Kilcher',
    url: 'https://www.youtube.com/@YannicKilcher',
    description: 'A specialist on machine learning who does extremely technical deep dives. He also breaks down papers with the most buzz around them.',
    type: ResourceType.YouTube,
    technicality: Technicality.Expert
  },
  {
    id: 'y5',
    title: 'Andrej Karpathy',
    url: 'https://www.youtube.com/@AndrejKarpathy',
    description: 'Not for the faint of heart. He walks you through all the steps of building a neural network and GPT.',
    type: ResourceType.YouTube,
    technicality: Technicality.Expert
  },
  {
    id: 'y6',
    title: '3Blue1Brown (Neural Networks)',
    author: 'Grant Sanderson',
    url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    description: 'Series of videos about how Neural Networks work including the latest developments in generative AI.',
    type: ResourceType.YouTube,
    technicality: Technicality.Advanced
  },

  // Blogs
  {
    id: 'b1',
    title: 'One Useful Thing',
    author: 'Ethan Mollick',
    url: 'https://www.oneusefulthing.org/',
    description: 'Probably the most useful and informative blog on AI in education. Posts are well informed while non-technical.',
    type: ResourceType.Blog,
    technicality: Technicality.General
  },
  {
    id: 'b2',
    title: 'Ahead of AI',
    author: 'Sebastian Raschka, PhD',
    url: 'https://magazine.sebastianraschka.com/',
    description: 'Covers new AI research but is fairly accessible. Most useful for its monthly round up of AI papers.',
    type: ResourceType.Blog,
    technicality: Technicality.Advanced
  },
  {
    id: 'b3',
    title: 'Deep (Learning) Focus',
    author: 'Cameron R. Wolfe, Ph.D.',
    url: 'https://cameronrwolfe.substack.com/',
    description: 'Slightly more happy to use math in its posts. Very detailed technical explainers of key technologies.',
    type: ResourceType.Blog,
    technicality: Technicality.Expert
  },
  {
    id: 'b4',
    title: 'SemiAnalysis',
    author: 'Dylan Patel',
    url: 'https://www.semianalysis.com/',
    description: 'Devoted entirely to the semiconductor industry as it pertains to AI.',
    type: ResourceType.Blog,
    technicality: Technicality.Advanced
  },
  {
    id: 'b5',
    title: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog',
    description: 'A collection of various explainers on a variety of topics from social to technical.',
    type: ResourceType.Blog,
    technicality: Technicality.Intermediate
  },
  {
    id: 'b6',
    title: 'Google Research Blog',
    url: 'https://research.google/blog/',
    description: 'Covers AI from the perspective of research rather than products.',
    type: ResourceType.Blog,
    technicality: Technicality.Advanced
  },
  {
    id: 'b7',
    title: 'Microsoft Research Blog',
    url: 'https://www.microsoft.com/en-us/research/blog/',
    description: 'This blog offers a nice overview of the sort of things going on at Microsoft Research.',
    type: ResourceType.Blog,
    technicality: Technicality.Advanced
  },
  {
    id: 'b8',
    title: 'Anthropic News',
    url: 'https://www.anthropic.com/news',
    description: 'Mostly announcements of new research or prompting techniques.',
    type: ResourceType.Blog,
    technicality: Technicality.Intermediate
  },
  {
    id: 'b9',
    title: 'OpenAI Blog',
    url: 'https://openai.com/blog',
    description: 'Announcements and occasionally more technical discussions on AI topics.',
    type: ResourceType.Blog,
    technicality: Technicality.Intermediate
  },

  // Social
  {
    id: 's1',
    title: 'Twitter List 1',
    url: 'https://x.com/i/lists/1676686461876203520',
    description: 'A curated list of useful AI accounts on X/Twitter.',
    type: ResourceType.Social,
    technicality: Technicality.General
  },
  {
    id: 's2',
    title: 'Twitter List 2',
    url: 'https://x.com/i/lists/1950670607214936074',
    description: 'Additional useful AI accounts to follow.',
    type: ResourceType.Social,
    technicality: Technicality.General
  },
  {
    id: 's3',
    title: 'Reddit: LLM Tips and Tricks',
    url: 'https://www.reddit.com/user/techczech/m/llm_tips_and_tricks/',
    description: 'A custom feed about the use of Large Language Models.',
    type: ResourceType.Social,
    technicality: Technicality.Practical
  },
  {
    id: 's4',
    title: 'Reddit: Diffusion Feeds',
    url: 'https://www.reddit.com/user/techczech/m/diffusion_feeds/',
    description: 'A custom feed focused on image generation.',
    type: ResourceType.Social,
    technicality: Technicality.Practical
  },
  {
    id: 's5',
    title: 'LinkedIn: AI in Academic Practice',
    url: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7045331862348554240',
    description: 'Newsletter on LinkedIn focusing on AI in academia.',
    type: ResourceType.Social,
    technicality: Technicality.General
  }
];

export const CATEGORY_IDS = {
  NEWSLETTERS: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'],
  PODCASTS: ['p1', 'p2', 'p3', 'p4', 'p5'],
  PODCASTS_BONUS: ['p6', 'p7', 'p8', 'p9'],
  YOUTUBE: ['y1', 'y2', 'y3', 'y4', 'y5'],
  YOUTUBE_BONUS: ['y6'],
  BLOGS: ['b1', 'b2', 'b3', 'b4'],
  BLOGS_COMPANY: ['b5', 'b6', 'b7', 'b8', 'b9'],
  SOCIAL: ['s1', 's2', 's3', 's4', 's5']
};
