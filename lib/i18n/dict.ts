import type { Locale } from '@/lib/i18n';

/**
 * Site-wide dictionary for the marketing layout, home page, and shared UI.
 *
 * Keep this file the SINGLE SOURCE OF TRUTH for translatable strings outside
 * of MDX content. Code values (commands, flags, recipe names, SQL columns,
 * version numbers) are NEVER translated and stay in JSX as-is.
 */

type AnnouncementCopy = {
  pill: string;
  body: string;
};

type HeroCopy = {
  pill: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  tabs: { docs: string; install: string; diagnose: string };
};

type BentoCopy = {
  eyebrow: string;
  heading: string;
  oneCommand: { eyebrow: string; title: string; body: string; caption: string };
  moduleSelection: { eyebrow: string; title: string; caption: string };
  doctor: { eyebrow: string; title: string; caption: string };
  recipes: { eyebrow: string; title: string; body: string; caption: string };
  lifecycle: { eyebrow: string; title: string; caption: string };
  llm: { eyebrow: string; title: string; caption: string };
};

type LlmCopy = {
  eyebrow: string;
  heading: string;
  llmsTxt: { eyebrow: string; title: string; body: string; cta: string };
  hooks: { eyebrow: string; title: string; body: string; cta: string };
  pipeline: { eyebrow: string; title: string; body: string; cta: string };
  compat: { eyebrow: string; title: string; body: string; cta: string };
};

type ImageSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

type UseCasesCopy = {
  eyebrow: string;
  heading: string;
  daily: { eyebrow: string; title: string; body: string; cta: string };
  onboarding: { eyebrow: string; title: string; body: string; cta: string };
  qa: { eyebrow: string; title: string; body: string; cta: string };
};

type StatsCopy = {
  eyebrow: string;
  heading: string;
  testsPassing: string;
  modulesSupported: string;
  avgCreate: string;
  recipes: string;
};

type CompatBandCopy = {
  eyebrow: string;
  heading: string;
  cta: string;
};

type QuoteCopy = {
  body: string;
  authorRole: string;
};

