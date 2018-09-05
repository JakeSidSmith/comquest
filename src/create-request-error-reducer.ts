import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestError,
} from './types';

function handleFailure(
  state: RequestError,
  action: ComquestFailureAction
): RequestError {
  return {
    ...state,
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
