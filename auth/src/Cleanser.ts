import type { OAuthToken } from './types';
import { Utils } from 'react-native-kakao-sdk-common';

const Cleanser = {
  oauthToken: (token: OAuthToken | null): void => {
    if (!token) return;
    if (Utils.isIOS) {
      token.scopes = Utils.getAndRemove(token, 'scope')?.split(' ');
      const expiresIn: number = Utils.getAndRemove(token, 'expiresIn');
      if (expiresIn) {
        const t = new Date();
        t.setSeconds(t.getSeconds() + expiresIn);
        token.accessTokenExpiresAt = t;
      }
      const refreshExpiresIn = Utils.getAndRemove(token, 'refreshTokenExpiresIn');
      if (refreshExpiresIn) {
        const t = new Date();
        t.setSeconds(t.getSeconds() + refreshExpiresIn);
        token.refreshTokenExpiresAt = t;
      }
    } else {
      if (token.accessTokenExpiresAt) {
        token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt as any as number);
      }
      if (token.refreshTokenExpiresAt) {
        token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt as any as number);
      }
    }
    Utils.remove(token, 'tokenType');
  },
};

export { Cleanser };
