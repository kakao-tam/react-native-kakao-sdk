import { SectionListData } from 'react-native';
import { ICallApi } from '../ApiSample';
import PickerApi from 'react-native-kakao-sdk-friend';

const SampleFriend: SectionListData<ICallApi>[] = [
  {
    key: 'PickerApi (friend)',
    data: [
      {
        name: 'selectFriend',
        exec: () => PickerApi.selectFriend(),
      },
      {
        name: 'selectedFriendPopup',
        exec: () => PickerApi.selectFriendPopup(),
      },
      {
        name: 'selectFriends',
        exec: () => PickerApi.selectFriends(),
      },
      {
        name: 'selectedFriendsPopup',
        exec: () => PickerApi.selectFriendsPopup(),
      },
    ],
  },
];
export default SampleFriend;
