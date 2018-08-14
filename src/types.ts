import { AnyAction } from 'redux';

export interface RequestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
  CLEAR_DATA: symbol;
  CLEAR_ERRORS: symbol;
  RESET_STATE: symbol;
}

export interface Params {[i: string]: string | number}

export type RequestOptions = Partial<{
  params: Params;
  doNotSendIfExistingRequests: boolean;
  sendAfterExistingRequests: boolean;
  abortExistingRequestsOnRequest: boolean;
  abortExistingRequestsOnSuccess: boolean;
  abortExistingRequestsOnFailure: boolean;
  clearDataOnRequest: boolean;
  clearDataOnSuccess: boolean;
  clearDataOnFailure: boolean;
  clearErrorsOnRequest: boolean;
  clearErrorsOnSuccess: boolean;
  clearErrorsOnFailure: boolean;
  resetStateOnRequest: boolean;
  resetStateOnSuccess: boolean;
  resetStateOnFailure: boolean;
}>;

export interface ComquestAction<Data, Errors> extends AnyAction {
  type: symbol;
  payload?: Data | Errors;
  options: RequestOptions;
}

export interface ComquestSuccessAction<Data> extends ComquestAction<Data, never> {
  payload: Data;
}

export interface ComquestFailureAction<Errors> extends ComquestAction<never, Errors> {
  payload: Errors;
}

export interface RequestState {
  loading: boolean;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
}

export interface RequestData<Data> {
  data?: Data;
}

export interface RequestErrors<Errors> {
  errors?: Errors;
}
