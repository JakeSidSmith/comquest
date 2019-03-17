import { createActionTypes, createResetStateAction } from '../../src';
import {
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_RESET_STATE,
} from '../../src/constants';

describe('createResetStateAction', () => {
  const actionTypes = createActionTypes('test');
  const action = createResetStateAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.RESET_STATE,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        genericType: COMQUEST_RESET_STATE,
        actionTypes,
      },
    });
  });
});
