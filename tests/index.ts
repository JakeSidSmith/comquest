import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'composeComquestReducers',
    'createComquestActionTypes',
    'createComquestAction',
    'createComquestDataReducer',
    'createComquestErrorReducer',
    'createComquestStateReducer',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
