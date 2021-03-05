import { rest } from 'msw';

export const handlers = [
  rest.post('https://api.imgur.com/3/image', (_req, res, ctx) => {
    const response = {
      data: {
        id: 'JK9ybyj',
        deletehash: 'j83zimv4VtDA0Xp',
        link: 'https://i.imgur.com/JK9ybyj.jpg',
      },
      success: true,
      status: 200,
    };
    return res(ctx.json(response));
  }),
];
