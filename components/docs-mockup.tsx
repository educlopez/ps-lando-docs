import { ArrowRight, FileText, BookOpen, Wrench, Database } from 'lucide-react';
import type { Dict } from '@/lib/i18n/dict';

/**
 * GitBook-style hero "screenshot" — a faux docs UI with sidebar + content.
 * Static React, not a real iframe. The point is to give visitors an
 * immediate sense of what the docs look like before they click through.
 */
export function DocsMockup({
  className = '',
  t,
}: {
  className?: string;
  t: Dict;
}) {
  const m = t.docsMockup;
  return (
    <div
      className={className}
      style={{
        maskImage:
          'linear-gradient(to bottom, black 72%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 72%, transparent 100%)',
      }}
    >
      <div className="bg-fd-background/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/10 dark:shadow-black/40 px-2 pt-2 overflow-hidden">
      <div className="bg-fd-card/95 rounded-[1.25rem] overflow-hidden shadow shadow-black/[0.065]">
      <div className="grid grid-cols-[180px_1fr] sm:grid-cols-[220px_1fr] min-h-[420px] sm:min-h-[480px]">
        {/* Sidebar */}
        <aside className="border-r border-fd-border/60 bg-fd-card/30 px-4 py-5 text-[12.5px]">
          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
            {m.gettingStarted}
          </div>
          <ul className="space-y-1 mb-5">
            <SidebarLink active>{m.pages.welcome}</SidebarLink>
            <SidebarLink>{m.pages.quickstart}</SidebarLink>
            <SidebarLink>{m.pages.installation}</SidebarLink>
          </ul>

          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
            {m.guides}
          </div>
          <ul className="space-y-1 mb-5">
            <SidebarLink>{m.pages.firstSandbox}</SidebarLink>
            <SidebarLink>{m.pages.selectingModules}</SidebarLink>
            <SidebarLink>{m.pages.hooksRecipes}</SidebarLink>
            <SidebarLink>{m.pages.sandboxLifecycle}</SidebarLink>
            <SidebarLink>{m.pages.doctor}</SidebarLink>
          </ul>

          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
            {m.reference}
          </div>
          <ul className="space-y-1 mb-5">
            <SidebarLink>{m.pages.commands}</SidebarLink>
            <SidebarLink>{m.pages.flags}</SidebarLink>
            <SidebarLink>{m.pages.recipesCatalog}</SidebarLink>
          </ul>

          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
            {m.kb}
          </div>
          <ul className="space-y-1">
            <SidebarLink>{m.pages.schemaDrift}</SidebarLink>
            <SidebarLink>{m.pages.symfonyCacheRaces}</SidebarLink>
          </ul>
        </aside>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-hidden">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
              {m.contentEyebrow}
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              {m.contentHeading}
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-6">
              {m.contentBody}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <DocCard
                icon={BookOpen}
                title={m.cards.quickstart.title}
                body={m.cards.quickstart.body}
              />
              <DocCard
                icon={Wrench}
                title={m.cards.recipes.title}
                body={m.cards.recipes.body}
              />
              <DocCard
                icon={Database}
                title={m.cards.lifecycle.title}
                body={m.cards.lifecycle.body}
              />
              <DocCard
                icon={FileText}
                title={m.cards.reference.title}
                body={m.cards.reference.body}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

function SidebarLink({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`px-2 py-1 rounded-md ${
        active
          ? 'text-fd-foreground bg-fd-accent font-medium'
          : 'text-fd-muted-foreground'
      }`}
    >
      {children}
    </li>
  );
}

function DocCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BookOpen;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-fd-border/60 bg-fd-card/40 p-3 hover:border-fd-primary/40 transition">
      <Icon className="size-4 text-fd-primary mb-2" />
      <div className="font-medium text-[13px] mb-0.5 flex items-center gap-1">
        {title}
        <ArrowRight className="size-3 text-fd-muted-foreground" />
      </div>
      <div className="text-[11px] text-fd-muted-foreground leading-relaxed">
        {body}
      </div>
    </div>
  );
}
