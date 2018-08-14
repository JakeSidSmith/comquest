import { AnyAction } from 'redux';
import { ComquestAction, RequestActionTypes, RequestErrors } from './types';

export const createRequestErrorsReducer = <Errors>(
  actions: RequestActionTypes
) => {
  const handleRequest = (state: RequestErrors<Errors>): RequestErrors<Errors> => {
    return {
      ...state,
    };
  };

  const handleSuccess = (
    state: RequestErrors<Errors>
  ): RequestErrors<Errors> => {
    return {
      ...state,
      errors: undefined,
    };
  };

  const handleFailure = (
    state: RequestErrors<Errors>,
    action: ComquestAction<void, Errors>
  ): RequestErrors<Errors> => {

    return {
      ...state,
      errors: action.payload as Errors,
    };
  };

  return (
    state: RequestErrors<Errors> = {},
    action: AnyAction
  ): RequestErrors<Errors> => {
    switch (action.type) {
      case actions.REQUEST:
        return handleRequest(state);
      case actions.SUCCESS:
        return handleSuccess(state);
      case actions.FAILURE:
        return handleFailure(state, action as ComquestAction<void, Errors>);
      default:
        return state;
    }
  };
};
