import { ImgurClient } from '../client';
import { getGallery, GalleryOptions, constructGalleryUrl } from './getGallery';

test('constructGalleryUrl', () => {
  expect(
    constructGalleryUrl({} as GalleryOptions).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/hot/viral"`);

  expect(
    constructGalleryUrl({ section: 'hot' }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/hot/viral"`);

  expect(
    constructGalleryUrl({ section: 'hot', sort: 'top' }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/hot/top"`);

  expect(
    constructGalleryUrl({ section: 'top', window: 'day' }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/top/viral/day"`);

  expect(
    constructGalleryUrl({ section: 'user', sort: 'rising' }).pathname
  ).toMatchInlineSnapshot(`"/3/gallery/user/rising"`);

  const { href, pathname, search } = constructGalleryUrl({
    section: 'user',
    sort: 'rising',
    showViral: true,
    mature: false,
    album_previews: true,
  });
  expect(pathname).toMatchInlineSnapshot(`"/3/gallery/user/rising"`);
  expect(search).toMatchInlineSnapshot(
    `"?showViral=true&mature=false&album_previews=true"`
  );
  expect(href).toMatchInlineSnapshot(
    `"https://api.imgur.com/3/gallery/user/rising?showViral=true&mature=false&album_previews=true"`
  );
});

test('returns an image response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await getGallery(client, { section: 'hot' });
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
