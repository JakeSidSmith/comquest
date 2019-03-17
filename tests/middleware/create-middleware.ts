import mockAxios from '../helpers/mock-axios';
jest.mock('axios', () => mockAxios);

import { AxiosError, AxiosResponse } from 'axios';
import { applyMiddleware, createStore } from 'redux';
import {
  createActionTypes,
  createErrorReducer,
  createMiddleware,
  createRequestAction,
  createResponseReducer,
} from '../../src';

describe('createMiddleware', () => {
  const unknownAction = { type: 'unknown' };
  const thunkAction = jest.fn();

  beforeEach(() => {
    mockAxios.clear();
  });

  it('returns a middleware', () => {
    const store = { dispatch: jest.fn(), getState: jest.fn() };
    const next = jest.fn().mockImplementation((value: any) => value);
    const middleware = createMiddleware({});

    expect(typeof middleware).toBe('function');
    const afterStore = middleware(store);
    expect(typeof afterStore).toBe('function');
    const afterNext = afterStore(next);
    expect(typeof afterNext).toBe('function');
    const afterAction = afterNext(unknownAction);
    expect(next).toHaveBeenCalledWith(unknownAction);
    expect(afterAction).toBe(unknownAction);
  });

  it('ignores thunk actions', () => {
    const store = { dispatch: jest.fn(), getState: jest.fn() };
    const next = jest.fn().mockImplementation((value: any) => value);
    const middleware = createMiddleware({});

    expect(typeof middleware).toBe('function');
    const afterStore = middleware(store);
    expect(typeof afterStore).toBe('function');
    const afterNext = afterStore(next);
    expect(typeof afterNext).toBe('function');
    const afterAction = afterNext(thunkAction);
    expect(next).toHaveBeenCalledWith(thunkAction);
    expect(afterAction).toBe(thunkAction);
  });

  const actionTypes = createActionTypes('test');
  const action = createRequestAction(actionTypes, {});
  const responseReducer = createResponseReducer(actionTypes);
  const errorReducer = createErrorReducer(actionTypes);

  const transformResponse = jest
    .fn()
    .mockImplementation((value: AxiosResponse) => {
      return value.data;
    });

  const transformError = jest.fn().mockImplementation((value: AxiosError) => {
    return typeof value.response !== 'undefined'
      ? value.response.data
      : value.message;
  });

  describe('transformResponse', () => {
    const middleware = createMiddleware({ transformResponse });
    const store = createStore(responseReducer, applyMiddleware(middleware));

    it('should ignore unknown actions', () => {
      expect(store.getState()).toEqual({});

      store.dispatch(unknownAction);

      expect(transformResponse).not.toHaveBeenCalled();

      expect(store.getState()).toEqual({});
    });

    it('should transform all success responses', () => {
      expect(store.getState()).toEqual({});

      action()(store.dispatch, store.getState, undefined);

      expect(store.getState()).toEqual({});

      const { requestCalls } = mockAxios;

      expect(requestCalls.length).toBe(1);

      const { thenCalls } = requestCalls[0];

      expect(thenCalls.length).toBe(1);

      const [success] = thenCalls[0].arguments;

      success({
        data: {
          foo: 'bar',
        },
      });

      expect(store.getState()).toEqual({ response: { foo: 'bar' } });
    });
  });

  describe('transformError', () => {
    const middleware = createMiddleware({ transformError });
    const store = createStore(errorReducer, applyMiddleware(middleware));

    it('should ignore unknown actions', () => {
      expect(store.getState()).toEqual({});

      store.dispatch(unknownAction);

      expect(transformError).not.toHaveBeenCalled();

      expect(store.getState()).toEqual({});
    });

    it('should transform all failure request errors', () => {
      expect(store.getState()).toEqual({});

      action()(store.dispatch, store.getState, undefined);

      expect(store.getState()).toEqual({});

      const { requestCalls } = mockAxios;

      expect(requestCalls.length).toBe(1);

      const { thenCalls } = requestCalls[0];

      expect(thenCalls.length).toBe(1);

      const [, failure] = thenCalls[0].arguments;

      failure(new Error('error'));

      expect(store.getState()).toEqual({ error: 'error' });

      failure({ response: { data: 'error response' } });

      expect(store.getState()).toEqual({ error: 'error response' });
    });
  });
});
