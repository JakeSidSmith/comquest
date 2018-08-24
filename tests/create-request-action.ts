import mockAxios from './helpers/mock-axios';
jest.mock('axios', () => ({default: mockAxios}));

import { createRequestAction, createRequestActionTypes } from '../src';

describe('createRequestAction', () => {

  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({});

  const actionTypes = createRequestActionTypes('foo');

  beforeEach(() => {
    mockAxios.clear();
    dispatch.mockClear();
    getState.mockClear();
  });

  it('should return an action creator (function)', () => {
    const result = createRequestAction(actionTypes, {});

    expect(typeof result).toBe('function');
  });

  it('should make an axios request', () => {
    const action = createRequestAction(actionTypes, {});

    expect(mockAxios.calls.length).toBe(0);

    action()(dispatch, getState, undefined);

    const { calls } = mockAxios;

    expect(calls.length).toBe(1);

    const { thenCalls, catchCalls } = calls[0];

    expect(thenCalls.length).toBe(1);
    expect(catchCalls.length).toBe(0);

    const { arguments: thenArgs } = thenCalls[0];

    expect(thenArgs.length).toBe(2);
    expect(typeof thenArgs[0]).toBe('function');
    expect(typeof thenArgs[1]).toBe('function');
  });

  it('should allow overriding the initial request config', () => {
    const action = createRequestAction(
      actionTypes,
      {
        method: 'GET',
        url: 'domain.com',
      }
    );

    action()(dispatch, getState, undefined);
    action(
      {
        url: 'another-domain.com',
        headers: {
          token: 'secret',
        },
      }
    )(dispatch, getState, undefined);

    const { calls } = mockAxios;
    const { arguments: args1 } = calls[0];
    const { arguments: args2 } = calls[1];

    expect(args1.length).toBe(1);
    expect(args1[0]).toEqual(
      {
        method: 'GET',
        url: 'domain.com',
      }
    );

    expect(args2.length).toBe(1);
    expect(args2[0]).toEqual(
      {
        method: 'GET',
        url: 'another-domain.com',
        headers: {
          token: 'secret',
        },
      }
    );
  });

  it('should inject params into the url', () => {
    const action = createRequestAction(
      actionTypes,
      {
        method: 'GET',
        url: 'domain.com/:foo/:bar/',
      }
    );

    action(
      undefined,
      {
        params: {
          foo: 123,
          bar: 456,
        },
      }
    )(dispatch, getState, undefined);

    const { calls } = mockAxios;
    const { arguments: args } = calls[0];

    expect(args.length).toBe(1);
    expect(args[0]).toEqual(
      {
        method: 'GET',
        url: 'domain.com/123/456/',
      }
    );
  });

  it('should default the url to empty string', () => {
    const action = createRequestAction(actionTypes, {});

    action()(dispatch, getState, undefined);
    action(
      undefined,
      {
        params: {
          foo: 'bar',
        },
      }
    )(dispatch, getState, undefined);

    const { calls } = mockAxios;
    const { arguments: args1 } = calls[0];
    const { arguments: args2 } = calls[1];

    expect(args1[0]).toEqual(
      {
        url: '',
      }
    );

    expect(args2[0]).toEqual(
      {
        url: '',
      }
    );
  });

  it('should return the response or error, respectively', () => {
    const action = createRequestAction(actionTypes, {});

    action()(dispatch, getState, undefined);

    const { calls } = mockAxios;
    const { thenCalls } = calls[0];
    const { arguments: args } = thenCalls[0];

    const response = {foo: 'bar'};
    const error = new Error('error');

    expect(args[0](response)).toBe(response);
    expect(args[1](error)).toBe(error);
  });

});
