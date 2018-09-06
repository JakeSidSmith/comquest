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
  ABORT_REQUESTS: symbol;
}

export interface Params {
  [i: string]: string | number;
}

export type RequestOptions = Partial<{
  params: Params;
  // doNotSendIfExistingRequests: boolean;
  // sendAfterExistingRequests: boolean;
  throwError: boolean;
  suppressAbortError: boolean;
  abortRequestsOnRequest: boolean;
  abortRequestsOnSuccess: boolean;
  abortRequestsOnFailure: boolean;
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

export interface ComquestAction<D = AxiosResponse, E = AxiosError>
  extends AnyAction {
  type: symbol;
  payload?: D | E;
  error?: boolean;
  meta: {
    comquest: symbol;
    url: string;
    options: RequestOptions;
    config: AxiosRequestConfig;
  };
}

export interface ComquestSuccessAction<D = AxiosResponse>
  extends ComquestAction<D, undefined> {
  payload: D;
}

export interface ComquestFailureAction<E = AxiosError>
  extends ComquestAction<undefined, E> {
  payload: E;
}

export interface RequestState {
  loading: boolean;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
}

export interface RequestData<D> {
  data?: D;
}

export interface RequestError<E> {
  error?: E;
}

export type RequestActionCreatorCreator<S> = (
  actionTypes: RequestActionTypes,
  config: AxiosRequestConfig,
  options?: RequestOptions
) => RequestActionCreator<S>;

export type RequestActionCreator<S> = (
  configOverrides?: AxiosRequestConfig,
  optionsOverrides?: RequestOptions
) => RequestAction<S>;

export type RequestAction<S> = (
  dispatch:
    | ThunkDispatch<S, any, ComquestAction<AxiosResponse, AxiosError>>
    | Dispatch<ComquestAction<AxiosResponse, AxiosError>>,
  getState?: () => S,
  extra?: any
) => RequestActionReturnValue;

export type RequestActionReturnValue = Promise<AxiosResponse | AxiosError>;
