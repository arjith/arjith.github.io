// Projects data file
export const projects = [
  {
    id: 1,
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and bug detection system using machine learning to enhance developer productivity.",
    longDescription: "Built an advanced AI-powered code assistant that provides real-time code suggestions, detects potential bugs, and offers optimization recommendations. The system processes millions of code patterns to provide contextually relevant assistance to developers across multiple programming languages.",
    image: "/projects/ai-code-assistant.jpg",
    technologies: ["Python", "TensorFlow", "Azure ML", "TypeScript", "React", "Node.js"],
    category: "AI/ML",
    featured: true,
    githubUrl: "https://github.com/arjith/ai-code-assistant",
    liveUrl: "https://ai-assistant-demo.azurewebsites.net",
    status: "Completed",
    year: "2024",
    highlights: [
      "98% accuracy in bug detection",
      "40% reduction in development time",
      "Support for 15+ programming languages",
      "Integration with VS Code and JetBrains IDEs"
    ],
    achievements: [
      "Deployed to 10,000+ developers",
      "Featured in Microsoft Developer Blog",
      "Winner - Internal Innovation Award 2024"
    ]
  },
  {
    id: 2,
    title: "Scalable Microservices Platform",
    description: "Cloud-native microservices architecture handling millions of requests with auto-scaling and monitoring.",
    longDescription: "Designed and implemented a robust microservices platform on Azure that automatically scales based on demand. The system includes comprehensive monitoring, logging, and alerting capabilities with zero-downtime deployments.",
    image: "/projects/microservices-platform.jpg",
    technologies: ["C#", ".NET Core", "Azure Service Fabric", "Docker", "Kubernetes", "Redis", "SQL Server"],
    category: "Backend",
    featured: true,
    githubUrl: "https://github.com/arjith/microservices-platform",
    liveUrl: null,
    status: "In Production",
    year: "2023",
    highlights: [
      "99.99% uptime achieved",
      "Handles 1M+ requests per day",
      "Auto-scaling saves 60% in infrastructure costs",
      "Sub-100ms response times"
    ],
    achievements: [
      "Reduced infrastructure costs by 60%",
      "Improved system reliability by 99.9%",
      "Zero downtime in 18 months"
    ]
  },
  {
    id: 3,
    title: "Developer Experience Dashboard",
    description: "Comprehensive analytics dashboard for tracking development metrics and team productivity insights.",
    longDescription: "Created a modern dashboard that aggregates data from multiple development tools to provide actionable insights into team productivity, code quality, and project health. Features real-time updates and customizable visualizations.",
    image: "/projects/dev-dashboard.jpg",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "GraphQL", "Docker"],
    category: "Frontend",
    featured: false,
    githubUrl: "https://github.com/arjith/dev-experience-dashboard",
    liveUrl: "https://devdashboard.arjith.dev",
    status: "Completed",
    year: "2023",
    highlights: [
      "Real-time data synchronization",
      "Custom visualization components",
      "Integration with 10+ dev tools",
      "Mobile-responsive design"
    ],
    achievements: [
      "Adopted by 5 teams at Microsoft",
      "20% improvement in development velocity",
      "Featured in internal tech talks"
    ]
  },
  {
    id: 4,
    title: "Real-time Collaboration Engine",
    description: "WebSocket-based collaborative editing system supporting multiple users with conflict resolution.",
    longDescription: "Built a sophisticated real-time collaboration engine that enables multiple users to work on documents simultaneously. Implements operational transformation for conflict resolution and maintains document consistency.",
    image: "/projects/collaboration-engine.jpg",
    technologies: ["WebSocket", "Node.js", "Redis", "MongoDB", "React", "Operational Transform"],
    category: "Real-time",
    featured: false,
    githubUrl: "https://github.com/arjith/realtime-collaboration",
    liveUrl: "https://collab.arjith.dev",
    status: "Completed",
    year: "2022",
    highlights: [
      "Support for 100+ concurrent users",
      "Sub-50ms latency",
      "Automatic conflict resolution",
      "Offline sync capabilities"
    ],
    achievements: [
      "Zero data loss in conflict scenarios",
      "99.9% message delivery success rate",
      "Scaled to 10,000+ simultaneous connections"
    ]
  },
  {
    id: 5,
    title: "Cloud Infrastructure Automation",
    description: "Infrastructure as Code solution for automated Azure resource provisioning and management.",
    longDescription: "Developed a comprehensive IaC solution using Terraform and Azure DevOps to automate the provisioning and management of cloud resources. Includes security best practices and cost optimization.",
    image: "/projects/infrastructure-automation.jpg",
    technologies: ["Terraform", "Azure DevOps", "PowerShell", "ARM Templates", "Azure CLI", "Git"],
    category: "DevOps",
    featured: false,
    githubUrl: "https://github.com/arjith/azure-iac-automation",
    liveUrl: null,
    status: "Completed",
    year: "2022",
    highlights: [
      "90% reduction in provisioning time",
      "Standardized security configurations",
      "Automated cost monitoring",
      "Multi-environment support"
    ],
    achievements: [
      "Saved 200+ hours monthly",
      "Reduced security incidents by 80%",
      "Implemented across 50+ projects"
    ]
  },
  {
    id: 6,
    title: "Mobile Performance Analytics",
    description: "Cross-platform mobile SDK for tracking app performance and user experience metrics.",
    longDescription: "Created a lightweight SDK for mobile applications that tracks performance metrics, crash reports, and user experience data. Provides detailed analytics dashboard for app optimization.",
    image: "/projects/mobile-analytics.jpg",
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Azure Functions", "TypeScript"],
    category: "Mobile",
    featured: false,
    githubUrl: "https://github.com/arjith/mobile-performance-sdk",
    liveUrl: "https://mobileanalytics.arjith.dev",
    status: "Completed",
    year: "2021",
    highlights: [
      "Cross-platform compatibility",
      "Real-time crash reporting",
      "Battery usage optimization",
      "Privacy-focused data collection"
    ],
    achievements: [
      "Integrated in 20+ apps",
      "Detected 1000+ performance issues",
      "Improved app ratings by average 0.5 stars"
    ]
  }
];

export const categories = [
  "All",
  "AI/ML",
  "Backend",
  "Frontend", 
  "Real-time",
  "DevOps",
  "Mobile"
];

export const technologies = [
  "Python", "TypeScript", "React", "Node.js", "C#", ".NET Core",
  "Azure", "Docker", "Kubernetes", "TensorFlow", "PostgreSQL",
  "MongoDB", "Redis", "GraphQL", "WebSocket", "Terraform"
];
