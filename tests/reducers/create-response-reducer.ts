import { createActionTypes, createResponseReducer } from '../../src';

describe('createResponseReducer', () => {
  const actionTypes = createActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createResponseReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {
    const reducer = createResponseReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

    it('should store response on success', () => {
      const response = { data: { foo: 'bar' } };

      expect(
        reducer(undefined, { type: actionTypes.SUCCESS, payload: response })
      ).toEqual({ response: { data: { foo: 'bar' } } });
    });

    it('should clear response on clear', () => {
      const response = { data: { foo: 'bar' } };
      const state = reducer(undefined, {
        type: actionTypes.SUCCESS,
        payload: response,
      });

      expect(state).toEqual({ response: { data: { foo: 'bar' } } });

      expect(reducer(state, { type: actionTypes.CLEAR_RESPONSE })).toEqual({});
    });

    it('should not mutate the state, and should discard additional keys', () => {
      const response = { data: { foo: 'bar' } };
      const state = { ignore: 'me' };

      const newState = reducer(state as any, {
        type: actionTypes.SUCCESS,
        payload: response,
      });

      expect(newState).not.toBe(state);
      expect(state).toEqual({
        ignore: 'me',
      });
      expect(newState).toEqual({
        response: { data: { foo: 'bar' } },
      });
    });
  });
});
