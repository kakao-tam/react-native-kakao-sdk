import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import UserApi, { RevokeScopesParam, UpdateProfileParam } from 'react-native-kakao-sdk-user';

const SampleUser: SectionListData<ICallApi>[] = [
  {
    key: 'UserApiClient (user)',
    data: [
      {
        name: 'accessTokenInfo',
        exec: () => UserApi.accessTokenInfo(),
      },
      {
        name: 'isKakaoTalkLoginAvailable',
        exec: () => UserApi.isKakaoTalkLoginAvailable(),

      },
      {
        name: 'loginWithKakaoAccount',
        exec: () => UserApi.loginWithKakaoAccount(),
      },
      {
        name: 'loginWithKakaoAccount - scopes ',
        exec: () => UserApi.loginWithKakaoAccount({ scopes: ['gender'] }),
      },
      {
        name: 'loginWithKakaoTalk',
        exec: () => UserApi.loginWithKakaoTalk(),
      },
      {
        name: 'logout',
        exec: () => UserApi.logout(),
      },
      {
        name: 'me',
        exec: () => UserApi.me(),

      },
      {
        name: 'revokeScopes',
        exec: (log) => {
          let param: RevokeScopesParam = {
            scopes: ['age_range'],
          };
          log(param, 'REQ');
          return UserApi.revokeScopes(param);
        },
      },
      {
        name: 'scopes',
        exec: () => UserApi.scopes(),
      },
      {
        name: 'serviceTerms',
        exec: () => UserApi.serviceTerms(),
      },
      {
        name: 'shippingAddresses',
        exec: () => UserApi.shippingAddresses(),
      },
      {
        name: 'signup',
        exec: () => UserApi.signup(),
      },
      {
        name: 'unlink',
        exec: () => UserApi.unlink(),
      },
      {
        name: 'updateProfile',
        exec: (log) => {
          let param: UpdateProfileParam = {
            properties: {
              test: 'test value',
            },
          };
          log(param, 'REQ');
          return UserApi.updateProfile(param);
        },
      },
    ],
  },
];
export default SampleUser;
