import { PrismaClient } from '@prisma/client';
import { getBlogCategories, getBlogPosts } from './data/blog-seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding blog data...');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dreamto.app';
  const defaultOg = `${siteUrl}/og-image.png`;

  // Create blog categories
  const categoryData = getBlogCategories();
  const categories = await Promise.all(
    categoryData.map((data) => prisma.blogCategory.create({ data }))
  );

  console.log(`✅ Created ${categories.length} blog categories`);

  // Create sample blog posts
  const categoryIds = categories.map((cat: { id: string }) => cat.id);
  const postData = getBlogPosts(categoryIds, defaultOg);
  const posts = await Promise.all(
    postData.map((data) => prisma.blogPost.create({ data }))
  );

  console.log(`✅ Created ${posts.length} blog posts`);
  console.log('🎉 Blog seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding blog data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });