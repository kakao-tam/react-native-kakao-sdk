import type { Channels } from './types';
import { Utils } from '../../common';

const Cleanser = {
  channels: (channels: Channels): void => {
    if (channels.channels) {
      for (let channel of channels.channels) {
        if (channel.updatedAt) {
          channel.updatedAt = new Date(channel.updatedAt as any as number);
        }
        if (!Utils.isIOS) {
          channel.channelPublicId = Utils.getAndRemove(channel, 'channel_public_id');
          channel.channelUuid = Utils.getAndRemove(channel, 'channel_uuid');
        }
      }
    }
  },
};

export { Cleanser };
