const { rest } = require('msw');

const handlers = [
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
  rest.get('https://api.imgur.com/3/gallery/JK9ybyj', (_req, res, ctx) => {
    const response = {
      data: {
        id: 'JK9ybyj',
        title: 'gallery-title',
        description: 'gallery-description',
      },
      success: true,
      status: 200,
    };
    return res(ctx.json(response));
  }),
];

module.exports = {
  handlers,
};
