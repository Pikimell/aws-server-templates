import crypto from 'crypto';
import { CLIENT_SEECRET, CLIENT_ID } from './constants';

export function generateSecretHash(username) {
  const hmac = crypto.createHmac('sha256', CLIENT_SEECRET);
  hmac.update(username + CLIENT_ID);
  const hash = hmac.digest('base64');
  console.log('HASH:', hash);
  return hash;
}
