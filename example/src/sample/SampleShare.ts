import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import ShareApi, {
  ShareScrapParam,
  ShareCustomParam,
  ShareDefaultParam,
  ScrapImageParam, UploadImageParam, MakeCustomUrlParam, MakeDefaultUrlParam, MakeScrapUrlParam,
} from 'react-native-kakao-sdk-share';
import * as ImagePicker from 'react-native-image-picker';
import { sampleFeedTemplate } from '../SampleTemplates';

const SampleShare: SectionListData<ICallApi>[] = [
  {
    key: 'ShareApi (share)',
    data: [
      {
        name: 'isKakaoTalkSharingAvailable',
        exec: () => ShareApi.isKakaoTalkSharingAvailable(),
      },
      {
        name: 'scrapImage',
        exec: () => {
          const param: ScrapImageParam = {
            imageUrl: 'https://developers.kakao.com/docs/latest/ko/assets/style/images/design-guide/login-button-component.png',
          };
          return ShareApi.scrapImage(param);
        },
      },
      {
        name: 'shareCustom',
        exec: () => {
          const param: ShareCustomParam = {
            templateId: 74138,
            templateArgs: {
              goods_name: '사용자정의 상품명',
            },
          };
          return ShareApi.shareCustom(param);
        },
      },
      {
        name: 'shareDefault',
        exec: () => {
          const param: ShareDefaultParam = {
            templatable: sampleFeedTemplate,
          };
          return ShareApi.shareDefault(param);
        },
      },
      {
        name: 'shareScrap',
        exec: () => {
          let param: ShareScrapParam = {
            requestUrl: 'https://developers.kakao.com/',
          };
          return ShareApi.shareScrap(param);
        },
      },
      {
        name: 'uploadImage',
        exec: async () => {
          const imgObj = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
          });
          const param: UploadImageParam = {
            image: imgObj.assets?.[0].uri || '',
          };
          return ShareApi.uploadImage(param);
        },
      },
      {
        name: 'makeCustomUrl',
        exec: () => {
          const param: MakeCustomUrlParam = {
            templateId: 74138,
            templateArgs: {
              goods_name: '사용자정의 상품명',
            },
          };
          return ShareApi.makeCustomUrl(param);
        },
      },
      {
        name: 'makeDefaultUrl',
        exec: () => {
          const param: MakeDefaultUrlParam = {
            templatable: sampleFeedTemplate,
          };
          return ShareApi.makeDefaultUrl(param);
        },
      },
      {
        name: 'makeScrapUrl',
        exec: () => {
          const param: MakeScrapUrlParam = {
            requestUrl: 'https://developers.kakao.com',
          };
          return ShareApi.makeScrapUrl(param);
        },
      }
    ],
  },
];
export default SampleShare;
