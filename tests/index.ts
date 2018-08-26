import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'createRequestActionTypes',
    'createRequestAction',
    'createRequestDataReducer',
    'createRequestErrorReducer',
    'createRequestStateReducer',
  ];

  it('exports foo bar', () => {
    utils.forEach(util => {
      expect(util in src).toBe(true);
      expect(typeof src[util]).toBe('function');
    });
  });
});
