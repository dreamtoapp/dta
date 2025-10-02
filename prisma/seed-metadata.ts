import { PrismaClient } from '@prisma/client';
import { pagesMetadata } from './data/pages-metadata';

const db = new PrismaClient();

async function seedMetadata() {
  console.log('🌱 Starting metadata seeding...');

  for (const page of pagesMetadata) {
    try {
      await db.pageMetadata.upsert({
        where: { pagePath: page.pagePath },
        create: page,
        update: page,
      });
      console.log(`✅ Seeded: ${page.pageName} (${page.pagePath})`);
    } catch (error) {
      console.error(`❌ Error seeding ${page.pageName}:`, error);
    }
  }

  console.log('✨ Metadata seeding completed!');
}

seedMetadata()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

