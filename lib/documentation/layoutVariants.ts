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
    wrapper: 'text-white w-[90%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-8',
  },
  'history': {
    wrapper: 'text-white w-[95%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg px-2 lg:px-6 py-4 bg-gray-800 section-wrapper-history',
    date: 'text-gray-600 text-sm text-left'
  },
  'speechVariants': {
    wrapper: 'text-white w-[90%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg py-4 px-6 section-wrapper',
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
  'shelf-item-amount-change': { group: 'speechVariants' },
  'shelf-item-amount': { group: 'speechVariants' },
  'features': { group: "speechVariants" },
  'manual-editing': { group: "speechVariants"},
  'location-preview': { group: "speechVariants" },
  'extended-location-preview': { group: "speechVariants" },
  'trainer-preview': { group: 'speechVariants' },
  'quest-icons-and-preview': { group: "speechVariants" },
  'progress-counter': { group: 'speechVariants' },
  'no-unvisited-info': { group: 'speechVariants' },
  'location-search': { group: 'speechVariants' },
  'region-district': { group: 'speechVariants' },
  'region-map-connecting': { group: 'speechVariants' },
  'fly': { group: 'speechVariants' },
  'mode': { group: 'speechVariants' },
  'music': { group: 'speechVariants' },
  'map-ui': { group: 'speechVariants' },
  'zoom': { group: 'speechVariants' },
  'region-changing': { group: 'speechVariants' },
  'text-position': { group: 'speechVariants' },
  'text-color': { group: 'speechVariants' },
  'cursor': { group: 'speechVariants' },
  'mouse-support': { group: 'speechVariants' },
  'general': { group: 'speechVariants' },
  'button': { group: 'speechVariants' },
  'location': { group: 'speechVariants' },
  'extended': { group: 'speechVariants' },
  'weather': { group: 'speechVariants' },
  'quest': { group: 'speechVariants' },
  'berry': { group: 'speechVariants' },
  'trainer': { group: 'speechVariants' },
  'pokedex': { group: 'speechVariants' }
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