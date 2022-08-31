import { NativeModules, Platform } from 'react-native';
import type { OpenPickerFriendRequestParams, SelectedUsers } from './types';
import { task } from 'react-native-kakao-sdk-common';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-friend' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkPickerApiModule = NativeModules.KakaoSdkPickerApiModule
  ? NativeModules.KakaoSdkPickerApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkPickerApiModule : ' + LINKING_ERROR);
      },
    },
  );

/** 친구피커 API */
export default class PickerApi {
  /** 한 명의 친구만 선택(싱글 피커)할 수 있는 친구 피커를 화면 전체에 표시합니다 */
  static selectFriend(param?: OpenPickerFriendRequestParams): Promise<SelectedUsers> {
    return task(KakaoSdkPickerApiModule.selectFriend, param);
  }

  /** 한 명의 친구만 선택(싱글 피커)할 수 있는 친구 피커를 팝업 형태로 표시합니다 */
  static selectFriendPopup(param?: OpenPickerFriendRequestParams): Promise<SelectedUsers> {
    return task(KakaoSdkPickerApiModule.selectFriendPopup, param);
  }

  /** 여러 명의 친구를 선택(멀티 피커)할 수 있는 친구 피커를 화면 전체에 표시합니다 */
  static selectFriends(param?: OpenPickerFriendRequestParams): Promise<SelectedUsers> {
    return task(KakaoSdkPickerApiModule.selectFriends, param);
  }

  /** 여러 명의 친구를 선택(멀티 피커)할 수 있는 친구 피커를 팝업 형태로 표시합니다 */
  static selectFriendsPopup(param?: OpenPickerFriendRequestParams): Promise<SelectedUsers> {
    return task(KakaoSdkPickerApiModule.selectFriendsPopup, param);
  }
}
