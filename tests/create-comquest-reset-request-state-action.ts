import {
  createComquestActionTypes,
  createComquestResetRequestStateAction,
} from '../src';
import {
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_RESET_REQUEST_STATE,
} from '../src/constants';

describe('createComquestResetRequestStateAction', () => {
  const actionTypes = createComquestActionTypes('test');
  const action = createComquestResetRequestStateAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.RESET_REQUEST_STATE,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        type: COMQUEST_RESET_REQUEST_STATE,
      },
    });
  });
});
