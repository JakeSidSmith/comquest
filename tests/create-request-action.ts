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

});
