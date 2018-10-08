import mockAxios from './helpers/mock-axios';
jest.mock('axios', () => mockAxios);

import { AxiosRequestConfig } from 'axios';
import {
  ComquestAPIEndpointMethod,
  ComquestPromise,
  ComquestRequestOptions,
  createComquestActionTypes,
  createComquestAPIEndpoint,
} from '../src';

describe('createComquestAPIEndpoint', () => {
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({});

  const actionTypes = createComquestActionTypes('foo');

  const thunkify = (actionCreator: ComquestAPIEndpointMethod<any>) => (
    config?: AxiosRequestConfig,
    options?: ComquestRequestOptions
  ): ComquestPromise => {
    return actionCreator(config, options)(dispatch, getState, undefined);
  };

  beforeEach(() => {
    mockAxios.clear();
    dispatch.mockClear();
    getState.mockClear();
  });

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

  it('should dispatch requests for each method', () => {
    const endpoint = createComquestAPIEndpoint(
      actionTypes,
      { url: 'domain.com' },
      {}
    );

    const methods: Array<keyof typeof endpoint> = [
      'get',
      'post',
      'put',
      'head',
      'delete',
      'patch',
      'options',
    ];

    methods.forEach(method => {
      const action = thunkify(endpoint[method] as ComquestAPIEndpointMethod<
        any
      >);

      action();
    });

    const { requestCalls } = mockAxios;

    expect(requestCalls.length).toBe(methods.length);

    requestCalls.forEach((requestCall, index) => {
      const [config] = requestCall.arguments;

      expect(config).toEqual({
        cancelToken: 'CancelToken',
        method: methods[index],
        url: 'domain.com',
      });
    });
  });
});
