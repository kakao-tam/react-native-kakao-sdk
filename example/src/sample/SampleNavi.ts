import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import { NaviApi, NaviUrlParam } from 'react-native-kakao-sdk-navi';

const SampleNavi: SectionListData<ICallApi>[] = [
  {
    key: 'NaviApi (navi)',
    data: [
      {
        name: 'shareUrl',
        exec: () => {
          let param: NaviUrlParam = {
            destination: {
              name: '카카오판교오피스',
              x: '321286',
              y: '533707',
            },
            option: {
              rpOption: '1',
              coordType: 'katec',
              vehicleType: '1',
            },
          };
          return NaviApi.shareUrl(param);
        },
      },
      {
        name: 'navigateUrl',
        exec: () => {
          let param: NaviUrlParam = {
            destination: {
              name: '카카오판교오피스',
              x: '321286',
              y: '533707',
            },
          };
          return NaviApi.navigateUrl(param);
        },
      },
    ],
  },
];
export default SampleNavi;
