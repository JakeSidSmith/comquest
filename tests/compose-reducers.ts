import { AxiosResponse } from 'axios';
import {
  composeReducers,
  createRequestActionTypes,
  createRequestDataReducer,
  createRequestErrorReducer,
  createRequestStateReducer,
  RequestData,
  RequestState,
} from '../src';

describe('composeReducers', () => {
  const actionTypes = createRequestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer (function)', () => {
    const result = composeReducers(() => ({}), () => ({}));

    expect(typeof result).toBe('function');
  });

  describe('reducer', () => {
    interface Data {
      foo: 'bar';
    }

    const reducer = composeReducers(
      createRequestStateReducer(actionTypes),
      createRequestDataReducer<Data>(actionTypes),
      createRequestErrorReducer(actionTypes)
    );

    let state: RequestState & RequestData<AxiosResponse<Data>>;

    it('should return an object by default', () => {
      const reducerDoesNothing = composeReducers(
        () => undefined as any,
        () => undefined as any
      );
      expect(reducerDoesNothing(undefined, unknownAction)).toEqual({});
    });

    it('should return the same state if nothing changed', () => {
      const firstState = reducer(state, unknownAction);
      const secondState = reducer(firstState, unknownAction);

      expect(firstState).toBe(secondState);
    });

    it('should compose up to five reducers', () => {
      const fiveReducers = composeReducers(
        () => undefined as any,
        () => undefined as any,
        () => undefined as any,
        () => undefined as any,
        () => undefined as any
      );

      expect(fiveReducers(undefined, unknownAction)).toEqual({});
    });

    it('should combine multiple reducer states', () => {
      state = reducer(state, unknownAction);

      expect(state).toEqual({
        loading: false,
        requestCount: 0,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 0,
      });

      state = reducer(state, { type: actionTypes.REQUEST });

      expect(state).toEqual({
        loading: true,
        requestCount: 1,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 1,
      });

      state = reducer(state, {
        type: actionTypes.SUCCESS,
        payload: { data: 'foo' },
      });

      expect(state).toEqual({
        loading: false,
        requestCount: 1,
        successCount: 1,
        failureCount: 0,
        completeCount: 1,
        inFlightCount: 0,
        data: {
          data: 'foo',
        },
      });

      state = reducer(state, { type: actionTypes.REQUEST });

      expect(state).toEqual({
        loading: true,
        requestCount: 2,
        successCount: 1,
        failureCount: 0,
        completeCount: 1,
        inFlightCount: 1,
        data: {
          data: 'foo',
        },
      });

      state = reducer(state, {
        type: actionTypes.FAILURE,
        payload: { response: { error: 'error' } },
      });

      expect(state).toEqual({
        loading: false,
        requestCount: 2,
        successCount: 1,
        failureCount: 1,
        completeCount: 2,
        inFlightCount: 0,
        data: {
          data: 'foo',
        },
        error: {
          response: {
            error: 'error',
          },
        },
      });
    });
  });
});
