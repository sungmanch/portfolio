export interface MilestoneProject {
  name: string
  description: string
  link?: string
  featured?: boolean
}

export interface TimelineMilestone {
  id: string
  year: string
  title: string
  description: string
  type: 'education' | 'career' | 'achievement' | 'project'
  projects?: MilestoneProject[]
  current?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
}


export interface SocialLink {
  name: string
  url: string
  icon: 'blog' | 'twitter' | 'linkedin' | 'github' | 'email'
}

export const personalInfo = {
  name: 'Sungman Cho',
  firstName: 'Sungman',
  role: 'Founder',
  tagline: 'Fast iterate, Listen more.',
  location: 'Seoul, Korea',
  email: 'sungman.cho@tbdlabs.team',
}

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sungman-cho', icon: 'linkedin' },
  { name: 'X', url: 'https://x.com/smcho91', icon: 'twitter' },
  { name: 'GitHub', url: 'https://github.com/sungmanch', icon: 'github' },
  { name: 'Email', url: 'mailto:sungman.cho@tbdlabs.team', icon: 'email' },
]

export const aboutText = `
Everyone is born with a dream.
Society teaches you to call it "unrealistic."

I kept mine.

The goal isn't success. It's refusing to become someone you're not.

4 years in AI. 2 years building. Still learning.
Still refusing.

That's how I make Korea proud—by not settling.
`

export const missionStatement = `"Make Korea proud. Inspire the bold."`

