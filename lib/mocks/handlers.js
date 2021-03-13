const { rest } = require('msw');
const upload = require('./handlers/upload');

const handlers = [
  rest.post('https://api.imgur.com/3/upload', upload.postHandler),
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
  rest.post('https://api.imgur.com/3/image/JK9ybyj', (_req, res, ctx) => {
    const response = {
      data: true,
      success: true,
      status: 200,
    };
    return res(ctx.json(response));
  }),

  rest.get('https://api.imgur.com/oauth2/authorize', (req, res, ctx) => {
    const clientId = req.url.searchParams.get('client_id');
    const responseType = req.url.searchParams.get('response_type');

    if (!(clientId && responseType)) {
      return res(
        ctx.status(400),
        ctx.json({
          data: {
            error: 'client_id and response_type are required',
            request: '/oauth/authorize',
            method: 'GET',
          },
          success: false,
          status: 400,
        })
      );
    }

    const mockAuthorizeToken = 'abcxyz';
    const html = `
      <html>
        <form method="post" action="">
          <input type="text" name="username" id="username">
          <input type="password" name="password" id="password">
          <button type="submit" name="allow" value="${mockAuthorizeToken}"></button>
        </form>
      </html>
      `;
    return res(
      ctx.cookie('authorize_token', mockAuthorizeToken, {
        path: '/oauth2',
        domain: '.api.imgur.com',
        secure: true,
        httpOnly: true,
      }),
      ctx.status(200),
      ctx.body(html)
    );
  }),

  rest.post('https://api.imgur.com/oauth2/authorize', (req, res, ctx) => {
    const clientId = req.url.searchParams.get('client_id');
    const responseType = req.url.searchParams.get('response_type');

    if (!(clientId && responseType)) {
      return res(
        ctx.status(400),
        ctx.json({
          data: {
            error: 'client_id and response_type are required',
            request: '/oauth/authorize',
            method: 'POST',
          },
          success: false,
          status: 400,
        })
      );
    }

    const { username, password, allow } = Object.fromEntries(
      new URLSearchParams(req.body)
    );

    if (!(username && password && allow)) {
      return res(
        ctx.status(403),
        ctx.json({
          data: {
            error: 'Unauthorized',
            request: '/oauth2/authorize',
            method: 'POST',
          },
          success: false,
          status: 403,
        })
      );
    }

    return res(
      ctx.status(302),
      ctx.set(
        'Location',
        `https://somedomain.com#access_token=123accesstoken456&expires_in=315360000&token_type=bearer&refresh_token=123refrestoken456&account_username=${username}&account_id=123456`
      ),
      ctx.cookie('authorize_token', allow)
    );
  }),
];

module.exports = {
  handlers,
};
