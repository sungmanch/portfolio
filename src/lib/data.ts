export interface MilestoneProject {
  name: string
  description: string
  link?: string
}

export interface TimelineMilestone {
  id: string
  year: string
  title: string
  description: string
  type: 'education' | 'career' | 'achievement' | 'project'
  projects?: MilestoneProject[]
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

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  link?: string
  abstract?: string
  impactFactor?: number
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
  { name: 'GitHub', url: 'https://github.com/dev-sungman', icon: 'github' },
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
    year: '2025',
    title: 'Vibe Orchestrator',
    description: 'Starts with single small problem for a single person. Plan and deliver product within a week.',
    type: 'career',
    projects: [
      {
        name: 'Project Alpha',
        description: 'First week project - solving X problem',
      },
      {
        name: 'Project Beta',
        description: 'Second week project - solving Y problem',
      },
      {
        name: 'Project Gamma',
        description: 'Third week project - solving Z problem',
      },
    ],
  },
  {
    id: '1',
    year: '2024',
    title: 'CEO & Co-founder at TBD Labs',
    description: 'Led end-to-end customer discovery across 5 product iterations, conducting 200+ customer interviews and managing 2,000+ prospects across B2B and B2C segments.',
    type: 'career',
    projects: [
      {
        name: 'Product Iteration 1',
        description: 'First product discovery and validation',
      },
      {
        name: 'Product Iteration 2',
        description: 'Pivoted based on customer feedback',
      },
    ],
  },
  {
    id: '2',
    year: '2021',
    title: 'AI Research Engineer at Intel',
    description: 'Optimized computer vision models for edge deployment using OpenVINO, achieving 1.5x inference speedup and 40% memory reduction. Boosted object detection accuracy by 8%.',
    type: 'career',
    projects: [
      {
        name: 'OpenVINO Optimization',
        description: 'Model optimization for edge deployment',
      },
      {
        name: 'Data Augmentation Pipeline',
        description: 'Novel augmentation boosting accuracy by 8%',
      },
    ],
  },
  {
    id: '3',
    year: '2020',
    title: 'Robot & Vision Team Lead at Asan Medical Center',
    description: 'Led cross-functional team developing AI models for medical image analysis. Designed CNN architecture outperforming SOTA baseline by 12% on 1M+ X-ray images.',
    type: 'career',
    projects: [
      {
        name: 'X-ray Lesion Detection',
        description: 'CNN architecture for 1M+ medical images',
      },
      {
        name: 'Code Review Culture',
        description: 'Initiated Code Refactoring group',
      },
    ],
  },
  {
    id: '4',
    year: '2019',
    title: 'Face Recognition System - Bumin Hospital',
    description: 'Technical lead for AI-powered access control system deployment. Architected RESTful face recognition server with real-time response requirements.',
    type: 'project',
  },
  {
    id: '5',
    year: '2017',
    title: 'Actor Recognition System - KBS',
    description: 'Technical lead for KBS Technical Research Institute, developing AI-powered character recognition system for automated metadata generation.',
    type: 'project',
  },
  {
    id: '6',
    year: '2016',
    title: 'M.S. Media IT Engineering',
    description: 'Seoul National University of Science & Technology. GPA: 4.3/4.5. Focus on computer vision and machine learning.',
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
    description: 'Domain-specific CNN architecture for X-ray lesion detection, outperforming SOTA baseline by 12% on 1M+ images.',
    tags: ['PyTorch', 'Medical AI', 'CNN', 'Healthcare'],
  },
  {
    id: '5',
    title: 'OpenVINO Model Optimization',
    description: 'Edge deployment optimization achieving 1.5x inference speedup and 40% memory reduction for computer vision models.',
    tags: ['OpenVINO', 'Model Optimization', 'Edge AI', 'Intel'],
  },
]

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Video recognition of simple mastoidectomy using convolutional neural networks: Detection and segmentation of surgical tools and anatomical regions',
    authors: ['Namkug Kim', 'Joonmyeong Choi', 'Sungman Cho', 'Jong Woo Chung'],
    venue: 'Computer Methods and Programs in Biomedicine',
    year: '2021',
    link: 'https://www.sciencedirect.com/science/article/pii/S0169260721003254',
    impactFactor: 4.8,
  },
  {
    id: '2',
    title: 'An Open Medical Platform to Share Source Code and Various Pre-Trained Weights for Models to Use in Deep Learning Research',
    authors: ['Sungchul Kim', 'Sungman Cho', 'Kyungjin Cho', 'Jiyeon Seo', 'Yujin Nam', 'Jooyoung Park', 'Kyuri Kim', 'Daeun Kim', 'Jeongeun Hwang', 'Jihye Yun', 'Miso Jang', 'Hyunna Lee'],
    venue: 'Korean Journal of Radiology',
    year: '2021',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8628158/',
    impactFactor: 4.4,
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
