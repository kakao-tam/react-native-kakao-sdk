import { NativeModules, Platform } from 'react-native';
import { task } from 'react-native-kakao-sdk-common';
import type {
  AddChannelParam,
  ChannelChatParam,
  ChannelParam,
  Channels,
  Friends,
  FriendsParam,
  MessageSendResult,
  SendCustomMemoParam,
  SendCustomMessageParam,
  SendDefaultMemoParam, SendDefaultMessageParam,
  SendScrapMemoParam, SendScrapMessageParam,
  TalkProfile,
} from './types';
import { Cleanser } from './Cleanser';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-talk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkTalkApiModule = NativeModules.KakaoSdkTalkApiModule
  ? NativeModules.KakaoSdkTalkApiModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkTalkApiModule : ' + LINKING_ERROR);
      },
    },
  );

export default class TalkApi {
  /** 채널 추가 URL */
  static addChannelUrl(param: AddChannelParam): Promise<string> {
    return task(KakaoSdkTalkApiModule.addChannelUrl, param, { isPrimitiveResult: true });
  }

  /** 채널 대화방 URL */
  static channelChatUrl(param: ChannelChatParam): Promise<string> {
    return task(KakaoSdkTalkApiModule.channelChatUrl, param, { isPrimitiveResult: true });
  }

  /** 채널 관계 조회 */
  static channels(param: ChannelParam): Promise<Channels> {
    return task(KakaoSdkTalkApiModule.channels, param, { cleanser: Cleanser.channels });
  }

  /** 친구 목록 조회 */
  static friends(param: FriendsParam): Promise<Friends> {
    return task(KakaoSdkTalkApiModule.friends, param);
  }

  /** 카카오톡 프로필 조회 */
  static profile(param: undefined): Promise<TalkProfile> {
    return task(KakaoSdkTalkApiModule.profile, param, { noarg: true });
  }

  /** 나에게 커스텀 메시지 보내기 */
  static sendCustomMemo(param: SendCustomMemoParam): Promise<boolean> {
    return task(KakaoSdkTalkApiModule.sendCustomMemo, param, { isPrimitiveResult: true });
  }

  /** 나에게 기본 메시지 보내기 */
  static sendDefaultMemo(param: SendDefaultMemoParam): Promise<boolean> {
    return task(KakaoSdkTalkApiModule.sendDefaultMemo, param, { isPrimitiveResult: true });
  }

  /** 나에게 스크랩 메시지 보내기 */
  static sendScrapMemo(param: SendScrapMemoParam): Promise<boolean> {
    return task(KakaoSdkTalkApiModule.sendScrapMemo, param, { isPrimitiveResult: true });
  }

  /** 커스텀 메시지 보내기 */
  static sendCustomMessage(param: SendCustomMessageParam): Promise<MessageSendResult> {
    return task(KakaoSdkTalkApiModule.sendCustomMessage, param);
  }

  /** 기본 메시지 보내기 */
  static sendDefaultMessage(param: SendDefaultMessageParam): Promise<MessageSendResult> {
    return task(KakaoSdkTalkApiModule.sendDefaultMessage, param);
  }

  /** 스크랩 메시지 보내기 */
  static sendScrapMessage(param: SendScrapMessageParam): Promise<MessageSendResult> {
    return task(KakaoSdkTalkApiModule.sendScrapMessage, param);
  }
}
