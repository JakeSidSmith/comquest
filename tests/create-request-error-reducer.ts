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

    it('should store response data if error is axios error', () => {
      const error = { response: { data: { foo: 'bar' } } };

      expect(
        reducer(undefined, { type: actionTypes.FAILURE, payload: error })
      ).toEqual({ error: { foo: 'bar' } });
    });

    it('should store error if not axios error', () => {
      const error = new Error('error');

      expect(
        reducer(undefined, { type: actionTypes.FAILURE, payload: error })
      ).toEqual({ error: new Error('error') });
    });
  });
});
