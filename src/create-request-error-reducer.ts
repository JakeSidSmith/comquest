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

export function createRequestErrorReducer(actions: RequestActionTypes) {
  return (state: RequestError = {}, action: AnyAction): RequestError => {
    switch (action.type) {
      case actions.FAILURE:
        return handleFailure(state, action as ComquestFailureAction);
      default:
        return state;
    }
  };
}
