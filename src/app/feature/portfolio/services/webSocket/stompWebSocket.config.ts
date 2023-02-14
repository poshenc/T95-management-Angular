import { RxStompConfig } from '@stomp/rx-stomp';

export const stompWebSocketConfig: RxStompConfig = {
  brokerURL: '',
  connectHeaders: {},
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
  reconnectDelay: 500,// Wait before attempting auto reconnect

  // debug: (msg: string): void => {
  //   console.log(new Date(), msg);
  // },
};
