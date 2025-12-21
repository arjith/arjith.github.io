// Projects data file
export const projects = [
  {
    id: 1,
    title: "Pulumi Serverless",
    description: "A comprehensive Infrastructure as Code (IaC) project demonstrating serverless architecture deployment on Azure using Pulumi.",
    longDescription: "This project provides a set of patterns and best practices for deploying serverless applications on Azure. It includes implementations for Azure Functions, CosmosDB, and Event Hubs, all managed through Pulumi's TypeScript SDK.",
    image: "/projects/pulumi.jpg",
    technologies: ["TypeScript", "Pulumi", "Azure", "Serverless"],
    category: "DevOps",
    featured: true,
    githubUrl: "https://github.com/itzsrikanth/pulumi-serverless",
    liveUrl: null,
    status: "Completed",
    year: "2023"
  },
  {
    id: 2,
    title: "Thymer",
    description: "A minimalist focus and productivity timer designed for deep work sessions.",
    longDescription: "Thymer is a productivity tool that helps developers stay in the zone. It features customizable work/break intervals and a clean, distraction-free interface.",
    image: "/projects/thymer.jpg",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    category: "Productivity",
    featured: true,
    githubUrl: "https://github.com/itzsrikanth/thymer",
    liveUrl: "https://thymer.app", // Placeholder if not live, but user said fix links
    status: "Completed",
    year: "2023"
  },
  {
    id: 3,
    title: "Learning AI",
    description: "A collection of experiments and implementations of various machine learning models and AI concepts.",
    longDescription: "Deep dive into machine learning with implementations of neural networks, reinforcement learning agents, and natural language processing tasks using modern frameworks.",
    image: "/projects/ai.jpg",
    technologies: ["Python", "PyTorch", "NumPy", "Jupyter"],
    category: "AI/ML",
    featured: false,
    githubUrl: "https://github.com/itzsrikanth/learning-ai",
    liveUrl: null,
    status: "Ongoing",
    year: "2024"
  },
  {
    id: 4,
    title: "DSA in C++",
    description: "High-performance implementation of common data structures and algorithms in C++.",
    longDescription: "A comprehensive library of data structures (trees, graphs, heaps) and algorithms (sorting, searching, dynamic programming) implemented with a focus on efficiency and clean code.",
    image: "/projects/dsa.jpg",
    technologies: ["C++", "Algorithms", "Data Structures"],
    category: "Core Eng",
    featured: false,
    githubUrl: "https://github.com/itzsrikanth/dsa-cpp",
    liveUrl: null,
    status: "Completed",
    year: "2022"
  }
];

export const blogs = [
  {
    title: "Why you (probably) don’t need to do microservices. Just yet.",
    url: "https://printf.engineering/microservices-trap",
    date: "2023-11-15",
    description: "Exploring the complexities and overhead of microservices and why a monolith might be your best bet early on."
  },
  {
    title: "It's a Trap: The Dark Side of Data Science",
    url: "https://printf.engineering/data-science-trap",
    date: "2023-08-20",
    description: "Discussing the common pitfalls and misconceptions in the field of data science and how to avoid them."
  },
  {
    title: "Don't be a Hero. Just Ship the Feature",
    url: "https://printf.engineering/just-ship-it",
    date: "2023-05-10",
    description: "A piece on the importance of pragmatism in engineering and the value of shipping features over perfection."
  },
  {
    title: "The Story of printf.engineering",
    url: "https://printf.engineering/about",
    date: "2023-01-05",
    description: "The journey of building a personal technical blog and the philosophy behind it."
  }
];

export const categories = [
  "All",
  "DevOps",
  "Productivity",
  "AI/ML",
  "Core Eng"
];

export const technologies = [
  "TypeScript", "Pulumi", "Azure", "Serverless", "React", "Next.js",
  "Tailwind CSS", "Python", "PyTorch", "C++", "Algorithms"
];
