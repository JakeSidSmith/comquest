import { createComquestActionTypes, createComquestAPIEndpoint } from '../src';

describe('createComquestAPIEndpoint', () => {
  const actionTypes = createComquestActionTypes('TEST');

  it('should create an object with all HTTP methods', () => {
    const endpoint = createComquestAPIEndpoint(actionTypes, {}, {});
    const endpointKeys = Object.keys(endpoint) as Array<keyof typeof endpoint>;

    expect(endpointKeys).toEqual([
      'get',
      'post',
      'put',
      'head',
      'delete',
      'patch',
      'options',
      'clearRequestData',
      'clearRequestError',
      'resetRequestState',
    ]);

    endpointKeys.forEach(endpointKey => {
      const method = endpoint[endpointKey];

      expect(typeof method).toBe('function');
    });
  });
});
