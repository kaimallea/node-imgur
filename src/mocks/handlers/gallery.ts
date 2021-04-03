import { Handler } from './';

export const getHandler: Handler = (_req, res, ctx) => {
  // const { section, sort, window, page } = req.params;
  const response = {
    data: [
      {
        id: 'ans7sd',
        title: 'gallery-title',
        description: 'gallery-description',
        link: 'https://imgur.com/a/abc123',
        images: [
          {
            id: '4yMKKLTz',
            title: null,
            description: null,
            link: 'https://i.imgur.com/4yMKKLTz.jpg',
          },
        ],
      },
    ],
    success: true,
    status: 200,
  };
  return res(ctx.json(response));
};
