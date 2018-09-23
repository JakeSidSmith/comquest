import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'composeComquestReducers',
    'createComquestMiddleware',
    'createComquestActionTypes',
    'createComquestRequestAction',
    'createComquestRequestDataReducer',
    'createComquestRequestErrorReducer',
    'createComquestRequestStateReducer',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
