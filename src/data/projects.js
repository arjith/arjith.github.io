// Projects data file
export const projects = [
  {
    id: 1,
    title: "Magentic UI",
    description: "A research prototype for a human-centered web agent, exploring agentic UI patterns and seamless AI interactions.",
    longDescription: "Magentic UI is a project that dives into the future of user interfaces where AI agents act as first-class citizens. It explores how we can build interfaces that are not just reactive but proactive, assisting users in complex tasks through a human-in-the-loop approach.",
    image: "/projects/magentic.jpg",
    technologies: ["TypeScript", "React", "AI", "Agentic UI"],
    category: "AI",
    featured: true,
    githubUrl: "https://github.com/arjith/magentic-ui",
    liveUrl: null,
    status: "Research",
    year: "2024"
  },
  {
    id: 2,
    title: "Jellyfin",
    description: "Contributions and customizations to the open-source media system for a personalized home media experience.",
    longDescription: "Working with the Jellyfin ecosystem to enhance media streaming capabilities, focusing on performance optimizations and custom plugin development for a seamless home theater experience.",
    image: "/projects/jellyfin.jpg",
    technologies: ["C#", ".NET", "Media Systems"],
    category: "Backend",
    featured: true,
    githubUrl: "https://github.com/arjith/jellyfin",
    liveUrl: null,
    status: "Active",
    year: "2023"
  },
  {
    id: 3,
    title: "Portfolio",
    description: "This very portfolio site, built with Astro and Tailwind CSS, focusing on a premium, high-performance aesthetic.",
    longDescription: "A modern, high-performance portfolio site leveraging Astro's static site generation and Tailwind CSS for a sleek, dark-themed design.",
    image: "/projects/portfolio.jpg",
    technologies: ["Astro", "Tailwind CSS", "JavaScript"],
    category: "Frontend",
    featured: false,
    githubUrl: "https://github.com/arjith/arjith.github.io",
    liveUrl: "https://arjith.github.io",
    status: "Completed",
    year: "2024"
  }
];

export const categories = [
  "All",
  "AI",
  "Backend",
  "Frontend"
];

export const technologies = [
  "TypeScript", "React", "AI", "Agentic UI", "C#", ".NET",
  "Astro", "Tailwind CSS", "JavaScript"
];
