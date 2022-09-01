import { NativeModules, Platform } from 'react-native';
import { task } from 'react-native-kakao-sdk-common';
import type {
  ImageUploadResult, MakeCustomUrlParam, MakeDefaultUrlParam, MakeScrapUrlParam,
  ScrapImageParam,
  ShareCustomParam,
  ShareDefaultParam,
  ShareScrapParam,
  SharingResult, UploadImageParam,
} from './types';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-share' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkShareApiModule = NativeModules.KakaoSdkShareApiModule
  ? NativeModules.KakaoSdkShareApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkShareApiModule : ' + LINKING_ERROR);
      },
    },
  );

/** 카카오톡 공유하기 API */
export default class ShareApi {
  /** 카카오톡으로 공유하기 가능여부 */
  static isKakaoTalkSharingAvailable(): Promise<boolean> {
    return task(KakaoSdkShareApiModule.isKakaoTalkSharingAvailable, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }

  /** 카카오톡 공유 컨텐츠 이미지로 활용하기 위해 원격 이미지를 카카오 이미지 서버로 스크랩 합니다. */
  static scrapImage(param: ScrapImageParam): Promise<ImageUploadResult> {
    return task(KakaoSdkShareApiModule.scrapImage, param);
  }

  /** 카카오 디벨로퍼스에서 생성한 메시지 템플릿을 카카오톡으로 공유합니다. */
  static shareCustom(param: ShareCustomParam): Promise<SharingResult> {
    return task(KakaoSdkShareApiModule.shareCustom, param);
  }

  /** 기본 템플릿을 카카오톡으로 공유합니다. */
  static shareDefault(param: ShareDefaultParam): Promise<SharingResult> {
    return task(KakaoSdkShareApiModule.shareDefault, param);
  }

  /** 지정된 URL을 스크랩하여 만들어진 템플릿을 카카오톡으로 공유합니다. */
  static shareScrap(param: ShareScrapParam): Promise<SharingResult> {
    return task(KakaoSdkShareApiModule.shareScrap, param);
  }

  /** 카카오톡 공유 컨텐츠 이미지로 활용하기 위해 로컬 이미지를 카카오 이미지 서버로 업로드 합니다. */
  static uploadImage(param: UploadImageParam): Promise<ImageUploadResult> {
    return task(KakaoSdkShareApiModule.uploadImage, param);
  }

  /** 카카오 디벨로퍼스에서 생성한 메시지 템플릿을 공유하는 웹 공유 URL을 얻습니다. */
  static makeCustomUrl(param: MakeCustomUrlParam): Promise<string> {
    return task(KakaoSdkShareApiModule.makeCustomUrl, param, {
      isPrimitiveResult: true,
    });
  }

  /** 기본 템플릿을 공유하는 웹 공유 URL을 얻습니다. */
  static makeDefaultUrl(param: MakeDefaultUrlParam): Promise<string> {
    return task(KakaoSdkShareApiModule.makeDefaultUrl, param, {
      isPrimitiveResult: true,
    });
  }

  /** 지정된 URL을 스크랩하여 만들어진 템플릿을 공유하는 웹 공유 URL을 얻습니다. */
  static makeScrapUrl(param: MakeScrapUrlParam): Promise<string> {
    return task(KakaoSdkShareApiModule.makeScrapUrl, param, {
      isPrimitiveResult: true,
    });
  }
}
