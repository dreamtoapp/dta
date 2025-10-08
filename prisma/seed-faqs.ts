import { PrismaClient } from '@prisma/client';
import { allFAQs, homepageFAQs, servicesFAQs, influencersFAQs, worksampleFAQs, teamFAQs, contactusFAQs } from './data/faqs.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FAQ seeding...');

  try {
    // Always reseed: delete all existing FAQs, then insert fresh dataset
    const existingFAQs = await (prisma as any).fAQ.count();
    if (existingFAQs > 0) {
      console.log(`🧹 Deleting ${existingFAQs} existing FAQs...`);
      await (prisma as any).fAQ.deleteMany({});
      console.log('✅ Existing FAQs deleted.');
    }

    // Seed all pages from centralized dataset
    console.log('📝 Seeding FAQs dataset...');
    for (const faq of allFAQs) {
      await (prisma as any).fAQ.create({ data: faq });
    }
    const totalFAQs = allFAQs.length;
    console.log(`\n🎉 Successfully seeded ${totalFAQs} FAQs!`);
    console.log('📊 Breakdown:');
    console.log(`   - Homepage: ${homepageFAQs.length} FAQs`);
    console.log(`   - Services: ${servicesFAQs.length} FAQs`);
    console.log(`   - Influencers: ${influencersFAQs.length} FAQs`);
    console.log(`   - Work Samples: ${worksampleFAQs.length} FAQs`);
    console.log(`   - Team: ${teamFAQs.length} FAQs`);
    console.log(`   - Contact Us: ${contactusFAQs.length} FAQs`);
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
