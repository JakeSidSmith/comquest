import { createComquestActionTypes } from '../src';

describe('createRequestActionTypes', () => {
  it('should create an object with string keys and symbol values', () => {
    const actionTypes = createComquestActionTypes('test');
    const keys = Object.keys(actionTypes) as Array<keyof typeof actionTypes>;

    expect(typeof actionTypes).toBe('object');
    expect(keys).toEqual([
      'REQUEST',
      'SUCCESS',
      'FAILURE',
      'CLEAR_DATA',
      'CLEAR_ERRORS',
      'RESET_STATE',
      'ABORT_REQUESTS',
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
