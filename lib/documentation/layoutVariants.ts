type StyleConfig = {
  wrapper: string;
  section: string;
  card?: string;
  date?: string;
  header?: string;
};

export const layoutVariants: Record<string, StyleConfig> = {
  'update-history': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center w-7/8 lg:w-6/8 space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg px-6 py-2 bg-gray-800',
    date: 'text-gray-600 text-sm text-left'
  },
  'default': {
    wrapper: 'flex flex-col mt-14 items-center min-h-screen text-white',
    section: 'text-center p-8 lg:w-3/4 space-y-8',
  },
  'intro-text': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center w-6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: '',
  },
  'buy-item-amount': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center w-6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: ''
  },
  'buy-item': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center 6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: ''
  },
  'buy-bonus': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center 6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: ''
  },
  'purchase-count': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center 6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: ''
  },
  'outro-text': {
    wrapper: 'flex flex-col mt-22 items-center min-h-screen bg-gray-900 text-white',
    section: 'text-center 6/8 space-y-4 mb-4',
    card: 'border border-gray-700 px-6 py-2 rounded-xl',
    date: ''
  }
}