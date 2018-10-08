import mockAxios from './helpers/mock-axios';
jest.mock('axios', () => mockAxios);

import {
  ComquestAPIEndpointMethod,
  createComquestActionTypes,
  createComquestAPIEndpoint,
} from '../src';
import {
  COMQUEST_CLEAR_REQUEST_DATA,
  COMQUEST_CLEAR_REQUEST_ERRORS,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_RESET_REQUEST_STATE,
} from '../src/constants';

describe('createComquestAPIEndpoint', () => {
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({});

  const actionTypes = createComquestActionTypes('foo');

  beforeEach(() => {
    mockAxios.clear();
    dispatch.mockClear();
    getState.mockClear();
  });

  it('should create an object with all HTTP methods and clear / reset actions', () => {
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
      (endpoint[method] as ComquestAPIEndpointMethod<any>)()(
        dispatch,
        getState,
        undefined
      );
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

  it('should create a clear data action', () => {
    const endpoint = createComquestAPIEndpoint(actionTypes, {}, {});

    expect(endpoint.clearRequestData()).toEqual({
      type: actionTypes.CLEAR_REQUEST_DATA,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        comquestActionType: COMQUEST_CLEAR_REQUEST_DATA,
        comquestActionTypes: actionTypes,
      },
    });
  });

  it('should create a clear errors action', () => {
    const endpoint = createComquestAPIEndpoint(actionTypes, {}, {});

    expect(endpoint.clearRequestError()).toEqual({
      type: actionTypes.CLEAR_REQUEST_ERRORS,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        comquestActionType: COMQUEST_CLEAR_REQUEST_ERRORS,
        comquestActionTypes: actionTypes,
      },
    });
  });

  it('should create a reset request state action', () => {
    const endpoint = createComquestAPIEndpoint(actionTypes, {}, {});

    expect(endpoint.resetRequestState()).toEqual({
      type: actionTypes.RESET_REQUEST_STATE,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        comquestActionType: COMQUEST_RESET_REQUEST_STATE,
        comquestActionTypes: actionTypes,
      },
    });
  });
});
