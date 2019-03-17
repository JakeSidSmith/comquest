import { createActionTypes, createClearErrorAction } from '../../src';
import {
  COMQUEST_CLEAR_ERROR,
  COMQUEST_MAGIC_SYMBOL,
} from '../../src/constants';

describe('createClearErrorAction', () => {
  const actionTypes = createActionTypes('test');
  const action = createClearErrorAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.CLEAR_ERROR,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        genericType: COMQUEST_CLEAR_ERROR,
        actionTypes,
      },
    });
  });
});
