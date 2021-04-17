import { ImgurClient } from '../client';
import { getImage } from './getImage';

test('returns an image response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await getImage(client, 'CEddrgP');
  expect(response).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "description": "image-description",
        "id": "CEddrgP",
        "title": "image-title",
      },
      "status": 200,
      "success": true,
    }
  `);
});