export const timeline: TimelineMilestone[] = [
  {
    id: '0',
    year: '2026',
    title: 'Vibe Orchestrator',
    description: 'One person. One problem. One week.\nFrom idea to shipped product.',
    type: 'career',
    current: true,
    projects: [
      {
        name: 'No More AI Slop',
        description: 'Make people better to leverage AI',
        link: 'https://www.nomoreaislop.xyz/',
        featured: true,
      },
      {
        name: 'Costello',
        description: 'Turns every LinkedIn message into a data point',
        link: 'https://www.costello-app.xyz/',
      },
      {
        name: 'Maison de Letter',
        description: 'Customize mobile wedding invitation letter',
        link: 'https://www.maisondeletter.com/',
      },
      {
        name: 'VibeWriting',
        description: 'Hyper-personalized blog writing helper',
        link: 'https://personalized-writing.vercel.app/',
      },
    ],
  },
  {
    id: '1',
    year: '2024-2025',
    title: 'CEO & Co-founder at TBD Labs',
    description: 'Led end-to-end customer discovery across 5 product iterations,\nconducting 200+ customer interviews and managing 2,000+ prospects\nacross B2B and B2C segments.',
    type: 'career',
    projects: [
      {
        name: 'Steev',
        description: 'AI Agent for autonomous model training & tracking',
      },
      {
        name: 'ULALA AI',
        description: 'Learning Korean with short-form contents + AI',
      },
      {
        name: 'TruVi',
        description: 'The new online assessment system for the AI-era',
        link: 'https://www.truvi.app/',
        featured: true,
      },
    ],
  },
  {
    id: '2',
    year: '2021-2024',
    title: 'AI Research Engineer at Intel',
    description: 'Optimized computer vision models for edge deployment using OpenVINO,\nachieving 1.5x inference speedup and 40% memory reduction.\nBoosted object detection accuracy by 8%.',
    type: 'career',
    projects: [
      {
        name: 'OpenVINO Optimization',
        description: 'Model Training & Inference Optimization',
        link: 'https://github.com/open-edge-platform/training_extensions',
        featured: true,
      },
      {
        name: 'Data Augmentation Pipeline',
        description: 'Novel augmentation boosting accuracy by 8%',
      },
      {
        name: 'Self-supervised Learning',
        description: 'Efficient training for image classification',
      },
    ],
  },
  {
    id: '3',
    year: '2020-2021',
    title: 'Robot & Vision Team Lead at Asan Medical Center',
    description: 'Led cross-functional team developing AI models\nfor medical image analysis.\nDesigned domain-specific CNN architecture\noutperforming SOTA baseline by 12% on 1M+ X-ray images.',
    type: 'career',
    projects: [
      {
        name: 'Video Recognition of Mastoidectomy',
        description: 'CNN for surgical tool detection (CMPB, IF 4.8)',
        link: 'https://www.sciencedirect.com/science/article/pii/S0169260721003254',
      },
      {
        name: 'Open Medical Platform',
        description: 'Pre-trained weights sharing platform (KJR, IF 4.4)',
        link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8628158/',
      },
      {
        name: 'Medical Image Analysis Patent',
        description: 'AI-based medical image analysis method',
        link: 'https://www.kipris.or.kr/khome/detail/newWindow.do',
        featured: true,
      },
    ],
  },
  {
    id: '4',
    year: '2019',
    title: 'Face Recognition System - Bumin Hospital',
    description: 'Technical lead for AI-powered access control system deployment.\nArchitected RESTful face recognition server\nwith real-time response requirements.',
    type: 'project',
  },
  {
    id: '5',
    year: '2017',
    title: 'Actor Recognition System - KBS',
    description: 'Technical lead for KBS Technical Research Institute,\ndeveloping AI-powered character recognition system\nfor automated metadata generation.',
    type: 'project',
  },
  {
    id: '6',
    year: '2016',
    title: 'M.S. Media IT Engineering',
    description: 'Seoul National University of Science & Technology.\nGPA: 4.3/4.5.\nFocus on computer vision and machine learning.',
    type: 'education',
  },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Real-time Face Recognition System',
    description: 'AI-powered access control system for Bumin Hospital with RESTful API and real-time response capabilities.',
    tags: ['Python', 'OpenCV', 'Deep Learning', 'REST API'],
    featured: true,
  },
  {
    id: '2',
    title: 'License Plate Recognition System',
    description: 'High-performance YOLOv3-based recognition system packaged as production-ready C++ DLL for government and commercial deployments.',
    tags: ['C++', 'YOLOv3', 'Computer Vision', 'Edge Deployment'],
    featured: true,
  },
  {
    id: '3',
    title: 'Actor Recognition System - KBS',
    description: 'AI-powered character recognition system for South Korea\'s national broadcaster to automate metadata generation.',
    tags: ['Python', 'PyTorch', 'Face Recognition', 'Video Analysis'],
    featured: true,
  },
  {
    id: '4',
    title: 'Medical Image Analysis',
    description: 'Domain-specific CNN architecture for X-ray lesion detection at Asan Medical Center, outperforming SOTA baseline by 12% on 1M+ images. Led cross-functional team for deployment.',
    tags: ['PyTorch', 'Medical AI', 'CNN', 'Healthcare', 'Asan'],
  },
  {
    id: '5',
    title: 'OpenVINO Model Optimization',
    description: 'Edge deployment optimization at Intel achieving 1.5x inference speedup and 40% memory reduction for computer vision models across key partners.',
    tags: ['OpenVINO', 'Model Optimization', 'Edge AI', 'Intel'],
  },
  {
    id: '6',
    title: 'Data Augmentation Pipeline',
    description: 'Designed and contributed a novel data augmentation pipeline at Intel, boosting downstream object detection accuracy by 8%.',
    tags: ['Python', 'Computer Vision', 'Data Augmentation', 'Intel'],
  },
  {
    id: '7',
    title: 'Semi-supervised Learning',
    description: 'Developed efficient training algorithm using semi-supervised learning for image classification at Intel, reducing labeling requirements.',
    tags: ['PyTorch', 'Semi-supervised', 'Image Classification', 'Intel'],
  },
]


export type CosmosCategory = 'productivity' | 'sales' | 'education' | 'dev-tools'
export type ProjectStatus = 'active' | 'archived'
export type TargetMarket = 'b2b' | 'b2c'
export type MarketRegion = 'us' | 'korea'

export interface CosmosProject {
  id: string
  title: string
  tagline: string
  audience?: string
  value?: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
  category: CosmosCategory
  year: string
  status: ProjectStatus
  targetMarket: TargetMarket[]
  region: MarketRegion[]
  shippedInDays?: number
  launchDate?: string
}

