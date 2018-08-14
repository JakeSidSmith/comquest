import { AxiosError } from 'axios';
import { AnyAction } from 'redux';

export interface RequestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
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

export interface ComquestAction<Data, Errors = RequestError> extends AnyAction {
  type: symbol;
  payload?: Data | Errors;
  options: RequestOptions;
}

export type RequestError = undefined | null | string | Error | AxiosError;

export interface RequestState<Data, Errors> {
  data: Data;
  loading: boolean;
  errors: Errors | undefined;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
}
