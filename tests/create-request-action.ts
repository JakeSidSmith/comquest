import mockAxios from './helpers/mock-axios';
jest.mock('axios', () => ({default: mockAxios}));

import { createRequestAction, createRequestActionTypes } from '../src';

describe('createRequestAction', () => {

  beforeEach(() => {
    mockAxios.clear();
  });

  it('should return an action creator (function)', () => {
    const actionTypes = createRequestActionTypes('foo');
    const result = createRequestAction(actionTypes, {});

    expect(typeof result).toBe('function');
  });

  it('should make an axios request', () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({});

    const actionTypes = createRequestActionTypes('foo');
    const action = createRequestAction(
      actionTypes,
      {
        method: 'GET',
        url: 'domain.com',
      },
      {
        abortExistingRequestsOnRequest: true,
      }
    );

    expect(mockAxios.calls.length).toBe(0);

    action(
      {
        headers: {
          token: 'secret',
        },
      },
      {
        clearDataOnFailure: true,
      }
    )(dispatch, getState, undefined);

    const { calls } = mockAxios;

    expect(calls.length).toBe(1);

    const { arguments: args, thenCalls, catchCalls } = calls[0];

    expect(args.length).toBe(1);
    expect(args[0]).toEqual(
      {
        method: 'GET',
        url: 'domain.com',
        headers: {
          token: 'secret',
        },
      }
    );

    expect(thenCalls.length).toBe(1);
    expect(catchCalls.length).toBe(0);

    const { arguments: thenArgs } = thenCalls[0];

    expect(thenArgs.length).toBe(2);
    expect(typeof thenArgs[0]).toBe('function');
    expect(typeof thenArgs[1]).toBe('function');
  });

});
