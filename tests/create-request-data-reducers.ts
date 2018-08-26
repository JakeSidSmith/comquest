import { createRequestActionTypes, createRequestDataReducer } from '../src';

describe('createRequestDataReducer', () => {

  const actionTypes = createRequestActionTypes('foo');
  const unknownAction = {type: 'unknown'};

  it('should create a reducer function', () => {
    expect(typeof createRequestDataReducer(actionTypes)).toBe('function');
  });

  describe('reducer', () => {

    const reducer = createRequestDataReducer(actionTypes);

    it('should return a plain object by default', () => {
      expect(reducer(undefined, unknownAction)).toEqual({});
    });

  });

});
