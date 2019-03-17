import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'isComquestAction',
    'isComquestSuccessAction',
    'isComquestFailureAction',
    'composeReducers',
    'createActionTypes',
    'createMiddleware',
    'createRequestActions',
    'createRequestAction',
    'createClearResponseAction',
    'createClearErrorAction',
    'createResetStateAction',
    'createResponseReducer',
    'createErrorReducer',
    'createStateReducer',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
