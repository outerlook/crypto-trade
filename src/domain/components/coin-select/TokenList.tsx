import { Token } from '@lib/services/coin-gecko/all-tokens';

export const TokenList = (props: { tokens: Token[] }) => {
  return (
    <>
      {props.tokens.map((token) => (
        <div key={token.name}>{token.name}</div>
      ))}
    </>
  );
};
