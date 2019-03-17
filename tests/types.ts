import { CancelTokenSource } from 'axios';
import {
  ComquestAction,
  ComquestFailureAction,
  ComquestRequestAction,
  ComquestSuccessAction,
  createActionTypes,
} from '../src';
import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_REQUEST,
  COMQUEST_SUCCESS,
} from '../src/constants';

describe('types', () => {
  describe('ComquestAction', () => {
    const actionTypes = createActionTypes('foo');

    it('allows request, success, and failure actions', () => {
      function test(action: ComquestAction) {
        return Boolean(action);
      }

      const requestAction: ComquestRequestAction = {
        type: actionTypes.REQUEST,
        meta: {
          comquest: COMQUEST_MAGIC_SYMBOL,
          genericType: COMQUEST_REQUEST,
          actionTypes,
          cancelTokenSource: {} as CancelTokenSource,
          url: 'domain.com',
          options: {},
          config: {},
        },
      };

      const successAction: ComquestSuccessAction<string, number> = {
        type: actionTypes.SUCCESS,
        payload: '',
        meta: {
          comquest: COMQUEST_MAGIC_SYMBOL,
          genericType: COMQUEST_SUCCESS,
          actionTypes,
          cancelTokenSource: {} as CancelTokenSource,
          originalResponse: 1,
          url: 'domain.com',
          options: {},
          config: {},
        },
      };

      const failureAction: ComquestFailureAction<string, number> = {
        type: actionTypes.FAILURE,
        payload: '',
        meta: {
          comquest: COMQUEST_MAGIC_SYMBOL,
          genericType: COMQUEST_FAILURE,
          actionTypes,
          cancelTokenSource: {} as CancelTokenSource,
          originalError: 1,
          url: 'domain.com',
          options: {},
          config: {},
        },
        error: true,
      };

      expect(test(requestAction)).toBe(true);
      expect(test(successAction)).toBe(true);
      expect(test(failureAction)).toBe(true);
    });
  });
});
