import { NativeModules, Platform } from 'react-native';
import { Cleanser, CleanserRequest } from './Cleanser';
import type {
  AccessTokenInfo,
  CertLoginWithKakaoAccountParam,
  CertLoginWithKakaoTalkParam,
  LoginWithKakaoAccountParam,
  LoginWithKakaoTalkParam,
  MeParam,
  RevokeScopesParam,
  ScopeInfo,
  ScopesParam,
  ServiceTermsParam, ShippingAddressesParam, SignupParam, UpdateProfileParam,
  User, UserServiceTerms, UserShippingAddresses,
} from './types';
import { task } from 'react-native-kakao-sdk-common';
import type { CertTokenInfo, OAuthToken } from 'react-native-kakao-sdk-auth';

export * from './types';
export * from './Cleanser';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-user' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkUserApiModule = NativeModules.KakaoSdkUserApiModule
  ? NativeModules.KakaoSdkUserApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkUserApiModule : ' + LINKING_ERROR);
      },
    },
  );

/** 사용자관리 API */
export default class UserApi {
  /** 현재 로그인한 사용자의 엑세스 토큰 정보 보기 */
  static accessTokenInfo(): Promise<AccessTokenInfo> {
    return task(KakaoSdkUserApiModule.accessTokenInfo, undefined, { noarg: true });
  }

  /** 채널 메시지 방식 카카오톡 인증 로그인 */
  static certLoginWithKakaoAccount(param?: CertLoginWithKakaoAccountParam): Promise<CertTokenInfo> {
    return task(KakaoSdkUserApiModule.certLoginWithKakaoAccount, param, {
      cleanser: Cleanser.certTokenInfo,
    });
  }


  /** 앱투앱 방식 카카오톡 인증 로그인 */
  static certLoginWithKakaoTalk(param?: CertLoginWithKakaoTalkParam): Promise<CertTokenInfo> {
    return task(KakaoSdkUserApiModule.certLoginWithKakaoTalk, param, {
      cleanser: Cleanser.certTokenInfo,
    });
  }


  /** 카카오톡 로그인 가능(철치)여부 검사 */
  static isKakaoTalkLoginAvailable(): Promise<boolean> {
    return task(KakaoSdkUserApiModule.isKakaoTalkLoginAvailable, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }


  /** 카카오계정 로그인 (브라우저 이용) */
  static loginWithKakaoAccount(param?: LoginWithKakaoAccountParam): Promise<OAuthToken> {
    return task<LoginWithKakaoAccountParam, OAuthToken>(KakaoSdkUserApiModule.loginWithKakaoAccount, param, {
      cleanser: Cleanser.oauthToken,
    });
  }

  /** 카카오톡 로그인 (카카오톡 이용) */
  static loginWithKakaoTalk(param?: LoginWithKakaoTalkParam): Promise<OAuthToken> {
    return task<LoginWithKakaoAccountParam, OAuthToken>(KakaoSdkUserApiModule.loginWithKakaoTalk, param, {
      cleanser: Cleanser.oauthToken,
    });
  }

  /** 현재 토큰을 만료시키고 로그아웃 */
  static logout(): Promise<boolean> {
    return task(KakaoSdkUserApiModule.logout, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }

  /** 사용자 정보 요청 */
  static me(param?: MeParam): Promise<User> {
    return task(KakaoSdkUserApiModule.me, param, {
      cleanser: Cleanser.user,
    });
  }

  /** 특정 동의항목 철회 */
  static revokeScopes(param: RevokeScopesParam): Promise<ScopeInfo> {
    return task(KakaoSdkUserApiModule.revokeScopes, param);
  }

  /** 사용자 동의 항목 목록 상세 */
  static scopes(param?: ScopesParam): Promise<ScopeInfo> {
    return task(KakaoSdkUserApiModule.scopes, param);
  }

  /** 서비스약관 동의 내역 목록 상세 */
  static serviceTerms(param?: ServiceTermsParam): Promise<UserServiceTerms> {
    return task(KakaoSdkUserApiModule.serviceTerms, param, {
        cleanser: Cleanser.serviceTerms,
      },
    );
  }

  /** 사용자 배송지 목록 */
  static shippingAddresses(param?: ShippingAddressesParam): Promise<UserShippingAddresses> {
    return task(KakaoSdkUserApiModule.shippingAddresses, param, {
        cleanser: Cleanser.shippingAddresses,
        cleanserRequest: CleanserRequest.shippingAddresses,
      },
    );
  }

  /** 앱 연결요청(자동연결이 아닌경우) */
  static signup(param?: SignupParam): Promise<boolean> {
    return task(KakaoSdkUserApiModule.signup, param, { isPrimitiveResult: true });
  }

  /** 연결 끊기 */
  static unlink(): Promise<boolean> {
    return task(KakaoSdkUserApiModule.unlink, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }

  /** 사용자 부가정보 추가 및 수정 */
  static updateProfile(param: UpdateProfileParam): Promise<boolean> {
    return task(KakaoSdkUserApiModule.updateProfile, param);
  }
}
