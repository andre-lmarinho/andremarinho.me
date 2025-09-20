import sitemap from '@/app/sitemap';

describe('sitemap metadata route', () => {
  it('lists all expected routes with metadata', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(3);
    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'https://andremarinho.me/',
          changeFrequency: 'weekly',
          priority: 1,
        }),
        expect.objectContaining({
          url: 'https://andremarinho.me/about',
          changeFrequency: 'monthly',
          priority: 0.8,
        }),
        expect.objectContaining({
          url: 'https://andremarinho.me/studio',
          changeFrequency: 'weekly',
          priority: 0.9,
        }),
      ])
    );

    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});
