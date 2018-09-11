import { createComquestMiddleware } from '../src';

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
});
