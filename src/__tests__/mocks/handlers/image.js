const SuccessResponse = {
  data: true,
  success: true,
  status: 200,
};

const FavoriteSuccessResponse = {
  data: 'favorited',
  success: true,
  status: 200,
};

export function getHandler(req, res, ctx) {
  const { id } = req.params;
  const response = {
    data: {
      id,
      title: 'image-title',
      description: 'image-description',
    },
    success: true,
    status: 200,
  };
  return res(ctx.json(response));
}

export function postHandler(_req, res, ctx) {
  return res(ctx.json(SuccessResponse));
}

export function deleteHandler(req, res, ctx) {
  return res(ctx.json(SuccessResponse));
}

export function postFavoriteHandler(req, res, ctx) {
  return res(ctx.json(FavoriteSuccessResponse));
}
