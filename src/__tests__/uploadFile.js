import imgur from '../imgur.js';

beforeAll(() => imgur.setClientId('abc123'));

test('upload one image image and receive response', async () => {
  const resp = await imgur.uploadFile('/home/user/meme.jpg');
  expect(resp).toMatchInlineSnapshot(`
    Object {
      "deletehash": "jyby9KJ",
      "description": null,
      "id": "JK9ybyj",
      "link": "https://i.imgur.com/JK9ybyj.jpg",
      "title": null,
    }
  `);
});

test('upload multiple images and receive response', async () => {
  const resp = await imgur.uploadFile([
    '/home/user/meme.jpg',
    '/home/user/lol.jpg',
  ]);
  expect(resp).toMatchInlineSnapshot(`
    Array [
      Object {
        "deletehash": "jyby9KJ",
        "description": null,
        "id": "JK9ybyj",
        "link": "https://i.imgur.com/JK9ybyj.jpg",
        "title": null,
      },
      Object {
        "deletehash": "jyby9KJ",
        "description": null,
        "id": "JK9ybyj",
        "link": "https://i.imgur.com/JK9ybyj.jpg",
        "title": null,
      },
    ]
  `);
});