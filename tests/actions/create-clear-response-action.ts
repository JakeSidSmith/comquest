import { createActionTypes, createClearResponseAction } from '../../src';
import {
  COMQUEST_CLEAR_RESPONSE,
  COMQUEST_MAGIC_SYMBOL,
} from '../../src/constants';

describe('createClearResponseAction', () => {
  const actionTypes = createActionTypes('test');
  const action = createClearResponseAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.CLEAR_RESPONSE,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        genericType: COMQUEST_CLEAR_RESPONSE,
        actionTypes,
      },
    });
  });
});
