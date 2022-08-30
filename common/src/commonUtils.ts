// 공통 유틸리티
import { NativeModules, Platform } from 'react-native';

export default class CommonUtils {
  public readonly isIOS: boolean;
  public readonly isAOS: boolean;
  public readonly locale: string;

  constructor() {
    this.isIOS = Platform.OS === 'ios';
    this.isAOS = !this.isIOS;
    try {
      if (this.isIOS) {
        this.locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
      } else {
        this.locale = NativeModules.I18nManager.localeIdentifier;
      }
    } catch {
      this.locale = 'not support';
    }
  }

  // 프로퍼티를 삭제하면서 값을 가져옵니다.
  public getAndRemove = (obj: any, prop: string): any => {
    let val = obj[prop];
    delete obj[prop];
    return val;
  };

  // NULL로 처리될 값 여부
  public isNullValue = (val: any): boolean => {
    return val === undefined || val === null || val === 'undefined' || val === 'null';
  };

  // 프로퍼티 삭제
  public remove = (obj: any, prop: string) => {
    delete obj[prop];
  };

  // UTC 시간을 GMT로 변경
  public utcToGmt = (time: number): number => {
    return time + (new Date().getTimezoneOffset() * 6000 * -2);
  };
}
