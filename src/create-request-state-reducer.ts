import { AnyAction } from 'redux';
import { RequestActionTypes, RequestState } from './types';

export const createRequestStateReducer = <Data, Errors>(
  actions: RequestActionTypes,
  initialData: Data
) => {
  const handleRequest = (state: RequestState<Data, Errors>): RequestState<Data, Errors> => {
    const inFlightCount = state.inFlightCount + 1;
    const requestCount = state.requestCount + 1;

    return {
      ...state,
      loading: inFlightCount > 0,
      errors: undefined,
      requestCount,
      inFlightCount,
    };
  };

  const handleSuccess = (
    state: RequestState<Data, Errors>,
    action: AnyAction
  ): RequestState<Data, Errors> => {
    const inFlightCount = state.inFlightCount - 1;
    const successCount = state.successCount + 1;
    const completeCount = state.completeCount + 1;

    return {
      ...state,
      loading: inFlightCount > 0,
      data: action.payload,
      errors: undefined,
      inFlightCount,
      successCount,
      completeCount,
    };
  };

  const handleFailure = (
    state: RequestState<Data, Errors>,
    action: AnyAction
  ): RequestState<Data, Errors> => {
    const inFlightCount = state.inFlightCount - 1;
    const failureCount = state.failureCount + 1;
    const completeCount = state.completeCount + 1;

    return {
      ...state,
      loading: inFlightCount > 0,
      errors: action.payload,
      inFlightCount,
      failureCount,
      completeCount,
    };
  };

  return (
    state: RequestState<Data, Errors> = {
      data: initialData,
      loading: false,
      errors: undefined,
      requestCount: 0,
      successCount: 0,
      failureCount: 0,
      completeCount: 0,
      inFlightCount: 0,
    },
    action: AnyAction
  ): RequestState<Data, Errors> => {
    switch (action.type) {
      case actions.REQUEST:
        return handleRequest(state);
      case actions.SUCCESS:
        return handleSuccess(state, action);
      case actions.FAILURE:
        return handleFailure(state, action);
      default:
        return state;
    }
  };
};
