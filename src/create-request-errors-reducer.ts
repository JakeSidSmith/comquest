import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestErrors,
} from './types';

const handleRequest = <Errors>(
  state: RequestErrors<Errors>
): RequestErrors<Errors> => {
  return {
    ...state,
  };
};

const handleSuccess = <Errors>(
  state: RequestErrors<Errors>
): RequestErrors<Errors> => {
  return {
    ...state,
    errors: undefined,
  };
};

const handleFailure = <Errors>(
  state: RequestErrors<Errors>,
  action: ComquestFailureAction<Errors>
): RequestErrors<Errors> => {
  return {
    ...state,
    errors: action.payload,
  };
};

export const createRequestErrorsReducer = <Errors>(
  actions: RequestActionTypes
) => {
  return (
    state: RequestErrors<Errors> = {},
    action: AnyAction
  ): RequestErrors<Errors> => {
    switch (action.type) {
      case actions.REQUEST:
        return handleRequest<Errors>(state);
      case actions.SUCCESS:
        return handleSuccess<Errors>(state);
      case actions.FAILURE:
        return handleFailure<Errors>(state, action as ComquestFailureAction<
          Errors
        >);
      default:
        return state;
    }
  };
};
