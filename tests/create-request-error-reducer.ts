import { createRequestActionTypes, createRequestErrorReducer } from '../src';

describe('createRequestErrorReducer', () => {
  const actionTypes = createRequestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createRequestErrorReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createRequestErrorReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

    it('should store whole error data if error is axios error', () => {
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

    it('should not mutate the state, and should maintain additional keys', () => {
      const error = new Error('error');
      const state = { keep: 'me' };

      const newState = reducer(state as any, {
        type: actionTypes.FAILURE,
        payload: error,
      });

      expect(newState).not.toBe(state);
      expect(state).toEqual({
        keep: 'me',
      });
      expect(newState).toEqual({
        keep: 'me',
        error: new Error('error'),
      });
    });
  });
});
