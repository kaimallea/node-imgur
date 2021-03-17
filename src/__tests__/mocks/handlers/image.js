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

export function postHandler(_req, res, ctx) {
  return res(ctx.json(SuccessResponse));
}

export function deleteHandler(req, res, ctx) {
  return res(ctx.json(SuccessResponse));
}

export function postFavoriteHandler(req, res, ctx) {
  return res(ctx.json(FavoriteSuccessResponse));
}
