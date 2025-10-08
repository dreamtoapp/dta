/**
 * Generate a URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')           // Replace spaces and underscores with hyphens
    .replace(/[^\w\u0600-\u06FF-]+/g, '') // Keep only word chars and Arabic chars
    .replace(/--+/g, '-')               // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');          // Remove leading/trailing hyphens
}

/**
 * Calculate estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: 'en' | 'ar'): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Extract first image from markdown content
 */
export function extractFirstImage(markdown: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);
  return match ? match[1] : null;
}

/**
 * Generate excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s/g, '')        // Remove headers
    .replace(/\*\*?(.*?)\*\*?/g, '$1') // Remove bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code
    .replace(/\n+/g, ' ')             // Replace newlines with spaces
    .trim();

  return truncateText(plainText, maxLength);
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9\u0600-\u06FF]+(?:-[a-z0-9\u0600-\u06FF]+)*$/.test(slug);
}

/**
 * Get reading time label
 */
export function getReadingTimeLabel(minutes: number, locale: 'en' | 'ar'): string {
  if (locale === 'ar') {
    return `${minutes} دقيقة قراءة`;
  }
  return `${minutes} min read`;
}


