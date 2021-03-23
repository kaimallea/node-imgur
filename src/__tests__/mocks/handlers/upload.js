const BadRequestErrorResponse = {
  status: 400,
  success: false,
  data: {
    error: 'Bad Request',
    request: '/3/upload',
    method: 'POST',
  },
};

function createResponse({
  id = 'JK9ybyj',
  type = null,
  title = null,
  description = null,
}) {
  return {
    data: {
      id,
      deletehash: Array.from(id).reverse().join(''),
      title,
      description,
      link: `https://i.imgur.com/${id}.${type === 'video' ? 'mp4' : 'jpg'}`,
    },
    success: true,
    status: 200,
  };
}

export function postHandler(req, res, ctx) {
  const {
    image = null,
    video = null,
    type = null,
    title = null,
    description = null,
  } = req.body;

  // image or video field is always required
  if (image !== null && video !== null) {
    return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
  }

  // type is optional when uploading a file, but required
  // for any other type
  if (type !== null) {
    // only these types are allowed
    if (!['file', 'url', 'base64'].includes(type)) {
      return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
    }
    // if type is not specified we assume we're uploading a file.
    // but we need to make sure a file was sent in the image field
  } else if (typeof image !== 'object') {
    return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
  }

  return res(ctx.json(createResponse({ image, video, title, description })));
}
