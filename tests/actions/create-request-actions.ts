import { createActionTypes, createRequestActions } from '../../src';

describe('createRequestActions', () => {
  const actionTypes = createActionTypes('foo');

  it('should create an object with all request actions', () => {
    const result = createRequestActions(actionTypes, {});

    const keys = Object.keys(result) as Array<keyof typeof result>;

    expect(keys).toEqual([
      'request',
      'clearResponse',
      'clearError',
      'resetState',
    ]);

    keys.forEach(key => {
      expect(typeof result[key]).toBe('function');
    });
  });
});
