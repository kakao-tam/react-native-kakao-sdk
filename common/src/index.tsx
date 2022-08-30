import { NativeModules, Platform } from 'react-native';
import type { InitParam, OpenWithDefaultParam } from './types';
import CommonUtils from './commonUtils';
import CommonTemplateUtils from './commonTemplateUtils';

const LINKING_ERROR =
  `The package 'react-native-kakao-sdk-common' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const KakaoSdkCommonModule = NativeModules.KakaoSdkCommonModule
  ? NativeModules.KakaoSdkCommonModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error('KakaoSdkCommonModule : ' + LINKING_ERROR);
      },
    },
  );

export interface TaskOptions<Param, Result> {
  cleanser?: (obj: Result) => void;
  cleanserRequest?: (param: Param) => void;
  isPrimitiveResult?: boolean;
  noarg?: boolean;
}

export type ReactMethod = (param: any) => Promise<any>
const TaskUtil = {
  cleanReqParam: <Param, Result>(param?: Param, taskOptions?: TaskOptions<Param, Result>) => {
    if (taskOptions?.cleanserRequest && param) {
      taskOptions.cleanserRequest(param);
    }
  },
  cleanResult: <Param, Result>(result: Result, taskOptions?: TaskOptions<Param, Result>) => {
    if (taskOptions?.cleanser) {
      taskOptions.cleanser(result);
    }
  },
  toRnParam: <Param, Result>(param?: Param, taskOptions?: TaskOptions<Param, Result>): any => {
    if (taskOptions?.noarg) {
      return [];
    }
    return [{ '_json_': JSON.stringify({ ...{}, ...param }) }];
  },
  toResult: <Param, Result>(rawValue: any, taskOptions?: TaskOptions<Param, Result>): Result => {
    if (taskOptions?.isPrimitiveResult) {
      return rawValue as Result;
    }
    return JSON.parse(rawValue) as Result;
  },
};

function task<Param, Result>(promise: ReactMethod, param?: Param, taskOptions?: TaskOptions<Param, Result>): Promise<Result> {
  TaskUtil.cleanReqParam(param, taskOptions);
  const p = TaskUtil.toRnParam(param, taskOptions);
  console.debug('KakaoSDK:req: ', p);
  return promise.apply(undefined, p).then(rawValue => {
    console.debug('KakaoSDK:res-origin: ', rawValue);
    if (Utils.isNullValue(rawValue)) {
      return null as any;
    }
    const result = TaskUtil.toResult(rawValue, taskOptions);
    TaskUtil.cleanResult(result, taskOptions);
    console.debug('KakaoSDK:res: ', result);
    return result;
  }).catch(error => {
    console.debug('KakaoSDK:error', JSON.stringify(error));
    throw error;
  });
};

const Utils = new CommonUtils();
const TemplateUtils = new CommonTemplateUtils();
export {
  Utils, TemplateUtils, task,
};
export * from './types';

/** 간편한 커스텀 탭 실행 */
export class KakaoCustomTabsClient {
  /** 기본탭 실행 */
  static async openWithDefault(param: OpenWithDefaultParam): Promise<boolean> {
    return task(KakaoSdkCommonModule.openWithDefault, param, { isPrimitiveResult: true });
  }
}

/** KakaoSDK */
export default class KakaoSDK {
  /**
   * 초기화<br>
   * 직접 초기화 하기 보단, KAKAO_NATIVE_APP_KEY 리소스를 설정하여 자동으로 초기화 되도록 하시는 것을 권장드립니다.
   * */
  static async init(param?: InitParam): Promise<boolean> {
    return task(KakaoSdkCommonModule.init, param, {
      isPrimitiveResult: true,
    });
  }

  /** 초기화 여부 */
  static async isInitialized() {
    return task(KakaoSdkCommonModule.isInitialized, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }

  /** 적용된 앱 키 보기 */
  static async appKey() {
    return task(KakaoSdkCommonModule.appKey, undefined, {
      isPrimitiveResult: true,
      noarg: true,
    });
  }
}