export const CATEGORY_CONFIG: Record<CosmosCategory, { label: string; hex: string }> = {
  'productivity': { label: 'Productivity', hex: '#fbbf24' },
  'sales':        { label: 'Sales',        hex: '#34d399' },
  'education':    { label: 'Education',    hex: '#38bdf8' },
  'dev-tools':    { label: 'Dev Tools',    hex: '#64ffda' },
}

export const cosmosProjects: CosmosProject[] = [
  // 2026 - Vibe Orchestrator Projects
  {
    id: 'no-more-ai-slop',
    title: 'No More AI Slop',
    tagline: 'CLI tool that analyzes your AI coding sessions to reveal your developer personality.',
    audience: 'Developers using AI coding assistants like Claude Code',
    value: 'Uncover hidden habits across 6 dimensions with actionable growth priorities',
    tags: ['CLI', 'AI', 'Developer Tools'],
    link: 'https://www.nomoreaislop.xyz/',
    featured: true,
    category: 'dev-tools',
    year: '2026',
    status: 'active',
    targetMarket: ['b2b', 'b2c'],
    region: ['us'],
    shippedInDays: 7,
    launchDate: '2026-01-07',
  },
  {
    id: 'costello',
    title: 'Costello',
    tagline: 'Chrome extension that tracks LinkedIn Sales Navigator outreach and shows what converts.',
    audience: 'Sales professionals using LinkedIn Sales Navigator for cold outreach',
    value: 'Sync leads in one click, track every message, and see which templates get replies',
    tags: ['Chrome Extension', 'Sales', 'LinkedIn', 'Analytics'],
    link: 'https://www.costello-app.xyz/',
    featured: true,
    category: 'sales',
    year: '2026',
    status: 'active',
    targetMarket: ['b2b'],
    region: ['us'],
    shippedInDays: 7,
    launchDate: '2026-01-14',
  },
  {
    id: 'maison-de-letter',
    title: 'Maison de Letter',
    tagline: 'DIY mobile wedding invitations — pick a template, customize every section, share via link.',
    audience: 'Korean couples who want full creative control over their wedding invitations',
    value: 'Self-service builder with curated templates and section-level customization',
    tags: ['Next.js', 'Mobile', 'Design'],
    link: 'https://www.maisondeletter.com/',
    category: 'productivity',
    year: '2026',
    status: 'active',
    targetMarket: ['b2c'],
    region: ['korea'],
    shippedInDays: 7,
    launchDate: '2026-01-21',
  },
  {
    id: 'vibewriting',
    title: 'VibeWriting',
    tagline: 'Blog writing assistant that learns your unique tone and style.',
    audience: 'Bloggers who want AI help without losing personality',
    value: 'Matches your voice by analyzing your past writing (EN/KR)',
    tags: ['AI', 'Writing', 'Personalization'],
    link: 'https://personalized-writing.vercel.app/',
    category: 'productivity',
    year: '2026',
    status: 'active',
    targetMarket: ['b2c'],
    region: ['us', 'korea'],
    shippedInDays: 7,
    launchDate: '2026-01-26',
  },
  {
    id: 'claude-glm-agent',
    title: 'Claude GLM Agent',
    tagline: 'Claude Code plugin for hybrid AI workflows — delegate tasks to GLM models via Z.AI API.',
    audience: 'Developers using Claude Code who want multi-model orchestration',
    value: 'Orchestrate multiple GLM workers in parallel for complex analysis tasks',
    tags: ['Claude Code', 'Plugin', 'AI', 'TypeScript'],
    link: 'https://github.com/sungmanch/claude-glm-agent',
    github: 'https://github.com/sungmanch/claude-glm-agent',
    category: 'dev-tools',
    year: '2026',
    status: 'active',
    targetMarket: ['b2b', 'b2c'],
    region: ['us'],
    shippedInDays: 7,
    launchDate: '2026-01-20',
  },
  {
    id: 'spc-ai-team',
    title: 'SPC AI Team',
    tagline: '17-agent AI development team for solo founders — from concept to shipped product.',
    audience: 'Solo founders and indie hackers building products alone',
    value: 'Full product lifecycle management with specialized AI agents (PM, Architect, Designer, Dev, QA, Writer)',
    tags: ['Claude Code', 'Plugin', 'AI Agents', 'Workflow'],
    link: 'https://github.com/sungmanch/single-person-company',
    github: 'https://github.com/sungmanch/single-person-company',
    featured: true,
    category: 'dev-tools',
    year: '2026',
    status: 'active',
    targetMarket: ['b2b', 'b2c'],
    region: ['us'],
    shippedInDays: 7,
    launchDate: '2026-01-24',
  },
  // 2024-2025 - TBD Labs Projects
  {
    id: 'truvi',
    title: 'TruVi',
    tagline: 'AI hiring tool that reveals how engineering candidates think and collaborate with AI.',
    audience: 'Startup CTOs and engineering managers hiring AI-savvy developers',
    value: 'Assess real problem-solving skills beyond LeetCode — save 60% hiring time',
    tags: ['Hiring', 'AI', 'Assessment', 'B2B'],
    link: 'https://www.truvi.app/',
    featured: true,
    category: 'productivity',
    year: '2024-2025',
    status: 'active',
    targetMarket: ['b2b'],
    region: ['us'],
  },
  {
    id: 'steev',
    title: 'Steev',
    tagline: 'AI agent for autonomous model training and experiment tracking.',
    audience: 'ML engineers overwhelmed by training overhead',
    value: 'Auto-tunes hyperparameters, allocates resources, monitors progress',
    tags: ['MLOps', 'AI Agent', 'Automation'],
    category: 'dev-tools',
    year: '2024-2025',
    status: 'archived',
    targetMarket: ['b2b'],
    region: ['us'],
  },
  {
    id: 'ulala-ai',
    title: 'ULALA AI',
    tagline: 'Learn Korean through short-form video content powered by AI.',
    audience: 'Korean language learners seeking engaging methods',
    value: 'Bite-sized lessons from real media with adaptive difficulty',
    tags: ['EdTech', 'AI', 'Korean', 'Mobile'],
    category: 'education',
    year: '2024-2025',
    status: 'archived',
    targetMarket: ['b2c'],
    region: ['us'],
  },
  // 2021-2024 - Intel Projects
  {
    id: 'openvino',
    title: 'OpenVINO Training Extensions',
    tagline: 'Low-code transfer learning framework for training and deploying computer vision models via OpenVINO.',
    audience: 'Enterprise teams deploying computer vision on edge devices',
    value: 'Train, evaluate, optimize, and deploy CV models with minimal code via CLI or API',
    tags: ['OpenVINO', 'Computer Vision', 'Edge AI', 'Python'],
    link: 'https://github.com/open-edge-platform/training_extensions',
    github: 'https://github.com/open-edge-platform/training_extensions',
    featured: true,
    category: 'dev-tools',
    year: '2021-2024',
    status: 'archived',
    targetMarket: ['b2b'],
    region: ['us'],
  },
]

export const experience = [
  {
    id: '1',
    company: 'TBD Labs',
    role: 'CEO, Co-founder',
    period: 'Apr 2024 - Oct 2025',
    description: 'Led customer discovery across 5 product iterations, conducting 200+ interviews and managing 2,000+ prospects. Delivered technical demos to stakeholders from individual users to C-level executives.',
  },
  {
    id: '2',
    company: 'Intel',
    role: 'AI Research Engineer',
    period: 'Mar 2021 - Apr 2024',
    description: 'Optimized computer vision models for edge deployment using OpenVINO (1.5x speedup, 40% memory reduction). Designed novel data augmentation pipeline boosting object detection accuracy by 8%.',
  },
  {
    id: '3',
    company: 'Asan Medical Center',
    role: 'Robot & Vision Team Lead',
    period: 'Jan 2020 - Mar 2021',
    description: 'Led cross-functional team for medical image analysis. Designed CNN architecture outperforming SOTA by 12% on 1M+ X-ray images. Initiated Code Refactoring and Paper Review groups.',
  },
]
