import { ImgurClient } from '../client';
import { upload } from './upload';

describe('test file uploads', () => {
  test('upload one image via path string, receive one response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, '/home/user/meme.jpg');
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
      '/home/user/meme.jpg',
      '/home/user/lol.jpg',
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

  test('upload one image via payload type, receive one response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, {
      image: '/home/user/meme.jpg',
      title: 'dank meme',
      description: 'the dankiest of dank memes',
    });
    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "deletehash": "jyby9KJ",
          "description": "the dankiest of dank memes",
          "id": "JK9ybyj",
          "link": "https://i.imgur.com/JK9ybyj.jpg",
          "title": "dank meme",
        },
        "status": 200,
        "success": true,
      }
    `);
  });

  test('upload multiple images via an array of payload type, receive multiple response', async () => {
    const accessToken = 'abc123';
    const client = new ImgurClient({ accessToken });
    const response = await upload(client, [
      {
        image: '/home/user/meme.jpg',
        title: 'dank meme',
        description: 'the dankiest of dank memes',
      },
      {
        image: '/home/user/lol.jpg',
        title: 'this is funny',
        description: '🤣',
      },
    ]);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": "the dankiest of dank memes",
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": "dank meme",
          },
          "status": 200,
          "success": true,
        },
        Object {
          "data": Object {
            "deletehash": "jyby9KJ",
            "description": "🤣",
            "id": "JK9ybyj",
            "link": "https://i.imgur.com/JK9ybyj.jpg",
            "title": "this is funny",
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
      video: '/home/user/trailer.mp4',
      title: 'trailer for my new stream',
      description: 'yolo',
      disable_audio: '1',
    });
    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "deletehash": "jyby9KJ",
          "description": "yolo",
          "id": "JK9ybyj",
          "link": "https://i.imgur.com/JK9ybyj.jpg",
          "title": "trailer for my new stream",
        },
        "status": 200,
        "success": true,
      }
    `);
  });

  test('upload progress event emitter', async () => {
    const accessToken = 'abc123';
    const video = '/home/user/trailer.mp4';
    const client = new ImgurClient({ accessToken });
    const eventHandler = jest.fn();
    client.on('uploadProgress', eventHandler);

    const response = await upload(client, {
      video,
      title: 'trailer for my new stream',
      description: 'yolo',
      disable_audio: '1',
    });
    expect(eventHandler).toBeCalledWith(
      expect.objectContaining({
        id: expect.stringContaining(video),
        percent: expect.any(Number),
        total: expect.any(Number),
        transferred: expect.any(Number),
      })
    );
  });
});
