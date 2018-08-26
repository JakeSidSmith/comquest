import { createRequestActionTypes, createRequestDataReducer } from '../src';

describe('createRequestDataReducer', () => {
  const actionTypes = createRequestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createRequestDataReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createRequestDataReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

    it('should store response data on success', () => {
      const response = { data: { foo: 'bar' } };

      expect(
        reducer(undefined, { type: actionTypes.SUCCESS, payload: response })
      ).toEqual({ data: { foo: 'bar' } });
    });

    it('should not mutate the state, and should maintain additional keys', () => {
      const response = { data: { foo: 'bar' } };
      const state = { keep: 'me' };

      const newState = reducer(state as any, {
        type: actionTypes.SUCCESS,
        payload: response,
      });

      expect(newState).not.toBe(state);
      expect(state).toEqual({
        keep: 'me',
      });
      expect(newState).toEqual({
        keep: 'me',
        data: { foo: 'bar' },
      });
    });
  });
});