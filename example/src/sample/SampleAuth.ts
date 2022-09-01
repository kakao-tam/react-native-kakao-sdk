import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import AuthApi, { TokenManager } from 'react-native-kakao-sdk-auth';

const SampleAuth: SectionListData<ICallApi>[] = [
  {
    key: 'TokenManager (auth)',
    data: [
      {
        name: 'getToken',
        exec: () => TokenManager.getToken(),
      },
      {
        name: 'clear',
        exec: () => TokenManager.clear(),
      },
    ],
  },
  {
    key: 'AuthApi (auth)',
    data: [
      {
        name: 'hasToken',
        exec: () => AuthApi.hasToken(),
      },
      {
        name: 'refreshToken',
        exec: () => AuthApi.refreshToken(),
      },
    ],
  },
];
export default SampleAuth;
