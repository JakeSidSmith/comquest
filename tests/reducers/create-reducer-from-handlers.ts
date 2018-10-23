import { AnyAction } from 'redux';
import {
  ComquestSuccessAction,
  createComquestActionTypes,
  HandlersReducer,
} from '../../src';
import { createReducerFromHandlers } from '../../src/reducers/create-reducer-from-handlers';

describe('createReducerFromHandlers', () => {
  const actionTypes = createComquestActionTypes('test');
  const unknownAction = { type: 'unknown' };

  interface Data {
    foo: 'bar';
  }

  let reducer: HandlersReducer<Data | null, AnyAction>;

  it('creates a reducer function', () => {
    reducer = createReducerFromHandlers(
      {
        [actionTypes.SUCCESS]: (
          _state: Data | null,
          action: ComquestSuccessAction<Data>
        ) => {
          return action.payload;
        },
      },
      null
    );

    expect(typeof reducer).toBe('function');
  });

  it('should return the default value for unknown actions', () => {
    expect(reducer(undefined, unknownAction)).toBe(null);
  });

  it('should return the value from the relevant handler', () => {
    expect(
      reducer(undefined, { type: actionTypes.SUCCESS, payload: { foo: 'bar' } })
    ).toEqual({
      foo: 'bar',
    });
  });
});
