import { AxiosError, AxiosResponse } from 'axios';
import { applyMiddleware, createStore } from 'redux';
import {
  createComquestActionTypes,
  createComquestMiddleware,
  createComquestRequestDataReducer,
  createComquestRequestErrorReducer,
} from '../src';

describe('createComquestMiddleware', () => {
  it('returns a middleware', () => {
    const store = { dispatch: jest.fn(), getState: jest.fn() };
    const next = jest.fn().mockImplementation((value: any) => value);
    const action = { type: 'unknown' };
    const middleware = createComquestMiddleware({});

    expect(typeof middleware).toBe('function');
    const afterStore = middleware(store);
    expect(typeof afterStore).toBe('function');
    const afterNext = afterStore(next);
    expect(typeof afterNext).toBe('function');
    const afterAction = afterNext(action);
    expect(afterAction).toBe(action);
  });

  const actionTypes = createComquestActionTypes('test');
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
    it('should transform all success request data', () => {
      expect(store.getState()).toEqual({});
    });
  });

  describe('transformRequestError', () => {
    const middleware = createComquestMiddleware({ transformRequestError });
    const store = createStore(errorReducer, applyMiddleware(middleware));
    it('should transform all failure request errors', () => {
      expect(store.getState()).toEqual({});
    });
  });
});
