import { createActionTypes, createErrorReducer } from '../../src';

describe('createErrorReducer', () => {
  const actionTypes = createActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createErrorReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createErrorReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

    it('should store whole error if error is axios error', () => {
      const error = { response: { data: { foo: 'bar' } } };

      expect(
        reducer(undefined, { type: actionTypes.FAILURE, payload: error })
      ).toEqual({ error: { response: { data: { foo: 'bar' } } } });
    });

    it('should store whole error if not axios error', () => {
      const error = new Error('error');

      expect(
        reducer(undefined, { type: actionTypes.FAILURE, payload: error })
      ).toEqual({ error: new Error('error') });
    });

    it('should clear errors on clear', () => {
      const error = new Error('error');
      const state = reducer(undefined, {
        type: actionTypes.FAILURE,
        payload: error,
      });

      expect(state).toEqual({ error });

      expect(reducer(state, { type: actionTypes.CLEAR_ERROR })).toEqual({});
    });

    it('should not mutate the state, and should discard additional keys', () => {
      const error = new Error('error');
      const state = { ignore: 'me' };

      const newState = reducer(state as any, {
        type: actionTypes.FAILURE,
        payload: error,
      });

      expect(newState).not.toBe(state);
      expect(state).toEqual({
        ignore: 'me',
      });
      expect(newState).toEqual({
        error: new Error('error'),
      });
    });
  });
});
