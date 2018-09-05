import { AnyAction } from 'redux';
import { RequestActionTypes, RequestState } from './types';

function handleRequest(state: RequestState): RequestState {
  const inFlightCount = state.inFlightCount + 1;
  const requestCount = state.requestCount + 1;

  return {
    ...state,
    loading: inFlightCount > 0,
    requestCount,
    inFlightCount,
  };
}

function handleSuccess(state: RequestState): RequestState {
  const inFlightCount = state.inFlightCount - 1;
  const successCount = state.successCount + 1;
  const completeCount = state.completeCount + 1;

  return {
    ...state,
    loading: inFlightCount > 0,
    inFlightCount,
    successCount,
    completeCount,
  };
}

function handleFailure(state: RequestState): RequestState {
  const inFlightCount = state.inFlightCount - 1;
  const failureCount = state.failureCount + 1;
  const completeCount = state.completeCount + 1;

  return {
    ...state,
    loading: inFlightCount > 0,
    inFlightCount,
    failureCount,
    completeCount,
  };
}

export function createRequestStateReducer(actionTypes: RequestActionTypes) {
  return (
    state: RequestState = {
      loading: false,
      requestCount: 0,
      successCount: 0,
      failureCount: 0,
      completeCount: 0,
      inFlightCount: 0,
    },
    action: AnyAction
  ): RequestState => {
    switch (action.type) {
      case actionTypes.REQUEST:
        return handleRequest(state);
      case actionTypes.SUCCESS:
        return handleSuccess(state);
      case actionTypes.FAILURE:
        return handleFailure(state);
      default:
        return state;
    }
  };
}