type FinalCtaCopy = {
  heading: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type FooterCopy = {
  tagline: string;
  by: string;
  documentation: string;
  reference: string;
  community: string;
  links: {
    welcome: string;
    quickstart: string;
    selectingModules: string;
    recipes: string;
    lifecycle: string;
    commands: string;
    flags: string;
    recipesCatalog: string;
    compatibility: string;
    github: string;
    npmPackage: string;
    reportIssue: string;
    changelog: string;
  };
  copyright: string;
};

type NavCopy = {
  docs: string;
  reference: string;
  kb: string;
  changelog: string;
  getStarted: string;
  themeToggleAriaLabel: string;
};

type DocsMockupCopy = {
  gettingStarted: string;
  guides: string;
  reference: string;
  kb: string;
  pages: {
    welcome: string;
    quickstart: string;
    installation: string;
    firstSandbox: string;
    selectingModules: string;
    hooksRecipes: string;
    sandboxLifecycle: string;
    doctor: string;
    commands: string;
    flags: string;
    recipesCatalog: string;
    schemaDrift: string;
    symfonyCacheRaces: string;
  };
  contentEyebrow: string;
  contentHeading: string;
  contentBody: string;
  cards: {
    quickstart: { title: string; body: string };
    recipes: { title: string; body: string };
    lifecycle: { title: string; body: string };
    reference: { title: string; body: string };
  };
};

type LangSwitcherCopy = {
  ariaLabel: string;
  en: string;
  es: string;
};

export type Dict = {
  announcement: AnnouncementCopy;
  nav: NavCopy;
  langSwitcher: LangSwitcherCopy;
  hero: HeroCopy;
  bento: BentoCopy;
  llmSection: LlmCopy;
  useCases: UseCasesCopy;
  schemaSection: ImageSectionCopy;
  stats: StatsCopy;
  compatBand: CompatBandCopy;
  quote: QuoteCopy;
  finalCta: FinalCtaCopy;
  footer: FooterCopy;
  docsMockup: DocsMockupCopy;
  metaDescription: string;
};

export const dict: Record<Locale, Dict> = {
  en: {
    announcement: {
      pill: 'New',
      body: 'v1.0.0 — zero-config, open to any theme',
    },
    nav: {
      docs: 'Docs',
      reference: 'Reference',
      kb: 'Knowledge base',
      changelog: 'Changelog',
      getStarted: 'Get started',
      themeToggleAriaLabel: 'Toggle theme',
    },
    langSwitcher: {
      ariaLabel: 'Language',
      en: 'EN',
      es: 'ES',
    },
    hero: {
      pill: 'New · v1.0 zero-config, open to any theme',
      titleLine1: 'Local PrestaShop sandboxes,',
      titleLine2: 'in one command.',
      description:
        'Drop any theme zip, run one command, and you have a working PrestaShop 8 or 9 store in 6 minutes — zero-config, no wizard, no manual SQL.',
      ctaPrimary: 'Get started',
      ctaSecondary: 'View on GitHub',
      tabs: { docs: 'Docs', install: 'Install', diagnose: 'Diagnose' },
    },
    bento: {
      eyebrow: 'Everything in one CLI',
      heading: 'Built so the boring 80% disappears.',
      oneCommand: {
        eyebrow: 'One command',
        title: 'Spin up a sandbox in 6 minutes.',
        body: 'PrestaShop from the official CDN, theme extracted, modules installed in parallel batches.',
        caption:
          'From npm install to a working shop in under six minutes — no wizard, no manual SQL.',
      },
      moduleSelection: {
        eyebrow: 'Module selection',
        title: 'Only the modules your client needs.',
        caption:
          'Filter modules with --exclude / --only globs from the CLI, or pin them in pslando.config.json.',
      },
      doctor: {
        eyebrow: 'Doctor',
        title: "Knows what's wrong before you do.",
        caption:
          'One pass scans Docker, Node, ports and disk — and offers --fix when a problem is auto-repairable.',
      },
      recipes: {
        eyebrow: 'Recipes',
        title: 'Scripts for the boring 80%.',
        body: 'Demo data, ES tax rules, cache warmup, clean-seed. Drop your own under init-scripts/.',
        caption:
          'Reusable bash, Node and PHP scripts for the data setup you would otherwise click through every time.',
      },
      lifecycle: {
        eyebrow: 'Lifecycle',
        title: 'Reset, snapshot, restore.',
        caption:
          'db reset, dump, restore — keep an iteration loop tight without ever rebuilding from scratch.',
      },
      llm: {
        eyebrow: 'LLM ready',
        title: 'llms.txt, generated for you.',
        caption:
          'Every page indexed in llms.txt and llms-full.txt so Claude, Cursor and ChatGPT read your docs natively.',
      },
    },
    llmSection: {
      eyebrow: 'Built for the LLM era',
      heading: "Knowledge that's readable by both humans and agents.",
      llmsTxt: {
        eyebrow: 'llms.txt',
        title: 'Indexed for AI tools by default.',
        body: 'Every page goes into llms.txt and llms-full.txt — Claude, ChatGPT and Cursor read your docs natively, no extra setup.',
        cta: 'How llms.txt works',
      },
      hooks: {
        eyebrow: 'Hooks',
        title: 'Bring your own scripts.',
        body: 'Drop bash, Node or PHP files into init-scripts/. ps-lando injects PS_LANDO_* env vars and runs them at the right moment of every create.',
        cta: 'Hooks guide',
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Composable from create to ship.',
        body: 'One command runs the full chain: download, install, theme, modules, recipes, hooks. Every step is observable in the install log.',
        cta: 'See the pipeline',
      },
      compat: {
        eyebrow: 'Compatibility',
        title: 'Every PrestaShop, one CLI.',
        body: 'PS 8.0, 8.1, 8.2, 8.3, 9.0, 9.1 — pinned, tested, documented. Switch versions without rebuilding your workflow.',
        cta: 'Compatibility matrix',
      },
    },
    useCases: {
      eyebrow: 'Use cases',
      heading: 'Built for the loops you actually run.',
      daily: {
        eyebrow: 'Daily development',
        title: 'Iterate without waiting for create.',
        body: 'db reset rebuilds your sandbox in 3-5 min while keeping the cached PS zip and theme extraction. Try a recipe, break it, reset, retry — without paying the full create cost each round.',
        cta: 'Lifecycle commands',
      },
      onboarding: {
        eyebrow: 'Client onboarding',
        title: 'A clean slate, per project.',
        body: 'Spin up a fresh sandbox in its own folder per client. The module selection lives in .ps-lando.json so the rest of the team replicates your setup with one command.',
        cta: 'Selecting modules',
      },
      qa: {
        eyebrow: 'QA & demos',
        title: 'Reproducible, every time.',
        body: 'db dump --with-files packages the SQL plus img/ and theme overrides into one tar.gz. Send it to QA, restore in seconds, demo to the client without rebuilding from scratch.',
        cta: 'Snapshots',
      },
    },
    schemaSection: {
      eyebrow: 'Schema-aware',
      title: 'PrestaShop 8 and 9, handled.',
      body: 'HTMLPurifier dirs. theme:enable bugs. Symfony container races. Columns dropped in PS 9. ps-lando knows every drift between PrestaShop 8 and 9 and works around it — so you never see them.',
      cta: 'Knowledge base',
    },
    stats: {
      eyebrow: 'By the numbers',
      heading:
        'Battle-tested across two PrestaShop major versions and six point releases.',
      testsPassing: 'Tests passing',
      modulesSupported: 'Modules supported',
      avgCreate: 'Avg. create time',
      recipes: 'Bundled recipes',
    },
    compatBand: {
      eyebrow: 'Compatibility',
      heading: 'Validated against the versions your clients actually run.',
      cta: 'Full matrix',
    },
    quote: {
      body: "PrestaShop's setup wizard is fine for one install. It is not fine when you start a new client project every couple of weeks. ps-lando exists so the boring parts of that loop disappear.",
      authorRole: 'Maintainer, daily-driver since v0.1.0',
    },
    finalCta: {
      heading: 'Ready to drop the wizard?',
      body: 'Read the docs, run one command, have a working PrestaShop sandbox in front of you before your second coffee.',
      ctaPrimary: 'Get started',
      ctaSecondary: 'Star on GitHub',
    },
    footer: {
      tagline:
        'Open-source CLI for local PrestaShop 8 & 9 development. Lando-based. Hooks, recipes, sandbox lifecycle. By',
      by: 'By',
      documentation: 'Documentation',
      reference: 'Reference',
      community: 'Community',
      links: {
        welcome: 'Welcome',
        quickstart: 'Quickstart',
        selectingModules: 'Module selection',
        recipes: 'Recipes',
        lifecycle: 'Lifecycle',
        commands: 'Commands',
        flags: 'Flags',
        recipesCatalog: 'Recipes catalog',
        compatibility: 'Compatibility',
        github: 'GitHub',
        npmPackage: 'npm package',
        reportIssue: 'Report an issue',
        changelog: 'Changelog',
      },
      copyright: '© 2026 educlopez. MIT licensed.',
    },
    docsMockup: {
      gettingStarted: 'Getting started',
      guides: 'Guides',
      reference: 'Reference',
      kb: 'Knowledge base',
      pages: {
        welcome: 'Welcome',
        quickstart: 'Quickstart',
        installation: 'Installation',
        firstSandbox: 'First sandbox',
        selectingModules: 'Selecting modules',
        hooksRecipes: 'Hooks & recipes',
        sandboxLifecycle: 'Sandbox lifecycle',
        doctor: 'Doctor',
        commands: 'Commands',
        flags: 'Flags',
        recipesCatalog: 'Recipes catalog',
        schemaDrift: 'Schema drift PS 8 → 9',
        symfonyCacheRaces: 'Symfony cache races',
      },
      contentEyebrow: 'Getting started',
      contentHeading: 'Welcome to ps-lando',
      contentBody:
        'ps-lando is a CLI for local PrestaShop development. It wraps Lando, downloads PrestaShop from the official CDN, installs your theme, and orchestrates the modules you need — all in one command.',
      cards: {
        quickstart: {
          title: 'Quickstart',
          body: 'Spin up your first sandbox in 5 minutes.',
        },
        recipes: {
          title: 'Recipes',
          body: '6 bundled scripts for common tasks.',
        },
        lifecycle: {
          title: 'Lifecycle',
          body: 'db reset, dump, restore, doctor.',
        },
        reference: {
          title: 'Reference',
          body: 'Every command and flag explained.',
        },
      },
    },
    metaDescription:
      'Spin up local PrestaShop 8 & 9 sandboxes in 6 minutes with ps-lando — a Lando-based CLI. Hooks, recipes, db reset/dump/restore, theme + modules ready.',
  },

  es: {
    announcement: {
      pill: 'Nuevo',
      body: 'v1.0.0 — zero-config, abierto a cualquier tema',
    },
    nav: {
      docs: 'Docs',
      reference: 'Referencia',
      kb: 'Base de conocimiento',
      changelog: 'Changelog',
      getStarted: 'Empezar',
      themeToggleAriaLabel: 'Cambiar tema',
    },
    langSwitcher: {
      ariaLabel: 'Idioma',
      en: 'EN',
      es: 'ES',
    },
    hero: {
      pill: 'Nuevo · v1.0 zero-config, abierto a cualquier tema',
      titleLine1: 'Sandboxes de PrestaShop locales,',
      titleLine2: 'en un solo comando.',
      description:
        'Suelta cualquier zip de tema, ejecuta un comando y tienes una tienda PrestaShop 8 o 9 funcionando en 6 minutos — zero-config, sin asistente, sin SQL a mano.',
      ctaPrimary: 'Empezar',
      ctaSecondary: 'Ver en GitHub',
      tabs: { docs: 'Docs', install: 'Instalar', diagnose: 'Diagnóstico' },
    },
    bento: {
      eyebrow: 'Todo en una sola CLI',
      heading: 'Hecho para que el 80% aburrido desaparezca.',
      oneCommand: {
        eyebrow: 'Un solo comando',
        title: 'Levanta un sandbox en 6 minutos.',
        body: 'PrestaShop desde el CDN oficial, tema extraído, módulos instalados en lotes en paralelo.',
        caption:
          'De npm install a una tienda corriendo en menos de seis minutos — sin asistente y sin SQL a mano.',
      },
      moduleSelection: {
        eyebrow: 'Selección de módulos',
        title: 'Solo los módulos que tu cliente necesita.',
        caption:
          'Filtra módulos con globs --exclude / --only desde la CLI, o fíjalos en pslando.config.json.',
      },
      doctor: {
        eyebrow: 'Doctor',
        title: 'Sabe qué falla antes que tú.',
        caption:
          'Una pasada revisa Docker, Node, puertos y disco — y ofrece --fix cuando el problema se puede auto-reparar.',
      },
      recipes: {
        eyebrow: 'Recipes',
        title: 'Scripts para el 80% aburrido.',
        body: 'Datos demo, IVA español, cache warmup, clean-seed. Mete los tuyos en init-scripts/.',
        caption:
          'Scripts reutilizables en bash, Node y PHP para todo el setup de datos que harías a mano cada vez.',
      },
      lifecycle: {
        eyebrow: 'Ciclo de vida',
        title: 'Reset, snapshot, restore.',
        caption:
          'db reset, dump, restore — mantén el ciclo de iteración corto sin reconstruir desde cero.',
      },
      llm: {
        eyebrow: 'LLM ready',
        title: 'llms.txt, generado automáticamente.',
        caption:
          'Cada página indexada en llms.txt y llms-full.txt para que Claude, Cursor y ChatGPT lean tus docs nativamente.',
      },
    },
    llmSection: {
      eyebrow: 'Hecho para la era LLM',
      heading: 'Conocimiento que leen tanto humanos como agentes.',
      llmsTxt: {
        eyebrow: 'llms.txt',
        title: 'Indexado para herramientas de IA por defecto.',
        body: 'Cada página entra en llms.txt y llms-full.txt — Claude, ChatGPT y Cursor leen tu documentación de forma nativa, sin setup extra.',
        cta: 'Cómo funciona llms.txt',
      },
      hooks: {
        eyebrow: 'Hooks',
        title: 'Trae tus propios scripts.',
        body: 'Mete bash, Node o PHP en init-scripts/. ps-lando inyecta las variables PS_LANDO_* y los ejecuta en el momento adecuado de cada create.',
        cta: 'Guía de hooks',
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Componible de create a producción.',
        body: 'Un solo comando lanza la cadena entera: descarga, instalación, tema, módulos, recipes, hooks. Cada paso queda registrado en el log.',
        cta: 'Ver el pipeline',
      },
      compat: {
        eyebrow: 'Compatibilidad',
        title: 'Todas las versiones, una sola CLI.',
        body: 'PS 8.0, 8.1, 8.2, 8.3, 9.0, 9.1 — pinneadas, testeadas, documentadas. Cambia de versión sin rehacer tu setup.',
        cta: 'Matriz de compatibilidad',
      },
    },
    useCases: {
      eyebrow: 'Casos de uso',
      heading: 'Pensado para los loops que ejecutas de verdad.',
      daily: {
        eyebrow: 'Desarrollo diario',
        title: 'Itera sin esperar al create.',
        body: 'db reset reconstruye tu sandbox en 3-5 min sin volver a bajar el zip de PS ni reextraer el tema. Prueba un recipe, rómpelo, resetea, vuelve a probar — sin pagar el coste completo del create cada vez.',
        cta: 'Comandos de ciclo',
      },
      onboarding: {
        eyebrow: 'Onboarding de cliente',
        title: 'Un punto de partida limpio por proyecto.',
        body: 'Levanta un sandbox nuevo en su carpeta por cliente. La selección de módulos vive en .ps-lando.json para que el equipo replique tu setup con un solo comando.',
        cta: 'Selección de módulos',
      },
      qa: {
        eyebrow: 'QA y demos',
        title: 'Reproducible, siempre igual.',
        body: 'db dump --with-files empaqueta el SQL más img/ y los overrides del tema en un único tar.gz. Pásalo a QA, restaura en segundos, demuestra al cliente sin reconstruir nada.',
        cta: 'Snapshots',
      },
    },
    schemaSection: {
      eyebrow: 'Conoce el esquema',
      title: 'PrestaShop 8 y 9, controlados.',
      body: 'Directorios de HTMLPurifier. Bugs de theme:enable. Races del contenedor de Symfony. Columnas eliminadas en PS 9. ps-lando conoce cada deriva entre PrestaShop 8 y 9 y la sortea — para que tú nunca las veas.',
      cta: 'Base de conocimiento',
    },
    stats: {
      eyebrow: 'En cifras',
      heading:
        'Probado a fondo en dos versiones mayores de PrestaShop y seis releases puntuales.',
      testsPassing: 'Tests pasando',
      modulesSupported: 'Módulos soportados',
      avgCreate: 'Tiempo medio de create',
      recipes: 'Recipes incluidas',
    },
    compatBand: {
      eyebrow: 'Compatibilidad',
      heading:
        'Validado contra las versiones que tus clientes usan de verdad.',
      cta: 'Matriz completa',
    },
    quote: {
      body: 'El asistente de instalación de PrestaShop está bien para una instalación. Deja de estar bien cuando empiezas un proyecto nuevo cada dos semanas. ps-lando existe para que las partes aburridas de ese ciclo desaparezcan.',
      authorRole: 'Maintainer, lo uso a diario desde v0.1.0',
    },
    finalCta: {
      heading: '¿Listo para soltar el asistente?',
      body: 'Lee la documentación, ejecuta un comando y ten un sandbox de PrestaShop funcionando antes de tu segundo café.',
      ctaPrimary: 'Empezar',
      ctaSecondary: 'Star en GitHub',
    },
    footer: {
      tagline:
        'CLI open-source para desarrollo local de PrestaShop 8 y 9. Basado en Lando. Hooks, recipes y ciclo de vida del sandbox. Por',
      by: 'Por',
      documentation: 'Documentación',
      reference: 'Referencia',
      community: 'Comunidad',
      links: {
        welcome: 'Bienvenida',
        quickstart: 'Quickstart',
        selectingModules: 'Selección de módulos',
        recipes: 'Recipes',
        lifecycle: 'Ciclo de vida',
        commands: 'Comandos',
        flags: 'Flags',
        recipesCatalog: 'Catálogo de recipes',
        compatibility: 'Compatibilidad',
        github: 'GitHub',
        npmPackage: 'Paquete npm',
        reportIssue: 'Reportar un issue',
        changelog: 'Changelog',
      },
      copyright: '© 2026 educlopez. Licencia MIT.',
    },
    docsMockup: {
      gettingStarted: 'Empezar',
      guides: 'Guías',
      reference: 'Referencia',
      kb: 'Base de conocimiento',
      pages: {
        welcome: 'Bienvenida',
        quickstart: 'Quickstart',
        installation: 'Instalación',
        firstSandbox: 'Primer sandbox',
        selectingModules: 'Selección de módulos',
        hooksRecipes: 'Hooks y recipes',
        sandboxLifecycle: 'Ciclo de vida del sandbox',
        doctor: 'Doctor',
        commands: 'Comandos',
        flags: 'Flags',
        recipesCatalog: 'Catálogo de recipes',
        schemaDrift: 'Schema drift PS 8 → 9',
        symfonyCacheRaces: 'Races de cache de Symfony',
      },
      contentEyebrow: 'Empezar',
      contentHeading: 'Bienvenida a ps-lando',
      contentBody:
        'ps-lando es una CLI para desarrollo local de PrestaShop. Envuelve Lando, descarga PrestaShop desde el CDN oficial, instala tu tema y orquesta los módulos que necesitas — todo en un solo comando.',
      cards: {
        quickstart: {
          title: 'Quickstart',
          body: 'Levanta tu primer sandbox en 5 minutos.',
        },
        recipes: {
          title: 'Recipes',
          body: '6 scripts incluidos para tareas habituales.',
        },
        lifecycle: {
          title: 'Ciclo de vida',
          body: 'db reset, dump, restore, doctor.',
        },
        reference: {
          title: 'Referencia',
          body: 'Cada comando y flag explicado.',
        },
      },
    },
    metaDescription:
      'Levanta sandboxes locales de PrestaShop 8 y 9 en 6 minutos con ps-lando — una CLI sobre Lando. Hooks, recipes, db reset/dump/restore, tema y módulos listos.',
  },
};

export function getDict(locale: Locale): Dict {
  return dict[locale];
}
