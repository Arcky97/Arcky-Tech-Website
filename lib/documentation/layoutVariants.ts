type StyleGroup = 'default' | 'history' | 'speechVariants';

type StyleConfig = {
  wrapper: string;
  section: string;
  card?: string;
  date?: string;
  header?: string;
};

type LayoutVariants = {
  group: StyleGroup;
  override?: Partial<StyleConfig>;
}

const baseStyles: Record<StyleGroup, StyleConfig> = {
  'default': {
    wrapper: 'flex flex-col mt-14 items-center min-h-screen text-white',
    section: 'text-center p-8 lg:w-3/4 space-y-8',
  },
  'history': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center w-7/8 lg:w-6/8 space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg px-6 py-2 bg-gray-800',
    date: 'text-gray-600 text-sm text-left'
  },
  'speechVariants': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center w-7/8 space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg px-6 py-2',
    date: '',
  }
}

const layoutVariants: Record<string, LayoutVariants> = {
  'update-history': { group: 'history' },
  'default' : { group: 'default' },
  'intro-text': { group: 'speechVariants' },
  'buy-item-amount': { group: 'speechVariants' },
  'buy-item': { group: 'speechVariants' },
  'purchase-count': { group: 'speechVariants' },
  'outro-text': { group: 'speechVariants' },
  'shelf-change-item-amount': { group: 'speechVariants' },
  'shelf-item-amount': { group: 'speechVariants' },
  'features': { group: "speechVariants" },
  'manual-editing': { group: "speechVariants"},
  'location-preview': { group: "speechVariants" },
  'extended-location-preview': { group: "speechVariants" },
  'quest-icons-and-preview': { group: "speechVariants" }
}

export function getStyles(slug: string[]): StyleConfig {
  const key = slug[slug.length - 1];
  const variant = layoutVariants[key] || layoutVariants['default'];
  const group = variant.group;
  const base = baseStyles[group];
  const override = variant.override || {};
  return {
    ...base,
    ...override
  };
}