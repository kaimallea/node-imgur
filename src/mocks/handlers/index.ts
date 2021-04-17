import { rest } from 'msw';
import { RestRequest, ResponseResolver, RestContext } from 'msw';

import * as upload from './upload';
import * as authorize from './authorize';
import * as image from './image';
import * as gallery from './gallery';
import * as credits from './credits';
import * as album from './album';

export type Handler = ResponseResolver<RestRequest, RestContext>;

export const handlers = [
  //upload
  rest.post('https://api.imgur.com/3/upload', upload.postHandler),

  // gallery
  rest.get('https://api.imgur.com/3/gallery/*', gallery.getHandler),

  // image
  rest.get('https://api.imgur.com/3/image/:id', image.getHandler),
  rest.post('https://api.imgur.com/3/image/:id', image.postHandler),
  rest.post(
    'https://api.imgur.com/3/image/:id/favorite',
    image.postFavoriteHandler
  ),
  rest.delete('https://api.imgur.com/3/image/:id', image.deleteHandler),

  // authorize
  rest.get('https://api.imgur.com/oauth2/authorize', authorize.getHandler),
  rest.post('https://api.imgur.com/oauth2/authorize', authorize.postHandler),

  // credits
  rest.get('https://api.imgur.com/3/credits', credits.getHandler),

  // album
  rest.post('https://api.imgur.com/3/album', album.postHandler),
];
