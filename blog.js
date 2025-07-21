// Blog posts data - Add your blog posts here
const blogPosts = [
    {
        id: 1,
        title: "Welcome to My Digital Journey",
        excerpt: "Starting my personal blog to share insights about technology, development, and innovation.",
        content: `
            <p>Welcome to my personal website and blog! I'm excited to share my journey as a developer and my thoughts on technology.</p>
            <p>In this space, I'll be sharing:</p>
            <ul>
                <li>Technical tutorials and insights</li>
                <li>Project breakdowns and lessons learned</li>
                <li>Industry trends and opinions</li>
                <li>Personal experiences in software development</li>
            </ul>
            <p>Stay tuned for more content, and feel free to reach out if you have any questions or suggestions!</p>
        `,
        date: "2025-07-20",
        category: "General",
        tags: ["welcome", "blog", "introduction"],
        readTime: "3 min read"
    },
    {
        id: 2,
        title: "Building Modern Web Applications",
        excerpt: "Exploring the latest trends and best practices in modern web development.",
        content: `
            <p>Modern web development has evolved significantly over the past few years. With new frameworks, tools, and methodologies emerging constantly, it's important to stay updated with the latest trends.</p>
            <p>Key areas to focus on in 2025:</p>
            <ul>
                <li><strong>Performance:</strong> Core Web Vitals and optimization</li>
                <li><strong>Accessibility:</strong> Making web applications inclusive</li>
                <li><strong>Security:</strong> Best practices for secure applications</li>
                <li><strong>User Experience:</strong> Creating intuitive interfaces</li>
            </ul>
            <p>In upcoming posts, I'll dive deeper into each of these areas with practical examples and code snippets.</p>
        `,
        date: "2025-07-18",
        category: "Web Development",
        tags: ["web-development", "javascript", "performance"],
        readTime: "5 min read"
    },
    {
        id: 3,
        title: "The Future of Software Development",
        excerpt: "My thoughts on emerging technologies and their impact on the software development landscape.",
        content: `
            <p>The software development landscape is constantly evolving. AI, machine learning, and new paradigms are reshaping how we build applications.</p>
            <p>Technologies to watch:</p>
            <ul>
                <li><strong>AI-Assisted Development:</strong> Tools like GitHub Copilot</li>
                <li><strong>Edge Computing:</strong> Bringing computation closer to users</li>
                <li><strong>WebAssembly:</strong> High-performance web applications</li>
                <li><strong>Serverless Architecture:</strong> Event-driven computing</li>
            </ul>
            <p>These technologies are not just trends; they're fundamentally changing how we approach problem-solving in software development.</p>
        `,
        date: "2025-07-15",
        category: "Technology",
        tags: ["future", "ai", "technology", "trends"],
        readTime: "4 min read"
    }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;

    blogGrid.innerHTML = '';

    blogPosts.forEach(post => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card fade-in';
        blogCard.innerHTML = `
            <div class="blog-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-footer">
                    <span class="read-time">${post.readTime}</span>
                    <button class="read-more-btn" onclick="openBlogPost(${post.id})">Read More</button>
                </div>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

// Function to open a blog post in a modal
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="blog-modal-content">
            <div class="blog-modal-header">
                <button class="close-modal">&times;</button>
            </div>
            <div class="blog-modal-body">
                <h1>${post.title}</h1>
                <div class="blog-modal-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-category">${post.category}</span>
                    <span class="read-time">${post.readTime}</span>
                </div>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <div class="blog-content-full">
                    ${post.content}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => closeBlogModal(modal);
    modal.onclick = (e) => {
        if (e.target === modal) closeBlogModal(modal);
    };

    // Animate modal in
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeBlogModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }, 300);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add this to your existing script.js or include it separately
