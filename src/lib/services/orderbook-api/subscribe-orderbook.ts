import * as t from 'io-ts';
import { OrderbookRecord } from './orderbook-types';
import { ORDERBOOK_WSS_URL } from '../../environment/public-environment';
import { Observable } from 'rxjs';

// Types ===================================================
const BaseMessage = t.type({
  type: t.literal('subscribe'),
  channel: t.literal('orders'),
  requestId: t.string,
});

const RequestMessage = t.type({
  ...BaseMessage.props,
  payload: t.union([
    t.undefined,
    t.type({
      makerToken: t.string,
      takerToken: t.string,
    }),
  ]),
});

type RequestMessage = t.TypeOf<typeof RequestMessage>;

const ResponseMessage = t.type({
  ...BaseMessage.props,
  payload: t.array(OrderbookRecord),
});

type ResponseMessage = t.TypeOf<typeof ResponseMessage>;

// Service =================================================
const ws = new WebSocket(ORDERBOOK_WSS_URL);

export const orderbookFromPair = (makerToken: string, takerToken: string) =>
  new Observable<ResponseMessage>((subscriber) => {
    // this is how we can subscribe multiple times and still separate things
    const requestId = Math.random().toString(36).substring(7);

    const request: RequestMessage = {
      type: 'subscribe',
      channel: 'orders',
      requestId,
      payload: {
        makerToken,
        takerToken,
      },
    };

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.requestId === requestId) {
        subscriber.next(message);
      }
    });

    ws.send(JSON.stringify(request));

    return () => {
      ws.close();
    };
  });
