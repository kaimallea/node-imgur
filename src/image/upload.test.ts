/**
 * @jest-environment jsdom
 *
 * msw's parseMultipartData method calls `new File(..)` which breaks when jest-environment is set to `node`,
 * because `File` is only available in browsers. The current workaround is to set these upload tests to
 * run in the `jsdom` environment so that `File` is available.
 */

import { ImgurClient } from '../client';
import { upload } from './upload';
import { createReadStream } from 'fs';

describe('test imgur uploads', () => {
  test('upload one image via url string, receive one response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, {
      image: 'https://i.imgur.com/JK9ybyj.jpg',
      type: 'url',
    });
    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "deletehash": "jyby9KJ",
          "description": null,
          "id": "JK9ybyj",
          "link": "https://i.imgur.com/JK9ybyj.jpg",
          "title": null,
        },
        "status": 200,
        "success": true,
      }
    `);
  });

  test('upload multiple images via array of path strings, receive multiple responses', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, [
      { image: 'https://i.imgur.com/JK9ybyj.jpg' },
      { image: 'https://i.imgur.com/JK9ybyj.jpg' },
    ]);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": null,
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": null,
          },
          "status": 200,
          "success": true,
        },
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": null,
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": null,
          },
          "status": 200,
          "success": true,
        },
      ]
    `);
  });

  test('upload one image via bas64 payload type, receive one response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, {
      stream: createReadStream('/home/user/meme.jpg'),
      title: 'dank meme',
      description: 'the dankiest of dank memes',
    });
    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "deletehash": "jyby9KJ",
          "description": null,
          "id": "JK9ybyj",
          "link": "https://i.imgur.com/JK9ybyj.jpg",
          "title": null,
        },
        "status": 200,
        "success": true,
      }
    `);
  });

  test('upload multiple images via an array of base64 payload type, receive multiple response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, [
      {
        base64:
          'data:image/png;base64,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',
        title: 'dank meme',
        description: 'the dankiest of dank memes',
      },
      {
        base64:
          'data:image/png;base64,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',
        title: 'this is funny',
        description: '🤣',
      },
    ]);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": null,
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": null,
          },
          "status": 200,
          "success": true,
        },
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": null,
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": null,
          },
          "status": 200,
          "success": true,
        },
      ]
    `);
  });

  test('upload a video, disable sound', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, {
      stream: createReadStream('/home/user/trailer.mp4'),
      title: 'trailer for my new stream',
      description: 'yolo',
      disable_audio: '1',
    });
    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "deletehash": "jyby9KJ",
          "description": null,
          "id": "JK9ybyj",
          "link": "https://i.imgur.com/JK9ybyj.jpg",
          "title": null,
        },
        "status": 200,
        "success": true,
      }
    `);
  });

  // test('upload progress event emitter', async () => {
  //   const accessToken = 'abc123';
  //   const stream = createReadStream('/home/user/trailer.mp4');
  //   const client = new ImgurClient({ accessToken });
  //   const eventHandler = jest.fn();
  //   client.on('uploadProgress', eventHandler);

  //   await upload(client, {
  //     stream,
  //     title: 'trailer for my new stream',
  //     description: 'yolo',
  //     disable_audio: '1',
  //   });
  //   expect(eventHandler).toBeCalledWith(
  //     expect.objectContaining({
  //       id: expect.any(String),
  //       percent: expect.any(Number),
  //       total: expect.any(Number),
  //       transferred: expect.any(Number),
  //     })
  //   );
  // });
});
