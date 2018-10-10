import * as src from '../src';

describe('index.ts', () => {
  const utils: Array<keyof typeof src> = [
    'isComquestAction',
    'isComquestSuccessAction',
    'isComquestFailureAction',
    'composeComquestReducers',
    'createComquestActionTypes',
    'createComquestMiddleware',
    'createComquestRequestAction',
    'createComquestClearRequestDataAction',
    'createComquestClearRequestErrorsAction',
    'createComquestResetRequestStateAction',
    'createComquestRequestDataReducer',
    'createComquestRequestErrorReducer',
    'createComquestRequestStateReducer',
  ];

  it('exports all utilities', () => {
    expect(Object.keys(src)).toEqual(utils);
  });
});
