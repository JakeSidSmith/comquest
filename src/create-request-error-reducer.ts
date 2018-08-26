import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestError,
} from './types';

const handleFailure = <Error>(
  state: RequestError<Error>,
  action: ComquestFailureAction
): RequestError<Error> => {
  return {
    ...state,
    error:
      typeof action.payload.response !== 'undefined'
        ? action.payload.response.data
        : undefined,
  };
};

export const createRequestErrorReducer = <Error>(
  actions: RequestActionTypes
) => {
  return (
    state: RequestError<Error> = {},
    action: AnyAction
  ): RequestError<Error> => {
    switch (action.type) {
      case actions.FAILURE:
        return handleFailure<Error>(state, action as ComquestFailureAction);
      default:
        return state;
    }
  };
};
