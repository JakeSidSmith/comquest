import mockAxios, { createMockCancelledError } from '../helpers/mock-axios';
jest.mock('axios', () => mockAxios);

import { AxiosRequestConfig } from 'axios';
import {
  ComquestActionCreator,
  ComquestPromise,
  ComquestRequestOptions,
  createComquestActionTypes,
  createComquestRequestAction,
} from '../../src';

describe('createComquestRequestAction', () => {
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({});

  const actionTypes = createComquestActionTypes('foo');

  const thunkify = (actionCreator: ComquestActionCreator<any>) => (
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

  it('should return an action creator (function)', () => {
    const result = createComquestRequestAction(actionTypes, {});

    expect(typeof result).toBe('function');
  });

  it('should make an axios request', () => {
    const action = thunkify(createComquestRequestAction(actionTypes, {}));

    expect(mockAxios.calls.length).toBe(0);

    action();

    const { requestCalls } = mockAxios;

    expect(requestCalls.length).toBe(1);

    const { thenCalls, catchCalls } = requestCalls[0];

    expect(thenCalls.length).toBe(1);
    expect(catchCalls.length).toBe(0);

    const { arguments: thenArgs } = thenCalls[0];

    expect(thenArgs.length).toBe(2);
    expect(typeof thenArgs[0]).toBe('function');
    expect(typeof thenArgs[1]).toBe('function');
  });

  it('should allow overriding the initial request config', () => {
    const action = thunkify(
      createComquestRequestAction(actionTypes, {
        method: 'GET',
        url: 'domain.com',
      })
    );

    action();
    action({
      url: 'another-domain.com',
      headers: {
        token: 'secret',
      },
    });

    const { requestCalls } = mockAxios;
    const { arguments: args1 } = requestCalls[0];
    const { arguments: args2 } = requestCalls[1];

    expect(args1.length).toBe(1);
    expect(args1[0]).toEqual({
      cancelToken: 'CancelToken',
      method: 'GET',
      url: 'domain.com',
    });

    expect(args2.length).toBe(1);
    expect(args2[0]).toEqual({
      method: 'GET',
      url: 'another-domain.com',
      headers: {
        token: 'secret',
      },
      cancelToken: 'CancelToken',
    });
  });

  it('should inject params into the url', () => {
    const action = thunkify(
      createComquestRequestAction(actionTypes, {
        method: 'GET',
        url: 'domain.com/:foo/:bar/',
      })
    );

    action(undefined, {
      params: {
        foo: 123,
        bar: 456,
      },
    });

    const { requestCalls } = mockAxios;
    const { arguments: args } = requestCalls[0];

    expect(args.length).toBe(1);
    expect(args[0]).toEqual({
      method: 'GET',
      url: 'domain.com/123/456/',
      cancelToken: 'CancelToken',
    });
  });

  it('should default the url to empty string', () => {
    const action = thunkify(createComquestRequestAction(actionTypes, {}));

    action();
    action(undefined, {
      params: {
        foo: 'bar',
      },
    });

    const { requestCalls } = mockAxios;
    const { arguments: args1 } = requestCalls[0];
    const { arguments: args2 } = requestCalls[1];

    expect(args1[0]).toEqual({
      url: '',
      cancelToken: 'CancelToken',
    });

    expect(args2[0]).toEqual({
      url: '',
      cancelToken: 'CancelToken',
    });
  });

  it('should return the response or error, respectively', () => {
    const action = thunkify(createComquestRequestAction(actionTypes, {}));

    action();

    const { requestCalls } = mockAxios;
    const { thenCalls } = requestCalls[0];
    const {
      arguments: [success, failure],
    } = thenCalls[0];

    const response = { foo: 'bar' };
    const error = new Error('error');

    expect(success(response)).toBe(response);
    expect(failure(error)).toBe(error);
  });

  it('should throw errors if throwErrors option is true', () => {
    const action = thunkify(
      createComquestRequestAction(actionTypes, {}, { throwErrors: true })
    );

    action();

    const handleError = mockAxios.requestCalls[0].thenCalls[0].arguments[1];

    const error = new Error('error');

    expect(() => handleError(error)).toThrow(error);
  });

  it('should throw cancel errors when dispatchCancelledRequestErrors', () => {
    const action = thunkify(
      createComquestRequestAction(
        actionTypes,
        {},
        { throwErrors: true, dispatchCancelledRequestErrors: true }
      )
    );

    action();

    const handleError = mockAxios.requestCalls[0].thenCalls[0].arguments[1];

    const error = createMockCancelledError('cancel');

    expect(() => handleError(error)).toThrow(error);
  });

  it('should throw cancel errors when not dispatchCancelledRequestErrors', () => {
    const action = thunkify(
      createComquestRequestAction(
        actionTypes,
        {},
        { throwErrors: true, dispatchCancelledRequestErrors: false }
      )
    );

    action();

    const handleError = mockAxios.requestCalls[0].thenCalls[0].arguments[1];

    const error = createMockCancelledError('cancel');

    expect(() => handleError(error)).toThrow(error);
  });
});
