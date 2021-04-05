import { ImgurClient } from '../client';
import { searchGallery, constructSearchGalleryUrl } from './searchGallery';

test('constructGalleryUrl', () => {
  expect(
    constructSearchGalleryUrl({
      q: 'cats',
    }).href
  ).toMatchInlineSnapshot(`"https://api.imgur.com/3/gallery/search?q=cats"`);

  expect(
    constructSearchGalleryUrl({ query: 'dogs', sort: 'time' }).href
  ).toMatchInlineSnapshot(
    `"https://api.imgur.com/3/gallery/search/time?q=dogs"`
  );

  expect(
    constructSearchGalleryUrl({
      q: 'cats subreddit:awwa ext:gif',
      sort: 'top',
      window: 'month',
    }).href
  ).toMatchInlineSnapshot(
    `"https://api.imgur.com/3/gallery/search/top/month?q=cats+subreddit%3Aawwa+ext%3Agif"`
  );

  const { href } = constructSearchGalleryUrl({
    query: 'wallstreetbets',
    q_all: 'nintendo switch',
    q_not: 'mario',
    q_type: 'anigif',
    q_size_px: 'lrg',
  });
  expect(href).toMatchInlineSnapshot(
    `"https://api.imgur.com/3/gallery/search?q_all=nintendo+switch&q_not=mario&q_type=anigif&q_size_px=lrg"`
  );
});

test('returns an gallery response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await searchGallery(client, {
    query: 'wallstreetbets',
  });
  expect(response).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "description": "gallery-description",
          "id": "ans7sd",
          "images": Array [
            Object {
              "description": null,
              "id": "4yMKKLTz",
              "link": "https://i.imgur.com/4yMKKLTz.jpg",
              "title": null,
            },
          ],
          "link": "https://imgur.com/a/abc123",
          "title": "gallery-title",
        },
      ],
      "status": 200,
      "success": true,
    }
  `);
});
