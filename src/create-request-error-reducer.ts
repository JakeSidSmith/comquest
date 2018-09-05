import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestError,
} from './types';

function handleFailure(
  _state: RequestError, // tslint:disable-line:variable-name
  action: ComquestFailureAction
): RequestError {
  return {
    error: action.payload,
  };
}

export function createRequestErrorReducer(actionTypes: RequestActionTypes) {
  return (state: RequestError = {}, action: AnyAction): RequestError => {
    switch (action.type) {
      case actionTypes.FAILURE:
        return handleFailure(state, action as ComquestFailureAction);
      default:
        return state;
    }
  };
}
