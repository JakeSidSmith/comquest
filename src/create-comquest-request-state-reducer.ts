import { AnyAction } from 'redux';
import { ComquestActionTypes, ComquestRequestState } from './types';

function handleRequest(state: ComquestRequestState): ComquestRequestState {
  const inFlightCount = state.inFlightCount + 1;
  const requestCount = state.requestCount + 1;

  const { successCount, failureCount, completeCount } = state;

  return {
    loading: inFlightCount > 0,
    requestCount,
    successCount,
    failureCount,
    completeCount,
    inFlightCount,
  };
}

function handleSuccess(state: ComquestRequestState): ComquestRequestState {
  const inFlightCount = state.inFlightCount - 1;
  const successCount = state.successCount + 1;
  const completeCount = state.completeCount + 1;

  const { requestCount, failureCount } = state;

  return {
    loading: inFlightCount > 0,
    requestCount,
    successCount,
    failureCount,
    completeCount,
    inFlightCount,
  };
}

function handleFailure(state: ComquestRequestState): ComquestRequestState {
  const inFlightCount = state.inFlightCount - 1;
  const failureCount = state.failureCount + 1;
  const completeCount = state.completeCount + 1;

  const { requestCount, successCount } = state;

  return {
    loading: inFlightCount > 0,
    requestCount,
    successCount,
    failureCount,
    completeCount,
    inFlightCount,
  };
}

export function createComquestRequestStateReducer(
  actionTypes: ComquestActionTypes
) {
  return (
    state: ComquestRequestState = {
      loading: false,
      requestCount: 0,
      successCount: 0,
      failureCount: 0,
      completeCount: 0,
      inFlightCount: 0,
    },
    action: AnyAction
  ): ComquestRequestState => {
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
