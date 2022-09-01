import type { SectionListData } from "react-native";
import KakaoSDK, { InitParam } from "react-native-kakao-sdk-common";
import AuthApi from "react-native-kakao-sdk-auth";

export interface ICallApi {
  name: string;
  desc?: string;
  exec: (log: (log: string | object, type?: string) => void) => Promise<any>;
  case?: ICallApi[];
}

const ApiSample: SectionListData<ICallApi>[] = [
  {
    key: "KakaoSDK",
    data: [
      {
        name: "init",
        exec: (log) => {
          let param: InitParam = {};
          log(param, "REQ");
          return KakaoSDK.init(param);
        },
      },
      {
        name: "isInitialized",
        exec: () => KakaoSDK.isInitialized(),
      },
    ],
  },
  {
    key: "AuthApi",
    data: [
      {
        name: "hasToken",
        exec: () => AuthApi.hasToken(),
      },
      {
        name: "refreshToken",
        exec: () => AuthApi.refreshToken(),
      },
    ],
  },
];

export default ApiSample;
