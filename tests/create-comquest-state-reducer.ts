import {
  createComquestActionTypes,
  createComquestStateReducer,
  RequestState,
} from '../src';

describe('createRequestStateReducer', () => {
  const actionTypes = createComquestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createComquestStateReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createComquestStateReducer(actionTypes);
    let state: RequestState;

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
  });
});
