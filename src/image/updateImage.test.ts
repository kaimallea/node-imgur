import { ImgurClient } from '../client';
import { updateImage } from './updateImage';

test('update one image with all props', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await updateImage(client, {
    imageHash: 'abc123',
    title: 'new title',
    description: 'description',
  });
  expect(response).toMatchInlineSnapshot(`
      Object {
        "data": true,
        "status": 200,
        "success": true,
      }
    `);
});

test('update one image with title only', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await updateImage(client, {
    imageHash: 'abc123',
    title: 'new title',
  });
  expect(response).toMatchInlineSnapshot(`
      Object {
        "data": true,
        "status": 200,
        "success": true,
      }
    `);
});

test('update one image without title or description', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = updateImage(client, {
    imageHash: 'abc123',
  });
  expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Update requires a title and/or description"`
  );
});

test('update multiple images, receive multiple response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await updateImage(client, [
    {
      imageHash: 'meme123',
      title: 'dank meme',
      description: 'the dankiest of dank memes',
    },
    {
      imageHash: 'lol123',
      title: 'this is funny',
      description: '🤣',
    },
  ]);
  expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": true,
          "status": 200,
          "success": true,
        },
        Object {
          "data": true,
          "status": 200,
          "success": true,
        },
      ]
    `);
});
