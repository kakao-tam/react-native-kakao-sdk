import { NativeModules, Platform } from 'react-native';
import { task } from 'react-native-kakao-sdk-common';
import type {
  DeleteStoryParam,
  LinkInfo,
  LinkInfoParam,
  PostLinkParam,
  PostNoteParam, PostPhotoParam,
  ProfileParam,
  StoriesParam, Story, StoryParam, StoryProfile, StoryUploadParam,
} from './types';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-story' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkStoryApiModule = NativeModules.KakaoSdkStoryApiModule
  ? NativeModules.KakaoSdkStoryApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkStoryApiModule : ' + LINKING_ERROR);
      },
    },
  );

/** 카카오스토리 API */
export class StoryApi {
  /** 카카오스토리의 특정 내 스토리 삭제. */
  static delete(param: DeleteStoryParam): Promise<boolean> {
    return task(KakaoSdkStoryApiModule.delete, param, { isPrimitiveResult: true });
  }

  /** 카카오스토리 사용자인지 확인하기. */
  static isStoryUser(): Promise<boolean> {
    return task(KakaoSdkStoryApiModule.isStoryUser, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }

  /** 포스팅하고자 하는 URL 을 스크랩하여 링크 정보 생성 */
  static linkInfo(param: LinkInfoParam): Promise<LinkInfo> {
    return task(KakaoSdkStoryApiModule.linkInfo, param);
  }

  /** 카카오스토리에 링크 스토리 쓰기 */
  static postLink(param: PostLinkParam): Promise<string> {
    return task(KakaoSdkStoryApiModule.postLink, param, { isPrimitiveResult: true });
  }

  /** 카카오스토리에 글 스토리 쓰기 */
  static postNote(param: PostNoteParam): Promise<string> {
    return task(KakaoSdkStoryApiModule.postNote, param, { isPrimitiveResult: true });
  }

  /** 카카오스토리에 사진 스토리 쓰기 */
  static postPhoto(param: PostPhotoParam): Promise<string> {
    return task(KakaoSdkStoryApiModule.postPhoto, param, { isPrimitiveResult: true });
  }

  /** 카카오스토리 프로필 가져오기 */
  static profile(param?: ProfileParam): Promise<StoryProfile> {
    return task(KakaoSdkStoryApiModule.profile, param);
  }

  /** 카카오스토리의 내 스토리 여러 개 가져오기<br> */
  /** 단, comments, likes 등의 상세정보는 없으며 이는 내스토리 정보 요청 story 통해 획득 가능 */
  static stories(param?: StoriesParam): Promise<Story[]> {
    return task(KakaoSdkStoryApiModule.stories, param);
  }

  /** 카카오스토리의 특정 내 스토리 가져오기 */
  static story(param: StoryParam): Promise<Story> {
    return task(KakaoSdkStoryApiModule.story, param);
  }

  /** 로컬 이미지 파일 여러장을 카카오스토리에 업로드 */
  static upload(param: StoryUploadParam): Promise<string[]> {
    return task(KakaoSdkStoryApiModule.upload, param);
  }
}
