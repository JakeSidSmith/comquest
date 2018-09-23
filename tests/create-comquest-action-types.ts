import { createComquestActionTypes } from '../src';

describe('createComquestActionTypes', () => {
  it('should create an object with string keys and symbol values', () => {
    const actionTypes = createComquestActionTypes('test');
    const keys = Object.keys(actionTypes) as Array<keyof typeof actionTypes>;

    expect(typeof actionTypes).toBe('object');
    expect(keys).toEqual([
      'REQUEST',
      'SUCCESS',
      'FAILURE',
      'CLEAR_REQUEST_DATA',
      'CLEAR_REQUEST_ERRORS',
      'RESET_REQUEST_STATE',
      'CANCEL_REQUESTS',
    ]);

    keys.forEach(key => {
      expect(typeof actionTypes[key]).toBe('symbol');
    });
  });

  it('should create symbols that are unique', () => {
    const result1 = createComquestActionTypes('test');
    const result2 = createComquestActionTypes('test');

    expect(result1.REQUEST).not.toEqual(result1.SUCCESS);
    expect(result1.REQUEST).not.toEqual(result2.REQUEST);
  });

  it('should print human readable symbol values', () => {
    const result = createComquestActionTypes('test');

    expect(result.REQUEST.toString()).toBe('Symbol(test.REQUEST)');
  });
});
