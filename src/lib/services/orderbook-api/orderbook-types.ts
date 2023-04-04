import * as t from 'io-ts';

const fetchMetadata = t.partial({
  orderHash: t.string,
  remainingFillableTakerAmount: t.string,
  createdAt: t.string,
});
const subscriptionMetadata = t.partial({
  orderHash: t.string,
  remainingFillableTakerAmount: t.string,
  state: t.union([t.literal('ADDED'), t.literal('UPDATED'), t.literal('REMOVED')]),
});

export const OrderbookRecord = t.type({
  order: t.type({
    signature: t.type({
      signatureType: t.number,
      r: t.string,
      s: t.string,
      v: t.number,
    }),
    sender: t.string,
    maker: t.string,
    taker: t.string,
    takerTokenFeeAmount: t.string,
    makerAmount: t.string,
    takerAmount: t.string,
    makerToken: t.string,
    takerToken: t.string,
    salt: t.string,
    verifyingContract: t.string,
    feeRecipient: t.string,
    expiry: t.string,
    chainId: t.number,
    pool: t.string,
  }),
  // metadata have optional fields
  metaData: fetchMetadata,
});
