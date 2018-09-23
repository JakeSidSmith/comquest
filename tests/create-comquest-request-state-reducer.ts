import {
  ComquestRequestState,
  createComquestActionTypes,
  createComquestRequestStateReducer,
} from '../src';

describe('createComquestRequestStateReducer', () => {
  const actionTypes = createComquestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createComquestRequestStateReducer(actionTypes)).toBe(
      'function'
    );
  });

  describe('reducer', () => {
    const reducer = createComquestRequestStateReducer(actionTypes);
    let state: ComquestRequestState;

    it('should return an object with default values by default', () => {
      expect(reducer(state, unknownAction)).toEqual({
        loading: false,
        requestCount: 0,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 0,
      });
    });

    it('should track successful requests', () => {
      state = reducer(state, { type: actionTypes.REQUEST });

      expect(state).toEqual({
        loading: true,
        requestCount: 1,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 1,
      });

      state = reducer(state, { type: actionTypes.SUCCESS });

      expect(state).toEqual({
        loading: false,
        requestCount: 1,
        successCount: 1,
        failureCount: 0,
        completeCount: 1,
        inFlightCount: 0,
      });
    });

    it('should track failed requests', () => {
      state = reducer(state, { type: actionTypes.REQUEST });

      expect(state).toEqual({
        loading: true,
        requestCount: 2,
        successCount: 1,
        failureCount: 0,
        completeCount: 1,
        inFlightCount: 1,
      });

      state = reducer(state, { type: actionTypes.FAILURE });

      expect(state).toEqual({
        loading: false,
        requestCount: 2,
        successCount: 1,
        failureCount: 1,
        completeCount: 2,
        inFlightCount: 0,
      });
    });

    it('should reset request state on reset', () => {
      state = reducer(undefined, { type: actionTypes.REQUEST });

      expect(state).toEqual({
        loading: true,
        requestCount: 1,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 1,
      });

      expect(reducer(state, { type: actionTypes.RESET_REQUEST_STATE })).toEqual(
        {
          loading: false,
          requestCount: 0,
          successCount: 0,
          failureCount: 0,
          completeCount: 0,
          inFlightCount: 0,
        }
      );
    });
  });
});
