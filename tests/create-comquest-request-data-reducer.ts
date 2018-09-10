import {
  createComquestActionTypes,
  createComquestRequestDataReducer,
} from '../src';

describe('createRequestDataReducer', () => {
  const actionTypes = createComquestActionTypes('foo');
  const unknownAction = { type: 'unknown' };

  it('should create a reducer function', () => {
    expect(typeof createComquestRequestDataReducer(actionTypes)).toBe(
      'function'
    );
  });

  describe('reducer', () => {
    const reducer = createComquestRequestDataReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

    it('should store response data on success', () => {
      const response = { data: { foo: 'bar' } };

      expect(
        reducer(undefined, { type: actionTypes.SUCCESS, payload: response })
      ).toEqual({ data: { data: { foo: 'bar' } } });
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
        data: { data: { foo: 'bar' } },
      });
    });
  });
});
