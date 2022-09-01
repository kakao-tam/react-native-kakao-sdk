import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import TalkApi, {
  AddChannelParam,
  ChannelChatParam,
  FriendsParam,
  SendCustomMemoParam,
  SendDefaultMemoParam,
  SendScrapMemoParam,
} from 'react-native-kakao-sdk-talk';
import { sampleFeedTemplate } from '../SampleTemplates';

const SampleTalk: SectionListData<ICallApi>[] = [
  {
    key: 'TalkApi (talk)',
    data: [
      {
        name: 'addChannelUrl',
        exec: (log) => {
          let param: AddChannelParam = {
            channelPublicId: '_axjcdu',
          };
          log(param, 'REQ');
          return TalkApi.addChannelUrl(param);
        },
      },
      {
        name: 'channelChatUrl',
        exec: (log) => {
          let param: ChannelChatParam = {
            channelPublicId: '_xgTNZs',
          };
          log(param, 'REQ');
          return TalkApi.channelChatUrl(param);
        },
      },
      {
        name: 'channels',
        exec: () => TalkApi.channels(),
      },
      {
        name: 'friends',
        exec: (log) => {
          let param: FriendsParam = {
            friendOrder: 'nickname',
            order: 'asc',
            limit: 100,
            offset: 0,
          };
          log(param, 'REQ');
          return TalkApi.friends(param);
        },
      },
      {
        name: 'profile',
        exec: () => TalkApi.profile(),
      },
      {
        name: 'sendCustomMemo',
        exec: (log) => {
          let param: SendCustomMemoParam = {
            templateId: 76406,
            templateArgs: {
              profile: '- sendCustomMemo',
            },
          };
          log(param, 'REQ');
          return TalkApi.sendCustomMemo(param);
        },
      },
      {
        name: 'sendDefaultMemo',
        exec: (log) => {
          let param: SendDefaultMemoParam = {
            templatable: sampleFeedTemplate,
          };
          log(param, 'REQ');
          return TalkApi.sendDefaultMemo(param);
        },
      },
      {
        name: 'sendScrapMemo',
        exec: (log) => {
          let param: SendScrapMemoParam = {
            requestUrl: 'https://developers.kakao.com',
          };
          log(param, 'REQ');
          return TalkApi.sendScrapMemo(param);
        },
      },
    ],
  },
];
export default SampleTalk;
