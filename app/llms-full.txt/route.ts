import { getLLMText, source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  // Default-locale (EN) only. ES content has its own /es/llms-full.txt
  // route below should it be added later — for now we ship a single
  // canonical index keyed off the default language.
  const scan = source.getPages('en').map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
