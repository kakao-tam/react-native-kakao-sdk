import { NativeModules, Platform } from 'react-native';
import { task } from 'react-native-kakao-sdk-common';
import type { NaviUrlParam } from './types';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-navi' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkNaviApiModule = NativeModules.KakaoSdkNaviApiModule
  ? NativeModules.KakaoSdkNaviApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkNaviApiModule : ' + LINKING_ERROR);
      },
    },
  );

/** 카카오내비 API */
export class NaviApi {
  /** 카카오내비 앱으로 목적지를 공유하는 URL 조회 */
  static shareUrl(param: NaviUrlParam): Promise<string> {
    return task(KakaoSdkNaviApiModule.shareUrl, param, { isPrimitiveResult: true });
  }

  /** 카카오내비 앱으로 길안내를 실행하는 URL 조회 */
  static navigateUrl(param: NaviUrlParam): Promise<string> {
    return task(KakaoSdkNaviApiModule.navigateUrl, param, { isPrimitiveResult: true });
  }
}
