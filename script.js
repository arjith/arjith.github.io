// Global variables
const GITHUB_USERNAME = 'arjith';
const API_BASE = 'https://api.github.com';

// DOM Elements
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    
    // Load GitHub data
    await loadGitHubData();
    
    // Render blog posts
    if (typeof renderBlogPosts === 'function') {
        renderBlogPosts();
    }
    
    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // For now, we'll just show an alert
        // In a real implementation, you would send this to a backend service
        alert(`Thank you, ${data.name}! Your message has been received. I'll get back to you soon!`);
        form.reset();
    });
}

// GitHub API functions
async function fetchGitHubData(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return null;
    }
}

async function loadGitHubData() {
    try {
        // Fetch user profile
        const userProfile = await fetchGitHubData(`/users/${GITHUB_USERNAME}`);
        if (userProfile) {
            updateUserProfile(userProfile);
        }

        // Fetch repositories
        const repos = await fetchGitHubData(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (repos) {
            updateRepositories(repos);
            updateStats(repos);
        }

        // Fetch user events for commit count (approximate)
        const events = await fetchGitHubData(`/users/${GITHUB_USERNAME}/events?per_page=100`);
        if (events) {
            updateCommitStats(events);
        }

    } catch (error) {
        console.error('Error loading GitHub data:', error);
        showFallbackData();
    }
}

function updateUserProfile(profile) {
    // Update avatar
    const avatar = document.getElementById('github-avatar');
    if (avatar && profile.avatar_url) {
        avatar.src = profile.avatar_url;
        avatar.alt = profile.name || profile.login;
    }

    // Update bio
    const bio = document.getElementById('github-bio');
    if (bio) {
        bio.textContent = profile.bio || 
            `I'm ${profile.name || profile.login}, a passionate developer focused on creating innovative solutions and sharing knowledge with the community. Welcome to my digital space where I showcase my projects and thoughts on technology.`;
    }

    // Update email
    const email = document.getElementById('github-email');
    if (email) {
        email.textContent = profile.email || 'Available on GitHub';
    }

    // Update follower count
    const followerCount = document.getElementById('follower-count');
    if (followerCount) {
        followerCount.textContent = formatNumber(profile.followers || 0);
    }

    // Update repo count
    const repoCount = document.getElementById('repo-count');
    if (repoCount) {
        repoCount.textContent = formatNumber(profile.public_repos || 0);
    }

    // Update following count
    const followingCount = document.getElementById('total-following');
    if (followingCount) {
        followingCount.textContent = formatNumber(profile.following || 0);
    }

    // Update total repos in stats
    const totalRepos = document.getElementById('total-repos');
    if (totalRepos) {
        totalRepos.textContent = formatNumber(profile.public_repos || 0);
    }
}

function updateRepositories(repos) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Filter and sort repositories
    const featuredRepos = repos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => {
            const scoreA = (a.stargazers_count * 3) + (a.forks_count * 2) + (a.watchers_count);
            const scoreB = (b.stargazers_count * 3) + (b.forks_count * 2) + (b.watchers_count);
            return scoreB - scoreA;
        })
        .slice(0, 6); // Show top 6 projects

    projectsGrid.innerHTML = '';

    featuredRepos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });

    // Update skills based on languages used
    updateSkills(repos);
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">
                ${repo.description || 'No description available'}
            </p>
        </div>
        <div class="project-body">
            <div class="project-stats">
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-eye"></i>
                    <span>${repo.watchers_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-calendar"></i>
                    <span>${updatedDate}</span>
                </div>
            </div>
            ${repo.language ? `
                <div class="project-languages">
                    <span class="language-tag">${repo.language}</span>
                </div>
            ` : ''}
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Code
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

function updateStats(repos) {
    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalStarsEl = document.getElementById('total-stars');
    if (totalStarsEl) {
        totalStarsEl.textContent = formatNumber(totalStars);
    }
}

function updateCommitStats(events) {
    // Approximate commit count from recent events
    const pushEvents = events.filter(event => event.type === 'PushEvent');
    const recentCommits = pushEvents.reduce((sum, event) => {
        return sum + (event.payload?.commits?.length || 0);
    }, 0);

    // This is just recent commits, so we'll estimate total
    const estimatedTotal = Math.max(recentCommits * 10, 100); // Rough estimate
    
    const totalCommits = document.getElementById('total-commits');
    if (totalCommits) {
        totalCommits.textContent = formatNumber(estimatedTotal) + '+';
    }
}

function updateSkills(repos) {
    const skillsContainer = document.getElementById('skill-tags');
    if (!skillsContainer) return;

    // Extract languages from repositories
    const languages = repos
        .filter(repo => repo.language)
        .map(repo => repo.language);

    // Count language occurrences
    const languageCounts = languages.reduce((acc, lang) => {
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
    }, {});

    // Sort by frequency and take top languages
    const topLanguages = Object.entries(languageCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8)
        .map(([lang]) => lang);

    // Add some common additional skills
    const additionalSkills = ['Git', 'REST APIs', 'CI/CD', 'Cloud Computing'];
    const allSkills = [...topLanguages, ...additionalSkills];

    skillsContainer.innerHTML = '';
    allSkills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        skillsContainer.appendChild(tag);
    });
}

function showFallbackData() {
    // Show default data if GitHub API fails
    const defaultSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'HTML/CSS', 'REST APIs', 'Cloud Computing'];
    const skillsContainer = document.getElementById('skill-tags');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        defaultSkills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            skillsContainer.appendChild(tag);
        });
    }

    // Set default stats
    const stats = {
        'total-commits': '500+',
        'total-stars': '50+',
        'total-repos': '20+',
        'total-following': '100+',
        'repo-count': '20+',
        'follower-count': '50+'
    };

    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;

    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
});

// Add typing effect to hero title
function typeEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.innerHTML;
    title.innerHTML = '';
    title.style.borderRight = '2px solid #fff';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Initialize typing effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeEffect, 500);
            heroObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add particle effect to hero section (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
}
