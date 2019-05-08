import { Client } from '../client';
import { ACCOUNT_SETTINGS } from '../endpoints';

export function getSettings(client: Client) {
  return client.get(ACCOUNT_SETTINGS);
}
