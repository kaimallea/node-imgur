import { ImgurClient } from '../client';
import {
  getSubredditGallery,
  constructSubredditGalleryUrl,
} from './getSubredditGallery';

test('constructGalleryUrl', () => {
  expect(
    constructSubredditGalleryUrl({
      subreddit: 'wallstreetbets',
    }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/r/wallstreetbets"`);

  expect(
    constructSubredditGalleryUrl({ subreddit: 'wallstreetbets', sort: 'time' })
      .pathname
  ).toMatchInlineSnapshot(`"/3/gallery/r/wallstreetbets/time"`);

  expect(
    constructSubredditGalleryUrl({
      subreddit: 'wallstreetbets',
      sort: 'top',
      window: 'day',
    }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/r/wallstreetbets/top/day"`);

  const { href, pathname } = constructSubredditGalleryUrl({
    subreddit: 'wallstreetbets',
    sort: 'top',
    window: 'day',
    page: 2,
  });
  expect(pathname).toMatchInlineSnapshot(
    `"/3/gallery/r/wallstreetbets/top/day/2"`
  );
  expect(href).toMatchInlineSnapshot(
    `"https://api.imgur.com/3/gallery/r/wallstreetbets/top/day/2"`
  );
});

test('returns a gallery response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await getSubredditGallery(client, {
    subreddit: 'wallstreetbets',
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
