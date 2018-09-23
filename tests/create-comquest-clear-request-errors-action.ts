import {
  createComquestActionTypes,
  createComquestClearRequestErrorsAction,
} from '../src';
import {
  COMQUEST_CLEAR_REQUEST_ERRORS,
  COMQUEST_MAGIC_SYMBOL,
} from '../src/constants';

describe('createComquestClearRequestErrorsAction', () => {
  const actionTypes = createComquestActionTypes('test');
  const action = createComquestClearRequestErrorsAction(actionTypes);

  it('should create an actionCreator', () => {
    expect(typeof action).toBe('function');
  });

  it('should return a comquest action', () => {
    expect(action()).toEqual({
      type: actionTypes.CLEAR_REQUEST_ERRORS,
      meta: {
        comquest: COMQUEST_MAGIC_SYMBOL,
        type: COMQUEST_CLEAR_REQUEST_ERRORS,
      },
    });
  });
});
