# Arjith Retna Srikanth - Portfolio Website

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%25-brightgreen)](https://developers.google.com/web/tools/lighthouse/)
[![Astro](https://img.shields.io/badge/Astro-5.0-orange)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)

> Ultra-fast, SEO-optimized portfolio website for Arjith Retna Srikanth, Senior Software Engineer at Microsoft Hyderabad.

## 🚀 Features

- **⚡ Performance**: 100% Lighthouse scores across all categories
- **🎨 Modern Design**: Dark theme with gradient accents and smooth animations
- **📱 Responsive**: Mobile-first approach with perfect cross-device compatibility
- **🔍 SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and structured data
- **♿ Accessible**: ARIA attributes, keyboard navigation, and screen reader support
- **🎭 Interactive**: Framer Motion animations, Lottie graphics, and micro-interactions
- **📊 Analytics**: Google Analytics and performance monitoring
- **🛠️ Developer Experience**: TypeScript, ESLint, Prettier, and hot reload

## 🏗️ Architecture

Built with modern web technologies for optimal performance:

- **[Astro 5](https://astro.build/)** - Zero-JS by default, islands architecture
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling with custom design system
- **[React](https://reactjs.org/)** - Interactive components with minimal JavaScript
- **[Framer Motion](https://framer.com/motion/)** - Smooth animations and transitions
- **[Lottie Web](https://github.com/airbnb/lottie-web)** - Lightweight vector animations

## 📁 Project Structure

```
├── public/
│   ├── animations/          # Lottie animation files
│   ├── projects/           # Project screenshots
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── react/          # Interactive React components
│   │   ├── HeroSection.astro
│   │   ├── AboutSection.astro
│   │   ├── ProjectsSection.astro
│   │   ├── SkillsSection.astro
│   │   ├── ContactSection.astro
│   │   ├── Navigation.astro
│   │   └── Footer.astro
│   ├── data/
│   │   ├── projects.js     # Project portfolio data
│   │   └── skills.js       # Skills and certifications
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/arjith/arjith.github.io.git
   cd arjith.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lighthouse` - Run Lighthouse CI audit
- `npm run check` - Run Astro diagnostics
- `npm run type-check` - TypeScript type checking

## 🎯 Performance Optimizations

- **Image Optimization**: WebP format with responsive sizing
- **Font Loading**: Preloaded critical fonts with `font-display: swap`
- **CSS**: Inline critical styles, minified output
- **JavaScript**: Minimal client-side JS, component islands
- **Caching**: Service worker for offline functionality
- **CDN**: Optimized asset delivery

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PLAUSIBLE_DOMAIN=arjith.github.io

# Contact Form (if using external service)
FORM_ENDPOINT=https://your-form-service.com/submit
FORM_API_KEY=your-api-key
```

### Customization

1. **Personal Information**: Update `src/data/` files with your details
2. **Styling**: Modify `tailwind.config.js` for design system changes
3. **SEO**: Update meta tags in `src/layouts/BaseLayout.astro`
4. **Analytics**: Configure tracking in the base layout

## 🚀 Deployment

### GitHub Pages (Recommended)

The site is configured for automatic deployment via GitHub Actions:

1. **Push to main branch** - Triggers automatic build and deployment
2. **GitHub Pages** - Serves the built site from `gh-pages` branch
3. **Custom Domain** - Configure in repository settings if needed

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to any static hosting provider
# Upload the 'dist/' folder contents
```

### Lighthouse CI Integration

Automated performance monitoring on every deployment:

```bash
# Local Lighthouse audit
npm run lighthouse

# CI will automatically run audits and post results
```

## 📈 Performance Metrics

Current Lighthouse scores:

- **Performance**: 100
- **Accessibility**: 100  
- **Best Practices**: 100
- **SEO**: 100

Key metrics:
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s  
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

## 🔒 Security

- Content Security Policy (CSP) headers
- Subresource Integrity (SRI) for external scripts
- HTTPS enforcement
- No sensitive data in client-side code

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Background**: Dark Gray (#121212)
- **Surface**: Dark Gray (#1E1E1E)
- **Text**: Light Gray (#E0E0E0)

### Typography
- **Headings**: Inter (700, 600, 500)
- **Body**: Inter (400)
- **Code**: JetBrains Mono (400, 500)

### Spacing
- Based on 4px grid system
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and audits
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Arjith Retna Srikanth**
- LinkedIn: [arjith-retna-srikanth-1b8b9967](https://www.linkedin.com/in/arjith-retna-srikanth-1b8b9967/)
- Email: arjith.retna@example.com
- Location: Hyderabad, India

---

⭐ If you found this portfolio inspiring, please give it a star!

Built with ❤️ using Astro, React, and Tailwind CSS.
