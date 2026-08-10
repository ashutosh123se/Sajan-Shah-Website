import { alignCmsToFrontendDefaults } from '../utils/alignCmsToFrontendDefaults';
import { db } from '../utils/database';

(async () => {
  const result = await alignCmsToFrontendDefaults();
  console.log(result.message);
  console.log('Updated:', result.updated.join(', ') || '(none)');
  await db.$disconnect();
  process.exit(0);
})().catch(async (err) => {
  console.error(err);
  try {
    await db.$disconnect();
  } catch (_) {}
  process.exit(1);
});
