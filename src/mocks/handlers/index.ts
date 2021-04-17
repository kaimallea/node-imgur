import { rest } from 'msw';
import { RestRequest, ResponseResolver, RestContext } from 'msw';

import * as upload from './upload';
import * as authorize from './authorize';
import * as image from './image';
import * as gallery from './gallery';
import * as credits from './credits';
import * as album from './album';

// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// const mock = new MockAdapter(axios);

export type Handler = ResponseResolver<RestRequest, RestContext>;

export const handlers = [

  // authorize
  rest.get('https://api.imgur.com/oauth2/authorize', authorize.getHandler),
  rest.post('https://api.imgur.com/oauth2/authorize', authorize.postHandler),



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

  // credits
  rest.get('https://api.imgur.com/3/credits', credits.getHandler),

  // album
  rest.get('https://api.imgur.com/3/album/:id', album.getHandler),
];
