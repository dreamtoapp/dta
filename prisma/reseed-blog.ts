import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning old blog data...');

  // Delete all blog posts first (due to foreign key)
  const deletedPosts = await prisma.blogPost.deleteMany({});
  console.log(`✅ Deleted ${deletedPosts.count} blog posts`);

  // Delete all blog categories
  const deletedCategories = await prisma.blogCategory.deleteMany({});
  console.log(`✅ Deleted ${deletedCategories.count} blog categories`);

  console.log('🌱 Reseeding blog data...');

  // Import and run the seed script
  const seedModule = await import('./seed-blog.js');
  // The seed script runs automatically when imported
}

main()
  .catch((e) => {
    console.error('❌ Error reseeding blog data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

