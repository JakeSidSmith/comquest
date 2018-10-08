import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'composeComquestReducers',
    'createComquestMiddleware',
    'createComquestActionTypes',
    'createComquestRequestAction',
    'createComquestClearRequestDataAction',
    'createComquestClearRequestErrorsAction',
    'createComquestResetRequestStateAction',
    'createComquestRequestDataReducer',
    'createComquestRequestErrorReducer',
    'createComquestRequestStateReducer',
    'isComquestAction',
    'isComquestSuccessAction',
    'isComquestFailureAction',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
