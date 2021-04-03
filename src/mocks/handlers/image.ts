import { Handler } from './';

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

export const getHandler: Handler = (req, res, ctx) => {
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
};

export const postHandler: Handler = (_req, res, ctx) => {
  return res(ctx.json(SuccessResponse));
};

export const deleteHandler: Handler = (_req, res, ctx) => {
  return res(ctx.json(SuccessResponse));
};

export const postFavoriteHandler: Handler = (_req, res, ctx) => {
  return res(ctx.json(FavoriteSuccessResponse));
};
