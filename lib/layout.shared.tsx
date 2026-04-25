import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, githubUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-mono text-base tracking-tight">
          <span className="text-fd-muted-foreground">$</span> {appName}
        </span>
      ),
    },
    githubUrl,
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'npm',
        url: 'https://www.npmjs.com/package/ps-lando',
      },
    ],
  };
}
