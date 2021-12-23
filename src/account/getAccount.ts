import { ImgurClient } from '../client';
import { ACCOUNT_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, AccountData } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function getAccount(
  client: ImgurClient,
  account: string
): Promise<ImgurApiResponse<AccountData>> {
  const url = `${ACCOUNT_ENDPOINT}/${account}`;
  return getImgurApiResponseFromResponse(
    await client.plainRequest({ url }).catch(e => e.response)
  ) as ImgurApiResponse<AccountData>;
}
