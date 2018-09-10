import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'createComquestActionTypes',
    'createComquestAction',
    'createComquestDataReducer',
    'createComquestErrorReducer',
    'createComquestStateReducer',
    'composeComquestReducers',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
