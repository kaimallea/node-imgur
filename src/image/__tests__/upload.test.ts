import { Client } from '../../client';
import { upload } from '../upload';

describe('upload using client_id', () => {
  let client: Client;
  beforeEach(() => {
    client = new Client({ client_id: 'f0ea04148a54268' });
  });

  it.only('works with an image', async () => {
    const resp = await upload(client, {
      image: `${__dirname}/1x1.png`,
    });

    expect(resp.status).toEqual(200);
  });
});
