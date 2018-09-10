import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
  composeComquestReducers,
  createComquestActionTypes,
  createComquestDataReducer,
  createComquestErrorReducer,
  createComquestStateReducer,
  RequestData,
  RequestState,
} from '../src';

describe('composeReducers', () => {
  const actionTypes = createComquestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer (function)', () => {
    const result = composeComquestReducers(() => ({}), () => ({}));

    expect(typeof result).toBe('function');
  });

  describe('reducer', () => {
    interface Data {
      foo: 'bar';
    }

    const reducer = composeComquestReducers(
      createComquestStateReducer(actionTypes),
      createComquestDataReducer<AxiosResponse<Data>>(actionTypes),
      createComquestErrorReducer(actionTypes)
    );

    let lastState: RequestState & RequestData<AxiosResponse<Data>>;

    it('should return an object by default', () => {
      const reducerDoesNothing = composeComquestReducers(
        () => undefined as any,
        () => undefined as any
      );
      expect(reducerDoesNothing(undefined, unknownAction)).toEqual({});
    });

    it('should return the same state if nothing changed', () => {
      const firstState = reducer(undefined, unknownAction);
      const secondState = reducer(firstState, unknownAction);

      expect(firstState).toBe(secondState);
    });

    it('should compose up to five reducers', () => {
      const fiveReducers = composeComquestReducers(
        () => undefined as any,
        () => undefined as any,
        () => undefined as any,
        () => undefined as any,
        () => undefined as any
      );

      expect(fiveReducers(undefined, unknownAction)).toEqual({});
    });

    it('should handle any / all reducers returning undefined', () => {
      const fiveReducers = composeComquestReducers(
        (state: any = { a: 'a' }, action: AnyAction) => {
          switch (action.type) {
            case 'undefined':
              return undefined;
            default:
              return state;
          }
        },
        (state: any = { b: 'b' }, action: AnyAction) => {
          switch (action.type) {
            case 'undefined':
              return undefined;
            default:
              return state;
          }
        },
        (state: any = { c: 'c' }, action: AnyAction) => {
          switch (action.type) {
            case 'undefined':
              return undefined;
            default:
              return state;
          }
        },
        (state: any = { d: 'd' }, action: AnyAction) => {
          switch (action.type) {
            case 'undefined':
              return undefined;
            default:
              return state;
          }
        },
        (state: any = { e: 'e' }, action: AnyAction) => {
          switch (action.type) {
            case 'undefined':
              return undefined;
            default:
              return state;
          }
        }
      );

      const initialState = fiveReducers(undefined, unknownAction);

      expect(initialState).toEqual({
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
      });

      const erasedState = fiveReducers(initialState, { type: 'undefined' });

      expect(erasedState).toEqual(initialState);
    });

    it('should combine multiple reducer states', () => {
      lastState = reducer(lastState, unknownAction);

      expect(lastState).toEqual({
        loading: false,
        requestCount: 0,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 0,
      });

      lastState = reducer(lastState, { type: actionTypes.REQUEST });

      expect(lastState).toEqual({
        loading: true,
        requestCount: 1,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 1,
      });

      lastState = reducer(lastState, {
        type: actionTypes.SUCCESS,
        payload: { data: 'foo' },
      });

      expect(lastState).toEqual({
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

      lastState = reducer(lastState, { type: actionTypes.REQUEST });

      expect(lastState).toEqual({
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

      lastState = reducer(lastState, {
        type: actionTypes.FAILURE,
        payload: { response: { error: 'error' } },
      });

      expect(lastState).toEqual({
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
