import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export interface RequestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
  CLEAR_DATA: symbol;
  CLEAR_ERRORS: symbol;
  RESET_STATE: symbol;
}

export interface Params {
  [i: string]: string | number;
}

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

export interface ComquestAction<Data> extends AnyAction {
  type: symbol;
  payload?: AxiosResponse<Data> | AxiosError | Error;
  options: RequestOptions;
}

export interface ComquestSuccessAction<Data> extends ComquestAction<Data> {
  payload: AxiosResponse<Data>;
}

export interface ComquestFailureAction extends ComquestAction<never> {
  payload: AxiosError;
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

export interface RequestError<Error> {
  error?: Error;
}

export type RequestActionCreatorCreator<StoreState, Data> = (
  actionTypes: RequestActionTypes,
  config: AxiosRequestConfig,
  options?: RequestOptions
) => RequestActionCreator<StoreState, Data>;

export type RequestActionCreator<StoreState, Data> = (
  configOverrides?: AxiosRequestConfig,
  optionsOverrides?: RequestOptions
) => RequestAction<StoreState, Data>;

export type RequestAction<StoreState, Data> = (
  dispatch:
    | ThunkDispatch<StoreState, any, ComquestAction<Data>>
    | Dispatch<ComquestAction<Data>>,
  getState?: () => StoreState,
  extra?: any
) => RequestActionReturnValue<Data>;

export type RequestActionReturnValue<Data> = Promise<
  AxiosResponse<Data> | AxiosError
>;
