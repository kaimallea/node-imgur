import { ImgurClient } from '../client';
import { deleteImage } from './deleteImage';

test('delete works successfully', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await deleteImage(client, 'CEddrgP');
  expect(response).toMatchInlineSnapshot(`
    Object {
      "data": true,
      "status": 200,
      "success": true,
    }
  `);
});
