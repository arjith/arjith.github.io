import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Arjith Retna Srikanth/);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content', 
      expect.stringContaining('Personal blog and portfolio')
    );
  });

  test('navigation menu works correctly', async ({ page }) => {
    // Check if navigation menu is visible
    await expect(page.locator('.navbar')).toBeVisible();
    
    // Test navigation links
    const navLinks = ['about', 'projects', 'blog', 'contact'];
    
    for (const link of navLinks) {
      const navLink = page.locator(`a[href="#${link}"]`);
      await expect(navLink).toBeVisible();
      
      // Click the link and verify it scrolls to the section
      await navLink.click();
      await expect(page.locator(`#${link}`)).toBeInViewport();
    }
  });

  test('hero section displays correctly', async ({ page }) => {
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.hero-title')).toContainText('Arjith');
    await expect(page.locator('.hero-subtitle')).toBeVisible();
    await expect(page.locator('.hero-buttons')).toBeVisible();
    await expect(page.locator('.social-links')).toBeVisible();
  });

  test('GitHub profile integration works', async ({ page }) => {
    // Wait for GitHub data to load
    await page.waitForTimeout(3000);
    
    // Check if GitHub avatar loads
    const avatar = page.locator('#github-avatar');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('src', expect.stringContaining('githubusercontent'));
    
    // Check if stats are populated
    await expect(page.locator('#repo-count')).not.toHaveText('0');
    await expect(page.locator('#follower-count')).toBeVisible();
  });

  test('projects section displays repositories', async ({ page }) => {
    await page.goto('/#projects');
    
    await expect(page.locator('.projects-grid')).toBeVisible();
    
    // Wait for projects to load
    await page.waitForTimeout(3000);
    
    const projectCards = page.locator('.project-card');
    await expect(projectCards.first()).toBeVisible();
  });

  test('blog section is functional', async ({ page }) => {
    await page.goto('/#blog');
    
    await expect(page.locator('.blog-grid')).toBeVisible();
    
    const blogCards = page.locator('.blog-card');
    await expect(blogCards.first()).toBeVisible();
    
    // Test blog modal functionality
    const readMoreBtn = page.locator('.read-more-btn').first();
    if (await readMoreBtn.isVisible()) {
      await readMoreBtn.click();
      await expect(page.locator('.blog-modal')).toBeVisible();
      
      // Close modal
      await page.locator('.close-modal').click();
      await expect(page.locator('.blog-modal')).not.toBeVisible();
    }
  });

  test('contact form is functional', async ({ page }) => {
    await page.goto('/#contact');
    
    await expect(page.locator('#contact-form')).toBeVisible();
    
    // Fill out form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'This is a test message');
    
    // Submit form (this will show an alert in our implementation)
    page.on('dialog', dialog => dialog.accept());
    await page.click('button[type="submit"]');
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu
    const navToggle = page.locator('.nav-toggle');
    await expect(navToggle).toBeVisible();
    
    // Test mobile menu functionality
    await navToggle.click();
    await expect(page.locator('.nav-menu.active')).toBeVisible();
    
    // Check hero section adapts to mobile
    await expect(page.locator('.hero-content')).toBeVisible();
  });

  test('scroll animations work', async ({ page }) => {
    // Test fade-in animations
    const animatedElements = page.locator('.fade-in');
    
    // Scroll down to trigger animations
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Check if elements have visible class
    await expect(animatedElements.first()).toHaveClass(/visible/);
  });

  test('performance metrics are within acceptable ranges', async ({ page }) => {
    // Navigate and wait for load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    
    // Assert reasonable load times (adjust thresholds as needed)
    expect(metrics.loadTime).toBeLessThan(5000); // 5 seconds
    expect(metrics.domContentLoaded).toBeLessThan(3000); // 3 seconds
    expect(metrics.firstPaint).toBeLessThan(2000); // 2 seconds
  });

  test('accessibility standards are met', async ({ page }) => {
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toHaveCount(1);
    
    // Check for alt attributes on images
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
    
    // Check for proper form labels
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        await expect(page.locator(`label[for="${id}"]`)).toBeVisible();
      }
    }
  });
});
