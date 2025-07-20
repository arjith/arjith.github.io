# Arjith Retna Srikanth - Personal Website & Blog

A beautiful, responsive personal website that showcases your projects, blog posts, and professional information by automatically pulling data from your GitHub profile.

## 🌟 Features

- **Responsive Design**: Beautiful design that works on all devices
- **GitHub Integration**: Automatically fetches and displays your repositories, stats, and profile information
- **Modern UI**: Clean, professional design with smooth animations
- **Blog Section**: Ready-to-use blog layout for your thoughts and articles
- **Contact Form**: Interactive contact form for visitors
- **SEO Optimized**: Proper meta tags and structured content
- **Fast Loading**: Optimized for performance with minimal dependencies

## 🚀 Live Demo

Visit your website at: `https://arjith.github.io`

## 📋 Prerequisites

- GitHub account
- GitHub repository named `<your-username>.github.io` (for GitHub Pages)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

## 🛠️ Setup Instructions

### 1. Repository Setup

1. **Fork or Clone this repository** to your GitHub account
2. **Rename the repository** to `<your-username>.github.io` (replace with your actual GitHub username)
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Click Save

### 2. Customize Your Information

#### Update Personal Information

1. **Edit `script.js`**:
   ```javascript
   const GITHUB_USERNAME = 'your-github-username'; // Change this to your GitHub username
   ```

2. **Edit `index.html`** and update:
   - Page title and meta description
   - Social media links in the hero section
   - LinkedIn URL (update the href in social links)
   - Any other personal information

#### Update Social Links

In `index.html`, find the social links section and update:
```html
<div class="social-links">
    <a href="https://github.com/your-username" target="_blank" aria-label="GitHub">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/your-linkedin-username" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://twitter.com/your-twitter-username" target="_blank" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
    </a>
</div>
```

### 3. GitHub Pages Configuration

1. **Go to your repository settings**
2. **Scroll down to "Pages" section**
3. **Select source**: Deploy from a branch
4. **Select branch**: main
5. **Select folder**: / (root)
6. **Click "Save"**

Your website will be available at `https://your-username.github.io` within a few minutes.

### 4. Automatic Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy your site when you push changes to the main branch.

## 🎨 Customization

### Colors and Styling

The main colors are defined in `styles.css`. You can customize:
- Primary color: `#2563eb` (blue)
- Secondary colors in the CSS variables
- Fonts (currently using Inter from Google Fonts)

### Adding Blog Posts

To add blog posts:

1. **Create a `blog` directory**
2. **Add markdown files** for each post
3. **Update the blog section** in `script.js` to load your posts
4. **Or manually add them** to the HTML in the blog section

### Adding More Sections

You can add more sections by:
1. Adding HTML structure in `index.html`
2. Adding corresponding CSS in `styles.css`
3. Adding navigation links if needed

## 📱 Features Breakdown

### Automatic GitHub Integration

The website automatically fetches and displays:
- ✅ Profile picture from GitHub
- ✅ Bio information
- ✅ Repository count
- ✅ Followers/following count
- ✅ Top repositories with stats
- ✅ Programming languages used
- ✅ Repository stars and forks
- ✅ Last updated dates

### Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet and desktop optimized
- ✅ Touch-friendly navigation
- ✅ Optimized images and content

### Performance Features

- ✅ Lazy loading
- ✅ Optimized images
- ✅ Minimal JavaScript
- ✅ CSS animations for smooth UX
- ✅ Fast loading fonts

## 🔧 Technical Details

### File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
└── README.md          # This file
```

### Dependencies

- **Font Awesome**: For icons
- **Google Fonts (Inter)**: For typography
- **GitHub API**: For fetching repository data

### Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment Options

### GitHub Pages (Recommended)

1. Push your code to a repository named `username.github.io`
2. Enable GitHub Pages in repository settings
3. Your site will be live at `https://username.github.io`

### Alternative Deployments

You can also deploy to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **Any static hosting service**

## 🐛 Troubleshooting

### GitHub API Rate Limiting

If you experience issues with GitHub data not loading:
1. The GitHub API has rate limits for unauthenticated requests
2. Consider adding a personal access token for higher limits
3. The site includes fallback data if the API fails

### GitHub Pages Not Loading

1. Check repository name matches `username.github.io`
2. Ensure `index.html` is in the root directory
3. Check GitHub Pages settings in repository
4. Wait a few minutes for deployment

### Social Links Not Working

1. Update all social media URLs in `index.html`
2. Ensure URLs are correct and publicly accessible
3. Remove social links you don't use

## 📝 Adding Content

### Blog Posts

Currently, the blog section shows a sample post. To add real blog posts:

1. **Option 1**: Manually add blog posts in HTML
2. **Option 2**: Integrate with a headless CMS
3. **Option 3**: Create a simple markdown-based blog system

### Project Showcases

The projects are automatically pulled from GitHub, but you can:
1. Pin important repositories on GitHub
2. Add better descriptions to your repositories
3. Add topics/tags to repositories for better categorization

## 🤝 Contributing

Feel free to:
1. Report bugs
2. Suggest improvements
3. Submit pull requests
4. Share your customizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Next Steps

After setting up your website:

1. **Customize the content** to match your personal brand
2. **Add your own blog posts** or remove the blog section
3. **Update social media links** with your actual profiles
4. **Add Google Analytics** for tracking (optional)
5. **Set up a custom domain** if desired
6. **Add more interactive features** as needed

## 📞 Support

If you need help with setup or customization:
1. Check the troubleshooting section above
2. Look at the GitHub Issues for common problems
3. Create a new issue if you find a bug

---

**Happy coding! 🚀**

Make sure to star this repository if you found it helpful!
