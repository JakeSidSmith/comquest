import { CancelTokenSource } from 'axios';
import {
  ComquestAction,
  ComquestFailureAction,
  ComquestRequestAction,
  ComquestSuccessAction,
  createComquestActionTypes,
} from '../src';
import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_REQUEST,
  COMQUEST_SUCCESS,
} from '../src/constants';

describe('types', () => {
  describe('ComquestAction', () => {
    const actionTypes = createComquestActionTypes('foo');

    it('allows request, success, and failure actions', () => {
      function test(action: ComquestAction) {
        return Boolean(action);
      }

      const requestAction: ComquestRequestAction = {
        type: actionTypes.REQUEST,
        meta: {
          comquest: COMQUEST_MAGIC_SYMBOL,
          comquestActionType: COMQUEST_REQUEST,
          comquestActionTypes: actionTypes,
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
          comquestActionType: COMQUEST_SUCCESS,
          comquestActionTypes: actionTypes,
          cancelTokenSource: {} as CancelTokenSource,
          originalData: 1,
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
          comquestActionType: COMQUEST_FAILURE,
          comquestActionTypes: actionTypes,
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
