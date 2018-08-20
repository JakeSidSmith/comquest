import { createRequestActionTypes } from '../src';

describe('createRequestActionTypes', () => {

  it('should create an object with string keys and symbol values', () => {
    const actionTypes = createRequestActionTypes('test');
    const keys = Object.keys(actionTypes) as Array<keyof typeof actionTypes>;

    expect(typeof actionTypes).toBe('object');
    expect(keys).toEqual([
      'REQUEST',
      'SUCCESS',
      'FAILURE',
      'CLEAR_DATA',
      'CLEAR_ERRORS',
      'RESET_STATE',
    ]);

    keys.forEach((key) => {
      expect(typeof actionTypes[key]).toBe('symbol');
    });
  });

  it('should create symbols that are unique', () => {
    const { REQUEST: request1, SUCCESS: success1 } = createRequestActionTypes('test');
    const { REQUEST: request2, SUCCESS: success2 } = createRequestActionTypes('test');

    expect(request1).not.toEqual(success1);
    expect(success1).not.toEqual(success2);
    expect(request1).not.toEqual(request2);
  });

});
