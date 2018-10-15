import {
  ComquestSuccessAction,
  createComquestActionTypes,
  createReducerFromHandlers,
} from '../../src';

describe('createReducerFromHandlers', () => {
  const actionTypes = createComquestActionTypes('test');
  const unknownAction = { type: 'unknown' };

  interface Data {
    foo: 'bar';
  }

  it('creates a reducer function', () => {
    const reducer = createReducerFromHandlers<Data | null>(
      {
        [actionTypes.SUCCESS]: (
          _state,
          action: ComquestSuccessAction<Data>
        ) => {
          return action.payload;
        },
      },
      null
    );

    expect(typeof reducer).toBe('function');
    expect(reducer(undefined, unknownAction)).toBe(null);
    expect(
      reducer(undefined, { type: actionTypes.SUCCESS, payload: { foo: 'bar' } })
    ).toEqual({
      foo: 'bar',
    });
  });
});
