import type { CertTokenInfo } from 'react-native-kakao-sdk-auth';
import { Cleanser as AuthCleanser } from 'react-native-kakao-sdk-auth';
import type { ShippingAddressesParam, User, UserServiceTerms, UserShippingAddresses } from './types';
import { Utils } from 'react-native-kakao-sdk-common';

const Cleanser = {
  oauthToken: AuthCleanser.oauthToken,
  certTokenInfo: (certToken: CertTokenInfo): void => {
    AuthCleanser.oauthToken(certToken.token);
  },
  user: (user: User): void => {
    const anyUser = user as any;
    if (anyUser.connectedAt) {
      user.connectedAt = new Date(anyUser.connectedAt);
    }
    if (anyUser.synchedAt) {
      user.synchedAt = new Date(anyUser.synchedAt);
    }
    if (user.kakaoAccount?.ciAuthenticatedAt) {
      user.kakaoAccount.ciAuthenticatedAt = new Date(anyUser.kakaoAccount.ciAuthenticatedAt);
    }
  },
  shippingAddresses: (addresses: UserShippingAddresses): void => {
    addresses.shippingAddressesNeedsAgreement = Utils.getAndRemove(addresses, 'shipping_addresses_needs_agreement');
    if (addresses.shippingAddresses) {
      for (let address of addresses.shippingAddresses) {
        if (address.updatedAt) {
          if (Utils.isAOS) {
            address.updatedAt = new Date(address.updatedAt as any as number * 1000);
          } else {
            address.updatedAt = new Date(address.updatedAt as any as number);
          }
        }
      }
    }
  },
  serviceTerms: (terms: UserServiceTerms): void => {
    if (terms.allowedServiceTerms) {
      for (let term of terms.allowedServiceTerms) {
        term.agreedAt = new Date(term.agreedAt as any as number);
      }
    }
    if (terms.appServiceTerms) {
      for (let term of terms.appServiceTerms) {
        term.createdAt = new Date(term.createdAt as any as number);
        term.updatedAt = new Date(term.updatedAt as any as number);
      }
    }
  },
};

const CleanserRequest = {
  shippingAddresses: (param?: ShippingAddressesParam): void => {
    if (param?.fromUpdateAt) {
      param.fromUpdateAt = param.fromUpdateAt.getTime() as any;
    }
  },
};

export { Cleanser, CleanserRequest };
