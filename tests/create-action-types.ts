import { createActionTypes } from '../src';

describe('createActionTypes', () => {
  it('should create an object with string keys and symbol values', () => {
    const actionTypes = createActionTypes('test');
    const keys = Object.keys(actionTypes) as Array<keyof typeof actionTypes>;

    expect(typeof actionTypes).toBe('object');
    expect(keys).toEqual([
      'REQUEST',
      'SUCCESS',
      'FAILURE',
      'CLEAR_RESPONSE',
      'CLEAR_ERROR',
      'RESET_STATE',
    ]);

    keys.forEach(key => {
      expect(typeof actionTypes[key]).toBe('symbol');
    });
  });

  it('should create symbols that are unique', () => {
    const result1 = createActionTypes('test');
    const result2 = createActionTypes('test');

    expect(result1.REQUEST).not.toEqual(result1.SUCCESS);
    expect(result1.REQUEST).not.toEqual(result2.REQUEST);
  });

  it('should print human readable symbol values', () => {
    const result = createActionTypes('test');

    expect(result.REQUEST.toString()).toBe('Symbol(test.REQUEST)');
  });
});
