import mockAxios from './helpers/mock-axios';
jest.mock('axios', () => ({ default: mockAxios }));

import { AxiosError, AxiosResponse } from 'axios';
import { applyMiddleware, createStore } from 'redux';
import {
  createComquestActionTypes,
  createComquestMiddleware,
  createComquestRequestAction,
  createComquestRequestDataReducer,
  createComquestRequestErrorReducer,
} from '../src';

describe('createComquestMiddleware', () => {
  const unknownAction = { type: 'unknown' };
  const thunkAction = jest.fn();

  beforeEach(() => {
    mockAxios.clear();
  });

  it('returns a middleware', () => {
    const store = { dispatch: jest.fn(), getState: jest.fn() };
    const next = jest.fn().mockImplementation((value: any) => value);
    const middleware = createComquestMiddleware({});

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
    const middleware = createComquestMiddleware({});

    expect(typeof middleware).toBe('function');
    const afterStore = middleware(store);
    expect(typeof afterStore).toBe('function');
    const afterNext = afterStore(next);
    expect(typeof afterNext).toBe('function');
    const afterAction = afterNext(thunkAction);
    expect(next).toHaveBeenCalledWith(thunkAction);
    expect(afterAction).toBe(thunkAction);
  });

  const actionTypes = createComquestActionTypes('test');
  const action = createComquestRequestAction(actionTypes, {});
  const dataReducer = createComquestRequestDataReducer(actionTypes);
  const errorReducer = createComquestRequestErrorReducer(actionTypes);

  const transformRequestData = jest
    .fn()
    .mockImplementation((value: AxiosResponse) => {
      return value.data;
    });

  const transformRequestError = jest
    .fn()
    .mockImplementation((value: AxiosError) => {
      return typeof value.response !== 'undefined'
        ? value.response.data
        : value.message;
    });

  describe('transformRequestData', () => {
    const middleware = createComquestMiddleware({ transformRequestData });
    const store = createStore(dataReducer, applyMiddleware(middleware));

    it('should ignore unknown actions', () => {
      expect(store.getState()).toEqual({});

      store.dispatch(unknownAction);

      expect(transformRequestData).not.toHaveBeenCalled();

      expect(store.getState()).toEqual({});
    });

    it('should transform all success request data', () => {
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

      expect(store.getState()).toEqual({ data: { foo: 'bar' } });
    });
  });

  describe('transformRequestError', () => {
    const middleware = createComquestMiddleware({ transformRequestError });
    const store = createStore(errorReducer, applyMiddleware(middleware));

    it('should ignore unknown actions', () => {
      expect(store.getState()).toEqual({});

      store.dispatch(unknownAction);

      expect(transformRequestError).not.toHaveBeenCalled();

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
