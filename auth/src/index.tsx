import { NativeModules, Platform } from 'react-native';
import { Cleanser } from './Cleanser';
import type { OAuthToken } from './types';
import { task } from 'react-native-kakao-sdk-common';

export * from './types';
export * from './Cleanser';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-auth' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkAuthApiModule = NativeModules.KakaoSdkAuthApiModule
  ? NativeModules.KakaoSdkAuthApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkAuthApiModule : ' + LINKING_ERROR);
      },
    },
  );

const KakaoSdkTokenManagerModule = NativeModules.KakaoSdkTokenManagerModule
  ? NativeModules.KakaoSdkTokenManagerModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkTokenManagerModule : ' + LINKING_ERROR);
      },
    },
  );

/** 토큰 저장소 */
export class TokenManager {
  /** 저장된 토큰 가져오기 */
  static getToken(): Promise<OAuthToken | null> {
    return task(KakaoSdkTokenManagerModule.getToken, undefined, {
      cleanser: Cleanser.oauthToken,
      noarg: true,
    });
  }

  /** 저장된 토큰 삭제 */
  static clear(): Promise<boolean> {
    return task(KakaoSdkTokenManagerModule.clear, undefined, { noarg: true });
  }
}

/** 인증 API */
export default class AuthApi {
  /** 기존 토큰 존재 여부<br>
   * 사용자가 앞서 로그인을 통해 토큰을 발급 받은 상태인지 확인합니다<br>
   * 주의: 기존 토큰 존재 여부를 확인하는 기능으로, 사용자가 현재도 로그인 상태임을 보장하지 않습니다
   * */
  public static hasToken(): Promise<boolean> {
    return task(KakaoSdkAuthApiModule.hasToken, undefined, { noarg: true });
  }

  /** 기존 토큰 갱신 */
  public static refreshToken(): Promise<OAuthToken> {
    return task<undefined, OAuthToken>(KakaoSdkAuthApiModule.refreshToken, undefined, {
      cleanser: Cleanser.oauthToken,
      noarg: true,
    });
  }
}
