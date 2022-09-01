import { SectionListData } from 'react-native';
import KakaoSDK, { InitParam, KakaoCustomTabsClient } from 'react-native-kakao-sdk-common';
import { ICallApi } from '../ApiSample';

const SampleCommon: SectionListData<ICallApi>[] = [
  {
    key: 'KakaoSDK (common)',
    data: [
      {
        name: 'init',
        exec: () => {
          return KakaoSDK.init();
        },
      },
      {
        name: 'isInitialized',
        exec: () => KakaoSDK.isInitialized(),
      },
      {
        name: 'openWithDefault',
        exec: () => {
          return KakaoCustomTabsClient.openWithDefault({
            uri: 'https://developers.kakao.com/docs',
          });
        },
      },
      {
        name: 'appKey',
        exec: () => KakaoSDK.appKey(),
      },
    ],
  },
];
export default SampleCommon;
