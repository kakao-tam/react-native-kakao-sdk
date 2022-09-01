import type { SectionListData } from 'react-native';
import SampleCommon from './sample/SampleCommon';
import SampleAuth from './sample/SampleAuth';
import SampleUser from './sample/SampleUser';
import SampleTalk from './sample/SampleTalk';
import SampleFriend from './sample/SampleFriend';
import SampleShare from './sample/SampleShare';
import SampleNavi from './sample/SampleNavi';
import SampleStory from './sample/SampleStory';

export interface ICallApi {
  name: string;
  desc?: string;
  exec: (log: (log: string | object, type?: string) => void) => Promise<any>;
  case?: ICallApi[];
}

const ApiSample: SectionListData<ICallApi>[] = [
  ...SampleCommon,
  ...SampleAuth,
  ...SampleUser,
  ...SampleTalk,
  ...SampleFriend,
  ...SampleShare,
  ...SampleStory,
  ...SampleNavi,
];

export default ApiSample;
