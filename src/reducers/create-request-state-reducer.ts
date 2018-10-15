import {
  ActionHandlers,
  ComquestActionTypes,
  ComquestRequestState,
} from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createComquestRequestStateReducer(
  actionTypes: ComquestActionTypes
) {
  const initialState: ComquestRequestState = {
    loading: false,
    requestCount: 0,
    successCount: 0,
    failureCount: 0,
    completeCount: 0,
    inFlightCount: 0,
  };

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

  function handleReset() {
    return initialState;
  }

  const handlers: ActionHandlers<ComquestRequestState> = {
    [actionTypes.REQUEST]: handleRequest,
    [actionTypes.SUCCESS]: handleSuccess,
    [actionTypes.FAILURE]: handleFailure,
    [actionTypes.RESET_REQUEST_STATE]: handleReset,
  };

  return createReducerFromHandlers(handlers, initialState);
}
