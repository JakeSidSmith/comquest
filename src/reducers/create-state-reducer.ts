import { ActionHandlers, ComquestActionTypes, ComquestState } from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createStateReducer(actionTypes: ComquestActionTypes) {
  const initialState: ComquestState = {
    loading: false,
    requestCount: 0,
    successCount: 0,
    failureCount: 0,
    completeCount: 0,
    inFlightCount: 0,
  };

  function handleRequest(state: ComquestState): ComquestState {
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

  function handleSuccess(state: ComquestState): ComquestState {
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

  function handleFailure(state: ComquestState): ComquestState {
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

  const handlers: ActionHandlers<ComquestState> = {
    [actionTypes.REQUEST]: handleRequest,
    [actionTypes.SUCCESS]: handleSuccess,
    [actionTypes.FAILURE]: handleFailure,
    [actionTypes.RESET_STATE]: handleReset,
  };

  return createReducerFromHandlers(handlers, initialState);
}
