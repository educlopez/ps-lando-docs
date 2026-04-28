import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { githubUrl } from './shared';
import { getDict } from './i18n/dict';
import type { Locale } from './i18n';
import { LangSwitcher } from '@/components/lang-switcher';
import { BirdIcon } from '@/components/brand-icons';

export function baseOptions(locale: Locale = 'en'): BaseLayoutProps {
  const t = getDict(locale);
  const docsHref = locale === 'en' ? '/docs' : `/${locale}/docs`;

  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <BirdIcon className="size-6 text-fd-primary shrink-0" />
          <span className="font-semibold tracking-tight text-[15px]">
            Ps-lando
          </span>
        </span>
      ),
      url: locale === 'en' ? '/' : `/${locale}`,
      children: (
        <div className="ml-auto mr-2 flex items-center">
          <LangSwitcher
            current={locale}
            labels={{ en: t.langSwitcher.en, es: t.langSwitcher.es }}
            ariaLabel={t.langSwitcher.ariaLabel}
          />
        </div>
      ),
    },
    githubUrl,
    links: [
      {
        text: t.nav.docs,
        url: docsHref,
      },
      {
        text: 'npm',
        url: 'https://www.npmjs.com/package/ps-lando',
      },
    ],
  };
}
