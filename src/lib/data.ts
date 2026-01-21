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
  title: 'Founder — Ship Fast, Build Often',
  subtitle: 'Love tech. Love people. Shape tomorrow.',
  location: 'Seoul, Korea',
  email: 'sungman.cho@tbdlabs.team',
}

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sungman-cho', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/sungmanch', icon: 'github' },
  { name: 'Email', url: 'mailto:sungman.cho@tbdlabs.team', icon: 'email' },
]

export const aboutText = `
AI engineer and founder with 6+ years of experience building and deploying AI products for enterprise customers. Led product development from concept to MVP with rapid iteration based on direct customer feedback.

My expertise combines deep technical knowledge in computer vision and model optimization with hands-on customer-facing experience across media, healthcare, government, and commercial sectors.
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
        name: 'HypeWriting',
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
