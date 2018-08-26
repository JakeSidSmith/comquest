import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestError,
} from './types';

const isAxiosError = (error: any): error is AxiosError => {
  return typeof error.response !== 'undefined';
};

const handleFailure = <Error>(
  state: RequestError<Error>,
  action: ComquestFailureAction
): RequestError<Error> => {
  return {
    ...state,
    error:
      isAxiosError(action.payload) && action.payload.response
        ? action.payload.response.data
        : action.payload,
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
