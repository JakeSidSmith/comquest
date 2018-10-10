import {
  createComquestActionTypes,
  createComquestRequestActions,
} from '../../src';

describe('createComquestRequestActions', () => {
  const actionTypes = createComquestActionTypes('foo');

  it('should create an object with all request actions', () => {
    const result = createComquestRequestActions(actionTypes, {});

    const keys = Object.keys(result) as Array<keyof typeof result>;

    expect(keys).toEqual([
      'request',
      'clearRequestData',
      'clearRequestErrors',
      'resetRequestState',
    ]);

    keys.forEach(key => {
      expect(typeof result[key]).toBe('function');
    });
  });
});
