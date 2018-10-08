import {
  createComquestActionTypes,
  createComquestClearRequestDataAction,
} from '../src';
import {
  COMQUEST_CLEAR_REQUEST_DATA,
  COMQUEST_MAGIC_SYMBOL,
} from '../src/constants';

describe('createComquestClearRequestDataAction', () => {
  const actionTypes = createComquestActionTypes('test');
  const action = createComquestClearRequestDataAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.CLEAR_REQUEST_DATA,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        comquestActionType: COMQUEST_CLEAR_REQUEST_DATA,
        comquestActionTypes: actionTypes,
      },
    });
  });
});
