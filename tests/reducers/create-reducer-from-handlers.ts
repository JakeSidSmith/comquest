import { AnyAction } from 'redux';
import {
  ComquestSuccessAction,
  createActionTypes,
  HandlersReducer,
} from '../../src';
import { createReducerFromHandlers } from '../../src/reducers/create-reducer-from-handlers';

describe('createReducerFromHandlers', () => {
  const actionTypes = createActionTypes('test');
  const unknownAction = { type: 'unknown' };

  interface Response {
    foo: 'bar';
  }

  let reducer: HandlersReducer<Response | null, AnyAction>;

  it('creates a reducer function', () => {
    reducer = createReducerFromHandlers(
      {
        [actionTypes.SUCCESS]: (
          _state: Response | null,
          action: ComquestSuccessAction<Response>
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
