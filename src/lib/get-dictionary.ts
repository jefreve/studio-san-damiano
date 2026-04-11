import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  it: () => import('../dictionaries/it.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return locale === 'en' ? dictionaries.en() : dictionaries.it();
};
