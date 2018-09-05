import { createRequestActionTypes, createRequestStateReducer } from '../src';

describe('createRequestStateReducer', () => {
  const actionTypes = createRequestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createRequestStateReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createRequestStateReducer(actionTypes);

    it('should return an object with default values by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({
        loading: false,
        requestCount: 0,
        successCount: 0,
        failureCount: 0,
        completeCount: 0,
        inFlightCount: 0,
      });
    });
  });
});
