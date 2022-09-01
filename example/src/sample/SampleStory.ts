import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import * as ImagePicker from 'react-native-image-picker';
import {
  DeleteStoryParam,
  LinkInfoParam,
  PostLinkParam,
  PostNoteParam,
  PostPhotoParam,
  StoryApi,
  StoryParam, StoryUploadParam,
} from 'react-native-kakao-sdk-story';

const SampleStory: SectionListData<ICallApi>[] = [
  {
    key: 'StoryApi',
    data: [
      {
        name: 'isStoryUser',
        exec: () => StoryApi.isStoryUser(),
      },
      {
        name: 'linkInfo',
        exec: (log) => {
          let param: LinkInfoParam = {
            url: 'https://developers.kakao.com',
          };
          log(param, 'REQ');
          return StoryApi.linkInfo(param);
        },
      },
      {
        name: 'postLink',
        exec: async (log) => {
          let linkInfoParam: LinkInfoParam = {
            url: 'https://developers.kakao.com',
          };
          let linkInfo = await StoryApi.linkInfo(linkInfoParam);
          let param: PostLinkParam = {
            content: '컨',
            permission: 'M',
            linkInfo: linkInfo,
          };
          log(param, 'REQ');
          return StoryApi.postLink(param);
        },
      },
      {
        name: 'postNote',
        exec: (log) => {
          let param: PostNoteParam = {
            content: 'PostNote Test',
            permission: 'M',
          };
          log(param, 'REQ');
          return StoryApi.postNote(param);
        },
      },
      {
        name: 'postPhoto',
        exec: (log) => {
          let param: PostPhotoParam = {
            content: '',
            permission: 'M',
            imagePaths: ['/8KgWu/hyOCCCDole/kUbrIgTwnbzhxtIk3go0q0/img.jpg?width=1365&height=2048'],
          };
          log(param, 'REQ');
          return StoryApi.postPhoto(param);
        },
      },
      {
        name: 'profile',
        exec: () => StoryApi.profile(),
      },
      {
        name: 'stories',
        exec: () => StoryApi.stories(),
      },
      {
        name: 'story',
        exec: (log) => {
          let param: StoryParam = {
            id: '_KW0Ez0.iXTLMc9xM4a',
          };
          log(param, 'REQ');
          return StoryApi.story(param);
        },
      },
      {
        name: 'upload',
        exec: async (log) => {
          let imgObj = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
          });
          let param: StoryUploadParam = {
            images: [imgObj.assets?.[0].uri || ''],
          };
          log(param, 'REQ');
          return StoryApi.upload(param);
        },
      },
      {
        name: 'delete',
        exec: (log) => {
          let param: DeleteStoryParam = {
            id: '_KW0Ez0.2PPdzc5vk19',
          };
          log(param, 'REQ');
          return StoryApi.delete(param);
        },
      },
    ],
  },
];
export default SampleStory;
